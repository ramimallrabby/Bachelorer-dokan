'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { fetchConversations, fetchUnreadByConversation } from '@/lib/services/chat'
import { friendlyError } from '@/lib/errors'

// Inbox data + realtime refresh. A new message fires both a `messages` insert and a
// `conversations` update, so refreshes are coalesced into one request.
export default function useConversations(userId) {
  const [state, setState] = useState({ items: [], unread: {}, loading: true, error: null })
  const timer = useRef(null)

  const load = useCallback(async () => {
    try {
      const [items, unread] = await Promise.all([fetchConversations(), fetchUnreadByConversation(userId)])
      setState({ items, unread, loading: false, error: null })
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: friendlyError(err) }))
    }
  }, [userId])

  useEffect(() => {
    load()
    const schedule = () => {
      clearTimeout(timer.current)
      timer.current = setTimeout(load, 250)
    }
    const channel = supabase
      .channel(`inbox:${userId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, schedule)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, schedule)
      .subscribe()
    return () => {
      clearTimeout(timer.current)
      supabase.removeChannel(channel)
    }
  }, [load, userId])

  return { ...state, reload: load }
}
