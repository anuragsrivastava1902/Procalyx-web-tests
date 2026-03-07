export default class ManufacturerOnboardingListPage {
    constructor(page) {
        this.page = page;
        this.addNewButton = page.getByRole('button', { name: /add new/i });
    }

    async startManufacturerCreation() {
        await this.addNewButton.click();
    }


}