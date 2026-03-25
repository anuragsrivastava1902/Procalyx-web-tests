import { expect } from "@playwright/test";

export default class ManagementConsolePage {
    constructor(page) {
        this.page = page;
        this.managementConsoleHeading = page.getByRole('heading', { name: 'Management Console' })
        this.rows = page.locator('table tbody tr');
        this.hospitalUnitNameHeader = page.getByText('Hospital Unit Name')
    }

    async findRows() {
        const rowCount = await this.rows.count();
        console.log(rowCount);
        const headers = this.page.locator('table thead th');
        const headerCount = await headers.count();
        console.log(headerCount)
        let unitNameColIndex = -1;
        for (let i = 0; i < headerCount; i++) {
            const headerText = await headers.nth(i).textContent();
            if (headerText?.includes('Hospital Unit Name')) {
                unitNameColIndex = i;
                break;
            }
        }
        console.log("index is: ", unitNameColIndex)

        for (let i = 0; i < rowCount; i++) {
            const row = this.rows.nth(i);
            const hospitalUnitCell = row.locator('td').nth(unitNameColIndex);
            const text = await hospitalUnitCell.innerText();
            console.log(text);
            if (text && text.trim().length > 0) {
                console.log(`Row ${i} with item name: ${text} is QUOTABLE`);
                // assertion if needed
                await expect(hospitalUnitCell).toBeVisible();
                await row.locator('td').nth(0).click();
            } else {
                console.log(`Row ${i} is NOT QUOTABLE`);
                // assertion if needed
                await expect(hospitalUnitCell).toBeEmpty();
            }
        }
    }

    async waitForPageToLoadComplete() {
        await expect((this.hospitalUnitNameHeader), "wait for table to load completely").toBeVisible({ timeout: 20000 });
    }
}