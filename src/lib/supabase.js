import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  throw new Error(
    'Supabase env vars are missing. Copy .env.local.example to .env.local, add your anon key, and restart the dev server.'
  )
}

// One shared client. The anon key is public by design; Row Level Security in
// the database (see /supabase/*.sql) is what actually protects your data.
export const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
})
