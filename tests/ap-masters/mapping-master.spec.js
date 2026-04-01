import { test, expect } from '@playwright/test';
import { readCSV } from '../../utils/readCSV.js';
import ApAdminDashboardPage from '../../pages/affordplan/dashboard/ap-admin-dashboard.page.js';
import MappingMasterListPage from '../../pages/affordplan/affordplan-masters/mapping-masters-list.page.js';
import MappingMasterFormPage from '../../pages/affordplan/affordplan-masters/mapping-masters-form.page.js';

let mappings = [];
try {
    mappings = readCSV('test-data/mappings.csv');
    console.log('Mappings >>>> : ', mappings);
} catch (err) {
    console.error('Error loading CSV:', err);
}

test.describe('testing mapping master', () => {
    test.use({ storageState: 'storage/auth.json' });
    test(`test mapping creation}`, async ({ page }) => {
        const apAdminDashboardPage = new ApAdminDashboardPage(page);
        const mappingMasterListPage = new MappingMasterListPage(page);
        const mappingMasterFormPage = new MappingMasterFormPage(page);
        const mapping = mappings[0];

        await page.goto("/dashboard");
        await apAdminDashboardPage.goToMappingMasters();
        await mappingMasterListPage.openMappingForm('cloud testing unit r09');
        await mappingMasterFormPage.fillForm(mapping);
        await mappingMasterFormPage.saveForm();
        await mappingMasterFormPage.verifySuccessMessage()



    })

})