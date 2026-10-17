'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { PageHeader, Card, MiniBars, Money } from '@/components/admin/kit'
import Icon from '@/components/ui/Icons'
import { Skeleton } from '@/components/ui/Feedback'
import { adminAudit, adminStats } from '@/lib/services/admin'
import { supabase } from '@/lib/supabase'
import { timeAgo } from '@/lib/format'

function Stat({ icon, label, value, sub, tone = 'teal' }) {
  const tones = { teal: 'bg-teal-900/[0.07] text-teal-800', amber: 'bg-amber-100 text-amber-800', green: 'bg-emerald-50 text-emerald-700', violet: 'bg-violet-50 text-violet-700' }
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}><Icon name={icon} className="h-5 w-5" /></span>
      </div>
      <p className="mt-3 text-[28px] font-extrabold leading-none text-teal-950">{value}</p>
      {sub && <p className="mt-2 text-[13px] text-slate-500">{sub}</p>}
    </Card>
  )
}

function Attention({ href, icon, count, label, extra }) {
  const hot = count > 0
  return (
    <Link href={href} className={`group flex items-center gap-4 rounded-3xl p-5 ring-1 transition hover:-translate-y-0.5 ${hot ? 'bg-rose-50 ring-rose-200 hover:shadow-[0_20px_40px_-24px_rgba(225,29,72,0.5)]' : 'bg-white ring-teal-900/[0.06]'}`}>
      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${hot ? 'bg-rose-100 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
        <Icon name={hot ? icon : 'check'} className="h-6 w-6" />
      </span>
      <div className="min-w-0 flex-1">
        <p className={`font-display text-2xl font-extrabold ${hot ? 'text-rose-900' : 'text-teal-950'}`}>{count}</p>
        <p className="text-sm text-slate-600">{label}</p>
        {hot && extra && <p className="text-xs text-rose-700/80">{extra}</p>}
      </div>
      <Icon name="next" className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1" />
    </Link>
  )
}

export default function Dashboard() {
  const [s, setS] = useState(null)
  const [log, setLog] = useState([])
  const load = useCallback(() => {
    adminStats().then(setS).catch(() => {})
    adminAudit().then((r) => setLog(r.slice(0, 6))).catch(() => {})
  }, [])
  useEffect(() => {
    load()
    const ch = supabase.channel('admin-dash').on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, load).subscribe()
    return () => supabase.removeChannel(ch)
  }, [load])

  if (!s)
    return (
      <>
        <PageHeader title="ড্যাশবোর্ড" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-36 rounded-3xl" />)}</div>
      </>
    )

  return (
    <>
      <PageHeader title="ড্যাশবোর্ড" subtitle="প্ল্যাটফর্মের বর্তমান অবস্থা এক নজরে" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Attention href="/admin/reports" icon="flag" count={s.reports_open} label="খোলা রিপোর্ট" />
        <Attention href="/admin/orders?status=disputed" icon="alert" count={s.orders_disputed} label="চলমান বিরোধ" />
        <Attention href="/admin/payments?tab=deposits" icon="arrowDown" count={s.deposits_pending} label="ডিপোজিট যাচাই বাকি" extra={`মোট ৳${Number(s.deposits_pending_amount).toLocaleString('en-IN')}`} />
        <Attention href="/admin/payments?tab=withdrawals" icon="arrowUp" count={s.withdrawals_pending} label="উত্তোলন পেআউট বাকি" extra={`মোট ৳${Number(s.withdrawals_pending_amount).toLocaleString('en-IN')}`} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon="trend" tone="green" label="মোট বিক্রি (GMV)" value={<Money>{s.gmv}</Money>} sub={`${s.orders_total} টি অর্ডার`} />
        <Stat icon="lock" tone="amber" label="এসক্রো-তে জমা" value={<Money>{s.escrow_held}</Money>} sub={`${s.orders_live} টি চলমান অর্ডার`} />
        <Stat icon="sparkle" tone="violet" label="আপনার ফি আয়" value={<Money>{s.fees_earned}</Money>} />
        <Stat icon="wallet" label="ব্যবহারকারীদের ওয়ালেটে" value={<Money>{s.wallet_balances}</Money>} sub="আপনার দায়: এই টাকা উত্তোলনযোগ্য" />
        <Stat icon="users" label="মোট ব্যবহারকারী" value={Number(s.users).toLocaleString('bn-BD')} sub={`গত ৭ দিনে +${s.users_7d}`} />
        <Stat icon="tag" label="চালু প্রোডাক্ট" value={Number(s.listings_active).toLocaleString('bn-BD')} sub={`${s.listings_hidden}টি লুকানো`} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Card className="p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-teal-950">গত ১৪ দিন</h2>
            <div className="flex gap-4 text-xs text-slate-500">
              {[['নতুন ইউজার', '#0f766e'], ['নতুন প্রোডাক্ট', '#fbbf24'], ['অর্ডার', '#6d28d9']].map(([l, c]) => (
                <span key={l} className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm" style={{ background: c }} />{l}</span>
              ))}
            </div>
          </div>
          <MiniBars data={s.daily} keys={['signups', 'listings', 'orders']} colors={['#0f766e', '#fbbf24', '#6d28d9']} height={180} />
          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>{s.daily[0]?.day}</span><span>{s.daily[s.daily.length - 1]?.day}</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-teal-950">সাম্প্রতিক অ্যাডমিন কাজ</h2>
            <Link href="/admin/audit" className="text-sm font-semibold text-teal-700">সব দেখুন</Link>
          </div>
          {log.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">এখনো কোনো কাজ হয়নি</p>
          ) : (
            <ul className="space-y-3.5">
              {log.map((l) => (
                <li key={l.id} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal-600" />
                  <div className="min-w-0">
                    <p className="font-medium text-teal-950">{l.action}</p>
                    <p className="text-xs text-slate-500">{l.admin?.full_name || 'অ্যাডমিন'} · {timeAgo(l.created_at)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  )
}
