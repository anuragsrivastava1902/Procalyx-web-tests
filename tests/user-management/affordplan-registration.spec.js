import { test, expect } from '@playwright/test';
import ApAdminUserManagementFormPage from '../../pages/affordplan/user-management/ap-admin-user-mgmt-form.page.js';
import ApAdminUserManagementListPage from '../../pages/affordplan/user-management/ap-admin-user-mgmt-list.page.js';
import { readCSV } from '../../utils/data/readCSV.js';
import ApAdminMenu from '../../pages/affordplan/ap-admin-menu.page.js';

let users = [];
try {
    const allUsers = readCSV('test-data/user_details.csv');
    users = allUsers.filter(u => u.relationship?.trim().toLowerCase() === 'affordplan');
    console.log('Loaded Affordplan users: ', users.length);
} catch (err) {
    console.error('Error loading CSV:', err);
}

test.describe('Affordplan User Management Tests', () => {
    test.use({ storageState: 'storage/auth.ap_superadmin.json' });
    
    for (const user of users) {
        if (user?.name?.trim()) {
            test(`check Affordplan User Registration - ${user.name}`, async ({ page }) => {
                await page.goto("/dashboard");
                const apAdminMenu = new ApAdminMenu(page);
                const apAdminUserManagementListPage = new ApAdminUserManagementListPage(page);
                const apAdminUserManagementFormPage = new ApAdminUserManagementFormPage(page);

                await apAdminMenu.goToUserManagement();
                await expect(apAdminUserManagementListPage.userManagementHeading).toBeVisible();
                await expect(apAdminUserManagementListPage.addUserBtn).toBeEnabled();
                await apAdminUserManagementListPage.startNewUserCreation();
                await apAdminUserManagementFormPage.enterBasicInfo(user);
                await apAdminUserManagementFormPage.selectOrganisationDetails(user);
                await apAdminUserManagementFormPage.selectGeographyDetails(user);
                await apAdminUserManagementFormPage.selectConditionalDropdowns(user);
                await apAdminUserManagementFormPage.clickSaveButton();
                await apAdminUserManagementFormPage.verifyAlertMessage();
            });
        }
    }
});
