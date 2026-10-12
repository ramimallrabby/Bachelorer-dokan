'use client'
import { useEffect, useRef } from 'react'
import Icon from './Icons'

// Built on the native <dialog>: focus trap, Escape to close and top-layer stacking come free.
// variant="sheet" becomes a bottom sheet on phones and a centred modal on larger screens.
export default function Dialog({ open, onClose, title, children, variant = 'center', width = 'max-w-lg' }) {
  const ref = useRef(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  const position =
    variant === 'sheet'
      ? 'max-sm:m-0 max-sm:mt-auto max-sm:w-full max-sm:max-w-none'
      : ''

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={title}
      className={`m-auto w-[min(94vw,40rem)] ${width} border-0 bg-transparent p-0 text-left backdrop:bg-teal-950/55 backdrop:backdrop-blur-sm ${position}`}
    >
      {open && (
        <div
          className={`max-h-[92vh] overflow-y-auto bg-white shadow-[0_40px_80px_-30px_rgba(10,61,56,0.6)] ${
            variant === 'sheet' ? 'rounded-t-3xl sm:rounded-3xl' : 'rounded-3xl'
          }`}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white/90 px-6 pb-3 pt-5 backdrop-blur">
            <h2 className="font-display text-xl font-bold text-teal-950">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="বন্ধ করুন"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <Icon name="x" className="h-5 w-5" />
            </button>
          </div>
          <div className="px-6 pb-6">{children}</div>
        </div>
      )}
    </dialog>
  )
}
