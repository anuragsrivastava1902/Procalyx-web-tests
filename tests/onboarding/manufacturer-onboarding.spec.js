import { test, expect } from '@playwright/test';
import ApAdminMenu from '../../pages/affordplan/ap-admin-menu.page';
import ManufacturerOnboardingFormPage from '../../pages/affordplan/onboarding/manufacturer-onboarding-form.page';
import ManufacturerOnboardingListPage from '../../pages/affordplan/onboarding/manufacturer-onboarding-list.page';
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
    const mfg = mfgs[0];
    test(`test mfg onboarding by mandatory fields for ${mfg.mfgName}}`, async ({ page }) => {
        await page.goto("/dashboard");
        const apAdminMenu = new ApAdminMenu(page);
        const manufacturerOnboardingListPage = new ManufacturerOnboardingListPage(page)
        const manufacturerOnboardingFormPage = new ManufacturerOnboardingFormPage(page);

        await apAdminMenu.goToMfgOnboarding();
        await manufacturerOnboardingListPage.waitForPageToLoadComplete();
        await manufacturerOnboardingListPage.viewUnassignedManufacturers();
        //await manufacturerOnboardingListPage.startManufacturerCreation();
        await manufacturerOnboardingListPage.waitForPageToLoadComplete();
        await manufacturerOnboardingListPage.editManufacturer();

        await expect(page.getByText("Edit Manufacturer")).toBeVisible();
        await manufacturerOnboardingFormPage.fillKybFields(mfg);
        //await manufacturerOnboardingFormPage.selectMfg(mfg);
        await manufacturerOnboardingFormPage.fillLegalNameAndAddress(mfg);
        await manufacturerOnboardingFormPage.selectCategoryAndTherapy(mfg);
        await manufacturerOnboardingFormPage.selectGeography(mfg);
        await manufacturerOnboardingFormPage.selectApHkam(mfg);
        await manufacturerOnboardingFormPage.fillSpocDetails(mfg);
        await manufacturerOnboardingFormPage.selectContractStatus(mfg);
        await manufacturerOnboardingFormPage.clickSaveButton();
        await manufacturerOnboardingFormPage.checkMessage("approv");
        //await page.pause()
        //await expect(page).toHaveURL(/dashboard/);
    })
})

