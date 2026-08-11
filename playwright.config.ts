import { defineConfig, devices } from '@playwright/test'

/**
 * Visual-regression config. Renders every Storybook story (light + dark) in a
 * pinned Chromium and diffs against committed baselines.
 *
 * Baselines are environment-sensitive (fonts/AA), so they are generated and
 * compared ONLY in the pinned Playwright container in CI
 * (mcr.microsoft.com/playwright — see .github/workflows/vrt.yml). To seed or
 * refresh them, run the "Visual Regression" workflow with
 * update_baselines = true; it regenerates and commits them.
 */
export default defineConfig({
  testDir: './tests/vrt',
  // Flat, OS-agnostic baseline names — we only ever run in the pinned image.
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // `list` puts the differing story and its pixel count in the CI log, so a
  // failure is legible without downloading the HTML report.
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${process.env.SB_PORT || 6007}`,
  },
  expect: {
    /**
     * Two independent knobs, each doing the job it exists for:
     *
     * - `threshold` bounds how different a *single* pixel may be (YIQ colour
     *   distance) before it counts at all. This is the lever for sub-pixel AA
     *   noise.
     * - `maxDiffPixels` bounds *how many* pixels may differ. That is a
     *   structural budget, so it stays small.
     *
     * `maxDiffPixelRatio: 0.01` used to do both jobs with the second knob, and
     * a light-on-light surface is what that hides: `bg-background` on a white
     * page differs from the pixels beneath only at its border, arrow, glyphs
     * and shadow, so an entire popover appearing or vanishing moves just
     * 1,492 px — comfortably inside the 9,216 px a 0.01 ratio allows on a
     * 1280x720 frame. Components could appear, vanish, or shift 7px and still
     * pass; see issue #29.
     *
     * The noise floor was then measured in the pinned container at
     * `maxDiffPixels: 0`: every baseline matched to the pixel, twice over. At
     * `threshold: 0.25` there is no cross-run noise to budget for, so 100 px is
     * pure headroom — ~15x below that 1,492 px signal.
     *
     * Note both figures are properties of the pair of knobs, not of
     * `maxDiffPixels` alone: the same vanishing popover shrinks to 224 px at
     * `threshold: 0.9`. Raise the threshold and you quietly spend the headroom.
     * An absolute budget over a ratio buys nothing while every baseline is
     * 1280x720 (100 px is ratio 0.000108) — it is there for the day a
     * `fullPage` capture runs taller than the viewport, since noise tracks the
     * amount of rendered text rather than image area, and a ratio would hand
     * that one story a bigger budget for no reason.
     *
     * `tests/vrt/tolerance.spec.ts` guards the budget.
     */
    toHaveScreenshot: { threshold: 0.25, maxDiffPixels: 100 },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node scripts/serve-storybook.mjs',
    url: `http://localhost:${process.env.SB_PORT || 6007}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
