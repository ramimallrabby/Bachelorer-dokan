// Our SQL functions raise short codes (e.g. 'LISTING_UNAVAILABLE'); map them to Bangla here.
const CODES = {
  NOT_AUTHENTICATED: 'আগে লগইন করুন।',
  NOT_ALLOWED: 'এই কাজটি করার অনুমতি আপনার নেই।',
  LISTING_NOT_FOUND: 'প্রোডাক্টটি আর পাওয়া যাচ্ছে না।',
  LISTING_NO_SELLER: 'এই প্রোডাক্টের বিক্রেতার তথ্য নেই, তাই এখানে চ্যাট বা কেনা যাবে না।',
  LISTING_UNAVAILABLE: 'প্রোডাক্টটি আর পাওয়া যাচ্ছে না। হয়তো অন্য কেউ আগেই কিনে ফেলেছেন।',
  LISTING_RESERVED: 'চালু অর্ডার থাকায় এখন এটি বদলানো যাবে না।',
  OWN_LISTING: 'নিজের প্রোডাক্ট নিজে কেনা যাবে না।',
  INVALID_PRICE: 'প্রোডাক্টের দাম ঠিক নেই, তাই কেনা যাচ্ছে না।',
  ORDER_NOT_FOUND: 'অর্ডারটি খুঁজে পাওয়া যায়নি।',
  INVALID_STATE: 'অর্ডারের অবস্থা বদলে গেছে। পেজটি রিফ্রেশ করে আবার দেখুন।',
  PAYMENTS_LIVE: 'টেস্ট পেমেন্ট বন্ধ। পেমেন্ট গেটওয়ে দিয়ে টাকা দিন।',
  REASON_TOO_SHORT: 'সমস্যাটি অন্তত কয়েক শব্দে লিখুন।',
}

export function friendlyError(err, fallback = 'কিছু একটা সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।') {
  if (!err) return fallback
  if (err.name === 'AbortError') return null // cancelled request, not a real error

  const msg = String(err.message || '')
  const low = msg.toLowerCase()
  const code = err.code

  if (CODES[msg]) return CODES[msg]
  if (low.includes('failed to fetch') || low.includes('networkerror') || low.includes('load failed'))
    return 'ইন্টারনেট সংযোগ নেই বা দুর্বল। সংযোগ দেখে আবার চেষ্টা করুন।'

  // Auth
  if (low.includes('invalid login credentials')) return 'ইমেইল বা পাসওয়ার্ড ভুল।'
  if (low.includes('user already registered')) return 'এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা আছে। লগইন করুন।'
  if (low.includes('email not confirmed')) return 'আগে ইমেইলে পাঠানো লিংকে ক্লিক করে অ্যাকাউন্ট ভেরিফাই করুন।'
  if (low.includes('password should be at least')) return 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।'
  if (low.includes('rate limit') || code === 'over_email_send_rate_limit')
    return 'অল্প সময়ে অনেকবার চেষ্টা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।'

  // Postgres / PostgREST
  if (code === '42501' || low.includes('row-level security') || low.includes('permission denied'))
    return 'এই কাজের অনুমতি নেই। লগইন করা আছে কিনা দেখুন।'
  if (code === 'PGRST202' || code === '42P01' || code === 'PGRST205' || low.includes('does not exist'))
    return 'এই ফিচারের ডাটাবেস সেটআপ বাকি আছে। /supabase ফোল্ডারের SQL ফাইলটি চালান।'
  if (code === '23505') return 'এটি আগেই করা হয়েছে।'
  if (low.includes('bucket not found')) return 'ছবি রাখার বাকেট (product-images) পাওয়া যায়নি।'

  return fallback
}
