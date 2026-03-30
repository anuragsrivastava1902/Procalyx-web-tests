import { test, expect } from "@playwright/test";
import ApAdminDashboardPage from "../../pages/affordplan/dashboard/ap-admin-dashboard.page";
import ExceptionHandlingFormPage from "../../pages/affordplan/affordplan-masters/exception-handling-form.page";
import ExceptionHandlingListPage from "../../pages/affordplan/affordplan-masters/exception-handling-list.page";

test.describe('testing exception handling', () => {
    test.use({ storageState: 'storage/auth.json' });
    test(`test edit exception page is opened?}`, async ({ page }) => {
        const apAdminDashboardPage = new ApAdminDashboardPage(page);
        const exceptionHandlingListPage = new ExceptionHandlingListPage(page);
        const exceptionHandlingFormPage = new ExceptionHandlingFormPage(page);
        await page.goto("/dashboard");
        await apAdminDashboardPage.goToExceptionHandling();
        await exceptionHandlingListPage.waitForPageToLoadComplete();
        await page.pause()
        await exceptionHandlingListPage.editException();
    })
})


