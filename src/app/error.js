'use client'
import { ErrorState } from '@/components/ui/Feedback'

export default function GlobalError({ error, reset }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-24">
      <ErrorState
        title="কিছু একটা ভুল হয়েছে"
        message={error?.digest ? `ত্রুটির কোড: ${error.digest}` : 'পেজটি লোড করা যায়নি। আবার চেষ্টা করুন।'}
        onRetry={reset}
      />
    </main>
  )
}
