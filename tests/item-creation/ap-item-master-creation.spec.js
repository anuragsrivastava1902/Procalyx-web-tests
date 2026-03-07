import { test, expect } from '@playwright/test';
import ApAdminDashboardPage from '../../pages/dashboard/ap-admin-dashboard.page.js';
import ApItemMasterFormPage from '../../pages/affordplan-masters/ap-item-master-form.page.js';
import ApItemMasterListPage from '../../pages/affordplan-masters/ap-item-master-list.page.js';
import { readCSV } from '../../utils/readCSV.js';

let apItems = [];
try {
    apItems = readCSV('test-data/ap_item_details.csv');
    console.log('Loaded ap items: ', apItems);
} catch (err) {
    console.error('Error loading CSV:', err);
}

test.describe('testing item creation', () => {
    test.use({ storageState: 'storage/auth.json' });
    for (const apItem of apItems) {
        test(`Item creation tests -- ${apItem.itemName}`, async ({ page }) => {
            await page.goto("https://qa.procalyx.net/dashboard");
            const apAdminDashboardPage = new ApAdminDashboardPage(page);
            await apAdminDashboardPage.goToApItemMaster();
            const apItemMasterListPage = new ApItemMasterListPage(page);
            await apItemMasterListPage.startNewAPItemCreation(); 
            await expect(page.getByText(/New Affordplan Item/)).toBeVisible();
            const apItemMasterFormPage = new ApItemMasterFormPage(page);
            await apItemMasterFormPage.fillForm(apItem);
        })
    }
});