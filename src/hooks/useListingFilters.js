'use client'
import { useCallback, useMemo, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const DEFAULT_FILTERS = {
  q: '',
  category: '',
  condition: '',
  location: '',
  minPrice: '',
  maxPrice: '',
  sort: 'newest',
  page: 1,
}

// The URL is the single source of truth: shareable links, working back button, no extra state.
export default function useListingFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()

  const filters = useMemo(() => {
    const f = { ...DEFAULT_FILTERS }
    for (const key of Object.keys(DEFAULT_FILTERS)) {
      const v = sp.get(key)
      if (v !== null) f[key] = key === 'page' ? Math.max(1, parseInt(v, 10) || 1) : v
    }
    return f
  }, [sp])

  const latest = useRef(filters)
  latest.current = filters

  const update = useCallback(
    (patch) => {
      const next = { ...latest.current, ...patch }
      if (!('page' in patch)) next.page = 1 // any filter change goes back to page 1
      const params = new URLSearchParams()
      for (const [k, v] of Object.entries(next)) {
        if (v !== '' && v != null && v !== DEFAULT_FILTERS[k]) params.set(k, String(v))
      }
      const qs = params.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [router, pathname]
  )

  const clear = useCallback(() => update({ ...DEFAULT_FILTERS, q: latest.current.q }), [update])

  // Filters other than the search text and page (drives the badge on the mobile Filters button).
  const activeCount = ['category', 'condition', 'location', 'minPrice', 'maxPrice'].filter((k) => filters[k] !== '').length

  return { filters, update, clear, activeCount }
}
