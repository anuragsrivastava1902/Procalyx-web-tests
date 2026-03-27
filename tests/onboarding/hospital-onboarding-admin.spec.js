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
    test(`test hospital onboarding for mandatory fields by ap superadmin`, async ({ browser }) => {
        const context = await browser.newContext({ storageState: 'storage/auth.ap_superadmin.json' });
        const page = await context.newPage();

        const apAdminMenu = new ApAdminMenu(page);
        const hospitalOnboardingFormPage = new HospitalOnboardingFormPage(page);
        const hospitalOnboardingListPage = new HospitalOnboardingListPage(page);

        await page.goto('/dashboard');
        await apAdminMenu.goToHospitalOnboarding()
        await hospitalOnboardingListPage.check()
        await page.pause()
        await hospitalOnboardingListPage.clickAddNewHospitalButton();
        await hospitalOnboardingFormPage.fillHospitalKyb(hospitals[0])
        await hospitalOnboardingFormPage.fillHospitalInfo(hospitals[0])
        await hospitalOnboardingFormPage.fillHospitalHIS(hospitals[0])
        await hospitalOnboardingFormPage.fillHospitalInfra(hospitals[0])
        await hospitalOnboardingFormPage.selectApHkam({ isKamUser: false })
        await hospitalOnboardingFormPage.fillHospitalSpocDetails(hospitals[0])
        await hospitalOnboardingFormPage.fillHospitalContract(hospitals[0])
        await hospitalOnboardingFormPage.fillHospitalCommercials(hospitals[0]);
        await hospitalOnboardingFormPage.fillHospitalBankDetails(hospitals[0])
        await hospitalOnboardingFormPage.saveHospital()
        await hospitalOnboardingFormPage.verifyNudge()
    })


    
})