'use client'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { ActionDialog, Card, Empty, Money, PageHeader, Segmented, copy } from '@/components/admin/kit'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icons'
import { Skeleton } from '@/components/ui/Feedback'
import { StatusPill } from '@/components/ui/Pill'
import { adminDeposits, adminWithdrawals, reviewDeposit, reviewWithdrawal } from '@/lib/services/admin'
import { PAYMENT_METHODS } from '@/lib/constants'
import { friendlyError } from '@/lib/errors'
import { supabase } from '@/lib/supabase'
import { formatDateTime, timeAgo } from '@/lib/format'

const TONE = { pending: 'amber', approved: 'green', paid: 'green', rejected: 'rose' }
const LABEL = { pending: 'অপেক্ষমাণ', approved: 'অনুমোদিত', paid: 'পাঠানো হয়েছে', rejected: 'বাতিল' }
const method = (m) => PAYMENT_METHODS.find((x) => x.value === m)?.label ?? m

function Copyable({ text }) {
  return (
    <button type="button" onClick={() => copy(text)} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-[13px] font-semibold text-slate-800 transition hover:bg-slate-200" title="কপি করুন">
      {text}
    </button>
  )
}

function Payments() {
  const params = useSearchParams()
  const [tab, setTab] = useState(params.get('tab') === 'withdrawals' ? 'withdrawals' : 'deposits')
  const [status, setStatus] = useState('pending')
  const [rows, setRows] = useState(null)
  const [counts, setCounts] = useState({ d: 0, w: 0 })
  const [dlg, setDlg] = useState(null) // { row, kind }

  const load = useCallback(() => {
    ;(tab === 'deposits' ? adminDeposits(status) : adminWithdrawals(status)).then(setRows).catch((e) => toast.error(friendlyError(e)))
    Promise.all([adminDeposits('pending'), adminWithdrawals('pending')]).then(([d, w]) => setCounts({ d: d.length, w: w.length })).catch(() => {})
  }, [tab, status])

  useEffect(() => {
    setRows(null)
    load()
    const ch = supabase
      .channel('admin-payments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'deposit_requests' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'withdrawal_requests' }, load)
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [load])

  async function confirm(note, ref) {
    const { row, kind } = dlg
    if (kind === 'dep-ok') await reviewDeposit(row.id, true, note)
    if (kind === 'dep-no') await reviewDeposit(row.id, false, note)
    if (kind === 'wd-ok') await reviewWithdrawal(row.id, true, ref, note)
    if (kind === 'wd-no') await reviewWithdrawal(row.id, false, null, note)
    toast.success('সম্পন্ন হয়েছে।')
    load()
  }

  const D = {
    'dep-ok': { title: 'ডিপোজিট অনুমোদন', desc: 'আপনার bKash/Nagad অ্যাপে TrxID মিলিয়ে দেখেছেন তো? অনুমোদন করলে টাকা সাথে সাথে ব্যবহারকারীর ওয়ালেটে যোগ হবে।', label: 'অনুমোদন করুন' },
    'dep-no': { title: 'ডিপোজিট বাতিল', desc: 'TrxID মেলেনি বা টাকা আসেনি। ব্যবহারকারীকে কারণ জানানো হবে।', label: 'বাতিল করুন', danger: true, required: true },
    'wd-ok': { title: 'পেআউট নিশ্চিত', desc: 'প্রথমে নিজের অ্যাপ থেকে টাকা পাঠান, তারপর এখানে পেআউটের TrxID লিখে নিশ্চিত করুন।', label: 'পাঠানো হয়েছে', extra: { label: 'পেআউট TrxID / রেফারেন্স', placeholder: 'যেমন: 9K3L2M1N0P', required: true } },
    'wd-no': { title: 'উত্তোলন বাতিল', desc: 'টাকা ব্যবহারকারীর ওয়ালেটে ফেরত যাবে।', label: 'বাতিল ও ফেরত', danger: true, required: true },
  }[dlg?.kind]

  return (
    <>
      <PageHeader title="পেমেন্ট" subtitle="ডিপোজিট যাচাই করুন এবং উত্তোলনের পেআউট দিন। প্রতিটি কাজ অডিট লগে থাকে।" />
      <div className="flex flex-wrap items-center gap-3">
        <Segmented value={tab} onChange={(v) => { setTab(v); setStatus('pending') }} options={[{ value: 'deposits', label: 'ডিপোজিট', count: counts.d }, { value: 'withdrawals', label: 'উত্তোলন', count: counts.w }]} />
        <Segmented value={status} onChange={setStatus} options={[{ value: 'pending', label: 'অপেক্ষমাণ' }, { value: tab === 'deposits' ? 'approved' : 'paid', label: tab === 'deposits' ? 'অনুমোদিত' : 'পরিশোধিত' }, { value: 'rejected', label: 'বাতিল' }, { value: '', label: 'সব' }]} />
      </div>

      <div className="mt-6 space-y-3">
        {rows === null ? (
          [0, 1, 2].map((i) => <Skeleton key={i} className="h-28 rounded-3xl" />)
        ) : rows.length === 0 ? (
          <Card><Empty icon="wallet">কোনো অনুরোধ নেই</Empty></Card>
        ) : (
          rows.map((r) => (
            <Card key={r.id} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Money className="text-2xl text-teal-900">{r.amount}</Money>
                    <StatusPill tone={TONE[r.status]}>{LABEL[r.status]}</StatusPill>
                    <StatusPill tone="slate">{method(r.method)}</StatusPill>
                  </div>
                  <p className="mt-1.5 text-sm text-slate-500">
                    <Link href={`/u/${r.user_id}`} target="_blank" className="font-semibold text-teal-800 hover:underline">{r.user?.full_name}</Link> · {formatDateTime(r.created_at)} ({timeAgo(r.created_at)})
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                    {tab === 'deposits' ? (
                      <>
                        <span>TrxID: <Copyable text={r.trx_id} /></span>
                        {r.sender_number && <span>প্রেরক: <Copyable text={r.sender_number} /></span>}
                      </>
                    ) : (
                      <>
                        <span>পাঠাতে হবে: <Copyable text={r.account_no} /></span>
                        {r.account_name && <span>নাম: <b>{r.account_name}</b></span>}
                        <span>পাবেন: <Money className="text-teal-900">{Number(r.amount) - Number(r.fee)}</Money>{Number(r.fee) > 0 && <span className="text-xs text-slate-400"> (ফি ৳{r.fee})</span>}</span>
                        {r.payout_ref && <span>রেফ: <Copyable text={r.payout_ref} /></span>}
                      </>
                    )}
                  </div>
                  {r.admin_note && <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">{r.admin_note}</p>}
                </div>
                {r.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-rose-700" onClick={() => setDlg({ row: r, kind: tab === 'deposits' ? 'dep-no' : 'wd-no' })}>বাতিল</Button>
                    <Button size="sm" variant="dark" onClick={() => setDlg({ row: r, kind: tab === 'deposits' ? 'dep-ok' : 'wd-ok' })}>
                      <Icon name="check" className="h-4 w-4" /> {tab === 'deposits' ? 'অনুমোদন' : 'পাঠিয়েছি'}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {dlg && (
        <ActionDialog
          open
          onClose={() => setDlg(null)}
          title={D.title}
          description={D.desc}
          confirmLabel={D.label}
          danger={D.danger}
          noteRequired={D.required}
          noteLabel="নোট (ব্যবহারকারী দেখবে)"
          extra={D.extra}
          onConfirm={confirm}
        />
      )}
    </>
  )
}

export default function PaymentsPage() {
  return (
    <Suspense>
      <Payments />
    </Suspense>
  )
}
