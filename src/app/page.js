import { Suspense } from 'react'
import Hero from '@/components/home/Hero'
import Marketplace from '@/components/home/Marketplace'
import CategoryTiles from '@/components/home/CategoryTiles'
import HowItWorks from '@/components/home/HowItWorks'
import { PageSpinner } from '@/components/ui/Feedback'

export default function Home() {
  // Hero and Marketplace read the URL (?q=&page=...), which needs a Suspense boundary.
  return (
    <main>
      <Suspense fallback={<div className="aurora min-h-[420px] rounded-b-[56px]" />}>
        <Hero />
      </Suspense>
      <CategoryTiles />
      <Suspense fallback={<PageSpinner />}>
        <Marketplace />
      </Suspense>
      <HowItWorks />
    </main>
  )
}
