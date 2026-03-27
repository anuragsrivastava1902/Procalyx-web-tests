export default class ApAdminMenu {

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
    }

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

    

}