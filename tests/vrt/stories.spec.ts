import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { expect, test } from '@playwright/test'

/**
 * One visual snapshot per Storybook story, in both themes. The story list is
 * read from the built Storybook index so new components are covered
 * automatically — run `pnpm build-storybook` before this.
 */

const indexPath = resolve('storybook-static/index.json')

if (!existsSync(indexPath)) {
  throw new Error(
    'storybook-static/index.json not found — run `pnpm build-storybook` first.',
  )
}

interface StoryEntry {
  id: string
  type: string
}

/**
 * A story with a `play` function keeps mutating the DOM after Storybook
 * reports it as rendered, so capturing on the render signal alone freezes it
 * mid-interaction. Storybook's own render phase is not a reliable gate here
 * (it reports "finished" before a play function has finished), so wait for the
 * DOM itself to go quiet instead — the actual precondition for a stable
 * screenshot, and independent of Storybook internals.
 */
export const waitForDomIdle = async (
  page: import('@playwright/test').Page,
  { idleMs = 150, timeoutMs = 5_000 } = {},
) => {
  await page
    .evaluate(
      ({ idleMs, timeoutMs }) =>
        new Promise<void>((resolve) => {
          let idleTimer = 0
          const observer = new MutationObserver(() => {
            window.clearTimeout(idleTimer)
            idleTimer = window.setTimeout(finish, idleMs)
          })
          const finish = () => {
            window.clearTimeout(idleTimer)
            window.clearTimeout(capTimer)
            observer.disconnect()
            resolve()
          }
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

const index = JSON.parse(readFileSync(indexPath, 'utf8')) as {
  entries: Record<string, StoryEntry>
}
const stories = Object.values(index.entries).filter((e) => e.type === 'story')
const themes = ['light', 'dark'] as const

test.describe('storybook visual regression', () => {
  for (const story of stories) {
    for (const theme of themes) {
      test(`${story.id} [${theme}]`, async ({ page }) => {
        await page.goto(
          `/iframe.html?id=${story.id}&globals=theme:${theme}&viewMode=story`,
        )
        await page.locator('#storybook-root').waitFor({ state: 'attached' })
        await waitForDomIdle(page)
        await page.evaluate(() => document.fonts.ready)
        await expect(page).toHaveScreenshot(`${story.id}-${theme}.png`, {
          fullPage: true,
          animations: 'disabled',
        })
      })
    }
  }
})
