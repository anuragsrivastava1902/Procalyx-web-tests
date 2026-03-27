import { test, expect } from '@playwright/test';
import { readCSV } from '../../utils/readCSV';
import ApAdminMenu from '../../pages/affordplan/ap-admin-menu.page.js';
import HospitalOnboardingFormPage from '../../pages/affordplan/onboarding/hospital-onboarding-form.page.js';
import HospitalOnboardingListPage from '../../pages/affordplan/onboarding/hospital-onboarding-list.page.js';
import ApHkamMenu from '../../pages/affordplan/ap-hkam-menu.page';

let hospitals = [];
try {
    hospitals = readCSV('test-data/hospital_details.csv');
    //console.log('Loaded hospitals: ', hospitals);
} catch (err) {
    console.error('Error loading CSV:', err);
}

test.describe.parallel('hospital onboarding tests', () => {
    // test.use({ storageState: 'storage/auth.ap_superadmin.json' });
    test(`test hospital onboarding for mandatory fields by ap superadmin`, async ({ browser }) => {
        const context = await browser.newContext({ storageState: 'storage/auth.ap_superadmin.json' });
        const page = await context.newPage();

        const apAdminMenu = new ApAdminMenu(page);
        const hospitalOnboardingFormPage = new HospitalOnboardingFormPage(page);
        const hospitalOnboardingListPage = new HospitalOnboardingListPage(page);

        await page.goto('/dashboard');
        await apAdminMenu.goToHospitalOnboarding()
        await hospitalOnboardingListPage.clickAddNewHospitalButton();
        await hospitalOnboardingFormPage.fillForm(hospitals[0], { isKamUser: false })
    })

    // test.use({ storageState: 'storage/auth.ap_hkam.json' });
    test(`test hospital onboarding for mandatory fields by ap hkam`, async ({browser}) => {
        const context = await browser.newContext({ storageState: 'storage/auth.ap_hkam.json' });
        const page = await context.newPage();

        const apHkamMenu = new ApHkamMenu(page);
        const hospitalOnboardingFormPage = new HospitalOnboardingFormPage(page);
        const hospitalOnboardingListPage = new HospitalOnboardingListPage(page);

        await page.goto('/dashboard');
        await apHkamMenu.goToHospitalOnboarding()
        await hospitalOnboardingListPage.clickAddNewHospitalButton();
        await hospitalOnboardingFormPage.fillForm(hospitals[0], { isKamUser: true })
    })
})