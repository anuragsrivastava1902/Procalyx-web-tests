export default class HospitalOnboardingListPage {
    constructor(page) {
        this.page = page;
        this.addNewHospital = page.getByRole('button', { name: 'Add New Hospital' })
    }

    async clickAddNewHospitalButton() {
        await this.addNewHospital.click();
    }

}