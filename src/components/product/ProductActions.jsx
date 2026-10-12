'use client'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/components/auth/AuthProvider'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Icon from '@/components/ui/Icons'
import EscrowDialog from '@/components/escrow/EscrowDialog'
import { startConversation } from '@/lib/services/chat'
import { deleteListing, markListingSold, removeListingImage } from '@/lib/services/listings'
import { friendlyError } from '@/lib/errors'
import { formatPrice, loginHref } from '@/lib/format'

export default function ProductActions({ listing, sellerName }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const [escrowOpen, setEscrowOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [busy, setBusy] = useState(null) // 'chat' | 'sold' | 'delete'

  const isOwner = !!user && listing.seller_id === user.id
  const noSeller = !listing.seller_id
  const unavailable = listing.status !== 'active'

  const requireLogin = () => router.push(loginHref(pathname))

  async function chat() {
    if (!user) return requireLogin()
    setBusy('chat')
    try {
      const id = await startConversation(listing.id)
      router.push(`/messages/${id}`)
    } catch (err) {
      toast.error(friendlyError(err))
      setBusy(null)
    }
  }

  async function sold() {
    setBusy('sold')
    try {
      await markListingSold(listing.id)
      toast.success('প্রোডাক্টটি বিক্রি হয়েছে হিসেবে চিহ্নিত করা হয়েছে।')
      router.refresh()
    } catch (err) {
      toast.error(friendlyError(err))
    } finally {
      setBusy(null)
    }
  }

  async function remove() {
    setBusy('delete')
    try {
      await deleteListing(listing.id)
      const path = listing.image_url?.split('/product-images/')[1]
      if (path?.startsWith(`${user.id}/`)) removeListingImage(path) // best effort cleanup
      toast.success('প্রোডাক্ট ডিলিট করা হয়েছে।')
      router.replace('/')
    } catch (err) {
      toast.error(friendlyError(err))
      setBusy(null)
      setConfirmDelete(false)
    }
  }

  // ---------- Seller's own listing ----------
  if (isOwner) {
    return (
      <section className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-teal-900/[0.07]">
        <p className="font-semibold text-teal-950">এটি আপনার প্রোডাক্ট</p>
        <p className="mt-0.5 text-sm text-slate-500">ক্রেতাদের মেসেজ পাবেন মেসেজ ট্যাবে।</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {listing.status === 'active' && (
            <Button variant="soft" onClick={sold} loading={busy === 'sold'}>
              <Icon name="check" className="h-4 w-4" /> বিক্রি হয়ে গেছে
            </Button>
          )}
          {listing.status !== 'reserved' && (
            <Button variant="outline" className="text-rose-700" onClick={() => setConfirmDelete(true)}>
              <Icon name="trash" className="h-4 w-4" /> ডিলিট করুন
            </Button>
          )}
          {listing.status === 'reserved' && <p className="text-sm text-amber-800">চালু এসক্রো অর্ডার আছে। অর্ডার পেজ থেকে এগিয়ে যান।</p>}
        </div>

        <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)} title="প্রোডাক্টটি ডিলিট করবেন?" width="max-w-md">
          <p className="text-slate-600">এই কাজ আর ফেরানো যাবে না।</p>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="soft" onClick={() => setConfirmDelete(false)}>
              না, থাক
            </Button>
            <Button variant="danger" loading={busy === 'delete'} onClick={remove}>
              হ্যাঁ, ডিলিট করুন
            </Button>
          </div>
        </Dialog>
      </section>
    )
  }

  // ---------- Buyer view (sticky bar on phones, inline on desktop) ----------
  const disabledAll = loading || noSeller
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-teal-900/10 bg-white/80 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:static md:z-auto md:mt-6 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        {noSeller && <p className="mb-2 text-sm text-slate-500">এই প্রোডাক্টের বিক্রেতার তথ্য নেই, তাই চ্যাট বা কেনা যাবে না।</p>}
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <p className="font-display text-xl font-extrabold text-teal-900 md:hidden">{formatPrice(listing.price)}</p>
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            disabled={disabledAll || unavailable}
            onClick={() => (user ? setEscrowOpen(true) : requireLogin())}
          >
            <Icon name="shield" className="h-5 w-5" />
            {unavailable ? (listing.status === 'sold' ? 'বিক্রি হয়ে গেছে' : 'রিজার্ভড') : 'Buy via Escrow'}
          </Button>
          <Button variant="outline" size="lg" className="flex-1" disabled={disabledAll} loading={busy === 'chat'} onClick={chat}>
            <Icon name="chat" className="h-5 w-5" /> Chat with Seller
          </Button>
        </div>
      </div>

      <EscrowDialog open={escrowOpen} onClose={() => setEscrowOpen(false)} listing={listing} sellerName={sellerName} />
    </>
  )
}
