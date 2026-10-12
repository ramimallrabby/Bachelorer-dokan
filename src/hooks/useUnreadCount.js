'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { fetchUnreadCount } from '@/lib/services/chat'

// Live unread-message badge for the navbar. Fails silently if chat isn't set up yet.
export default function useUnreadCount(userId) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!userId) {
      setCount(0)
      return
    }
    let alive = true
    const refresh = () => fetchUnreadCount(userId).then((n) => alive && setCount(n)).catch(() => {})
    refresh()

    // RLS means we only ever receive events for conversations we belong to.
    const channel = supabase
      .channel(`unread:${userId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, refresh)
      .subscribe()

    return () => {
      alive = false
      supabase.removeChannel(channel)
    }
  }, [userId])

  return count
}
