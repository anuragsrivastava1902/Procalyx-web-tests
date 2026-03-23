import { expect, test } from "@playwright/test";
import ManufacturerDashboardPage from "../../pages/dashboard/manufacturer-dashboard.page";
import ManufacturerQuotePage from "../../pages/manufacturer/quote-screen";

test.describe('test quoting', () => {
    test.use({ storageState: 'storage/auth.json' });
    test('quote publish test', async ({ page }) => {
        test.setTimeout(120_000);
        const manufacturerDashboardPage = new ManufacturerDashboardPage(page)
        const manufacturerQuotePage = new ManufacturerQuotePage(page)

        await page.goto('/manufacturer')
        await manufacturerDashboardPage.goToQuoteScreen();
        // await manufacturerQuotePage.waitForPageToLoadComplete()
        await manufacturerQuotePage.waitForQuotesToLoad();
        //await page.waitForTimeout(5000)
        await manufacturerQuotePage.findRows();
        await manufacturerQuotePage.publishQuote();
        

    })
})