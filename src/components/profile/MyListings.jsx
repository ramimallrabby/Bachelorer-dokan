'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useAuth } from '@/components/auth/AuthProvider'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Icon from '@/components/ui/Icons'
import { EmptyState, ErrorState, Skeleton } from '@/components/ui/Feedback'
import { SmartImage } from '@/components/ui/Media'
import { StatusPill } from '@/components/ui/Pill'
import { deleteListing, fetchMyListings, markListingSold, removeListingImage, reopenListing } from '@/lib/services/listings'
import { friendlyError } from '@/lib/errors'
import { formatPrice, timeAgo } from '@/lib/format'

const STATUS = {
  active: { label: 'চালু', tone: 'green' },
  reserved: { label: 'রিজার্ভড (অর্ডার চলছে)', tone: 'amber' },
  sold: { label: 'বিক্রি হয়েছে', tone: 'slate' },
  hidden: { label: 'লুকানো (পর্যালোচনায়)', tone: 'rose' },
}

export default function MyListings() {
  const { user } = useAuth()
  const [items, setItems] = useState(null)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(null)
  const [del, setDel] = useState(null)

  const load = useCallback(() => {
    setError(null)
    fetchMyListings(user.id).then(setItems).catch((e) => setError(friendlyError(e)))
  }, [user.id])
  useEffect(load, [load])

  async function act(id, fn, ok) {
    setBusy(id)
    try {
      await fn()
      toast.success(ok)
      await load()
    } catch (e) {
      toast.error(friendlyError(e))
    } finally {
      setBusy(null)
      setDel(null)
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-20 pt-6 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-teal-950">আমার প্রোডাক্ট</h1>
          <p className="mt-1 text-slate-500">এডিট করুন, বিক্রি হয়েছে চিহ্নিত করুন বা মুছে ফেলুন।</p>
        </div>
        <Button href="/add-product" variant="dark">
          <Icon name="plus" className="h-4 w-4" /> নতুন
        </Button>
      </div>

      <div className="mt-6 space-y-3.5">
        {error ? (
          <ErrorState message={error} onRetry={load} />
        ) : items === null ? (
          [0, 1, 2].map((i) => <Skeleton key={i} className="h-28 rounded-3xl" />)
        ) : items.length === 0 ? (
          <EmptyState icon="tag" title="কোনো প্রোডাক্ট নেই" action={<Button href="/add-product" variant="dark">প্রথম প্রোডাক্ট যোগ করুন</Button>}>
            আপনার অব্যবহৃত জিনিস বিক্রি করে শুরু করুন।
          </EmptyState>
        ) : (
          items.map((l) => {
            const st = STATUS[l.status] ?? STATUS.active
            const canEdit = l.status === 'active' || l.status === 'sold'
            return (
              <article key={l.id} className="flex flex-col gap-4 rounded-3xl bg-white p-3 shadow-[0_14px_30px_-18px_rgba(10,61,56,0.3)] ring-1 ring-teal-900/[0.06] sm:flex-row sm:items-center">
                <Link href={`/product/${l.id}`} className="flex min-w-0 flex-1 items-center gap-4">
                  <SmartImage src={l.image_url} alt="" className="h-24 w-28 shrink-0 rounded-2xl" />
                  <div className="min-w-0">
                    <p className="line-clamp-1 font-semibold text-teal-950">{l.title}</p>
                    <p className="font-display text-lg font-extrabold text-teal-900">{formatPrice(l.price)}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <StatusPill tone={st.tone}>{st.label}</StatusPill>
                      <span className="flex items-center gap-1"><Icon name="eye" className="h-3.5 w-3.5" /> {l.views ?? 0}</span>
                      <span>{timeAgo(l.created_at)}</span>
                    </div>
                  </div>
                </Link>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {canEdit && (
                    <Button href={`/product/${l.id}/edit`} size="sm" variant="outline">
                      <Icon name="edit" className="h-4 w-4" /> এডিট
                    </Button>
                  )}
                  {l.status === 'active' && (
                    <Button size="sm" variant="soft" loading={busy === l.id} onClick={() => act(l.id, () => markListingSold(l.id), 'বিক্রি হয়েছে চিহ্নিত করা হয়েছে।')}>
                      <Icon name="check" className="h-4 w-4" /> বিক্রি হয়েছে
                    </Button>
                  )}
                  {l.status === 'sold' && (
                    <Button size="sm" variant="soft" loading={busy === l.id} onClick={() => act(l.id, () => reopenListing(l.id), 'প্রোডাক্ট আবার চালু হয়েছে।')}>
                      আবার চালু করুন
                    </Button>
                  )}
                  {l.status !== 'reserved' && (
                    <Button size="sm" variant="outline" className="text-rose-700" onClick={() => setDel(l)}>
                      <Icon name="trash" className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </article>
            )
          })
        )}
      </div>

      <Dialog open={!!del} onClose={() => setDel(null)} title="প্রোডাক্টটি ডিলিট করবেন?" width="max-w-md">
        <p className="text-slate-600">“{del?.title}” মুছে যাবে। এই কাজ ফেরানো যাবে না।</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="soft" onClick={() => setDel(null)}>না, থাক</Button>
          <Button
            variant="danger"
            loading={busy === del?.id}
            onClick={() =>
              act(
                del.id,
                async () => {
                  await deleteListing(del.id)
                  const path = del.image_url?.split('/product-images/')[1]
                  if (path?.startsWith(`${user.id}/`)) removeListingImage(path)
                },
                'প্রোডাক্ট ডিলিট করা হয়েছে।'
              )
            }
          >
            হ্যাঁ, ডিলিট করুন
          </Button>
        </div>
      </Dialog>
    </main>
  )
}
