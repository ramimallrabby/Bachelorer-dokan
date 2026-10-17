'use client'
import { useEffect } from 'react'
import { bumpViews } from '@/lib/services/listings'

// Counts one view per browser session per product (not on every refresh).
export default function ViewCounter({ id }) {
  useEffect(() => {
    try {
      const key = `viewed:${id}`
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {}
    bumpViews(id).then(() => {}, () => {})
  }, [id])
  return null
}
