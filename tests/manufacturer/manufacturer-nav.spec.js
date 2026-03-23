import { expect, test } from "@playwright/test";
import ManufacturerDashboardPage from "../../pages/dashboard/manufacturer-dashboard.page";



test.describe('testing manufacturer navigation', () => {
    test.use({ storageState: 'storage/auth.json' });
    test(`testing manufacturer navigation`, async ({ page }) => {
        const manufacturerDashboardPage = new ManufacturerDashboardPage(page);
        await page.goto('/manufacturer')
        await manufacturerDashboardPage.goToDashboard();
        await page.waitForTimeout(2000);
        await manufacturerDashboardPage.goToManagementConsole();
        await page.waitForTimeout(2000);
        await manufacturerDashboardPage.goToUserManagement();
        await page.waitForTimeout(2000);
        await manufacturerDashboardPage.goToQuoteRepository();
        await page.waitForTimeout(2000);
        await manufacturerDashboardPage.goToQuoteScreen();
        await page.pause();
     })
})
