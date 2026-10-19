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
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
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
  await expect(
    page.getByRole('heading', { name: 'Page not found' }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Go back home' }).click()
  await expect(page).toHaveURL('/')

  expect(problems).toEqual([])
})

// The fallback only renders because it is the root route's ErrorBoundary:
// React Router catches render errors itself and otherwise shows its own
// developer screen. A page chunk that fails to load, as when a deploy replaces
// it mid-session, is the realistic way to throw one.
test('a page that fails to load shows the error fallback', async ({ page }) => {
  await page.route('**/assets/About-*.js', (route) => route.abort())
  await page.goto('/about')
  await expect(page.getByText('Something went wrong.')).toBeVisible()

  await page.unroute('**/assets/About-*.js')
  await page.getByRole('button', { name: 'Reload' }).click()
  await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible()
})

// The Suspense boundary lives inside ContentPortal, not at the root, so a page
// chunk still in flight must not take the nav down with it.
test('the nav stays on screen while a page chunk loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('navigation')).toBeVisible()

  // Hold the About chunk open so the suspended state is observable rather
  // than a race against a fast local server.
  let release = () => {}
  const held = new Promise<void>((resolve) => {
    release = resolve
  })
  await page.route('**/assets/About-*.js', async (route) => {
    await held
    await route.continue()
  })

  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'About' })
    .click()

  // The whole point: spinner and nav on screen at the same time.
  await expect(page.getByRole('status', { name: 'Loading' })).toBeVisible()
  await expect(page.getByRole('navigation')).toBeVisible()
  await expect(
    page.getByRole('navigation').getByRole('link', { name: 'Home' }),
  ).toBeVisible()

  release()
  await expect(page.getByText('About Me')).toBeVisible()
  await expect(page.getByRole('navigation')).toBeVisible()
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
  test('shows the styled fallback', async ({ page }) => {
    await page.goto('/')

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
