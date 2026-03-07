export default class ApAdminUserManagementListPage {
    constructor(page) {
        this.page = page;

        //locators
        this.addUserButton = page.getByRole('button', { name: /add user/i });

    }

    //action methods
    async startNewUserCreation() {
        await this.addUserButton.click();
    }
}