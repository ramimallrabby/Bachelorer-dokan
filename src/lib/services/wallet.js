import { supabase } from '@/lib/supabase'

async function rpc(name, args) {
  const { data, error } = await supabase.rpc(name, args)
  if (error) throw error
  return data
}

export async function fetchWallet(userId) {
  const { data, error } = await supabase.from('wallets').select('balance').eq('user_id', userId).maybeSingle()
  if (error) throw error
  return Number(data?.balance ?? 0)
}

export async function fetchLedger(userId, limit = 50) {
  const { data, error } = await supabase
    .from('ledger_entries')
    .select('id, kind, amount, balance_after, note, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data ?? []
}

export async function fetchMyRequests(userId) {
  const [d, w] = await Promise.all([
    supabase.from('deposit_requests').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(20),
    supabase.from('withdrawal_requests').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(20),
  ])
  if (d.error) throw d.error
  if (w.error) throw w.error
  return { deposits: d.data ?? [], withdrawals: w.data ?? [] }
}

export const testTopup = (amount) => rpc('test_topup', { p_amount: amount })
export const submitDeposit = ({ amount, method, sender, trx }) =>
  rpc('submit_deposit', { p_amount: amount, p_method: method, p_sender: sender || null, p_trx: trx })
export const requestWithdrawal = ({ amount, method, account, name }) =>
  rpc('request_withdrawal', { p_amount: amount, p_method: method, p_account: account, p_name: name || null })

// Live balance: the wallets row changes whenever money moves.
export function subscribeWallet(userId, onChange) {
  const channel = supabase
    // এখানে Date.now() যুক্ত করা হয়েছে যাতে চ্যানেল ক্র্যাশ না করে
    .channel(`wallet:${userId}-${Date.now()}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'wallets', filter: `user_id=eq.${userId}` }, onChange)
    .subscribe()
  return () => supabase.removeChannel(channel)
}