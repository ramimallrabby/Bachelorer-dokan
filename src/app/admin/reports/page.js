'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { ActionDialog, Card, Empty, PageHeader, Segmented } from '@/components/admin/kit'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icons'
import { Skeleton } from '@/components/ui/Feedback'
import { StatusPill } from '@/components/ui/Pill'
import { adminReports, resolveReport } from '@/lib/services/admin'
import { PRIORITY, REPORT_REASONS, REPORT_STATUS } from '@/lib/constants'
import { friendlyError } from '@/lib/errors'
import { supabase } from '@/lib/supabase'
import { timeAgo } from '@/lib/format'

const ACTIONS = {
  dismiss: { title: 'রিপোর্ট খারিজ করুন', desc: 'এই রিপোর্টে কোনো সমস্যা পাওয়া যায়নি। এই টার্গেটের সব খোলা রিপোর্ট বন্ধ হবে।', label: 'খারিজ করুন' },
  hide_listing: { title: 'প্রোডাক্ট লুকান', desc: 'প্রোডাক্টটি পাবলিক থেকে সরে যাবে। বিক্রেতা কারণ সহ নোটিফিকেশন পাবে এবং চাইলে আপনি পরে আবার চালু করতে পারবেন।', label: 'লুকিয়ে দিন', danger: true },
  delete_listing: { title: 'প্রোডাক্ট মুছে ফেলুন', desc: 'প্রোডাক্টটি স্থায়ীভাবে মুছে যাবে। এটি ফেরানো যাবে না।', label: 'মুছে ফেলুন', danger: true, required: true },
  warn_user: { title: 'বিক্রেতাকে সতর্ক করুন', desc: 'বিক্রেতার কাছে একটি সতর্কতা নোটিফিকেশন যাবে।', label: 'সতর্ক করুন' },
  ban_user: { title: 'ব্যবহারকারীকে ব্যান করুন', desc: 'অ্যাকাউন্ট সীমিত হবে (পোস্ট, চ্যাট, কেনা বন্ধ) এবং তার সব চালু প্রোডাক্ট লুকানো হবে।', label: 'ব্যান করুন', danger: true, required: true },
}

export default function ReportsPage() {
  const [filter, setFilter] = useState('active')
  const [items, setItems] = useState(null)
  const [dlg, setDlg] = useState(null) // { report, action }
  const [all, setAll] = useState([])

  const load = useCallback(() => {
    adminReports(filter).then(setItems).catch((e) => toast.error(friendlyError(e)))
    adminReports('active').then(setAll).catch(() => {})
  }, [filter])
  useEffect(() => {
    setItems(null)
    load()
    const ch = supabase.channel('admin-reports').on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, load).subscribe()
    return () => supabase.removeChannel(ch)
  }, [load])

  const perTarget = useMemo(() => {
    const m = {}
    all.forEach((r) => (m[`${r.target_type}:${r.target_id}`] = (m[`${r.target_type}:${r.target_id}`] || 0) + 1))
    return m
  }, [all])

  const sorted = useMemo(() => {
    const rank = { critical: 0, high: 1, normal: 2 }
    return [...(items ?? [])].sort((a, b) => (filter === 'active' ? rank[a.priority] - rank[b.priority] : 0) || new Date(b.created_at) - new Date(a.created_at))
  }, [items, filter])

  async function run(note) {
    await resolveReport(dlg.report.id, dlg.action, note)
    toast.success('ব্যবস্থা নেওয়া হয়েছে। রিপোর্টকারীকে জানানো হয়েছে।')
    load()
  }

  return (
    <>
      <PageHeader title="রিপোর্ট ম্যানেজমেন্ট" subtitle="কেউ রিপোর্ট করলে সাথে সাথে এখানে ও নোটিফিকেশনে দেখা যায়। একাধিক রিপোর্ট পেলে অটো-লুকানো হয়।" />
      <Segmented
        value={filter}
        onChange={setFilter}
        options={[
          { value: 'active', label: 'সক্রিয়', count: all.length },
          { value: 'resolved', label: 'নিষ্পন্ন' },
          { value: 'dismissed', label: 'খারিজ' },
          { value: '', label: 'সব' },
        ]}
      />

      <div className="mt-6 space-y-4">
        {items === null ? (
          [0, 1, 2].map((i) => <Skeleton key={i} className="h-44 rounded-3xl" />)
        ) : sorted.length === 0 ? (
          <Card><Empty>কোনো রিপোর্ট নেই। সব পরিষ্কার!</Empty></Card>
        ) : (
          sorted.map((r) => {
            const st = REPORT_STATUS[r.status]
            const pr = PRIORITY[r.priority]
            const n = perTarget[`${r.target_type}:${r.target_id}`] || 0
            const live = r.status === 'open' || r.status === 'investigating'
            const href = r.target_type === 'listing' ? `/product/${r.target_id}` : `/u/${r.target_id}`
            return (
              <Card key={r.id} className="overflow-hidden">
                {live && r.priority !== 'normal' && <div className={`h-1 ${r.priority === 'critical' ? 'bg-rose-500' : 'bg-amber-400'}`} />}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill tone={st.tone}>{st.label}</StatusPill>
                    {live && <StatusPill tone={pr.tone}>{pr.label} অগ্রাধিকার</StatusPill>}
                    <StatusPill tone="slate">{r.target_type === 'listing' ? 'প্রোডাক্ট' : 'ব্যবহারকারী'}</StatusPill>
                    {live && n > 1 && <StatusPill tone="rose"><Icon name="flag" className="h-3.5 w-3.5" /> {n}টি রিপোর্ট</StatusPill>}
                    <span className="ml-auto text-xs text-slate-400">{timeAgo(r.created_at)}</span>
                  </div>

                  <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto]">
                    <div className="min-w-0">
                      <Link href={href} target="_blank" className="font-display inline-flex items-center gap-1.5 text-xl font-extrabold text-teal-950 hover:underline">
                        {r.target_title || 'অজানা'} <Icon name="external" className="h-4 w-4 text-slate-400" />
                      </Link>
                      <p className="mt-1 text-[15px] font-semibold text-rose-700">{REPORT_REASONS.find((x) => x.value === r.reason)?.label}</p>
                      {r.details && <p className="mt-2 rounded-2xl bg-slate-50 px-4 py-3 text-[15px] leading-relaxed text-slate-700">“{r.details}”</p>}
                      <p className="mt-3 text-sm text-slate-500">
                        রিপোর্ট করেছেন: <b className="text-slate-700">{r.reporter?.full_name || 'ব্যবহারকারী'}</b>
                        {r.target_user && <> · বিক্রেতা: <Link href={`/u/${r.target_user.id}`} target="_blank" className="font-semibold text-teal-800 hover:underline">{r.target_user.full_name}</Link></>}
                      </p>
                      {!live && (
                        <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                          ব্যবস্থা: <b>{ACTIONS[r.resolution]?.title ?? r.resolution}</b>{r.admin_note ? ` · ${r.admin_note}` : ''}
                        </p>
                      )}
                    </div>

                    {live && (
                      <div className="flex flex-wrap content-start gap-2 lg:w-60 lg:justify-end">
                        {r.status === 'open' && (
                          <Button size="sm" variant="soft" onClick={() => resolveReport(r.id, 'investigate').then(load).catch((e) => toast.error(friendlyError(e)))}>
                            <Icon name="eye" className="h-4 w-4" /> তদন্ত শুরু
                          </Button>
                        )}
                        {r.target_type === 'listing' && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => setDlg({ report: r, action: 'hide_listing' })}>লুকান</Button>
                            <Button size="sm" variant="outline" className="text-rose-700" onClick={() => setDlg({ report: r, action: 'delete_listing' })}><Icon name="trash" className="h-4 w-4" /> মুছুন</Button>
                          </>
                        )}
                        <Button size="sm" variant="outline" onClick={() => setDlg({ report: r, action: 'warn_user' })}>সতর্ক</Button>
                        <Button size="sm" variant="danger" onClick={() => setDlg({ report: r, action: 'ban_user' })}><Icon name="ban" className="h-4 w-4" /> ব্যান</Button>
                        <Button size="sm" variant="soft" onClick={() => setDlg({ report: r, action: 'dismiss' })}>খারিজ</Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>

      {dlg && (
        <ActionDialog
          open
          onClose={() => setDlg(null)}
          title={ACTIONS[dlg.action].title}
          description={ACTIONS[dlg.action].desc}
          confirmLabel={ACTIONS[dlg.action].label}
          danger={ACTIONS[dlg.action].danger}
          noteRequired={ACTIONS[dlg.action].required}
          noteLabel="কারণ (বিক্রেতাকে দেখানো হবে)"
          onConfirm={run}
        />
      )}
    </>
  )
}
