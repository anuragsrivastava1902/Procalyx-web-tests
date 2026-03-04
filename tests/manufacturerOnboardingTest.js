import { test, expect } from '@playwright/test';
import DashboardPage from '../pages/dashboardPage';
import MfgOnboardingForm from '../pages/mfgOnboardingForm';
import { readCSV } from '../utils/readCSV';

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
            await page.goto("https://procalyx.org/dashboard");
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.clickMfgOnboardingLink();
            await dashboardPage.clickAddManufacturer();
            await expect(page.getByText(/MFG KYB/)).toBeVisible();

            const mfgOnboardingForm = new MfgOnboardingForm(page);
            await mfgOnboardingForm.fillKybFields(mfg);
            await mfgOnboardingForm.selectMfg(mfg);
            await mfgOnboardingForm.fillLegalNameAndAddress(mfg);
            await mfgOnboardingForm.selectCategoryAndTherapy(mfg);
            await mfgOnboardingForm.selectGeography(mfg);
            await mfgOnboardingForm.selectApHkam(mfg);
            await mfgOnboardingForm.fillSpocDetails(mfg);
            await mfgOnboardingForm.selectContractStatus(mfg);
            await mfgOnboardingForm.clickSaveButton();
            await page.waitForTimeout(7000);
            //await expect(page).toHaveURL(/dashboard/);
        })
    }
})

