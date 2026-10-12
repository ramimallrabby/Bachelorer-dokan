'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { friendlyError } from '@/lib/errors'
import { safeNext } from '@/lib/format'
import { useAuth } from './AuthProvider'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icons'
import { Field, Input } from '@/components/ui/Form'

export default function AuthForm() {
  const router = useRouter()
  const params = useSearchParams()
  const next = safeNext(params.get('next'))
  const { user, loading } = useAuth()

  const [mode, setMode] = useState(params.get('mode') === 'signup' ? 'signup' : 'signin')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [sentTo, setSentTo] = useState(null)

  useEffect(() => {
    if (!loading && user) router.replace(next)
  }, [loading, user, next, router])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const isSignup = mode === 'signup'

  function validate() {
    const e = {}
    if (isSignup && form.name.trim().length < 2) e.name = 'আপনার নাম লিখুন।'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'সঠিক ইমেইল দিন।'
    if (form.password.length < 6) e.password = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    setBusy(true)
    const email = form.email.trim()
    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: form.password,
          options: { data: { full_name: form.name.trim() }, emailRedirectTo: `${window.location.origin}/login` },
        })
        if (error) throw error
        // Supabase hides "already registered" behind an empty identities list when email confirmation is on.
        if (data.user && data.user.identities?.length === 0) throw new Error('User already registered')
        if (data.session) {
          toast.success('অ্যাকাউন্ট তৈরি হয়েছে। স্বাগতম!')
          router.replace(next)
        } else {
          setSentTo(email) // email confirmation is enabled in Supabase
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: form.password })
        if (error) throw error
        toast.success('লগইন সফল হয়েছে।')
        router.replace(next)
      }
    } catch (err) {
      toast.error(friendlyError(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="aurora grain on-dark flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="rise w-full max-w-md rounded-[28px] border border-white/30 bg-white/90 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_40px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-9">
        {sentTo ? (
          <div className="text-center">
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Icon name="check" className="h-7 w-7" />
            </span>
            <h1 className="font-display text-2xl font-extrabold text-teal-950">ইমেইল চেক করুন</h1>
            <p className="mt-3 leading-relaxed text-slate-600">
              <b className="break-all">{sentTo}</b> ঠিকানায় একটি কনফার্মেশন লিংক পাঠানো হয়েছে। লিংকে ক্লিক করার পর লগইন করুন।
            </p>
            <Button className="mt-7 w-full" variant="soft" onClick={() => { setSentTo(null); setMode('signin') }}>
              লগইন পেজে যান
            </Button>
          </div>
        ) : (
          <>
            <h1 className="font-display text-[28px] font-extrabold leading-snug text-teal-950">
              {isSignup ? 'অ্যাকাউন্ট খুলুন' : 'আবার স্বাগতম'}
            </h1>
            <p className="mt-1.5 text-slate-500">
              {isSignup ? 'প্রোডাক্ট বিক্রি, চ্যাট ও এসক্রো অর্ডারের জন্য দরকার।' : 'লগইন করে বেচাকেনা চালিয়ে যান।'}
            </p>

            <div role="tablist" aria-label="লগইন বা সাইন আপ" className="mt-6 grid grid-cols-2 rounded-2xl bg-teal-900/[0.07] p-1">
              {[
                ['signin', 'লগইন'],
                ['signup', 'নতুন অ্যাকাউন্ট'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  role="tab"
                  type="button"
                  aria-selected={mode === value}
                  onClick={() => {
                    setMode(value)
                    setErrors({})
                  }}
                  className={`rounded-xl py-2.5 text-sm font-semibold transition ${
                    mode === value ? 'bg-white text-teal-950 shadow-[0_6px_16px_-8px_rgba(10,61,56,0.5)]' : 'text-teal-900/60 hover:text-teal-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
              {isSignup && (
                <Field label="আপনার নাম" error={errors.name}>
                  {(p) => <Input {...p} value={form.name} onChange={set('name')} autoComplete="name" placeholder="যেমন: রাফি আহমেদ" />}
                </Field>
              )}
              <Field label="ইমেইল" error={errors.email}>
                {(p) => <Input {...p} type="email" value={form.email} onChange={set('email')} autoComplete="email" placeholder="you@example.com" />}
              </Field>
              <Field label="পাসওয়ার্ড" error={errors.password}>
                {(p) => (
                  <Input
                    {...p}
                    type="password"
                    value={form.password}
                    onChange={set('password')}
                    autoComplete={isSignup ? 'new-password' : 'current-password'}
                    placeholder="কমপক্ষে ৬ অক্ষর"
                  />
                )}
              </Field>
              <Button type="submit" variant="dark" size="lg" className="w-full" loading={busy}>
                {isSignup ? 'অ্যাকাউন্ট খুলুন' : 'লগইন করুন'}
              </Button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
