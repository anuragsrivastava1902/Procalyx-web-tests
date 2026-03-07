export default class ApAdminDashboardPage {

    constructor(page) {
        this.page = page;

        /** -------------------- DASHBOARD MENU -------------------- **/
        this.linkUserManagement = page.locator(
            "div[id='root'] li:nth-child(2) div:nth-child(1) div:nth-child(2) span:nth-child(1)"
        );

        this.mfgOnboardingNavigationLink = page.getByRole('button', { name: 'Manufacturer Onboarding' });
        this.hospitalOnboardingNavigationLink = page.getByRole('button', { name: 'Hospital Onboarding' });
        this.hospitalOnboardingButton= page.getByRole('button', { name: 'Hospital', exact: true });
        this.apMasterNavigationLink = page.getByRole('button', { name: 'Affordplan Master' });
        this.mfgMastersOption = page.locator('span').filter({ hasText: 'Manufacturer Masters' }).first()
        this.apItemMasterNavLink = page.locator('span').filter({ hasText: 'Item Master' }).first();
        this.addNewButton = page.getByRole('button', { name: /add new/i });



        /** -------------------- MFG ONBOARDING FORM LOCATORS -------------------- **/
        this.panInput = page.locator('input[name="kyb.pan"]');
        this.gstInput = page.locator('input[name="kyb.gstNumber"]');
        this.revenueInput = page.locator('input[name="kyb.annualRevenue"]');
        this.drugExpiryInput = page.locator('input[name="kyb.drugLicenseExpiry"]');
        this.drugNumberInput = page.locator('input[name="kyb.drugLicenseNumber"]');
        this.fssaiInput = page.locator('input[name="kyb.fssaiLicenseNumber"]');

        this.mfgNameInput = page.locator('input[name="info.mfgName"]');
        this.mfgLegalNameInput = page.locator('input[name="info.mfgLegalName"]');

        this.parentDropdown = page.getByLabel("", { exact: true }).first();
        this.parentOptionNone = page.getByText("None (This is a parent");

        this.categoryDropdown = page.getByRole("combobox", { name: "Select categories..." });
        this.therapyDropdown = page.getByRole("combobox", { name: "Select therapy areas..." });

        this.addressTextarea = page.locator('textarea[name="info.registeredAddress"]');
        this.urlInput = page.getByRole("textbox", { name: "https://example.com" });

        this.countryDropdown = page.getByLabel("", { exact: true }).nth(1);
        this.stateDropdown = page.getByLabel("", { exact: true }).nth(1);
        this.cityDropdown = page.getByLabel("", { exact: true }).nth(1);

        this.pincodeInput = page.locator('input[name="info.pincode"]');

        /** KAM Selector (dynamic MUI ID avoided) */
        this.kamDropdown = page.locator('.MuiSelect-select.MuiSelect-outlined.MuiInputBase-inputSizeSmall');
        this.kamOptionPedri = page.getByText("Pedri", { exact: false });

        /** MFG SPOC */
        this.spocNameInput = page.locator('input[name="manufacturerSPOC.name"]');
        this.spocDesignationInput = page.locator('input[name="manufacturerSPOC.designation"]');
        this.spocEmailInput = page.locator('input[name="manufacturerSPOC.email"]');
        this.spocPhoneInput = page.locator('input[name="manufacturerSPOC.phone"]');

        this.spocDepartmentDropdown =
            page.getByRole("region", { name: "MFG SPOC Info" }).getByLabel("Select...");

        /** Contracts */
        this.contractStatusDropdown = page.locator('#mui-component-select-contract\\.contractStatus');
        this.operationalStatusDropdown = page.locator('#mui-component-select-contract\\.operationalStatus');

        /** Commercials */
        this.apFeePercentInput = page.locator('input[name="commercials.apFeePercent"]');
        this.apFeeRemarksTextarea = page.locator('textarea[name="commercials.apFeeRemarks"]');

        /** Bank */
        this.bankNameInput = page.locator('input[name="bank.bankName"]');
        this.accountNumberInput = page.locator('input[name="bank.accountNumber"]');
        this.ifscInput = page.locator('input[name="bank.ifscCode"]');

        /** Buttons */
        this.saveBtn = page.getByRole("button", { name: "Save" });
        this.confirmBtn = page.getByRole("button", { name: "Confirm" });
    }

    /** -------------------- ACTION METHODS -------------------- **/

    async goToUserManagement() {
        await this.linkUserManagement.click();
    }

     async goToMfgOnboarding() {
        await this.mfgOnboardingNavigationLink.click();
    }

     async goToHospitalOnboarding() {
        await this.hospitalOnboardingNavigationLink.click();
        await this.hospitalOnboardingButton.click();
    }


    async goToApItemMaster() {
        await this.apMasterNavigationLink.click();
        await this.apItemMasterNavLink.click();
    }


    async goToManufacturerMasters() {
        await this.mfgMastersOption.waitFor({ state: "visible" });
        await this.mfgMastersOption.click();
    }

  

    async save() {
        await this.saveBtn.click();
        await this.confirmBtn.click();
    }
}

