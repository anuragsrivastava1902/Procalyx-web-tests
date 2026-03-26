export default class HospitalMenuPage {
    constructor(page) {
        this.page = page;

        // ===== LOCATORS =====
        this.dashboardBtn = page.getByRole('button', { name: 'Dashboard' });
        this.quotesToggle = page.getByRole('button', { name: 'Quotes' });
        this.quoteManagementBtn = page.getByRole('button', { name: 'Quote Management' });

        this.viewedBtn = page.getByRole('button', { name: 'Viewed', exact: true });
        this.notViewedBtn = page.getByRole('button', { name: 'Not Viewed', exact: true });
        this.savedForLaterBtn = page.getByRole('button', { name: 'Saved For Later', exact: true });
        this.awaitingApprovalBtn = page.getByRole('button', { name: 'Awaiting Approval', exact: true });

        this.priceMasterBtn = page.getByRole('button', { name: 'Price Master' });
        this.userManagementBtn = page.getByRole('button', { name: 'User Management' });
    }

    // ===== ACTION METHODS =====

    async goToDashboard() {
        await this.dashboardBtn.click();
    }

    async goToQuotes() {
        await this.quotesToggle.click();
    }

    async goToQuoteManagement() {
        await this.goToQuotes();
        await this.quoteManagementBtn.click();
    }

    async filterViewed() {
        await this.goToQuotes();
        await this.viewedBtn.click();
    }

    async filterNotViewed() {
        await this.goToQuotes();
        await this.notViewedBtn.click();
    }

    async filterSavedForLater() {
        await this.goToQuotes();
        await this.savedForLaterBtn.click();
    }

    async filterAwaitingApproval() {
        await this.goToQuotes();
        await this.awaitingApprovalBtn.click();
    }

    async goToPriceMaster() {
        await this.priceMasterBtn.click();
    }

    async goToUserManagement() {
        await this.userManagementBtn.click();
    }

     // ===== COMBINED FLOW METHODS (Optional but useful) =====

    async openQuoteManagementSection() {
        await this.goToQuotes();
        await this.goToQuoteManagement();
    }

    async openViewedQuotes() {
        await this.openQuoteManagementSection();
        await this.filterViewed();
    }

    async openNotViewedQuotes() {
        await this.openQuoteManagementSection();
        await this.filterNotViewed();
    }
}