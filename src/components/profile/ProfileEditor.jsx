'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useAuth } from '@/components/auth/AuthProvider'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icons'
import { Field, Input, Textarea } from '@/components/ui/Form'
import { Avatar } from '@/components/ui/Media'
import { compressImage } from '@/lib/image'
import { updateProfile, uploadAvatar } from '@/lib/services/profile'
import { friendlyError } from '@/lib/errors'

export default function ProfileEditor() {
  const { user, profile, refreshProfile } = useAuth()
  const [v, setV] = useState({ full_name: '', university: '', department: '', city: '', bio: '' })
  const [avatar, setAvatar] = useState(null) // { blob, url }
  const [cover, setCover] = useState(null)
  const [busy, setBusy] = useState(false)
  const loaded = useRef(false)

  useEffect(() => {
    if (!profile || loaded.current) return
    loaded.current = true
    setV({
      full_name: profile.full_name ?? '',
      university: profile.university ?? '',
      department: profile.department ?? '',
      city: profile.city ?? '',
      bio: profile.bio ?? '',
    })
  }, [profile])

  const set = (k) => (e) => setV((x) => ({ ...x, [k]: e.target.value }))

  async function pick(e, kind) {
    const f = e.target.files?.[0]
    e.target.value = ''
    if (!f) return
    if (!f.type.startsWith('image/')) return toast.error('শুধু ছবি আপলোড করা যাবে।')
    const blob = await compressImage(f, kind === 'cover' ? { maxSize: 1600, quality: 0.8 } : { maxSize: 512, quality: 0.85 })
    const next = { blob, url: URL.createObjectURL(blob) }
    kind === 'cover' ? setCover(next) : setAvatar(next)
  }

  async function save(e) {
    e.preventDefault()
    if (v.full_name.trim().length < 2) return toast.error('নাম কমপক্ষে ২ অক্ষরের হতে হবে।')
    setBusy(true)
    try {
      const patch = {
        full_name: v.full_name.trim(),
        university: v.university.trim() || null,
        department: v.department.trim() || null,
        city: v.city.trim() || null,
        bio: v.bio.trim() || null,
      }
      if (avatar) patch.avatar_url = await uploadAvatar(user.id, avatar.blob, 'avatar')
      if (cover) patch.cover_url = await uploadAvatar(user.id, cover.blob, 'cover')
      await updateProfile(user.id, patch)
      await refreshProfile()
      setAvatar(null)
      setCover(null)
      toast.success('প্রোফাইল আপডেট হয়েছে!')
    } catch (err) {
      const m = friendlyError(err)
      toast.error(m?.includes('বাকেট') ? 'ছবি রাখার “avatars” বাকেট তৈরি করা হয়নি (GUIDE.md ধাপ ৪ দেখুন)।' : m)
    } finally {
      setBusy(false)
    }
  }

  const coverSrc = cover?.url || profile?.cover_url
  const avatarSrc = avatar?.url || profile?.avatar_url

  return (
    <main className="mx-auto max-w-4xl px-4 pb-20 pt-6 sm:px-6">
      <form onSubmit={save} className="overflow-hidden rounded-[32px] bg-white shadow-[0_14px_30px_-18px_rgba(10,61,56,0.3)] ring-1 ring-teal-900/[0.06]">
        <div className="relative h-40 sm:h-52">
          {coverSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverSrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="aurora grain on-dark h-full w-full" />
          )}
          <label className="absolute right-4 top-4 flex cursor-pointer items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-teal-950 backdrop-blur-md transition hover:bg-white">
            <Icon name="camera" className="h-4 w-4" /> কভার বদলান
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => pick(e, 'cover')} />
          </label>
        </div>

        <div className="px-6 pb-8 sm:px-10">
          <div className="-mt-14 flex items-end justify-between gap-4">
            <label className="group relative cursor-pointer">
              <Avatar name={v.full_name} url={avatarSrc} className="h-28 w-28 rounded-full text-3xl ring-4 ring-white" />
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-teal-950/50 text-white opacity-0 transition group-hover:opacity-100">
                <Icon name="camera" className="h-7 w-7" />
              </span>
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => pick(e, 'avatar')} />
            </label>
            <Link href={`/u/${user.id}`} className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-teal-800 hover:text-teal-950">
              পাবলিক প্রোফাইল দেখুন <Icon name="external" className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field label="পুরো নাম">{(p) => <Input {...p} required maxLength={60} value={v.full_name} onChange={set('full_name')} />}</Field>
            <Field label="শহর / এলাকা">{(p) => <Input {...p} maxLength={60} value={v.city} onChange={set('city')} placeholder="যেমন: ঢাকা" />}</Field>
            <Field label="বিশ্ববিদ্যালয় / কলেজ">{(p) => <Input {...p} maxLength={80} value={v.university} onChange={set('university')} />}</Field>
            <Field label="বিভাগ">{(p) => <Input {...p} maxLength={80} value={v.department} onChange={set('department')} placeholder="যেমন: CSE" />}</Field>
          </div>
          <div className="mt-5">
            <Field label="আমার সম্পর্কে" hint={`${v.bio.length}/300`}>
              {(p) => <Textarea {...p} maxLength={300} value={v.bio} onChange={set('bio')} placeholder="ক্রেতারা আপনাকে চেনার জন্য দুটি লাইন লিখুন…" />}
            </Field>
          </div>
          <p className="mt-4 text-sm text-slate-500">ইমেইল: {user.email}. এটি অন্য কেউ দেখতে পায় না।</p>
          <Button type="submit" variant="dark" size="lg" className="mt-6 w-full sm:w-auto" loading={busy}>
            পরিবর্তন সেভ করুন
          </Button>
        </div>
      </form>
    </main>
  )
}
