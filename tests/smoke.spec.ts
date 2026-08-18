import { Page, expect, test } from '@playwright/test'

import { PAGES } from '../src/routes/pages'

// Collects anything the browser would consider a genuine problem: console
// errors and uncaught exceptions. Returns the live array; assert on it last.
function collectProblems(page: Page): string[] {
  const problems: string[] = []

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      problems.push(`console.error: ${msg.text()}`)
    }
  })
  page.on('pageerror', (error) => {
    problems.push(`uncaught: ${error.message}`)
  })

  return problems
}

for (const { path, routeName } of PAGES) {
  test(`${routeName} loads directly with no console errors`, async ({
    page,
  }) => {
    const problems = collectProblems(page)

    await page.goto(path)
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page.getByRole('link', { name: routeName })).toHaveAttribute(
      'aria-current',
      'page',
    )

    expect(problems).toEqual([])
  })
}

test('navigating through every page in turn produces no console errors', async ({
  page,
}) => {
  const problems = collectProblems(page)

  await page.goto('/')

  for (const { routeName } of PAGES) {
    await page
      .getByRole('navigation')
      .getByRole('link', { name: routeName })
      .click()
    await expect(page.getByRole('link', { name: routeName })).toHaveAttribute(
      'aria-current',
      'page',
    )
    await expect(page.getByRole('main')).toBeVisible()
  }

  expect(problems).toEqual([])
})

test('unknown routes render the not-found page with no console errors', async ({
  page,
}) => {
  const problems = collectProblems(page)

  await page.goto('/definitely-not-a-real-page')
  // Not getByRole('heading'): the Header component renders <header>, which is
  // not a heading element.
  await expect(page.getByText('Page not found')).toBeVisible()

  await page.getByRole('link', { name: 'Go back home' }).click()
  await expect(page).toHaveURL('/')

  expect(problems).toEqual([])
})

test.describe('with JavaScript disabled', () => {
  test.use({ javaScriptEnabled: false })

  // <noscript> contents are only parsed into the DOM when scripting is off, so
  // this is the one path the app itself can never exercise.
  test('serves the generated no-script.css and applies it', async ({
    page,
    request,
  }) => {
    await page.goto('/')

    // The href is fingerprinted in the production build, so read it from the
    // document rather than assuming a fixed path.
    const href = await page
      .locator('noscript link[rel="stylesheet"]')
      .getAttribute('href')
    expect(href).toBeTruthy()

    const css = await request.get(href!)
    expect(css.status()).toBe(200)
    expect(css.headers()['content-type']).toContain('text/css')

    // The app never boots, so the fallback is all the user sees. Located by id,
    // not getByText: Playwright's text engine does not match inside <noscript>.
    const fallback = page.locator('#no-script-root')
    await expect(page.locator('#root')).toBeEmpty()
    await expect(fallback).toBeVisible()
    await expect(fallback).toContainText('You need to enable JavaScript')

    // Computed styles prove the stylesheet actually loaded and applied. These
    // colours come from $bg-color and $text-color in src/_common.scss.
    await expect(page.locator('body')).toHaveCSS(
      'background-color',
      'rgb(40, 44, 52)',
    )
    await expect(fallback).toHaveCSS('color', 'rgb(255, 255, 255)')
    await expect(fallback).toHaveCSS('display', 'flex')
  })
})
