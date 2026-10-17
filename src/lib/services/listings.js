import { supabase } from '@/lib/supabase'
import { PAGE_SIZE } from '@/lib/constants'

// Cards don't need `description`, so we don't download it for 12 rows at a time.
const CARD_COLUMNS = 'id, title, price, location, image_url, category, condition, status, created_at, seller_id'

// PostgREST's or() treats , ( ) as syntax and ilike treats % _ as wildcards: strip them from user text.
const clean = (s = '') => s.replace(/[,()%_*\\"']/g, ' ').replace(/\s+/g, ' ').trim()

export async function fetchListings(filters, signal) {
  const { q, category, condition, location, minPrice, maxPrice, sort, page } = filters
  const from = (page - 1) * PAGE_SIZE

  let query = supabase
    .from('listings')
    .select(CARD_COLUMNS, { count: 'exact' })
    .in('status', ['active', 'reserved'])

  // Every word must match somewhere in title / description / location.
  for (const word of clean(q).split(' ').filter(Boolean).slice(0, 5)) {
    query = query.or(`title.ilike.%${word}%,description.ilike.%${word}%,location.ilike.%${word}%`)
  }
  if (category) query = query.eq('category', category)
  if (condition) query = query.eq('condition', condition)
  const loc = clean(location)
  if (loc) query = query.ilike('location', `%${loc}%`)
  if (minPrice !== '' && !Number.isNaN(Number(minPrice))) query = query.gte('price', Number(minPrice))
  if (maxPrice !== '' && !Number.isNaN(Number(maxPrice))) query = query.lte('price', Number(maxPrice))

  if (sort === 'price_asc') query = query.order('price', { ascending: true })
  else if (sort === 'price_desc') query = query.order('price', { ascending: false })
  query = query.order('created_at', { ascending: false }).range(from, from + PAGE_SIZE - 1)

  if (signal) query = query.abortSignal(signal)

  const { data, count, error } = await query
  // PGRST103 = asked for a page beyond the last one (e.g. a stale ?page=9 after filtering).
  if (error?.code === 'PGRST103') return { items: [], total: 0, outOfRange: true }
  if (error) throw error
  return { items: data ?? [], total: count ?? 0, outOfRange: false }
}

export async function fetchLocations() {
  const { data } = await supabase.from('listing_locations').select('location').limit(30)
  return (data ?? []).map((r) => r.location)
}

// Used on the server by the product page.
export async function fetchListingById(id) {
  const { data, error } = await supabase
    .from('listings')
    .select('*, seller:profiles(id, full_name, avatar_url, created_at, university)')
    .eq('id', id)
    .maybeSingle()
  if (error) {
    // 22P02 = id isn't a valid uuid/integer for this table: same as "not found" for the visitor.
    if (error.code === '22P02') return null
    throw error
  }
  return data
}

export async function uploadListingImage(userId, blob) {
  // First folder segment must equal the user's id: the storage policy checks this.
  const path = `${userId}/${crypto.randomUUID()}.jpg`
  const { error } = await supabase.storage
    .from('product-images')
    .upload(path, blob, { contentType: blob.type || 'image/jpeg', cacheControl: '31536000', upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from('product-images').getPublicUrl(path)
  return { path, url: data.publicUrl }
}

export const removeListingImage = (path) => supabase.storage.from('product-images').remove([path])

export async function createListing(values) {
  const { data, error } = await supabase.from('listings').insert(values).select('id').single()
  if (error) throw error
  return data
}

export async function deleteListing(id) {
  const { error } = await supabase.from('listings').delete().eq('id', id)
  if (error) throw error
}

export async function markListingSold(id) {
  const { error } = await supabase.rpc('mark_listing_sold', { p_listing_id: String(id) })
  if (error) throw error
}

export async function updateListing(id, values) {
  const { error } = await supabase.from('listings').update(values).eq('id', id)
  if (error) throw error
}

export async function fetchMyListings(userId) {
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, price, image_url, status, category, views, created_at, hidden_reason')
    .eq('seller_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function fetchListingsBySeller(sellerId) {
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, price, location, image_url, category, condition, status, created_at, seller_id')
    .eq('seller_id', sellerId)
    .in('status', ['active', 'reserved', 'sold'])
    .order('created_at', { ascending: false })
    .limit(48)
  if (error) throw error
  return data ?? []
}

export const reopenListing = async (id) => {
  const { error } = await supabase.rpc('reopen_listing', { p_listing_id: String(id) })
  if (error) throw error
}

export const bumpViews = (id) => supabase.rpc('bump_listing_views', { p_listing_id: String(id) })
