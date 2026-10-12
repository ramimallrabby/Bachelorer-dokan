import { Skeleton } from '@/components/ui/Feedback'

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8" aria-busy="true">
      <Skeleton className="mt-3 h-6 w-28" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <Skeleton className="aspect-[4/3] rounded-[32px]" />
        <div className="space-y-4">
          <Skeleton className="h-7 w-32 rounded-full" />
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-6 h-20 w-full rounded-2xl" />
        </div>
      </div>
    </main>
  )
}
