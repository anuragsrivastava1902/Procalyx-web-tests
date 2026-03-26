import { expect } from "@playwright/test";

export default class ApAdminUserManagementListPage {
    constructor(page) {
        this.page = page;
        //locators
        this.addUserBtn = page.getByRole('button', { name: /add user/i });
        this.userManagementHeading = page.getByText('User Management').nth(1)

    }

    //action methods
    async startNewUserCreation() {
        await expect(this.addUserBtn).toBeEnabled();
        await this.addUserBtn.click();
    }
}