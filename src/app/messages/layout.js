'use client'
import { usePathname } from 'next/navigation'
import RequireAuth from '@/components/auth/RequireAuth'
import ConversationList from '@/components/chat/ConversationList'

// Two panes on desktop (list + thread). On phones only one is visible at a time.
export default function MessagesLayout({ children }) {
  const inThread = usePathname() !== '/messages'
  return (
    <RequireAuth>
      <div className="mx-auto max-w-6xl md:px-4 md:py-6 lg:px-8">
        <div className="grid h-[calc(100dvh-4rem)] overflow-hidden bg-white md:h-[calc(100dvh-7.5rem)] md:grid-cols-[340px_minmax(0,1fr)] md:rounded-[28px] md:shadow-[0_30px_60px_-30px_rgba(10,61,56,0.45)] md:ring-1 md:ring-teal-900/[0.07]">
          <div className={`min-h-0 border-r border-teal-900/10 ${inThread ? 'hidden md:block' : 'block'}`}>
            <ConversationList />
          </div>
          <div className={`min-h-0 ${inThread ? 'block' : 'hidden md:block'}`}>{children}</div>
        </div>
      </div>
    </RequireAuth>
  )
}
