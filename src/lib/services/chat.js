import { supabase } from '@/lib/supabase'

export async function startConversation(listingId, buyerId) {
  const args = { p_listing_id: String(listingId) }
  if (buyerId) args.p_buyer_id = buyerId
  const { data, error } = await supabase.rpc('start_conversation', args)
  if (error) throw error
  return data // conversation id
}

const CONVERSATION_SELECT = `
  id, listing_id, buyer_id, seller_id, last_message_at, last_message_preview, last_sender_id,
  listing:listings(id, title, price, image_url, status),
  buyer:profiles!conversations_buyer_id_fkey(id, full_name, avatar_url, last_seen_at),
  seller:profiles!conversations_seller_id_fkey(id, full_name, avatar_url, last_seen_at)
`

export async function fetchConversations() {
  const { data, error } = await supabase
    .from('conversations')
    .select(CONVERSATION_SELECT)
    .order('last_message_at', { ascending: false })
    .limit(100)
  if (error) throw error
  return data ?? []
}

export async function fetchConversation(id) {
  const { data, error } = await supabase.from('conversations').select(CONVERSATION_SELECT).eq('id', id).maybeSingle()
  if (error) throw error
  return data
}

export async function fetchMessages(conversationId, { before, limit = 40 } = {}) {
  let q = supabase
    .from('messages')
    .select('id, conversation_id, sender_id, body, created_at, delivered_at, read_at')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (before) q = q.lt('created_at', before)
  const { data, error } = await q
  if (error) throw error
  return (data ?? []).reverse() // oldest -> newest for display
}

export async function sendMessage(conversationId, body) {
  const { data, error } = await supabase
    .from('messages')
    .insert({ conversation_id: conversationId, body })
    .select('id, conversation_id, sender_id, body, created_at, delivered_at, read_at')
    .single()
  if (error) throw error
  return data
}

export const markConversationRead = (conversationId) =>
  supabase.rpc('mark_conversation_read', { p_conversation_id: conversationId })

// Unread = messages from the other person that have no read_at. RLS already limits this to my conversations.
export async function fetchUnreadByConversation(userId) {
  const { data, error } = await supabase
    .from('messages')
    .select('conversation_id')
    .is('read_at', null)
    .neq('sender_id', userId)
    .limit(1000)
  if (error) throw error
  return (data ?? []).reduce((acc, m) => ({ ...acc, [m.conversation_id]: (acc[m.conversation_id] || 0) + 1 }), {})
}

export async function fetchUnreadCount(userId) {
  const { count, error } = await supabase
    .from('messages')
    .select('id', { count: 'exact', head: true })
    .is('read_at', null)
    .neq('sender_id', userId)
  if (error) throw error
  return count ?? 0
}

export const markConversationDelivered = (conversationId) =>
  supabase.rpc('mark_conversation_delivered', { p_conversation_id: conversationId })
export const markAllDelivered = () => supabase.rpc('mark_all_delivered')
