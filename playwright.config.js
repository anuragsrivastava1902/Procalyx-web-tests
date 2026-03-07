// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  testIgnore: ['setup/**'],
  timeout: 90 * 1000,   // 90 seconds per test
  fullyParallel: true, /* Run tests in files in parallel */
  forbidOnly: !!process.env.CI, /* Fail the build on CI if you accidentally left test.only in the source code. */
  retries: process.env.CI ? 2 : 0, /* Retry on CI only */
  workers: 1, /* Opt out of parallel tests on CI. */
  reporter: 'html', /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  use: {
    baseURL: 'https://qa.procalyx.net/', 
    // storageState: 'storage/auth.json',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
  // globalSetup: './setup/login.setup.js',

});

