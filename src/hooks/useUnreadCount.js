'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { fetchUnreadCount } from '@/lib/services/chat'

// Live unread-message badge for the navbar. Fails silently if chat isn't set up yet.
export default function useUnreadCount(userId) {
  const [count, setCount] = useState(0)

  useEffect(() => {
   if (!userId) {
      setTimeout(() => setCount(0), 0)
      return
    }
    let alive = true
    let timeoutId = null

    // অরিজিনাল ফেচ ফাংশন
    const fetchCount = () => {
      fetchUnreadCount(userId)
        .then((n) => alive && setCount(n))
        .catch(() => {})
    }

    // Debounce লজিক: একসাথে অনেক রিকোয়েস্ট আসলে শুধুমাত্র শেষেরটি রান করবে
    const debouncedRefresh = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(fetchCount, 250)
    }

    // প্রাথমিক লোড
    fetchCount()

    // RLS means we only ever receive events for conversations we belong to.
    const channel = supabase
      .channel(`unread:${userId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, debouncedRefresh)
      .subscribe()

    return () => {
      alive = false
      if (timeoutId) clearTimeout(timeoutId)
      supabase.removeChannel(channel)
    }
  }, [userId])

  return count
}