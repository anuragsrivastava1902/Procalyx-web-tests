import { expect, test } from "@playwright/test";
import ManufacturerDashboardPage from "../../pages/dashboard/manufacturer-dashboard.page";



test.describe('testing manufacturer navigation', () => {
    test.use({ storageState: 'storage/auth.json' });
    test(`testing manufacturer navigation`, async ({ page }) => {
        const manufacturerDashboardPage = new ManufacturerDashboardPage(page);
        await page.goto('/manufacturer')
        await manufacturerDashboardPage.goToDashboard();
        await manufacturerDashboardPage.goToManagementConsole();
        await manufacturerDashboardPage.goToUserManagement();
        await manufacturerDashboardPage.goToQuoteRepository();
        await manufacturerDashboardPage.goToQuoteScreen();
        await page.pause();
     })
})
