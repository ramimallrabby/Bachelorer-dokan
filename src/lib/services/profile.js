import { supabase } from '@/lib/supabase'

export async function fetchProfile(id) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, cover_url, university, department, city, bio, created_at, last_seen_at')
    .eq('id', id)
    .maybeSingle()
  if (error) {
    if (error.code === '22P02') return null
    throw error
  }
  return data
}

export async function updateProfile(id, values) {
  const { error } = await supabase.from('profiles').update({ ...values, updated_at: new Date().toISOString() }).eq('id', id)
  if (error) throw error
}

export async function uploadAvatar(userId, blob, kind = 'avatar') {
  const path = `${userId}/${kind}-${Date.now()}.jpg`
  const { error } = await supabase.storage.from('avatars').upload(path, blob, {
    contentType: blob.type || 'image/jpeg',
    cacheControl: '31536000',
    upsert: false,
  })
  if (error) throw error
  return supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl
}

export const touchLastSeen = (id) =>
  supabase.from('profiles').update({ last_seen_at: new Date().toISOString() }).eq('id', id)

export async function fetchSellerStats(sellerId) {
  const [{ count: sold }, { count: active }] = await Promise.all([
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('seller_id', sellerId).eq('status', 'completed'),
    supabase.from('listings').select('id', { count: 'exact', head: true }).eq('seller_id', sellerId).eq('status', 'active'),
  ])
  return { sold: sold ?? 0, active: active ?? 0 }
}
