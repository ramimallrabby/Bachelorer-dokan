'use client'
import { useState } from 'react'
import Icon from '@/components/ui/Icons'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { Chip, Select } from '@/components/ui/Form'
import { EmptyState, ErrorState } from '@/components/ui/Feedback'
import ListingCard, { ListingCardSkeleton } from '@/components/listings/ListingCard'
import FilterPanel from './FilterPanel'
import Pagination from './Pagination'
import useListingFilters from '@/hooks/useListingFilters'
import useListings from '@/hooks/useListings'
import { CATEGORIES, PAGE_SIZE, SORTS } from '@/lib/constants'

export default function Marketplace() {
  const { filters, update, clear, activeCount } = useListingFilters()
  const { items, total, loading, error, retry } = useListings(filters, () => update({ page: 1 }))
  const [sheetOpen, setSheetOpen] = useState(false)

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const isFiltered = activeCount > 0 || filters.q !== '' || filters.category !== ''
  const firstLoad = loading && items.length === 0

  const goToPage = (p) => {
    update({ page: p })
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="results" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-teal-950 sm:text-[34px]">
            {isFiltered ? 'খোঁজার ফলাফল' : 'সদ্য যোগ করা হয়েছে'}
          </h2>
          <p className="mt-1.5 text-slate-500" aria-live="polite">
            {firstLoad ? 'লোড হচ্ছে...' : isFiltered ? `${total.toLocaleString('bn-BD')}টি প্রোডাক্ট পাওয়া গেছে` : 'আপনার ক্যাম্পাসের আশেপাশের সেরা ডিলগুলো'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="md" className="lg:hidden" onClick={() => setSheetOpen(true)}>
            <Icon name="filter" className="h-[18px] w-[18px]" />
            ফিল্টার
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-900 px-1.5 text-xs text-white">{activeCount}</span>
            )}
          </Button>
          <Select aria-label="সাজান" value={filters.sort} onChange={(e) => update({ sort: e.target.value })} className="h-11 w-auto pr-8 font-semibold">
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="group" aria-label="ক্যাটাগরি">
        <Chip active={filters.category === ''} onClick={() => update({ category: '' })}>
          সব
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c.value} active={filters.category === c.value} onClick={() => update({ category: filters.category === c.value ? '' : c.value })}>
            {c.label}
          </Chip>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-[0_14px_30px_-18px_rgba(10,61,56,0.3)] ring-1 ring-teal-900/[0.06]">
            <FilterPanel filters={filters} update={update} clear={clear} activeCount={activeCount} />
          </div>
        </aside>

        <div>
          {error && items.length === 0 ? (
            <ErrorState message={error} onRetry={retry} />
          ) : firstLoad ? (
            <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <EmptyState
              icon="search"
              title={isFiltered ? 'কিছু পাওয়া যায়নি' : 'এখনো কোনো প্রোডাক্ট নেই'}
              action={
                isFiltered ? (
                  <Button variant="dark" onClick={() => update({ q: '', category: '', condition: '', location: '', minPrice: '', maxPrice: '' })}>
                    ফিল্টার ও খোঁজা মুছুন
                  </Button>
                ) : (
                  <Button href="/add-product" variant="dark">
                    <Icon name="plus" className="h-4 w-4" /> প্রথম প্রোডাক্টটি যোগ করুন
                  </Button>
                )
              }
            >
              {isFiltered ? 'অন্য শব্দে খুঁজুন, অথবা দাম ও এলাকার সীমা বাড়িয়ে দেখুন।' : 'আপনার অব্যবহৃত বই বা জিনিস বিক্রি করে শুরু করুন।'}
            </EmptyState>
          ) : (
            <>
              {/* While a new page loads we keep the old cards visible but dimmed: no layout jump. */}
              <div
                aria-busy={loading}
                className={`grid grid-cols-2 gap-3.5 transition-opacity duration-200 sm:gap-5 lg:grid-cols-3 ${loading ? 'opacity-55' : ''}`}
              >
                {items.map((item) => (
                  <ListingCard key={item.id} item={item} />
                ))}
              </div>
              <Pagination page={filters.page} pages={pages} onChange={goToPage} disabled={loading} />
            </>
          )}
        </div>
      </div>

      <Dialog open={sheetOpen} onClose={() => setSheetOpen(false)} title="ফিল্টার" variant="sheet">
        <FilterPanel filters={filters} update={update} clear={clear} activeCount={activeCount} />
        <Button variant="dark" size="lg" className="mt-8 w-full" onClick={() => setSheetOpen(false)}>
          {total > 0 ? `${total.toLocaleString('bn-BD')}টি ফলাফল দেখুন` : 'ঠিক আছে'}
        </Button>
      </Dialog>
    </section>
  )
}
