'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import RequireAuth from '@/components/auth/RequireAuth'

const TABS = [
  { href: '/profile', label: 'প্রোফাইল সেটিংস' },
  { href: '/profile/listings', label: 'আমার প্রোডাক্ট' },
]

export default function ProfileLayout({ children }) {
  const pathname = usePathname()
  return (
    <RequireAuth>
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <nav className="flex gap-2" aria-label="প্রোফাইল মেনু">
          {TABS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                pathname === t.href ? 'bg-teal-900 text-white shadow-[0_8px_20px_-10px_rgba(10,61,56,0.9)]' : 'bg-white text-teal-900 ring-1 ring-inset ring-teal-900/10 hover:bg-teal-50'
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </RequireAuth>
  )
}
