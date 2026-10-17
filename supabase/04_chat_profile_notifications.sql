-- =====================================================================
-- Bachelorer Dokan | STEP 4: chat ticks, profile fields, admin role, notifications
-- Requires steps 1-3. Safe to re-run.
-- =====================================================================

-- 1. Chat: "delivered" tick (seen = read_at already exists) ---------------------
alter table public.messages add column if not exists delivered_at timestamptz;

create or replace function public.mark_conversation_delivered(p_conversation_id uuid)
returns void language sql security definer set search_path = '' as $$
  update public.messages
     set delivered_at = now()
   where conversation_id = p_conversation_id
     and sender_id <> auth.uid()
     and delivered_at is null
     and public.is_conversation_member(p_conversation_id);
$$;
revoke execute on function public.mark_conversation_delivered(uuid) from public, anon;
grant  execute on function public.mark_conversation_delivered(uuid) to authenticated;

-- Marks everything addressed to me as delivered (called when the app is open anywhere).
create or replace function public.mark_all_delivered()
returns void language sql security definer set search_path = '' as $$
  update public.messages m
     set delivered_at = now()
   where m.delivered_at is null
     and m.sender_id <> auth.uid()
     and exists (select 1 from public.conversations c
                 where c.id = m.conversation_id and auth.uid() in (c.buyer_id, c.seller_id));
$$;
revoke execute on function public.mark_all_delivered() from public, anon;
grant  execute on function public.mark_all_delivered() to authenticated;

-- A read message is also a delivered one.
create or replace function public.mark_conversation_read(p_conversation_id uuid)
returns void language sql security definer set search_path = '' as $$
  update public.messages
     set read_at = now(), delivered_at = coalesce(delivered_at, now())
   where conversation_id = p_conversation_id
     and sender_id <> auth.uid()
     and read_at is null
     and public.is_conversation_member(p_conversation_id);
$$;

-- Realtime must send UPDATEs (ticks turning blue) with the whole row.
alter table public.messages replica identity full;


-- 2. Profiles: richer, editable --------------------------------------------------
alter table public.profiles
  add column if not exists bio         text check (bio is null or char_length(bio) <= 300),
  add column if not exists department  text,
  add column if not exists city        text,
  add column if not exists cover_url   text,
  add column if not exists is_admin    boolean not null default false,
  add column if not exists is_banned   boolean not null default false,
  add column if not exists ban_reason  text,
  add column if not exists last_seen_at timestamptz,
  add column if not exists updated_at  timestamptz not null default now();

-- Users may edit only these columns (NOT is_admin / is_banned).
revoke update on public.profiles from authenticated;
grant  update (full_name, avatar_url, cover_url, university, department, city, bio, last_seen_at, updated_at)
  on public.profiles to authenticated;

-- Profiles are public, but moderation flags are NOT: only these columns are readable via the API.
-- (is_admin / is_banned / ban_reason are returned only to their owner via my_flags(), and to admins via admin_list_users().)
revoke select on public.profiles from anon, authenticated;
grant  select (id, full_name, avatar_url, cover_url, university, department, city, bio, created_at, last_seen_at, updated_at)
  on public.profiles to anon, authenticated;

create or replace function public.my_flags()
returns table (is_admin boolean, is_banned boolean, ban_reason text)
language sql stable security definer set search_path = '' as $$
  select p.is_admin, p.is_banned, p.ban_reason from public.profiles p where p.id = auth.uid()
$$;
revoke execute on function public.my_flags() from public, anon;
grant  execute on function public.my_flags() to authenticated;

-- Admin check used by every policy and RPC below.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((select p.is_admin from public.profiles p where p.id = auth.uid()), false)
$$;
revoke execute on function public.is_admin() from public, anon;
grant  execute on function public.is_admin() to authenticated;

-- Banned users cannot post, chat, or buy.
create or replace function public.is_banned()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((select p.is_banned from public.profiles p where p.id = auth.uid()), false)
$$;
revoke execute on function public.is_banned() from public, anon;
grant  execute on function public.is_banned() to authenticated;

-- Avatars live in their own public bucket (create it in Storage UI: name = avatars, public ON).
do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname='storage' and tablename='objects'
           and (coalesce(qual,'') ilike '%avatars%' or coalesce(with_check,'') ilike '%avatars%') loop
    execute format('drop policy %I on storage.objects', p.policyname);
  end loop;
end $$;
create policy "avatars: owner upload"  on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "avatars: owner replace" on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "avatars: owner delete"  on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- 3. Listings: moderation status + edit tracking --------------------------------
alter table public.listings add column if not exists updated_at timestamptz not null default now();
alter table public.listings add column if not exists views int not null default 0;
alter table public.listings add column if not exists hidden_reason text;

alter table public.listings drop constraint if exists listings_status_check;
alter table public.listings add constraint listings_status_check
  check (status in ('active','reserved','sold','hidden'));

-- Public never sees hidden listings; owners and admins still do.
drop policy if exists "anyone can view listings" on public.listings;
create policy "anyone can view listings" on public.listings for select
  using (status <> 'hidden' or seller_id = (select auth.uid()) or public.is_admin());

-- Banned users can't post.
drop policy if exists "signed-in users post as themselves" on public.listings;
create policy "signed-in users post as themselves" on public.listings for insert to authenticated
  with check ((select auth.uid()) = seller_id and status = 'active' and not public.is_banned());

-- Sellers can't edit while an escrow order is live (price must not change under a buyer).
drop policy if exists "sellers edit their own listings" on public.listings;
create policy "sellers edit their own listings" on public.listings for update to authenticated
  using ((select auth.uid()) = seller_id and status in ('active','sold'))
  with check ((select auth.uid()) = seller_id);

grant update (title, price, description, location, image_url, category, condition, updated_at)
  on public.listings to authenticated;

create or replace function public.touch_listing()
returns trigger language plpgsql as $$ begin new.updated_at := now(); return new; end $$;
drop trigger if exists listings_touch on public.listings;
create trigger listings_touch before update on public.listings
  for each row execute function public.touch_listing();

-- Seller can re-open a sold listing (e.g. buyer backed out off-platform)
create or replace function public.reopen_listing(p_listing_id text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_l public.listings;
begin
  if auth.uid() is null then raise exception 'NOT_AUTHENTICATED'; end if;
  v_l := public._get_listing(p_listing_id);
  if v_l.id is null then raise exception 'LISTING_NOT_FOUND'; end if;
  if v_l.seller_id is distinct from auth.uid() then raise exception 'NOT_ALLOWED'; end if;
  if v_l.status <> 'sold' then raise exception 'INVALID_STATE'; end if;
  if exists (select 1 from public.orders where listing_id = v_l.id and status in ('funded','delivered','disputed','completed')) then
    raise exception 'LISTING_RESERVED';
  end if;
  update public.listings set status = 'active' where id = v_l.id;
end $$;
revoke execute on function public.reopen_listing(text) from public, anon;
grant  execute on function public.reopen_listing(text) to authenticated;

-- View counter (cheap, no auth needed)
create or replace function public.bump_listing_views(p_listing_id text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_l public.listings;
begin
  v_l := public._get_listing(p_listing_id);
  if v_l.id is not null then update public.listings set views = views + 1 where id = v_l.id; end if;
end $$;
grant execute on function public.bump_listing_views(text) to anon, authenticated;

-- 4. Notifications ----------------------------------------------------------------
create table if not exists public.notifications (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references public.profiles (id) on delete cascade,
  kind       text not null,           -- 'report' 'order' 'wallet' 'message' 'system' 'moderation'
  title      text not null,
  body       text,
  link       text,
  read_at    timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);
create index if not exists notifications_unread_idx on public.notifications (user_id) where read_at is null;
alter table public.notifications enable row level security;

drop policy if exists "read own notifications" on public.notifications;
create policy "read own notifications" on public.notifications for select to authenticated
  using ((select auth.uid()) = user_id);
drop policy if exists "update own notifications" on public.notifications;
create policy "update own notifications" on public.notifications for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
revoke update on public.notifications from authenticated;
grant  update (read_at) on public.notifications to authenticated;

create or replace function public._notify(p_user uuid, p_kind text, p_title text, p_body text default null, p_link text default null)
returns void language sql security definer set search_path = '' as $$
  insert into public.notifications (user_id, kind, title, body, link) values (p_user, p_kind, p_title, p_body, p_link);
$$;
revoke execute on function public._notify(uuid, text, text, text, text) from public, anon, authenticated;

-- Notify every admin at once (new report, new deposit to verify, dispute...)
create or replace function public._notify_admins(p_kind text, p_title text, p_body text default null, p_link text default null)
returns void language sql security definer set search_path = '' as $$
  insert into public.notifications (user_id, kind, title, body, link)
  select id, p_kind, p_title, p_body, p_link from public.profiles where is_admin;
$$;
revoke execute on function public._notify_admins(text, text, text, text) from public, anon, authenticated;

create or replace function public.mark_notifications_read()
returns void language sql security definer set search_path = '' as $$
  update public.notifications set read_at = now() where user_id = auth.uid() and read_at is null;
$$;
revoke execute on function public.mark_notifications_read() from public, anon;
grant  execute on function public.mark_notifications_read() to authenticated;

-- Notify on new chat message (only if the other person isn't looking at it: handled by UI badge).
create or replace function public.on_message_notify()
returns trigger language plpgsql security definer set search_path = '' as $$
declare v_c public.conversations; v_to uuid; v_name text;
begin
  select * into v_c from public.conversations where id = new.conversation_id;
  v_to := case when new.sender_id = v_c.buyer_id then v_c.seller_id else v_c.buyer_id end;
  select coalesce(full_name, 'কেউ') into v_name from public.profiles where id = new.sender_id;
  -- one unread message-notification per conversation (no spam)
  if not exists (select 1 from public.notifications
                 where user_id = v_to and kind = 'message' and read_at is null and link = '/messages/' || v_c.id) then
    perform public._notify(v_to, 'message', v_name || ' মেসেজ পাঠিয়েছেন', left(new.body, 80), '/messages/' || v_c.id);
  end if;
  return new;
end $$;
drop trigger if exists messages_notify on public.messages;
create trigger messages_notify after insert on public.messages
  for each row execute function public.on_message_notify();

-- Notify both parties on every order status change.
create or replace function public.on_order_event_notify()
returns trigger language plpgsql security definer set search_path = '' as $$
declare v_o public.orders; v_label text;
begin
  select * into v_o from public.orders where id = new.order_id;
  v_label := case new.to_status
    when 'funded' then 'টাকা এসক্রো-তে জমা হয়েছে'
    when 'delivered' then 'পণ্য হস্তান্তর হয়েছে'
    when 'completed' then 'অর্ডার সম্পন্ন'
    when 'disputed' then 'অর্ডারে বিরোধ খোলা হয়েছে'
    when 'cancelled' then 'অর্ডার বাতিল'
    when 'refunded' then 'টাকা ফেরত'
    else null end;
  if v_label is not null then
    if new.actor_id is distinct from v_o.buyer_id  then perform public._notify(v_o.buyer_id,  'order', v_label, v_o.listing_title, '/orders/' || v_o.id); end if;
    if new.actor_id is distinct from v_o.seller_id then perform public._notify(v_o.seller_id, 'order', v_label, v_o.listing_title, '/orders/' || v_o.id); end if;
    if new.to_status = 'disputed' then
      perform public._notify_admins('dispute', 'নতুন বিরোধ: ' || v_o.listing_title, left(coalesce(new.note, ''), 120), '/admin/orders?status=disputed');
    end if;
  end if;
  return new;
end $$;
drop trigger if exists order_events_notify on public.order_events;
create trigger order_events_notify after insert on public.order_events
  for each row execute function public.on_order_event_notify();

do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='notifications') then
    alter publication supabase_realtime add table public.notifications;
  end if;
end $$;

-- 5. Make yourself admin (run ONCE, with your own account's email) -------------------
--   update public.profiles set is_admin = true
--   where id = (select id from auth.users where email = 'you@example.com');
