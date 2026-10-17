# Bachelorer Dokan v2: Upgrade Guide

What changed: live chat status, a real wallet/ledger, profile & post editing, a full admin panel,
instant report alerts, and a premium UI. Follow the steps in order.

## 1. Database (Supabase SQL Editor)
Run these **in order**, each one once (they are safe to re-run):

    supabase/04_chat_profile_notifications.sql
    supabase/05_wallet_payments.sql
    supabase/06_reports.sql

(01-03 are already done.) 

## 2. Storage bucket for profile photos
Supabase > Storage > New bucket: name **avatars**, **Public ON**. (Policies are created by file 04.)

## 3. Make yourself admin
SQL Editor, with your real login email:

    update public.profiles set is_admin = true
    where id = (select id from auth.users where email = 'you@example.com');

Log out and in; **Admin Panel** appears in the account menu (also at `/admin`).

## 4. Realtime
Files 04-06 add the needed tables to the `supabase_realtime` publication. Nothing to click.
If chat ticks never turn blue, check Database > Replication that `messages` is enabled.

## 5. Deploy the code
Copy `src/` over your project, run `npm run dev`, test. No new npm packages are needed.

## 6. Test the whole money flow BEFORE going live
The site starts in **test mode**: Wallet shows "+৳500 / +৳2000" play-money buttons.
1. Account A (seller) posts an item. Account B (buyer) tops up play money, buys via escrow.
2. A marks handed over, B confirms. A's wallet now has the money, your fee is in Admin > Dashboard.
3. Try a dispute and resolve it from Admin > Orders.
4. Try Withdraw (A) and process it in Admin > Payments.

## 7. Going live with real money
Admin > Settings:
1. Enter your **bKash / Nagad / Rocket number(s)** (the numbers users will send money to).
2. Zero out the play money: Admin > Users > wallet icon > subtract each tester's balance.
3. Switch to **Live mode**.

How real deposits work (the standard way to run this without a payment-gateway merchant account):
user sends money to your number > submits amount + TrxID > you check it in your bKash/Nagad app >
tap **Approve** in Admin > Payments > the wallet is credited instantly. A TrxID can never be used twice.
Withdrawals: you send the money from your app, paste the payout TrxID, tap **Sent**.

**Fully automatic deposits** need an official gateway (bKash Payment Gateway, SSLCommerz, aamarPay...).
That requires a merchant account/contract with them, which I can't create for you. When you have one,
the wallet is ready for it: the gateway's webhook only has to call `_wallet_apply(...)` with a unique
idempotency key (kind `deposit`) from a server route using the service-role key. Ask me and I'll wire it.

## 8. Instant alerts to your phone (optional, recommended)
Reports/disputes/deposits already ping you inside the site (bell + sound + toast) whenever an admin
page is open. To also get them on Telegram when the site is closed:
1. Telegram > @BotFather > /newbot > copy the token. Message your bot once, then open
   `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy your `chat.id`.
2. Put `ADMIN_WEBHOOK_SECRET` (any long random string), `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`,
   `NEXT_PUBLIC_SITE_URL` in your hosting env vars.
3. Supabase > Database > Webhooks > Create: table `admin_alerts`, event `Insert`, HTTP POST to
   `https://YOUR-SITE/api/webhooks/admin-alert`, header `x-webhook-secret` = your secret.

## What was added, by your 6 points
1. **Chat**: sent / delivered / seen ticks (blue when seen), typing indicator, online dot, "last seen", live updates.
2. **Money**: wallet + append-only ledger, escrow moves real wallet balance, deposits (TrxID-verified),
   withdrawals, fees, daily limits, idempotent (no double credit), admin audit log. Browser can't touch balances.
3. **Profile / posts**: edit profile (photo, cover, bio, university...), public profile page, edit post, my-posts
   manager (edit, mark sold, reopen, delete), view counter.
4. **Admin panel** `/admin`: dashboard, reports, orders & disputes, payments, products, users, settings, audit log.
5. **Reports**: "Report" on every product and profile; admins are alerted instantly; priority levels; 3 different
   reporters auto-hide the product until reviewed; actions: investigate, dismiss, hide, delete, warn, ban.
6. **UI**: new navbar (search, wallet balance, notifications), hero, category tiles, how-it-works, footer, seller cards.

## Security notes
- `is_admin`, `is_banned` are not readable or writable from the browser. Admins can only be created via SQL (step 3).
- Every admin action re-checks admin status in the database and is written to `admin_actions`.
- Admins reading a dispute's chat is logged (`chat.view`).
- Banned users cannot post, message or order.
