'use client'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthProvider'
import { useOnline } from '@/components/auth/LiveProvider'
import Icon from '@/components/ui/Icons'
import { Avatar, SmartImage } from '@/components/ui/Media'
import { EmptyState, ErrorState, Spinner } from '@/components/ui/Feedback'
import { fetchConversation, fetchMessages, markConversationRead, sendMessage } from '@/lib/services/chat'
import { friendlyError } from '@/lib/errors'
import { formatDate, formatPrice, formatTime, isSameDay, timeAgo } from '@/lib/format'

const PAGE = 40

function merge(prev, incoming) {
  const map = new Map(prev.map((m) => [m.id, m]))
  incoming.forEach((m) => map.set(m.id, m))
  return [...map.values()].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
}

function Ticks({ m }) {
  if (m.pending) return <Icon name="clock" className="ml-1 inline h-3 w-3 translate-y-[1px] text-white/60" strokeWidth={2.2} />
  if (m.read_at)
    return <Icon name="doublecheck" className="ml-1 inline h-[15px] w-[15px] translate-y-[2px] text-sky-300" strokeWidth={2.4} aria-label="দেখেছেন" />
  if (m.delivered_at)
    return <Icon name="doublecheck" className="ml-1 inline h-[15px] w-[15px] translate-y-[2px] text-white/60" strokeWidth={2.4} aria-label="পৌঁছেছে" />
  return <Icon name="check" className="ml-1 inline h-[14px] w-[14px] translate-y-[2px] text-white/60" strokeWidth={2.4} aria-label="পাঠানো হয়েছে" />
}

export default function ChatThread({ conversationId }) {
  const { user } = useAuth()
  const [conv, setConv] = useState(undefined)
  const [loadError, setLoadError] = useState(null)
  const [messages, setMessages] = useState([])
  const [pending, setPending] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)

  const scroller = useRef(null)
  const stick = useRef(true)
  const textarea = useRef(null)
  const channelRef = useRef(null)
  const typingTimer = useRef(null)
  const lastTypingSent = useRef(0)

  const other = conv ? (user.id === conv.buyer_id ? conv.seller : conv.buyer) : null
  const otherOnline = useOnline(other?.id)

  const syncLatest = useCallback(async () => {
    const latest = await fetchMessages(conversationId, { limit: PAGE })
    setMessages((prev) => merge(prev, latest))
    return latest
  }, [conversationId])

  useEffect(() => {
    let alive = true
    const timer = setTimeout(() => {
      setConv(undefined)
      setLoadError(null)
      setMessages([])
      setPending([])
      stick.current = true
    }, 0)

    ;(async () => {
      try {
        const [c, latest] = await Promise.all([fetchConversation(conversationId), fetchMessages(conversationId, { limit: PAGE })])
        if (!alive) return
        setConv(c)
        setMessages(latest)
        setHasMore(latest.length === PAGE)
        if (c) markConversationRead(conversationId)
      } catch (err) {
        if (!alive) return
        const message = friendlyError(err)
        setLoadError(message)
        toast.error(message, { id: 'chat-load' })
      }
    })()

    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [conversationId])

  useEffect(() => {
    if (!conv) return
    const markRead = () => document.visibilityState === 'visible' && markConversationRead(conversationId)
    const channel = supabase
      .channel(`thread:${conversationId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` },
        ({ new: m }) => {
          setMessages((prev) => merge(prev, [m]))
          if (m.sender_id !== user.id) {
            setTyping(false)
            markRead()
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` },
        ({ new: m }) => setMessages((prev) => merge(prev, [m]))
      )
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if (payload?.user === user.id) return
        setTyping(true)
        clearTimeout(typingTimer.current)
        typingTimer.current = setTimeout(() => setTyping(false), 3500)
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') syncLatest().catch(() => {})
        if (status === 'CHANNEL_ERROR') toast.error('লাইভ সংযোগে সমস্যা। নতুন মেসেজ দেখতে পেজ রিফ্রেশ করুন।', { id: 'rt-error' })
      })
    channelRef.current = channel

    const onVisible = () => {
      if (document.visibilityState !== 'visible') return
      syncLatest().catch(() => {})
      markConversationRead(conversationId)
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearTimeout(typingTimer.current)
      document.removeEventListener('visibilitychange', onVisible)
      supabase.removeChannel(channel)
      channelRef.current = null
    }
  }, [conv, conversationId, user.id, syncLatest])

  useLayoutEffect(() => {
    const el = scroller.current
    if (el && stick.current) el.scrollTop = el.scrollHeight
  }, [messages, pending, conv, typing])

  const onScroll = () => {
    const el = scroller.current
    stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120
  }

  async function loadEarlier() {
    if (!messages.length) return
    setLoadingMore(true)
    try {
      const el = scroller.current
      const before = el.scrollHeight
      const older = await fetchMessages(conversationId, { before: messages[0].created_at, limit: PAGE })
      setHasMore(older.length === PAGE)
      stick.current = false
      setMessages((prev) => merge(prev, older))
      requestAnimationFrame(() => (el.scrollTop = el.scrollHeight - before))
    } catch (err) {
      toast.error(friendlyError(err))
    } finally {
      setLoadingMore(false)
    }
  }

  async function send() {
    const body = draft.trim()
    if (!body) return
    const tempId = `tmp-${crypto.randomUUID()}`
    setPending((p) => [...p, { id: tempId, body, created_at: new Date().toISOString() }])
    setDraft('')
    if (textarea.current) textarea.current.style.height = 'auto'
    stick.current = true
    try {
      const saved = await sendMessage(conversationId, body)
      setMessages((prev) => merge(prev, [saved]))
    } catch (err) {
      toast.error(friendlyError(err, 'মেসেজ পাঠানো যায়নি। আবার চেষ্টা করুন।'))
      setDraft(body)
    } finally {
      setPending((p) => p.filter((x) => x.id !== tempId))
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      send()
    }
  }

  const onInput = (e) => {
    setDraft(e.target.value)
    const now = Date.now()
    if (channelRef.current && now - lastTypingSent.current > 2000) {
      lastTypingSent.current = now
      channelRef.current.send({ type: 'broadcast', event: 'typing', payload: { user: user.id } })
    }
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`
  }

  if (loadError && conv === undefined) {
    return <div className="p-6"><ErrorState message={loadError} /></div>
  }
  if (conv === undefined) {
    return <div className="flex h-full items-center justify-center text-teal-800"><Spinner className="h-7 w-7" /></div>
  }
  if (conv === null) {
    return (
      <div className="p-6">
        <EmptyState icon="chat" title="কথোপকথনটি পাওয়া যায়নি">
          লিংকটি ভুল হতে পারে, অথবা এটি আপনার কথোপকথন নয়।
        </EmptyState>
      </div>
    )
  }

  const all = [...messages, ...pending.map((p) => ({ ...p, sender_id: user.id, pending: true }))].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex items-center gap-3 border-b border-teal-900/10 px-3 py-3 sm:px-5">
        <Link href="/messages" aria-label="সব মেসেজ" className="flex h-9 w-9 items-center justify-center rounded-full text-teal-900 hover:bg-teal-900/[0.07] md:hidden">
          <Icon name="back" />
        </Link>
        <Link href={`/u/${other?.id}`} className="relative shrink-0" aria-label="প্রোফাইল দেখুন">
          <Avatar name={other?.full_name} url={other?.avatar_url} className="h-10 w-10" />
          {otherOnline && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />}
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-teal-950">{other?.full_name || 'ব্যবহারকারী'}</p>
          <p className="flex items-center gap-1.5 truncate text-[13px]">
            {typing ? (
              <span className="font-semibold text-teal-700">লিখছে…</span>
            ) : otherOnline ? (
              <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> অনলাইন
              </span>
            ) : (
              <span className="text-slate-500">
                {other?.last_seen_at ? `সর্বশেষ ${timeAgo(other.last_seen_at)} দেখা গেছে` : user.id === conv.buyer_id ? 'বিক্রেতা' : 'ক্রেতা'}
              </span>
            )}
          </p>
        </div>
        {conv.listing && (
          <Link
            href={`/product/${conv.listing.id}`}
            className="flex max-w-[48%] items-center gap-2.5 rounded-2xl bg-teal-900/[0.05] p-1.5 pr-3 transition hover:bg-teal-900/[0.09]"
          >
            <SmartImage src={conv.listing.image_url} alt="" className="h-10 w-12 rounded-xl" />
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-[13px] font-semibold text-teal-950">{conv.listing.title}</span>
              <span className="block text-xs font-bold text-teal-800">{formatPrice(conv.listing.price)}</span>
            </span>
          </Link>
        )}
      </header>

      <div ref={scroller} onScroll={onScroll} className="min-h-0 flex-1 overflow-y-auto bg-[#eaf1ef] px-3 py-4 sm:px-6">
        {hasMore && (
          <div className="mb-4 text-center">
            <button
              type="button"
              onClick={loadEarlier}
              disabled={loadingMore}
              className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-teal-800 ring-1 ring-teal-900/10 transition hover:bg-teal-50 disabled:opacity-60"
            >
              {loadingMore ? 'লোড হচ্ছে...' : 'আগের মেসেজ দেখুন'}
            </button>
          </div>
        )}

        {all.length === 0 ? (
          <p className="mt-16 text-center text-slate-500">কথা শুরু করুন। প্রোডাক্টের অবস্থা বা মিটআপের সময় জিজ্ঞেস করতে পারেন।</p>
        ) : (
          <ul className="space-y-1">
            {all.map((m, i) => {
              const mine = m.sender_id === user.id
              const prev = all[i - 1]
              const newDay = !prev || !isSameDay(prev.created_at, m.created_at)
              const startsGroup = !prev || prev.sender_id !== m.sender_id || newDay
              return (
                <li key={m.id}>
                  {newDay && (
                    <div className="my-4 text-center">
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500">{formatDate(m.created_at)}</span>
                    </div>
                  )}
                  <div className={`flex ${mine ? 'justify-end' : 'justify-start'} ${startsGroup ? 'mt-3' : ''}`}>
                    <div
                      className={`bubble-in max-w-[82%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-[15px] leading-relaxed sm:max-w-[70%] ${
                        mine
                          ? 'rounded-br-md bg-teal-900 text-white shadow-[0_8px_18px_-10px_rgba(10,61,56,0.8)]'
                          : 'rounded-bl-md bg-white text-slate-800 ring-1 ring-teal-900/[0.06]'
                      } ${m.pending ? 'opacity-60' : ''}`}
                    >
                      {m.body}
                      <span className={`ml-2 inline-block translate-y-[3px] text-[11px] ${mine ? 'text-white/60' : 'text-slate-400'}`}>
                        {formatTime(m.created_at)}
                      </span>
                      {mine && <Ticks m={m} />}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
        {typing && (
          <div className="bubble-in mt-3 flex" aria-live="polite">
            <span className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 ring-1 ring-teal-900/[0.06]">
              {[0, 150, 300].map((d) => (
                <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-700/60" style={{ animationDelay: `${d}ms` }} />
              ))}
            </span>
          </div>
        )}
      </div>

      <div className="border-t border-teal-900/10 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-end gap-2">
          <textarea
            ref={textarea}
            rows={1}
            value={draft}
            onChange={onInput}
            onKeyDown={onKeyDown}
            maxLength={2000}
            placeholder="মেসেজ লিখুন..."
            aria-label="মেসেজ লিখুন"
            className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-teal-900/15 bg-white px-4 py-2.5 text-[15px] leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/15"
          />
          <button
            type="button"
            onClick={send}
            disabled={!draft.trim()}
            aria-label="পাঠান"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-900 text-white shadow-[0_10px_20px_-10px_rgba(10,61,56,0.9)] transition hover:bg-teal-800 active:scale-95 disabled:opacity-40"
          >
            <Icon name="send" className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </div>
  )
}