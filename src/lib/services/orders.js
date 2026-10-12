import { supabase } from '@/lib/supabase'

const ORDER_SELECT = `
  *,
  buyer:profiles!orders_buyer_id_fkey(id, full_name, avatar_url),
  seller:profiles!orders_seller_id_fkey(id, full_name, avatar_url)
`

let configPromise
// Public settings (payment mode, fee). Cached for the page's lifetime.
export function getEscrowConfig() {
  configPromise ??= supabase
    .from('app_settings')
    .select('key, value')
    .then(({ data }) => {
      const s = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]))
      return {
        mode: s.payments_mode ?? 'test',
        feeBps: Number(s.escrow_fee_bps ?? 0),
        autoReleaseHours: Number(s.auto_release_hours ?? 72),
      }
    })
  return configPromise
}

export const calcFee = (price, feeBps) => Math.round((Number(price) * feeBps) / 100) / 100

async function rpc(name, args) {
  const { data, error } = await supabase.rpc(name, args)
  if (error) throw error
  return data
}

export const createOrder = (listingId, note) =>
  rpc('create_order', { p_listing_id: String(listingId), p_note: note?.trim() || null })

/**
 * THE swap point for real payments.
 * Test mode: the database marks the order as funded instantly (no money moves).
 * Live mode: replace the body with a redirect to your gateway checkout
 * (SSLCommerz / bKash / aamarPay...). The gateway's server-to-server callback then
 * calls `fund_order` with the service-role key. See GUIDE.md, "Going live".
 */
export async function payForOrder(orderId) {
  const result = await rpc('simulate_payment', { p_order_id: orderId })
  if (result !== 'funded') throw new Error(result) // e.g. LISTING_UNAVAILABLE
}

export const markDelivered = (orderId) => rpc('mark_delivered', { p_order_id: orderId })
export const confirmReceipt = (orderId) => rpc('confirm_receipt', { p_order_id: orderId })
export const cancelOrder = (orderId) => rpc('cancel_order', { p_order_id: orderId })
export const openDispute = (orderId, reason) => rpc('open_dispute', { p_order_id: orderId, p_reason: reason })

export async function fetchOrders() {
  const { data, error } = await supabase.from('orders').select(ORDER_SELECT).order('created_at', { ascending: false }).limit(100)
  if (error) throw error
  return data ?? []
}

export async function fetchOrder(id) {
  const { data, error } = await supabase.from('orders').select(ORDER_SELECT).eq('id', id).maybeSingle()
  if (error) throw error
  return data
}

export async function fetchOrderEvents(orderId) {
  const { data, error } = await supabase
    .from('order_events')
    .select('id, from_status, to_status, note, created_at, actor_id')
    .eq('order_id', orderId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data ?? []
}
