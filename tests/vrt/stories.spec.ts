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

interface StoryRender {
  phase?: string
}

interface PreviewWindow {
  __STORYBOOK_PREVIEW__?: { storyRenders?: StoryRender[] }
}

/**
 * Stories with a `play` function are still mid-interaction when Storybook
 * reports the story as rendered, so capturing straight away freezes them in
 * their pre-interaction state. Wait for every render to leave the playing
 * phase. Falls back to capturing immediately if Storybook's internals move,
 * so this degrades rather than failing the suite.
 */
const waitForPlayToSettle = async (page: import('@playwright/test').Page) => {
  await page
    .waitForFunction(
      () => {
        const renders = (window as unknown as PreviewWindow)
          .__STORYBOOK_PREVIEW__?.storyRenders
        if (!renders || renders.length === 0) {
          return false
        }
        // Checking for the absence of an in-progress phase rather than a list
        // of terminal ones, so a renamed terminal phase can't hang the wait.
        const inProgress = ['preparing', 'loading', 'rendering', 'playing']
        return renders.every(
          (render) => render.phase && !inProgress.includes(render.phase),
        )
      },
      undefined,
      { timeout: 5_000 },
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
        await waitForPlayToSettle(page)
        await page.evaluate(() => document.fonts.ready)
        await expect(page).toHaveScreenshot(`${story.id}-${theme}.png`, {
          fullPage: true,
          animations: 'disabled',
        })
      })
    }
  }
})
