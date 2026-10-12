'use client'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { friendlyError } from '@/lib/errors'

const AuthContext = createContext({ user: null, profile: null, loading: true, signOut: async () => {} })

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined) // undefined = still checking
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    // Fires once immediately with the stored session, then on every sign-in/out/refresh.
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    // Older supabase-js versions don't emit an initial event, so also read the stored session.
    supabase.auth.getSession().then(({ data: s }) => setSession((prev) => (prev === undefined ? s.session : prev)))
    return () => data.subscription.unsubscribe()
  }, [])

  const userId = session?.user?.id
  useEffect(() => {
    if (!userId) {
      setProfile(null)
      return
    }
    let cancelled = false
    supabase
      .from('profiles')
      .select('id, full_name, avatar_url, university')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => !cancelled && setProfile(data))
    return () => {
      cancelled = true
    }
  }, [userId])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) toast.error(friendlyError(error))
    else toast.success('লগআউট হয়েছে।')
  }, [])

  const value = useMemo(
    () => ({ user: session?.user ?? null, profile, loading: session === undefined, signOut }),
    [session, profile, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
