'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useAuth } from '@/components/auth/AuthProvider'
import useNotifications from '@/hooks/useNotifications'
import Icon from '@/components/ui/Icons'
import { timeAgo } from '@/lib/format'

const KIND_ICON = {
  report: 'flag', dispute: 'alert', order: 'receipt', wallet: 'wallet', message: 'chat',
  deposit: 'wallet', withdrawal: 'wallet', moderation: 'shield', system: 'sparkle',
}
const URGENT = new Set(['report', 'dispute', 'deposit', 'withdrawal'])

// A short two-tone chime for admins when something needs attention. No audio file needed.
function chime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    ;[660, 880].forEach((f, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.frequency.value = f
      o.connect(g)
      g.connect(ctx.destination)
      const t = ctx.currentTime + i * 0.16
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28)
      o.start(t)
      o.stop(t + 0.3)
    })
  } catch {}
}

export default function NotificationBell() {
  const { user, isAdmin } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const onNew = useCallback(
    (n) => {
      // Messages already have their own badge; everything else gets a toast.
      if (n.kind === 'message') return
      const urgent = isAdmin && URGENT.has(n.kind)
      if (urgent) chime()
      const show = urgent ? toast.error : toast
      show(n.title, { description: n.body, duration: urgent ? 12000 : 5000, action: n.link ? { label: 'দেখুন', onClick: () => (window.location.href = n.link) } : undefined })
    },
    [isAdmin]
  )
  const { items, unread, markAllRead } = useNotifications(user?.id, onNew)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`নোটিফিকেশন${unread ? `, ${unread}টি নতুন` : ''}`}
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-teal-900/70 transition hover:bg-teal-900/[0.07]"
      >
        <Icon name="bell" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-bold leading-none text-white ring-2 ring-white">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-3 top-[68px] z-50 overflow-hidden rounded-3xl border border-teal-900/10 bg-white shadow-[0_30px_60px_-24px_rgba(10,61,56,0.5)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-[calc(100%+10px)] sm:w-[380px]">
          <div className="flex items-center justify-between border-b border-teal-900/10 px-5 py-3.5">
            <p className="font-display text-lg font-bold text-teal-950">নোটিফিকেশন</p>
            {unread > 0 && (
              <button type="button" onClick={markAllRead} className="text-sm font-semibold text-teal-700 hover:text-teal-900">
                সব পড়া হয়েছে
              </button>
            )}
          </div>
          <ul className="max-h-[60vh] overflow-y-auto">
            {items.length === 0 ? (
              <li className="px-5 py-12 text-center text-sm text-slate-500">এখনো কোনো নোটিফিকেশন নেই</li>
            ) : (
              items.map((n) => {
                const inner = (
                  <div className={`flex gap-3 px-5 py-3.5 transition hover:bg-teal-900/[0.04] ${n.read_at ? '' : 'bg-teal-50/70'}`}>
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        URGENT.has(n.kind) ? 'bg-rose-100 text-rose-700' : 'bg-teal-900/[0.07] text-teal-800'
                      }`}
                    >
                      <Icon name={KIND_ICON[n.kind] || 'bell'} className="h-[18px] w-[18px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[14.5px] leading-snug ${n.read_at ? 'text-slate-700' : 'font-semibold text-teal-950'}`}>{n.title}</p>
                      {n.body && <p className="mt-0.5 line-clamp-2 text-[13px] text-slate-500">{n.body}</p>}
                      <p className="mt-1 text-xs text-slate-400">{timeAgo(n.created_at)}</p>
                    </div>
                    {!n.read_at && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-600" />}
                  </div>
                )
                return (
                  <li key={n.id} className="border-b border-teal-900/[0.05] last:border-0">
                    {n.link ? (
                      <Link href={n.link} onClick={() => setOpen(false)}>
                        {inner}
                      </Link>
                    ) : (
                      inner
                    )}
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
