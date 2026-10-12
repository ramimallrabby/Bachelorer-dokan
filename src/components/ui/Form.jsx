'use client'
import { forwardRef, useId } from 'react'

const control =
  'w-full rounded-xl border border-teal-900/15 bg-white px-4 text-[15px] text-slate-900 placeholder:text-slate-400 shadow-[inset_0_1px_2px_rgba(10,61,56,0.05)] outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-500/15 disabled:bg-slate-50 aria-[invalid=true]:border-rose-400 aria-[invalid=true]:ring-rose-500/10'

export const Input = forwardRef(function Input({ className = '', ...props }, ref) {
  return <input ref={ref} className={`h-12 ${control} ${className}`} {...props} />
})

export const Textarea = forwardRef(function Textarea({ className = '', ...props }, ref) {
  return <textarea ref={ref} className={`min-h-28 py-3 leading-relaxed ${control} ${className}`} {...props} />
})

export const Select = forwardRef(function Select({ className = '', children, ...props }, ref) {
  return (
    <select ref={ref} className={`h-12 ${control} ${className}`} {...props}>
      {children}
    </select>
  )
})

// Label + control + hint/error, wired together for screen readers.
export function Field({ label, hint, error, children }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-teal-950">
        {label}
      </label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': error || hint ? `${id}-d` : undefined })}
      {(error || hint) && (
        <p id={`${id}-d`} className={`mt-1.5 text-[13px] ${error ? 'text-rose-600' : 'text-slate-500'}`}>
          {error || hint}
        </p>
      )}
    </div>
  )
}

export function Chip({ active, children, className = '', ...props }) {
  return (
    <button
      type="button"
      aria-pressed={!!active}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${
        active
          ? 'bg-teal-900 text-white shadow-[0_8px_20px_-10px_rgba(10,61,56,0.9)]'
          : 'bg-white text-teal-900 ring-1 ring-inset ring-teal-900/10 hover:bg-teal-50 hover:ring-teal-900/25'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
