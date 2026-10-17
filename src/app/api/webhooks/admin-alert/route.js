// Instant phone alert for admins (new report, dispute, deposit, withdrawal).
// Wire-up: Supabase Dashboard > Database > Webhooks > table public.admin_alerts, event INSERT,
// HTTP POST to https://YOUR-SITE/api/webhooks/admin-alert with header  x-webhook-secret: <ADMIN_WEBHOOK_SECRET>
// Env: ADMIN_WEBHOOK_SECRET, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, NEXT_PUBLIC_SITE_URL (optional)
import { timingSafeEqual } from 'node:crypto'

const safeEqual = (a = '', b = '') => {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export async function POST(req) {
  const secret = process.env.ADMIN_WEBHOOK_SECRET
  if (!secret || !safeEqual(req.headers.get('x-webhook-secret') ?? '', secret)) {
    return new Response('forbidden', { status: 403 })
  }
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chat = process.env.TELEGRAM_CHAT_ID
  if (!token || !chat) return new Response('telegram not configured', { status: 200 })

  let payload
  try {
    payload = await req.json()
  } catch {
    return new Response('bad json', { status: 400 })
  }
  const r = payload?.record
  if (!r?.title) return new Response('ignored', { status: 200 })

  const site = process.env.NEXT_PUBLIC_SITE_URL || ''
  const text = [`🔔 ${r.title}`, r.body, r.link && site ? `${site}${r.link}` : null].filter(Boolean).join('\n')
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }),
  })
  return new Response(res.ok ? 'sent' : 'telegram error', { status: res.ok ? 200 : 502 })
}
