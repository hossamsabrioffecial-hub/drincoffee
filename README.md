# DRINCOFFEE — Luxury Coffee E‑commerce + Admin

Black & gold luxury coffee storefront (EN/AR, RTL-ready) built with Next.js 14
App Router, Tailwind, Framer Motion, and Zustand — plus a matching dark-theme
admin dashboard for products, orders, and site content.

Data is stored in **localStorage** for this demo build, but every data
access goes through `lib/local-db.ts`, which is shaped like Supabase queries
(`select`, `insert`, `update`, `delete` per "table"). Swapping to Supabase
later means rewriting the functions inside that one file — no call sites
change. `lib/types.ts` already matches the intended Supabase schema.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you have; test mode works with none
npm run dev
```

Visit `http://localhost:3000` for the store and `http://localhost:3000/admin`
for the dashboard.

**Admin login:** any email, password `drincoffee2024` (set via
`NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local`). This is intentionally simple
per the brief — see "Upgrading admin auth" below before going to production.

## What's included

**Storefront**
- Home (hero, featured products, story section), full product grid with
  category filter (Bag / Tin / Capsule), product detail page
- Cart (drawer + full page) via Zustand, persisted to localStorage
- Checkout: customer details, Cash on Delivery or Pay Online, delivery fee
  pulled from admin-managed content
- `/pay/[orderId]`: order summary + provider picker (Telr / Stripe /
  PayTabs), test-mode redirect flow that marks the order Paid
- WhatsApp auto-notify: placing an order opens
  `https://wa.me/<number>?text=...` with the order summary
- English default (LTR), Arabic toggle (RTL) — `<html dir>` switches live;
  Arabic headings use a calligraphic accent face, body copy uses an
  Arabic-native sans face

**Admin (`/admin`, dark theme, mobile responsive)**
- Dashboard: total orders, revenue today, low-stock count, quick lists
- Products: add / edit / delete, image upload (stored as data URL) or image
  URL, bilingual name/description, category, stock, drag-to-reorder
- Orders: table with search/filter by status, click a row for full detail
  (items, address, notes), change status, tap-to-call the customer,
  "Create payment link" (copies `/pay/ORDER_ID` and switches the order to
  Online payment), CSV export
- Content: hero title/subtitle (EN/AR), story title/body (EN/AR), Instagram
  URL, WhatsApp number, delivery price — all read live by the storefront

## Payments — UAE ready, test mode by default

`lib/payments/{telr,stripe,paytabs}.ts` each export a `create*` function.
With no live keys in `.env.local`, they short-circuit into a **test-mode**
redirect that simulates a successful payment (`/pay/[orderId]?status=success`),
so the full flow — order → pay page → provider picked → Paid — works without
any account setup. The real API calls are written and commented directly
above the test-mode fallback in each file; uncomment and wire up once you
have live credentials:

```
NEXT_PUBLIC_TELR_STORE_ID=
TELR_AUTH_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_PAYTABS_PROFILE_ID=
PAYTABS_SERVER_KEY=
```

Note: Telr and PayTabs order-creation calls belong on the server (they use
secret keys) — when you go live, move those two `create*` calls into a
Next.js Route Handler (e.g. `app/api/pay/telr/route.ts`) instead of calling
them from the client page, and have the client fetch that route. Stripe's
Checkout Session creation should move the same way.

## Upgrading admin auth for production

The current login checks a password against `NEXT_PUBLIC_ADMIN_PASSWORD`
entirely client-side — fine for an internal demo, not for production (it
ships in the JS bundle). Before launch, swap `AdminAuthDB` in
`lib/local-db.ts` for real auth — Supabase Auth is the natural fit since the
rest of the data layer is already shaped for Supabase — and protect
`/admin/*` with middleware that checks a server-verified session.

## Moving from localStorage to Supabase

1. Create the four tables in Supabase matching `lib/types.ts`: `products`,
   `orders`, `site_content` (single row), and use Supabase Auth for admin
   users instead of `AdminAuthDB`.
2. Rewrite each function body in `lib/local-db.ts` to call
   `supabase.from('products').select()` etc. Keep the same function
   signatures (`ProductsDB.all()`, `OrdersDB.create()`, ...) so no other
   file needs to change.
3. Move image uploads from base64-in-localStorage to Supabase Storage; swap
   the `<input type="file">` handler in `ProductForm.tsx` to upload and
   store the returned public URL instead of a data URL.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (and
   `SUPABASE_SERVICE_ROLE_KEY` for server-side admin writes) to
   `.env.local`.

## Deploying

Deploy-ready for Vercel:

```bash
npm run build
```

Push to a GitHub repo, import into Vercel, add the env vars from
`.env.example` you actually have values for (everything else safely falls
back to test mode), and deploy. No other config needed.

## Notes

- WhatsApp auto-open uses `window.open`, which some mobile browsers treat as
  a popup — if it's blocked, the order still saves and the confirmation page
  still shows; consider also surfacing a "Message us on WhatsApp" button as
  a fallback link on the success page.
- Stock is decremented client-side at checkout for this demo; move that into
  a server-side transaction (Route Handler or Supabase RPC) before launch to
  avoid race conditions between simultaneous orders.
