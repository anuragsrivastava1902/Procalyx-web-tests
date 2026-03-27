import { expect } from "@playwright/test";

export default class HospitalOnboardingFormPage {
    constructor(page) {
        this.page = page;
        this.hospitalKybSection = page.getByRole('region', { name: 'Hospital KYB' })
        this.hospitalInfoSection = page.getByRole('region', { name: 'Hospital Information' })
        this.hospitalInfraSection =page.getByRole('region', { name: 'Hospital Infrastructure' })
        this.hospitalHisSection = page.getByRole('region', { name: 'Hospital HIS' })
        this.apSpocInfoSection = page.getByRole('region', { name: 'AP SPOC Info' })
        this.hospitalSpocInfoSection = page.getByRole('region', { name: 'Hospital SPOC Info' })
        this.hospitalContractDetailsSection = page.getByRole('region', { name: 'Hospital Contract Details' })
        this.hospitalCommercialSection = page.getByRole('region', { name: 'Hospital Contract Details' })
        this.hospitalBankDetailsSection = page.getByRole('region', { name: 'Hospital Bank Account Details' })
        
        this.pan = page.getByRole('textbox', { name: 'Enter 10-digit PAN number' });
        this.gst = page.locator('input[name="kyb.gstNumber"]')
        this.hospitalLegalName = page.locator('input[name="kyb.hospitalLegalName"]');
        this.hospitalName = page.locator('input[name="info.hospitalName"]');
        this.hospitalType = page.getByRole('combobox', { name: 'Select hospital type' });
        this.hospitalTypeOption = page.getByRole('option', { name: 'Hospital / Nursing Home' });
        this.numberOfUnitsInput = page.locator('[name="info.numberOfUnits"]')
        this.addressInputField = page.locator('textarea[name="info.operationalAddress"]');

        this.countryDropdown = this.hospitalInfoSection.getByRole('combobox').nth(1)
        this.countryOption = page.getByRole('option', { name: 'India' })
        this.stateDropdown = this.hospitalInfoSection.getByRole('combobox').nth(2)
        this.stateOption = page.getByRole('option', { name: 'Bihar' })
        this.cityDropdown = this.hospitalInfoSection.getByRole('combobox').nth(3)
        this.cityOption = page.getByRole('option', { name: 'Baisi' })
        this.PincodeInputField = page.locator('[name="info.pincode"]');

        this.hospitalHisDropdown = this.hospitalHisSection.getByRole('combobox').nth(0)
        this.hospitalHisOption = page.getByText('Allscripts', { exact: true })
        this.hospitalHisIntegrationStatusDropdown = this.hospitalHisSection.getByRole('combobox').nth(1)
        this.hospitalHisIntegrationStatusOption = page.getByText('In Progress', { exact: true })
        this.hospitalHisIntegrationModeDropdown = this.hospitalHisSection.getByRole('combobox').nth(2)
        this.hospitalHisIntegrationModeOption = page.getByText('API', { exact: true })
        this.specialityDropdown = page.getByRole('combobox', { name: 'Select specialties...' })
        this.specialityOption1 = page.getByRole('option', { name: 'Cardiology' })
        this.specialityOption2 = page.getByRole('option', { name: 'Dermatology' })

        this.numberOfBedsInput = page.locator('[name="infrastructure.numberOfBeds"]')

        this.apKamNameDropdown = page.getByRole('region', { name: 'AP KAM Info' }).getByRole('combobox').nth(0)
        this.apKamOption = page.getByRole('option', { name: 'ap hkam user 3 (' })

        this.hospitalSpocNameInput = page.locator('input[name="hospitalSPOC.name"]')
        this.hospitalSpocDesignationInput = page.locator('input[name="hospitalSPOC.designation"]')
        this.hospitalSpocEmailInput = page.locator('input[name="hospitalSPOC.email"]')
        this.hospitalSpocPhoneInput = page.locator('input[name="hospitalSPOC.phone"]')
        this.hospitalSpocDepartmentDropdown = page.getByRole('combobox', { name: 'Select department' })
        this.hospitalSpocDepartmentOption = page.getByRole('option', { name: 'Operations' })

        this.hospitalContractStatusDropdown = this.hospitalContractDetailsSection.getByRole('combobox').nth(0)
        this.hospitalContractStatusOption = page.getByRole('option', { name: 'Contract Cancelled' })
        this.hospitalOperationalStatusDropdown = this.hospitalContractDetailsSection.getByRole('combobox').nth(1)
        this.hospitalOperationalStatusOption = page.getByRole('option', { name: 'Active', exact: true })

        this.alertMessage = page.locator('.MuiAlert-message').last();
        this.saveButton = page.getByRole('button', { name: 'Save' })




    }

    async fillKybFields(mfg) {
    }

    async fillForm(data, { isKamUser }) {
        // Fill PAN and GST
        await this.pan.fill(data.pan);
        await this.gst.fill(data.gst);
        await this.hospitalLegalName.fill(data.hospitalLegalName);
        await this.hospitalName.fill(data.hospitalName);

        // Select hospital type
        await this.hospitalType.click();
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');

        //No. of units
        await this.numberOfUnitsInput.fill(data.numberOfUnits)

        // Address fields
        await this.addressInputField.fill(data.operationalAddress);

        // Country, State, City dropdowns
        await this.countryDropdown.click();
        await this.countryOption.click();
        await this.stateDropdown.click();
        await this.stateOption.click();
        await this.cityDropdown.click();
        await this.cityOption.click();
        await this.PincodeInputField.fill(data.pincode);

        // Hospital HIS dropdown
        await this.hospitalHisDropdown.click();
        await this.hospitalHisOption.click();
        await this.hospitalHisIntegrationStatusDropdown.click()
        await this.hospitalHisIntegrationStatusOption.click()
        await this.hospitalHisIntegrationModeDropdown.click()
        await this.hospitalHisIntegrationModeOption.click()


        // Speciality dropdown (select two for demo)
        await this.specialityDropdown.click();
        await this.specialityOption1.click();
        await this.specialityOption2.click();

        // Number of beds
        await this.numberOfBedsInput.fill(data.numberOfBeds);

        // AP KAM Info dropdown
        if (!isKamUser) {
            await this.apKamNameDropdown.click();
            await this.page.keyboard.press('ArrowDown'); // first option
            await this.page.keyboard.press('ArrowDown'); // second option
            await this.page.keyboard.press('Enter');     // select it
            //await this.apKamOption.click();
        }

        // Hospital SPOC fields
        await this.hospitalSpocNameInput.fill(data.spocName);
        await this.hospitalSpocDesignationInput.fill(data.spocDesignation);
        await this.hospitalSpocEmailInput.fill(data.spocEmail);
        await this.hospitalSpocPhoneInput.fill(data.spocPhone);
        await this.hospitalSpocDepartmentDropdown.click();
        await this.hospitalSpocDepartmentOption.click();

        // Contract/Operational Status dropdowns
        await this.hospitalContractStatusDropdown.click();
        await this.hospitalContractStatusOption.click();
        await this.hospitalOperationalStatusDropdown.click();
        await this.hospitalOperationalStatusOption.click();

        this.page.on('response', res => {
            console.log('API: ', res.status(), res.url())
        })

        // Save
        await Promise.all([
            this.page.waitForResponse(res =>
                res.url().includes('/api/v1/hospitals') &&  // adjust endpoint
                res.request().method() === 'POST'),
            // && res.status() === 200),
            this.saveButton.click(),
        ])


        await expect(this.alertMessage).toBeVisible({ timeout: 10000 });
        const message = await this.alertMessage.innerText();
        console.log(message);
    }
}
