import { test, expect } from '@playwright/test';
import { readCSV } from '../../utils/readCSV.js';
import ApAdminMenu from '../../pages/affordplan/ap-admin-menu.page.js';
import ApItemMasterListPage from '../../pages/affordplan/affordplan-masters/ap-item-master-list.page.js';
import ApItemMasterFormPage from '../../pages/affordplan/affordplan-masters/ap-item-master-form.page.js';
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
    test.use({ storageState: 'storage/auth.ap_superadmin.json' });
    for (const apItem of apItems) {
        test(`Item creation tests -- ${apItem.itemName}`, async ({ page }) => {
            const apAdminMenu = new ApAdminMenu(page);
            const apItemMasterListPage = new ApItemMasterListPage(page);
            const apItemMasterFormPage = new ApItemMasterFormPage(page);

            await page.goto("/dashboard");
            await apAdminMenu.goToApItemMaster();
            await apItemMasterListPage.startNewAPItemCreation();
            await expect(apItemMasterFormPage.formHeading).toBeVisible();
            await apItemMasterFormPage.fillForm(apItem);
            await expect(page.getByText(apItem.itemName), `Expecting ${apItem.itemName} to be visible::\n`).toBeVisible({ timeout: 10000 });
            await expect(page.locator('.MuiSkeleton-root')).toHaveCount(0);
            await Promise.all([
                page.waitForResponse(res => res.url().includes('api/v1/items')),
                apItemMasterListPage.searchItem(apItem.itemName),
            ])
            await expect(page.locator('.MuiSkeleton-root')).toHaveCount(0);
            await expect(page.locator('table tbody tr', { hasText: apItem.itemName })).toBeVisible();
        })
    }
});
