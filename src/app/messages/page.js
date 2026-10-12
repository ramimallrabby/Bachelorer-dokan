import Icon from '@/components/ui/Icons'

export const metadata = { title: 'মেসেজ' }

export default function MessagesIndex() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#eaf1ef] px-6 text-center">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-teal-800 shadow-[0_14px_30px_-16px_rgba(10,61,56,0.5)]">
        <Icon name="chat" className="h-8 w-8" />
      </span>
      <p className="font-display text-xl font-bold text-teal-950">একটি কথোপকথন বেছে নিন</p>
      <p className="mt-1 text-slate-500">বাঁ দিক থেকে কাউকে বাছুন, মেসেজ এখানে দেখা যাবে।</p>
    </div>
  )
}
