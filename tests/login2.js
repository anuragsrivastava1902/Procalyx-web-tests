// @ts-check

import { test } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import DashboardPage from '../pages/dashboardPage';
import { readCSV } from '../utils/readCSV';

let users = [];
try {
  users = readCSV('test-data/users_backup.csv');
  console.log('Loaded users: ', users);
} catch (err) {
  console.error('Error loading CSV:', err);
}

test('Check login flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("https://procalyx.org/login");
    await loginPage.enterUserEmail("pedri@yopmail.com");
    await page.waitForTimeout(3000);
    await loginPage.clickContinueButton();
    await page.waitForTimeout(3000);
    await loginPage.enterOTP();
    await page.waitForTimeout(3000);
    await loginPage.selectDropdown();
    await page.waitForTimeout(5000);
});

test('check manufacturer onboarding', async ({page}) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.clickLink();
    await dashboardPage.clickAddButton();
    await dashboardPage.fillOnboardingForm();
    await dashboardPage.clickSaveButton();
    await page.waitForTimeout(5000);
})
