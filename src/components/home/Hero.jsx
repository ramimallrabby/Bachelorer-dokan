'use client'
import Icon from '@/components/ui/Icons'
import Button from '@/components/ui/Button'
import useListingFilters from '@/hooks/useListingFilters'
import useSyncedInput from '@/hooks/useSyncedInput'

export default function Hero() {
  const { filters, update } = useListingFilters()
  const [q, setQ, flush] = useSyncedInput(filters.q, (v) => update({ q: v }))

  const onSubmit = (e) => {
    e.preventDefault()
    flush(q.trim())
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="aurora grain on-dark relative overflow-hidden rounded-b-[36px] sm:rounded-b-[56px]">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
        <h1
          className="rise font-display max-w-3xl text-[38px] font-extrabold leading-[1.3] text-white sm:text-5xl lg:text-[60px]"
          style={{ '--d': '0ms' }}
        >
          স্টুডেন্টদের স্মার্ট কেনাবেচা
        </h1>
        <p className="rise mt-5 max-w-xl text-[17px] leading-relaxed text-white/75 sm:text-lg" style={{ '--d': '120ms' }}>
          বই, নোটস থেকে হোস্টেলের দরকারি জিনিস: ক্যাম্পাসের আশেপাশেই কিনুন, বেচুন। টাকা থাকে এসক্রো-তে, পণ্য হাতে পেলে তবেই বিক্রেতা পান।
        </p>

        <form
          role="search"
          onSubmit={onSubmit}
          className="rise mt-9 flex max-w-2xl items-center gap-1.5 rounded-[24px] border border-white/20 bg-white/10 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_30px_60px_-24px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition focus-within:border-white/45 focus-within:bg-white/[0.16]"
          style={{ '--d': '240ms' }}
        >
          <Icon name="search" className="ml-3 h-5 w-5 text-white/70" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="কী খুঁজছেন? (যেমন: Engineering Drawing Tools)"
            aria-label="প্রোডাক্ট খুঁজুন"
            className="h-12 min-w-0 flex-1 bg-transparent px-2 text-base text-white outline-none placeholder:text-white/55 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {q && (
            <button
              type="button"
              onClick={() => {
                setQ('')
                flush('')
              }}
              aria-label="খোঁজা মুছুন"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white"
            >
              <Icon name="x" className="h-[18px] w-[18px]" />
            </button>
          )}
          <Button type="submit" variant="primary" size="md" className="px-6">
            Search
          </Button>
        </form>

        <p className="rise mt-5 flex items-center gap-2 text-sm text-white/65" style={{ '--d': '360ms' }}>
          <Icon name="shield" className="h-[18px] w-[18px] text-amber-300" />
          Escrow সুরক্ষিত: আপনি কনফার্ম না করা পর্যন্ত টাকা বিক্রেতার কাছে যায় না
        </p>
      </div>
    </section>
  )
}
