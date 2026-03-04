class MfgOnboardingForm {
    constructor(page) {
        this.page = page;
        this.PanInputField = page.locator('input[name="kyb.pan"]');
        this.GstInputField = page.locator('input[name="kyb.gstNumber"]');
        this.mfgNameDropdown = page.getByRole('combobox', { name: /Search manufacturer/i })
        this.mfgLegalNameInputField = page.locator('input[name="info.mfgLegalName"]');
        this.categoryDropdown = page.getByPlaceholder('Select categories...')
        this.therapyDropdown = page.getByPlaceholder('Select therapy areas...')
        this.addressInputField = page.locator('textarea[name="info.registeredAddress"]');
        this.countryDropdown = page.locator('form').getByRole('combobox').nth(4)
        this.stateDropdown = page.locator('form').getByRole('combobox').nth(5)
        this.cityDropdown = page.locator('form').getByRole('combobox').nth(6)
        this.PincodeInputField = page.locator('[name="info.pincode"]')
        this.kamDropdown = page.locator('form').getByRole('combobox').nth(7)
        this.spocNameInputField = page.locator('input[name="manufacturerSPOC.name"]');
        this.spocDesignationInputField = page.locator('input[name="manufacturerSPOC.designation"]');
        this.spocEmailInputField = page.locator('input[name="manufacturerSPOC.email"]');
        this.spocPhoneInputField = page.locator('input[name="manufacturerSPOC.phone"]');
        this.spocDepartmentDropdown = page.locator('form').getByRole('combobox').nth(8);
        this.spocAssignedUnitsDropdown = page.getByRole('combobox', { name: 'Select hospital units...' });
        this.contractStatusDropdown = page.locator('form').getByRole('combobox').nth(10);
        this.operationalStatusDropdown = page.locator('form').getByRole('combobox').nth(11);
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    //---------------------------------------------------------------------------------Action methods

    async fillKybFields(mfg) {
        try {
            await this.PanInputField.fill(mfg.pan);
            console.log('PAN filled');
            await this.GstInputField.fill(mfg.gst);
            console.log('GST filled');

        } catch (error) {
            console.error('Error filling KYB fields:', error);
        }
    }

    async selectMfg(mfg) {
        await this.mfgNameDropdown.waitFor({ state: 'visible' });
        await this.mfgNameDropdown.fill(mfg.mfgName);

        await this.page.waitForTimeout(100);
        const option = this.page.getByRole('option', {
            name: new RegExp(mfg.mfgName, 'i')
        }).nth(0);

        await option.waitFor({ state: 'visible' });
        await option.click();
    }


    async fillLegalNameAndAddress(mfg) {
        await this.mfgLegalNameInputField.fill(mfg.mfgLegalName);
        await this.addressInputField.fill(mfg.registeredAddress);
    }

    async selectCategoryAndTherapy(mfg) {
        await this.categoryDropdown.click();
        const listbox1 = this.page.getByRole('listbox');
        await listbox1.getByRole('option', { name:  new RegExp(mfg.category, 'i') }).click();

        await this.therapyDropdown.click();
        const listbox2 = this.page.getByRole('listbox');
        await listbox2.getByRole('option', { name:  new RegExp(mfg.therapy, 'i') }).click();
    }

    async selectGeography(mfg) {
        await this.countryDropdown.scrollIntoViewIfNeeded();                   //select country
        await this.countryDropdown.click();                     // to reduce flakiness
        const countryList = this.page.getByRole('listbox');
        await countryList.getByRole('option', { name:  new RegExp(mfg.country, 'i') }).click();
        await this.stateDropdown.click();                                      //select state
        const stateList = this.page.getByRole('listbox');
        await stateList.getByRole('option', { name:  new RegExp(mfg.state, 'i') }).click();
        await this.cityDropdown.click();                                      //select city
        const cityList = this.page.getByRole('listbox');
        await cityList.getByRole('option', { name:  new RegExp(mfg.city, 'i') }).click();
        await this.PincodeInputField.fill(mfg.pincode);                          //enter pincode
    }

    async selectApHkam(mfg) {
        await this.kamDropdown.waitFor({ state: 'visible' });
        await this.kamDropdown.click();
        const kamOption = this.page.getByRole('option', {
            name: new RegExp(mfg.apKamName, 'i')
        }).nth(0);
        await kamOption.waitFor({ state: 'visible' });
        await kamOption.click();

    }

    async fillSpocDetails(mfg) {
        await this.spocNameInputField.fill(mfg.spocName);
        await this.spocDesignationInputField.fill(mfg.spocDesignation);
        await this.spocEmailInputField.fill(mfg.spocEmail);
        await this.spocPhoneInputField.fill(mfg.spocPhone);
        // -------- select spoc department
        await this.spocDepartmentDropdown.waitFor({ state: 'visible' })
        await this.spocDepartmentDropdown.click();
        const departmentOption = this.page.getByRole('option', {
            name: new RegExp(mfg.spocDepartment, 'i')
        }).nth(0);
        await departmentOption.waitFor({ state: 'visible' })
        await departmentOption.click();
        //--------- select assigned hospital units
        await this.spocAssignedUnitsDropdown.waitFor({ state: 'visible' })
        await this.spocAssignedUnitsDropdown.click();
        const hospitalUnitsOption = this.page.getByRole('option').nth(0);
        await hospitalUnitsOption.waitFor({ state: 'visible' })
        await hospitalUnitsOption.click();

    }

    async selectContractStatus(mfg) {
        await this.contractStatusDropdown.waitFor({ state: 'visible' })
        await this.contractStatusDropdown.click();
        const contractStatusOption = this.page.getByRole('option').nth(1);
        await contractStatusOption.waitFor({ state: 'visible' })
        await contractStatusOption.click();

        await this.operationalStatusDropdown.waitFor({ state: 'visible' })
        await this.operationalStatusDropdown.click();
        const operationalStatusOption = this.page.getByRole('option').nth(1);
        await operationalStatusOption.waitFor({ state: 'visible' })
        await operationalStatusOption.click();
        await this.page.keyboard.press('Tab');
        await this.page.pause();
    }

    async clickSaveButton(){
        await this.saveButton.click();
    }
}


export default MfgOnboardingForm;
