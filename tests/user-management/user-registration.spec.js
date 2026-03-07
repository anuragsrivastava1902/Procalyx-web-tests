import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/auth/login.page.js';
import ApAdminDashboardPage from '../../pages/dashboard/ap-admin-dashboard.page.js';
import ApAdminUserManagementFormPage from '../../pages/user-management/ap-admin-user-mgmt-form.page.js';
import ApAdminUserManagementListPage from '../../pages/user-management/ap-admin-user-mgmt-list.page.js';



import { readCSV } from '../../utils/readCSV.js';

let users = [];
try {
    users = readCSV('test-data/user_details.csv');
    console.log('Loaded users: ', users);

} catch (err) {
    console.error('Error loading CSV:', err);
}

test.describe('user management tests', () => {
    test.use({ storageState: 'storage/auth.json' });
    for (const user of users) {
        test(`check user Registration - ${user.name}`, async ({ page }) => {
            //await page.pause();
            await page.goto("https://qa.procalyx.net/dashboard");
            const apAdminDashboardPage = new ApAdminDashboardPage(page);
            await apAdminDashboardPage.goToUserManagement();
            const apAdminUserManagementListPage = new ApAdminUserManagementListPage(page);
            await expect(page.getByText('Create New User')).toBeVisible();
            await apAdminUserManagementListPage.startNewUserCreation();
            const apAdminUserManagementFormPage = new ApAdminUserManagementFormPage(page);
            await apAdminUserManagementFormPage.enterBasicInfo(user);
            await apAdminUserManagementFormPage.selectOrganisationDetails(user);
            await apAdminUserManagementFormPage.selectGeographyDetails(user);
            await apAdminUserManagementFormPage.selectConditionalDropdowns(user);
            await apAdminUserManagementFormPage.clickSaveButton();
            await page.waitForTimeout(5000);
        })
    }
})
