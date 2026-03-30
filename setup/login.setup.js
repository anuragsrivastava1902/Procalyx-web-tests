// setup/login.setup.js
import { chromium } from '@playwright/test';
import LoginPage from '../pages/shared/auth/login.page';
import { readConfig } from '../utils/readConfig';

export default async function globalSetup() {
  console.log("global setup is running....");
  const role = process.env.ROLE || 'ap_superadmin'; // Default role for setup if not provided
  console.log(`🔐 Setting up for role: ${role}`);
  const { apiURL, frontendURL, email } = readConfig(role);
  const browser = await chromium.launch(); //browser represents a real browser instance (Chromium, Firefox etc.)
  const context = await browser.newContext(); //browser context is an isolated browser environment inside a browser.
  const page = await context.newPage(); //A page represents a single tab within a browser context.
  const loginPage = new LoginPage(page);
  await page.goto(frontendURL);
  console.log("url is: ", frontendURL);
  console.log("email is ", email)
  await loginPage.enterUserEmail(email);
  //await loginPage.clickContinueButton();
  await loginPage.enterOTP();
  await page.waitForResponse(response =>
    response.url().includes('/api/v1') && response.status() === 200
  );
  // if (isKamUser) {
  //   await loginPage.selectDropdown();
  //   //await loginPage.clickContinueButton();
  // }
  await page.screenshot({ path: 'debug.png' });
  const state = await context.storageState();   // gets the state as JSON object
  console.log('Current storage state:', JSON.stringify(state, null, 2));
  console.log('Saving storage state...');
  await context.storageState({ path: 'storage/auth.json' });
  await browser.close();
}
