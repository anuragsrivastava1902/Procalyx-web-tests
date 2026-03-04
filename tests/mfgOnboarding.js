import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import DashboardPage from '../pages/dashboardPage';
import { readCSV } from '../utils/readCSV';

let mfgs = [];
try {
    mfgs = readCSV('test-data/mfg_details_2.csv');
    console.log('Loaded manufacturers: ', mfgs);
} catch (err) {
    console.error('Error loading CSV:', err);
}

test.describe("Manufacturer onboarding tests", () => {
    test.describe.configure({ mode: 'serial' });
    test.use({ storageState: 'storage/auth.json' });
    for (const mfg of mfgs) {
        test(`check manufacturer onboarding - ${mfg.mfgName}`, async ({ page }) => {
            try {
                const dashboardPage = new DashboardPage(page);
                await page.goto("https://procalyx.org/dashboard");
                console.log("gone to page: Dashboard ");
                await dashboardPage.openManufacturerMasters();
                await dashboardPage.clickAddManufacturer();
                console.log("clicked the add mfg button");

                // await page.waitForTimeout(5000);

                await dashboardPage.fillKYC(mfg);
                await dashboardPage.fillBasicInfo(mfg);
                await dashboardPage.fillLocationDetails(mfg);
                await dashboardPage.selectKAMIfAvailable();
                await dashboardPage.fillSPOCInfo(mfg);
                await dashboardPage.fillContractDetails(mfg);
                await dashboardPage.fillCommercials(mfg);
                await dashboardPage.fillBankDetails(mfg);
                await dashboardPage.save();
                await page.waitForTimeout(5000);
                // await expect(page.getByText('Manufacturer Management')).toBeVisible();
            } catch (err) {
                console.log("Test error: ", err);
                throw err;
            }
        })
    }

})


// test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     const loginPage = new LoginPage(page);
//     await page.goto("https://procalyx.org/login");
//     await loginPage.enterUserEmail("arvindo@yopmail.com");
//     await loginPage.clickContinueButton();
//     await loginPage.enterOTP();
//     await loginPage.selectDropdown();

//     // Save auth state for reuse
//     await context.storageState({ path: 'storage/auth.json' });

//     await context.close();

// });

//test.use({ storageState: 'storage/auth.json' });


