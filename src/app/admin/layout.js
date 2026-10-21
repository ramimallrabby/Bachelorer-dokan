'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import RequireAuth from '@/components/auth/RequireAuth'
import { useAuth } from '@/components/auth/AuthProvider'
import Icon from '@/components/ui/Icons'
import Button from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Media'
import { PageSpinner } from '@/components/ui/Feedback'
import NotificationBell from '@/components/layout/NotificationBell'
import { supabase } from '@/lib/supabase'
import { adminStats } from '@/lib/services/admin'

const NAV = [
  { href: '/admin', label: 'ড্যাশবোর্ড', icon: 'dashboard', exact: true },
  { href: '/admin/reports', label: 'রিপোর্ট', icon: 'flag', badge: 'reports_open' },
  { href: '/admin/orders', label: 'অর্ডার ও বিরোধ', icon: 'receipt', badge: 'orders_disputed' },
  { href: '/admin/payments', label: 'পেমেন্ট', icon: 'wallet', badge: ['deposits_pending', 'withdrawals_pending'] },
  { href: '/admin/support', label: 'সাপোর্ট টিকিট', icon: 'chat', badge: 'support_pending' }, // নতুন সাপোর্ট মেন্যু ও কাউন্টার যোগ করা হলো
  { href: '/admin/listings', label: 'প্রোডাক্ট', icon: 'tag' },
  { href: '/admin/users', label: 'ব্যবহারকারী', icon: 'users' },
  { href: '/admin/settings', label: 'সেটিংস', icon: 'settings' },
  { href: '/admin/audit', label: 'অডিট লগ', icon: 'list' },
]

function Shell({ children }) {
  const { profile, user } = useAuth()
  const pathname = usePathname()
  const [stats, setStats] = useState(null)

  const refresh = useCallback(async () => {
    try {
      const baseStats = await adminStats().catch(() => ({}))
      // সাপোর্ট টিকিটের পেন্ডিং সংখ্যা আলাদাভাবে ফেচ করে যোগ করা হচ্ছে
      const { count } = await supabase
        .from('support_tickets')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')
      
      setStats({ ...baseStats, support_pending: count ?? 0 })
    } catch (e) {
      setStats({})
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => refresh(), 0)
    // Any new report / dispute / payment request / support ticket refreshes the sidebar counters instantly.
    const ch = supabase
      .channel('admin-counters')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, refresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, refresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'deposit_requests' }, refresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'withdrawal_requests' }, refresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'support_tickets' }, refresh)
      .subscribe()
    return () => {
      clearTimeout(timer)
      supabase.removeChannel(ch)
    }
  
  }, [refresh])

  const count = (b) => (!b ? 0 : (Array.isArray(b) ? b : [b]).reduce((a, k) => a + Number(stats?.[k] || 0), 0))
  const active = (n) => (n.exact ? pathname === n.href : pathname.startsWith(n.href))

  const totalAttentionCount = count(['reports_open', 'orders_disputed', 'deposits_pending', 'withdrawals_pending', 'support_pending'])

  return (
    <div className="min-h-screen bg-[#eef3f2] lg:grid lg:grid-cols-[264px_minmax(0,1fr)]">
      <aside className="aurora on-dark hidden flex-col text-white lg:sticky lg:top-0 lg:flex lg:h-screen">
        <Link href="/admin" className="flex items-center gap-3 px-6 pb-6 pt-7">
          <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/10 text-amber-300 ring-1 ring-white/20">
            <Icon name="shield" className="h-5 w-5" />
          </span>
          <span>
            <span className="font-display block text-lg font-extrabold leading-tight">Dokan Admin</span>
            <span className="text-xs text-white/55">কন্ট্রোল সেন্টার</span>
          </span>
        </Link>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3" aria-label="অ্যাডমিন মেনু">
          {NAV.map((n) => {
            const c = count(n.badge)
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium transition ${
                  active(n) ? 'bg-white text-teal-950 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)]' : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon name={n.icon} className="h-5 w-5" />
                <span className="flex-1">{n.label}</span>
                {c > 0 && <span className="rounded-full bg-rose-500 px-2 text-xs font-bold leading-5 text-white">{c}</span>}
              </Link>
            )
          })}
        </nav>
        <div className="p-4">
          <Link href="/" className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
            <Icon name="home" className="h-4 w-4" /> সাইটে ফিরুন
          </Link>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-teal-900/10 bg-white/80 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <Link href="/admin" className="font-display text-lg font-extrabold text-teal-950 lg:hidden">Dokan Admin</Link>
            <p className="hidden text-sm text-slate-500 lg:block">
              {stats && totalAttentionCount > 0
                ? `${totalAttentionCount}টি বিষয় আপনার মনোযোগের অপেক্ষায়`
                : 'সবকিছু নিয়ন্ত্রণে আছে ✓'}
            </p>
            <div className="flex items-center gap-2">
              <NotificationBell />
              <Avatar name={profile?.full_name || user?.email} url={profile?.avatar_url} className="h-9 w-9 text-xs" />
            </div>
          </div>
          <nav className="no-scrollbar flex gap-1.5 overflow-x-auto px-4 pb-3 lg:hidden" aria-label="অ্যাডমিন মেনু">
            {NAV.map((n) => {
              const c = count(n.badge)
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${active(n) ? 'bg-teal-900 text-white' : 'bg-teal-900/[0.06] text-teal-900'}`}
                >
                  {n.label}
                  {c > 0 && <span className="rounded-full bg-rose-500 px-1.5 text-[11px] leading-[18px] text-white">{c}</span>}
                </Link>
              )
            })}
          </nav>
        </header>
        <div className="px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  )
}

function Gate({ children }) {
  const { isAdmin, profile } = useAuth()
  if (!profile) return <PageSpinner label="যাচাই করা হচ্ছে..." />
  if (!isAdmin)
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-100 text-rose-700">
          <Icon name="lock" className="h-8 w-8" />
        </span>
        <h1 className="font-display text-2xl font-extrabold text-teal-950">প্রবেশাধিকার নেই</h1>
        <p className="mt-2 text-slate-500">এই পেজটি শুধু অ্যাডমিনদের জন্য।</p>
        <Button href="/" variant="dark" className="mt-6">হোমে ফিরুন</Button>
      </main>
    )
  return <Shell>{children}</Shell>
}

export default function AdminLayout({ children }) {
  return (
    <RequireAuth>
      <Gate>{children}</Gate>
    </RequireAuth>
  )
}