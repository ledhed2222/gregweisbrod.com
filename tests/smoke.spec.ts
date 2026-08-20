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

// Fetches the raw document rather than reading the DOM: comments survive
// parsing as Comment nodes, so this asserts on what is actually served.
test('the delivered HTML carries no source comments', async ({ request }) => {
  const html = await (await request.get('/')).text()

  expect(html).not.toContain('<!--')
  // The stripper must not have eaten the inline analytics script with them.
  expect(html).toContain('G-7C7YZZLCZ3')
})

test.describe('route transitions', () => {
  // The fade duration is only in effect while react-transition-group has a
  // fade-*-active class applied, so a settled .Content reports 0s. These tests
  // apply that class directly to read the rule the transition will use.
  const durationWithFadeClass = (page: Page) =>
    page
      .locator('.Content')
      .first()
      .evaluate((el) => {
        el.classList.add('fade-enter-active')
        const style = getComputedStyle(el)
        const result = {
          duration: style.transitionDuration,
          property: style.transitionProperty,
          variable: style.getPropertyValue('--transition-time').trim(),
        }
        el.classList.remove('fade-enter-active')
        return result
      })

  test('resolve the duration defined in ContentPortal.tsx', async ({
    page,
  }) => {
    await page.goto('/')

    const { duration, property, variable } = await durationWithFadeClass(page)

    // Inherited from the inline --transition-time on .ContentPortal.
    expect(variable).toMatch(/^\d+ms$/)

    // Asserted against the custom property rather than a literal, so this keeps
    // testing the wiring if TRANSITION_MS changes.
    const expectedSeconds = Number.parseInt(variable, 10) / 1000
    expect(duration).toBe(`${expectedSeconds}s`)
    expect(expectedSeconds).toBeGreaterThan(0)
    expect(property).toContain('opacity')
  })

  test('are disabled under prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    const { duration } = await durationWithFadeClass(page)
    expect(duration).toBe('0s')
  })

  test('apply a fade class while navigating between pages', async ({
    page,
  }) => {
    await page.goto('/')
    await page
      .getByRole('navigation')
      .getByRole('link', { name: 'About' })
      .click()

    // Catches the transition actually running, not just the CSS being present.
    await expect(page.locator('.Content')).toHaveClass(/fade-(enter|exit)/)
    await expect(page.getByText('About Me')).toBeVisible()
  })
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
