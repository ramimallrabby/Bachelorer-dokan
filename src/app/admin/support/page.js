'use client'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Card, Empty, PageHeader } from '@/components/admin/kit'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icons'
import { Skeleton } from '@/components/ui/Feedback'
import { StatusPill } from '@/components/ui/Pill'
import { Avatar } from '@/components/ui/Media'
import { supabase } from '@/lib/supabase'
import { friendlyError } from '@/lib/errors'
import { formatDate } from '@/lib/format'

export default function AdminSupport() {
  const [tickets, setTickets] = useState(null)
  const [busyId, setBusyId] = useState(null)

  const loadTickets = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        // খেয়াল করুন: এখান থেকে email পুরোপুরি বাদ দেওয়া হয়েছে
        .select('*, user:profiles(id, full_name, avatar_url)')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTickets(data ?? [])
    } catch (e) {
      toast.error(friendlyError(e))
      setTickets([])
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => loadTickets(), 0)
    return () => clearTimeout(timer)
  }, [loadTickets])

  async function handleResolve(id) {
    setBusyId(id)
    try {
      const { error } = await supabase
        .from('support_tickets')
        .update({ status: 'resolved' })
        .eq('id', id)

      if (error) throw error
      toast.success('টিকিটটি সমাধান হিসেবে চিহ্নিত করা হয়েছে।')
      loadTickets()
    } catch (e) {
      toast.error(friendlyError(e))
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <PageHeader title="সাপোর্ট টিকিট" subtitle="ব্যবহারকারীদের পাঠানো সমস্যা ও অভিযোগসমূহ" />

      <Card className="mt-6 overflow-hidden">
        {tickets === null ? (
          <div className="space-y-3 p-5">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-20" />)}</div>
        ) : tickets.length === 0 ? (
          <Empty icon="chat">কোনো সাপোর্ট টিকিট নেই</Empty>
        ) : (
          <ul className="divide-y divide-teal-900/[0.06]">
            {tickets.map((t) => (
              <li key={t.id} className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <Avatar name={t.user?.full_name || 'User'} url={t.user?.avatar_url} className="h-11 w-11 shrink-0" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-teal-950">{t.user?.full_name || '(নাম নেই)'}</span>
                      <StatusPill tone={t.status === 'resolved' ? 'green' : 'amber'}>
                        {t.status === 'resolved' ? 'সমাধানকৃত' : 'অপেক্ষমাণ'}
                      </StatusPill>
                    </div>
                    <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{t.message}</p>
                    
                    {t.attachment_url && (
                      <div className="mt-3">
                        <a href={t.attachment_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:underline">
                          <Icon name="link" className="h-3.5 w-3.5" /> সংযুক্ত ফাইলটি দেখুন (Attachment)
                        </a>
                      </div>
                    )}

                    <p className="mt-2 text-xs text-slate-400">{formatDate(t.created_at)}</p>
                  </div>
                </div>

                {t.status === 'pending' && (
                  <div className="flex sm:justify-end">
                    <Button size="sm" variant="soft" loading={busyId === t.id} onClick={() => handleResolve(t.id)}>
                      <Icon name="check" className="h-4 w-4" /> সমাধান হয়েছে
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  )
}