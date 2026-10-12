import Icon from '@/components/ui/Icons'

function windowed(page, pages) {
  const set = new Set([1, pages, page - 1, page, page + 1])
  const nums = [...set].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b)
  const out = []
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push('gap-' + n)
    out.push(n)
  })
  return out
}

export default function Pagination({ page, pages, onChange, disabled }) {
  if (pages <= 1) return null
  const btn =
    'flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-40'

  return (
    <nav aria-label="পেজ নেভিগেশন" className="mt-10 flex flex-wrap items-center justify-center gap-1.5">
      <button
        type="button"
        className={`${btn} bg-white text-teal-900 ring-1 ring-inset ring-teal-900/10 hover:bg-teal-50`}
        disabled={disabled || page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="আগের পেজ"
      >
        <Icon name="prev" className="h-4 w-4" />
      </button>

      {windowed(page, pages).map((n) =>
        typeof n === 'string' ? (
          <span key={n} className="px-1 text-slate-400" aria-hidden="true">
            ...
          </span>
        ) : (
          <button
            key={n}
            type="button"
            disabled={disabled}
            onClick={() => onChange(n)}
            aria-current={n === page ? 'page' : undefined}
            className={`${btn} ${
              n === page
                ? 'bg-teal-900 text-white shadow-[0_8px_20px_-10px_rgba(10,61,56,0.9)]'
                : 'bg-white text-teal-900 ring-1 ring-inset ring-teal-900/10 hover:bg-teal-50'
            }`}
          >
            {n}
          </button>
        )
      )}

      <button
        type="button"
        className={`${btn} bg-white text-teal-900 ring-1 ring-inset ring-teal-900/10 hover:bg-teal-50`}
        disabled={disabled || page >= pages}
        onClick={() => onChange(page + 1)}
        aria-label="পরের পেজ"
      >
        <Icon name="next" className="h-4 w-4" />
      </button>
    </nav>
  )
}
