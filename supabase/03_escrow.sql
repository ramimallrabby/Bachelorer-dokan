-- =====================================================================
-- Bachelorer Dokan | STEP 3: escrow orders
-- Requires step 1 (step 2 recommended). Safe to re-run.
--
-- Design: the browser can NEVER write to orders directly. Every state change
-- goes through a function below that checks WHO is calling and whether the
-- move is legal (a state machine), and writes an audit row to order_events.
--
--   pending_payment --pay--> funded --seller--> delivered --buyer--> completed
--        |                     |  \                 |
--      cancel            seller cancel  \--dispute--> disputed --admin--> completed | refunded
--     (cancelled)          (refunded)                    (also: auto-release after N hours)
-- =====================================================================

-- 1. Settings (public, read-only from the browser). NEVER store secrets here. ----
create table if not exists public.app_settings (key text primary key, value text not null);
alter table public.app_settings enable row level security;
drop policy if exists "settings are readable" on public.app_settings;
create policy "settings are readable" on public.app_settings for select using (true);

insert into public.app_settings (key, value) values
  ('payments_mode',          'test'),  -- 'test' = no real money. Set to 'live' once a payment gateway is connected.
  ('escrow_fee_bps',         '0'),     -- fee in basis points: 200 = 2%
  ('auto_release_hours',     '72'),    -- after handover, release automatically if the buyer is silent
  ('pending_expiry_minutes', '30')     -- unpaid orders are cancelled after this long
on conflict (key) do nothing;

create or replace function public._setting(p_key text)
returns text language sql stable security definer set search_path = '' as $$
  select value from public.app_settings where key = p_key
$$;
revoke execute on function public._setting(text) from public, anon, authenticated;

-- 2. Tables ------------------------------------------------------------------
do $$
declare id_type text;
begin
  select format_type(a.atttypid, a.atttypmod) into id_type
  from pg_attribute a
  where a.attrelid = 'public.listings'::regclass and a.attname = 'id' and not a.attisdropped;

  -- Orders keep a snapshot of title/image/price so history survives a deleted listing.
  execute format($t$
    create table if not exists public.orders (
      id                uuid primary key default gen_random_uuid(),
      listing_id        %s references public.listings (id) on delete set null,
      buyer_id          uuid not null references public.profiles (id) on delete restrict,
      seller_id         uuid not null references public.profiles (id) on delete restrict,
      listing_title     text not null,
      listing_image_url text,
      amount            numeric(12,2) not null check (amount > 0),
      fee               numeric(12,2) not null default 0 check (fee >= 0),
      total             numeric(12,2) generated always as (amount + fee) stored,
      status            text not null default 'pending_payment'
                        check (status in ('pending_payment','funded','delivered','completed','disputed','cancelled','refunded')),
      buyer_note        text,
      dispute_reason    text,
      payment_provider  text,
      payment_ref       text,
      funded_at         timestamptz,
      delivered_at      timestamptz,
      completed_at      timestamptz,
      cancelled_at      timestamptz,
      auto_release_at   timestamptz,
      created_at        timestamptz not null default now(),
      updated_at        timestamptz not null default now(),
      check (buyer_id <> seller_id)
    )$t$, id_type);
end $$;

create table if not exists public.order_events (
  id          bigint generated always as identity primary key,
  order_id    uuid not null references public.orders (id) on delete cascade,
  actor_id    uuid,
  from_status text,
  to_status   text not null,
  note        text,
  created_at  timestamptz not null default now()
);

create index if not exists orders_buyer_idx   on public.orders (buyer_id, created_at desc);
create index if not exists orders_seller_idx  on public.orders (seller_id, created_at desc);
create index if not exists orders_listing_idx on public.orders (listing_id) where status in ('pending_payment','funded','delivered','disputed');
create index if not exists order_events_idx   on public.order_events (order_id, created_at);
-- Only ONE live (funded/delivered/disputed) order per listing, enforced by the database itself.
create unique index if not exists orders_one_live_per_listing on public.orders (listing_id)
  where status in ('funded','delivered','disputed');

-- 3. Row Level Security: read-only for the two parties -----------------------
alter table public.orders       enable row level security;
alter table public.order_events enable row level security;

drop policy if exists "parties read their orders" on public.orders;
create policy "parties read their orders" on public.orders for select to authenticated
  using ((select auth.uid()) in (buyer_id, seller_id));

drop policy if exists "parties read order events" on public.order_events;
create policy "parties read order events" on public.order_events for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and (select auth.uid()) in (o.buyer_id, o.seller_id)));

-- 4. Internal helpers (not callable from the browser) -------------------------
create or replace function public._log_order_event(p_order uuid, p_actor uuid, p_from text, p_to text, p_note text default null)
returns void language sql security definer set search_path = '' as $$
  insert into public.order_events (order_id, actor_id, from_status, to_status, note) values (p_order, p_actor, p_from, p_to, p_note);
$$;
revoke execute on function public._log_order_event(uuid, uuid, text, text, text) from public, anon, authenticated;

-- Moves money-in: pending_payment -> funded. Returns 'funded' or an error code as text.
create or replace function public._fund_order(p_order_id uuid, p_provider text, p_ref text)
returns text language plpgsql security definer set search_path = '' as $$
declare v_o public.orders; v_l public.listings; r record;
begin
  select * into v_o from public.orders where id = p_order_id for update;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;
  if v_o.status = 'funded' then return 'funded'; end if;               -- idempotent (gateway retries)
  if v_o.status <> 'pending_payment' then raise exception 'INVALID_STATE'; end if;

  select * into v_l from public.listings where id = v_o.listing_id for update;  -- lock: first payer wins
  if not found or v_l.status <> 'active' then
    update public.orders set status = 'cancelled', cancelled_at = now(), updated_at = now() where id = v_o.id;
    perform public._log_order_event(v_o.id, null, 'pending_payment', 'cancelled', 'listing no longer available');
    return 'LISTING_UNAVAILABLE';
  end if;

  update public.orders
     set status = 'funded', funded_at = now(), updated_at = now(), payment_provider = p_provider, payment_ref = p_ref
   where id = v_o.id;
  update public.listings set status = 'reserved' where id = v_l.id;
  perform public._log_order_event(v_o.id, v_o.buyer_id, 'pending_payment', 'funded', p_provider);

  -- Anyone else who was about to buy the same item is released.
  for r in select id from public.orders where listing_id = v_o.listing_id and status = 'pending_payment' and id <> v_o.id for update loop
    update public.orders set status = 'cancelled', cancelled_at = now(), updated_at = now() where id = r.id;
    perform public._log_order_event(r.id, null, 'pending_payment', 'cancelled', 'item was bought by someone else');
  end loop;
  return 'funded';
end $$;
revoke execute on function public._fund_order(uuid, text, text) from public, anon, authenticated;

-- Shared by buyer-confirm, auto-release and admin-release.
create or replace function public._complete_order(p_order_id uuid, p_actor uuid, p_note text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_o public.orders;
begin
  select * into v_o from public.orders where id = p_order_id for update;
  update public.orders set status = 'completed', completed_at = now(), updated_at = now() where id = v_o.id;
  update public.listings set status = 'sold' where id = v_o.listing_id;
  perform public._log_order_event(v_o.id, p_actor, v_o.status, 'completed', p_note);
end $$;
revoke execute on function public._complete_order(uuid, uuid, text) from public, anon, authenticated;

-- Shared by seller-cancel and admin-refund.
create or replace function public._refund_order(p_order_id uuid, p_actor uuid, p_note text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_o public.orders;
begin
  select * into v_o from public.orders where id = p_order_id for update;
  update public.orders set status = 'refunded', cancelled_at = now(), updated_at = now() where id = v_o.id;
  update public.listings set status = 'active' where id = v_o.listing_id and status = 'reserved';
  perform public._log_order_event(v_o.id, p_actor, v_o.status, 'refunded', p_note);
end $$;
revoke execute on function public._refund_order(uuid, uuid, text) from public, anon, authenticated;

-- 5. Functions the browser calls ----------------------------------------------
create or replace function public.create_order(p_listing_id text, p_note text default null)
returns uuid language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := auth.uid(); v_l public.listings; v_id uuid; v_amount numeric; v_fee numeric;
begin
  if v_uid is null then raise exception 'NOT_AUTHENTICATED'; end if;
  v_l := public._get_listing(p_listing_id);
  if v_l.id is null then raise exception 'LISTING_NOT_FOUND'; end if;
  if v_l.seller_id is null then raise exception 'LISTING_NO_SELLER'; end if;
  if v_l.seller_id = v_uid then raise exception 'OWN_LISTING'; end if;
  if v_l.status <> 'active' then raise exception 'LISTING_UNAVAILABLE'; end if;

  -- Double-click safe: reuse this buyer's unpaid order for the same item.
  select id into v_id from public.orders where listing_id = v_l.id and buyer_id = v_uid and status = 'pending_payment' limit 1;
  if v_id is not null then return v_id; end if;

  v_amount := v_l.price::numeric;
  if v_amount is null or v_amount <= 0 then raise exception 'INVALID_PRICE'; end if;
  v_fee := round(v_amount * coalesce(public._setting('escrow_fee_bps'), '0')::numeric / 10000.0, 2);

  insert into public.orders (listing_id, buyer_id, seller_id, listing_title, listing_image_url, amount, fee, buyer_note)
  values (v_l.id, v_uid, v_l.seller_id, v_l.title, v_l.image_url, v_amount, v_fee, left(nullif(btrim(p_note), ''), 300))
  returning id into v_id;
  perform public._log_order_event(v_id, v_uid, null, 'pending_payment');

  -- Make sure both sides can chat about this order (only if step 2 is installed).
  if to_regclass('public.conversations') is not null then
    insert into public.conversations (listing_id, buyer_id, seller_id) values (v_l.id, v_uid, v_l.seller_id)
    on conflict (listing_id, buyer_id) do nothing;
  end if;
  return v_id;
end $$;

-- TEST MODE ONLY. Marks the order paid without any real payment. Refuses to run once payments_mode = 'live'.
create or replace function public.simulate_payment(p_order_id uuid)
returns text language plpgsql security definer set search_path = '' as $$
declare v_o public.orders;
begin
  if auth.uid() is null then raise exception 'NOT_AUTHENTICATED'; end if;
  if coalesce(public._setting('payments_mode'), 'test') <> 'test' then raise exception 'PAYMENTS_LIVE'; end if;
  select * into v_o from public.orders where id = p_order_id;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;
  if v_o.buyer_id <> auth.uid() then raise exception 'NOT_ALLOWED'; end if;
  return public._fund_order(p_order_id, 'test', 'sim-' || gen_random_uuid()::text);
end $$;

create or replace function public.mark_delivered(p_order_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare v_o public.orders;
begin
  if auth.uid() is null then raise exception 'NOT_AUTHENTICATED'; end if;
  select * into v_o from public.orders where id = p_order_id for update;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;
  if v_o.seller_id <> auth.uid() then raise exception 'NOT_ALLOWED'; end if;
  if v_o.status <> 'funded' then raise exception 'INVALID_STATE'; end if;
  update public.orders
     set status = 'delivered', delivered_at = now(), updated_at = now(),
         auto_release_at = now() + make_interval(hours => coalesce(public._setting('auto_release_hours'), '72')::int)
   where id = v_o.id;
  perform public._log_order_event(v_o.id, auth.uid(), 'funded', 'delivered');
end $$;

create or replace function public.confirm_receipt(p_order_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare v_o public.orders;
begin
  if auth.uid() is null then raise exception 'NOT_AUTHENTICATED'; end if;
  select * into v_o from public.orders where id = p_order_id for update;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;
  if v_o.buyer_id <> auth.uid() then raise exception 'NOT_ALLOWED'; end if;
  if v_o.status not in ('funded', 'delivered') then raise exception 'INVALID_STATE'; end if;
  perform public._complete_order(v_o.id, auth.uid(), 'buyer confirmed receipt');
end $$;

create or replace function public.open_dispute(p_order_id uuid, p_reason text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_o public.orders;
begin
  if auth.uid() is null then raise exception 'NOT_AUTHENTICATED'; end if;
  if char_length(btrim(coalesce(p_reason, ''))) < 10 then raise exception 'REASON_TOO_SHORT'; end if;
  select * into v_o from public.orders where id = p_order_id for update;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;
  if auth.uid() not in (v_o.buyer_id, v_o.seller_id) then raise exception 'NOT_ALLOWED'; end if;
  if v_o.status not in ('funded', 'delivered') then raise exception 'INVALID_STATE'; end if;
  update public.orders set status = 'disputed', dispute_reason = left(btrim(p_reason), 500), updated_at = now(), auto_release_at = null
   where id = v_o.id;
  perform public._log_order_event(v_o.id, auth.uid(), v_o.status, 'disputed', left(btrim(p_reason), 500));
end $$;

create or replace function public.cancel_order(p_order_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare v_o public.orders;
begin
  if auth.uid() is null then raise exception 'NOT_AUTHENTICATED'; end if;
  select * into v_o from public.orders where id = p_order_id for update;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;

  if v_o.status = 'pending_payment' and v_o.buyer_id = auth.uid() then
    update public.orders set status = 'cancelled', cancelled_at = now(), updated_at = now() where id = v_o.id;
    perform public._log_order_event(v_o.id, auth.uid(), 'pending_payment', 'cancelled', 'buyer cancelled');
  elsif v_o.status = 'funded' and v_o.seller_id = auth.uid() then
    perform public._refund_order(v_o.id, auth.uid(), 'seller cancelled before handover');
  elsif v_o.buyer_id <> auth.uid() and v_o.seller_id <> auth.uid() then
    raise exception 'NOT_ALLOWED';
  else
    raise exception 'INVALID_STATE';
  end if;
end $$;

do $$
declare f text;
begin
  foreach f in array array[
    'create_order(text, text)', 'simulate_payment(uuid)', 'mark_delivered(uuid)',
    'confirm_receipt(uuid)', 'open_dispute(uuid, text)', 'cancel_order(uuid)'
  ] loop
    execute format('revoke execute on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;

-- 6. Server-only functions (service role / SQL editor), NOT callable by users -----
-- Call from your payment gateway's webhook once the payment is verified.
create or replace function public.fund_order(p_order_id uuid, p_provider text, p_ref text)
returns text language sql security definer set search_path = '' as $$
  select public._fund_order(p_order_id, p_provider, p_ref)
$$;

-- You (admin) decide a dispute:  select public.resolve_dispute('<order-uuid>', 'release' | 'refund', 'note');
create or replace function public.resolve_dispute(p_order_id uuid, p_outcome text, p_note text default null)
returns void language plpgsql security definer set search_path = '' as $$
declare v_o public.orders;
begin
  select * into v_o from public.orders where id = p_order_id for update;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;
  if v_o.status <> 'disputed' then raise exception 'INVALID_STATE'; end if;
  if p_outcome = 'release' then perform public._complete_order(v_o.id, null, coalesce(p_note, 'admin: released to seller'));
  elsif p_outcome = 'refund' then perform public._refund_order(v_o.id, null, coalesce(p_note, 'admin: refunded to buyer'));
  else raise exception 'INVALID_STATE';
  end if;
end $$;

-- Run every few minutes (see GUIDE.md for the pg_cron line): expires unpaid orders and auto-releases silent buyers.
create or replace function public.run_escrow_housekeeping()
returns jsonb language plpgsql security definer set search_path = '' as $$
declare r record; v_expired int := 0; v_released int := 0;
begin
  for r in select id from public.orders
           where status = 'pending_payment'
             and created_at < now() - make_interval(mins => coalesce(public._setting('pending_expiry_minutes'), '30')::int)
           for update skip locked loop
    update public.orders set status = 'cancelled', cancelled_at = now(), updated_at = now() where id = r.id;
    perform public._log_order_event(r.id, null, 'pending_payment', 'cancelled', 'payment window expired');
    v_expired := v_expired + 1;
  end loop;

  for r in select id from public.orders where status = 'delivered' and auto_release_at <= now() for update skip locked loop
    perform public._complete_order(r.id, null, 'auto-released: buyer did not respond');
    v_released := v_released + 1;
  end loop;
  return jsonb_build_object('expired', v_expired, 'auto_released', v_released);
end $$;

revoke execute on function public.fund_order(uuid, text, text)         from public, anon, authenticated;
revoke execute on function public.resolve_dispute(uuid, text, text)    from public, anon, authenticated;
revoke execute on function public.run_escrow_housekeeping()            from public, anon, authenticated;
grant  execute on function public.fund_order(uuid, text, text)         to service_role;
grant  execute on function public.resolve_dispute(uuid, text, text)    to service_role;
grant  execute on function public.run_escrow_housekeeping()            to service_role;

-- 7. Realtime: both parties see status changes instantly -------------------------
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'orders') then
    alter publication supabase_realtime add table public.orders;
  end if;
end $$;
