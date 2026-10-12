import RequireAuth from '@/components/auth/RequireAuth'
import OrdersList from '@/components/escrow/OrdersList'

export const metadata = { title: 'আমার অর্ডার' }

export default function OrdersPage() {
  return (
    <RequireAuth>
      <OrdersList />
    </RequireAuth>
  )
}
