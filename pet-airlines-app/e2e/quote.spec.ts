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
})
