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

  // ক্যাটাগরির নাম এবং ভ্যালু অবজেক্ট আকারে দেওয়া হলো
  const categoryQuickLinks = [
    { name: 'Books', value: 'books' },
    { name: 'Notes', value: 'notes' },
    { name: 'Electronics', value: 'electronics' },
    { name: 'Stationery', value: 'stationery' },
    { name: 'Others', value: 'others' }
  ]

  return (
    <section className="mb-16 sm:mb-20">
      {/* 
        Main Hero Area - 
        আপনার অরিজিনাল aurora, grain, on-dark ক্লাসগুলো এখানে আগের মতোই রাখা হয়েছে 
      */}
      <div className="aurora grain on-dark relative overflow-hidden rounded-b-[36px] sm:rounded-b-[56px]">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-20 pt-14 text-center sm:px-6 sm:pb-28 sm:pt-20 lg:px-8">
          
          <p className="rise mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/85 ring-1 ring-white/20 backdrop-blur" style={{ '--d': '0ms' }}>
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.25)]" /> ক্যাম্পাসের জন্য বানানো নিরাপদ মার্কেটপ্লেস
          </p>
          
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
            className="rise mt-9 flex w-full max-w-2xl items-center gap-1.5 rounded-[24px] border border-white/20 bg-white/10 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_30px_60px_-24px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition focus-within:border-white/45 focus-within:bg-white/[0.16]"
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
      </div>

      {/* Floating Category Buttons - overflow-hidden এর বাইরে এনে উপরে উঠিয়ে দেওয়া হয়েছে */}
      <div className="relative z-10 -mt-6 flex w-full justify-center px-4 sm:-mt-7">
        <div className="flex w-full max-w-4xl gap-3 overflow-x-auto pb-4 pt-2 sm:justify-center sm:overflow-visible sm:pb-2">
          {categoryQuickLinks.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => {
                setQ('') // সার্চ বক্সে লেখা থাকলে মুছে ফেলবে
                update({ category: cat.value, q: '' }) // সঠিক ক্যাটাগরি ফিল্টার হিসেবে পাঠাবে
                document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="rise flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-gray-200/80 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-xl transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              style={{ '--d': `${400 + i * 50}ms` }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}