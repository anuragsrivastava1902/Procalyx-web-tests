export default class ApHkamMenu {

    constructor(page) {
        this.page = page;
        this.hospitalMastersBtn = page.locator('span').filter({ hasText: 'Hospital Masters' }).first()
        this.hospitalUnitMastersBtn = page.locator('span').filter({ hasText: 'Hospital Unit Masters' }).first()
    }

     async goToHospitalOnboarding() {
        await this.hospitalMastersBtn.click();
    }

}