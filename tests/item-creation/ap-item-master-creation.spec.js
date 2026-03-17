import { test, expect } from '@playwright/test';
import ApAdminDashboardPage from '../../pages/dashboard/ap-admin-dashboard.page.js';
import ApItemMasterFormPage from '../../pages/affordplan-masters/ap-item-master-form.page.js';
import ApItemMasterListPage from '../../pages/affordplan-masters/ap-item-master-list.page.js';
import { readCSV } from '../../utils/readCSV.js';

let apItems = [];
try {
    apItems = readCSV('test-data/ap_item_details_2.csv');
    console.log('Loaded ap items: ', apItems);
} catch (err) {
    console.error('Error loading CSV:', err);
}

test.describe('testing item creation', () => {
    test.use({ storageState: 'storage/auth.json' });
    for (const apItem of apItems) {
        test(`Item creation tests -- ${apItem.itemName}`, async ({ page }) => {
            const apAdminDashboardPage = new ApAdminDashboardPage(page);
            const apItemMasterListPage = new ApItemMasterListPage(page);
            const apItemMasterFormPage = new ApItemMasterFormPage(page);

            await page.goto("https://qa.procalyx.net/dashboard");
            await apAdminDashboardPage.goToApItemMaster();
            // await apItemMasterListPage.startNewAPItemCreation();
            // await expect(page.getByText(/New Affordplan Item/)).toBeVisible();

            // await apItemMasterFormPage.fillForm(apItem);

            await Promise.all([
                page.waitForResponse(res => res.url().includes('api/v1/items')
                    && res.url().includes(encodeURIComponent(apItem.itemName))  // check query param
                    && res.status() == 200),
                apItemMasterListPage.searchItem(apItem.itemName)
            ])


            console.log("item searched....");
            expect(page.getByText(apItem.itemName, { exact: true }), `Expecting ${apItem.itemName} to be visible::\n`).toBeVisible({ timeout: 10000 });
            expect(page.locator('tr')).toHaveCount(1);
        })
    }
});
