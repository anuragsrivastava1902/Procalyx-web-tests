import { expect, test } from "@playwright/test"
import ManagementConsolePage from "../../pages/manufacturer/management-console.page";
import ManufacturerDashboardPage from "../../pages/affordplan/dashboard/manufacturer-dashboard.page";

test.describe('management console', () => {
    test.use({ storageState: 'storage/auth.json' })
    test('management console test', async ({ page }) => {
        const manufacturerDashboardPage = new ManufacturerDashboardPage(page);
        const managementConsolePage = new ManagementConsolePage(page);
        await page.goto('/manufacturer')
        await manufacturerDashboardPage.goToManagementConsole();
        await managementConsolePage.waitForPageToLoadComplete();
        await managementConsolePage.findRows();
    })
})