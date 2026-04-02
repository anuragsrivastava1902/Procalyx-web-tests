import { test, expect } from "@playwright/test";
import HospitalMenu from "../../../pages/hospital/hospital-menu.page.js";
import HospitalQuoteListPage from "../../../pages/hospital/quote-management/hospital-quote-list.page.js";
import HospitalQuoteDetailPage from "../../../pages/hospital/quote-management/hospital-quote-detail.page.js";
import HospitalPriceMasterPage from "../../../pages/hospital/price-master/hospital-price-master.page.js";

test.describe("hospital quote tests", () => {
    test.use({ storageState: "storage/auth.h_superadmin.json" });
    test("[@regression] hospital quote impact calculations test", async ({ page }) => {
        const hospitalMenu = new HospitalMenu(page);
        const hospitalQuoteListPage = new HospitalQuoteListPage(page);
        const hospitalQuoteDetailPage = new HospitalQuoteDetailPage(page);

        await page.goto("/hospital");
        await hospitalMenu.goToQuoteManagement();
        
        const mfsName = "IV Cannula|Not Applicable|null";
        await hospitalQuoteListPage.searchMfs(mfsName);
        await hospitalQuoteListPage.openMfs(mfsName);
        
        await hospitalQuoteDetailPage.verifyImpactCalculations("IV Cannula 18G");
    });

    test("[@regression] hospital quote approval test", async ({ page }) => {
        const hospitalMenu = new HospitalMenu(page);
        const hospitalQuoteListPage = new HospitalQuoteListPage(page);
        const hospitalQuoteDetailPage = new HospitalQuoteDetailPage(page);

        await page.goto("/hospital");
        await hospitalMenu.goToQuoteManagement();
        const mfsName = "IV Cannula|Not Applicable|null";
        await hospitalQuoteListPage.searchMfs(mfsName);
        await hospitalQuoteListPage.openMfs(mfsName);

        // 1. Approve Brand
        await hospitalQuoteDetailPage.selectAndApproveBrand("IV Cannula 20G");

        // 2. Navigate to Price Master
        await page.goto("/hospital/price-master");

        // 3. Verify the updated status in Price Master
        const hospitalPriceMasterPage = new HospitalPriceMasterPage(page);

        await hospitalPriceMasterPage.verifyTableLoaded();
        await hospitalPriceMasterPage.verifyItemStatus("IV Cannula 20G", "Approved");
    });

    test("[@regression] hospital quote rejection tests", async ({ page }) => {
        const hospitalMenu = new HospitalMenu(page);
        const hospitalQuoteListPage = new HospitalQuoteListPage(page);
        const hospitalQuoteDetailPage = new HospitalQuoteDetailPage(page);

        await page.goto("/hospital");
        await hospitalMenu.goToQuoteManagement();
        const mfsName = "IV Cannula|Not Applicable|null";
        await hospitalQuoteListPage.searchMfs(mfsName);
        await hospitalQuoteListPage.openMfs(mfsName);
        
        // 1. Reject Brand
        await hospitalQuoteDetailPage.selectAndRejectBrand("IV Cannula 18G");

        // 2. Navigate to Price Master
        await page.goto("/hospital/price-master");

        // 3. Verify the updated status in Price Master
        const hospitalPriceMasterPage = new HospitalPriceMasterPage(page);

        await hospitalPriceMasterPage.verifyTableLoaded();
        await hospitalPriceMasterPage.verifyItemStatus("IV Cannula 18G", "Rejected");
    });
});