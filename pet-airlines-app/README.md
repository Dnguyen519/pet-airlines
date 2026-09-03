# pet-airlines-app

Next.js 14 (App Router, React 18) marketing site + quote-request funnel for
Pet Airlines. Backend is a single `inquiries` table on Railway Postgres —
there is no admin UI yet; leads are read directly from that table (or via
the `ADMIN_EMAIL` notification Resend sends on every submission).

## Environment

Copy `.env.example` to `.env.local` and fill in:

| Var | Source |
|---|---|
| `DATABASE_URL` | Railway Postgres — use the **public proxy** connection string (Vercel functions run outside Railway's private network, see the comment in `src/lib/db/client.ts`) |
| `RESEND_API_KEY` | Resend dashboard |
| `RESEND_FROM_EMAIL` | Verified Resend sending domain — leave blank until the domain is verified; email sends fail soft (logged, not thrown) until then |
| `ADMIN_EMAIL` | Where new-inquiry notifications are sent |
| `NEXT_PUBLIC_SITE_URL` | Used for absolute links + `sitemap.ts` |

## Development

```bash
npm install
npm run db:migrate   # applies drizzle/ migrations against DATABASE_URL
npm run dev           # next dev
```

## Before deploying / before running e2e

```bash
npm run typecheck
npm run lint
npm run build          # must succeed — e2e's webServer starts this build, not `next dev`
```

## Running the e2e suite

The Playwright config (`playwright.config.ts`) starts the app with
`next start` against the **production build**, not `next dev` — it does
**not** chain a build for you. Always build first:

```bash
npm run build
npm run test:e2e        # headless, list reporter
npm run test:e2e:ui     # interactive UI mode
```

The suite covers (`e2e/`):

- `pages.spec.ts` — every route in `src/app/sitemap.ts` returns 200 with
  exactly one `<h1>`, a unique `<title>`, no console errors, and no
  horizontal overflow (desktop 1440×900 + mobile 375×812 projects both run
  every spec); `/routes/does-not-exist` and `/test-debug` 404;
  `/robots.txt`, `/sitemap.xml`, `/llms.txt` return 200; the sitemap
  contains all 8 route-corridor URLs.
- `nav.spec.ts` — mobile hamburger menu open/close, link count, and
  Escape-to-close.
- `quote.spec.ts` — the `/quote` form's client-side validation, a full
  valid submission asserted against the database, `?from=&to=` query-param
  prefill, and the `POST /api/inquiries` API contract (validation errors,
  the honeypot fake-success path, `GET` → 405).

`e2e/helpers/db.ts` talks to the same `DATABASE_URL` directly via the
`postgres` package (not through the Next app) to assert rows exist and to
clean up every row it creates. All test-created rows use the `[QA] `
full-name prefix; `quote.spec.ts`'s `afterEach` sweeps that prefix
defensively even if an assertion above it throws.

## Deploy

Push to `main` — Vercel's git integration builds and deploys automatically.
There is no manual deploy step for this app.
