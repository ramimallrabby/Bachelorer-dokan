'use client'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { fetchNotifications, markNotificationsRead } from '@/lib/services/notifications'

// Live notifications. `onNew` fires for each notification that arrives while the app is open
// (the navbar uses it for toasts; the admin panel uses it for the alert sound).
export default function useNotifications(userId, onNew) {
  const [items, setItems] = useState([])

  const load = useCallback(() => fetchNotifications().then(setItems).catch(() => {}), [])

  useEffect(() => {
    if (!userId) {
      setItems([])
      return
    }
    load()
    const channel = supabase
      .channel(`notif:${userId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` }, ({ new: n }) => {
        setItems((prev) => [n, ...prev].slice(0, 25))
        onNew?.(n)
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, load])

  const markAllRead = useCallback(async () => {
    setItems((prev) => prev.map((n) => ({ ...n, read_at: n.read_at || new Date().toISOString() })))
    await markNotificationsRead()
  }, [])

  return { items, unread: items.filter((n) => !n.read_at).length, markAllRead, reload: load }
}
