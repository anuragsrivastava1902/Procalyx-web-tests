class DashboardPage {

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
        this.addUserButton = page.getByRole('button', { name: /add user/i });
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

    async clickUserManagement() {
        await this.linkUserManagement.click();
    }

     async clickMfgOnboardingLink() {
        await this.mfgOnboardingNavigationLink.click();
    }

     async clickHospitalOnboardingLink() {
        await this.hospitalOnboardingNavigationLink.click();
        await this.hospitalOnboardingButton.click();
    }


    async clickApItemMasterNavLink() {
        await this.apMasterNavigationLink.click();
        await this.apItemMasterNavLink.click();
    }

    async clickAddNewItemButton(){
        await this.addNewButton.click();
    }

    async clickAddNewUserButton(){
        await this.addUserButton.click();
    }


    async openManufacturerMasters() {
        await this.mfgMastersOption.waitFor({ state: "visible" });
        await this.mfgMastersOption.click();
    }

    async clickAddManufacturer() {
        await this.addNewButton.click();
    }

    async fillKYC(mfg) {
        await this.panInput.fill(mfg.pan);
        await this.gstInput.fill(mfg.gst);
        await this.revenueInput.fill(mfg.revenue);
        await this.drugExpiryInput.fill(mfg.drugLicenseExpiry);
        await this.drugNumberInput.fill(mfg.drugLicenseNumber);
        await this.fssaiInput.fill(mfg.fssaiLicenseNumber);
    }

    async fillBasicInfo(mfg) {
        await this.mfgNameInput.fill(mfg.mfgName);
        await this.parentDropdown.click();
        await this.parentOptionNone.click();
        await this.mfgLegalNameInput.fill(mfg.mfgLegalName);

        // Category
        await this.categoryDropdown.click();
        await this.page.getByRole("option", { name: mfg.category }).click();

        // Therapy
        await this.therapyDropdown.click();
        await this.page.getByRole("option", { name: mfg.therapy }).click();

        // Address
        await this.addressTextarea.fill(mfg.registeredAddress);
        await this.urlInput.fill(mfg.url);
    }

    async fillLocationDetails(mfg) {
        await this.countryDropdown.click();
        await this.page.getByRole("option", { name: mfg.country }).click();

        await this.stateDropdown.click();
        await this.page.getByRole("option", { name: mfg.state }).click();

        await this.cityDropdown.click();
        await this.page.getByRole("option", { name: mfg.city }).click();

        await this.pincodeInput.fill(mfg.pincode);
    }

    async selectKAMIfAvailable() {
        try {
            await this.kamDropdown.click({ timeout: 2000 });
            await this.kamOptionPedri.click({ timeout: 2000 });
        } catch {
            console.log("KAM not assigned — skipping");
        }
    }

    async fillSPOCInfo(mfg) {
        await this.spocNameInput.fill(mfg.spocName);
        await this.spocDesignationInput.fill(mfg.spocDesignation);
        await this.spocEmailInput.fill(mfg.spocEmail);
        await this.spocPhoneInput.fill(mfg.spocPhone);

        await this.spocDepartmentDropdown.click();
        await this.page.getByRole("option", { name: mfg.spocDepartment }).click();
    }

    async fillContractDetails(mfg) {
        await this.contractStatusDropdown.click();
        await this.page.getByRole("option", { name: mfg.contractStatus, exact: true }).first().click();

        await this.operationalStatusDropdown.click();
        await this.page.getByRole("option", { name: mfg.operationalStatus, exact: true }).first().click();
    }

    async fillCommercials(mfg) {
        await this.apFeePercentInput.fill(mfg.apFeePercent);
        await this.apFeeRemarksTextarea.fill(mfg.apFeeRemarks);
    }

    async fillBankDetails(mfg) {
        await this.bankNameInput.fill(mfg.bankName);
        await this.accountNumberInput.fill(mfg.accountNumber);
        await this.ifscInput.fill(mfg.ifscCode);
        await this.ifscInput.press("Tab");
    }

    async save() {
        await this.saveBtn.click();
        await this.confirmBtn.click();
    }
}

export default DashboardPage;
