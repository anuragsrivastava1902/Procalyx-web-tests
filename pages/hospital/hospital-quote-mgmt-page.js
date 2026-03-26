import { expect } from "@playwright/test"

export default class HospitalQuoteMgmtPage {
    constructor(page) {
        this.page = page
        this.currentMfsBtn = page.getByRole('button', { name: /Current MFS/i })
        this.additionalMfsBtn = page.getByRole('button', { name: /Additional MFS/i })
        this.paginationRow = page.getByText('Rows per page:').locator('..')
    }

    async viewCurrentMfs() {
        await this.currentMfsBtn.click()
    }

    async viewAdditionalMfs() {
        await this.additionalMfsBtn.click();
    }

    async waitForPageToLoadComplete() {
        await this.page.locator('.MuiSkeleton-root').first().waitFor({ state: 'hidden' });
        await expect(this.page.locator('tbody tr')).not.toHaveCount(0);
    }

    async getTotalItemsFromPagination() {
        const paginationText = await this.page.locator('.MuiTablePagination-displayedRows');
        paginationText.waitFor({state:'visible'});
        await expect(paginationText).toHaveText(/1/);
        const text = await paginationText.innerText()
        const total = text.split('of')[1].trim()
        console.log(`total items: ${total}`)
    }
}