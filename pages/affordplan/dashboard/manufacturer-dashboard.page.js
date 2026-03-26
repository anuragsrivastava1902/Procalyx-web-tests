export default class ManufacturerDashboardPage {
    constructor(page) {
        this.page = page;
        this.dashboardBtn  = page.getByRole('button', { name: 'Dashboard' })
        this.quotesToggle  = page.getByRole('button', { name: 'Quotes' })
        this.quoteScreenBtn  = page.getByRole('button', { name: 'Quote Screen' })
        this.quoteRepositoryBtn  = page.getByRole('button', { name: 'Quote Repository' })
        this.managementConsoleBtn  = page.getByRole('button', { name: 'Management Console' })
        this.userManagementBtn  = page.getByRole('button', { name: 'User Management' })
    }

    async goToDashboard(){
        await this.dashboardBtn.click();
    }

    async goToQuotes() {
        
    }

    async goToQuoteScreen() {
        await this.quotesToggle.click();
        await this.quoteScreenBtn.click();
    }

    async goToQuoteRepository() {
        await this.quotesToggle.click();
        await this.quoteRepositoryBtn.click();
    }

    async goToManagementConsole() {
        await this.managementConsoleBtn.click();
    }

    async goToUserManagement() {
        await this.userManagementBtn.click();
    }
}
