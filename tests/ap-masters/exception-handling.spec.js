import { test, expect } from "@playwright/test";
import ApAdminMenu from "../../pages/affordplan/ap-admin-menu.page";
import ExceptionHandlingListPage from "../../pages/affordplan/affordplan-masters/exception-handling-list.page";
import ExceptionHandlingEditPage from "../../pages/affordplan/affordplan-masters/exception-handling-edit.page";

test.describe('testing exception handling', () => {
    test.use({ storageState: 'storage/auth.ap_superadmin.json' });
    test(`test edit exception page is opened?}`, async ({ page }) => {
        const apAdminMenu = new ApAdminMenu(page);
        const exceptionHandlingListPage = new ExceptionHandlingListPage(page);
        const exceptionHandlingEditPage = new ExceptionHandlingEditPage(page);

        await page.goto("/dashboard");
        await apAdminMenu.goToExceptionHandling();
        await exceptionHandlingListPage.waitForPageToLoadComplete();
        const itemName = 'NU PATCH 200 MG (DICLOFNAC )'
        await exceptionHandlingListPage.editException(itemName);
        await exceptionHandlingEditPage.searchApItem(itemName.split(' ')[0])
        await exceptionHandlingEditPage.saveException()
    })
})


