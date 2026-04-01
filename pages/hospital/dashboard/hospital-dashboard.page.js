export default class HospitalDashboardPage {
    constructor(page) {
        this.page = page;

        // ===== LOCATORS =====

        this.pharmaInjectablesRow = page.locator('tr:has-text("Pharma | Injectables")');
        this.pharmaTabletsAndCapsulesRow = page.locator('tr:has-text("Pharma | Tablets & Capsules")')
        this.pharmaOthersRow = page.locator('tr:has-text("Pharma | Others")')
        this.consumablesRow = page.locator('tr:has-text("Consumables")')

        this.quoteRecievedCard = page.getByText("Quotes Received").locator('xpath=../..')
        this.quoteSinceLastLoginCard = page.getByText("Since Last Login").locator('xpath=../..')
        this.mfsAwaitingApprovalCard = page.getByText("MFS Awaiting Approval").last().locator('xpath=../..')
        this.approvedItemsCard = page.getByText("Approved Items").locator('xpath=../..')
        this.rejectedItemsCard = page.getByText("Rejected Items").locator('xpath=../..')
        this.unquotedItemsCard = page.getByText("Unquoted Items").locator('xpath=../..')
    }

    // ===== ACTION METHODS =====

    async readQuoteRecieved() {
        const text = await this.quoteRecievedCard.innerText()
        console.log(text, '\n\n----')
    }

    async readQuoteSinceLastLogin() {
        const text = await this.quoteSinceLastLoginCard.innerText()
        console.log(text, '\n\n----')
    }

    async readMfsAwaitingApproval() {
        const text = await this.mfsAwaitingApprovalCard.innerText()
        console.log(text, '\n\n----')
    }

    async readApprovedItems() {
        const text = await this.approvedItemsCard.innerText()
        console.log(text, '\n\n----')
    }

    async readRejectedItems() {
        const text = await this.rejectedItemsCard.innerText()
        console.log(text, '\n\n----')
    }

    async readUnquotedItems() {
        const text = await this.unquotedItemsCard.innerText()
        console.log(text, '\n\n----')
    }
}