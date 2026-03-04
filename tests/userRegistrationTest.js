import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import DashboardPage from '../pages/dashboardPage';
import UserManagementForm from '../pages/userManagementForm';
import { readCSV } from '../utils/readCSV';

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
            await page.goto("https://procalyx.org/dashboard");
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.clickAddNewUserButton();
            await expect(page.getByText('Create New User')).toBeVisible();
            const userManagementForm = new UserManagementForm(page);
            await userManagementForm.enterBasicInfo(user);
            await userManagementForm.selectOrganisationDetails(user);
            await userManagementForm.selectGeographyDetails(user);
            await userManagementForm.selectConditionalDropdowns(user);
            await userManagementForm.clickSaveButton();
            await page.waitForTimeout(5000);
        })
    }
})
