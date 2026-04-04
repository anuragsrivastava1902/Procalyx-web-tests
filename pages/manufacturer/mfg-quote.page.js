import { expect } from "@playwright/test";
import clearAndType from "../../utils/page-helpers/clearAndType.js";
import getFutureDateISO from "../../utils/page-helpers/getFutureDateISO.js";

export default class ManufacturerQuotePage {
    constructor(page) {
        this.page = page;
        this.disclaimerText = page.getByText('Disclaimer').nth(1);
        this.columnHeaders = page.locator('thead tr').nth(0).locator('th');
        this.searchHeaders = page.locator('thead tr').nth(1).locator('th').locator('input');
        this.itemRows = page.locator('table tbody tr');
        this.publishBtn = page.getByRole('button', { name: 'Publish' })
        this.confirmPublishBtn = page.locator('button').filter({ hasText: 'Publish' }).last()
    }

    async getQuotableRows() {
        const rowCount = await this.itemRows.count();
        const manufacturerColIndex = await this.getColumnIndex('Manufacturer Item Name');
        let quotableCount = 0;
        for (let i = 0; i < rowCount; i++) {
            const row = this.itemRows.nth(i);
            const manufacturerCell = row.locator('td').nth(manufacturerColIndex);
            const text = (await manufacturerCell.textContent())?.trim();
            if (text && text !== '-') {
                console.log(`Row ${i + 1}: "${text}" → Quotable`);
                await expect(manufacturerCell).toBeVisible();
                quotableCount++;
            } else {
                console.log(`Row ${i + 1}: Not Quotable`);
            }
        }
        console.log(`Total quotable rows: ${quotableCount}`);
        return quotableCount;
    }

    async fillQuoteDetailsAndSelectRows(mrpValue = '100', costValue = '80') {
        const rowCount = await this.itemRows.count();

        const manufacturerIndex = await this.getColumnIndex('Manufacturer Item Name');
        const mrpIndex = await this.getColumnIndex('MRP/Pack');
        const costIndex = await this.getColumnIndex('Cost WO GST/Pack');
        const dateIndex = await this.getColumnIndex('Quote Validity Date')
        const futureDate = await getFutureDateISO(7);

        let processedCount = 0;
        for (let i = 0; i < rowCount; i++) {
            const row = this.itemRows.nth(i);
            const manufacturerText = (await row.locator('td').nth(manufacturerIndex).textContent())?.trim();

            // Skip non-quotable rows
            if (!manufacturerText || manufacturerText === '-') {
                console.log(`Row ${i + 1}: Not quotable`);
                continue;
            }
            const mrpInput = row.locator('td').nth(mrpIndex).locator('input');
            await clearAndType(mrpInput, mrpValue);
            const costInput = row.locator('td').nth(costIndex).locator('input');
            await clearAndType(costInput, costValue);
            const dateInput = row.locator('td').nth(dateIndex).locator('input[type="date"]');
            await dateInput.fill(futureDate);
            await this.page.locator('body').click(); //click outside to trigger blur event and validation.
            if (Number(await mrpInput.inputValue()) > 0 && Number(await costInput.inputValue()) > 0) {
                const checkbox = row.locator('input[type="checkbox"]');
                await expect(checkbox).toBeEnabled({ timeout: 10000 });
                await checkbox.check();
                processedCount++;
            } else {
                console.log(`Row ${i + 1}: Invalid values, skipping selection`);
            }
        }
        return processedCount;
    }

    async getColumnIndex(columnName) {
        const headers = await this.page.locator('thead tr').nth(0).locator('th').allTextContents();
        const index = headers.findIndex(h => h.replace(/\s+/g, ' ').trim().includes(columnName));
        if (index === -1) {
            throw new Error(`Column "${columnName}" not found. Available: ${headers.join(', ')}`);
        }
        return index;
    };

    async searchInColumn(columnName, searchText) {
        const colIndex = await this.getColumnIndex(columnName);
        await this.page.locator('thead tr').nth(1).locator('th').nth(colIndex).locator('input').fill(searchText);
    }

    async publishQuote() {
        await this.publishBtn.scrollIntoViewIfNeeded();
        await this.publishBtn.click();
        await this.confirmPublishBtn.click();
    }

    async waitForQuotesToLoad() {
        await expect(this.publishBtn).toBeVisible({ timeout: 10000 });
    }

    async waitForPageToLoadComplete() {
        await expect(this.page.getByText('Loading'), "wait for table to load completely",).toBeHidden({ timeout: 20000 });
    }
}