-- =====================================================================
-- Bachelorer Dokan | STEP 2: real-time chat between buyer and seller
-- Requires step 1. Safe to re-run.
-- =====================================================================

-- conversations.listing_id must have the same type as listings.id (bigint or uuid).
do $$
declare id_type text;
begin
  select format_type(a.atttypid, a.atttypmod) into id_type
  from pg_attribute a
  where a.attrelid = 'public.listings'::regclass and a.attname = 'id' and not a.attisdropped;

  execute format($t$
    create table if not exists public.conversations (
      id                   uuid primary key default gen_random_uuid(),
      listing_id           %s not null references public.listings (id) on delete cascade,
      buyer_id             uuid not null references public.profiles (id) on delete cascade,
      seller_id            uuid not null references public.profiles (id) on delete cascade,
      last_message_at      timestamptz not null default now(),
      last_message_preview text,
      last_sender_id       uuid,
      created_at           timestamptz not null default now(),
      unique (listing_id, buyer_id),
      check (buyer_id <> seller_id)
    )$t$, id_type);
end $$;

create table if not exists public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id       uuid not null references public.profiles (id) on delete cascade default auth.uid(),
  body            text not null check (char_length(btrim(body)) between 1 and 2000),
  created_at      timestamptz not null default now(),
  read_at         timestamptz
);

create index if not exists messages_conv_created_idx on public.messages (conversation_id, created_at desc);
create index if not exists messages_unread_idx       on public.messages (conversation_id) where read_at is null;
create index if not exists conversations_buyer_idx   on public.conversations (buyer_id);
create index if not exists conversations_seller_idx  on public.conversations (seller_id);

-- Is the current user a participant? (security definer avoids recursive policy lookups)
create or replace function public.is_conversation_member(p_conversation_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.conversations c
    where c.id = p_conversation_id and (select auth.uid()) in (c.buyer_id, c.seller_id)
  )
$$;
revoke execute on function public.is_conversation_member(uuid) from public, anon;
grant  execute on function public.is_conversation_member(uuid) to authenticated;

-- Keep the inbox preview in sync with the newest message.
create or replace function public.on_message_insert()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  update public.conversations
     set last_message_at = new.created_at,
         last_message_preview = left(new.body, 140),
         last_sender_id = new.sender_id
   where id = new.conversation_id;
  return new;
end $$;
drop trigger if exists messages_after_insert on public.messages;
create trigger messages_after_insert after insert on public.messages
  for each row execute function public.on_message_insert();

-- Row Level Security: only the two participants can see or write ----------
alter table public.conversations enable row level security;
alter table public.messages      enable row level security;

drop policy if exists "participants read conversations" on public.conversations;
create policy "participants read conversations" on public.conversations for select to authenticated
  using ((select auth.uid()) in (buyer_id, seller_id));

drop policy if exists "participants read messages" on public.messages;
create policy "participants read messages" on public.messages for select to authenticated
  using (public.is_conversation_member(conversation_id));

drop policy if exists "participants send messages" on public.messages;
create policy "participants send messages" on public.messages for insert to authenticated
  with check (sender_id = (select auth.uid()) and public.is_conversation_member(conversation_id));
-- No UPDATE/DELETE policies: nobody can edit or delete messages through the API.

-- Start (or reopen) a conversation about a listing. Buyer: pass only the listing.
-- Seller: may reopen an existing thread by passing the buyer's id.
create or replace function public.start_conversation(p_listing_id text, p_buyer_id uuid default null)
returns uuid language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := auth.uid(); v_l public.listings; v_id uuid;
begin
  if v_uid is null then raise exception 'NOT_AUTHENTICATED'; end if;
  v_l := public._get_listing(p_listing_id);
  if v_l.id is null then raise exception 'LISTING_NOT_FOUND'; end if;
  if v_l.seller_id is null then raise exception 'LISTING_NO_SELLER'; end if;

  if v_uid = v_l.seller_id then
    select id into v_id from public.conversations where listing_id = v_l.id and buyer_id = p_buyer_id;
    if v_id is null then raise exception 'NOT_ALLOWED'; end if;
    return v_id;
  end if;

  insert into public.conversations (listing_id, buyer_id, seller_id)
  values (v_l.id, v_uid, v_l.seller_id)
  on conflict (listing_id, buyer_id) do nothing;

  select id into v_id from public.conversations where listing_id = v_l.id and buyer_id = v_uid;
  return v_id;
end $$;
revoke execute on function public.start_conversation(text, uuid) from public, anon;
grant  execute on function public.start_conversation(text, uuid) to authenticated;

create or replace function public.mark_conversation_read(p_conversation_id uuid)
returns void language sql security definer set search_path = '' as $$
  update public.messages
     set read_at = now()
   where conversation_id = p_conversation_id
     and sender_id <> auth.uid()
     and read_at is null
     and public.is_conversation_member(p_conversation_id);
$$;
revoke execute on function public.mark_conversation_read(uuid) from public, anon;
grant  execute on function public.mark_conversation_read(uuid) to authenticated;

-- Realtime: broadcast changes (still filtered by the RLS policies above) ----
do $$
declare t text;
begin
  foreach t in array array['messages', 'conversations'] loop
    if not exists (select 1 from pg_publication_tables
                   where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;
