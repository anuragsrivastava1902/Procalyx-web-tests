import { expect, test } from "@playwright/test";
import ManufacturerDashboardPage from "../../pages/manufacturer/manufacturer-menu.page";
import ManufacturerQuotePage from "../../pages/manufacturer/mfg-quote.page";

test.describe('test quoting', () => {
    test.use({ storageState: 'storage/auth.m_superadmin.json' });
    test('quote publish test', async ({ page }) => {
        test.setTimeout(120_000);
        const manufacturerDashboardPage = new ManufacturerDashboardPage(page)
        const manufacturerQuotePage = new ManufacturerQuotePage(page)

        await page.goto('/manufacturer')
        await manufacturerDashboardPage.goToQuoteScreen();
        // await manufacturerQuotePage.waitForPageToLoadComplete()
        await manufacturerQuotePage.waitForQuotesToLoad();
        await manufacturerQuotePage.searchInColumn("MFS", "Saroglitazar|Tablets|4MG");
        await manufacturerQuotePage.searchInColumn("Hospital Unit Name", "Delta");
        await page.waitForTimeout(5000)
        const quotableCount = await manufacturerQuotePage.getQuotableRows();
        await manufacturerQuotePage.fillQuoteDetailsAndSelectRows('100', '80');
        console.log(`Total quotable rows: ${quotableCount}`);
        await manufacturerQuotePage.publishQuote();


    })
})