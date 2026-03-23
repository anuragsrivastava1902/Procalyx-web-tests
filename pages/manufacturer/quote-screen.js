import { expect } from "@playwright/test";

export default class ManufacturerQuotePage {
    constructor(page) {
        this.page = page;
        this.disclaimerText = page.getByText('Disclaimer').nth(1);
        this.rows = page.locator('table tbody tr');
        this.publishBtn = page.getByRole('button', { name: 'Publish' })
        this.confirmPublishBtn = page.locator('button').filter({ hasText: 'Publish' }).last()
    }

    async findRows() {
        const rowCount = await this.rows.count();
        console.log(rowCount);
        const headers = this.page.locator('table thead th');
        const headerCount = await headers.count();
        console.log(headerCount)
        let manufacturerColIndex = -1;
        for (let i = 0; i < headerCount; i++) {
            const headerText = await headers.nth(i).textContent();
            if (headerText?.includes('Manufacturer Item Name')) {
                manufacturerColIndex = i;
                break;
            }
        }
        console.log("index is: ", manufacturerColIndex)

        for (let i = 0; i < rowCount; i++) {
            const row = this.rows.nth(i);
            const manufacturerCell = row.locator('td').nth(manufacturerColIndex);
            const text = await manufacturerCell.textContent();
            if (text && text.trim().length > 0) {
                console.log(`Row ${i} with item name: ${text} is QUOTABLE`);
                // assertion if needed
                await expect(manufacturerCell).toBeVisible();
                await row.locator('td').nth(0).click();
            } else {
                console.log(`Row ${i} is NOT QUOTABLE`);
                // assertion if needed
                await expect(manufacturerCell).toBeEmpty();
            }
        }
    }

    async publishQuote(){
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