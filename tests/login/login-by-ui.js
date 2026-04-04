import LoginPage from '../../pages/shared/auth/login.page';
import { readConfig } from '../../utils/config/readConfig';
import { expect, test } from '@playwright/test';

test('user can login via UI', async ({ browser }) => {
  const role = process.env.ROLE || 'ap_superadmin'; // Default role for setup if not provided
  const { frontendURL, email } = readConfig(role);

  const context = await browser.newContext(); //browser context is an isolated browser environment inside a browser.
  const page = await context.newPage(); //A page represents a single tab within a browser context.

  const loginPage = new LoginPage(page);
  await page.goto(frontendURL);
  await loginPage.enterUserEmail(email);
  await loginPage.enterOTP();
  await page.waitForResponse(response =>
    response.url().includes('/api/v1') && response.status() === 200
  );
  await expect(page).toHaveURL(/dashboard/);
  // if (isKamUser) {
  //   await loginPage.selectDropdown();
  //   //await loginPage.clickContinueButton();
  // }
  await page.screenshot({ path: 'debug.png' });
})
