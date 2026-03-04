// @ts-check

import { test, expect } from '@playwright/test';
import { readCSV } from '../utils/readCSV.js';

let users = [];
try {
  users = readCSV('test-data/users_backup.csv');
  console.log('Loaded users:', users.length);
} catch (err) {
  console.error('Error loading CSV:', err);
}

test('test user creation', async ({ page }) => {
  await page.goto('https://procalyx.org/login');
  await page.getByRole('textbox', { name: 'you@example.com' }).fill('vikram@yopmail.com');
  // Wait for the response triggered by clicking "Continue"
  const [response] = await Promise.all([
    page.waitForResponse(res => {
      // console.log(res);
      return res.url().includes('/api/v1/auth/otp/send') && res.status() === 200
    })
    , page.getByRole('button', { name: 'Continue' }).click()
  ]);
  // Convert response to JSON
  const data = await response.json();
  const code = data.data.otp;
  console.log("Your code is:", code);
  // Dynamic OTP Fill
  const digits = code.toString().split("");
  for (let i = 0; i < digits.length; i++) {
    await page.getByRole('textbox').nth(i).fill(digits[i]);
  }
  await page.locator("div[id='root'] li:nth-child(2) div:nth-child(1) div:nth-child(2) span:nth-child(1)").click();
  
  // Loop through CSV rows
  for (const user of users) {
    await page.getByRole('button', { name: 'Add User' }).click();
    await page.getByRole('textbox', { name: 'Enter full name' }).fill(user.name);
    await page.getByRole('textbox', { name: 'e.g., Manager' }).fill(user.designation);
    await page.getByRole('textbox', { name: 'email@example.com' }).fill(user.email);
    await page.getByRole('textbox', { name: '-digit mobile number' }).fill(user.contact);
    await page.getByRole('combobox').nth(1).selectOption(user.relationship);
    await page.getByRole('combobox').nth(2).selectOption(user.role);
    await page.getByRole('combobox').nth(3).selectOption(user.department);
    await page.getByRole('combobox').nth(4).selectOption({ label: user.country });
    await page.getByRole('combobox').nth(5).selectOption({ label: user.state });
    await page.locator('select').nth(5).selectOption({ label: user.city });
    const entityDropdown = page.locator("//div[4]//div[1]//select[1]");
    if (await entityDropdown.count() > 0) {
      await entityDropdown.selectOption({ label: user.entity })
    }
    await page.waitForTimeout(5000);
    const [errorMessage] = await Promise.all([
      page.waitForResponse(res => res.url()),
      page.getByRole('button', { name: 'Create User' }).click()
    ]);
    const mes = await errorMessage.json();
    console.log(mes);

    // Go back to Add User page again if there are more users
    // if (users.length > 1) {
    //   await page.getByRole('button', { name: 'Add User' }).click();
    // }
  }

  await page.waitForTimeout(40000);

});