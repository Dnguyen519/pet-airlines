import { expect, test } from '@playwright/test'

import { POPULAR_ROUTES } from '../src/lib/countries'
import { SITE_URL } from '../src/lib/site'
import sitemap from '../src/app/sitemap'

// Every route the site advertises via sitemap.ts, plus the static top-level
// pages that already exist there. Importing sitemap() directly (rather than
// hand-typing the route list) means a new page added to the sitemap is
// automatically covered here — see S2-02 blueprint row.
const SITE_ROUTES = sitemap().map((entry) => entry.url.replace(SITE_URL, '') || '/')

test.describe('every sitemap page renders', () => {
  for (const path of SITE_ROUTES) {
    test(`${path} returns 200, one h1, no console errors, no horizontal overflow`, async ({ page }) => {
      const consoleErrors: string[] = []
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text())
      })

      const response = await page.goto(path)
      expect(response?.status(), `${path} should return 200`).toBe(200)

      const h1s = page.locator('h1')
      await expect(h1s).toHaveCount(1)

      expect(consoleErrors, `console errors on ${path}: ${consoleErrors.join(' | ')}`).toEqual([])

      const overflowsHorizontally = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      )
      expect(overflowsHorizontally, `${path} overflows horizontally at this viewport`).toBe(false)
    })
  }
})

test('every sitemap page has a unique <title>', async ({ page }) => {
  const titles = new Set<string>()
  for (const path of SITE_ROUTES) {
    await page.goto(path)
    const title = await page.title()
    expect(title.length, `${path} has an empty <title>`).toBeGreaterThan(0)
    expect(titles.has(title), `duplicate <title> "${title}" — first seen before ${path}`).toBe(false)
    titles.add(title)
  }
})

test.describe('unknown routes 404', () => {
  for (const path of ['/routes/does-not-exist', '/test-debug']) {
    test(`${path} returns 404`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBe(404)
    })
  }
})

test.describe('crawler surfaces', () => {
  for (const path of ['/robots.txt', '/sitemap.xml', '/llms.txt']) {
    test(`${path} returns 200`, async ({ request }) => {
      const response = await request.get(path)
      expect(response.status()).toBe(200)
    })
  }
})

test('sitemap.xml contains all 8 corridor URLs', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  const body = await response.text()

  expect(POPULAR_ROUTES.length).toBe(8)
  for (const route of POPULAR_ROUTES) {
    expect(body, `sitemap.xml missing corridor /routes/${route.slug}`).toContain(`/routes/${route.slug}`)
  }
})
