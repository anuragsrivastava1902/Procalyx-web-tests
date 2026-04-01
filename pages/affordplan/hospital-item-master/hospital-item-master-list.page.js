import { expect } from "@playwright/test";

export default class HospitalItemMasterListPage {
    constructor(page) {
        this.page = page;
        this.rows = page.locator('tr')
        this.table = page.locator('table')
    }

    getRowByItemName(itemName) {
        return this.rows.filter({ hasText: itemName })
    }

    async editHospitalItem(itemName) {
        const editButton = this.getRowByItemName(itemName).getByRole('button', { name: 'Edit' })
        await expect(editButton).toBeEnabled({ timeout: 10000 })
        await editButton.click();
    }

    async waitForPageToLoadComplete() {
        await expect(this.page.locator('.MuiSkeleton-root'), "wait for table to load completely",).toHaveCount(0, { timeout: 20000 });
    }
}