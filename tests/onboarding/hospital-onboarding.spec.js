import { test, expect } from '@playwright/test';
import ApAdminDashboardPage from '../../pages/affordplan/dashboard/ap-admin-dashboard.page.js';
import HospitalOnboardingFormPage from '../../pages/affordplan/onboarding/hospital-onboarding-form.page.js';
import HospitalOnboardingListPage from '../../pages/affordplan/onboarding/hospital-onboarding-list.page.js';


import { readCSV } from '../../utils/readCSV';

let hospitals = [];
try {
    hospitals = readCSV('test-data/hospital_details.csv');
    //console.log('Loaded hospitals: ', hospitals);
} catch (err) {
    console.error('Error loading CSV:', err);
}

test.describe.parallel('hospital onboarding tests', () => {
    test.use({ storageState: 'storage/auth.json' });
    for (const hospital of hospitals) {
        test(`test hospital onboarding by mandatory fields for ${hospital.hospitalName}`, async ({ page }) => {
            const apAdminDashboardPage = new ApAdminDashboardPage(page);
            const hospitalOnboardingFormPage = new HospitalOnboardingFormPage(page);
            const hospitalOnboardingListPage = new HospitalOnboardingListPage(page);

            await page.goto('/dashboard');
            await apAdminDashboardPage.goToHospitalOnboarding();
            await hospitalOnboardingListPage.clickAddNewHospitalButton();
            await hospitalOnboardingFormPage.fillForm(hospital)
        })
    }
})