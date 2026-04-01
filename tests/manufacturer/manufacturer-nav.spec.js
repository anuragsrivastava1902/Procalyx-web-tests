import { expect, test } from "@playwright/test";
import ManufacturerDashboardPage from "../../pages/manufacturer/manufacturer-menu.page";



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
    })
})  
