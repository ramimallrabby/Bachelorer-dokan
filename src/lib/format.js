// en-IN gives lakh/crore grouping (1,00,000), which is how Bangladesh writes numbers.
export const formatPrice = (n) => `৳${Number(n ?? 0).toLocaleString('en-IN')}`

const rtf = typeof Intl !== 'undefined' ? new Intl.RelativeTimeFormat('bn', { numeric: 'auto' }) : null

export function timeAgo(date) {
  if (!date || !rtf) return ''
  const diff = (new Date(date).getTime() - Date.now()) / 1000
  const steps = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [unit, secs] of steps) {
    if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit)
  }
  return 'এইমাত্র'
}

export const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

export const formatTime = (date) =>
  date ? new Date(date).toLocaleTimeString('bn-BD', { hour: 'numeric', minute: '2-digit' }) : ''

export const formatDateTime = (date) => (date ? `${formatDate(date)}, ${formatTime(date)}` : '')

export const isSameDay = (a, b) => new Date(a).toDateString() === new Date(b).toDateString()

export const initials = (name) =>
  (name || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => Array.from(w)[0])
    .join('')
    .toUpperCase()

// Only allow same-site redirects after login.
export const safeNext = (next) => (next && next.startsWith('/') && !next.startsWith('//') ? next : '/')

export const loginHref = (next) => `/login?next=${encodeURIComponent(next || '/')}`
