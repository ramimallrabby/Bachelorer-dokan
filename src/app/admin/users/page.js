'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { ActionDialog, Card, Empty, Money, PageHeader } from '@/components/admin/kit'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icons'
import { Skeleton } from '@/components/ui/Feedback'
import { StatusPill } from '@/components/ui/Pill'
import { Avatar } from '@/components/ui/Media'
import { adjustWallet, adminUsers, setUserBan } from '@/lib/services/admin'
import { friendlyError } from '@/lib/errors'
import useDebounce from '@/hooks/useDebounce'
import { formatDate } from '@/lib/format'

const PAGE_SIZE = 30

export default function AdminUsers() {
  const [q, setQ] = useState('')
  const dq = useDebounce(q, 300)
  const [page, setPage] = useState(0) // পেজিনেশনের জন্য নতুন স্টেট
  const [rows, setRows] = useState(null)
  const [dlg, setDlg] = useState(null)

 // নতুন কিছু সার্চ করলে পেজ নাম্বার রিসেট হয়ে প্রথম পেজে চলে যাবে
  useEffect(() => {
    const timer = setTimeout(() => setPage(0), 0)
    return () => clearTimeout(timer)
  }, [dq])

  const load = useCallback(() => {
    // adminUsers ফাংশনে offset (page * 30) পাঠানো হচ্ছে
    adminUsers(dq, page * PAGE_SIZE)
      .then(setRows)
      .catch((e) => toast.error(friendlyError(e)))
  }, [dq, page])

  useEffect(() => {
    // সিঙ্ক্রোনাস রেন্ডার এড়াতে setTimeout ব্যবহার করা হলো
    const timer = setTimeout(() => {
      setRows(null)
      load()
    }, 0)
    return () => clearTimeout(timer)
  }, [load])

  const total = rows?.[0]?.total_count ?? 0
  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <>
      <PageHeader title="ব্যবহারকারী" subtitle={rows ? `মোট ${Number(total).toLocaleString('bn-BD')} জন` : ' '} />
      <label className="flex h-11 max-w-md items-center gap-2 rounded-2xl bg-white px-4 ring-1 ring-teal-900/10 focus-within:ring-teal-600/50">
        <Icon name="search" className="h-[18px] w-[18px] text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="নাম বা ইমেইল দিয়ে খুঁজুন…" className="min-w-0 flex-1 bg-transparent outline-none" />
      </label>

      <Card className="mt-6 overflow-hidden">
        {rows === null ? (
          <div className="space-y-3 p-5">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : rows.length === 0 ? (
          <Empty icon="users">কেউ পাওয়া যায়নি</Empty>
        ) : (
          <>
            <ul className="divide-y divide-teal-900/[0.06]">
              {rows.map((u) => (
                <li key={u.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                  <Avatar name={u.full_name || u.email} className="h-11 w-11" />
                  <div className="min-w-0 flex-1 basis-52">
                    <p className="flex flex-wrap items-center gap-2 truncate font-semibold text-teal-950">
                      <Link href={`/u/${u.id}`} target="_blank" className="hover:underline">{u.full_name || '(নাম নেই)'}</Link>
                      {u.is_admin && <StatusPill tone="violet">অ্যাডমিন</StatusPill>}
                      {u.is_banned && <StatusPill tone="rose">ব্যান</StatusPill>}
                    </p>
                    <p className="truncate text-sm text-slate-500">{u.email} · যোগ দিয়েছেন {formatDate(u.created_at)}</p>
                  </div>
                  <div className="flex gap-5 text-center text-xs text-slate-500">
                    <span><b className="block text-base text-teal-950">{u.listings}</b>প্রোডাক্ট</span>
                    <span><b className="block text-base text-teal-950">{u.orders}</b>অর্ডার</span>
                    <span><Money className="block text-base text-teal-950">{u.balance}</Money>ওয়ালেট</span>
                  </div>
                  {!u.is_admin && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setDlg({ u, kind: 'adjust' })}><Icon name="wallet" className="h-4 w-4" /></Button>
                      {u.is_banned ? (
                        <Button size="sm" variant="soft" onClick={() => setDlg({ u, kind: 'unban' })}>আনব্যান</Button>
                      ) : (
                        <Button size="sm" variant="outline" className="text-rose-700" onClick={() => setDlg({ u, kind: 'ban' })}><Icon name="ban" className="h-4 w-4" /> ব্যান</Button>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* পেজিনেশন কন্ট্রোলস */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-teal-900/10 bg-teal-50/30 px-5 py-3.5">
                <p className="text-sm font-medium text-slate-500">
                  পৃষ্ঠা <span className="text-teal-900">{page + 1}</span> / {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                    আগের পৃষ্ঠা
                  </Button>
                  <Button size="sm" variant="outline" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
                    পরের পৃষ্ঠা
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {dlg && (
        <ActionDialog
          open
          onClose={() => setDlg(null)}
          title={{ ban: 'ব্যান করুন', unban: 'আনব্যান করুন', adjust: 'ওয়ালেট অ্যাডজাস্টমেন্ট' }[dlg.kind] + `: ${dlg.u.full_name || dlg.u.email}`}
          description={
            dlg.kind === 'ban'
              ? 'পোস্ট, চ্যাট ও কেনা বন্ধ হবে এবং সব চালু প্রোডাক্ট লুকানো হবে।'
              : dlg.kind === 'unban'
              ? 'অ্যাকাউন্ট আবার স্বাভাবিক হবে। (লুকানো প্রোডাক্ট নিজে থেকে ফিরবে না, প্রোডাক্ট ট্যাব থেকে চালু করুন।)'
              : 'ভুল সংশোধনের জন্য। ধনাত্মক = যোগ, ঋণাত্মক = কমানো (যেমন -200)। নিচের ঘরে পরিমাণ দিন।'
          }
          confirmLabel="নিশ্চিত করুন"
          danger={dlg.kind === 'ban'}
          noteRequired={dlg.kind !== 'unban'}
          noteLabel="কারণ"
          extra={dlg.kind === 'adjust' ? { label: 'পরিমাণ (৳)', placeholder: '+500 বা -200', required: true } : undefined}
          onConfirm={async (note, amount) => {
            if (dlg.kind === 'adjust') {
              const n = Number(amount)
              if (!n) throw new Error('INVALID_AMOUNT')
              await adjustWallet(dlg.u.id, n, note)
            } else await setUserBan(dlg.u.id, dlg.kind === 'ban', note)
            toast.success('সম্পন্ন।')
            load()
          }}
        />
      )}
    </>
  )
}