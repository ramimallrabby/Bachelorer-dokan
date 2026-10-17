import Link from 'next/link'
import Icon from '@/components/ui/Icons'
import { SmartImage } from '@/components/ui/Media'
import { Skeleton } from '@/components/ui/Feedback'
import { CATEGORIES, CONDITIONS, labelOf } from '@/lib/constants'
import { formatPrice, timeAgo } from '@/lib/format'

export default function ListingCard({ item }) {
  const reserved = item.status === 'reserved'
  const condition = labelOf(CONDITIONS, item.condition)
  const category = labelOf(CATEGORIES, item.category)

  return (
    <Link
      href={`/product/${item.id}`}
      className="group flex flex-col rounded-[26px] bg-white p-2 shadow-[0_1px_0_rgba(10,61,56,0.04),0_14px_30px_-18px_rgba(10,61,56,0.3)] ring-1 ring-teal-900/[0.06] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_46px_-22px_rgba(10,61,56,0.45)] active:translate-y-0"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-teal-900/[0.05]">
        <SmartImage
          src={item.image_url}
          alt={item.title}
          className="h-full w-full transition duration-700 ease-out group-hover:scale-[1.05]"
        />
        {item.location && (
          <span className="absolute left-2.5 top-2.5 flex max-w-[75%] items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold text-teal-950 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.4)] ring-1 ring-white/60 backdrop-blur-md">
            <Icon name="pin" className="h-3.5 w-3.5 text-teal-700" />
            <span className="truncate">{item.location}</span>
          </span>
        )}
        {condition && (
          <span className="absolute bottom-2.5 left-2.5 rounded-full bg-teal-950/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
            {condition}
          </span>
        )}
        {item.status === 'sold' && (
          <div className="absolute inset-0 flex items-center justify-center bg-teal-950/50 backdrop-blur-[2px]">
            <span className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-bold text-teal-950">বিক্রি হয়ে গেছে</span>
          </div>
        )}
        {reserved && (
          <div className="absolute inset-0 flex items-center justify-center bg-teal-950/45 backdrop-blur-[2px]">
            <span className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-bold text-teal-950">রিজার্ভড</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-3">
        <h3 className="line-clamp-1 text-[15px] font-semibold text-teal-950 sm:text-[17px]">{item.title}</h3>
        <p className="mt-0.5 h-5 text-[13px] text-slate-500">{category}</p>
        <div className="mt-2 flex items-end justify-between gap-2">
          <span className="font-display text-xl font-extrabold text-teal-900 sm:text-[22px]">{formatPrice(item.price)}</span>
          <span className="pb-1 text-xs text-slate-400">{timeAgo(item.created_at)}</span>
        </div>
      </div>
    </Link>
  )
}

export function ListingCardSkeleton() {
  return (
    <div className="rounded-[26px] bg-white p-2 ring-1 ring-teal-900/[0.06]" aria-hidden="true">
      <Skeleton className="aspect-[4/3] rounded-[20px]" />
      <div className="space-y-2.5 px-2.5 pb-2.5 pt-3.5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <div className="flex justify-between pt-1.5">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  )
}
