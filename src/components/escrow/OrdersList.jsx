'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useAuth } from '@/components/auth/AuthProvider'
import Button from '@/components/ui/Button'
import { Chip } from '@/components/ui/Form'
import { EmptyState, ErrorState, Skeleton } from '@/components/ui/Feedback'
import { SmartImage } from '@/components/ui/Media'
import StatusBadge from './StatusBadge'
import { fetchOrders } from '@/lib/services/orders'
import { friendlyError } from '@/lib/errors'
import { formatPrice, timeAgo } from '@/lib/format'

export default function OrdersList() {
  const { user } = useAuth()
  const [orders, setOrders] = useState(null)
  const [error, setError] = useState(null)
  const [tab, setTab] = useState('buying')

  const load = useCallback(() => {
    setError(null)
    fetchOrders()
      .then(setOrders)
      .catch((err) => {
        const m = friendlyError(err)
        setError(m)
        toast.error(m, { id: 'orders-error' })
      })
  }, [])
  useEffect(load, [load])

  const shown = (orders ?? []).filter((o) => (tab === 'buying' ? o.buyer_id === user.id : o.seller_id === user.id))

  return (
    <main className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold text-teal-950 sm:text-4xl">আমার অর্ডার</h1>
      <div className="mt-6 flex gap-2">
        <Chip active={tab === 'buying'} onClick={() => setTab('buying')}>আমি কিনছি</Chip>
        <Chip active={tab === 'selling'} onClick={() => setTab('selling')}>আমি বিক্রি করছি</Chip>
      </div>

      <div className="mt-6 space-y-3.5">
        {error ? (
          <ErrorState message={error} onRetry={load} />
        ) : orders === null ? (
          [0, 1, 2].map((i) => <Skeleton key={i} className="h-28 rounded-3xl" />)
        ) : shown.length === 0 ? (
          <EmptyState icon="receipt" title="কোনো অর্ডার নেই" action={<Button href="/" variant="dark">প্রোডাক্ট দেখুন</Button>}>
            {tab === 'buying' ? 'Buy via Escrow দিয়ে কিনলে অর্ডার এখানে দেখা যাবে।' : 'কেউ আপনার প্রোডাক্ট কিনলে অর্ডার এখানে দেখা যাবে।'}
          </EmptyState>
        ) : (
          shown.map((o) => {
            const other = tab === 'buying' ? o.seller : o.buyer
            return (
              <Link
                key={o.id}
                href={`/orders/${o.id}`}
                className="flex items-center gap-4 rounded-3xl bg-white p-3 shadow-[0_14px_30px_-18px_rgba(10,61,56,0.3)] ring-1 ring-teal-900/[0.06] transition hover:-translate-y-0.5 hover:shadow-[0_24px_44px_-22px_rgba(10,61,56,0.45)]"
              >
                <SmartImage src={o.listing_image_url} alt="" className="h-24 w-28 shrink-0 rounded-2xl" />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 font-semibold text-teal-950">{o.listing_title}</p>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {tab === 'buying' ? 'বিক্রেতা' : 'ক্রেতা'}: {other?.full_name || 'ব্যবহারকারী'}
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                    <StatusBadge status={o.status} />
                    <span className="font-display text-lg font-extrabold text-teal-900">{formatPrice(o.total)}</span>
                  </div>
                </div>
                <span className="hidden self-start pr-2 pt-1 text-xs text-slate-400 sm:block">{timeAgo(o.created_at)}</span>
              </Link>
            )
          })
        )}
      </div>
    </main>
  )
}
