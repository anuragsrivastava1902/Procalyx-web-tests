import { expect } from "@playwright/test"

export default class HospitalQuoteListPage {
    constructor(page) {
        this.page = page
        this.currentMfsBtn = page.getByRole('button', { name: /Current MFS/i })
        this.additionalMfsBtn = page.getByRole('button', { name: /Additional MFS/i })
        this.mfsSearchInput = page.locator('tr').nth(1).locator('th').nth(1).locator('input')
        this.mfsTable = page.locator('table')
        this.mfsTableRow = this.mfsTable.locator('tbody tr')
        this.paginationRow = page.getByText('Rows per page:').locator('..')
    }

    async viewCurrentMfs() {
        await this.currentMfsBtn.click()
    }

    async viewAdditionalMfs() {
        await this.additionalMfsBtn.waitFor({state:'visible'})
        await this.additionalMfsBtn.click();
        console.log("additional clicked")
    }

    async searchMfs(mfsName){
        await this.mfsSearchInput.waitFor({state:'visible'})
        await this.mfsSearchInput.fill(mfsName)
        await this.page.keyboard.press('Enter')
        await this.mfsTableRow.filter({hasText:mfsName}).waitFor({state:'visible'})
    }

    async openMfs(mfsName){
        const row = this.mfsTableRow.filter({hasText:mfsName})
        const viewBtn = row.getByText(mfsName).nth(0)
        await viewBtn.click()
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