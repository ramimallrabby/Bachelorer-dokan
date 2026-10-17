import EditListingLoader from '@/components/profile/EditListingLoader'

export const metadata = { title: 'প্রোডাক্ট এডিট' }

export default async function EditPage({ params }) {
  const { id } = await params
  return <EditListingLoader id={id} />
}
