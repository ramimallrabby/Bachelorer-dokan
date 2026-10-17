'use client'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/components/auth/AuthProvider'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Icon from '@/components/ui/Icons'
import { Textarea } from '@/components/ui/Form'
import { submitReport } from '@/lib/services/reports'
import { REPORT_REASONS } from '@/lib/constants'
import { friendlyError } from '@/lib/errors'
import { loginHref } from '@/lib/format'

export default function ReportButton({ type, targetId, ownerId, label = 'রিপোর্ট করুন', className = '' }) {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  if (user && ownerId && user.id === ownerId) return null // you can't report yourself

  async function send() {
    setBusy(true)
    try {
      await submitReport({ type, targetId, reason, details })
      setDone(true)
    } catch (e) {
      toast.error(friendlyError(e))
    } finally {
      setBusy(false)
    }
  }

  const close = () => {
    setOpen(false)
    setTimeout(() => {
      setDone(false)
      setReason('')
      setDetails('')
    }, 250)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => (user ? setOpen(true) : router.push(loginHref(pathname)))}
        className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-rose-600 ${className}`}
      >
        <Icon name="flag" className="h-4 w-4" /> {label}
      </button>

      <Dialog open={open} onClose={close} title={done ? 'ধন্যবাদ' : type === 'user' ? 'ব্যবহারকারীকে রিপোর্ট' : 'প্রোডাক্ট রিপোর্ট করুন'} width="max-w-md" variant="sheet">
        {done ? (
          <div className="py-4 text-center">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Icon name="check" className="h-7 w-7" />
            </span>
            <p className="font-semibold text-teal-950">রিপোর্ট জমা হয়েছে</p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500">আমাদের টিমকে এখনই জানানো হয়েছে। আপনার পরিচয় অন্য কেউ জানবে না।</p>
            <Button variant="dark" className="mt-6" onClick={close}>ঠিক আছে</Button>
          </div>
        ) : (
          <>
            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-teal-950">সমস্যাটি কী?</legend>
              <div className="space-y-1.5">
                {REPORT_REASONS.map((r) => (
                  <label
                    key={r.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-3 text-[15px] ring-1 ring-inset transition ${
                      reason === r.value ? 'bg-rose-50 text-rose-900 ring-rose-300' : 'bg-white text-slate-700 ring-teal-900/10 hover:bg-slate-50'
                    }`}
                  >
                    <input type="radio" name="reason" value={r.value} checked={reason === r.value} onChange={() => setReason(r.value)} className="accent-rose-600" />
                    {r.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="mt-4">
              <label htmlFor="report-details" className="mb-1.5 block text-sm font-semibold text-teal-950">
                বিস্তারিত <span className="font-normal text-slate-400">(ঐচ্ছিক)</span>
              </label>
              <Textarea id="report-details" value={details} onChange={(e) => setDetails(e.target.value)} maxLength={800} className="min-h-24" placeholder="কী ঘটেছে সংক্ষেপে লিখুন…" />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="soft" onClick={close}>বাতিল</Button>
              <Button variant="danger" disabled={!reason} loading={busy} onClick={send}>
                রিপোর্ট পাঠান
              </Button>
            </div>
          </>
        )}
      </Dialog>
    </>
  )
}
