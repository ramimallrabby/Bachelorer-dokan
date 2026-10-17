import { Hind_Siliguri, Noto_Serif_Bengali } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import './dokan.css' // keep AFTER globals.css
import { AuthProvider } from '@/components/auth/AuthProvider'
import { LiveProvider } from '@/components/auth/LiveProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Suspense } from 'react'

const body = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const display = Noto_Serif_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Bachelorer Dokan | স্টুডেন্টদের স্মার্ট কেনাবেচা',
    template: '%s | Bachelorer Dokan',
  },
  description:
    'বই, নোটস থেকে হোস্টেলের দরকারি জিনিস: ক্যাম্পাসের আশেপাশেই কিনুন, বেচুন। টাকা থাকে এসক্রো-তে, পণ্য হাতে পেলে তবেই বিক্রেতা পান।',
}

export const viewport = {
  themeColor: '#0A3D38',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${body.variable} ${display.variable}`}>
      <body className="min-h-screen antialiased">
        <AuthProvider>
          <LiveProvider>
            <Suspense fallback={<div className="h-[68px]" />}>
              <Navbar />
            </Suspense>
            {children}
            <Footer />
          </LiveProvider>
        </AuthProvider>
        <Toaster
          position="top-center"
          closeButton
          toastOptions={{
            classNames: {
              toast: 'font-[family-name:var(--font-body)] !rounded-2xl !shadow-[0_18px_40px_-16px_rgba(10,61,56,0.35)]',
            },
          }}
        />
      </body>
    </html>
  )
}
