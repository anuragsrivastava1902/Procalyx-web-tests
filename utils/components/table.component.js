export default class TableComponent {
    constructor(page) {
        this.page = page;
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

    async sortAscendingByColumn(columnName) {
        const colIndex = await this.getColumnIndex(columnName);
        const columnHeader = await this.page.locator('thead tr').nth(0).locator('th').nth(colIndex);
        const sortIcon = await columnHeader.locator('div[class*="_sortIconWrapper_"]')
        await sortIcon.click();
        const ascendingOption = await this.page.getByTestId('sort-ascending');
        await ascendingOption.waitFor({ state: 'visible' });
        await ascendingOption.click();
        await this.page.waitForTimeout(1000);
    }

    async sortDescendingByColumn(columnName) {
        const colIndex = await this.getColumnIndex(columnName);
        const columnHeader = await this.page.locator('thead tr').nth(0).locator('th').nth(colIndex);
        const sortIcon = await columnHeader.locator('div[class*="_sortIconWrapper_"]')
        await sortIcon.click();
        const descendingOption = await this.page.getByText('Descending');
        await descendingOption.waitFor({ state: 'visible' });
        await descendingOption.click();
        await this.page.waitForTimeout(1000);
    }
}
