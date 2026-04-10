// @ts-check
import { defineConfig, devices } from '@playwright/test';

const mode = process.env.MODE || 'full';
const isCI = !!process.env.CI;
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  testIgnore: ['setup/**'],
  timeout: 40 * 1000,   // seconds per test
  fullyParallel: true, /* Run tests in files in parallel */
  forbidOnly: !!process.env.CI, /* Fail the build on CI if you accidentally left test.only in the source code. */
  retries: process.env.CI ? 2 : 0, /* Retry on CI only */
  workers: 1, /* Opt out of parallel tests on CI. */
  reporter: [['html'], ['list']], /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  use: {
    baseURL: process.env.ENV === 'stage' ? 'https://stage.procalyx.net' :
      process.env.ENV === 'dev' ? 'https://dev.procalyx.net' :
        process.env.ENV === 'demo' ? 'https://demo.procalyx.net' :
          'https://qa.procalyx.net',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
  globalSetup: isCI
    ? './setup/global-setup.js'     // always run in CI
    : mode === 'local'
      ? undefined                  // skip in dev mode
      : './setup/global-setup.js', // default local = run

});

