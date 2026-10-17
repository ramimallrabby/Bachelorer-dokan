'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Icon from '@/components/ui/Icons'
import { Textarea } from '@/components/ui/Form'
import { friendlyError } from '@/lib/errors'
import { toast } from 'sonner'

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-[28px] font-extrabold leading-tight text-teal-950">{title}</h1>
        {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
      </div>
      {actions}
    </div>
  )
}

export function Card({ className = '', children }) {
  return <section className={`rounded-3xl bg-white shadow-[0_1px_0_rgba(10,61,56,0.04),0_14px_30px_-20px_rgba(10,61,56,0.3)] ring-1 ring-teal-900/[0.06] ${className}`}>{children}</section>
}

export function Segmented({ value, onChange, options }) {
  return (
    <div className="no-scrollbar inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl bg-teal-900/[0.06] p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${
            value === o.value ? 'bg-white text-teal-950 shadow-sm' : 'text-teal-900/70 hover:text-teal-950'
          }`}
        >
          {o.label}
          {o.count > 0 && <span className="rounded-full bg-rose-500 px-1.5 text-[11px] font-bold leading-[18px] text-white">{o.count}</span>}
        </button>
      ))}
    </div>
  )
}

export function Money({ children, className = '' }) {
  return <span className={`font-display font-extrabold tabular-nums ${className}`}>৳{Number(children ?? 0).toLocaleString('en-IN')}</span>
}

export function Empty({ icon = 'check', children }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center text-slate-500">
      <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-900/[0.06] text-teal-800">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      {children}
    </div>
  )
}

// One dialog for every admin action: explains the consequence, collects a note, shows errors.
export function ActionDialog({ open, onClose, title, description, confirmLabel = 'নিশ্চিত করুন', danger, noteLabel = 'নোট', noteRequired, notePlaceholder, onConfirm, extra }) {
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [extraValue, setExtraValue] = useState('')

  async function go() {
    setBusy(true)
    try {
      await onConfirm(note.trim(), extraValue.trim())
      setNote('')
      setExtraValue('')
      onClose()
    } catch (e) {
      toast.error(friendlyError(e))
    } finally {
      setBusy(false)
    }
  }
  const noteOk = !noteRequired || note.trim().length >= 5
  const extraOk = !extra?.required || extraValue.trim().length >= 4

  return (
    <Dialog open={open} onClose={busy ? () => {} : onClose} title={title} width="max-w-md">
      {description && <p className="mb-4 leading-relaxed text-slate-600">{description}</p>}
      {extra && (
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-semibold text-teal-950">{extra.label}</label>
          <input
            value={extraValue}
            onChange={(e) => setExtraValue(e.target.value)}
            placeholder={extra.placeholder}
            className="h-12 w-full rounded-xl border border-teal-900/15 bg-white px-4 text-[15px] outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-500/15"
          />
        </div>
      )}
      <label className="mb-1.5 block text-sm font-semibold text-teal-950">
        {noteLabel} {!noteRequired && <span className="font-normal text-slate-400">(ঐচ্ছিক)</span>}
      </label>
      <Textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={400} className="min-h-24" placeholder={notePlaceholder} />
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="soft" onClick={onClose} disabled={busy}>বাতিল</Button>
        <Button variant={danger ? 'danger' : 'dark'} loading={busy} disabled={!noteOk || !extraOk} onClick={go}>
          {confirmLabel}
        </Button>
      </div>
    </Dialog>
  )
}

// A tiny dependency-free bar chart (SVG).
export function MiniBars({ data, keys, colors, height = 140 }) {
  const max = Math.max(1, ...data.map((d) => keys.reduce((a, k) => a + Number(d[k] || 0), 0)))
  const bw = 100 / data.length
  return (
    <svg viewBox={`0 0 100 ${height / 4}`} preserveAspectRatio="none" className="w-full" style={{ height }} role="img" aria-label="গত ১৪ দিনের কার্যক্রম">
      {data.map((d, i) => {
        let y = height / 4
        return keys.map((k, j) => {
          const h = (Number(d[k] || 0) / max) * (height / 4 - 2)
          y -= h
          return <rect key={`${i}-${k}`} x={i * bw + bw * 0.18} y={y} width={bw * 0.64} height={Math.max(h, 0)} rx="0.6" fill={colors[j]} />
        })
      })}
    </svg>
  )
}

export const copy = (text) => navigator.clipboard?.writeText(text).then(() => toast.success('কপি হয়েছে'))
