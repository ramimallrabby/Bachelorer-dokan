'use client'
import { useState } from 'react'
import Icon from './Icons'
import { initials } from '@/lib/format'

// Plain <img> on purpose: next/image would need remotePatterns config for your Supabase URL.
export function SmartImage({ src, alt, className = '' }) {
  const [state, setState] = useState('loading') // loading | ready | error
  if (!src || state === 'error') {
    return (
      <div className={`flex items-center justify-center bg-teal-900/[0.05] text-teal-800/50 ${className}`}>
        <Icon name="image" className="h-9 w-9" strokeWidth={1.4} />
      </div>
    )
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {state === 'loading' && <div className="skeleton absolute inset-0 rounded-none" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setState('ready')}
        onError={() => setState('error')}
        className={`h-full w-full object-cover transition duration-500 ${state === 'ready' ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}

export function Avatar({ name, url, className = 'h-10 w-10 text-sm' }) {
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt="" className={`shrink-0 rounded-full object-cover ${className}`} />
  }
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0d9488,#0a3d38)] font-bold text-white ${className}`}
    >
      {initials(name)}
    </span>
  )
}
