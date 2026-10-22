'use client'
import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthProvider'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Icon from '@/components/ui/Icons'

export default function SupportWidget() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const fileInputRef = useRef(null)

  // শুধুমাত্র লগিন করা ইউজাররাই সাপোর্ট টিকিট খুলতে পারবে
  if (!user) return null

  async function handleSubmit(e) {
    e.preventDefault()
    if (!message.trim()) return toast.error('দয়া করে আপনার সমস্যাটি বিস্তারিত লিখুন।')

    setBusy(true)
    try {
      let attachmentUrl = null

      // যদি ছবি/ডকুমেন্ট থাকে, তবে আগে সেটি স্টোরেজে আপলোড করবে
      if (file) {
        const ext = file.name.split('.').pop()
        const path = `${user.id}/${crypto.randomUUID()}.${ext}`
        
        const { error: uploadError } = await supabase.storage
          .from('support-attachments')
          .upload(path, file, { cacheControl: '3600', upsert: false })
          
        if (uploadError) throw uploadError
        
        const { data } = supabase.storage.from('support-attachments').getPublicUrl(path)
        attachmentUrl = data.publicUrl
      }

      // এরপর ডাটাবেসে মেসেজ ও ছবির লিংক সেভ করবে
      const { error: dbError } = await supabase
        .from('support_tickets')
        .insert({
          user_id: user.id,
          message: message.trim(),
          attachment_url: attachmentUrl
        })

      if (dbError) throw dbError

      toast.success('আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে! অ্যাডমিন শিঘ্রই ব্যবস্থা নিবেন।')
      setOpen(false)
      setMessage('')
      setFile(null)
    } catch (error) {
      toast.error('মেসেজ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {/* Floating Action Button (স্ক্রিনের ডানদিকে নিচে ভাসমান থাকবে) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-teal-900 text-white shadow-[0_10px_20px_-10px_rgba(10,61,56,0.9)] transition-transform hover:scale-110 active:scale-95 sm:bottom-8 sm:right-8"
        aria-label="সাপোর্ট"
      >
        <Icon name="chat" className="h-6 w-6" />
      </button>

      {/* Support Pop-up Form */}
      <Dialog open={open} onClose={() => !busy && setOpen(false)} title="সাহায্য প্রয়োজন?" width="max-w-md">
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5">
          <p className="text-sm text-slate-500">আপনার যেকোনো সমস্যা, অভিযোগ বা পরামর্শ আমাদের জানাতে পারেন।</p>
          
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-teal-950">আপনার মেসেজ *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="কীভাবে আপনাকে সাহায্য করতে পারি?"
              rows={4}
              maxLength={1000}
              className="w-full resize-none rounded-xl border border-teal-900/15 bg-slate-50/50 px-4 py-3 text-[15px] leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-500/15"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-teal-950">স্ক্রিনশট বা ছবি (ঐচ্ছিক)</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0])}
              className="block w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-teal-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-teal-700 hover:file:bg-teal-100"
            />
            {file && <p className="mt-2 text-xs font-medium text-teal-700">নির্বাচিত: {file.name}</p>}
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <Button type="button" variant="soft" onClick={() => setOpen(false)} disabled={busy}>
              বাতিল
            </Button>
            <Button type="submit" variant="dark" loading={busy}>
              পাঠিয়ে দিন
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  )
}