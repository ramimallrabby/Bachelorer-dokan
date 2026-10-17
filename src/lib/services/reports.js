import { supabase } from '@/lib/supabase'

export async function submitReport({ type, targetId, reason, details }) {
  const { data, error } = await supabase.rpc('submit_report', {
    p_type: type,
    p_target_id: String(targetId),
    p_reason: reason,
    p_details: details?.trim() || null,
  })
  if (error) throw error
  return data
}
