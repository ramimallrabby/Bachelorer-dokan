'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/components/auth/AuthProvider'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icons'
import { Chip, Field, Input, Select, Textarea } from '@/components/ui/Form'
import { compressImage } from '@/lib/image'
import { friendlyError } from '@/lib/errors'
import { CATEGORIES, CONDITIONS, MAX_IMAGE_MB } from '@/lib/constants'
import { createListing, fetchLocations, removeListingImage, updateListing, uploadListingImage } from '@/lib/services/listings'

const EMPTY = { title: '', category: '', condition: 'good', price: '', location: '', description: '' }

function validate(v) {
  const e = {}
  if (v.title.trim().length < 3) e.title = 'প্রোডাক্টের নাম কমপক্ষে ৩ অক্ষরের হতে হবে।'
  if (!v.category) e.category = 'একটি ক্যাটাগরি বেছে নিন।'
  if (!(Number(v.price) > 0)) e.price = 'সঠিক দাম লিখুন (০ এর বেশি)।'
  if (!v.location.trim()) e.location = 'এলাকা বা ক্যাম্পাসের নাম লিখুন।'
  if (v.description.trim().length < 10) e.description = 'কমপক্ষে ১০ অক্ষরে বিবরণ লিখুন, যেমন অবস্থা ও কেন বিক্রি করছেন।'
  return e
}

// `listing` set = edit mode (seller changes their own post). Unset = create mode.
export default function ListingForm({ listing = null }) {
  const editing = !!listing
  const { user } = useAuth()
  const router = useRouter()
  const inputRef = useRef(null)

  const [values, setValues] = useState(
    listing
      ? {
          title: listing.title ?? '',
          category: listing.category ?? '',
          condition: listing.condition ?? 'good',
          price: String(listing.price ?? ''),
          location: listing.location ?? '',
          description: listing.description ?? '',
        }
      : EMPTY
  )
  const [existingUrl, setExistingUrl] = useState(listing?.image_url ?? null)
  const [errors, setErrors] = useState({})
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const shownImage = preview || existingUrl
  const [dragging, setDragging] = useState(false)
  const [step, setStep] = useState(null) // null | progress label while submitting
  const [locations, setLocations] = useState([])

  useEffect(() => {
    fetchLocations().then(setLocations).catch(() => {})
  }, [])
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview])

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))

  function pickFile(f) {
    if (!f) return
    if (!f.type.startsWith('image/')) return toast.error('শুধু ছবি (JPG, PNG, WebP) আপলোড করা যাবে।')
    if (f.size > MAX_IMAGE_MB * 1024 * 1024) return toast.error(`ছবির সাইজ ${MAX_IMAGE_MB} MB এর কম হতে হবে।`)
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return toast.error('লাল চিহ্নিত ঘরগুলো ঠিক করে আবার চেষ্টা করুন।')

    let uploaded = null
    try {
      if (file) {
        setStep('ছবি ছোট করা হচ্ছে...')
        const blob = await compressImage(file)
        setStep('ছবি আপলোড হচ্ছে...')
        uploaded = await uploadListingImage(user.id, blob)
      }
      setStep('প্রোডাক্ট সেভ হচ্ছে...')
      if (editing) {
        await updateListing(listing.id, {
          title: values.title.trim(),
          category: values.category,
          condition: values.condition,
          price: Math.round(Number(values.price)),
          location: values.location.trim(),
          description: values.description.trim(),
          image_url: uploaded ? uploaded.url : existingUrl,
        })
        // best-effort: delete the replaced / removed photo
        const oldPath = listing.image_url?.split('/product-images/')[1]
        if (oldPath && (uploaded || !existingUrl) && oldPath.startsWith(`${user.id}/`)) removeListingImage(oldPath)
        toast.success('পরিবর্তন সেভ হয়েছে!')
        router.push(`/product/${listing.id}`)
        return
      }
      const { id } = await createListing({
        title: values.title.trim(),
        category: values.category,
        condition: values.condition,
        price: Math.round(Number(values.price)),
        location: values.location.trim(),
        description: values.description.trim(),
        image_url: uploaded?.url ?? null,
        seller_id: user.id, // links the product to its seller
      })
      toast.success('প্রোডাক্ট যোগ করা হয়েছে!')
      router.push(`/product/${id}`)
    } catch (err) {
      if (uploaded) removeListingImage(uploaded.path) // don't leave an orphaned photo behind
      toast.error(friendlyError(err))
      setStep(null)
    }
  }

  const busy = step !== null

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-extrabold text-teal-950 sm:text-4xl">{editing ? 'প্রোডাক্ট এডিট করুন' : 'নতুন প্রোডাক্ট যোগ করুন'}</h1>
      <p className="mt-2 max-w-xl text-slate-500">
        {editing ? 'দাম, ছবি বা বিবরণ বদলে সেভ করুন। চালু এসক্রো অর্ডার থাকলে এডিট বন্ধ থাকে।' : 'পরিষ্কার ছবি আর সৎ বিবরণ দিলে দ্রুত ক্রেতা পাবেন।'}
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <label
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              pickFile(e.dataTransfer.files?.[0])
            }}
            className={`group relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[28px] border-2 border-dashed text-center transition ${
              dragging ? 'border-teal-600 bg-teal-50' : 'border-teal-900/20 bg-white hover:border-teal-600/60 hover:bg-teal-50/50'
            }`}
          >
            <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
            {shownImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shownImage} alt="নির্বাচিত ছবির প্রিভিউ" className="absolute inset-0 h-full w-full object-cover" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-teal-950 backdrop-blur-md">
                  ছবি বদলান
                </span>
              </>
            ) : (
              <div className="px-6">
                <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-900/[0.06] text-teal-800 transition group-hover:scale-105">
                  <Icon name="upload" className="h-7 w-7" />
                </span>
                <p className="font-semibold text-teal-950">ছবি টেনে এনে ছাড়ুন, অথবা ক্লিক করুন</p>
                <p className="mt-1 text-sm text-slate-500">আপলোডের আগে ছবি অটো ছোট করা হয়: মোবাইল ডাটা বাঁচবে</p>
              </div>
            )}
          </label>
          {shownImage && (
            <button
              type="button"
              onClick={() => {
                setFile(null)
                setPreview(null)
                setExistingUrl(null)
                if (inputRef.current) inputRef.current.value = ''
              }}
              className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700"
            >
              <Icon name="trash" className="h-4 w-4" /> ছবি সরিয়ে ফেলুন
            </button>
          )}
        </div>

        <div className="space-y-5 rounded-[28px] bg-white p-6 shadow-[0_14px_30px_-18px_rgba(10,61,56,0.3)] ring-1 ring-teal-900/[0.06] sm:p-8">
          <Field label="প্রোডাক্টের নাম" error={errors.title}>
            {(p) => <Input {...p} value={values.title} onChange={set('title')} maxLength={80} placeholder="যেমন: Engineering Drawing Tools Set" />}
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="ক্যাটাগরি" error={errors.category}>
              {(p) => (
                <Select {...p} value={values.category} onChange={set('category')}>
                  <option value="">বেছে নিন</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </Select>
              )}
            </Field>
            <Field label="দাম (টাকা)" error={errors.price}>
              {(p) => <Input {...p} type="number" inputMode="numeric" min="1" value={values.price} onChange={set('price')} placeholder="৳" />}
            </Field>
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-semibold text-teal-950">অবস্থা</span>
            <div className="flex flex-wrap gap-2">
              {CONDITIONS.map((c) => (
                <Chip key={c.value} active={values.condition === c.value} onClick={() => setValues((v) => ({ ...v, condition: c.value }))}>
                  {c.label}
                </Chip>
              ))}
            </div>
          </div>

          <Field label="এলাকা / ক্যাম্পাস" error={errors.location} hint="ক্রেতা কোথায় এসে নিতে পারবে?">
            {(p) => (
              <>
                <Input {...p} list="dokan-form-locations" value={values.location} onChange={set('location')} placeholder="যেমন: মিরপুর-১০" />
                <datalist id="dokan-form-locations">
                  {locations.map((l) => (
                    <option key={l} value={l} />
                  ))}
                </datalist>
              </>
            )}
          </Field>

          <Field label="বিস্তারিত বিবরণ" error={errors.description}>
            {(p) => <Textarea {...p} value={values.description} onChange={set('description')} maxLength={1500} placeholder="অবস্থা কেমন, কতদিন ব্যবহার করেছেন, কেন বিক্রি করছেন..." />}
          </Field>

          <Button type="submit" variant="dark" size="lg" className="w-full" loading={busy}>
            {busy ? step : editing ? 'পরিবর্তন সেভ করুন' : 'পোস্ট করুন'}
          </Button>
        </div>
      </form>
    </main>
  )
}
