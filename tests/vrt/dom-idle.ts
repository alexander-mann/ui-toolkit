import type { Page } from '@playwright/test'

/**
 * A story with a `play` function keeps mutating the DOM after Storybook
 * reports it as rendered, so capturing on the render signal alone freezes it
 * mid-interaction. Storybook's own render phase is not a reliable gate here
 * (it reports "finished" before a play function has finished), so wait for the
 * DOM itself to go quiet instead — the actual precondition for a stable
 * screenshot, and independent of Storybook internals.
 *
 * Lives outside a `.spec.ts` file because Playwright refuses to let one test
 * file import another.
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
