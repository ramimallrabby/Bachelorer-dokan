'use client'
import { useEffect, useState } from 'react'
import { Chip, Input } from '@/components/ui/Form'
import useSyncedInput from '@/hooks/useSyncedInput'
import { fetchLocations } from '@/lib/services/listings'
import { CONDITIONS } from '@/lib/constants'

const digits = (v) => v.replace(/\D/g, '').slice(0, 8)

function Group({ title, children }) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-2.5 text-sm font-bold text-teal-950">{title}</legend>
      {children}
    </fieldset>
  )
}

export default function FilterPanel({ filters, update, clear, activeCount }) {
  const [locations, setLocations] = useState([])
  useEffect(() => {
    fetchLocations().then(setLocations).catch(() => {})
  }, [])

  const [min, setMin] = useSyncedInput(filters.minPrice, (v) => update({ minPrice: v }))
  const [max, setMax] = useSyncedInput(filters.maxPrice, (v) => update({ maxPrice: v }))
  const [loc, setLoc] = useSyncedInput(filters.location, (v) => update({ location: v }))

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-teal-950">ফিল্টার</h3>
        {activeCount > 0 && (
          <button type="button" onClick={clear} className="text-sm font-semibold text-teal-700 hover:text-teal-900 hover:underline">
            সব মুছুন
          </button>
        )}
      </div>

      <Group title="দাম (টাকা)">
        <div className="flex items-center gap-2">
          <Input inputMode="numeric" placeholder="সর্বনিম্ন" aria-label="সর্বনিম্ন দাম" value={min} onChange={(e) => setMin(digits(e.target.value))} className="h-11" />
          <span className="text-slate-400">-</span>
          <Input inputMode="numeric" placeholder="সর্বোচ্চ" aria-label="সর্বোচ্চ দাম" value={max} onChange={(e) => setMax(digits(e.target.value))} className="h-11" />
        </div>
      </Group>

      <Group title="এলাকা">
        <Input
          list="dokan-locations"
          placeholder="যেমন: মিরপুর, সিলেট"
          aria-label="এলাকা"
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          className="h-11"
        />
        <datalist id="dokan-locations">
          {locations.map((l) => (
            <option key={l} value={l} />
          ))}
        </datalist>
      </Group>

      <Group title="অবস্থা">
        <div className="flex flex-wrap gap-2">
          {CONDITIONS.map((c) => (
            <Chip
              key={c.value}
              active={filters.condition === c.value}
              onClick={() => update({ condition: filters.condition === c.value ? '' : c.value })}
            >
              {c.label}
            </Chip>
          ))}
        </div>
      </Group>
    </div>
  )
}
