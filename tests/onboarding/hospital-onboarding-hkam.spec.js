import { test, expect } from '@playwright/test';
import { readCSV } from '../../utils/readCSV';
import ApAdminMenu from '../../pages/affordplan/ap-admin-menu.page.js';
import HospitalOnboardingFormPage from '../../pages/affordplan/onboarding/hospital-onboarding-form.page.js';
import HospitalOnboardingListPage from '../../pages/affordplan/onboarding/hospital-onboarding-list.page.js';
import ApHkamMenu from '../../pages/affordplan/ap-hkam-menu.page';
import { generateEmail, generateMobileNumber } from '../../utils/generateTestData';

let hospitals = [];
try {
    hospitals = readCSV('test-data/hospital_details.csv');
    //console.log('Loaded hospitals: ', hospitals);
} catch (err) {
    console.error('Error loading CSV:', err);
}

test.describe.parallel('hospital onboarding tests', () => {
    const hospital = hospitals[1]
    test(`test hospital onboarding for mandatory fields by ap hkam`, async ({ browser }) => {
        const context = await browser.newContext({ storageState: 'storage/auth.ap_hkam.json' });
        const page = await context.newPage();
        hospital.spocPhone = generateMobileNumber()
        hospital.spocEmail = generateEmail(hospital.spocName, hospital.hospitalName)

        const apHkamMenu = new ApHkamMenu(page);
        const hospitalOnboardingFormPage = new HospitalOnboardingFormPage(page);
        const hospitalOnboardingListPage = new HospitalOnboardingListPage(page);

        await page.goto('/dashboard');
        await apHkamMenu.goToHospitalOnboarding()
        await hospitalOnboardingListPage.clickAddNewHospitalButton();
        await hospitalOnboardingFormPage.fillHospitalKyb(hospital)
        await hospitalOnboardingFormPage.fillHospitalInfo(hospital)
        await hospitalOnboardingFormPage.fillHospitalHIS(hospital)
        await hospitalOnboardingFormPage.fillHospitalInfra(hospital)
        await hospitalOnboardingFormPage.selectApHkam({ isKamUser: true })
        await hospitalOnboardingFormPage.fillHospitalSpocDetails(hospital)
        await hospitalOnboardingFormPage.fillHospitalContract(hospital)
        await hospitalOnboardingFormPage.fillHospitalCommercials(hospital);
        await hospitalOnboardingFormPage.fillHospitalBankDetails(hospital)
        await hospitalOnboardingFormPage.saveHospital()
        await hospitalOnboardingFormPage.verifyNudge()

        context.close();

        const adminContext = await browser.newContext({ storageState: 'storage/auth.ap_superadmin.json' });
        const adminPage = await adminContext.newPage();
        
        const apAdminMenu = new ApAdminMenu(adminPage);
        const hospitalOnboardingListPage2 = new HospitalOnboardingListPage(adminPage)
        await adminPage.goto('/dashboard');
        await apAdminMenu.goToHospitalOnboarding();
        await hospitalOnboardingListPage2.approveHospital(hospitals[1].hospitalName)
        // await adminPage.pause();

    })

})