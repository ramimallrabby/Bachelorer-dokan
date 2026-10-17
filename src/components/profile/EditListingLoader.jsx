'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import RequireAuth from '@/components/auth/RequireAuth'
import ListingForm from '@/components/listings/ListingForm'
import Button from '@/components/ui/Button'
import { EmptyState, PageSpinner } from '@/components/ui/Feedback'
import { fetchListingById } from '@/lib/services/listings'

function Inner({ id }) {
  const { user } = useAuth()
  const [listing, setListing] = useState(undefined)
  useEffect(() => {
    fetchListingById(id).then(setListing).catch(() => setListing(null))
  }, [id])

  if (listing === undefined) return <PageSpinner />
  const blocked = !listing || listing.seller_id !== user.id || ['reserved', 'hidden'].includes(listing.status)
  if (blocked)
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <EmptyState icon="lock" title="এডিট করা যাচ্ছে না" action={<Button href="/profile/listings" variant="dark">আমার প্রোডাক্ট</Button>}>
          প্রোডাক্টটি আপনার নয়, অথবা চালু এসক্রো অর্ডার বা মডারেশনের কারণে এখন এডিট বন্ধ আছে।
        </EmptyState>
      </div>
    )
  return <ListingForm listing={listing} />
}

export default function EditListingLoader({ id }) {
  return (
    <RequireAuth>
      <Inner id={id} />
    </RequireAuth>
  )
}
