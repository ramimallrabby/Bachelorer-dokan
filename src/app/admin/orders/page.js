'use client'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { ActionDialog, Card, Empty, Money, PageHeader, Segmented } from '@/components/admin/kit'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Icon from '@/components/ui/Icons'
import { Skeleton } from '@/components/ui/Feedback'
import StatusBadge from '@/components/escrow/StatusBadge'
import { adminOrderChat, adminOrderEvents, adminOrders, forceRefund, resolveDispute } from '@/lib/services/admin'
import { ORDER_STATUS } from '@/lib/constants'
import { friendlyError } from '@/lib/errors'
import { supabase } from '@/lib/supabase'
import { formatDateTime, timeAgo } from '@/lib/format'

function OrderDetail({ order, onClose, onChanged }) {
  const [events, setEvents] = useState([])
  const [chat, setChat] = useState(null)
  const [act, setAct] = useState(null)

  useEffect(() => {
    adminOrderEvents(order.id).then(setEvents).catch(() => {})
  }, [order.id])

  async function loadChat() {
    try {
      setChat(await adminOrderChat(order.id))
    } catch (e) {
      toast.error(friendlyError(e))
    }
  }

  const disputed = order.status === 'disputed'
  const live = ['funded', 'delivered'].includes(order.status)
  const nameOf = (id) => (id === order.buyer_id ? order.buyer?.full_name : id === order.seller_id ? order.seller?.full_name : 'সিস্টেম')

  return (
    <Dialog open onClose={onClose} title="অর্ডার বিস্তারিত" width="max-w-2xl">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-xl font-extrabold text-teal-950">{order.listing_title}</p>
          <StatusBadge status={order.status} />
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {[
            ['ক্রেতা', <Link key="b" className="font-semibold text-teal-800 hover:underline" href={`/u/${order.buyer_id}`} target="_blank">{order.buyer?.full_name}</Link>],
            ['বিক্রেতা', <Link key="s" className="font-semibold text-teal-800 hover:underline" href={`/u/${order.seller_id}`} target="_blank">{order.seller?.full_name}</Link>],
            ['মূল্য', <Money key="a">{order.amount}</Money>],
            ['ফি', <Money key="f">{order.fee}</Money>],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-slate-50 p-3"><dt className="text-xs text-slate-500">{k}</dt><dd className="mt-0.5">{v}</dd></div>
          ))}
        </dl>

        {order.dispute_reason && (
          <div className="rounded-2xl bg-rose-50 p-4 ring-1 ring-rose-200">
            <p className="mb-1 flex items-center gap-2 text-sm font-bold text-rose-900"><Icon name="alert" className="h-4 w-4" /> বিরোধের কারণ</p>
            <p className="text-[15px] leading-relaxed text-rose-900">{order.dispute_reason}</p>
          </div>
        )}

        <div>
          <p className="mb-2 text-sm font-bold text-teal-950">টাইমলাইন</p>
          <ol className="space-y-2 border-l-2 border-teal-900/10 pl-4">
            {events.map((e) => (
              <li key={e.id} className="relative text-sm">
                <span className="absolute -left-[22px] top-1.5 h-2.5 w-2.5 rounded-full bg-teal-600 ring-4 ring-white" />
                <b className="text-teal-950">{ORDER_STATUS[e.to_status]?.label ?? e.to_status}</b>
                <span className="text-slate-500"> · {nameOf(e.actor_id)} · {formatDateTime(e.created_at)}</span>
                {e.note && <p className="text-slate-600">{e.note}</p>}
              </li>
            ))}
          </ol>
        </div>

        {(disputed || live) && (
          <div>
            {chat === null ? (
              <Button variant="soft" size="sm" onClick={loadChat}><Icon name="chat" className="h-4 w-4" /> দুই পক্ষের চ্যাট দেখুন (অডিট হবে)</Button>
            ) : (
              <div className="max-h-56 space-y-1.5 overflow-y-auto rounded-2xl bg-[#eaf1ef] p-3">
                {chat.length === 0 && <p className="py-4 text-center text-sm text-slate-500">কোনো মেসেজ নেই</p>}
                {chat.map((m, i) => (
                  <p key={i} className="text-sm"><b className="text-teal-900">{nameOf(m.sender_id)}:</b> <span className="text-slate-700">{m.body}</span> <span className="text-xs text-slate-400">{timeAgo(m.created_at)}</span></p>
                ))}
              </div>
            )}
          </div>
        )}

        {(disputed || live) && (
          <div className="flex flex-wrap justify-end gap-3 border-t border-teal-900/10 pt-5">
            {disputed ? (
              <>
                <Button variant="outline" onClick={() => setAct('refund')}>ক্রেতাকে ফেরত দিন</Button>
                <Button variant="dark" onClick={() => setAct('release')}>বিক্রেতাকে টাকা ছাড়ুন</Button>
              </>
            ) : (
              <Button variant="danger" onClick={() => setAct('force')}>জোর করে ফেরত (প্রতারণা/ভুল)</Button>
            )}
          </div>
        )}
      </div>

      {act && (
        <ActionDialog
          open
          onClose={() => setAct(null)}
          title={act === 'release' ? 'বিক্রেতাকে টাকা ছাড়বেন?' : act === 'refund' ? 'ক্রেতাকে টাকা ফেরত দেবেন?' : 'অর্ডার জোর করে ফেরত'}
          description={act === 'release' ? `বিক্রেতার ওয়ালেটে ৳${order.amount} যাবে। এটি ফেরানো যাবে না।` : `ক্রেতার ওয়ালেটে ৳${order.total} ফেরত যাবে এবং প্রোডাক্ট আবার চালু হবে।`}
          confirmLabel="নিশ্চিত করুন"
          danger={act !== 'release'}
          noteRequired
          noteLabel="সিদ্ধান্তের কারণ (অডিট লগে থাকবে)"
          onConfirm={async (note) => {
            if (act === 'force') await forceRefund(order.id, note)
            else await resolveDispute(order.id, act, note)
            toast.success('সিদ্ধান্ত কার্যকর হয়েছে।')
            onChanged()
            onClose()
          }}
        />
      )}
    </Dialog>
  )
}

function Orders() {
  const params = useSearchParams()
  const [status, setStatus] = useState(params.get('status') ?? 'disputed')
  const [items, setItems] = useState(null)
  const [open, setOpen] = useState(null)

  const load = useCallback(() => adminOrders(status).then(setItems).catch((e) => toast.error(friendlyError(e))), [status])
  useEffect(() => {
    setItems(null)
    load()
    const ch = supabase.channel('admin-orders').on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, load).subscribe()
    return () => supabase.removeChannel(ch)
  }, [load])

  return (
    <>
      <PageHeader title="অর্ডার ও বিরোধ" subtitle="এসক্রো অর্ডারের পুরো ইতিহাস। বিরোধ খুললে এখান থেকেই সিদ্ধান্ত দিন।" />
      <Segmented
        value={status}
        onChange={setStatus}
        options={[
          { value: 'disputed', label: 'বিরোধ' },
          { value: 'funded', label: 'এসক্রো-তে' },
          { value: 'delivered', label: 'হস্তান্তরিত' },
          { value: 'completed', label: 'সম্পন্ন' },
          { value: 'refunded', label: 'ফেরত' },
          { value: '', label: 'সব' },
        ]}
      />
      <Card className="mt-6 overflow-hidden">
        {items === null ? (
          <div className="space-y-3 p-5">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : items.length === 0 ? (
          <Empty icon="receipt">এই ফিল্টারে কোনো অর্ডার নেই</Empty>
        ) : (
          <ul className="divide-y divide-teal-900/[0.06]">
            {items.map((o) => (
              <li key={o.id}>
                <button type="button" onClick={() => setOpen(o)} className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-teal-900/[0.03]">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-teal-950">{o.listing_title}</p>
                    <p className="truncate text-sm text-slate-500">{o.buyer?.full_name} → {o.seller?.full_name} · {timeAgo(o.created_at)}</p>
                  </div>
                  <Money className="text-lg text-teal-900">{o.total}</Money>
                  <span className="hidden sm:block"><StatusBadge status={o.status} /></span>
                  <Icon name="next" className="h-5 w-5 text-slate-300" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
      {open && <OrderDetail order={open} onClose={() => setOpen(null)} onChanged={load} />}
    </>
  )
}

export default function OrdersPage() {
  return (
    <Suspense>
      <Orders />
    </Suspense>
  )
}
