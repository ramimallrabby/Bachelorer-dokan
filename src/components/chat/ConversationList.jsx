'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { Avatar } from '@/components/ui/Media'
import Button from '@/components/ui/Button'
import { EmptyState, ErrorState, Skeleton } from '@/components/ui/Feedback'
import useConversations from '@/hooks/useConversations'
import { timeAgo } from '@/lib/format'

export default function ConversationList() {
  const { user } = useAuth()
  const pathname = usePathname()
  const { items, unread, loading, error, reload } = useConversations(user.id)

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-teal-900/10 px-5 py-4">
        <h1 className="font-display text-xl font-extrabold text-teal-950">মেসেজ</h1>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {loading ? (
          <div className="space-y-4 p-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4">
            <ErrorState message={error} onRetry={reload} />
          </div>
        ) : items.length === 0 ? (
          <div className="p-4">
            <EmptyState
              icon="chat"
              title="কোনো মেসেজ নেই"
              action={
                <Button href="/" variant="dark">
                  প্রোডাক্ট দেখুন
                </Button>
              }
            >
              কোনো প্রোডাক্টে “Chat with Seller” চাপলে কথোপকথন এখানে দেখা যাবে।
            </EmptyState>
          </div>
        ) : (
          <ul>
            {items.map((c) => {
              const other = user.id === c.buyer_id ? c.seller : c.buyer
              const active = pathname === `/messages/${c.id}`
              const count = unread[c.id] || 0
              return (
                <li key={c.id}>
                  <Link
                    href={`/messages/${c.id}`}
                    className={`flex items-center gap-3 border-b border-teal-900/[0.06] px-4 py-3.5 transition ${
                      active ? 'bg-teal-900/[0.07]' : 'hover:bg-teal-900/[0.04]'
                    }`}
                  >
                    <Avatar name={other?.full_name} url={other?.avatar_url} className="h-12 w-12 text-base" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className={`truncate ${count ? 'font-bold' : 'font-semibold'} text-teal-950`}>{other?.full_name || 'ব্যবহারকারী'}</p>
                        <span className="shrink-0 text-xs text-slate-400">{timeAgo(c.last_message_at)}</span>
                      </div>
                      <p className="truncate text-[13px] text-teal-800/80">{c.listing?.title}</p>
                      <div className="flex items-center justify-between gap-2">
                        <p className={`truncate text-sm ${count ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>
                          {c.last_message_preview ? `${c.last_sender_id === user.id ? 'আপনি: ' : ''}${c.last_message_preview}` : 'কথা শুরু করুন'}
                        </p>
                        {count > 0 && (
                          <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-amber-400 px-1.5 text-xs font-bold text-teal-950">
                            {count}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
