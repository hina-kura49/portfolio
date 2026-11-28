import { expect, test } from '@playwright/test'
import { updateStatuses } from '../scripts/sync-contributions.mjs'
import { findNew, issueFor } from '../scripts/find-contributions.mjs'

test('contribution sync updates only the status of the matching pull request', () => {
  const source = `[
  { pullRequestUrl: 'https://github.com/a/b/pull/1', title: 'One', status: 'open', date: '2026-09-24' },
  { pullRequestUrl: 'https://github.com/c/d/pull/2', title: 'Two', status: 'open', date: '2026-09-23' },
]`
  const { updated, changes } = updateStatuses(source, { 'https://github.com/c/d/pull/2': 'merged', 'https://github.com/a/b/pull/1': 'open' })
  expect(changes).toEqual([{ url: 'https://github.com/c/d/pull/2', from: 'open', to: 'merged' }])
  expect(updated).toContain("pull/1', title: 'One', status: 'open'")
  expect(updated).toContain("pull/2', title: 'Two', status: 'merged'")
})

test('contribution finder skips own, company, listed and announced pull requests', () => {
  const pull = (repository: string, number: number) => ({ repository, number, url: `https://github.com/${repository}/pull/${number}`, title: "Fix a 'quoted' bug", language: 'Rust', status: 'open', date: '2026-09-25' })
  const pulls = [pull('h-kurashina/git-trail', 1), pull('Beaulab-jp/beaulab', 2), pull('rust-lang/rust', 3), pull('tokio-rs/tokio', 4), pull('serde-rs/serde', 5)]
  const source = "pullRequestUrl: 'https://github.com/rust-lang/rust/pull/3',"
  const found = findNew(pulls, source, ['- https://github.com/tokio-rs/tokio/pull/4'])
  expect(found.map(item => item.repository)).toEqual(['serde-rs/serde'])
  const issue = issueFor(found[0])
  expect(issue.title).toBe('Open Source に追加: serde-rs/serde#5')
  expect(issue.body).toContain("title: 'Fix a \\'quoted\\' bug',")
  expect(issue.body).toContain("languages: ['Rust'],")
})

test('single page: sections, language switch, works and no detail pages', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/?lang=en')
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Full-Stack Engineer for a More Secure Internet')
  for (const name of ['About Me', 'Now', 'Projects', 'Organizations', 'Open Source', 'Translate', 'Contact']) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible()
  }
  await expect(page.locator('.work')).toHaveCount(4)
  await expect(page.locator('.tr-item')).toHaveCount(33)
  await expect(page.locator('.org-card')).toHaveCount(3)
  await expect(page.locator('.client-track li')).toHaveCount(32)
  await expect(page.locator('#contact a[href="mailto:h.kurashina49@gmail.com"]')).toBeVisible()
  await expect(page.locator('#open-source .info-card')).toHaveCount(7)
  // Everything links out to GitHub or anchors; there are no internal detail routes.
  const internal = await page.locator('a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute('href')).filter(href => href !== '/'))
  expect(internal).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: test.info().outputPath('portfolio-home.png'), fullPage: true })
  await page.getByRole('button', { name: 'JA', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
  await expect(page.getByRole('link', { name: /作品を見る/ })).toBeVisible()
  await page.goto('/')
  await expect(page.getByRole('link', { name: /作品を見る/ })).toBeVisible()
  expect(errors).toEqual([])
})

test('mobile layout does not overflow', async ({ page }) => {
  await page.goto('/?lang=en')
  for (const width of [390, 375, 320]) {
    await page.setViewportSize({ width, height: 800 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: test.info().outputPath('portfolio-mobile.png'), fullPage: true })
})
