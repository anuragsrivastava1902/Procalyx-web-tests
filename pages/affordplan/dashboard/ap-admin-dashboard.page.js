export default class ApAdminDashboardPage {

    constructor(page) {
        this.page = page;
        /** -------------------- DASHBOARD MENU -------------------- **/
        this.userManagementBtn = page.getByRole('button', { name: 'User Management' })
        this.manufacturerOnboardingBtn = page.getByRole('button', { name: 'Manufacturer Onboarding' });
        this.hospitalOnboardingToggle = page.getByRole('button', { name: 'Hospital Onboarding' });
        this.hospitalOnboardingBtn = page.getByRole('button', { name: 'Hospital', exact: true });
        this.affordplanMastersToggle = page.getByRole('button', { name: 'Affordplan Master' });
        this.manufacturerMastersToggle = page.locator('span').filter({ hasText: 'Manufacturer Masters' }).first()
        this.mfgItemMasterBtn = page.locator('span').filter({ hasText: 'Manufacturer Item' }).first()
        this.apItemMasterBtn = page.locator('span').filter({ hasText: 'Item Master' }).first();
        this.mappingMastersBtn = page.getByRole('button', { name: 'Mapping Masters' });
        this.exceptionHandlingBtn = page.getByRole('button', { name: 'Exception Handling' })
        this.addNewButton = page.getByRole('button', { name: /add new/i });

        /** Buttons */
        this.saveBtn = page.getByRole("button", { name: "Save" });
        this.confirmBtn = page.getByRole("button", { name: "Confirm" });
    }

    /** -------------------- ACTION METHODS -------------------- **/

    async goToUserManagement() {
        await this.userManagementBtn.click();
    }

    async goToMfgOnboarding() {
        await this.manufacturerOnboardingBtn.click();
    }

    async goToHospitalOnboarding() {
        await this.hospitalOnboardingToggle.click();
        await this.hospitalOnboardingBtn.click();
    }


    async goToApItemMaster() {
        await this.affordplanMastersToggle.click();
        await this.apItemMasterBtn.click();
    }


    async goToMfgItemMaster() {
        await this.manufacturerMastersToggle.waitFor({ state: "visible" });
        await this.mfgItemMasterBtn.click();
    }

    async goToMappingMasters() {
        await this.affordplanMastersToggle.click();
        await this.mappingMastersBtn.click();
    }

    async goToExceptionHandling() {
        await this.affordplanMastersToggle.click();
        await this.exceptionHandlingBtn.click();
    }


    async save() {
        await this.saveBtn.click();
        await this.confirmBtn.click();
    }
}

