import { supabase } from '@/lib/supabase'

async function rpc(name, args) {
  const { data, error } = await supabase.rpc(name, args)
  if (error) throw error
  return data
}
async function rows(q) {
  const { data, error } = await q
  if (error) throw error
  return data ?? []
}

export const adminStats = () => rpc('admin_stats')
export const adminUsers = (search, offset = 0) => rpc('admin_list_users', { p_search: search || null, p_limit: 30, p_offset: offset })

export const adminReports = (status) => {
  let q = supabase
    .from('reports')
    .select('*, reporter:profiles!reports_reporter_id_fkey(id, full_name), target_user:profiles!reports_target_user_id_fkey(id, full_name)')
    .order('created_at', { ascending: false })
    .limit(150)
  if (status === 'active') q = q.in('status', ['open', 'investigating'])
  else if (status) q = q.eq('status', status)
  return rows(q)
}
export const resolveReport = (id, action, note) => rpc('admin_resolve_report', { p_report_id: id, p_action: action, p_note: note || null })

export const adminOrders = (status) => {
  let q = supabase
    .from('orders')
    .select('*, buyer:profiles!orders_buyer_id_fkey(id, full_name), seller:profiles!orders_seller_id_fkey(id, full_name)')
    .order('created_at', { ascending: false })
    .limit(150)
  if (status) q = q.eq('status', status)
  return rows(q)
}
export const adminOrderEvents = (orderId) =>
  rows(supabase.from('order_events').select('*').eq('order_id', orderId).order('created_at'))
export const adminOrderChat = (orderId) => rpc('admin_order_chat', { p_order_id: orderId })
export const resolveDispute = (id, outcome, note) => rpc('admin_resolve_dispute', { p_order_id: id, p_outcome: outcome, p_note: note || null })
export const forceRefund = (id, note) => rpc('admin_force_refund', { p_order_id: id, p_note: note })

export const adminDeposits = (status) => {
  let q = supabase.from('deposit_requests').select('*, user:profiles!deposit_requests_user_id_fkey(id, full_name)').order('created_at', { ascending: false }).limit(150)
  if (status) q = q.eq('status', status)
  return rows(q)
}
export const adminWithdrawals = (status) => {
  let q = supabase.from('withdrawal_requests').select('*, user:profiles!withdrawal_requests_user_id_fkey(id, full_name)').order('created_at', { ascending: false }).limit(150)
  if (status) q = q.eq('status', status)
  return rows(q)
}
export const reviewDeposit = (id, approve, note) => rpc('admin_review_deposit', { p_id: id, p_approve: approve, p_note: note || null })
export const reviewWithdrawal = (id, paid, ref, note) => rpc('admin_review_withdrawal', { p_id: id, p_paid: paid, p_ref: ref || null, p_note: note || null })
export const adjustWallet = (user, amount, note) => rpc('admin_adjust_wallet', { p_user: user, p_amount: amount, p_note: note })

export const setUserBan = (user, banned, reason) => rpc('admin_set_user_ban', { p_user: user, p_banned: banned, p_reason: reason || null })

export const adminListings = (search, status) => {
  let q = supabase.from('listings').select('id, title, price, status, image_url, category, views, created_at, hidden_reason, seller:profiles(id, full_name)').order('created_at', { ascending: false }).limit(100)
  if (status) q = q.eq('status', status)
  if (search) q = q.ilike('title', `%${search.replace(/[%_,()]/g, ' ')}%`)
  return rows(q)
}
export const setListingHidden = (id, hidden, reason) => rpc('admin_set_listing_hidden', { p_listing_id: String(id), p_hidden: hidden, p_reason: reason || null })
export const deleteListingAdmin = (id, reason) => rpc('admin_delete_listing', { p_listing_id: String(id), p_reason: reason || null })

export const adminAudit = () =>
  rows(supabase.from('admin_actions').select('*, admin:profiles(full_name)').order('created_at', { ascending: false }).limit(100))

export const setSetting = (key, value) => rpc('admin_set_setting', { p_key: key, p_value: String(value) })
export async function fetchSettings() {
  const data = await rows(supabase.from('app_settings').select('key, value'))
  return Object.fromEntries(data.map((r) => [r.key, r.value]))
}
