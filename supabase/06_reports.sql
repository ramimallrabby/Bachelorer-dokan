-- =====================================================================
-- Bachelorer Dokan | STEP 6: reports + moderation queue
-- Requires steps 4 and 5. Safe to re-run.
-- A report instantly: (1) notifies every admin in-app (realtime bell),
-- (2) writes an admin_alerts row (hook Telegram/email on it, see GUIDE.md),
-- (3) auto-hides the listing once N different people reported it.
-- =====================================================================
create table if not exists public.reports (
  id             uuid primary key default gen_random_uuid(),
  reporter_id    uuid not null references public.profiles (id) on delete cascade,
  target_type    text not null check (target_type in ('listing','user')),
  target_id      text not null,                       -- listing id (any type) or user uuid
  target_user_id uuid references public.profiles (id) on delete set null,  -- the seller / reported person
  target_title   text,                                -- snapshot: survives deletion
  reason         text not null check (reason in ('scam','fake','prohibited','wrong_category','abusive','duplicate','other')),
  details        text check (details is null or char_length(details) <= 800),
  status         text not null default 'open' check (status in ('open','investigating','resolved','dismissed')),
  priority       text not null default 'normal' check (priority in ('normal','high','critical')),
  resolution     text,                                -- dismiss | hide_listing | delete_listing | warn_user | ban_user
  admin_note     text,
  handled_by     uuid references public.profiles (id),
  created_at     timestamptz not null default now(),
  resolved_at    timestamptz
);
create index if not exists reports_status_idx on public.reports (status, priority, created_at desc);
create index if not exists reports_target_idx on public.reports (target_type, target_id);
create unique index if not exists reports_one_open_per_reporter
  on public.reports (reporter_id, target_type, target_id) where status in ('open','investigating');

alter table public.reports enable row level security;
drop policy if exists "reporter or admin reads reports" on public.reports;
create policy "reporter or admin reads reports" on public.reports for select to authenticated
  using ((select auth.uid()) = reporter_id or public.is_admin());

create or replace function public.submit_report(p_type text, p_target_id text, p_reason text, p_details text default null)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid := auth.uid(); v_id uuid; v_l public.listings; v_user uuid; v_title text;
  v_count int; v_prio text := 'normal'; v_threshold int;
begin
  if v_uid is null then raise exception 'NOT_AUTHENTICATED'; end if;
  if (select count(*) from public.reports where reporter_id = v_uid and created_at > now() - interval '24 hours') >= 10 then
    raise exception 'TOO_MANY_REPORTS';
  end if;

  if p_type = 'listing' then
    v_l := public._get_listing(p_target_id);
    if v_l.id is null then raise exception 'LISTING_NOT_FOUND'; end if;
    v_user := v_l.seller_id; v_title := v_l.title;
  elsif p_type = 'user' then
    begin v_user := p_target_id::uuid; exception when others then raise exception 'NOT_FOUND'; end;
    select full_name into v_title from public.profiles where id = v_user;
    if not found then raise exception 'NOT_FOUND'; end if;
  else
    raise exception 'NOT_FOUND';
  end if;
  if v_user = v_uid then raise exception 'OWN_LISTING'; end if;

  if p_reason in ('scam','fake') then v_prio := 'high'; end if;

  insert into public.reports (reporter_id, target_type, target_id, target_user_id, target_title, reason, details, priority)
  values (v_uid, p_type, p_target_id, v_user, v_title, p_reason, left(nullif(btrim(p_details), ''), 800), v_prio)
  returning id into v_id;     -- duplicate open report by the same person -> 23505

  select count(distinct reporter_id) into v_count from public.reports
   where target_type = p_type and target_id = p_target_id and status in ('open','investigating');
  if v_count >= 2 then
    update public.reports set priority = case when v_count >= 3 then 'critical' else 'high' end
     where target_type = p_type and target_id = p_target_id and status in ('open','investigating');
  end if;

  -- Auto-hide a listing that several different people reported (unless a live escrow order exists).
  v_threshold := coalesce(public._setting('report_auto_hide_threshold'), '3')::int;
  if p_type = 'listing' and v_count >= v_threshold and v_l.status = 'active' then
    update public.listings set status = 'hidden', hidden_reason = 'auto-hidden: ' || v_count || ' reports' where id = v_l.id;
    if v_l.seller_id is not null then
      perform public._notify(v_l.seller_id, 'moderation', 'আপনার প্রোডাক্ট পর্যালোচনার জন্য লুকানো হয়েছে',
                             v_l.title || ' · একাধিক রিপোর্ট এসেছে। আমাদের টিম দেখছে।', '/profile/listings');
    end if;
  end if;

  perform public._notify_admins('report',
    case when v_count >= v_threshold then '🚨 বারবার রিপোর্ট: ' else 'নতুন রিপোর্ট: ' end || coalesce(v_title, 'ব্যবহারকারী'),
    p_reason || ' · মোট ' || v_count || 'টি রিপোর্ট', '/admin/reports');
  return v_id;
end $$;
revoke execute on function public.submit_report(text, text, text, text) from public, anon;
grant  execute on function public.submit_report(text, text, text, text) to authenticated;

-- action: dismiss | hide_listing | delete_listing | warn_user | ban_user | investigate
create or replace function public.admin_resolve_report(p_report_id uuid, p_action text, p_note text default null)
returns void language plpgsql security definer set search_path = '' as $$
declare v_r public.reports; v_status text := 'resolved';
begin
  perform public._require_admin();
  select * into v_r from public.reports where id = p_report_id for update;
  if not found then raise exception 'NOT_FOUND'; end if;

  if p_action = 'investigate' then
    update public.reports set status = 'investigating', handled_by = auth.uid() where id = v_r.id;
    perform public._audit('report.investigate', 'report', p_report_id::text, null);
    return;
  end if;
  if v_r.status in ('resolved','dismissed') then raise exception 'INVALID_STATE'; end if;

  if p_action = 'dismiss' then
    v_status := 'dismissed';
    -- a dismissed report on an auto-hidden listing: admin can unhide it from the listings tab
  elsif p_action = 'hide_listing' then
    perform public.admin_set_listing_hidden(v_r.target_id, true, coalesce(p_note, 'report'));
  elsif p_action = 'delete_listing' then
    perform public.admin_delete_listing(v_r.target_id, coalesce(p_note, 'report'));
  elsif p_action = 'warn_user' then
    if v_r.target_user_id is not null then
      perform public._notify(v_r.target_user_id, 'moderation', 'সতর্কতা', coalesce(p_note, 'আপনার বিরুদ্ধে অভিযোগ এসেছে। নিয়ম মেনে চলুন।'), null);
    end if;
  elsif p_action = 'ban_user' then
    if v_r.target_user_id is null then raise exception 'NOT_FOUND'; end if;
    perform public.admin_set_user_ban(v_r.target_user_id, true, coalesce(p_note, 'report'));
  else
    raise exception 'INVALID_STATE';
  end if;

  -- close every open report about the same target in one go
  update public.reports
     set status = v_status, resolution = p_action, admin_note = p_note, handled_by = auth.uid(), resolved_at = now()
   where target_type = v_r.target_type and target_id = v_r.target_id and status in ('open','investigating');

  perform public._notify(r.reporter_id, 'system', 'আপনার রিপোর্টে ব্যবস্থা নেওয়া হয়েছে', 'ধন্যবাদ, আপনার জন্য প্ল্যাটফর্ম আরও নিরাপদ।', null)
    from public.reports r
   where r.target_type = v_r.target_type and r.target_id = v_r.target_id and r.resolution = p_action and r.resolved_at > now() - interval '5 seconds';
  perform public._audit('report.' || p_action, 'report', p_report_id::text, jsonb_build_object('note', p_note));
end $$;
revoke execute on function public.admin_resolve_report(uuid, text, text) from public, anon;
grant  execute on function public.admin_resolve_report(uuid, text, text) to authenticated;

do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='reports') then
    alter publication supabase_realtime add table public.reports;
  end if;
end $$;
