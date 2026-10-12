'use client'
import { useEffect, useRef, useState } from 'react'
import useDebounce from './useDebounce'

// A text input whose value lives in the URL: typing is debounced into the URL, and
// external URL changes (back button, "clear filters") flow back into the input.
export default function useSyncedInput(urlValue, commit, delay = 400) {
  const [value, setValue] = useState(urlValue)
  const debounced = useDebounce(value, delay)
  const emitted = useRef(urlValue)

  useEffect(() => {
    if (debounced !== emitted.current) {
      emitted.current = debounced
      commit(debounced)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  useEffect(() => {
    if (urlValue !== emitted.current) {
      emitted.current = urlValue
      setValue(urlValue)
    }
  }, [urlValue])

  const flush = (v = value) => {
    emitted.current = v
    commit(v)
  }
  return [value, setValue, flush]
}
