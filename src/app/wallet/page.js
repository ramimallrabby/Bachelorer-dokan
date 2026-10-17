import RequireAuth from '@/components/auth/RequireAuth'
import WalletPage from '@/components/wallet/WalletPage'

export const metadata = { title: 'ওয়ালেট' }

export default function Wallet() {
  return (
    <RequireAuth>
      <WalletPage />
    </RequireAuth>
  )
}
