'use client'
import { useState } from 'react'
import Icon from '@/components/ui/Icons'
import { SmartImage } from '@/components/ui/Media'

export default function ImageGallery({ urls = [], title, location, status }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const validUrls = urls.filter(Boolean)
  const currentUrl = validUrls[activeIndex] || null

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-teal-900/[0.05] shadow-[0_30px_60px_-30px_rgba(10,61,56,0.5)] ring-1 ring-teal-900/10">
        {currentUrl && <SmartImage src={currentUrl} alt={title} className="h-full w-full object-cover" />}
        {location && (
          <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/70 px-3.5 py-1.5 text-sm font-semibold text-teal-950 ring-1 ring-white/60 backdrop-blur-md">
            <Icon name="pin" className="h-4 w-4 text-teal-700" /> {location}
          </span>
        )}
        {status !== 'active' && (
          <div className="absolute inset-0 flex items-center justify-center bg-teal-950/50 backdrop-blur-[3px]">
            <span className="rounded-full bg-white/90 px-6 py-2 text-lg font-bold text-teal-950">
              {status === 'sold' ? 'বিক্রি হয়ে গেছে' : status === 'hidden' ? 'পর্যালোচনায়' : 'রিজার্ভড'}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {validUrls.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {validUrls.map((url, i) => (
            <button
              key={url}
              onClick={() => setActiveIndex(i)}
              className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                activeIndex === i ? 'border-teal-600 shadow-md ring-2 ring-teal-600/20' : 'border-transparent ring-1 ring-teal-900/10 hover:opacity-80'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`${title} ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}