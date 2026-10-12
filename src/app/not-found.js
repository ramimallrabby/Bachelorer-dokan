import Button from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/Feedback'

export const metadata = { title: 'পেজ পাওয়া যায়নি' }

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24">
      <EmptyState
        icon="search"
        title="পেজটি পাওয়া যায়নি"
        action={
          <Button href="/" variant="dark">
            হোমপেজে ফিরে যান
          </Button>
        }
      >
        লিংকটি ভুল হতে পারে, অথবা প্রোডাক্টটি ডিলিট হয়ে গেছে।
      </EmptyState>
    </main>
  )
}
