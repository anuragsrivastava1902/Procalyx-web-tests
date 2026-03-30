import { test, expect } from '@playwright/test';

test('dashboard test', async ({ browser }) => {
    const context = await browser.newContext({ storageState: 'storage/auth.json' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.getByText('User Management').nth(0)).toBeVisible();
});