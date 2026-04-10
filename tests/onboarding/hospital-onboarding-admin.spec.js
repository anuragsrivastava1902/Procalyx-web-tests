import { test, expect } from '@playwright/test';
import { readCSV } from '../../utils/data/readCSV';
import ApAdminMenu from '../../pages/affordplan/ap-admin-menu.page.js';
import HospitalOnboardingFormPage from '../../pages/affordplan/onboarding/hospital-onboarding-form.page.js';
import HospitalOnboardingListPage from '../../pages/affordplan/onboarding/hospital-onboarding-list.page.js';
import { generateEmail, generateMobileNumber } from '../../utils/data/generateTestData';

let hospitals = [];
try {
    hospitals = readCSV('test-data/hospital_details.csv');
    //console.log('Loaded hospitals: ', hospitals);
} catch (err) {
    console.error('Error loading CSV:', err);
}

test.describe.parallel('hospital onboarding tests', () => {
    const hospital = hospitals[0]
    test(`test hospital onboarding for mandatory fields by ap superadmin`, async ({ browser }) => {
        const context = await browser.newContext({ storageState: 'storage/auth.ap_superadmin.json' });
        const page = await context.newPage();
        hospital.spocPhone = generateMobileNumber()
        hospital.spocEmail = generateEmail(hospital.spocName, hospital.hospitalName)

        const apAdminMenu = new ApAdminMenu(page);
        const hospitalOnboardingFormPage = new HospitalOnboardingFormPage(page);
        const hospitalOnboardingListPage = new HospitalOnboardingListPage(page);

        await page.goto('/dashboard');
        await apAdminMenu.goToHospitalOnboarding()
        await hospitalOnboardingListPage.clickAddNewHospitalButton();
        await hospitalOnboardingFormPage.fillHospitalKyb(hospital)
        await hospitalOnboardingFormPage.fillHospitalInfo(hospital)
        await hospitalOnboardingFormPage.fillHospitalHIS(hospital)
        await hospitalOnboardingFormPage.fillHospitalInfra(hospital)
        await hospitalOnboardingFormPage.selectApHkam({ isKamUser: false })
        await hospitalOnboardingFormPage.fillHospitalSpocDetails(hospital)
        await hospitalOnboardingFormPage.fillHospitalContract(hospital)
        await hospitalOnboardingFormPage.fillHospitalCommercials(hospital);
        await hospitalOnboardingFormPage.fillHospitalBankDetails(hospital)
        await hospitalOnboardingFormPage.saveHospital()
        await hospitalOnboardingFormPage.verifyNudge()
    })
})