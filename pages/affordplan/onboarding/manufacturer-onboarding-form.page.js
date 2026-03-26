import { expect } from "@playwright/test";
export default class ManufacturerOnboardingFormPage {
    constructor(page) {
        this.page = page;
        this.PanInputField = page.locator('input[name="kyb.pan"]');
        this.GstInputField = page.locator('input[name="kyb.gstNumber"]');
        this.mfgNameDropdown = page.getByRole('combobox', { name: /Search manufacturer/i })
        this.mfgLegalNameInputField = page.locator('input[name="info.mfgLegalName"]');
        this.categoryDropdown = page.getByPlaceholder('Select categories...')
        this.therapyDropdown = page.getByPlaceholder('Select therapy areas...')
        this.addressInputField = page.locator('textarea[name="info.registeredAddress"]');

        this.countryDropdown = page.locator('form').getByRole('combobox').nth(2)
        this.countryOption = page.getByRole('option', { name: 'India' })
        this.stateDropdown = page.locator('form').getByRole('combobox').nth(3)
        this.stateOption = page.getByRole('option', { name: 'Bihar' })
        this.cityDropdown = page.locator('form').getByRole('combobox').nth(4);
        this.cityOption = page.getByRole('option', { name: 'Baisi' })
        this.PincodeInputField = page.locator('[name="info.pincode"]');

        this.apKamNameDropdown = page.locator('form').getByRole('combobox').nth(5)
        this.apKamOption = page.getByRole('option', { name: 'mkam' }).first()

        this.spocNameInputField = page.locator('input[name="manufacturerSPOC.name"]');
        this.spocDesignationInputField = page.locator('input[name="manufacturerSPOC.designation"]');
        this.spocEmailInputField = page.locator('input[name="manufacturerSPOC.email"]');
        this.spocPhoneInputField = page.locator('input[name="manufacturerSPOC.phone"]');
        this.spocDepartmentDropdown = page.locator('form').getByRole('combobox').nth(6)
        this.spocDepartmentOption = page.getByRole('option', { name: 'Operations' })
        this.spocAssignedUnitsDropdown = page.locator('form').getByRole('combobox').nth(7)
        this.spocAssignedUnitsOption = page.locator('li:has-text("Abc reject") input[type="checkbox"]')

        this.contractStatusDropdown = page.locator('form').getByRole('combobox').nth(8);
        this.operationalStatusDropdown = page.locator('form').getByRole('combobox').nth(9);
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.alertMessage = page.locator('.MuiAlert-message').nth(1);
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

    /*this featurer is not in use currently. direct onboarding is stopped
    -------------------------------------------------------------------

    async selectMfg(mfg) {
        await this.mfgNameDropdown.waitFor({ state: 'visible' });
        await this.mfgNameDropdown.fill(mfg.mfgName);

        const option = this.page.getByRole('option', {
            name: new RegExp(mfg.mfgName, 'i')
        }).nth(0);

        await option.waitFor({ state: 'visible' });
        await option.click();
    }
        */


    async fillLegalNameAndAddress(mfg) {
        await this.mfgLegalNameInputField.fill(mfg.mfgLegalName);
        await this.addressInputField.fill(mfg.registeredAddress);
    }

    async selectCategoryAndTherapy(mfg) {
        await this.categoryDropdown.click();
        const listbox1 = this.page.getByRole('listbox');
        await listbox1.getByRole('option', { name: new RegExp(mfg.category, 'i') }).click();

        await this.therapyDropdown.click();
        const listbox2 = this.page.getByRole('listbox');
        await listbox2.getByRole('option', { name: new RegExp(mfg.therapy, 'i') }).click();
    }

    async selectGeography(mfg) {
        await this.countryDropdown.scrollIntoViewIfNeeded();                   //select country

        // Country, State, City dropdowns
        await this.countryDropdown.click();
        await this.countryOption.click();
        await this.stateDropdown.click();
        await this.stateOption.click();
        await this.cityDropdown.click();
        await this.cityOption.click();
        await this.PincodeInputField.fill(mfg.pincode);
        // to reduce flakiness
        // const countryList = this.page.getByRole('listbox');
        // await countryList.getByRole('option', { name:  new RegExp(mfg.country, 'i') }).click();
        // await this.stateDropdown.click();                                      //select state
        // const stateList = this.page.getByRole('listbox');
        // await stateList.getByRole('option', { name:  new RegExp(mfg.state, 'i') }).click();
        // await this.cityDropdown.click();                                      //select city
        // const cityList = this.page.getByRole('listbox');
        // await cityList.getByRole('option', { name:  new RegExp(mfg.city, 'i') }).click();                        //enter pincode
    }

    async selectApHkam(mfg) {
        await this.apKamNameDropdown.waitFor({ state: 'visible' });
        await this.apKamNameDropdown.click();
        await this.apKamOption.click();

    }

    async fillSpocDetails(mfg) {
        await this.spocNameInputField.fill(mfg.spocName);
        await this.spocDesignationInputField.fill(mfg.spocDesignation);
        await this.spocEmailInputField.fill(mfg.spocEmail);
        await this.spocPhoneInputField.fill(mfg.spocPhone);
        // -------- select spoc department
        await this.spocDepartmentDropdown.waitFor({ state: 'visible' })
        await this.spocDepartmentDropdown.click();
        await this.spocDepartmentOption.waitFor({ state: 'visible' })
        await this.spocDepartmentOption.click();
        //--------- select assigned hospital units
        await this.spocAssignedUnitsDropdown.waitFor({ state: 'visible' })
        await this.spocAssignedUnitsDropdown.click();
        await this.spocAssignedUnitsOption.waitFor({ state: 'visible' })
        await this.spocAssignedUnitsOption.check();

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

    }


    async clickSaveButton() {
        this.page.on('response', res => {
            console.log('API: ', res.status(), res.url(), res.request().method())
        })

        await Promise.all([
            this.page.waitForResponse(res =>
                res.url().includes('/api/v1/manufacturers') &&  // adjust endpoint
                res.request().method() === 'PATCH'),
            this.saveButton.click(),
            this.page.getByRole('button', { name: 'Confirm' }).click()
        ])
    }

    async checkMessage(message) {
        console.log("Nudge >>>>> ",await this.alertMessage.innerText())
        await expect(this.alertMessage.getByText(message), "TESTING IF CORRECT NUDGE IS DISPLAYED").toBeVisible();
    }

}

