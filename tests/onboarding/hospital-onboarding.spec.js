import { test, expect } from '@playwright/test';
import DashboardPage from '../../pages/dashboard/ap-admin-dashboard.page.js';
import HospitalOnboardingForm from '../../pages/onboarding/hospital-onboarding-form.page.js';

import { readCSV } from '../../utils/readCSV';

let hospitals = [];
try {
    hospitals = readCSV('test-data/hospital_details.csv');
    console.log('Loaded hospitals: ', hospitals);
} catch (err) {
    console.error('Error loading CSV:', err);
}

test.describe('hospital onboarding tests', () => {
    test.use({ storageState: 'storage/auth.json' });
    for (const hospital of hospitals) {
        test('test hospital onboarding by mandatory fields', async ({ page }) => {
            await page.goto('/dashboard');
            const dashboardPage = new DashboardPage(page);
            dashboardPage.goToHospitalOnboarding();
            const hospitalOnboardingForm = new HospitalOnboardingForm(page);
            hospitalOnboardingForm.clickAddNewHospitalButton();
        })
    }
})