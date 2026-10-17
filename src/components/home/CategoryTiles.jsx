import Link from 'next/link'
import Icon from '@/components/ui/Icons'
import { CATEGORIES } from '@/lib/constants'

const ICON = { books: 'book', notes: 'note', electronics: 'laptop', stationery: 'pencil', hostel: 'bed', clothing: 'shirt', others: 'grid' }

export default function CategoryTiles() {
  return (
    <section className="mx-auto -mt-8 max-w-7xl px-4 sm:-mt-12 sm:px-6 lg:px-8" aria-label="ক্যাটাগরি">
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-7">
        {CATEGORIES.map((c) => (
          <Link
            key={c.value}
            href={`/?category=${c.value}#results`}
            className="group flex min-w-[112px] flex-col items-center gap-3 rounded-3xl bg-white px-4 py-5 text-center shadow-[0_20px_40px_-26px_rgba(10,61,56,0.55)] ring-1 ring-teal-900/[0.06] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(10,61,56,0.6)] sm:min-w-0"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 text-teal-800 transition group-hover:from-teal-700 group-hover:to-teal-900 group-hover:text-amber-300">
              <Icon name={ICON[c.value] || 'grid'} className="h-6 w-6" />
            </span>
            <span className="text-[14px] font-semibold leading-tight text-teal-950">{c.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
