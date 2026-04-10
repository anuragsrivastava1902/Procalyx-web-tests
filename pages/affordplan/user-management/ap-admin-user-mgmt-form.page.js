import { expect } from "@playwright/test";

export default class ApAdminUserManagementFormPage {
    constructor(page) {
        this.page = page;

        // Text inputs
        this.fullNameInput = page.getByRole('textbox', { name: 'Enter full name' });
        this.designationInput = page.getByRole('textbox', { name: 'e.g., Manager' });
        this.emailInput = page.getByRole('textbox', { name: 'email@example.com' });
        this.mobileNumberInput = page.getByRole('textbox', { name: '10-digit mobile number' });

        // Dropdowns / Selects
        this.relationshipSelect = page.locator('select:has(option:has-text("Select Relationship"))');
        this.roleSelect = page.locator('select:has(option:has-text("Select Role"))');
        this.departmentSelect = page.locator('select:has(option:has-text("Select Department"))');
        this.countrySelect = page.locator('select:has(option:has-text("Select country"))').first();
        this.stateSelect = page.locator('select:has(option:has-text("Select state"))').first();
        this.citySelect = page.locator('select:has(option:has-text("Select city"))').first();

        this.hospitalSelect = page.locator('select:has(option:has-text("Select hospital names"))').first();
        this.hospitalUnitSelect = page.locator('span:has-text("Select hospital unit names")').first();
        // this is a temporary fix, i have to ask devs to add data-testid attribute or to correct the 'label' logic
        this.manufacturerSelect = page.locator('select:has(option:has-text("Select manufacturer"))').first() //page.locator('div._formGroup_twwef_457', { hasText: 'Manufacturer' }) .locator('select').nth(0); 
        this.assignedHospitalUnitsDropdown = page.locator('span:has-text("Select hospital units")').locator('..');
        this.divisionSelect = page.locator('select:has(option:has-text("Select division"))').first();
        this.therapyAreasDropdown = page.locator('span:has-text("Select therapy areas")');

        this.alertMessage = page.locator('div.MuiAlert-message')
        this.saveButton = page.getByRole('button', { name: 'Create User' });


    }

    //--------------- action methods.
    async enterBasicInfo(user) {
        await this.fullNameInput.fill(`${user.name}+${Math.floor(100 + Math.random() * 900)}`); // 3 digits
        await this.designationInput.fill(user.designation);
        await this.emailInput.fill(user.email);
        await this.mobileNumberInput.fill(user.mobile);
    }

    async selectOrganisationDetails(user) {
        await expect(this.relationshipSelect).toBeEnabled({ timeout: 10000 });
        await this.relationshipSelect.selectOption(user.relationship);
        await expect(this.roleSelect).toBeEnabled({ timeout: 10000 })
        await this.roleSelect.selectOption({ label: user.role });
        await this.departmentSelect.selectOption({ label: user.department });
    }

    async selectGeographyDetails(user) {
        await this.countrySelect.selectOption({ label: user.country });
        await this.stateSelect.selectOption({ label: user.state });
        await this.citySelect.selectOption({ label: user.city });
    }


    async selectConditionalDropdowns(user) {
        // Wait for conditional dropdowns if relationship is Hospital
        if (user.relationship === 'hospital') {
            await expect(this.hospitalSelect).toBeVisible({ timeout: 10000 });
            await this.hospitalSelect.selectOption({ label: user.hospital });

            await expect(this.hospitalUnitSelect).toBeVisible({ timeout: 10000 });
            await this.hospitalUnitSelect.click()
            await this.page.getByText(user.hospitalUnit, { exact: true }).last().click();
        }

        // Wait for conditional dropdowns if relationship is Manufacturer
        if (user.relationship === 'manufacturer') {
            console.log("user relationship is mfg................")

            await expect(this.manufacturerSelect).toBeVisible({ timeout: 10000 });
            await this.manufacturerSelect.selectOption({ label: user.manufacturer });

            await this.assignedHospitalUnitsDropdown.click();
            await this.page.getByText(user.assignedUnits, { exact: true }).last().click();
            await this.page.getByText('Hospital Unit', { exact: true }).last().click(); //this click is for closing the dropdown

            await this.divisionSelect.waitFor({ state: 'visible' });
            await this.page.waitForSelector(`select:has(option:has-text("${user.division}"))`);
            await this.divisionSelect.selectOption({ label: user.division });

            await this.therapyAreasDropdown.click();
            await this.page.getByText(user.therapies).last().click();
            await this.page.getByText('Therapy Area', { exact: true }).click(); //this click is for closing the dropdown
        }

    }

    async clickSaveButton() {
        const [response] = await Promise.all([
            this.page.waitForResponse(res => res.request().method() === 'POST'),
            this.saveButton.click()
        ]);

        const responseBody = await response.json();
        console.log(`API response status:`, responseBody.success);
        console.log(`API response message:`, responseBody.error.message);
        expect.soft(responseBody.success, "check if the user is created or not").toBeTruthy();
    }

    async verifyAlertMessage() {
        await expect(this.alertMessage).toBeVisible();
        const alertMessage = await this.alertMessage.textContent();
        console.log(`Alert message:`, alertMessage);
    }


}