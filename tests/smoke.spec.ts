import { Page, expect, test } from '@playwright/test'

import { PAGES } from '../src/pageDefs'

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
