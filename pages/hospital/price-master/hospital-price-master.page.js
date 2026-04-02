import { expect } from '@playwright/test';

export default class HospitalPriceMasterPage {
    constructor(page) {
        this.page = page;
        this.hospitalUnitSearchInput = page.locator('[placeholder="Search hospital units..."]');
        this.dataTable = page.locator('[aria-label="Data table"]');
        this.columnSearchInputs = this.dataTable.locator('input[type="text"]');
    }

    async navigate() {
        await this.page.goto('/price-master');
        await this.page.waitForLoadState('networkidle');
    }

    async selectHospitalUnit(unitName) {
        await this.hospitalUnitSearchInput.fill(unitName);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }

    async verifyTableLoaded() {
        await expect(this.dataTable).toBeVisible({ timeout: 10000 });
    }

    async verifyItemStatus(brandName, expectedStatus) {
        // The Item Names column is the 6th column (index 5)
        const itemNamesSearchInput = this.columnSearchInputs.nth(5);
        await itemNamesSearchInput.fill(brandName);
        await this.page.waitForTimeout(1500); // Give time for the table to filter

        // Locate the filtered row
        const row = this.dataTable.locator('tbody tr', { hasText: brandName }).first();
        await expect(row).toBeVisible();

        // Check that the expected status (e.g. 'Approved') is displayed in the row
        await expect(row).toContainText(expectedStatus);
    }
}
