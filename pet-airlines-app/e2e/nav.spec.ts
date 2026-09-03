import { expect, test } from '@playwright/test'

// MobileMenu (src/components/layout/MobileMenu.tsx) is `md:hidden` — force
// a mobile viewport here regardless of which project runs this file, so
// the hamburger button is actually visible and clickable.
test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true })

test('mobile hamburger opens, lists at least 5 links, Services navigates, Escape closes', async ({ page }) => {
  await page.goto('/')

  const toggle = page.getByRole('button', { name: 'Open menu' })
  await expect(toggle).toBeVisible()

  const panel = page.locator('#mobile-nav-panel')
  await expect(panel).toBeHidden()

  await toggle.click()
  await expect(panel).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close menu' })).toBeVisible()

  const panelLinks = panel.getByRole('link')
  await expect(panelLinks).toHaveCount(6) // 5 nav links + the CTA link
  const linkCount = await panelLinks.count()
  expect(linkCount).toBeGreaterThanOrEqual(5)

  await panel.getByRole('link', { name: 'Services' }).click()
  await expect(page).toHaveURL(/\/services$/)
  await expect(page.locator('#mobile-nav-panel')).toBeHidden()

  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.locator('#mobile-nav-panel')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('#mobile-nav-panel')).toBeHidden()
})
