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
import { CATEGORIES, CONDITIONS } from '@/lib/constants'
import { createListing, fetchLocations, removeListingImages, updateListing, uploadListingImage } from '@/lib/services/listings'

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

  // --- MULTIPLE IMAGES STATE ---
  const initialUrls = listing?.image_urls?.length ? listing.image_urls : (listing?.image_url ? [listing.image_url] : [])
  const [existingUrls, setExistingUrls] = useState(initialUrls)
  const [newFiles, setNewFiles] = useState([]) // Array of { id, file, preview }
  const [deletedUrls, setDeletedUrls] = useState([]) 
  const [primaryId, setPrimaryId] = useState(initialUrls[0] || null) 

  const [errors, setErrors] = useState({})
  const [dragging, setDragging] = useState(false)
  const [step, setStep] = useState(null)
  const [locations, setLocations] = useState([])

  useEffect(() => {
    fetchLocations().then(setLocations).catch(() => {})
  }, [])

  useEffect(() => {
    return () => newFiles.forEach(nf => URL.revokeObjectURL(nf.preview))
  }, [newFiles])

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))

  function pickFiles(filesList) {
    if (!filesList || filesList.length === 0) return
    const arr = Array.from(filesList)
    const currentTotal = existingUrls.length + newFiles.length

    if (currentTotal + arr.length > 5) {
      return toast.error('সর্বোচ্চ ৫টি ছবি আপলোড করা যাবে।')
    }

    const validFiles = []
    for (const f of arr) {
      if (!f.type.startsWith('image/')) {
        toast.error(`'${f.name}' কোনো ছবি নয়।`)
        continue
      }
      
      // --- Hard Limit: 2MB ---
      if (f.size > 2 * 1024 * 1024) { 
        toast.error(`'${f.name}' এর সাইজ ২ MB এর বেশি! দয়া করে ছোট ছবি দিন।`)
        continue // ছবি বড় হলে এখানেই রিজেক্ট করে দিবে
      }
      
      validFiles.push({ id: crypto.randomUUID(), file: f, preview: URL.createObjectURL(f) })
    }

    setNewFiles((prev) => {
      const updated = [...prev, ...validFiles]
      if (!primaryId && updated.length > 0 && existingUrls.length === 0) {
        setPrimaryId(updated[0].id)
      }
      return updated
    })
  }

  function removeImage(id, isExisting) {
    if (isExisting) {
      setExistingUrls(prev => prev.filter(url => url !== id))
      setDeletedUrls(prev => [...prev, id])
    } else {
      setNewFiles(prev => prev.filter(nf => nf.id !== id))
    }
    if (primaryId === id) {
      const remainingExisting = existingUrls.filter(url => url !== id)
      const remainingNew = newFiles.filter(nf => nf.id !== id)
      setPrimaryId(remainingExisting[0] || remainingNew[0]?.id || null)
    }
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    const found = validate(values)
    setErrors(found)
    
    if (existingUrls.length === 0 && newFiles.length === 0) {
      return toast.error('অন্তত একটি ছবি আপলোড করতে হবে।')
    }
    if (Object.keys(found).length) return toast.error('লাল চিহ্নিত ঘরগুলো ঠিক করে আবার চেষ্টা করুন।')

    const maxAttempts = 3
    let attempts = 0
    let uploadedResults = [] 
    let blobsToUpload = []

    try {
      if (newFiles.length > 0) {
        setStep('ছবি প্রস্তুত করা হচ্ছে...')
        for (const nf of newFiles) {
          blobsToUpload.push({ id: nf.id, blob: await compressImage(nf.file), uploadedData: null })
        }
      }

      while (attempts < maxAttempts) {
        attempts++
        try {
          for (let i = 0; i < blobsToUpload.length; i++) {
            if (!blobsToUpload[i].uploadedData) {
              setStep(attempts > 1 ? `আবার চেষ্টা করা হচ্ছে (${attempts}/${maxAttempts})...` : `ছবি আপলোড হচ্ছে (${i + 1}/${blobsToUpload.length})...`)
              const up = await uploadListingImage(user.id, blobsToUpload[i].blob)
              blobsToUpload[i].uploadedData = up
              uploadedResults.push({ id: blobsToUpload[i].id, url: up.url, path: up.path })
            }
          }

          setStep('প্রোডাক্ট সেভ হচ্ছে...')
          
          let finalUrls = [...existingUrls, ...uploadedResults.map(u => u.url)]
          
          let frontUrl = null
          if (existingUrls.includes(primaryId)) frontUrl = primaryId
          else {
            const foundNew = uploadedResults.find(u => u.id === primaryId)
            if (foundNew) frontUrl = foundNew.url
          }

          if (frontUrl && finalUrls.includes(frontUrl)) {
            finalUrls = [frontUrl, ...finalUrls.filter(u => u !== frontUrl)]
          }

          const dbPayload = {
            title: values.title.trim(),
            category: values.category,
            condition: values.condition,
            price: Math.round(Number(values.price)),
            location: values.location.trim(),
            description: values.description.trim(),
            image_urls: finalUrls,
            image_url: finalUrls[0] || null, 
          }

          if (editing) {
            await updateListing(listing.id, dbPayload)
            toast.success('পরিবর্তন সেভ হয়েছে!')
            router.push(`/product/${listing.id}`)
          } else {
            const { id } = await createListing({ ...dbPayload, seller_id: user.id })
            toast.success('প্রোডাক্ট যোগ করা হয়েছে!')
            router.push(`/product/${id}`)
          }

          if (deletedUrls.length > 0) {
            const pathsToRemove = deletedUrls.map(url => url.split('/product-images/')[1]).filter(path => path?.startsWith(`${user.id}/`))
            if (pathsToRemove.length > 0) removeListingImages(pathsToRemove)
          }
          return

        } catch (err) {
          if (attempts >= maxAttempts) throw err
          await new Promise((res) => setTimeout(res, 1500))
        }
      }
    } catch (err) {
      const pathsToClean = uploadedResults.map(u => u.path)
      if (pathsToClean.length > 0) removeListingImages(pathsToClean)
      
      // নেটওয়ার্ক বা সাইজের সমস্যা হলে ক্লিয়ার মেসেজ দেখাবে
      toast.error(friendlyError(err, 'নেটওয়ার্ক দুর্বল অথবা ছবির সাইজ অনেক বড়! দয়া করে ছোট ছবি দিয়ে আবার চেষ্টা করুন।'))
      setStep(null)
    }
  }

  const busy = step !== null
  const allImages = [
    ...existingUrls.map(url => ({ id: url, url, isExisting: true })),
    ...newFiles.map(nf => ({ id: nf.id, url: nf.preview, isExisting: false }))
  ]

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-extrabold text-teal-950 sm:text-4xl">{editing ? 'প্রোডাক্ট এডিট করুন' : 'নতুন প্রোডাক্ট যোগ করুন'}</h1>
      <p className="mt-2 max-w-xl text-slate-500">
        {editing ? 'দাম, ছবি বা বিবরণ বদলে সেভ করুন। চালু এসক্রো অর্ডার থাকলে এডিট বন্ধ থাকে।' : 'পরিষ্কার একাধিক ছবি আর সৎ বিবরণ দিলে দ্রুত ক্রেতা পাবেন।'}
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.5fr)]">
        
        <div className="lg:sticky lg:top-24 lg:self-start space-y-3">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            
            {allImages.length < 5 && (
              <label
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); pickFiles(e.dataTransfer.files) }}
                className={`group relative flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] border-2 border-dashed transition ${
                  dragging ? 'border-teal-600 bg-teal-50' : 'border-teal-900/20 bg-teal-900/[0.02] hover:border-teal-600/60 hover:bg-teal-50/50'
                }`}
              >
                <input ref={inputRef} type="file" multiple accept="image/*" className="sr-only" onChange={(e) => { pickFiles(e.target.files); e.target.value = '' }} />
                <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-teal-800 shadow-sm transition group-hover:scale-110">
                  <Icon name="plus" className="h-5 w-5" />
                </span>
                <p className="text-xs font-semibold text-teal-900">ছবি যোগ করুন</p>
                <p className="mt-0.5 text-[10px] text-slate-500">{allImages.length}/5</p>
                {/* ইউজারকে সাইজ সম্পর্কে সতর্ক করার জন্য লাল টেক্সট */}
                <p className="mt-1 text-[10px] font-bold text-rose-500">সর্বোচ্চ ২ MB</p> 
              </label>
            )}

            {allImages.map((img) => {
              const isFront = img.id === primaryId
              return (
                <div key={img.id} className={`group relative aspect-square overflow-hidden rounded-[24px] border-2 transition ${isFront ? 'border-emerald-500 shadow-md' : 'border-transparent ring-1 ring-slate-200'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="Product" className="h-full w-full object-cover" />
                  
                  {isFront && (
                    <div className="absolute left-2 top-2 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
                      FRONT
                    </div>
                  )}

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-900/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    {!isFront && (
                      <button type="button" onClick={() => setPrimaryId(img.id)} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-teal-900 shadow-sm hover:bg-teal-50">
                        প্রথম ছবি করুন
                      </button>
                    )}
                    <button type="button" onClick={() => removeImage(img.id, img.isExisting)} className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm hover:bg-rose-600">
                      <Icon name="trash" className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          {allImages.length > 0 && <p className="text-sm text-slate-500">যে ছবিটি সামনে দেখাতে চান, সেটির ওপর মাউস নিয়ে &apos;প্রথম ছবি করুন&apos;-এ ক্লিক করুন।</p>}
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