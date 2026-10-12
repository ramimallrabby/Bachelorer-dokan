'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthProvider'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Icon from '@/components/ui/Icons'
import { Textarea } from '@/components/ui/Form'
import { Avatar, SmartImage } from '@/components/ui/Media'
import { EmptyState, ErrorState, PageSpinner } from '@/components/ui/Feedback'
import EscrowTimeline from './EscrowTimeline'
import StatusBadge from './StatusBadge'
import { startConversation } from '@/lib/services/chat'
import {
  cancelOrder, confirmReceipt, fetchOrder, fetchOrderEvents, getEscrowConfig, markDelivered, openDispute, payForOrder,
} from '@/lib/services/orders'
import { friendlyError } from '@/lib/errors'
import { formatDateTime, formatPrice } from '@/lib/format'

export default function OrderPanel({ orderId }) {
  const { user } = useAuth()
  const router = useRouter()
  const [order, setOrder] = useState(undefined) // undefined = loading, null = not found
  const [events, setEvents] = useState([])
  const [config, setConfig] = useState(null)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(null)
  const [dialog, setDialog] = useState(null) // 'receipt' | 'dispute' | 'cancel'
  const [reason, setReason] = useState('')

  const load = useCallback(async () => {
    try {
      const [o, ev] = await Promise.all([fetchOrder(orderId), fetchOrderEvents(orderId)])
      setOrder(o)
      setEvents(ev)
      setError(null)
    } catch (err) {
      setError(friendlyError(err))
    }
  }, [orderId])

  useEffect(() => {
    load()
    getEscrowConfig().then(setConfig)
    // The other party's actions show up here instantly.
    const channel = supabase
      .channel(`order:${orderId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` }, load)
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [orderId, load])

  async function run(key, fn, success) {
    setBusy(key)
    try {
      await fn()
      if (success) toast.success(success)
      setDialog(null)
      await load()
    } catch (err) {
      const message = friendlyError(err)
      if (message) toast.error(message)
      await load() // state may have changed under us: show the truth
    } finally {
      setBusy(null)
    }
  }

  async function openChat() {
    setBusy('chat')
    try {
      const id = await startConversation(order.listing_id, user.id === order.seller_id ? order.buyer_id : undefined)
      router.push(`/messages/${id}`)
    } catch (err) {
      toast.error(friendlyError(err))
      setBusy(null)
    }
  }

  if (error && order === undefined) return <div className="mx-auto max-w-xl px-4 py-16"><ErrorState message={error} onRetry={load} /></div>
  if (order === undefined) return <PageSpinner />
  if (order === null)
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <EmptyState icon="receipt" title="অর্ডারটি পাওয়া যায়নি" action={<Button href="/orders" variant="dark">আমার অর্ডার</Button>}>
          এটি আপনার অর্ডার নয়, অথবা লিংকটি ভুল।
        </EmptyState>
      </div>
    )

  const isBuyer = user.id === order.buyer_id
  const other = isBuyer ? order.seller : order.buyer
  const s = order.status
  const canChat = !!order.listing_id

  const note = (tone, text) => (
    <p className={`rounded-2xl p-4 text-[15px] leading-relaxed ring-1 ${tone}`}>{text}</p>
  )

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <Link href="/orders" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-950">
        <Icon name="back" className="h-4 w-4" /> আমার অর্ডার
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-extrabold text-teal-950">Escrow অর্ডার</h1>
        <StatusBadge status={s} />
      </div>

      {config?.mode === 'test' && (
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-2.5 text-sm text-amber-900 ring-1 ring-amber-200">টেস্ট মোড: এই অর্ডারে আসল টাকা লেনদেন হচ্ছে না।</p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <section className="rounded-[28px] bg-white p-6 shadow-[0_14px_30px_-18px_rgba(10,61,56,0.3)] ring-1 ring-teal-900/[0.06] sm:p-8">
            <EscrowTimeline events={events} />
          </section>

          <section className="space-y-4 rounded-[28px] bg-white p-6 shadow-[0_14px_30px_-18px_rgba(10,61,56,0.3)] ring-1 ring-teal-900/[0.06] sm:p-8">
            <h2 className="font-display text-xl font-bold text-teal-950">এখন কী করবেন</h2>

            {s === 'pending_payment' &&
              (isBuyer ? (
                <>
                  {note('bg-amber-50 text-amber-900 ring-amber-200', 'পেমেন্ট সম্পন্ন হলে টাকা এসক্রো-তে জমা থাকবে এবং প্রোডাক্টটি আপনার জন্য রিজার্ভ হবে।')}
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" size="lg" loading={busy === 'pay'} onClick={() => run('pay', () => payForOrder(order.id), 'টাকা এসক্রো-তে জমা হয়েছে।')}>
                      <Icon name="lock" className="h-5 w-5" /> {formatPrice(order.total)} জমা দিন
                    </Button>
                    <Button variant="soft" size="lg" onClick={() => setDialog('cancel')}>অর্ডার বাতিল</Button>
                  </div>
                </>
              ) : (
                note('bg-slate-50 text-slate-700 ring-slate-200', 'ক্রেতার পেমেন্টের অপেক্ষা চলছে। টাকা জমা হলে আপনাকে জানানো হবে।')
              ))}

            {s === 'funded' &&
              (isBuyer ? (
                <>
                  {note('bg-teal-50 text-teal-900 ring-teal-200', 'টাকা নিরাপদে আছে। বিক্রেতার সাথে সময় ঠিক করে পণ্য বুঝে নিন। ঠিকঠাক পেলে নিচের বাটনে কনফার্ম করুন।')}
                  <div className="flex flex-wrap gap-3">
                    <Button variant="dark" size="lg" onClick={() => setDialog('receipt')}><Icon name="check" className="h-5 w-5" /> পণ্য পেয়েছি</Button>
                    <Button variant="outline" size="lg" onClick={() => setDialog('dispute')}>সমস্যা জানান</Button>
                  </div>
                </>
              ) : (
                <>
                  {note('bg-teal-50 text-teal-900 ring-teal-200', 'ক্রেতার টাকা এসক্রো-তে জমা হয়েছে। পণ্য ক্রেতাকে দিয়ে নিচের বাটনে জানান।')}
                  <div className="flex flex-wrap gap-3">
                    <Button variant="dark" size="lg" loading={busy === 'deliver'} onClick={() => run('deliver', () => markDelivered(order.id), 'হস্তান্তর হিসেবে চিহ্নিত করা হয়েছে।')}>
                      <Icon name="box" className="h-5 w-5" /> পণ্য হস্তান্তর করেছি
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setDialog('cancel')}>বাতিল করে টাকা ফেরত দিন</Button>
                  </div>
                </>
              ))}

            {s === 'delivered' &&
              (isBuyer ? (
                <>
                  {note('bg-teal-50 text-teal-900 ring-teal-200', `বিক্রেতা পণ্য দিয়েছেন বলে জানিয়েছেন। পণ্য ঠিক থাকলে কনফার্ম করুন। ${order.auto_release_at ? `${formatDateTime(order.auto_release_at)} এর মধ্যে কিছু না জানালে টাকা অটোমেটিক বিক্রেতাকে ছাড়া হবে।` : ''}`)}
                  <div className="flex flex-wrap gap-3">
                    <Button variant="dark" size="lg" onClick={() => setDialog('receipt')}><Icon name="check" className="h-5 w-5" /> পণ্য পেয়েছি, টাকা ছাড়ুন</Button>
                    <Button variant="outline" size="lg" onClick={() => setDialog('dispute')}>সমস্যা জানান</Button>
                  </div>
                </>
              ) : (
                <>
                  {note('bg-slate-50 text-slate-700 ring-slate-200', 'ক্রেতার কনফার্মেশনের অপেক্ষা চলছে। ক্রেতা কনফার্ম করলে অথবা সময় শেষ হলে টাকা ছাড়া হবে।')}
                  <div><Button variant="outline" onClick={() => setDialog('dispute')}>সমস্যা জানান</Button></div>
                </>
              ))}

            {s === 'completed' && note('bg-emerald-50 text-emerald-900 ring-emerald-200', isBuyer ? 'লেনদেন সম্পন্ন। আপনার কেনাকাটার জন্য ধন্যবাদ!' : 'লেনদেন সম্পন্ন। টাকা আপনার জন্য ছাড়া হয়েছে।')}
            {s === 'disputed' && note('bg-rose-50 text-rose-900 ring-rose-200', `বিরোধ খোলা আছে। আমাদের টিম দুই পক্ষের সাথে কথা বলে সিদ্ধান্ত নেবে, তার আগে টাকা এসক্রো-তেই থাকবে।${order.dispute_reason ? ` কারণ: ${order.dispute_reason}` : ''}`)}
            {s === 'cancelled' && note('bg-slate-50 text-slate-700 ring-slate-200', 'অর্ডারটি বাতিল হয়েছে। কোনো টাকা কাটা হয়নি।')}
            {s === 'refunded' && note('bg-slate-50 text-slate-700 ring-slate-200', 'অর্ডারটি বাতিল হয়েছে এবং টাকা ক্রেতাকে ফেরত দেওয়া হবে।')}

            {canChat && (
              <Button variant="soft" loading={busy === 'chat'} onClick={openChat}>
                <Icon name="chat" className="h-4 w-4" /> {isBuyer ? 'বিক্রেতাকে মেসেজ' : 'ক্রেতাকে মেসেজ'}
              </Button>
            )}
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-[28px] bg-white p-5 shadow-[0_14px_30px_-18px_rgba(10,61,56,0.3)] ring-1 ring-teal-900/[0.06]">
            <div className="flex items-center gap-4">
              <SmartImage src={order.listing_image_url} alt="" className="h-20 w-24 shrink-0 rounded-2xl" />
              <div className="min-w-0">
                {order.listing_id ? (
                  <Link href={`/product/${order.listing_id}`} className="line-clamp-2 font-semibold text-teal-950 hover:underline">{order.listing_title}</Link>
                ) : (
                  <p className="line-clamp-2 font-semibold text-teal-950">{order.listing_title}</p>
                )}
              </div>
            </div>

            <dl className="mt-5 space-y-2 text-[15px]">
              <div className="flex justify-between text-slate-600"><dt>প্রোডাক্টের দাম</dt><dd>{formatPrice(order.amount)}</dd></div>
              {Number(order.fee) > 0 && <div className="flex justify-between text-slate-600"><dt>Escrow ফি</dt><dd>{formatPrice(order.fee)}</dd></div>}
              <div className="flex justify-between border-t border-teal-900/10 pt-2 font-bold text-teal-950"><dt>মোট</dt><dd className="font-display text-lg">{formatPrice(order.total)}</dd></div>
            </dl>

            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-teal-900/[0.05] p-3">
              <Avatar name={other?.full_name} url={other?.avatar_url} className="h-10 w-10" />
              <div className="min-w-0">
                <p className="truncate font-semibold text-teal-950">{other?.full_name || 'ব্যবহারকারী'}</p>
                <p className="text-[13px] text-slate-500">{isBuyer ? 'বিক্রেতা' : 'ক্রেতা'}</p>
              </div>
            </div>

            {order.buyer_note && (
              <p className="mt-4 rounded-2xl bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">
                <b>মিটআপের নোট:</b> {order.buyer_note}
              </p>
            )}
            <p className="mt-4 text-xs text-slate-400">অর্ডার {formatDateTime(order.created_at)}</p>
          </section>
        </aside>
      </div>

      <Dialog open={dialog === 'receipt'} onClose={() => setDialog(null)} title="পণ্য পেয়েছেন?" width="max-w-md">
        <p className="leading-relaxed text-slate-600">কনফার্ম করলে {formatPrice(order.amount)} বিক্রেতার জন্য ছাড়া হবে। এটি আর ফেরানো যাবে না, তাই আগে পণ্য দেখে নিন।</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="soft" onClick={() => setDialog(null)}>না, একটু দেখি</Button>
          <Button variant="dark" loading={busy === 'receipt'} onClick={() => run('receipt', () => confirmReceipt(order.id), 'কনফার্ম হয়েছে। বিক্রেতার টাকা ছাড়া হলো।')}>হ্যাঁ, কনফার্ম করছি</Button>
        </div>
      </Dialog>

      <Dialog open={dialog === 'dispute'} onClose={() => setDialog(null)} title="সমস্যা জানান" width="max-w-md">
        <p className="mb-3 text-slate-600">কী সমস্যা হয়েছে লিখুন। বিরোধ খুললে টাকা এসক্রো-তেই থাকবে যতক্ষণ না আমাদের টিম সিদ্ধান্ত নেয়।</p>
        <Textarea value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} placeholder="যেমন: পণ্যটি বর্ণনার সাথে মেলেনি..." aria-label="সমস্যার বিবরণ" />
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="soft" onClick={() => setDialog(null)}>বাতিল</Button>
          <Button variant="danger" disabled={reason.trim().length < 10} loading={busy === 'dispute'} onClick={() => run('dispute', () => openDispute(order.id, reason.trim()), 'বিরোধ জানানো হয়েছে।')}>বিরোধ খুলুন</Button>
        </div>
      </Dialog>

      <Dialog open={dialog === 'cancel'} onClose={() => setDialog(null)} title="অর্ডার বাতিল করবেন?" width="max-w-md">
        <p className="text-slate-600">{isBuyer ? 'অর্ডারটি বাতিল হবে।' : 'অর্ডারটি বাতিল হবে এবং ক্রেতার টাকা ফেরত যাবে। প্রোডাক্টটি আবার বিক্রির জন্য খোলা হবে।'}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="soft" onClick={() => setDialog(null)}>না</Button>
          <Button variant="danger" loading={busy === 'cancel'} onClick={() => run('cancel', () => cancelOrder(order.id), 'অর্ডার বাতিল হয়েছে।')}>হ্যাঁ, বাতিল করুন</Button>
        </div>
      </Dialog>
    </main>
  )
}
