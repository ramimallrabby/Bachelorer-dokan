import Icon from '@/components/ui/Icons'
import { formatDateTime } from '@/lib/format'

const STEPS = [
  { status: 'pending_payment', title: 'অর্ডার দেওয়া হয়েছে', hint: 'ক্রেতা পেমেন্টের জন্য প্রস্তুত।' },
  { status: 'funded', title: 'টাকা এসক্রো-তে জমা', hint: 'টাকা নিরাপদে রাখা আছে। বিক্রেতা এবার পণ্য দিতে পারেন।' },
  { status: 'delivered', title: 'পণ্য হস্তান্তর', hint: 'বিক্রেতা পণ্য দিয়েছেন বলে জানিয়েছেন।' },
  { status: 'completed', title: 'টাকা বিক্রেতাকে ছাড়া হয়েছে', hint: 'ক্রেতার কনফার্মেশনের পর লেনদেন সম্পন্ন।' },
]

// "Done" is read from the audit log, so the timeline stays correct even for disputed/refunded orders.
export default function EscrowTimeline({ events }) {
  const at = Object.fromEntries(events.map((e) => [e.to_status, e.created_at]))
  const firstPending = STEPS.findIndex((s) => !at[s.status])

  return (
    <ol className="relative">
      {STEPS.map((s, i) => {
        const done = !!at[s.status]
        const current = i === firstPending
        return (
          <li key={s.status} className="relative flex gap-4 pb-7 last:pb-0">
            {i < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className={`absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 rounded-full transition-colors duration-700 ${
                  done && at[STEPS[i + 1].status] ? 'bg-teal-700' : 'bg-teal-900/10'
                }`}
              />
            )}
            <span
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-500 ${
                done
                  ? 'bg-teal-800 text-white shadow-[0_8px_18px_-8px_rgba(10,61,56,0.9)]'
                  : current
                    ? 'bg-amber-300 text-teal-950 ring-4 ring-amber-200/70'
                    : 'bg-white text-teal-900/40 ring-1 ring-inset ring-teal-900/15'
              }`}
            >
              {done ? <Icon name="check" className="h-4 w-4" strokeWidth={2.4} /> : i + 1}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className={`font-semibold ${done || current ? 'text-teal-950' : 'text-slate-400'}`}>{s.title}</p>
              <p className={`text-sm ${done || current ? 'text-slate-500' : 'text-slate-400'}`}>
                {done ? formatDateTime(at[s.status]) : current ? s.hint : ''}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
