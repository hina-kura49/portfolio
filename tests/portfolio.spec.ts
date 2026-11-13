import { expect, test } from '@playwright/test'
import { filterWorks } from '../src/data/content'
import { updateStatuses } from '../scripts/sync-contributions.mjs'
import { findNew, issueFor } from '../scripts/find-contributions.mjs'

test('language and field filters intersect and support multiple tags', () => {
  const works = [
    { id: 'a', title: 'A', description: '', languages: ['Python', 'Go'], fields: ['インフラ', 'セキュリティ'] },
    { id: 'b', title: 'B', description: '', languages: ['TypeScript'], fields: ['Webアプリ'] },
  ]
  expect(filterWorks(works, 'Python', 'セキュリティ').map(work => work.id)).toEqual(['a'])
  expect(filterWorks(works, 'TypeScript', 'インフラ')).toEqual([])
  expect(filterWorks(works, '', '')).toHaveLength(2)
})

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

test('entrance, hover handoff, fade out, menu and section links', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'h.kurashina Portfolio', exact: true })).toBeVisible()
  await expect(page.locator('.works-content')).toHaveCSS('opacity', '1')
  await expect(page.locator('.project-row').last()).toBeInViewport({ ratio: 1 })
  expect(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight)).toBe(true)
  await page.screenshot({ path: test.info().outputPath('portfolio-home.png') })
  const rows = page.locator('.project-row')
  await expect(rows).toHaveCount(4)
  await rows.nth(0).hover()
  const before = await rows.nth(1).boundingBox()
  await expect(rows.nth(1)).toHaveCSS('opacity', '0.4')
  await expect(page.locator('.project-preview-image').nth(0)).toHaveCSS('opacity', '1')
  await rows.nth(1).hover()
  await expect(page.locator('.projects-page')).toHaveCSS('background-color', 'rgb(224, 237, 242)')
  await expect(page.locator('.project-preview-image').nth(1)).toHaveCSS('opacity', '1')
  await expect(page.locator('.project-preview-image').nth(0)).toHaveCSS('opacity', '0')
  expect(await rows.nth(1).boundingBox()).toEqual(before)
  await page.screenshot({ path: test.info().outputPath('portfolio-hover.png') })
  await page.mouse.move(1300, 800)
  await expect(page.locator('.project-preview-image').nth(1)).toHaveCSS('opacity', '0')
  await expect(rows.nth(0)).toHaveCSS('opacity', '1')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
  await page.getByRole('link', { name: /Development —/ }).click()
  await expect(page).toHaveURL(/\/development$/)
  await page.getByLabel('言語', { exact: true }).selectOption('Python')
  await page.getByLabel('分野', { exact: true }).selectOption('セキュリティ')
  await page.getByRole('button', { name: '絞り込みを解除' }).click()
  await expect(page.getByLabel('言語', { exact: true })).toHaveValue('')
  await page.goto('/personal')
  await expect(page.getByRole('link', { name: /GitHub @h-kurashina/ })).toHaveAttribute('href', 'https://github.com/h-kurashina')
  await expect(page.getByRole('link', { name: /X @hkurashina49/ })).toHaveAttribute('href', 'https://x.com/hkurashina49')
  await expect.poll(() => page.locator('.profile-photo').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true)
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0)
  await expect(page.getByText('スタートアップ', { exact: true })).toBeVisible()
  await page.screenshot({ path: test.info().outputPath('portfolio-personal.png'), fullPage: true })
  expect(errors).toEqual([])
})

test('mobile layout and reduced motion remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const path of ['/', '/personal', '/development', '/case-study', '/open-source']) {
    await page.goto(path)
    await expect(page.locator('.works-content')).toHaveCSS('opacity', '1')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await expect(page.locator('.custom-pointer')).not.toBeVisible()
    if (path === '/personal') await page.screenshot({ path: test.info().outputPath('portfolio-personal-mobile.png'), fullPage: true })
  }
  await page.goto('/')
  for (const viewport of [{ width: 390, height: 844 }, { width: 375, height: 667 }]) {
    await page.setViewportSize(viewport)
    await expect(page.locator('.project-row').last()).toBeInViewport({ ratio: 1 })
    expect(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight)).toBe(true)
  }
  // Short phones keep the roomier spacing and may scroll a little to reach the last row.
  await page.setViewportSize({ width: 320, height: 568 })
  await page.locator('.project-row').last().scrollIntoViewIfNeeded()
  await expect(page.locator('.project-row').last()).toBeInViewport({ ratio: 1 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: test.info().outputPath('portfolio-mobile.png') })
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('link', { name: '04 Open Source' }).click()
  await expect(page.getByRole('heading', { name: 'Open Source', exact: true })).toBeVisible()
})

test('open source lists contributions with pull request links and status badges', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /Open Source —/ }).click()
  await expect(page).toHaveURL(/\/open-source$/)
  await expect(page.getByRole('heading', { name: 'Open Source', exact: true })).toBeVisible()
  const items = page.locator('.contributions-list > li')
  await expect(items).toHaveCount(5)
  const report = items.filter({ hasText: 'Searcher の安全性契約に不足する条件を報告' })
  await expect(report.locator('.contribution-status')).toHaveText('報告・解決済み')
  await expect(report.getByRole('link', { name: 'Searcher の安全性契約に不足する条件を報告' })).toHaveAttribute('href', 'https://github.com/rust-lang/rust/issues/164904')
  await expect(report.getByRole('link', { name: /対応した修正PR/ })).toHaveAttribute('href', 'https://github.com/rust-lang/rust/pull/165681')
  const acl = items.filter({ hasText: 'rust-lang-ja/ac-library-rs' })
  await expect(acl.getByRole('link', { name: 'Output test binary to the temporary directory in test-expand.sh' })).toHaveAttribute('href', 'https://github.com/rust-lang-ja/ac-library-rs/pull/183')
  await expect(acl.locator('.contribution-status')).toHaveText('Open')
  await expect(acl.locator('.contribution-status')).toHaveAttribute('data-status', 'open')
  await expect(acl.locator('time')).toHaveAttribute('dateTime', '2026-09-24')
  await expect(items.filter({ hasText: 'rust-lang/rust-clippy' }).locator('.contribution-status')).toHaveText('Open')
  await page.screenshot({ path: test.info().outputPath('portfolio-open-source.png'), fullPage: true })
})
