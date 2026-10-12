-- =====================================================================
-- Bachelorer Dokan | STEP 1: profiles, seller-linked listings, security
-- Run once in: Supabase Dashboard -> SQL Editor -> New query -> Run.
-- Safe to re-run. Only ADDS columns: your existing listings are kept.
-- =====================================================================

-- 1. Profiles: public display info for each signed-up user ---------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  full_name  text,
  avatar_url text,
  university text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

drop policy if exists "profiles are public" on public.profiles;
create policy "profiles are public" on public.profiles for select using (true);

drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile" on public.profiles for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Create a profile automatically whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Profiles for users who already exist.
insert into public.profiles (id, full_name)
select u.id, coalesce(nullif(u.raw_user_meta_data ->> 'full_name', ''), split_part(u.email, '@', 1))
from auth.users u
on conflict (id) do nothing;

-- 2. Listings: seller, category, condition, status -------------------------
alter table public.listings
  add column if not exists seller_id uuid references public.profiles (id) on delete set null default auth.uid(),
  add column if not exists category  text,
  add column if not exists condition text,
  add column if not exists status    text not null default 'active';

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'listings_status_check') then
    alter table public.listings add constraint listings_status_check check (status in ('active', 'reserved', 'sold'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'listings_category_check') then
    alter table public.listings add constraint listings_category_check
      check (category is null or category in ('books','notes','electronics','stationery','hostel','clothing','others'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'listings_condition_check') then
    alter table public.listings add constraint listings_condition_check
      check (condition is null or condition in ('new','like_new','good','used'));
  end if;
end $$;

-- Indexes for the homepage query (newest first, filters, search).
create index if not exists listings_created_at_idx on public.listings (created_at desc);
create index if not exists listings_seller_idx     on public.listings (seller_id);
create index if not exists listings_status_idx     on public.listings (status);

create extension if not exists pg_trgm with schema extensions;
create index if not exists listings_title_trgm on public.listings using gin (title extensions.gin_trgm_ops);
create index if not exists listings_desc_trgm  on public.listings using gin (description extensions.gin_trgm_ops);

-- Distinct locations (powers the location suggestions).
create or replace view public.listing_locations with (security_invoker = true) as
  select location, count(*)::int as listings
  from public.listings
  where location is not null and btrim(location) <> '' and status in ('active', 'reserved')
  group by location
  order by count(*) desc;
grant select on public.listing_locations to anon, authenticated;

-- 3. Row Level Security on listings --------------------------------------
alter table public.listings enable row level security;

-- Remove whatever policies existed before (e.g. the old "anyone can insert"),
-- so the rules below are the only ones.
do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'listings' loop
    execute format('drop policy %I on public.listings', p.policyname);
  end loop;
end $$;

create policy "anyone can view listings" on public.listings for select using (true);

create policy "signed-in users post as themselves" on public.listings for insert to authenticated
  with check ((select auth.uid()) = seller_id and status = 'active');

create policy "sellers edit their own listings" on public.listings for update to authenticated
  using ((select auth.uid()) = seller_id) with check ((select auth.uid()) = seller_id);

create policy "sellers delete their own unreserved listings" on public.listings for delete to authenticated
  using ((select auth.uid()) = seller_id and status <> 'reserved');

-- Sellers may edit content columns, but never `status` or `seller_id`.
-- Status only changes through the functions below / the escrow flow.
revoke update on public.listings from authenticated;
grant update (title, price, description, location, image_url, category, condition) on public.listings to authenticated;

-- 4. Storage: only signed-in users upload, only into their own folder ------
do $$
declare p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and (coalesce(qual, '') ilike '%product-images%' or coalesce(with_check, '') ilike '%product-images%')
  loop
    execute format('drop policy %I on storage.objects', p.policyname);
  end loop;
end $$;

-- The bucket is public, so image URLs keep working without any read policy.
create policy "product images: owner can list own" on storage.objects for select to authenticated
  using (bucket_id = 'product-images' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "product images: owner can upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "product images: owner can replace" on storage.objects for update to authenticated
  using (bucket_id = 'product-images' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "product images: owner can delete" on storage.objects for delete to authenticated
  using (bucket_id = 'product-images' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- 5. Helpers used by later steps ------------------------------------------
-- Your listings.id may be a bigint or a uuid. Functions take the id as text and
-- this helper looks it up with the right type, so the SQL works either way.
create or replace function public._get_listing(p_id text)
returns public.listings language plpgsql stable security definer set search_path = '' as $$
declare r public.listings;
begin
  execute format('select * from public.listings where id = %L', p_id) into r;
  return r;
exception when invalid_text_representation then
  return null; -- id like "abc" for a bigint column: treat as not found
end $$;
revoke execute on function public._get_listing(text) from public, anon, authenticated;

create or replace function public.mark_listing_sold(p_listing_id text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_l public.listings;
begin
  if auth.uid() is null then raise exception 'NOT_AUTHENTICATED'; end if;
  v_l := public._get_listing(p_listing_id);
  if v_l.id is null then raise exception 'LISTING_NOT_FOUND'; end if;
  if v_l.seller_id is distinct from auth.uid() then raise exception 'NOT_ALLOWED'; end if;
  if v_l.status = 'reserved' then raise exception 'LISTING_RESERVED'; end if;
  update public.listings set status = 'sold' where id = v_l.id;
end $$;
revoke execute on function public.mark_listing_sold(text) from public, anon;
grant  execute on function public.mark_listing_sold(text) to authenticated;

-- OPTIONAL: give your existing (pre-login) listings an owner, so they can be managed:
--   update public.listings set seller_id = '<your-user-uuid>' where seller_id is null;
