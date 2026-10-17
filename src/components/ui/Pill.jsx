import { TONES } from '@/lib/constants'

export function StatusPill({ tone = 'slate', children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[13px] font-semibold ring-1 ring-inset ${TONES[tone]} ${className}`}>
      {children}
    </span>
  )
}
