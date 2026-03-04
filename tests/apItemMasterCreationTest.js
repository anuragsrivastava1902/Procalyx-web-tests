import { test, expect } from '@playwright/test';
import DashboardPage from '../pages/dashboardPage';
import ApItemMasterForm from '../pages/apItemMasterForm';
import { readCSV } from '../utils/readCSV';

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
            await page.goto("https://procalyx.org/dashboard");
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.clickApItemMasterNavLink();  
            await dashboardPage.clickAddNewItemButton(); 
            await expect(page.getByText(/New Affordplan Item/)).toBeVisible();
            const apItemMasterForm = new ApItemMasterForm(page);
            await apItemMasterForm.fillForm(apItem);
        })
    }
});