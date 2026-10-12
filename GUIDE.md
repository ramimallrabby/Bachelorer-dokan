# Bachelorer Dokan: upgrade guide

Same stack (Next.js App Router + Supabase + Tailwind). No rewrite: drop the files in, run three SQL files, done.

Verified before shipping: the code builds on Next 14, 15 and 16 (React 18 and 19, Tailwind 3 and 4), and is lint-clean on 14 and 15 (Next 16 no longer runs lint during build). The SQL was run against a real Postgres 16 with a Supabase-style harness (roles, `auth.uid()`, storage policies), twice each to prove it is re-runnable, with both `bigint` and `uuid` listing ids, and attacked as a malicious user (see "Security checks").

---

## 1. Setup (about 10 minutes)

### 1.1 Copy the files
Unzip over your project. These **replace** your old files:

| File | What happened |
|---|---|
| `src/app/page.js` | Now a thin shell; the real work moved into components |
| `src/app/add-product/page.js` | Login-gated; form lives in `components/listings/ListingForm.jsx` |
| `src/app/product/[id]/page.js` | Server-rendered with SEO/link-preview metadata |
| `src/lib/supabase.js` | Reads keys from env instead of hard-coding them |
| `src/app/layout.js` | **Replaces yours.** Adds fonts, auth provider, navbar, toasts. If you had custom code in it, re-add it |

Everything else is new. `jsconfig.json` adds the `@/` import alias (`@/components/...`). If you already have a `jsconfig.json`, just make sure it contains `"paths": { "@/*": ["./src/*"] }`.

> Heads-up: in your zip, `product/[id]/page.js` imported `../../../../lib/supabase`, which resolves **outside** `src/`. All imports now use `@/lib/...`.

### 1.2 Install the one new dependency
```bash
npm install sonner
```
(Toasts. If your `@supabase/supabase-js` is older than 2.39, also run `npm install @supabase/supabase-js@latest`.)

I deliberately did **not** add Framer Motion: every animation here is CSS (and respects `prefers-reduced-motion`), so you carry one dependency less.

### 1.3 Environment variables
```bash
cp .env.local.example .env.local
```
Paste your anon key (Supabase → Project Settings → API). Restart `npm run dev`.

### 1.4 Run SQL step 1
Supabase → SQL Editor → paste `supabase/01_auth_and_listings.sql` → Run.

It **adds** columns (`seller_id`, `category`, `condition`, `status`); nothing is deleted. It also:
- creates `profiles` (auto-filled on signup),
- replaces your old open "anyone can insert" policies with proper Row Level Security,
- locks Storage so only logged-in users can upload, and only into their own folder.

> After this, the **old** anonymous posting stops working on purpose. That's the point of auth.

Your existing listings have no owner. To claim them for your own account (after you've signed up once):
```sql
update public.listings set seller_id = '<your user id from Authentication → Users>' where seller_id is null;
```

### 1.5 Supabase Auth settings
Authentication → Providers → **Email**:
- While developing: turn **off** "Confirm email" (otherwise signups wait for an email, and the built-in mailer is heavily rate-limited).
- Before launch: turn it back on and set up a real SMTP provider (Authentication → SMTP), and set **Site URL** + **Redirect URLs** to your production domain.

Now `npm run dev`. You now have: premium UI, sign-up/login, seller-linked posting, search, filters, pagination.

---

## 2. What changed, and why

### Frontend
- **Design direction.** Deep-jade aurora hero with a frosted-glass search panel (the one bold moment). Marigold is reserved for money actions only (Search, Buy via Escrow, Pay). Headlines and prices use *Noto Serif Bengali* (a nod to book culture; prices read like a price tag on a book), UI text uses *Hind Siliguri*: both render Bangla properly. Shadows are jade-tinted, not generic grey.
- **Reusable components** in `src/components`: `ui/` (Button, Form fields, Dialog, Feedback, Media, Icons), `layout/Navbar`, `home/*`, `listings/*`, `product/*`, `chat/*`, `escrow/*`, `auth/*`.
- **Styling is Tailwind-version-proof.** Brand tokens, aurora, shimmer and dialog polish live in `src/app/dokan.css` (plain CSS, imported after `globals.css` so it beats create-next-app's default dark-mode rules). It works on Tailwind v3 and v4 with no config changes.
- **Accessibility floor:** keyboard focus rings, `aria-*` on forms/toasts/pagination/tabs, native `<dialog>` (free focus-trap + Esc), reduced-motion respected, responsive down to phones (2-column grid, sticky buy bar, bottom-sheet filters).

### Backend and robustness
- **Pagination** is server-side (`range()` + exact count), 12 per page, synced to the URL (`/?q=drawing&page=2`): shareable links, working back button.
- **Smarter queries.** Cards select only the columns they show (no description download); search matches *every word* across title/description/location; user input is sanitized before it reaches PostgREST's `or()` syntax; in-flight requests are aborted when filters change so a slow response can't overwrite a newer one.
- **Loading / error / empty states** everywhere: skeleton cards on first load, dimmed-but-visible cards while paging, inline retry panels, and toasts with plain-Bangla messages. All error mapping is in one file: `src/lib/errors.js`.
- **Image upload:** drag-and-drop, preview, in-browser compression (~6 MB phone photo → a few hundred KB), and the uploaded photo is deleted if the database insert fails (no orphans).
- **Product pages** are server components with Open Graph metadata, so a pasted link shows the photo and price on Facebook/WhatsApp.

### Architecture
```
UI components  ->  hooks (state, URL, realtime)  ->  lib/services (all Supabase calls)  ->  Postgres (RLS + functions)
```
Pages never call `supabase` directly; services do. Security does not depend on the UI: RLS and SQL functions enforce it, so a hacked client can't cheat.

---

## 3. Auth: what's enforced where
- Posting requires login (UI gate `RequireAuth` + **database rule**: `seller_id` must equal the logged-in user, so nobody can post as someone else).
- Sellers can edit/delete only their own listings, and can never touch `status` or `seller_id` directly.
- Profiles are public (name, avatar); phone numbers are intentionally **not** stored. Contact happens through chat.

---

## 4. Phase 2: Real-time chat

Run `supabase/02_chat.sql`. That's all; the UI is already wired.

**How it works**
```
Buyer clicks "Chat with Seller"
  -> rpc start_conversation(listing)         (creates/reopens ONE thread per buyer+listing)
  -> /messages/<id>
INSERT into messages  ──►  Postgres trigger updates inbox preview
                       └►  Supabase Realtime pushes the row to both participants (filtered by RLS)
```
- Tables: `conversations` (one per buyer+listing), `messages`. Both are in the `supabase_realtime` publication.
- RLS: only the two participants can read or write; nobody can edit/delete messages; `sender_id` can't be spoofed.
- UI: two-pane inbox on desktop, one pane on phones; optimistic send (your text appears instantly, and is restored to the box if sending fails); unread badges in the navbar and inbox; "load earlier"; day separators; auto-sync after the tab sleeps or the connection drops; Enter sends, Shift+Enter = newline, and Bangla phonetic keyboards (IME) don't send by accident.

**Test it:** open the site in a normal window and an incognito window, sign up two users, post a listing as A, chat as B.

**If messages don't arrive live:** Database → Replication → check `messages` is enabled for `supabase_realtime` (the SQL does it, but verify), and check the browser console for a `CHANNEL_ERROR`.

**Easy upgrades later:** typing indicator (Realtime *broadcast*), push/email notification via a Database Webhook + Edge Function, image attachments (reuse the compress + upload code).

---

## 5. Phase 3: Escrow

Run `supabase/03_escrow.sql`. The "Buy via Escrow" button, order pages and timeline are already wired.

### 5.1 The flow
```
 pending_payment ──pay──► funded ──seller: handed over──► delivered ──buyer confirms──► completed
       │                    │  │                              │
     cancel          seller cancels                           └─ silent for 72h ─► completed (auto-release)
   (cancelled)       (refunded)
                        └────── either side: dispute ──► disputed ──admin──► completed | refunded
```
| Step | Who | What the database does |
|---|---|---|
| Buy via Escrow | Buyer | `create_order` snapshots title/price, computes fee, opens a chat thread |
| Pay | Buyer | `simulate_payment` (test) or gateway webhook (live) → `funded`; **listing becomes `reserved`**; rival unpaid orders auto-cancel |
| Hand over | Seller | `mark_delivered` → starts the auto-release timer |
| Confirm | Buyer | `confirm_receipt` → `completed`; listing becomes `sold` |
| Problem | Either | `open_dispute` → money stays held until *you* decide |

Why it's trustworthy:
- **The browser can't write to `orders` at all.** Only the SQL functions can, and each checks *who* is calling and *whether the move is legal*.
- First payer wins (row locks); a unique index guarantees at most one live order per listing.
- Every transition is logged in `order_events` (the timeline reads from it, and it's your audit trail).
- Prices are snapshotted, so editing a listing later can't change an existing order.

### 5.2 Test mode (default)
`payments_mode = 'test'`: the Pay button marks the order as funded instantly. **No money moves.** The UI shows a "টেস্ট মোড" banner. Walk the whole flow with two accounts.

Settings live in `app_settings`:
```sql
update app_settings set value = '200' where key = 'escrow_fee_bps';        -- 2% fee (default 0 = free)
update app_settings set value = '48'  where key = 'auto_release_hours';
```

### 5.3 Deciding disputes (you are the admin)
In the SQL editor:
```sql
select id, listing_title, amount, dispute_reason from orders where status = 'disputed';
select public.resolve_dispute('<order-id>', 'release', 'seller proved handover');  -- seller gets paid
select public.resolve_dispute('<order-id>', 'refund',  'item not as described');   -- buyer refunded
```

### 5.4 Auto-release and expiry
`run_escrow_housekeeping()` cancels unpaid orders after 30 min and releases delivered orders after 72 h. Schedule it: Database → Extensions → enable **pg_cron**, then:
```sql
select cron.schedule('escrow-housekeeping', '*/10 * * * *', $$ select public.run_escrow_housekeeping() $$);
```

### 5.5 Going live with real money (the part that needs care)
The state machine is done; what's missing is a real payment gateway, which needs a merchant account you must obtain yourself. Candidates for Bangladesh include SSLCommerz, bKash's merchant/checkout API and aamarPay: compare their fees and, importantly, **whether they support holding or delayed settlement for marketplaces**, and how you would pay sellers out.

1. **Change one function.** In `src/lib/services/orders.js`, `payForOrder()` is the only place that fakes payment. In live mode it should create a payment session with your gateway and redirect the buyer to its checkout.
2. **Add a webhook route** that the gateway calls server-to-server after payment. It must (a) verify the gateway's signature or re-query the gateway for the payment status, (b) then call `fund_order` with the **service-role** key. Template (fill in your gateway's verification; every gateway differs):
   ```js
   // src/app/api/payments/webhook/route.js
   import { createClient } from '@supabase/supabase-js'

   const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

   export async function POST(req) {
     const payload = await req.json()
     // TODO: verify the gateway signature / confirm the payment with the gateway API. Never trust the body alone.
     const { error } = await admin.rpc('fund_order', {
       p_order_id: payload.order_id, p_provider: 'your-gateway', p_ref: payload.transaction_id,
     })
     return Response.json({ ok: !error }, { status: error ? 500 : 200 })
   }
   ```
   `SUPABASE_SERVICE_ROLE_KEY` goes in your host's server env vars: **never** prefix it with `NEXT_PUBLIC_` and never commit it. `fund_order` is idempotent, so gateway retries are safe.
3. **Flip the switch:** `update app_settings set value = 'live' where key = 'payments_mode';` This also permanently disables `simulate_payment`.
4. **Payouts.** `completed` means "release authorised". Actually sending money to the seller (bKash/Nagad/bank) is a separate step: start manually (a daily batch from `orders where status = 'completed'`), then automate through your gateway's disbursement API. Consider adding `payout_ref` / `paid_out_at` columns.
5. **Before real money:** holding other people's funds can be a regulated activity. Talk to your payment provider and a lawyer about how escrow should be structured and what your Terms and refund policy must say. I can't judge that for you.

---

## 6. Security checks I ran (on a real Postgres)
Attempts that are correctly **blocked**: posting as someone else; anonymous posting; editing/deleting another seller's listing; setting a listing's `status` or `seller_id` directly; reading or writing someone else's chat; spoofing `sender_id`; editing/deleting messages; writing to `orders` directly; confirming/paying/delivering someone else's order; buying your own item; buying an already-reserved item; confirming twice; calling server-only functions (`fund_order`, `resolve_dispute`) as a user; `simulate_payment` once `live`.
Behaviour verified: double-click creates one order; first payer wins and rival orders cancel; dispute → admin refund re-opens the listing; auto-release and expiry; the audit trail reads `pending_payment > funded > delivered > completed`.

---

## 7. Troubleshooting
| Symptom | Fix |
|---|---|
| "Supabase env vars are missing" | Create `.env.local` (step 1.3) and restart the dev server |
| Toast: "এই ফিচারের ডাটাবেস সেটআপ বাকি আছে" | You haven't run that phase's SQL file yet |
| Homepage shows an error toast right after copying the files | Run `supabase/01_auth_and_listings.sql` (step 1.4): the homepage query needs the new `status` column |
| Image upload says permission denied | Bucket must be named exactly `product-images`; re-run step 1 SQL (storage policies) |
| Logged in but "অনুমতি নেই" | Session expired: log out and in. If it persists, check the policy list on the table |
| Signup says "check your email" but none arrives | Disable "Confirm email" while developing (1.5) |
| Fonts don't load in your dev environment | They download from Google Fonts at build/dev time: needs internet once |

## 8. Next steps worth considering
Edit-listing page · "my listings" dashboard · profile page with avatar and university · Google sign-in (Supabase → Auth → Providers) · password reset page · email/push notifications on new message or order change · reviews after completed orders · image gallery (multiple photos) · Bangla/English language toggle.
