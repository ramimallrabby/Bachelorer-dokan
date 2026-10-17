'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Icon from '@/components/ui/Icons'

export default function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin') || pathname.startsWith('/messages')) return null
  const col = 'space-y-2.5 text-[15px] text-white/65'
  const a = 'transition hover:text-white'
  return (
    <footer className="aurora grain on-dark mt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/10 text-amber-300 ring-1 ring-white/20">
                <Icon name="bag" className="h-5 w-5" />
              </span>
              <span className="font-display text-xl font-extrabold">Bachelorer Dokan</span>
            </div>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/65">
              স্টুডেন্টদের জন্য নিরাপদ কেনাবেচার জায়গা। টাকা থাকে এসক্রো-তে, পণ্য হাতে পেলে তবেই বিক্রেতা পান।
            </p>
          </div>
          <div>
            <p className="mb-3 font-semibold">মার্কেটপ্লেস</p>
            <ul className={col}>
              <li><Link className={a} href="/">সব প্রোডাক্ট</Link></li>
              <li><Link className={a} href="/add-product">বিক্রি করুন</Link></li>
              <li><Link className={a} href="/?category=books">বই</Link></li>
              <li><Link className={a} href="/?category=electronics">ইলেকট্রনিক্স</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold">আমার অ্যাকাউন্ট</p>
            <ul className={col}>
              <li><Link className={a} href="/wallet">ওয়ালেট</Link></li>
              <li><Link className={a} href="/orders">অর্ডার</Link></li>
              <li><Link className={a} href="/messages">মেসেজ</Link></li>
              <li><Link className={a} href="/profile">প্রোফাইল</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold">নিরাপত্তা</p>
            <ul className={col}>
              <li className="flex items-center gap-2"><Icon name="shield" className="h-4 w-4 text-amber-300" /> এসক্রো সুরক্ষা</li>
              <li className="flex items-center gap-2"><Icon name="flag" className="h-4 w-4 text-amber-300" /> সন্দেহজনক পোস্ট রিপোর্ট করুন</li>
              <li className="flex items-center gap-2"><Icon name="lock" className="h-4 w-4 text-amber-300" /> যাচাইকৃত লেনদেন</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 text-sm text-white/50">
          <p>© {new Date().getFullYear()} Bachelorer Dokan. সর্বস্বত্ব সংরক্ষিত।</p>
          <p>ভালোবাসা দিয়ে তৈরি, ছাত্রদের জন্য।</p>
        </div>
      </div>
    </footer>
  )
}
