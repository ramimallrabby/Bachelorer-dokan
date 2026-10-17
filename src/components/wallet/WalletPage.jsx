'use client'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthProvider'
import useWallet from '@/hooks/useWallet'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Icon from '@/components/ui/Icons'
import { Chip, Field, Input } from '@/components/ui/Form'
import { EmptyState, Skeleton } from '@/components/ui/Feedback'
import { StatusPill } from '@/components/ui/Pill'
import { fetchLedger, fetchMyRequests, requestWithdrawal, submitDeposit, testTopup } from '@/lib/services/wallet'
import { fetchSettings } from '@/lib/services/admin'
import { LEDGER_KINDS, PAYMENT_METHODS } from '@/lib/constants'
import { friendlyError } from '@/lib/errors'
import { formatDateTime, formatPrice, timeAgo } from '@/lib/format'

const REQ_TONE = { pending: 'amber', approved: 'green', paid: 'green', rejected: 'rose' }
const REQ_LABEL = { pending: 'যাচাই চলছে', approved: 'অনুমোদিত', paid: 'পাঠানো হয়েছে', rejected: 'বাতিল' }
const methodLabel = (m) => PAYMENT_METHODS.find((x) => x.value === m)?.label ?? m

function MethodPicker({ value, onChange, methods }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {methods.map((m) => (
        <button
          key={m.value}
          type="button"
          onClick={() => onChange(m.value)}
          aria-pressed={value === m.value}
          className={`flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-bold transition ${
            value === m.value ? 'bg-teal-900 text-white shadow-[0_8px_20px_-10px_rgba(10,61,56,0.9)]' : 'bg-white text-teal-950 ring-1 ring-inset ring-teal-900/15 hover:bg-teal-50'
          }`}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: m.color }} /> {m.label}
        </button>
      ))}
    </div>
  )
}

function DepositDialog({ open, onClose, settings, onDone }) {
  const [method, setMethod] = useState('bkash')
  const [amount, setAmount] = useState('')
  const [sender, setSender] = useState('')
  const [trx, setTrx] = useState('')
  const [busy, setBusy] = useState(false)
  const min = Number(settings.min_deposit || 50)
  const target = method === 'bank' ? settings.bank_details : settings[`${method}_number`]
  const available = PAYMENT_METHODS.filter((m) => (m.value === 'bank' ? settings.bank_details : settings[`${m.value}_number`]))

  useEffect(() => {
    if (open && available.length && !available.some((m) => m.value === method)) setMethod(available[0].value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    try {
      await submitDeposit({ amount: Number(amount), method, sender, trx })
      toast.success('অনুরোধ জমা হয়েছে। যাচাই শেষে টাকা ওয়ালেটে যোগ হবে।')
      setAmount('')
      setTrx('')
      onDone()
      onClose()
    } catch (err) {
      toast.error(friendlyError(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} title="ওয়ালেটে টাকা যোগ করুন" variant="sheet" width="max-w-xl">
      {available.length === 0 ? (
        <p className="rounded-2xl bg-amber-50 p-4 text-[15px] text-amber-900 ring-1 ring-amber-200">এখনো কোনো পেমেন্ট নম্বর সেট করা হয়নি। অনুগ্রহ করে পরে চেষ্টা করুন।</p>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <MethodPicker value={method} onChange={setMethod} methods={available} />
          <div className="rounded-2xl bg-gradient-to-br from-teal-900 to-teal-950 p-5 text-white">
            <p className="text-sm text-white/70">{method === 'bank' ? 'ব্যাংক অ্যাকাউন্টে পাঠান' : `এই ${methodLabel(method)} নম্বরে “Send Money” করুন`}</p>
            <div className="mt-1.5 flex items-center justify-between gap-3">
              <p className="font-display whitespace-pre-wrap break-all text-2xl font-extrabold tracking-wide">{target}</p>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(target).then(() => toast.success('কপি হয়েছে'))}
                className="shrink-0 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-semibold ring-1 ring-white/25 transition hover:bg-white/25"
              >
                কপি
              </button>
            </div>
          </div>
          <ol className="space-y-1.5 text-[14.5px] leading-relaxed text-slate-600">
            <li>১. উপরের নম্বরে টাকা পাঠান, তারপর পাওয়া <b>TrxID</b> কপি করুন।</li>
            <li>২. নিচে পরিমাণ, আপনার নম্বর ও TrxID দিন।</li>
            <li>৩. আমরা যাচাই করলেই টাকা ওয়ালেটে যোগ হবে এবং আপনি নোটিফিকেশন পাবেন।</li>
          </ol>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="পরিমাণ (৳)" hint={`সর্বনিম্ন ${formatPrice(min)}`}>
              {(p) => <Input {...p} type="number" inputMode="numeric" min={min} required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="500" />}
            </Field>
            {method !== 'bank' && (
              <Field label={`আপনার ${methodLabel(method)} নম্বর`}>
                {(p) => <Input {...p} inputMode="tel" required value={sender} onChange={(e) => setSender(e.target.value)} placeholder="01XXXXXXXXX" />}
              </Field>
            )}
          </div>
          <Field label="TrxID" hint="যেমন: 8N7A6D5E4C">
            {(p) => <Input {...p} required value={trx} onChange={(e) => setTrx(e.target.value.toUpperCase())} className="font-mono uppercase tracking-wider" maxLength={20} />}
          </Field>
          <Button type="submit" variant="primary" size="lg" className="w-full" loading={busy}>
            যাচাইয়ের জন্য জমা দিন
          </Button>
        </form>
      )}
    </Dialog>
  )
}

function WithdrawDialog({ open, onClose, settings, balance, onDone }) {
  const [method, setMethod] = useState('bkash')
  const [amount, setAmount] = useState('')
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const min = Number(settings.min_withdrawal || 100)
  const feeBps = Number(settings.withdrawal_fee_bps || 0)
  const fee = Math.round((Number(amount || 0) * feeBps) / 100) / 100
  const net = Math.max(0, Number(amount || 0) - fee)

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    try {
      await requestWithdrawal({ amount: Number(amount), method, account, name })
      toast.success('উত্তোলনের অনুরোধ জমা হয়েছে। ২৪ ঘণ্টার মধ্যে টাকা পাঠানো হবে।')
      setAmount('')
      onDone()
      onClose()
    } catch (err) {
      toast.error(friendlyError(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} title="টাকা উত্তোলন" variant="sheet" width="max-w-xl">
      <form onSubmit={submit} className="space-y-5">
        <p className="rounded-2xl bg-teal-900/[0.05] px-4 py-3 text-[15px] text-slate-600">
          উত্তোলনযোগ্য ব্যালেন্স: <b className="text-teal-950">{formatPrice(balance ?? 0)}</b>
        </p>
        <MethodPicker value={method} onChange={setMethod} methods={PAYMENT_METHODS} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={method === 'bank' ? 'ব্যাংক অ্যাকাউন্ট নম্বর' : `${methodLabel(method)} নম্বর`}>
            {(p) => <Input {...p} required inputMode="tel" value={account} onChange={(e) => setAccount(e.target.value)} placeholder={method === 'bank' ? 'অ্যাকাউন্ট নম্বর' : '01XXXXXXXXX'} />}
          </Field>
          <Field label="অ্যাকাউন্ট হোল্ডারের নাম">{(p) => <Input {...p} value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />}</Field>
        </div>
        <Field label="পরিমাণ (৳)" hint={`সর্বনিম্ন ${formatPrice(min)}`}>
          {(p) => <Input {...p} type="number" inputMode="numeric" min={min} max={balance ?? undefined} required value={amount} onChange={(e) => setAmount(e.target.value)} />}
        </Field>
        {Number(amount) > 0 && (
          <dl className="space-y-1.5 rounded-2xl bg-white p-4 text-[15px] ring-1 ring-teal-900/10">
            {fee > 0 && (
              <div className="flex justify-between text-slate-600"><dt>ফি</dt><dd>-{formatPrice(fee)}</dd></div>
            )}
            <div className="flex justify-between font-bold text-teal-950"><dt>আপনি পাবেন</dt><dd className="font-display text-lg">{formatPrice(net)}</dd></div>
          </dl>
        )}
        <Button type="submit" variant="dark" size="lg" className="w-full" loading={busy} disabled={!(balance > 0)}>
          উত্তোলনের অনুরোধ করুন
        </Button>
      </form>
    </Dialog>
  )
}

export default function WalletPage() {
  const { user } = useAuth()
  const { balance, reload } = useWallet(user.id)
  const [settings, setSettings] = useState(null)
  const [ledger, setLedger] = useState(null)
  const [reqs, setReqs] = useState({ deposits: [], withdrawals: [] })
  const [tab, setTab] = useState('history')
  const [dialog, setDialog] = useState(null)
  const [busyTest, setBusyTest] = useState(false)

  const load = useCallback(() => {
    fetchLedger(user.id).then(setLedger).catch((e) => toast.error(friendlyError(e)))
    fetchMyRequests(user.id).then(setReqs).catch(() => {})
    reload()
  }, [user.id, reload])

  useEffect(() => {
    fetchSettings().then(setSettings).catch(() => setSettings({}))
    load()
    // balance / request status changes (admin approves a deposit) show up instantly
    const ch = supabase
      .channel(`wallet-page:${user.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'deposit_requests', filter: `user_id=eq.${user.id}` }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'withdrawal_requests', filter: `user_id=eq.${user.id}` }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'wallets', filter: `user_id=eq.${user.id}` }, load)
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [user.id, load])

  const isTest = (settings?.payments_mode ?? 'test') === 'test'
  const pendingCount = reqs.deposits.filter((d) => d.status === 'pending').length + reqs.withdrawals.filter((w) => w.status === 'pending').length

  async function topup(n) {
    setBusyTest(true)
    try {
      await testTopup(n)
      toast.success(`টেস্ট ক্রেডিট ${formatPrice(n)} যোগ হয়েছে`)
      load()
    } catch (e) {
      toast.error(friendlyError(e))
    } finally {
      setBusyTest(false)
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-20 pt-8 sm:px-6">
      <section className="aurora grain on-dark relative overflow-hidden rounded-[32px] p-7 text-white shadow-[0_40px_70px_-36px_rgba(10,61,56,0.8)] sm:p-10">
        <p className="flex items-center gap-2 text-sm font-medium text-white/70">
          <Icon name="wallet" className="h-[18px] w-[18px]" /> আপনার ওয়ালেট ব্যালেন্স
        </p>
        <p className="font-display mt-3 text-5xl font-extrabold tracking-tight sm:text-6xl">
          {balance === null ? <span className="skeleton inline-block h-14 w-48 !bg-white/10" /> : formatPrice(balance)}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button variant="primary" size="lg" onClick={() => (isTest ? null : setDialog('deposit'))} disabled={isTest} title={isTest ? 'টেস্ট মোডে নিচের টেস্ট ক্রেডিট ব্যবহার করুন' : undefined}>
            <Icon name="arrowDown" className="h-5 w-5" /> টাকা যোগ করুন
          </Button>
          <Button variant="glass" size="lg" onClick={() => setDialog('withdraw')}>
            <Icon name="arrowUp" className="h-5 w-5" /> উত্তোলন
          </Button>
        </div>
      </section>

      {isTest && settings && (
        <section className="mt-5 rounded-3xl bg-amber-50 p-5 ring-1 ring-amber-200">
          <p className="flex items-center gap-2 font-semibold text-amber-950"><Icon name="alert" className="h-5 w-5" /> টেস্ট মোড চালু</p>
          <p className="mt-1 text-[14.5px] leading-relaxed text-amber-900">সাইটটি এখনো টেস্ট মোডে, তাই আসল টাকা যোগ করা যাচ্ছে না। পুরো কেনাবেচার প্রক্রিয়া চালিয়ে দেখতে খেলার টাকা নিন:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[500, 2000, 10000].map((n) => (
              <Button key={n} size="sm" variant="outline" loading={busyTest} onClick={() => topup(n)}>+ {formatPrice(n)}</Button>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 flex gap-2">
        <Chip active={tab === 'history'} onClick={() => setTab('history')}>লেনদেনের ইতিহাস</Chip>
        <Chip active={tab === 'requests'} onClick={() => setTab('requests')}>
          অনুরোধ {pendingCount > 0 && <span className="ml-1 rounded-full bg-amber-400 px-1.5 text-xs text-teal-950">{pendingCount}</span>}
        </Chip>
      </div>

      <div className="mt-5">
        {tab === 'history' ? (
          ledger === null ? (
            <div className="space-y-3">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-[72px] rounded-2xl" />)}</div>
          ) : ledger.length === 0 ? (
            <EmptyState icon="wallet" title="এখনো কোনো লেনদেন নেই">টাকা যোগ করলে বা কিছু কিনলে-বেচলে এখানে হিসাব দেখা যাবে।</EmptyState>
          ) : (
            <ul className="divide-y divide-teal-900/[0.06] overflow-hidden rounded-3xl bg-white shadow-[0_14px_30px_-18px_rgba(10,61,56,0.3)] ring-1 ring-teal-900/[0.06]">
              {ledger.map((e) => {
                const plus = Number(e.amount) > 0
                return (
                  <li key={e.id} className="flex items-center gap-4 px-5 py-4">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${plus ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      <Icon name={plus ? 'arrowDown' : 'arrowUp'} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-teal-950">{LEDGER_KINDS[e.kind]?.label ?? e.kind}</p>
                      <p className="truncate text-[13px] text-slate-500">{e.note || formatDateTime(e.created_at)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-display text-lg font-extrabold ${plus ? 'text-emerald-700' : 'text-slate-800'}`}>
                        {plus ? '+' : '−'}{formatPrice(Math.abs(e.amount))}
                      </p>
                      <p className="text-xs text-slate-400">{timeAgo(e.created_at)}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          )
        ) : reqs.deposits.length + reqs.withdrawals.length === 0 ? (
          <EmptyState icon="receipt" title="কোনো অনুরোধ নেই">ডিপোজিট বা উত্তোলনের অনুরোধ এখানে দেখা যাবে।</EmptyState>
        ) : (
          <ul className="space-y-3">
            {[...reqs.deposits.map((d) => ({ ...d, type: 'deposit' })), ...reqs.withdrawals.map((w) => ({ ...w, type: 'withdrawal' }))]
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((r) => (
                <li key={r.id} className="rounded-3xl bg-white p-5 ring-1 ring-teal-900/[0.06]">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-teal-950">
                      {r.type === 'deposit' ? 'ডিপোজিট' : 'উত্তোলন'} · {methodLabel(r.method)}
                    </p>
                    <StatusPill tone={REQ_TONE[r.status]}>{REQ_LABEL[r.status]}</StatusPill>
                  </div>
                  <p className="font-display mt-1 text-2xl font-extrabold text-teal-900">{formatPrice(r.amount)}</p>
                  <p className="mt-1 text-[13px] text-slate-500">
                    {r.type === 'deposit' ? `TrxID ${r.trx_id}` : r.payout_ref ? `রেফারেন্স ${r.payout_ref}` : r.account_no} · {formatDateTime(r.created_at)}
                  </p>
                  {r.admin_note && <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">{r.admin_note}</p>}
                </li>
              ))}
          </ul>
        )}
      </div>

      {settings && (
        <>
          <DepositDialog open={dialog === 'deposit'} onClose={() => setDialog(null)} settings={settings} onDone={load} />
          <WithdrawDialog open={dialog === 'withdraw'} onClose={() => setDialog(null)} settings={settings} balance={balance} onDone={load} />
        </>
      )}
    </main>
  )
}
