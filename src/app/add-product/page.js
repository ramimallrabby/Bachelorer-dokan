import RequireAuth from '@/components/auth/RequireAuth'
import ListingForm from '@/components/listings/ListingForm'

export const metadata = { title: 'প্রোডাক্ট যোগ করুন' }

export default function AddProductPage() {
  return (
    <RequireAuth>
      <ListingForm />
    </RequireAuth>
  )
}
