'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import useUnreadCount from '@/hooks/useUnreadCount'
import Icon from '@/components/ui/Icons'
import Button from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Media'
import { loginHref } from '@/lib/format'

function IconLink({ href, label, icon, badge, active }) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-teal-900/[0.07] ${
        active ? 'bg-teal-900/[0.08] text-teal-900' : 'text-teal-900/70'
      }`}
    >
      <Icon name={icon} />
      {badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-amber-400 px-1 text-[11px] font-bold leading-none text-teal-950 ring-2 ring-white">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </Link>
  )
}

function AccountMenu({ user, profile, signOut }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const name = profile?.full_name || user.email?.split('@')[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const item =
    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] text-slate-700 transition hover:bg-teal-900/[0.06]'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2 transition hover:bg-teal-900/[0.07]"
      >
        <Avatar name={name} url={profile?.avatar_url} className="h-8 w-8 text-xs" />
        <Icon name="down" className={`h-4 w-4 text-teal-900/60 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+10px)] w-64 rounded-2xl border border-teal-900/10 bg-white/95 p-2 shadow-[0_24px_50px_-20px_rgba(10,61,56,0.45)] backdrop-blur-xl"
        >
          <div className="px-3 pb-2 pt-1.5">
            <p className="truncate font-semibold text-teal-950">{name}</p>
            <p className="truncate text-[13px] text-slate-500">{user.email}</p>
          </div>
          <div className="my-1 h-px bg-teal-900/10" />
          <Link role="menuitem" href="/messages" onClick={() => setOpen(false)} className={item}>
            <Icon name="chat" className="h-[18px] w-[18px] text-teal-800" /> মেসেজ
          </Link>
          <Link role="menuitem" href="/orders" onClick={() => setOpen(false)} className={item}>
            <Icon name="receipt" className="h-[18px] w-[18px] text-teal-800" /> আমার অর্ডার
          </Link>
          <button
            role="menuitem"
            type="button"
            onClick={() => {
              setOpen(false)
              signOut()
            }}
            className={`${item} text-rose-700 hover:bg-rose-50`}
          >
            <Icon name="logout" className="h-[18px] w-[18px]" /> লগআউট
          </button>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { user, profile, loading, signOut } = useAuth()
  const unread = useUnreadCount(user?.id)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-teal-900/10 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Bachelorer Dokan হোম">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-900 text-amber-300 shadow-[0_8px_18px_-8px_rgba(10,61,56,0.9)] transition group-hover:rotate-[-6deg]">
            <Icon name="bag" className="h-5 w-5" />
          </span>
          <span className="font-display text-[19px] font-extrabold tracking-tight text-teal-950">
            Bachelorer Dokan
          </span>
        </Link>

        <nav className="flex items-center gap-1.5 sm:gap-2" aria-label="প্রধান মেনু">
          <Button href={user ? '/add-product' : loginHref('/add-product')} size="sm" variant="dark" className="mr-1">
            <Icon name="plus" className="h-4 w-4" /> Sell Item
          </Button>

          {loading ? (
            <span className="skeleton h-9 w-16 rounded-full" aria-hidden="true" />
          ) : user ? (
            <>
              <IconLink href="/messages" label="মেসেজ" icon="chat" badge={unread} active={pathname.startsWith('/messages')} />
              <IconLink href="/orders" label="আমার অর্ডার" icon="receipt" active={pathname.startsWith('/orders')} />
              <AccountMenu user={user} profile={profile} signOut={signOut} />
            </>
          ) : (
            <Button href={loginHref(pathname)} size="sm" variant="outline">
              লগইন
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
