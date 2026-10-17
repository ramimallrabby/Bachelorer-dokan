import { notFound } from 'next/navigation'
import { cache } from 'react'
import Icon from '@/components/ui/Icons'
import { Avatar } from '@/components/ui/Media'
import ListingCard from '@/components/listings/ListingCard'
import ReportButton from '@/components/report/ReportButton'
import OwnerActions from '@/components/profile/OwnerActions'
import { fetchProfile, fetchSellerStats } from '@/lib/services/profile'
import { fetchListingsBySeller } from '@/lib/services/listings'
import { formatDate } from '@/lib/format'

export const dynamic = 'force-dynamic'
const getProfile = cache(fetchProfile)

export async function generateMetadata({ params }) {
  const { id } = await params
  const p = await getProfile(id).catch(() => null)
  return { title: p ? `${p.full_name || 'ব্যবহারকারী'} এর প্রোফাইল` : 'প্রোফাইল পাওয়া যায়নি' }
}

export default async function PublicProfile({ params }) {
  const { id } = await params
  const profile = await getProfile(id)
  
  if (!profile) notFound()
  
  const [items, stats] = await Promise.all([fetchListingsBySeller(id), fetchSellerStats(id)])
  const name = profile.full_name || 'ব্যবহারকারী'
  const meta = [profile.department, profile.university, profile.city].filter(Boolean)

  return (
    <main className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[32px] bg-white shadow-[0_14px_30px_-18px_rgba(10,61,56,0.3)] ring-1 ring-teal-900/[0.06]">
        {/* Banner Section */}
        <div className="relative h-36 sm:h-52 z-0">
          {profile.cover_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.cover_url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="aurora grain on-dark h-full w-full" />
          )}
        </div>
        
        {/* Profile Info Section */}
        <div className="relative z-10 px-6 pb-7 sm:px-10">
          {/* Added 'relative z-20' here to keep the avatar above the banner */}
          <div className="relative z-20 -mt-14 flex flex-wrap items-end justify-between gap-4">
            <Avatar name={name} url={profile.avatar_url} className="h-28 w-28 rounded-full text-3xl ring-4 ring-white shadow-md" />
            <div className="mb-1 flex items-center gap-4">
              <OwnerActions profileId={id} />
              <ReportButton type="user" targetId={id} ownerId={id} label="রিপোর্ট" />
            </div>
          </div>
          
          <h1 className="font-display mt-4 text-3xl font-extrabold text-teal-950">{name}</h1>
          {meta.length > 0 && <p className="mt-1 text-slate-500">{meta.join(' · ')}</p>}
          {profile.bio && <p className="mt-4 max-w-2xl whitespace-pre-wrap leading-relaxed text-slate-600">{profile.bio}</p>}
          
          <dl className="mt-6 grid max-w-md grid-cols-3 gap-3">
            {[
              ['সফল বিক্রি', stats.sold],
              ['চালু প্রোডাক্ট', stats.active],
              ['সদস্য', formatDate(profile.created_at).split(' ').slice(-2).join(' ')],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-teal-900/[0.05] px-4 py-3">
                <dd className="font-display text-xl font-extrabold text-teal-950">{typeof v === 'number' ? v.toLocaleString('bn-BD') : v}</dd>
                <dt className="text-xs text-slate-500">{k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <h2 className="font-display mb-5 mt-10 text-2xl font-extrabold text-teal-950">{name} এর প্রোডাক্ট</h2>
      
      {items.length === 0 ? (
        <p className="flex items-center gap-2 rounded-3xl border border-dashed border-teal-900/15 bg-white/60 px-6 py-12 text-slate-500">
          <Icon name="tag" className="h-5 w-5" /> এখনো কোনো প্রোডাক্ট নেই।
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((i) => (
            <ListingCard key={i.id} item={i} />
          ))}
        </div>
      )}
    </main>
  )
}