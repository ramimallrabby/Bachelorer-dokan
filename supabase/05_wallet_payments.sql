-- =====================================================================
-- Bachelorer Dokan | STEP 5: wallet, ledger, deposits, withdrawals, real escrow money flow
-- Requires steps 1-4. Safe to re-run.
--
-- Money model (every taka is traceable):
--   deposit approved ........ wallet +X          (kind: deposit)
--   buyer pays order ........ wallet -total      (kind: escrow_hold)   -> money sits in escrow
--   order completed ......... seller wallet +amount (escrow_release), platform +fee (platform_fee)
--   order refunded .......... buyer wallet +total   (escrow_refund)
--   withdrawal requested .... wallet -X          (withdrawal_hold)
--   withdrawal rejected ..... wallet +X          (withdrawal_reversal)
--   withdrawal paid ......... (money left the platform; fee -> platform_fee)
-- The browser can never write to any of these tables. Only the functions below can.
-- =====================================================================

-- 1. Settings --------------------------------------------------------------------
insert into public.app_settings (key, value) values
  ('bkash_number',            ''),    -- your merchant/personal bKash number shown to depositors
  ('nagad_number',            ''),
  ('rocket_number',           ''),
  ('bank_details',            ''),
  ('min_deposit',             '50'),
  ('max_deposit',             '50000'),
  ('min_withdrawal',          '100'),
  ('withdrawal_fee_bps',      '0'),   -- 100 = 1% deducted from the payout
  ('daily_withdrawal_limit',  '50000'),
  ('report_auto_hide_threshold', '3'),-- distinct reporters that auto-hide a listing until an admin reviews it
  ('site_name',               'Bachelorer Dokan'),
  ('support_contact',         '')
on conflict (key) do nothing;

-- 2. Tables ------------------------------------------------------------------------
create table if not exists public.wallets (
  user_id    uuid primary key references public.profiles (id) on delete cascade,
  balance    numeric(14,2) not null default 0 check (balance >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.ledger_entries (
  id              bigint generated always as identity primary key,
  user_id         uuid references public.profiles (id) on delete set null,   -- null = platform account
  kind            text not null check (kind in
                    ('deposit','test_credit','escrow_hold','escrow_release','escrow_refund','platform_fee',
                     'withdrawal_hold','withdrawal_reversal','adjustment')),
  amount          numeric(14,2) not null,        -- signed: + into the wallet, - out of the wallet
  balance_after   numeric(14,2),
  ref_type        text,
  ref_id          text,
  note            text,
  idempotency_key text unique,                   -- retries can never double-credit
  created_at      timestamptz not null default now()
);
create index if not exists ledger_user_idx on public.ledger_entries (user_id, created_at desc);

create table if not exists public.deposit_requests (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles (id) on delete cascade,
  amount        numeric(12,2) not null check (amount > 0),
  method        text not null check (method in ('bkash','nagad','rocket','bank')),
  sender_number text,
  trx_id        text not null,
  status        text not null default 'pending' check (status in ('pending','approved','rejected')),
  admin_note    text,
  reviewed_by   uuid references public.profiles (id),
  created_at    timestamptz not null default now(),
  reviewed_at   timestamptz
);
create index if not exists deposit_user_idx   on public.deposit_requests (user_id, created_at desc);
create index if not exists deposit_status_idx on public.deposit_requests (status, created_at);
-- A transaction id can only ever be used once (unless it was rejected).
create unique index if not exists deposit_trx_unique on public.deposit_requests (method, trx_id) where status <> 'rejected';

create table if not exists public.withdrawal_requests (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles (id) on delete cascade,
  amount       numeric(12,2) not null check (amount > 0),
  fee          numeric(12,2) not null default 0,
  method       text not null check (method in ('bkash','nagad','rocket','bank')),
  account_no   text not null,
  account_name text,
  status       text not null default 'pending' check (status in ('pending','paid','rejected')),
  payout_ref   text,
  admin_note   text,
  reviewed_by  uuid references public.profiles (id),
  created_at   timestamptz not null default now(),
  reviewed_at  timestamptz
);
create index if not exists withdrawal_user_idx   on public.withdrawal_requests (user_id, created_at desc);
create index if not exists withdrawal_status_idx on public.withdrawal_requests (status, created_at);

create table if not exists public.admin_actions (
  id          bigint generated always as identity primary key,
  admin_id    uuid references public.profiles (id) on delete set null,
  action      text not null,
  target_type text,
  target_id   text,
  details     jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists admin_actions_idx on public.admin_actions (created_at desc);

-- One row per important event: point a Supabase Database Webhook at this table to get
-- Telegram / email alerts (see GUIDE.md). Unlike notifications it is one row, not one per admin.
create table if not exists public.admin_alerts (
  id         bigint generated always as identity primary key,
  kind       text not null,
  title      text not null,
  body       text,
  link       text,
  created_at timestamptz not null default now()
);

create or replace function public._notify_admins(p_kind text, p_title text, p_body text default null, p_link text default null)
returns void language plpgsql security definer set search_path = '' as $$
begin
  insert into public.notifications (user_id, kind, title, body, link)
  select id, p_kind, p_title, p_body, p_link from public.profiles where is_admin;
  insert into public.admin_alerts (kind, title, body, link) values (p_kind, p_title, p_body, p_link);
end $$;
revoke execute on function public._notify_admins(text, text, text, text) from public, anon, authenticated;

create or replace function public._audit(p_action text, p_type text, p_id text, p_details jsonb default null)
returns void language sql security definer set search_path = '' as $$
  insert into public.admin_actions (admin_id, action, target_type, target_id, details) values (auth.uid(), p_action, p_type, p_id, p_details);
$$;
revoke execute on function public._audit(text, text, text, jsonb) from public, anon, authenticated;

-- 3. Row Level Security: read-only for owners, full read for admins -------------------
alter table public.wallets             enable row level security;
alter table public.ledger_entries      enable row level security;
alter table public.deposit_requests    enable row level security;
alter table public.withdrawal_requests enable row level security;
alter table public.admin_actions       enable row level security;
alter table public.admin_alerts        enable row level security;

drop policy if exists "own wallet"       on public.wallets;
create policy "own wallet" on public.wallets for select to authenticated using ((select auth.uid()) = user_id or public.is_admin());
drop policy if exists "own ledger"       on public.ledger_entries;
create policy "own ledger" on public.ledger_entries for select to authenticated using ((select auth.uid()) = user_id or public.is_admin());
drop policy if exists "own deposits"     on public.deposit_requests;
create policy "own deposits" on public.deposit_requests for select to authenticated using ((select auth.uid()) = user_id or public.is_admin());
drop policy if exists "own withdrawals"  on public.withdrawal_requests;
create policy "own withdrawals" on public.withdrawal_requests for select to authenticated using ((select auth.uid()) = user_id or public.is_admin());
drop policy if exists "admins read audit" on public.admin_actions;
create policy "admins read audit" on public.admin_actions for select to authenticated using (public.is_admin());
drop policy if exists "admins read alerts" on public.admin_alerts;
create policy "admins read alerts" on public.admin_alerts for select to authenticated using (public.is_admin());

-- Admins can see every order and its timeline (to decide disputes).
drop policy if exists "admins read orders" on public.orders;
create policy "admins read orders" on public.orders for select to authenticated using (public.is_admin());
drop policy if exists "admins read order events" on public.order_events;
create policy "admins read order events" on public.order_events for select to authenticated using (public.is_admin());

-- Banned users can't send messages or place orders (hard stop at the table level).
create or replace function public.block_banned()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if exists (select 1 from public.profiles where id = auth.uid() and is_banned) then
    raise exception 'ACCOUNT_BANNED';
  end if;
  return new;
end $$;
drop trigger if exists messages_block_banned on public.messages;
create trigger messages_block_banned before insert on public.messages for each row execute function public.block_banned();
drop trigger if exists orders_block_banned on public.orders;
create trigger orders_block_banned before insert on public.orders for each row execute function public.block_banned();

-- 4. The one function that moves money --------------------------------------------------
create or replace function public._wallet_apply(
  p_user uuid, p_amount numeric, p_kind text, p_ref_type text, p_ref_id text, p_note text, p_key text)
returns numeric language plpgsql security definer set search_path = '' as $$
declare v_bal numeric;
begin
  -- Idempotent: the same key can never be applied twice.
  if p_key is not null and exists (select 1 from public.ledger_entries where idempotency_key = p_key) then
    return null;
  end if;
  if p_user is null then   -- platform account (fees): ledger only
    insert into public.ledger_entries (user_id, kind, amount, ref_type, ref_id, note, idempotency_key)
    values (null, p_kind, p_amount, p_ref_type, p_ref_id, p_note, p_key);
    return 0;
  end if;
  insert into public.wallets (user_id) values (p_user) on conflict (user_id) do nothing;
  select balance into v_bal from public.wallets where user_id = p_user for update;   -- row lock: no racing debits
  if v_bal + p_amount < 0 then raise exception 'INSUFFICIENT_BALANCE'; end if;
  update public.wallets set balance = balance + p_amount, updated_at = now()
   where user_id = p_user returning balance into v_bal;
  insert into public.ledger_entries (user_id, kind, amount, balance_after, ref_type, ref_id, note, idempotency_key)
  values (p_user, p_kind, p_amount, v_bal, p_ref_type, p_ref_id, p_note, p_key);
  return v_bal;
end $$;
revoke execute on function public._wallet_apply(uuid, numeric, text, text, text, text, text) from public, anon, authenticated;

-- 5. Escrow now moves real wallet money ---------------------------------------------------
-- (Orders paid before this step have payment_provider <> 'wallet' and move no wallet money.)
create or replace function public._complete_order(p_order_id uuid, p_actor uuid, p_note text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_o public.orders;
begin
  select * into v_o from public.orders where id = p_order_id for update;
  update public.orders set status = 'completed', completed_at = now(), updated_at = now() where id = v_o.id;
  update public.listings set status = 'sold' where id = v_o.listing_id;
  if v_o.payment_provider = 'wallet' then
    perform public._wallet_apply(v_o.seller_id, v_o.amount, 'escrow_release', 'order', v_o.id::text,
                                 'বিক্রির টাকা: ' || v_o.listing_title, 'release:' || v_o.id);
    if v_o.fee > 0 then
      perform public._wallet_apply(null, v_o.fee, 'platform_fee', 'order', v_o.id::text, 'escrow fee', 'fee:' || v_o.id);
    end if;
    perform public._notify(v_o.seller_id, 'wallet', '৳' || v_o.amount || ' আপনার ওয়ালেটে জমা হয়েছে', v_o.listing_title, '/wallet');
  end if;
  perform public._log_order_event(v_o.id, p_actor, v_o.status, 'completed', p_note);
end $$;
revoke execute on function public._complete_order(uuid, uuid, text) from public, anon, authenticated;

create or replace function public._refund_order(p_order_id uuid, p_actor uuid, p_note text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_o public.orders;
begin
  select * into v_o from public.orders where id = p_order_id for update;
  update public.orders set status = 'refunded', cancelled_at = now(), updated_at = now() where id = v_o.id;
  update public.listings set status = 'active' where id = v_o.listing_id and status = 'reserved';
  if v_o.payment_provider = 'wallet' then
    perform public._wallet_apply(v_o.buyer_id, v_o.total, 'escrow_refund', 'order', v_o.id::text,
                                 'ফেরত: ' || v_o.listing_title, 'refund:' || v_o.id);
    perform public._notify(v_o.buyer_id, 'wallet', '৳' || v_o.total || ' আপনার ওয়ালেটে ফেরত এসেছে', v_o.listing_title, '/wallet');
  end if;
  perform public._log_order_event(v_o.id, p_actor, v_o.status, 'refunded', p_note);
end $$;
revoke execute on function public._refund_order(uuid, uuid, text) from public, anon, authenticated;

-- Pay for an order from the wallet. All-or-nothing: if anything fails, the debit rolls back.
create or replace function public.pay_order_with_wallet(p_order_id uuid)
returns text language plpgsql security definer set search_path = '' as $$
declare v_o public.orders; v_r text;
begin
  if auth.uid() is null then raise exception 'NOT_AUTHENTICATED'; end if;
  select * into v_o from public.orders where id = p_order_id for update;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;
  if v_o.buyer_id <> auth.uid() then raise exception 'NOT_ALLOWED'; end if;
  if v_o.status = 'funded' then return 'funded'; end if;
  if v_o.status <> 'pending_payment' then raise exception 'INVALID_STATE'; end if;

  perform public._wallet_apply(v_o.buyer_id, -v_o.total, 'escrow_hold', 'order', v_o.id::text,
                               'এসক্রো: ' || v_o.listing_title, 'hold:' || v_o.id);
  v_r := public._fund_order(v_o.id, 'wallet', 'wallet-' || v_o.id);
  if v_r <> 'funded' then raise exception 'LISTING_UNAVAILABLE'; end if;  -- rolls the debit back too
  return 'funded';
end $$;
revoke execute on function public.pay_order_with_wallet(uuid) from public, anon;
grant  execute on function public.pay_order_with_wallet(uuid) to authenticated;

-- The old "fake payment" is gone for good: money only comes from the wallet.
create or replace function public.simulate_payment(p_order_id uuid)
returns text language plpgsql security definer set search_path = '' as $$
begin raise exception 'USE_WALLET'; end $$;

-- Test mode only: gives yourself play money so you can rehearse the full flow before going live.
create or replace function public.test_topup(p_amount numeric)
returns numeric language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'NOT_AUTHENTICATED'; end if;
  if coalesce(public._setting('payments_mode'), 'test') <> 'test' then raise exception 'PAYMENTS_LIVE'; end if;
  if p_amount is null or p_amount <= 0 or p_amount > 20000 then raise exception 'INVALID_AMOUNT'; end if;
  return public._wallet_apply(auth.uid(), round(p_amount, 2), 'test_credit', 'test', null, 'টেস্ট ক্রেডিট', null);
end $$;
revoke execute on function public.test_topup(numeric) from public, anon;
grant  execute on function public.test_topup(numeric) to authenticated;

-- 6. Deposits (user pays your bKash/Nagad number, submits the TrxID, admin verifies) ----------
create or replace function public.submit_deposit(p_amount numeric, p_method text, p_sender text, p_trx text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid; v_trx text := upper(btrim(coalesce(p_trx, '')));
begin
  if auth.uid() is null then raise exception 'NOT_AUTHENTICATED'; end if;
  if public.is_banned() then raise exception 'ACCOUNT_BANNED'; end if;
  if coalesce(public._setting('payments_mode'), 'test') <> 'live' then raise exception 'PAYMENTS_TEST_MODE'; end if;
  if p_amount is null or p_amount < coalesce(public._setting('min_deposit'), '50')::numeric then raise exception 'AMOUNT_TOO_LOW'; end if;
  if p_amount > coalesce(public._setting('max_deposit'), '50000')::numeric then raise exception 'AMOUNT_TOO_HIGH'; end if;
  if v_trx !~ '^[A-Z0-9]{6,20}$' then raise exception 'INVALID_TRX'; end if;
  if p_method in ('bkash','nagad','rocket') and coalesce(p_sender,'') !~ '^01[3-9][0-9]{8}$' then raise exception 'INVALID_NUMBER'; end if;
  if (select count(*) from public.deposit_requests where user_id = auth.uid() and status = 'pending') >= 5 then raise exception 'TOO_MANY_PENDING'; end if;

  insert into public.deposit_requests (user_id, amount, method, sender_number, trx_id)
  values (auth.uid(), round(p_amount, 2), p_method, nullif(btrim(p_sender), ''), v_trx)
  returning id into v_id;   -- the unique index rejects a reused TrxID (23505)

  perform public._notify_admins('deposit', 'নতুন ডিপোজিট যাচাই বাকি: ৳' || round(p_amount, 0), p_method || ' · ' || v_trx, '/admin/payments?tab=deposits');
  return v_id;
end $$;
revoke execute on function public.submit_deposit(numeric, text, text, text) from public, anon;
grant  execute on function public.submit_deposit(numeric, text, text, text) to authenticated;

-- 7. Withdrawals ----------------------------------------------------------------------------------
create or replace function public.request_withdrawal(p_amount numeric, p_method text, p_account text, p_name text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid := gen_random_uuid(); v_fee numeric; v_today numeric;
begin
  if auth.uid() is null then raise exception 'NOT_AUTHENTICATED'; end if;
  if public.is_banned() then raise exception 'ACCOUNT_BANNED'; end if;
  if p_amount is null or p_amount < coalesce(public._setting('min_withdrawal'), '100')::numeric then raise exception 'AMOUNT_TOO_LOW'; end if;
  if p_method in ('bkash','nagad','rocket') and coalesce(p_account,'') !~ '^01[3-9][0-9]{8}$' then raise exception 'INVALID_NUMBER'; end if;
  if p_method = 'bank' and char_length(btrim(coalesce(p_account,''))) < 8 then raise exception 'INVALID_NUMBER'; end if;

  select coalesce(sum(amount), 0) into v_today from public.withdrawal_requests
   where user_id = auth.uid() and created_at > now() - interval '24 hours' and status <> 'rejected';
  if v_today + p_amount > coalesce(public._setting('daily_withdrawal_limit'), '50000')::numeric then raise exception 'DAILY_LIMIT'; end if;

  v_fee := round(p_amount * coalesce(public._setting('withdrawal_fee_bps'), '0')::numeric / 10000.0, 2);
  insert into public.withdrawal_requests (id, user_id, amount, fee, method, account_no, account_name)
  values (v_id, auth.uid(), round(p_amount, 2), v_fee, p_method, btrim(p_account), left(nullif(btrim(p_name), ''), 80));

  perform public._wallet_apply(auth.uid(), -round(p_amount, 2), 'withdrawal_hold', 'withdrawal', v_id::text,
                               'উত্তোলনের অনুরোধ (' || p_method || ')', 'wd-hold:' || v_id);  -- INSUFFICIENT_BALANCE rolls it all back
  perform public._notify_admins('withdrawal', 'নতুন উত্তোলন অনুরোধ: ৳' || round(p_amount, 0), p_method || ' · ' || btrim(p_account), '/admin/payments?tab=withdrawals');
  return v_id;
end $$;
revoke execute on function public.request_withdrawal(numeric, text, text, text) from public, anon;
grant  execute on function public.request_withdrawal(numeric, text, text, text) to authenticated;

-- 8. Admin-only operations (each one checks is_admin() and writes the audit log) ------------------
create or replace function public._require_admin()
returns void language plpgsql stable security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'NOT_AUTHENTICATED'; end if;
  if not public.is_admin() then raise exception 'NOT_ALLOWED'; end if;
end $$;
revoke execute on function public._require_admin() from public, anon, authenticated;

create or replace function public.admin_review_deposit(p_id uuid, p_approve boolean, p_note text default null)
returns void language plpgsql security definer set search_path = '' as $$
declare v_d public.deposit_requests;
begin
  perform public._require_admin();
  select * into v_d from public.deposit_requests where id = p_id for update;
  if not found then raise exception 'NOT_FOUND'; end if;
  if v_d.status <> 'pending' then raise exception 'INVALID_STATE'; end if;
  if p_approve then
    perform public._wallet_apply(v_d.user_id, v_d.amount, 'deposit', 'deposit', v_d.id::text, v_d.method || ' · ' || v_d.trx_id, 'dep:' || v_d.id);
    update public.deposit_requests set status = 'approved', admin_note = p_note, reviewed_by = auth.uid(), reviewed_at = now() where id = v_d.id;
    perform public._notify(v_d.user_id, 'wallet', '৳' || v_d.amount || ' ডিপোজিট অনুমোদিত', 'টাকা আপনার ওয়ালেটে যোগ হয়েছে।', '/wallet');
  else
    update public.deposit_requests set status = 'rejected', admin_note = p_note, reviewed_by = auth.uid(), reviewed_at = now() where id = v_d.id;
    perform public._notify(v_d.user_id, 'wallet', 'ডিপোজিট গ্রহণ করা যায়নি', coalesce(p_note, 'TrxID মেলেনি।'), '/wallet');
  end if;
  perform public._audit(case when p_approve then 'deposit.approve' else 'deposit.reject' end, 'deposit', p_id::text,
                        jsonb_build_object('amount', v_d.amount, 'trx', v_d.trx_id, 'note', p_note));
end $$;

create or replace function public.admin_review_withdrawal(p_id uuid, p_paid boolean, p_ref text default null, p_note text default null)
returns void language plpgsql security definer set search_path = '' as $$
declare v_w public.withdrawal_requests;
begin
  perform public._require_admin();
  select * into v_w from public.withdrawal_requests where id = p_id for update;
  if not found then raise exception 'NOT_FOUND'; end if;
  if v_w.status <> 'pending' then raise exception 'INVALID_STATE'; end if;
  if p_paid then
    if char_length(btrim(coalesce(p_ref, ''))) < 4 then raise exception 'REF_REQUIRED'; end if;
    update public.withdrawal_requests set status = 'paid', payout_ref = btrim(p_ref), admin_note = p_note, reviewed_by = auth.uid(), reviewed_at = now() where id = v_w.id;
    if v_w.fee > 0 then perform public._wallet_apply(null, v_w.fee, 'platform_fee', 'withdrawal', v_w.id::text, 'withdrawal fee', 'wd-fee:' || v_w.id); end if;
    perform public._notify(v_w.user_id, 'wallet', '৳' || (v_w.amount - v_w.fee) || ' পাঠানো হয়েছে', v_w.method || ' · রেফারেন্স ' || btrim(p_ref), '/wallet');
  else
    update public.withdrawal_requests set status = 'rejected', admin_note = p_note, reviewed_by = auth.uid(), reviewed_at = now() where id = v_w.id;
    perform public._wallet_apply(v_w.user_id, v_w.amount, 'withdrawal_reversal', 'withdrawal', v_w.id::text, 'উত্তোলন বাতিল, টাকা ফেরত', 'wd-rev:' || v_w.id);
    perform public._notify(v_w.user_id, 'wallet', 'উত্তোলন বাতিল হয়েছে', coalesce(p_note, 'টাকা ওয়ালেটে ফেরত গেছে।'), '/wallet');
  end if;
  perform public._audit(case when p_paid then 'withdrawal.paid' else 'withdrawal.reject' end, 'withdrawal', p_id::text,
                        jsonb_build_object('amount', v_w.amount, 'ref', p_ref, 'note', p_note));
end $$;

create or replace function public.admin_resolve_dispute(p_order_id uuid, p_outcome text, p_note text default null)
returns void language plpgsql security definer set search_path = '' as $$
declare v_o public.orders;
begin
  perform public._require_admin();
  select * into v_o from public.orders where id = p_order_id for update;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;
  if v_o.status <> 'disputed' then raise exception 'INVALID_STATE'; end if;
  if p_outcome = 'release' then perform public._complete_order(v_o.id, auth.uid(), coalesce(p_note, 'admin: released to seller'));
  elsif p_outcome = 'refund' then perform public._refund_order(v_o.id, auth.uid(), coalesce(p_note, 'admin: refunded to buyer'));
  else raise exception 'INVALID_STATE'; end if;
  perform public._audit('dispute.' || p_outcome, 'order', p_order_id::text, jsonb_build_object('note', p_note));
end $$;

-- Admin can force-refund a funded/delivered order (fraud, listing removed...).
create or replace function public.admin_force_refund(p_order_id uuid, p_note text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_o public.orders;
begin
  perform public._require_admin();
  if char_length(btrim(coalesce(p_note, ''))) < 5 then raise exception 'REASON_TOO_SHORT'; end if;
  select * into v_o from public.orders where id = p_order_id for update;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;
  if v_o.status not in ('funded','delivered','disputed') then raise exception 'INVALID_STATE'; end if;
  perform public._refund_order(v_o.id, auth.uid(), 'admin: ' || p_note);
  perform public._audit('order.force_refund', 'order', p_order_id::text, jsonb_build_object('note', p_note));
end $$;

create or replace function public.admin_adjust_wallet(p_user uuid, p_amount numeric, p_note text)
returns numeric language plpgsql security definer set search_path = '' as $$
declare v_bal numeric;
begin
  perform public._require_admin();
  if char_length(btrim(coalesce(p_note, ''))) < 5 then raise exception 'REASON_TOO_SHORT'; end if;
  if p_amount is null or p_amount = 0 then raise exception 'INVALID_AMOUNT'; end if;
  v_bal := public._wallet_apply(p_user, round(p_amount, 2), 'adjustment', 'admin', auth.uid()::text, btrim(p_note), null);
  perform public._audit('wallet.adjust', 'user', p_user::text, jsonb_build_object('amount', p_amount, 'note', p_note));
  return v_bal;
end $$;

create or replace function public.admin_set_user_ban(p_user uuid, p_banned boolean, p_reason text default null)
returns void language plpgsql security definer set search_path = '' as $$
begin
  perform public._require_admin();
  if p_user = auth.uid() then raise exception 'NOT_ALLOWED'; end if;
  if exists (select 1 from public.profiles where id = p_user and is_admin) then raise exception 'NOT_ALLOWED'; end if;
  update public.profiles set is_banned = p_banned, ban_reason = case when p_banned then p_reason else null end where id = p_user;
  if p_banned then update public.listings set status = 'hidden', hidden_reason = 'seller banned' where seller_id = p_user and status = 'active'; end if;
  perform public._notify(p_user, 'moderation', case when p_banned then 'আপনার অ্যাকাউন্ট সীমিত করা হয়েছে' else 'আপনার অ্যাকাউন্ট আবার সচল' end, p_reason, null);
  perform public._audit(case when p_banned then 'user.ban' else 'user.unban' end, 'user', p_user::text, jsonb_build_object('reason', p_reason));
end $$;

create or replace function public.admin_set_listing_hidden(p_listing_id text, p_hidden boolean, p_reason text default null)
returns void language plpgsql security definer set search_path = '' as $$
declare v_l public.listings;
begin
  perform public._require_admin();
  v_l := public._get_listing(p_listing_id);
  if v_l.id is null then raise exception 'LISTING_NOT_FOUND'; end if;
  if v_l.status = 'reserved' then raise exception 'LISTING_RESERVED'; end if;
  update public.listings set status = case when p_hidden then 'hidden' else 'active' end,
                             hidden_reason = case when p_hidden then p_reason else null end
   where id = v_l.id;
  if v_l.seller_id is not null then
    perform public._notify(v_l.seller_id, 'moderation',
      case when p_hidden then 'আপনার প্রোডাক্ট লুকানো হয়েছে' else 'আপনার প্রোডাক্ট আবার প্রকাশিত' end,
      v_l.title || coalesce(' · ' || p_reason, ''), '/product/' || v_l.id);
  end if;
  perform public._audit(case when p_hidden then 'listing.hide' else 'listing.unhide' end, 'listing', p_listing_id, jsonb_build_object('reason', p_reason));
end $$;

create or replace function public.admin_delete_listing(p_listing_id text, p_reason text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_l public.listings;
begin
  perform public._require_admin();
  v_l := public._get_listing(p_listing_id);
  if v_l.id is null then raise exception 'LISTING_NOT_FOUND'; end if;
  if v_l.status = 'reserved' then raise exception 'LISTING_RESERVED'; end if;
  if v_l.seller_id is not null then
    perform public._notify(v_l.seller_id, 'moderation', 'আপনার প্রোডাক্ট মুছে ফেলা হয়েছে', v_l.title || coalesce(' · ' || p_reason, ''), null);
  end if;
  execute format('delete from public.listings where id = %L', p_listing_id);
  perform public._audit('listing.delete', 'listing', p_listing_id, jsonb_build_object('title', v_l.title, 'reason', p_reason));
end $$;

create or replace function public.admin_set_setting(p_key text, p_value text)
returns void language plpgsql security definer set search_path = '' as $$
begin
  perform public._require_admin();
  if p_key not in ('payments_mode','escrow_fee_bps','auto_release_hours','pending_expiry_minutes','bkash_number','nagad_number','rocket_number',
                   'bank_details','min_deposit','max_deposit','min_withdrawal','withdrawal_fee_bps','daily_withdrawal_limit',
                   'report_auto_hide_threshold','site_name','support_contact') then
    raise exception 'NOT_ALLOWED';
  end if;
  if p_key = 'payments_mode' and p_value not in ('test','live') then raise exception 'INVALID_STATE'; end if;
  insert into public.app_settings (key, value) values (p_key, p_value)
  on conflict (key) do update set value = excluded.value;
  perform public._audit('setting.update', 'setting', p_key, jsonb_build_object('value', p_value));
end $$;

-- Everything an admin needs to read a dispute: the chat for that order's listing (audited).
create or replace function public.admin_order_chat(p_order_id uuid)
returns table (sender_id uuid, body text, created_at timestamptz)
language plpgsql security definer set search_path = '' as $$
declare v_o public.orders; v_c uuid;
begin
  perform public._require_admin();
  select * into v_o from public.orders where id = p_order_id;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;
  select id into v_c from public.conversations where listing_id = v_o.listing_id and buyer_id = v_o.buyer_id;
  perform public._audit('chat.view', 'order', p_order_id::text, null);
  return query select m.sender_id, m.body, m.created_at from public.messages m where m.conversation_id = v_c order by m.created_at;
end $$;

create or replace function public.admin_list_users(p_search text default null, p_limit int default 30, p_offset int default 0)
returns table (id uuid, email text, full_name text, created_at timestamptz, is_banned boolean, is_admin boolean,
               listings bigint, orders bigint, balance numeric, total_count bigint)
language plpgsql security definer set search_path = '' as $$
begin
  perform public._require_admin();
  return query
    select p.id, u.email::text, p.full_name, p.created_at, p.is_banned, p.is_admin,
           (select count(*) from public.listings l where l.seller_id = p.id),
           (select count(*) from public.orders o where p.id in (o.buyer_id, o.seller_id)),
           coalesce((select w.balance from public.wallets w where w.user_id = p.id), 0),
           count(*) over()
      from public.profiles p join auth.users u on u.id = p.id
     where p_search is null or p_search = ''
        or u.email ilike '%' || p_search || '%' or p.full_name ilike '%' || p_search || '%'
     order by p.created_at desc
     limit least(p_limit, 100) offset greatest(p_offset, 0);
end $$;

create or replace function public.admin_stats()
returns jsonb language plpgsql security definer set search_path = '' as $$
declare r jsonb;
begin
  perform public._require_admin();
  select jsonb_build_object(
    'users',            (select count(*) from public.profiles),
    'users_7d',         (select count(*) from public.profiles where created_at > now() - interval '7 days'),
    'listings_active',  (select count(*) from public.listings where status = 'active'),
    'listings_hidden',  (select count(*) from public.listings where status = 'hidden'),
    'orders_total',     (select count(*) from public.orders),
    'orders_live',      (select count(*) from public.orders where status in ('funded','delivered')),
    'orders_disputed',  (select count(*) from public.orders where status = 'disputed'),
    'gmv',              coalesce((select sum(amount) from public.orders where status = 'completed'), 0),
    'escrow_held',      coalesce((select sum(total) from public.orders where status in ('funded','delivered','disputed') and payment_provider = 'wallet'), 0),
    'fees_earned',      coalesce((select sum(amount) from public.ledger_entries where kind = 'platform_fee'), 0),
    'wallet_balances',  coalesce((select sum(balance) from public.wallets), 0),
    'reports_open',     (select count(*) from public.reports where status in ('open','investigating')),
    'deposits_pending', (select count(*) from public.deposit_requests where status = 'pending'),
    'deposits_pending_amount', coalesce((select sum(amount) from public.deposit_requests where status = 'pending'), 0),
    'withdrawals_pending', (select count(*) from public.withdrawal_requests where status = 'pending'),
    'withdrawals_pending_amount', coalesce((select sum(amount) from public.withdrawal_requests where status = 'pending'), 0),
    'daily', (select coalesce(jsonb_agg(d order by d.day), '[]'::jsonb) from (
                select g.day::date as day,
                       (select count(*) from public.profiles p where p.created_at::date = g.day::date) as signups,
                       (select count(*) from public.listings l where l.created_at::date = g.day::date) as listings,
                       (select count(*) from public.orders o where o.created_at::date = g.day::date) as orders
                  from generate_series(current_date - 13, current_date, interval '1 day') g(day)) d)
  ) into r;
  return r;
end $$;

-- Grant the admin RPCs to signed-in users; each one re-checks is_admin() itself.
do $$
declare f text;
begin
  foreach f in array array[
    'admin_review_deposit(uuid, boolean, text)', 'admin_review_withdrawal(uuid, boolean, text, text)',
    'admin_resolve_dispute(uuid, text, text)', 'admin_force_refund(uuid, text)', 'admin_adjust_wallet(uuid, numeric, text)',
    'admin_set_user_ban(uuid, boolean, text)', 'admin_set_listing_hidden(text, boolean, text)', 'admin_delete_listing(text, text)',
    'admin_set_setting(text, text)', 'admin_order_chat(uuid)', 'admin_list_users(text, int, int)', 'admin_stats()'
  ] loop
    execute format('revoke execute on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;

-- 9. Realtime ---------------------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['wallets','deposit_requests','withdrawal_requests'] loop
    if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename=t) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;
