import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/auth/login.page.js';
import ApAdminDashboardPage from '../../pages/dashboard/ap-admin-dashboard.page.js';
import ApAdminUserManagementFormPage from '../../pages/user-management/ap-admin-user-mgmt-form.page.js';
import ApAdminUserManagementListPage from '../../pages/user-management/ap-admin-user-mgmt-list.page.js';



import { readCSV } from '../../utils/readCSV.js';

let users = [];
try {
    users = readCSV('test-data/user_details.csv');
    console.log('Loaded users: ', users.length);

} catch (err) {
    console.error('Error loading CSV:', err);
}

test.describe('user management tests', () => {
    test.use({ storageState: 'storage/auth.ap_superadmin.json' });
    for (const user of users) {
        if (user?.name?.trim()) {
        test(`check user Registration - ${user.name}`, async ({ page }) => {
                await page.goto("https://qa.procalyx.net/dashboard");
                const apAdminDashboardPage = new ApAdminDashboardPage(page);
                const apAdminUserManagementListPage = new ApAdminUserManagementListPage(page);
                const apAdminUserManagementFormPage = new ApAdminUserManagementFormPage(page);

                await apAdminDashboardPage.goToUserManagement();
                await expect(apAdminUserManagementListPage.userManagementHeading).toBeVisible();
                await expect(apAdminUserManagementListPage.addUserBtn).toBeEnabled();
                await apAdminUserManagementListPage.startNewUserCreation();
                await apAdminUserManagementFormPage.enterBasicInfo(user);
                await apAdminUserManagementFormPage.selectOrganisationDetails(user);
                await apAdminUserManagementFormPage.selectGeographyDetails(user);
                await apAdminUserManagementFormPage.selectConditionalDropdowns(user);
                await apAdminUserManagementFormPage.clickSaveButton();
            })
        }
    }
})
