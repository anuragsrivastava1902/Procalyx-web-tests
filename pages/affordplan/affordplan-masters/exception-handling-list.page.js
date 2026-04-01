import { expect } from "@playwright/test";

export default class ExceptionHandlingListPage {
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Exception Handling' });
        this.rows = page.locator('tr')
        this.table = page.locator('table')
        this.hospitalNameSearchInput = this.table.locator("input").nth(0)
        this.unitNameSearchInput = page.locator("input").nth(1)
        this.unitCodeSearchInput = page.locator("input").nth(3)
        this.emailSearchInput = page.locator("input").nth(4)
        this.hospitalItemNameSearchInput = page.locator("input").nth(5)
        this.supplierNameSearchInput = page.locator("input").nth(8)
    }

    getRowByItemName(itemName) {
        return this.rows.filter({ hasText: itemName })
    }

    async editException(itemName) {
        const editButton = this.getRowByItemName(itemName).getByRole('button', { name: 'Edit' })
        await expect(editButton).toBeEnabled({ timeout: 10000 })
        await editButton.click();
    }

    async waitForPageToLoadComplete() {
        await expect(this.page.locator('.MuiSkeleton-root'), "wait for table to load completely",).toHaveCount(0, { timeout: 20000 });
    }
}