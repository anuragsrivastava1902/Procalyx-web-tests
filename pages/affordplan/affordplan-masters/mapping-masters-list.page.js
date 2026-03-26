export default class MappingMasterListPage {
    constructor(page) {
        this.page = page;
    }

    // ACTION METHODS

    async openMappingForm(hospitalUnitName) {
        const hospitalRow = this.page.locator('tr', { hasText: hospitalUnitName }).first()
        const editBtn = hospitalRow.getByRole('cell', { name: 'Edit' }).first();
        await editBtn.click();
    }


}