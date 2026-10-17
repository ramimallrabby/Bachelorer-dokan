import Icon from '@/components/ui/Icons'

const STEPS = [
  { icon: 'search', title: 'পছন্দের জিনিস খুঁজুন', text: 'ক্যাটাগরি, দাম ও এলাকা দিয়ে ফিল্টার করে দ্রুত পেয়ে যান।' },
  { icon: 'chat', title: 'বিক্রেতার সাথে কথা বলুন', text: 'লাইভ চ্যাটে দেখুন সে অনলাইন কি না, মেসেজ পৌঁছেছে কি না।' },
  { icon: 'lock', title: 'ওয়ালেট থেকে এসক্রো-তে জমা', text: 'টাকা আমাদের কাছে নিরাপদ থাকে, বিক্রেতার কাছে যায় না।' },
  { icon: 'check', title: 'পণ্য পেয়ে কনফার্ম', text: 'আপনি কনফার্ম করলেই বিক্রেতা টাকা পান। সমস্যা হলে বিরোধ খুলুন।' },
]

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="how-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">কীভাবে কাজ করে</p>
        <h2 id="how-title" className="font-display mt-3 text-3xl font-extrabold text-teal-950 sm:text-4xl">প্রতারিত হওয়ার ভয় ছাড়া কেনাবেচা</h2>
      </div>
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative rounded-3xl bg-white p-7 shadow-[0_14px_30px_-20px_rgba(10,61,56,0.35)] ring-1 ring-teal-900/[0.06]">
            <span className="font-display absolute right-6 top-5 text-5xl font-extrabold text-teal-900/[0.06]">{i + 1}</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-900 text-amber-300 shadow-[0_12px_24px_-12px_rgba(10,61,56,0.9)]">
              <Icon name={s.icon} className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-teal-950">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-slate-500">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
