import { supabase } from '@/lib/supabase'

export async function fetchNotifications(limit = 25) {
  const { data, error } = await supabase
    .from('notifications')
    .select('id, kind, title, body, link, read_at, created_at')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data ?? []
}

export const markNotificationsRead = () => supabase.rpc('mark_notifications_read')
