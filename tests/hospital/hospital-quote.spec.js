import { test, expect } from "@playwright/test";
import HospitalMenu from "../../pages/hospital/hospital-menu.page";
import HospitalQuoteListPage from "../../pages/hospital/quote-management/hospital-quote-list.page";
import HospitalQuoteDetailPage from "../../pages/hospital/quote-management/hospital-quote-detail.page.js";

test.describe("hospital quote tests", () => {
    test.use({ storageState: "storage/auth.h_superadmin.json" });
    test("hospital quote tests", async ({ page }) => {
        const hospitalMenu = new HospitalMenu(page);
        const hospitalQuoteListPage = new HospitalQuoteListPage(page);
        const hospitalQuoteDetailPage = new HospitalQuoteDetailPage(page);

        await page.goto("/hospital");
        await hospitalMenu.goToQuoteManagement();
        const mfsName = "Nitazoxanide|Tablets|500MG";
        await hospitalQuoteListPage.searchMfs(mfsName);
        await hospitalQuoteListPage.openMfs(mfsName);
        
        await hospitalQuoteDetailPage.verifyImpactCalculations("Nitazet 500");
    });
});