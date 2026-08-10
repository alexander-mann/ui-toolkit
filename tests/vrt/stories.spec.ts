import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { expect, test } from '@playwright/test'

import { waitForDomIdle } from './dom-idle'

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
