export const PAGE_SIZE = 12

export const CATEGORIES = [
  { value: 'books', label: 'বই' },
  { value: 'notes', label: 'নোটস' },
  { value: 'electronics', label: 'ইলেকট্রনিক্স' },
  { value: 'stationery', label: 'স্টেশনারি ও ড্রয়িং' },
  { value: 'hostel', label: 'হোস্টেল' },
  { value: 'clothing', label: 'পোশাক' },
  { value: 'others', label: 'অন্যান্য' },
]

export const CONDITIONS = [
  { value: 'new', label: 'নতুন' },
  { value: 'like_new', label: 'প্রায় নতুন' },
  { value: 'good', label: 'ভালো' },
  { value: 'used', label: 'ব্যবহৃত' },
]

export const SORTS = [
  { value: 'newest', label: 'সবচেয়ে নতুন' },
  { value: 'price_asc', label: 'দাম: কম থেকে বেশি' },
  { value: 'price_desc', label: 'দাম: বেশি থেকে কম' },
]

export const labelOf = (list, value) => list.find((i) => i.value === value)?.label ?? null

export const MAX_IMAGE_MB = 8

// Escrow order lifecycle. `step` drives the timeline; `tone` drives badge colour.
export const ORDER_STATUS = {
  pending_payment: { label: 'পেমেন্টের অপেক্ষায়', tone: 'amber', step: 0 },
  funded: { label: 'টাকা এসক্রো-তে জমা', tone: 'teal', step: 1 },
  delivered: { label: 'পণ্য হস্তান্তর হয়েছে', tone: 'teal', step: 2 },
  completed: { label: 'সম্পন্ন', tone: 'green', step: 3 },
  disputed: { label: 'বিরোধ চলছে', tone: 'rose', step: -1 },
  cancelled: { label: 'বাতিল', tone: 'slate', step: -1 },
  refunded: { label: 'টাকা ফেরত', tone: 'slate', step: -1 },
}

export const TONES = {
  amber: 'bg-amber-100 text-amber-900 ring-amber-300/60',
  teal: 'bg-teal-50 text-teal-900 ring-teal-200',
  green: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  rose: 'bg-rose-50 text-rose-800 ring-rose-200',
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
}
