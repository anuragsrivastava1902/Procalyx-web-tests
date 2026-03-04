class HospitalOnboardingForm {
    constructor(page) {
        this.page = page;
        this.addNewHospital = page.getByRole('button', { name: 'Add New Hospital' });
        this.pan = page.getByRole('textbox', { name: 'Enter 10-digit PAN number' });
        this.gst = page.locator('input[name="kyb.gstNumber"]')
        this.hospitalLegalName = page.locator('input[name="kyb.hospitalLegalName"]');
        this.hospitalName = page.locator('input[name="info.hospitalName"]');
        this.hospitalType = page.getByRole('combobox', { name: 'Select hospital type' });
        this.hospitalTypeOption = page.getByRole('option', { name: 'Hospital / Nursing Home' });
        this.addressInputField = page.locator('textarea[name="info.operationalAddress"]');
        this.countryDropdown = page.locator('form').getByRole('combobox').nth(4)
        this.stateDropdown = page.locator('form').getByRole('combobox').nth(5)
        this.cityDropdown = page.locator('form').getByRole('combobox').nth(6);
        this.PincodeInputField = page.locator('[name="info.pincode"]');
        

    }
    async clickAddNewHospitalButton() {
        await this.addNewHospital.click();
    }

    async fillKybFields(mfg) {


    }




}

export default HospitalOnboardingForm;