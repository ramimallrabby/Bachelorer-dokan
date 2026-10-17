'use client'
import { useCallback, useEffect, useState } from 'react'
import { fetchWallet, subscribeWallet } from '@/lib/services/wallet'

export default function useWallet(userId) {
  const [balance, setBalance] = useState(null)
  const load = useCallback(() => {
    if (userId) fetchWallet(userId).then(setBalance).catch(() => setBalance(0))
  }, [userId])
  useEffect(() => {
    if (!userId) return
    load()
    return subscribeWallet(userId, load)
  }, [userId, load])
  return { balance, reload: load }
}
