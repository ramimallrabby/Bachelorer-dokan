'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/components/auth/AuthProvider'
import useWallet from '@/hooks/useWallet'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Icon from '@/components/ui/Icons'
import { Textarea } from '@/components/ui/Form'
import { SmartImage } from '@/components/ui/Media'
import { calcFee, createOrder, getEscrowConfig, payForOrder } from '@/lib/services/orders'
import { friendlyError } from '@/lib/errors'
import { formatPrice } from '@/lib/format'

const STEPS = [
  'আপনি টাকা এসক্রো-তে জমা দেন। বিক্রেতা জানেন টাকা নিরাপদে আছে।',
  'বিক্রেতার সাথে চ্যাটে সময় ঠিক করে পণ্য বুঝে নিন।',
  'পণ্য ঠিক থাকলে “পণ্য পেয়েছি” কনফার্ম করুন। তখনই বিক্রেতা টাকা পান।',
]

export default function EscrowDialog({ open, onClose, listing, sellerName }) {
  const router = useRouter()
  const { user } = useAuth()
  const { balance } = useWallet(user?.id)
  const [config, setConfig] = useState(null)
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (open) getEscrowConfig().then(setConfig)
  }, [open])

  const fee = config ? calcFee(listing.price, config.feeBps) : 0
  const total = Number(listing.price) + fee
  const short = balance !== null && balance < total

  async function pay() {
    setBusy(true)
    let orderId
    try {
      orderId = await createOrder(listing.id, note)
      await payForOrder(orderId)
      toast.success('টাকা এসক্রো-তে জমা হয়েছে।')
    } catch (err) {
      const message = friendlyError(err)
      if (message) toast.error(message)
      if (!orderId) return setBusy(false) // nothing was created: stay here so they can retry
      // An order exists but payment failed: the order page has a "pay now" retry.
    }
    router.push(`/orders/${orderId}`)
  }

  return (
    <Dialog open={open} onClose={busy ? () => {} : onClose} title="Escrow দিয়ে কিনুন" width="max-w-lg">
      <div className="flex items-center gap-4 rounded-2xl bg-teal-900/[0.05] p-3">
        <SmartImage src={listing.image_url} alt="" className="h-16 w-20 rounded-xl" />
        <div className="min-w-0">
          <p className="line-clamp-1 font-semibold text-teal-950">{listing.title}</p>
          <p className="text-sm text-slate-500">বিক্রেতা: {sellerName}</p>
        </div>
      </div>

      <ol className="mt-5 space-y-3">
        {STEPS.map((text, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-900 text-xs font-bold text-white">{i + 1}</span>
            <p className="text-[15px] leading-relaxed text-slate-600">{text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6">
        <label htmlFor="escrow-note" className="mb-1.5 block text-sm font-semibold text-teal-950">
          মিটআপের জায়গা বা সময় <span className="font-normal text-slate-400">(ঐচ্ছিক)</span>
        </label>
        <Textarea id="escrow-note" value={note} onChange={(e) => setNote(e.target.value)} maxLength={300} className="min-h-20" placeholder="যেমন: কাল বিকেল ৪টায়, মেইন গেটের সামনে" />
      </div>

      <dl className="mt-6 space-y-2 rounded-2xl bg-white p-4 text-[15px] ring-1 ring-teal-900/10">
        <div className="flex justify-between text-slate-600">
          <dt>প্রোডাক্টের দাম</dt>
          <dd>{formatPrice(listing.price)}</dd>
        </div>
        {fee > 0 && (
          <div className="flex justify-between text-slate-600">
            <dt>Escrow ফি</dt>
            <dd>{formatPrice(fee)}</dd>
          </div>
        )}
        <div className="flex justify-between border-t border-teal-900/10 pt-2 text-base font-bold text-teal-950">
          <dt>মোট</dt>
          <dd className="font-display text-lg">{formatPrice(total)}</dd>
        </div>
      </dl>

      <div className={`mt-4 flex items-center justify-between gap-3 rounded-2xl p-4 ring-1 ${short ? 'bg-rose-50 ring-rose-200' : 'bg-teal-900/[0.05] ring-teal-900/10'}`}>
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${short ? 'bg-rose-100 text-rose-700' : 'bg-white text-teal-800'}`}>
            <Icon name="wallet" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[13px] text-slate-500">ওয়ালেট ব্যালেন্স</p>
            <p className="font-display text-lg font-extrabold text-teal-950">{balance === null ? '…' : formatPrice(balance)}</p>
          </div>
        </div>
        {short && (
          <Link href="/wallet" className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500">
            {formatPrice(total - balance)} যোগ করুন
          </Link>
        )}
      </div>

      {config?.mode === 'test' && (
        <p className="mt-3 flex gap-2 rounded-xl bg-amber-50 p-3 text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200">
          <Icon name="alert" className="mt-0.5 h-4 w-4" />
          টেস্ট মোড: ওয়ালেটে থাকা টাকা খেলার টাকা। আসল টাকা লেনদেন হচ্ছে না।
        </p>
      )}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="soft" size="lg" onClick={onClose} disabled={busy}>
          বাতিল
        </Button>
        <Button variant="primary" size="lg" loading={busy} disabled={!config || short || balance === null} onClick={pay}>
          <Icon name="lock" className="h-5 w-5" />
          ওয়ালেট থেকে {formatPrice(total)} জমা দিন
        </Button>
      </div>
    </Dialog>
  )
}
