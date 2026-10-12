import { Suspense } from 'react'
import AuthForm from '@/components/auth/AuthForm'
import { PageSpinner } from '@/components/ui/Feedback'

export const metadata = { title: 'লগইন' }

export default function LoginPage() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <AuthForm />
    </Suspense>
  )
}
