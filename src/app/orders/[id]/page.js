import RequireAuth from '@/components/auth/RequireAuth'
import OrderPanel from '@/components/escrow/OrderPanel'

export const metadata = { title: 'অর্ডার' }

export default async function OrderPage({ params }) {
  const { id } = await params
  return (
    <RequireAuth>
      <OrderPanel orderId={id} />
    </RequireAuth>
  )
}
