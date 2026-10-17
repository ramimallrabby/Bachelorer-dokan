'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { ActionDialog, Card, Empty, Money, PageHeader, Segmented } from '@/components/admin/kit'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icons'
import { Skeleton } from '@/components/ui/Feedback'
import { SmartImage } from '@/components/ui/Media'
import { StatusPill } from '@/components/ui/Pill'
import { adminListings, deleteListingAdmin, setListingHidden } from '@/lib/services/admin'
import { friendlyError } from '@/lib/errors'
import useDebounce from '@/hooks/useDebounce'
import { timeAgo } from '@/lib/format'

const ST = { active: ['চালু', 'green'], reserved: ['রিজার্ভড', 'amber'], sold: ['বিক্রিত', 'slate'], hidden: ['লুকানো', 'rose'] }

export default function AdminListings() {
  const [status, setStatus] = useState('')
  const [q, setQ] = useState('')
  const dq = useDebounce(q, 300)
  const [rows, setRows] = useState(null)
  const [dlg, setDlg] = useState(null)

  const load = useCallback(() => adminListings(dq, status).then(setRows).catch((e) => toast.error(friendlyError(e))), [dq, status])
  useEffect(() => {
    setRows(null)
    load()
  }, [load])

  const D = {
    hide: { title: 'প্রোডাক্ট লুকান', desc: 'পাবলিক থেকে সরে যাবে, বিক্রেতাকে জানানো হবে।', label: 'লুকান', danger: true },
    show: { title: 'আবার চালু করুন', desc: 'প্রোডাক্টটি আবার সবার কাছে দেখা যাবে।', label: 'চালু করুন' },
    del: { title: 'স্থায়ীভাবে মুছুন', desc: 'এটি ফেরানো যাবে না।', label: 'মুছে ফেলুন', danger: true, required: true },
  }[dlg?.kind]

  return (
    <>
      <PageHeader title="প্রোডাক্ট ম্যানেজমেন্ট" subtitle="সব লিস্টিং খুঁজুন, লুকান বা মুছুন।" />
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex h-11 min-w-[240px] flex-1 items-center gap-2 rounded-2xl bg-white px-4 ring-1 ring-teal-900/10 focus-within:ring-teal-600/50 sm:max-w-sm">
          <Icon name="search" className="h-[18px] w-[18px] text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="নাম দিয়ে খুঁজুন…" className="min-w-0 flex-1 bg-transparent outline-none" />
        </label>
        <Segmented value={status} onChange={setStatus} options={[{ value: '', label: 'সব' }, { value: 'active', label: 'চালু' }, { value: 'hidden', label: 'লুকানো' }, { value: 'reserved', label: 'রিজার্ভড' }, { value: 'sold', label: 'বিক্রিত' }]} />
      </div>

      <Card className="mt-6 overflow-hidden">
        {rows === null ? (
          <div className="space-y-3 p-5">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : rows.length === 0 ? (
          <Empty icon="tag">কিছু পাওয়া যায়নি</Empty>
        ) : (
          <ul className="divide-y divide-teal-900/[0.06]">
            {rows.map((l) => {
              const [label, tone] = ST[l.status] ?? ST.active
              return (
                <li key={l.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                  <SmartImage src={l.image_url} alt="" className="h-14 w-16 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1 basis-48">
                    <Link href={`/product/${l.id}`} target="_blank" className="block truncate font-semibold text-teal-950 hover:underline">{l.title}</Link>
                    <p className="truncate text-sm text-slate-500">{l.seller?.full_name || 'অজানা'} · {timeAgo(l.created_at)} · {l.views ?? 0} ভিউ</p>
                    {l.status === 'hidden' && l.hidden_reason && <p className="truncate text-xs text-rose-600">{l.hidden_reason}</p>}
                  </div>
                  <Money className="text-lg text-teal-900">{l.price}</Money>
                  <StatusPill tone={tone}>{label}</StatusPill>
                  <div className="flex gap-2">
                    {l.status === 'hidden' ? (
                      <Button size="sm" variant="soft" onClick={() => setDlg({ row: l, kind: 'show' })}>চালু করুন</Button>
                    ) : l.status !== 'reserved' ? (
                      <Button size="sm" variant="outline" onClick={() => setDlg({ row: l, kind: 'hide' })}>লুকান</Button>
                    ) : null}
                    {l.status !== 'reserved' && (
                      <Button size="sm" variant="outline" className="text-rose-700" onClick={() => setDlg({ row: l, kind: 'del' })}><Icon name="trash" className="h-4 w-4" /></Button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </Card>

      {dlg && (
        <ActionDialog
          open
          onClose={() => setDlg(null)}
          title={`${D.title}: ${dlg.row.title}`}
          description={D.desc}
          confirmLabel={D.label}
          danger={D.danger}
          noteRequired={D.required}
          noteLabel="কারণ"
          onConfirm={async (note) => {
            if (dlg.kind === 'del') await deleteListingAdmin(dlg.row.id, note)
            else await setListingHidden(dlg.row.id, dlg.kind === 'hide', note)
            toast.success('সম্পন্ন।')
            load()
          }}
        />
      )}
    </>
  )
}
