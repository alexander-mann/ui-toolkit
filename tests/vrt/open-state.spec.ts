import { expect, test } from '@playwright/test'

import { waitForDomIdle } from './dom-idle'

/**
 * Guards the coverage itself. The stories below exist so visual regression
 * captures the popover's open surface — placement, arrow, and content layout.
 * They open via a `play` function, which is invisible to a screenshot taken
 * too early: a premature capture silently matches a trigger-only baseline, so
 * the snapshot passes forever while covering nothing.
 *
 * This asserts the surface is actually on screen at capture time, and reports
 * what it saw when it isn't, so a regression here fails loudly instead of
 * quietly reverting to a trigger-only snapshot.
 */
const openStories = [
  'components-popover--with-form',
  'components-popover--in-portal',
  'components-popover--no-arrow',
]

test.describe('stories that must be captured open', () => {
  for (const id of openStories) {
    test(`${id} has its surface open at capture time`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${id}&viewMode=story`)
      await page.locator('#storybook-root').waitFor({ state: 'attached' })
      await waitForDomIdle(page)

      const dialogs = await page.locator('[role="dialog"]').count()
      const diagnostics = await page.evaluate(() => {
        const preview = (
          window as unknown as {
            __STORYBOOK_PREVIEW__?: {
              storyRenders?: { phase?: string }[]
            }
          }
        ).__STORYBOOK_PREVIEW__
        return {
          hasPreview: Boolean(preview),
          phases: preview?.storyRenders?.map((r) => r.phase) ?? [],
          buttons: [...document.querySelectorAll('button')].map(
            (b) => b.textContent?.trim() ?? b.getAttribute('aria-label'),
          ),
        }
      })

      expect(
        dialogs,
        `expected the popover to be open at capture time. hasPreview=${diagnostics.hasPreview} phases=${JSON.stringify(diagnostics.phases)} buttons=${JSON.stringify(diagnostics.buttons)}`,
      ).toBe(1)
    })
  }
})
