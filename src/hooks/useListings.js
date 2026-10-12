'use client'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { fetchListings } from '@/lib/services/listings'
import { friendlyError } from '@/lib/errors'

// Fetches one page for the given filters. Cancels the previous request when filters change,
// so a slow response can never overwrite a newer one.
export default function useListings(filters, onOutOfRange) {
  const [state, setState] = useState({ items: [], total: 0, loading: true, error: null })
  const [nonce, setNonce] = useState(0)
  const key = JSON.stringify(filters)

  useEffect(() => {
    const ctrl = new AbortController()
    setState((s) => ({ ...s, loading: true, error: null }))

    fetchListings(filters, ctrl.signal)
      .then((res) => {
        if (ctrl.signal.aborted) return
        if (res.outOfRange) return onOutOfRange?.()
        setState({ items: res.items, total: res.total, loading: false, error: null })
      })
      .catch((err) => {
        if (ctrl.signal.aborted) return
        const message = friendlyError(err)
        if (message) toast.error(message, { id: 'listings-error' })
        setState((s) => ({ ...s, loading: false, error: message || 'unknown' }))
      })

    return () => ctrl.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, nonce])

  const retry = useCallback(() => setNonce((n) => n + 1), [])
  return { ...state, retry }
}
