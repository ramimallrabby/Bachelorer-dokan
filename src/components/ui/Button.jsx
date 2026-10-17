import Link from 'next/link'
import { Spinner } from './Feedback'

const VARIANTS = {
  // Marigold is reserved for the money actions: Search, Buy via Escrow, Pay.
  primary:
    'bg-amber-400 text-teal-950 shadow-[0_10px_24px_-10px_rgba(217,119,6,0.8),inset_0_1px_0_rgba(255,255,255,0.5)] hover:bg-amber-300 hover:shadow-[0_14px_30px_-10px_rgba(217,119,6,0.9),inset_0_1px_0_rgba(255,255,255,0.5)]',
  dark: 'bg-teal-900 text-white shadow-[0_10px_24px_-12px_rgba(10,61,56,0.85)] hover:bg-teal-800',
  soft: 'bg-teal-900/[0.06] text-teal-950 hover:bg-teal-900/10',
  outline:
    'bg-white text-teal-950 ring-1 ring-inset ring-teal-900/15 hover:bg-teal-50/70 hover:ring-teal-900/30',
  danger: 'bg-rose-600 text-white shadow-[0_10px_24px_-12px_rgba(225,29,72,0.8)] hover:bg-rose-500',
  glass: 'bg-white/10 text-white ring-1 ring-inset ring-white/25 backdrop-blur-md hover:bg-white/20',
}

const SIZES = {
  sm: 'h-9 rounded-xl px-3.5 text-sm',
  md: 'h-11 rounded-xl px-5 text-[15px]',
  lg: 'h-[52px] rounded-2xl px-7 text-base',
}

export default function Button({
  variant = 'dark',
  size = 'md',
  loading = false,
  href,
  className = '',
  children,
  disabled,
  type = 'button',
  ...rest
}) {
  const cls = `inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (href && !disabled) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading && <Spinner className="h-4 w-4" />}
      {children}
    </button>
  )
}
