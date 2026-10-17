'use client'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ActionDialog, Card, PageHeader } from '@/components/admin/kit'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icons'
import { Field, Input, Textarea } from '@/components/ui/Form'
import { Skeleton } from '@/components/ui/Feedback'
import { fetchSettings, setSetting } from '@/lib/services/admin'
import { friendlyError } from '@/lib/errors'

const GROUPS = [
  { title: 'পেমেন্ট নম্বর', hint: 'ডিপোজিটের সময় ব্যবহারকারীরা এই নম্বরগুলো দেখবে। খালি রাখলে সেই মেথড দেখাবে না।', fields: [
    { key: 'bkash_number', label: 'bKash নম্বর', ph: '01XXXXXXXXX' },
    { key: 'nagad_number', label: 'Nagad নম্বর', ph: '01XXXXXXXXX' },
    { key: 'rocket_number', label: 'Rocket নম্বর', ph: '01XXXXXXXXX' },
    { key: 'bank_details', label: 'ব্যাংক বিবরণ', ph: 'ব্যাংক, অ্যাকাউন্ট নাম, নম্বর, শাখা', area: true },
  ]},
  { title: 'ফি ও সীমা', hint: 'bps: ১০০ = ১%, ২০০ = ২%।', fields: [
    { key: 'escrow_fee_bps', label: 'এসক্রো ফি (bps)', num: true },
    { key: 'withdrawal_fee_bps', label: 'উত্তোলন ফি (bps)', num: true },
    { key: 'min_deposit', label: 'সর্বনিম্ন ডিপোজিট (৳)', num: true },
    { key: 'max_deposit', label: 'সর্বোচ্চ ডিপোজিট (৳)', num: true },
    { key: 'min_withdrawal', label: 'সর্বনিম্ন উত্তোলন (৳)', num: true },
    { key: 'daily_withdrawal_limit', label: 'দৈনিক উত্তোলন সীমা (৳)', num: true },
  ]},
  { title: 'অর্ডার ও মডারেশন', fields: [
    { key: 'auto_release_hours', label: 'অটো-রিলিজ (ঘণ্টা)', num: true },
    { key: 'pending_expiry_minutes', label: 'পেন্ডিং অর্ডার মেয়াদ (মিনিট)', num: true },
    { key: 'report_auto_hide_threshold', label: 'কতজন রিপোর্ট করলে অটো-লুকাবে', num: true },
  ]},
]

export default function SettingsPage() {
  const [s, setS] = useState(null)
  const [orig, setOrig] = useState({})
  const [busy, setBusy] = useState(false)
  const [modeDlg, setModeDlg] = useState(false)

  const load = () => fetchSettings().then((d) => { setS(d); setOrig(d) }).catch((e) => toast.error(friendlyError(e)))
  useEffect(() => { load() }, [])

  async function save() {
    setBusy(true)
    try {
      const changed = Object.keys(s).filter((k) => s[k] !== orig[k] && k !== 'payments_mode')
      for (const k of changed) await setSetting(k, s[k])
      toast.success(changed.length ? `${changed.length}টি সেটিং সেভ হয়েছে` : 'কোনো পরিবর্তন নেই')
      await load()
    } catch (e) {
      toast.error(friendlyError(e))
    } finally {
      setBusy(false)
    }
  }

  if (!s) return <><PageHeader title="সেটিংস" /><Skeleton className="h-96 rounded-3xl" /></>
  const live = s.payments_mode === 'live'
  const dirty = Object.keys(s).some((k) => s[k] !== orig[k] && k !== 'payments_mode')

  return (
    <>
      <PageHeader title="সেটিংস" subtitle="ফি, পেমেন্ট নম্বর ও নিয়মকানুন। প্রতিটি পরিবর্তন অডিট লগে থাকে।" />

      <Card className={`mb-6 overflow-hidden ${live ? '' : 'ring-amber-300'}`}>
        <div className={`flex flex-wrap items-center justify-between gap-4 p-6 ${live ? 'bg-emerald-50' : 'bg-amber-50'}`}>
          <div className="flex items-center gap-4">
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${live ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>
              <Icon name={live ? 'lock' : 'alert'} className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-xl font-extrabold text-teal-950">{live ? 'লাইভ মোড: আসল টাকা' : 'টেস্ট মোড: খেলার টাকা'}</p>
              <p className="text-sm text-slate-600">{live ? 'ডিপোজিট শুধু আপনার যাচাই করা TrxID দিয়ে হয়।' : 'ব্যবহারকারীরা টেস্ট ক্রেডিট নিতে পারে। আসল ডিপোজিট বন্ধ।'}</p>
            </div>
          </div>
          <Button variant={live ? 'outline' : 'dark'} onClick={() => setModeDlg(true)}>{live ? 'টেস্ট মোডে ফিরুন' : 'লাইভ মোড চালু করুন'}</Button>
        </div>
      </Card>

      <div className="space-y-6">
        {GROUPS.map((g) => (
          <Card key={g.title} className="p-6">
            <h2 className="font-display text-lg font-bold text-teal-950">{g.title}</h2>
            {g.hint && <p className="mt-1 text-sm text-slate-500">{g.hint}</p>}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {g.fields.map((f) => (
                <div key={f.key} className={f.area ? 'sm:col-span-2' : ''}>
                  <Field label={f.label}>
                    {(p) => f.area
                      ? <Textarea {...p} value={s[f.key] ?? ''} onChange={(e) => setS({ ...s, [f.key]: e.target.value })} placeholder={f.ph} />
                      : <Input {...p} type={f.num ? 'number' : 'text'} inputMode={f.num ? 'numeric' : undefined} value={s[f.key] ?? ''} onChange={(e) => setS({ ...s, [f.key]: e.target.value })} placeholder={f.ph} />}
                  </Field>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-4 mt-6 flex justify-end">
        <Button variant="dark" size="lg" loading={busy} disabled={!dirty} onClick={save} className="shadow-[0_20px_40px_-16px_rgba(10,61,56,0.8)]">পরিবর্তন সেভ করুন</Button>
      </div>

      {modeDlg && (
        <ActionDialog
          open
          onClose={() => setModeDlg(false)}
          title={live ? 'টেস্ট মোডে ফিরবেন?' : 'লাইভ মোড চালু করবেন?'}
          description={live
            ? 'নতুন আসল ডিপোজিট বন্ধ হবে, টেস্ট ক্রেডিট আবার চালু হবে। বিদ্যমান ওয়ালেট ব্যালেন্স অপরিবর্তিত থাকবে।'
            : 'চালু করার আগে নিশ্চিত করুন: (১) অন্তত একটি পেমেন্ট নম্বর সেট করেছেন, (২) টেস্টে দেওয়া খেলার টাকা ব্যবহারকারীদের ওয়ালেট থেকে মুছে ফেলেছেন (ব্যবহারকারী পেজ থেকে অ্যাডজাস্ট করে), (৩) টেস্ট ক্রেডিট আর কাজ করবে না।'}
          confirmLabel={live ? 'টেস্টে ফিরুন' : 'লাইভ চালু করুন'}
          danger={!live}
          noteLabel="নোট"
          onConfirm={async () => { await setSetting('payments_mode', live ? 'test' : 'live'); toast.success('মোড বদলেছে।'); load() }}
        />
      )}
    </>
  )
}
