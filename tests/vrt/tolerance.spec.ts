import { expect, test } from '@playwright/test'

import { settleStory } from './dom-idle'

/**
 * Guards the diff budget in playwright.config.ts.
 *
 * A light-on-light surface is the weakest case a screenshot diff has to catch:
 * `bg-background` on a white page differs from the pixels beneath it only at
 * its border, its arrow, its glyphs and a faint shadow. Under a loose budget an
 * entire popover could appear or vanish and the snapshot still passed, which is
 * how the 7px placement bug in #28 went in and out with `vrt` green.
 *
 * So assert the comparator itself: capture the popover open, then load the same
 * story closed and require that it does NOT match. `.not.toHaveScreenshot`
 * runs the configured comparator (threshold + maxDiffPixels) and never writes a
 * baseline, not even under `--update-snapshots=all`, so this cannot quietly
 * rebase itself onto the closed state.
 *
 * The trigger assertions matter as much as the screenshot one. A negated
 * comparison passes on *any* difference, including a Storybook error page or a
 * blank frame, so pin the frame to the same story at the same layout first —
 * otherwise the guard could report a healthy budget while rendering nothing.
 */
const guardBaseline = 'tolerance-guard-popover-open-light.png'

const storyUrl = (args?: string) =>
  [
    '/iframe.html?id=components-popover--basic-usage',
    'globals=theme:light',
    'viewMode=story',
    ...(args ? [`args=${args}`] : []),
  ].join('&')

const screenshot = { fullPage: true, animations: 'disabled' } as const

test.describe('screenshot diff budget', () => {
  test('a popover cannot vanish inside the budget', async ({ page }) => {
    await page.goto(storyUrl('defaultOpen:!true'))
    await settleStory(page)

    const trigger = page.getByRole('button', { name: 'Open popover' })
    await expect(
      page.locator('[role="dialog"]'),
      'the guard needs the popover open to capture its surface',
    ).toHaveCount(1)
    const openTriggerBox = await trigger.boundingBox()
    await expect(page).toHaveScreenshot(guardBaseline, screenshot)

    await page.goto(storyUrl())
    await settleStory(page)
    await expect(page.locator('[role="dialog"]')).toHaveCount(0)
    await expect(
      trigger,
      'the closed frame has to be the same story, or the diff below proves ' +
        'nothing about the budget',
    ).toBeVisible()
    expect(await trigger.boundingBox()).toEqual(openTriggerBox)

    await expect(
      page,
      'the whole popover surface is gone, yet the diff fits inside ' +
        'maxDiffPixels — the budget in playwright.config.ts is too loose to ' +
        'catch a light-on-light component appearing or disappearing',
    ).not.toHaveScreenshot(guardBaseline, screenshot)
  })
})
