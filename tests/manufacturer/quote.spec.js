import { expect, test } from "@playwright/test";
import ManufacturerDashboardPage from "../../pages/affordplan/dashboard/manufacturer-dashboard.page";
import ManufacturerQuotePage from "../../pages/manufacturer/mfg-quote-page";

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
        await manufacturerQuotePage.findRows();
        await manufacturerQuotePage.publishQuote();
        

    })
})