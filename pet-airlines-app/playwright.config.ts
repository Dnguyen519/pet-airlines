import { defineConfig, devices } from '@playwright/test'

// The webServer command below loads `.env.local` via `node --env-file`
// (same pattern as `npm run db:migrate`), so the DB helpers in
// `e2e/helpers/db.ts` run in a SEPARATE process (the Playwright test
// runner itself) and need `.env.local` loaded independently — see the
// `process.loadEnvFile?.()` call there.
//
// This config assumes `npm run build` has already produced a `.next`
// production build — the webServer intentionally runs `next start`, not
// `next dev` or a chained build, so a stale build fails fast with a
// connection-refused rather than silently testing yesterday's code. See
// pet-airlines-app/README.md "Running the e2e suite".
const PORT = 3130
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  globalTeardown: './e2e/global-teardown.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  timeout: 30_000,
  expect: { timeout: 10_000 },

  webServer: {
    command: 'node --env-file=.env.local node_modules/.bin/next start -p 3130',
    port: PORT,
    reuseExistingServer: false,
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true },
    },
  ],
})
