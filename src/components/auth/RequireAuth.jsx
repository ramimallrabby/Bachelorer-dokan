'use client'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from './AuthProvider'
import { PageSpinner } from '@/components/ui/Feedback'
import { loginHref } from '@/lib/format'

// UX gate only. Real security is enforced by Row Level Security in Postgres.
export default function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user) router.replace(loginHref(pathname))
  }, [loading, user, router, pathname])

  if (loading || !user) return <PageSpinner label="যাচাই করা হচ্ছে..." />
  return children
}
