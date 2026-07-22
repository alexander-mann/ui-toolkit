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
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${process.env.SB_PORT || 6007}`,
  },
  expect: {
    // Tolerate sub-pixel AA noise without hiding real regressions.
    toHaveScreenshot: { maxDiffPixelRatio: 0.01 },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node scripts/serve-storybook.mjs',
    url: `http://localhost:${process.env.SB_PORT || 6007}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
