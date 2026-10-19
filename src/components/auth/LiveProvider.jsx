'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './AuthProvider'
import { markAllDelivered } from '@/lib/services/chat'
import { touchLastSeen } from '@/lib/services/profile'

const LiveContext = createContext({ online: new Set() })

// Runs once for the whole app while someone is signed in:
//  - presence: who is online right now (green dot, "Active now")
//  - delivery receipts: any message addressed to me is marked "delivered" the moment my app is open
//  - last seen: refreshed every minute while the tab is visible
export function LiveProvider({ children }) {
  const { user } = useAuth()
  const [online, setOnline] = useState(() => new Set())
  const userId = user?.id

  useEffect(() => {
    if (!userId) {
      // সিঙ্ক্রোনাস রেন্ডার (ESLint Error) এড়াতে setTimeout ব্যবহার করা হলো
      const timer = setTimeout(() => setOnline(new Set()), 0)
      return () => clearTimeout(timer)
    }

    // --- BUG FIX: PRIVACY LEAK ---
    // গ্লোবাল প্রেজেন্সকে private: true করে সিকিউর করা হয়েছে
    const channel = supabase.channel('presence:dokan', { 
      config: { 
        private: true,
        presence: { key: userId } 
      } 
    })
    
    channel
      .on('presence', { event: 'sync' }, () => setOnline(new Set(Object.keys(channel.presenceState()))))
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') channel.track({ at: Date.now() })
      })

    const deliver = () => document.visibilityState === 'visible' && markAllDelivered().then(() => {}, () => {})
    deliver()
    
    const incoming = supabase
      .channel(`delivery:${userId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, ({ new: m }) => {
        if (m.sender_id !== userId) markAllDelivered().then(() => {}, () => {})
      })
      .subscribe()

    const ping = () => document.visibilityState === 'visible' && touchLastSeen(userId).then(() => {}, () => {})
    ping()
    const timer = setInterval(ping, 60000)
    document.addEventListener('visibilitychange', deliver)

    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', deliver)
      supabase.removeChannel(channel)
      supabase.removeChannel(incoming)
    }
  }, [userId])

  const value = useMemo(() => ({ online }), [online])
  return <LiveContext.Provider value={value}>{children}</LiveContext.Provider>
}

export function useOnline(id) {
  const { online } = useContext(LiveContext)
  return !!id && online.has(id)
}