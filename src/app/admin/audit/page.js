'use client'
import { useEffect, useState } from 'react'
import { Card, Empty, PageHeader } from '@/components/admin/kit'
import { Skeleton } from '@/components/ui/Feedback'
import { adminAudit } from '@/lib/services/admin'
import { formatDateTime } from '@/lib/format'

export default function AuditPage() {
  const [rows, setRows] = useState(null)
  useEffect(() => { adminAudit().then(setRows).catch(() => setRows([])) }, [])

  return (
    <>
      <PageHeader title="অডিট লগ" subtitle="কোন অ্যাডমিন কখন কী করেছেন। মোছা বা বদলানো যায় না।" />
      <Card className="overflow-hidden">
        {rows === null ? (
          <div className="space-y-3 p-5">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-14" />)}</div>
        ) : rows.length === 0 ? (
          <Empty icon="list">এখনো কোনো রেকর্ড নেই</Empty>
        ) : (
          <ul className="divide-y divide-teal-900/[0.06]">
            {rows.map((r) => (
              <li key={r.id} className="flex flex-wrap items-start gap-x-5 gap-y-1 px-5 py-3.5 text-sm">
                <code className="rounded-lg bg-teal-900/[0.07] px-2.5 py-1 font-mono text-[13px] font-semibold text-teal-900">{r.action}</code>
                <span className="font-semibold text-teal-950">{r.admin?.full_name || 'অ্যাডমিন'}</span>
                <span className="min-w-0 flex-1 truncate text-slate-500">{r.target_type}: {r.target_id}{r.details?.note ? ` · ${r.details.note}` : r.details?.reason ? ` · ${r.details.reason}` : ''}</span>
                <span className="text-xs text-slate-400">{formatDateTime(r.created_at)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  )
}
