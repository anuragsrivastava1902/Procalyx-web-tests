import { test, expect } from '@playwright/test';
import ApAdminDashboardPage from '../../pages/affordplan/dashboard/ap-admin-dashboard.page.js';
import ApItemMasterFormPage from '../../pages/affordplan/affordplan-masters/ap-item-master-form.page.js';
import ApItemMasterListPage from '../../pages/affordplan/affordplan-masters/ap-item-master-list.page.js';
import { readCSV } from '../../utils/readCSV.js';
// import data from '../../test-data/dropdownMaster.json';
// import getDropdownListFromApi from '../../utils/getDropdownListFromApi.js';

let apItems = [];
try {
    apItems = readCSV('test-data/ap_item_details_2.csv');
    console.log('Loaded ap items: ', apItems.length);
} catch (err) {
    console.error('Error loading CSV:', err);
}


test.describe.parallel('testing item creation', () => {
    test.use({ storageState: 'storage/auth.json' });
    for (const apItem of apItems) {
        test(`Item creation tests -- ${apItem.itemName}`, async ({ page }) => {
            const apAdminDashboardPage = new ApAdminDashboardPage(page);
            const apItemMasterListPage = new ApItemMasterListPage(page);
            const apItemMasterFormPage = new ApItemMasterFormPage(page);

            await page.goto("https://qa.procalyx.net/dashboard");
            await apAdminDashboardPage.goToApItemMaster();
            await apItemMasterListPage.startNewAPItemCreation();

            // const dropdownName = 'form'
            // const result = await getDropdownListFromApi(page, `/api/v1/${dropdownName}s`, dropdownName)
            // console.log(dropdownName);
            // console.log(result);
            // await page.pause();

            await expect(page.getByText(/New Affordplan Item/)).toBeVisible();
            await apItemMasterFormPage.fillForm(apItem);
            await expect(page.getByText(apItem.itemName), `Expecting ${apItem.itemName} to be visible::\n`).toBeVisible({ timeout: 10000 });
            await expect(page.locator('.MuiSkeleton-root')).toHaveCount(0);
            await Promise.all([
                page.waitForResponse(res => res.url().includes('api/v1/items')),
                apItemMasterListPage.searchItem(apItem.itemName),
                console.log("item searched....")
            ])
            await expect(page.locator('.MuiSkeleton-root')).toHaveCount(0);
            await expect(page.locator('table tbody tr', { hasText: apItem.itemName })).toBeVisible();
        })
    }
});
