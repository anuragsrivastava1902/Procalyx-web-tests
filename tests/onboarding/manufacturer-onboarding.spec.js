import { test, expect } from '@playwright/test';
import ApAdminDashboardPage from '../../pages/dashboard/ap-admin-dashboard.page';
import ManufacturerOnboardingFormPage from '../../pages/onboarding/manufacturer-onboarding-form.page';
import ManufacturerOnboardingListPage from '../../pages/onboarding/manufacturer-onboarding-list.page';
import { readCSV } from '../../utils/readCSV';

let mfgs = [];
try {
    mfgs = readCSV('test-data/mfg_details_2.csv');
    console.log('Loaded manufacturers: ', mfgs);
} catch (err) {
    console.error('Error loading CSV:', err);
}


test.describe('auth tests', () => {
    test.use({ storageState: 'storage/auth.json' });
    for (const mfg of mfgs) {
        test('test mfg onboarding by mandatory fields', async ({ page }) => {
            await page.goto("https://qa.procalyx.net/dashboard");
            const apAdminDashboardPage = new ApAdminDashboardPage(page);
            await apAdminDashboardPage.goToMfgOnboarding();
            const manufacturerOnboardingListPage = new ManufacturerOnboardingListPage(page)
            await manufacturerOnboardingListPage.startManufacturerCreation();
            await expect(page.getByText(/MFG KYB/)).toBeVisible();
            const manufacturerOnboardingFormPage = new ManufacturerOnboardingFormPage(page);
            await manufacturerOnboardingFormPage.fillKybFields(mfg);
            await manufacturerOnboardingFormPage.selectMfg(mfg);
            await manufacturerOnboardingFormPage.fillLegalNameAndAddress(mfg);
            await manufacturerOnboardingFormPage.selectCategoryAndTherapy(mfg);
            await manufacturerOnboardingFormPage.selectGeography(mfg);
            await manufacturerOnboardingFormPage.selectApHkam(mfg);
            await manufacturerOnboardingFormPage.fillSpocDetails(mfg);
            await manufacturerOnboardingFormPage.selectContractStatus(mfg);
            await manufacturerOnboardingFormPage.clickSaveButton();
            await page.waitForTimeout(7000);
            //await expect(page).toHaveURL(/dashboard/);
        })
    }
})

