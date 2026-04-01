import { expect, test } from "@playwright/test";
import HospitalDashboardPage from "../../pages/hospital/dashboard/hospital-dashboard.page";
import HospitalQuoteMgmtPage from "../../pages/hospital/quote-management/hospital-quote-list.page";
import HospitalMenu from "../../pages/hospital/hospital-menu.page";

test.describe('testing hospital side', () => {
    test.use({ storageState: 'storage/auth.h_superadmin.json' });
    test('test navigations', async ({ page }) => {
        const hospitalMenu = new HospitalMenu(page);
        const hospitalQuoteMgmtPage = new HospitalQuoteMgmtPage(page)
        await page.goto('/hospital')
        // await hospitalDashboardPage.readQuoteRecieved();
        // await hospitalDashboardPage.readQuoteSinceLastLogin()
        // await hospitalDashboardPage.readMfsAwaitingApproval()
        // await hospitalDashboardPage.readApprovedItems()
        // await hospitalDashboardPage.readRejectedItems()
        // await hospitalDashboardPage.readUnquotedItems()
        await hospitalMenu.goToQuoteManagement();
        await hospitalQuoteMgmtPage.waitForPageToLoadComplete()
        // await page.waitForTimeout(5000)
        await hospitalQuoteMgmtPage.getTotalItemsFromPagination()
        await hospitalQuoteMgmtPage.viewAdditionalMfs();
        await hospitalQuoteMgmtPage.getTotalItemsFromPagination()
        // await page.pause();
        // await hospitalMenu.goToDashboard();

        // await page.waitForTimeout(4000)
        // await page.waitForTimeout(4000)
        // await hospitalMenu.goToPriceMaster();
        // await page.waitForTimeout(4000)
        // await hospitalMenu.goToUserManagement();
        // await page.waitForTimeout(4000)
    })
})