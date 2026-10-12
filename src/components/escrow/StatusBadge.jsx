import { ORDER_STATUS, TONES } from '@/lib/constants'

export default function StatusBadge({ status }) {
  const s = ORDER_STATUS[status] ?? { label: status, tone: 'slate' }
  return <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${TONES[s.tone]}`}>{s.label}</span>
}
