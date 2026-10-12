import { createBrowserClient } from '@supabase/ssr'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  throw new Error(
    'Supabase env vars are missing. Copy .env.local.example to .env.local, add your anon key, and restart the dev server.'
  )
}

// Next.js e client-side theke Supabase call korar jonno createBrowserClient use kora hoy
// Eti automatically browser er cookies theke auth session dhore ney.
export const supabase = createBrowserClient(url, key)