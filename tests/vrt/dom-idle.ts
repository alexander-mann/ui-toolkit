import type { Page } from '@playwright/test'

/**
 * The shared wait before a story is safe to screenshot.
 *
 * Lives outside a `.spec.ts` file because Playwright refuses to let one test
 * file import another.
 */

/**
 * A story with a `play` function keeps mutating the DOM after Storybook
 * reports it as rendered, so capturing on the render signal alone freezes it
 * mid-interaction. Storybook's own render phase is not a reliable gate here
 * (it reports "finished" before a play function has finished), so wait for the
 * DOM itself to go quiet instead — the actual precondition for a stable
 * screenshot, and independent of Storybook internals.
 */
export const waitForDomIdle = async (
  page: Page,
  { idleMs = 150, timeoutMs = 5_000 } = {},
) => {
  await page
    .evaluate(
      ({ idleMs, timeoutMs }) =>
        new Promise<void>((resolve) => {
          let idleTimer = 0
          const finish = () => {
            window.clearTimeout(idleTimer)
            window.clearTimeout(capTimer)
            observer.disconnect()
            resolve()
          }
          const observer = new MutationObserver(() => {
            window.clearTimeout(idleTimer)
            idleTimer = window.setTimeout(finish, idleMs)
          })
          const capTimer = window.setTimeout(finish, timeoutMs)
          idleTimer = window.setTimeout(finish, idleMs)
          observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
          })
        }),
      { idleMs, timeoutMs },
    )
    .catch(() => undefined)
}

/**
 * Every spec here needs the same three gates before it looks at a story: the
 * root attached, the DOM quiet, the fonts resolved. Screenshots taken with a
 * shorter wait than the baseline was captured with produce diffs that have
 * nothing to do with the component.
 */
export const settleStory = async (page: Page) => {
  await page.locator('#storybook-root').waitFor({ state: 'attached' })
  await waitForDomIdle(page)
  await page.evaluate(() => document.fonts.ready)
}
