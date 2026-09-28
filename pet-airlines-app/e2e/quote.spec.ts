import { expect, test } from '@playwright/test'

import { deleteInquiryByNumber, getInquiryByNumber } from './helpers/db'

const QA_FULL_NAME = '[QA] Sprint340 e2e'
const QA_EMAIL = 'qa+s340e2e@example.com'

function futureDateString(daysFromNow: number): string {
  const d = new Date()
  d.setDate(d.getDate() + daysFromNow)
  return d.toISOString().slice(0, 10)
}

// NOTE on cleanup: a global `delete where full_name like '[QA] %'` sweep in
// an afterEach here would race against other workers/projects running this
// same describe block concurrently (fullyParallel: true) — one worker's
// sweep can delete a row another worker just created and hasn't asserted
// against yet. So per-test cleanup here deletes only the exact row this
// test created; the defensive prefix-wide sweep for anything a crashed run
// left behind lives in `e2e/global-teardown.ts`, which runs once after
// every worker has finished.
test.describe('quote form', () => {
  test('empty submit shows client-side validation on at least 3 fields plus a summary', async ({ page }) => {
    await page.goto('/quote')

    await page.getByRole('button', { name: 'Get Your Free Quote' }).click()

    const invalidFields = page.locator('[aria-invalid="true"]')
    const invalidCount = await invalidFields.count()
    expect(invalidCount).toBeGreaterThanOrEqual(3)

    await expect(page.getByRole('alert').filter({ hasText: 'Please fix the following' })).toBeVisible()
  })

  test('valid submit shows a success panel with a PA- reference number and creates a DB row', async ({ page }) => {
    await page.goto('/quote')

    await page.getByLabel('Pet Type').selectOption('dog')
    await page.getByLabel('From Country').selectOption('CA')
    await page.getByLabel('From City').fill('Toronto')
    await page.getByLabel('To Country').selectOption('VN')
    await page.getByLabel('To City').fill('Hanoi')
    await page.locator('#travelDate').fill(futureDateString(30))
    await page.getByLabel('Full Name').fill(QA_FULL_NAME)
    await page.getByLabel('Email').fill(QA_EMAIL)

    await page.getByRole('button', { name: 'Get Your Free Quote' }).click()

    const successHeading = page.getByRole('heading', { name: 'Request received' })
    await expect(successHeading).toBeVisible()

    const referenceText = await page.locator('span.font-mono').innerText()
    expect(referenceText).toMatch(/^PA-/)

    const row = await getInquiryByNumber(referenceText)
    expect(row, `no DB row found for ${referenceText}`).toBeDefined()
    expect(row?.email).toBe(QA_EMAIL)
    expect(row?.status).toBe('new')

    await deleteInquiryByNumber(referenceText)
  })

  test('?from=CA&to=VN prefills both country selects', async ({ page }) => {
    await page.goto('/quote?from=CA&to=VN')

    await expect(page.getByLabel('From Country')).toHaveValue('CA')
    await expect(page.getByLabel('To Country')).toHaveValue('VN')
  })

  test('a submission persists first-touch + self-reported lead-source fields', async ({ page }) => {
    const qaFullName = '[QA] Sprint350 lead-source e2e'
    const qaEmail = 'qa+s350leadsource@example.com'

    // Seed a first-touch record BEFORE the app's own tracker script runs, so
    // FirstTouchTracker sees an already-valid record and no-ops (first touch
    // wins) — this pins down exactly what buildPayload() should read.
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'pa_first_touch_v1',
        JSON.stringify({
          referrerHost: 'chatgpt.com',
          referrerPath: '/c/abc123',
          landingPath: '/routes/canada-to-vietnam',
          utmSource: 'chatgpt.com',
          utmMedium: 'referral',
          utmCampaign: undefined,
          capturedAt: new Date().toISOString(),
        })
      )
    })

    await page.goto('/quote')

    await page.getByLabel('Pet Type').selectOption('dog')
    await page.getByLabel('From Country').selectOption('CA')
    await page.getByLabel('From City').fill('Toronto')
    await page.getByLabel('To Country').selectOption('VN')
    await page.getByLabel('To City').fill('Hanoi')
    await page.getByLabel('Full Name').fill(qaFullName)
    await page.getByLabel('Email').fill(qaEmail)
    await page.getByLabel('How did you hear about us?').selectOption('ai_assistant')
    await page.getByLabel('Tell us more').fill('asked ChatGPT about moving my dog to Canada')

    await page.getByRole('button', { name: 'Get Your Free Quote' }).click()
    await expect(page.getByRole('heading', { name: 'Request received' })).toBeVisible()

    const referenceText = await page.locator('span.font-mono').innerText()
    const row = await getInquiryByNumber(referenceText)

    expect(row, `no DB row found for ${referenceText}`).toBeDefined()
    expect(row?.source_channel).toBe('ai_assistant')
    expect(row?.source_detail_auto).toBe('chatgpt')
    expect(row?.source_self_reported).toBe('ai_assistant')
    expect(row?.source_self_detail).toBe('asked ChatGPT about moving my dog to Canada')
    expect(row?.source_referrer_host).toBe('chatgpt.com')
    expect(row?.source_landing_path).toBe('/routes/canada-to-vietnam')
    expect(row?.utm_source).toBe('chatgpt.com')

    await deleteInquiryByNumber(referenceText)
  })

  test('the "how did you hear about us" field is optional — a submission that leaves it blank still succeeds', async ({
    page,
  }) => {
    const qaFullName = '[QA] Sprint350 no-source e2e'
    const qaEmail = 'qa+s350nosource@example.com'

    await page.goto('/quote')

    await page.getByLabel('Pet Type').selectOption('cat')
    await page.getByLabel('From Country').selectOption('CA')
    await page.getByLabel('From City').fill('Toronto')
    await page.getByLabel('To Country').selectOption('VN')
    await page.getByLabel('To City').fill('Hanoi')
    await page.getByLabel('Full Name').fill(qaFullName)
    await page.getByLabel('Email').fill(qaEmail)
    // Deliberately leave "How did you hear about us?" and "Tell us more" untouched.

    await page.getByRole('button', { name: 'Get Your Free Quote' }).click()
    await expect(page.getByRole('heading', { name: 'Request received' })).toBeVisible()

    const referenceText = await page.locator('span.font-mono').innerText()
    const row = await getInquiryByNumber(referenceText)

    expect(row, `no DB row found for ${referenceText}`).toBeDefined()
    expect(row?.source_self_reported).toBeNull()
    expect(row?.source_self_detail).toBeNull()

    await deleteInquiryByNumber(referenceText)
  })
})

test.describe('POST /api/inquiries contract', () => {
  test('empty body returns 400 validation_failed with a details array', async ({ request }) => {
    const response = await request.post('/api/inquiries', { data: {} })
    expect(response.status()).toBe(400)

    const body = (await response.json()) as { success: boolean; error: string; details?: string[] }
    expect(body.success).toBe(false)
    expect(body.error).toBe('validation_failed')
    expect(Array.isArray(body.details)).toBe(true)
    expect(body.details!.length).toBeGreaterThan(0)
  })

  test('honeypot field returns 201 with the fake inquiry number and writes nothing', async ({ request }) => {
    const response = await request.post('/api/inquiries', {
      data: {
        fullName: '[QA] Honeypot Bot',
        email: QA_EMAIL,
        petType: 'dog',
        petCount: 1,
        fromCountry: 'CA',
        fromCity: 'Toronto',
        toCountry: 'VN',
        toCity: 'Hanoi',
        website: 'x',
      },
    })
    expect(response.status()).toBe(201)

    const body = (await response.json()) as { success: boolean; data: { inquiryNumber: string } }
    expect(body.success).toBe(true)
    expect(body.data.inquiryNumber).toBe('PA-0000-0000')

    const row = await getInquiryByNumber('PA-0000-0000')
    expect(row, 'honeypot submission should never write a DB row').toBeUndefined()
  })

  test('GET returns 405', async ({ request }) => {
    const response = await request.get('/api/inquiries')
    expect(response.status()).toBe(405)
  })

  test('a garbage lead-source tracking payload still returns 201, not validation_failed', async ({ request }) => {
    const response = await request.post('/api/inquiries', {
      data: {
        fullName: '[QA] Sprint350 garbage-source e2e',
        email: 'qa+s350garbage@example.com',
        petType: 'dog',
        petCount: 1,
        fromCountry: 'CA',
        fromCity: 'Toronto',
        toCountry: 'VN',
        toCity: 'Hanoi',
        sourceSelfReported: 'not-a-real-option',
        sourceSelfDetail: 12345,
        sourceReferrerHost: { nested: 'object' },
        sourceReferrerPath: 'x'.repeat(10_000),
        utmSource: ['array', 'not', 'string'],
        sourceFirstSeenAt: 'not-a-real-date',
      },
    })

    expect(response.status()).toBe(201)
    const body = (await response.json()) as { success: boolean; data: { inquiryNumber: string } }
    expect(body.success).toBe(true)

    await deleteInquiryByNumber(body.data.inquiryNumber)
  })
})
