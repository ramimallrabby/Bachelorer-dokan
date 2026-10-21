import { cache } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import Icon from '@/components/ui/Icons'
import { Avatar } from '@/components/ui/Media'
import ProductActions from '@/components/product/ProductActions'
import ReportButton from '@/components/report/ReportButton'
import ViewCounter from '@/components/product/ViewCounter'
import ImageGallery from '@/components/product/ImageGallery'
import { fetchListingById } from '@/lib/services/listings'
import { CATEGORIES, CONDITIONS, labelOf } from '@/lib/constants'
import { formatDate, formatPrice, timeAgo } from '@/lib/format'

export const dynamic = 'force-dynamic'

const getListing = cache(fetchListingById)

export async function generateMetadata({ params }) {
  const { id } = await params
  const listing = await getListing(id).catch(() => null)
  if (!listing) return { title: 'প্রোডাক্ট পাওয়া যায়নি' }
  const title = `${listing.title} (${formatPrice(listing.price)})`
  const description = (listing.description || '').slice(0, 160)
  const img = listing.image_urls?.[0] || listing.image_url
  return {
    title,
    description,
    openGraph: { title, description, images: img ? [img] : [] },
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params
  let listing = await getListing(id)

  if (!listing) {
    try {
      const cookieStore = await cookies()
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            get(name) {
              return cookieStore.get(name)?.value
            },
          },
        }
      )
      
      const { data } = await supabase
        .from('listings')
        .select('*, seller:profiles(*)')
        .eq('id', id)
        .single()
        
      listing = data
    } catch (error) {}
  }

  if (!listing) notFound()

  const category = labelOf(CATEGORIES, listing.category)
  const condition = labelOf(CONDITIONS, listing.condition)
  const seller = listing.seller
  const sellerName = seller?.full_name || 'অজানা বিক্রেতা'
  
  // একাধিক ছবির অ্যারে তৈরি
  const images = listing.image_urls?.length ? listing.image_urls : (listing.image_url ? [listing.image_url] : [])

  return (
    <main className="mx-auto max-w-6xl px-4 pb-36 pt-6 sm:px-6 md:pb-16 lg:px-8">
      <ViewCounter id={listing.id} />
      <Link href="/" className="inline-flex items-center gap-2 rounded-full py-2 pr-4 text-sm font-semibold text-teal-800 transition hover:text-teal-950">
        <Icon name="back" className="h-4 w-4" /> সব প্রোডাক্ট
      </Link>

      <div className="mt-3 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div className="relative lg:sticky lg:top-24 lg:self-start">
          {/* গ্যালারি কম্পোনেন্ট */}
          <ImageGallery urls={images} title={listing.title} location={listing.location} status={listing.status} />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
            {category && <span className="rounded-full bg-teal-900/[0.07] px-3 py-1 text-sm font-semibold text-teal-900">{category}</span>}
            {condition && <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">{condition}</span>}
          </div>

          <h1 className="font-display mt-4 text-[30px] font-extrabold leading-[1.35] text-teal-950 sm:text-4xl">{listing.title}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <p className="font-display text-4xl font-extrabold text-teal-900">{formatPrice(listing.price)}</p>
            <p className="text-sm text-slate-500">
              {timeAgo(listing.created_at)} যোগ করা হয়েছে
              {listing.views > 0 && ` · ${Number(listing.views).toLocaleString('bn-BD')} বার দেখা হয়েছে`}
            </p>
          </div>

          <section className="mt-7">
            <h2 className="mb-2 text-sm font-bold text-teal-950">বিস্তারিত বিবরণ</h2>
            <p className="whitespace-pre-wrap text-[16px] leading-[1.85] text-slate-600">{listing.description}</p>
          </section>

          <Link
            href={seller?.id ? `/u/${seller.id}` : '#'}
            className="group mt-7 flex items-center gap-3.5 rounded-2xl bg-white p-4 ring-1 ring-teal-900/[0.07] transition hover:ring-teal-900/25"
          >
            <Avatar name={sellerName} url={seller?.avatar_url} className="h-12 w-12 text-base" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-teal-950">{sellerName}</p>
              <p className="truncate text-sm text-slate-500">
                {[seller?.university, seller?.created_at ? `${formatDate(seller.created_at)} থেকে সদস্য` : null].filter(Boolean).join(' · ') || 'বিক্রেতা'}
              </p>
            </div>
            <Icon name="next" className="h-5 w-5 text-teal-800/50 transition group-hover:translate-x-0.5 group-hover:text-teal-800" />
          </Link>

          <section className="mt-4 flex gap-3.5 rounded-2xl bg-[linear-gradient(135deg,rgba(15,118,110,0.1),rgba(251,191,36,0.16))] p-4 ring-1 ring-teal-900/10">
            <Icon name="shield" className="mt-0.5 h-6 w-6 text-teal-800" />
            <div>
              <p className="font-semibold text-teal-950">Escrow দিয়ে নিরাপদ কেনা</p>
              <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                টাকা জমা থাকে আমাদের কাছে। পণ্য হাতে পেয়ে কনফার্ম করলে তবেই বিক্রেতা টাকা পান।
              </p>
            </div>
          </section>

          <ProductActions
            listing={{
              id: listing.id,
              title: listing.title,
              price: listing.price,
              image_url: images[0] || null,
              status: listing.status,
              seller_id: listing.seller_id,
            }}
            sellerName={sellerName}
          />

          <div className="mt-6 flex items-center justify-between border-t border-teal-900/10 pt-4">
            <p className="text-sm text-slate-400">প্রোডাক্ট আইডি: {String(listing.id).slice(0, 8)}</p>
            <ReportButton type="listing" targetId={listing.id} ownerId={listing.seller_id} />
          </div>
        </div>
      </div>
    </main>
  )
}