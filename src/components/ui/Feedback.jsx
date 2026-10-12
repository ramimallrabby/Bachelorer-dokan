import Icon from './Icons'
import Button from './Button'

export function Spinner({ className = 'h-5 w-5' }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function PageSpinner({ label = 'লোড হচ্ছে...' }) {
  return (
    <div role="status" className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-teal-800">
      <Spinner className="h-8 w-8" />
      <span className="text-sm text-slate-500">{label}</span>
    </div>
  )
}

export function Skeleton({ className = '' }) {
  return <div className={`skeleton rounded-xl ${className}`} aria-hidden="true" />
}

export function EmptyState({ icon = 'search', title, children, action }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-teal-900/15 bg-white/60 px-6 py-16 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-900/[0.06] text-teal-800">
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <h3 className="font-display text-xl font-bold text-teal-950">{title}</h3>
      {children && <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate-500">{children}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export function ErrorState({ title = 'লোড করা যায়নি', message, onRetry }) {
  return (
    <div role="alert" className="flex flex-col items-center rounded-3xl border border-rose-200 bg-rose-50/70 px-6 py-14 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
        <Icon name="alert" className="h-7 w-7" />
      </span>
      <h3 className="font-display text-xl font-bold text-rose-900">{title}</h3>
      {message && <p className="mt-2 max-w-md text-[15px] leading-relaxed text-rose-800/80">{message}</p>}
      {onRetry && (
        <Button className="mt-6" variant="dark" onClick={onRetry}>
          আবার চেষ্টা করুন
        </Button>
      )}
    </div>
  )
}
