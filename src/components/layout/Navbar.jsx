'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import useUnreadCount from '@/hooks/useUnreadCount'
import useWallet from '@/hooks/useWallet'
import Icon from '@/components/ui/Icons'
import Button from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Media'
import NotificationBell from './NotificationBell'
import { formatPrice, loginHref } from '@/lib/format'

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

function AccountMenu({ user, profile, isAdmin, signOut }) {
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
  const close = () => setOpen(false)
  const link = (href, icon, text) => (
    <Link role="menuitem" href={href} onClick={close} className={item}>
      <Icon name={icon} className="h-[18px] w-[18px] text-teal-800" /> {text}
    </Link>
  )

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
          className="absolute right-0 top-[calc(100%+10px)] w-72 rounded-3xl border border-teal-900/10 bg-white/95 p-2 shadow-[0_24px_50px_-20px_rgba(10,61,56,0.45)] backdrop-blur-xl"
        >
          <Link href="/profile" onClick={close} className="flex items-center gap-3 rounded-2xl px-3 pb-3 pt-2.5 transition hover:bg-teal-900/[0.05]">
            <Avatar name={name} url={profile?.avatar_url} className="h-11 w-11" />
            <span className="min-w-0">
              <span className="block truncate font-semibold text-teal-950">{name}</span>
              <span className="block truncate text-[13px] text-slate-500">প্রোফাইল দেখুন ও এডিট করুন</span>
            </span>
          </Link>
          <div className="my-1 h-px bg-teal-900/10" />
          {link('/wallet', 'wallet', 'ওয়ালেট')}
          {link('/orders', 'receipt', 'আমার অর্ডার')}
          {link('/profile/listings', 'tag', 'আমার প্রোডাক্ট')}
          {link('/messages', 'chat', 'মেসেজ')}
          {isAdmin && (
            <>
              <div className="my-1 h-px bg-teal-900/10" />
              {link('/admin', 'dashboard', 'অ্যাডমিন প্যানেল')}
            </>
          )}
          <div className="my-1 h-px bg-teal-900/10" />
          <button
            role="menuitem"
            type="button"
            onClick={() => {
              close()
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

function NavSearch() {
  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()
  const [q, setQ] = useState(params.get('q') ?? '')
  useEffect(() => setQ(pathname === '/' ? params.get('q') ?? '' : ''), [params, pathname])

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        router.push(q.trim() ? `/?q=${encodeURIComponent(q.trim())}#results` : '/')
      }}
      className="hidden min-w-0 max-w-md flex-1 md:block"
    >
      <label className="flex h-11 items-center gap-2 rounded-full bg-teal-900/[0.05] px-4 ring-1 ring-inset ring-transparent transition focus-within:bg-white focus-within:ring-teal-600/40">
        <Icon name="search" className="h-[18px] w-[18px] text-teal-800/60" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="বই, নোটস, ল্যাপটপ খুঁজুন…"
          aria-label="প্রোডাক্ট খুঁজুন"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
        />
      </label>
    </form>
  )
}

export default function Navbar() {
  const { user, profile, isAdmin, loading, signOut } = useAuth()
  const unread = useUnreadCount(user?.id)
  const { balance } = useWallet(user?.id)
  const pathname = usePathname()

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (pathname.startsWith('/admin')) return null

  return (
    <header className="sticky top-0 z-50 border-b border-teal-900/10 bg-white/75 backdrop-blur-xl supports-[backdrop-filter]:bg-white/65">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Bachelorer Dokan হোম">
          <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-teal-700 to-teal-950 text-amber-300 shadow-[0_10px_20px_-8px_rgba(10,61,56,0.9)] transition group-hover:rotate-[-6deg]">
            <Icon name="bag" className="h-5 w-5" />
          </span>
          <span className="font-display hidden text-[19px] font-extrabold tracking-tight text-teal-950 sm:block">Bachelorer Dokan</span>
        </Link>

        <NavSearch />

        <nav className="flex shrink-0 items-center gap-1 sm:gap-1.5" aria-label="প্রধান মেনু">
          <Button href={(isMounted && user) ? '/add-product' : loginHref('/add-product')} size="sm" variant="dark" className="mr-0.5 sm:mr-1">
            <Icon name="plus" className="h-4 w-4" /> <span className="hidden min-[400px]:inline">Sell Item</span>
          </Button>

          {(!isMounted || loading) ? (
            <span className="skeleton h-9 w-16 rounded-full" aria-hidden="true" />
          ) : user ? (
            <>
              <Link
                href="/wallet"
                aria-label="ওয়ালেট"
                className="mr-0.5 hidden h-10 items-center gap-2 rounded-full bg-gradient-to-r from-amber-50 to-amber-100/70 pl-3 pr-4 text-sm font-bold text-teal-950 ring-1 ring-inset ring-amber-300/50 transition hover:ring-amber-400 sm:flex"
              >
                <Icon name="wallet" className="h-[18px] w-[18px] text-amber-700" />
                {balance === null ? <span className="skeleton h-4 w-10" /> : formatPrice(balance)}
              </Link>
              <NotificationBell />
              <IconLink href="/messages" label="মেসেজ" icon="chat" badge={unread} active={pathname.startsWith('/messages')} />
              <AccountMenu user={user} profile={profile} isAdmin={isAdmin} signOut={signOut} />
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