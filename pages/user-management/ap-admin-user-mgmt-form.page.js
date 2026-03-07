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
        this.hospitalUnitSelect = page.locator('select:has(option:has-text("Select hospital unit names"))').first();

        // this is a temporary fix, i have to ask devs to add data-testid attribute or to correct the 'label' logic
        this.manufacturerSelect = page.locator('select:has(option:has-text("Select Manufacturer"))').first() //page.locator('div._formGroup_twwef_457', { hasText: 'Manufacturer' }) .locator('select').nth(0); 

        this.assignedHospitalUnitsDropdown = page.locator('span:has-text("Select hospital units")').locator('..');

        this.divisionSelect = page.locator('select:has(option:has-text("Select division"))').first();
        this.therapyAreasDropdown = page.locator('span:has-text("Select therapy areas")');

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
        await expect(this.relationshipSelect).toBeVisible();
        await this.relationshipSelect.selectOption(user.relationship);
        await this.roleSelect.selectOption({ label: user.role });
        await this.departmentSelect.selectOption({ label: user.department });
    }

    async selectGeographyDetails(user) {
        await this.countrySelect.selectOption({ label: user.country });
        await this.stateSelect.selectOption({ label: user.state });
        await this.citySelect.selectOption({ label: user.city });
        console.log("all geography details filled")
    }


    async selectConditionalDropdowns(user) {
        // Wait for conditional dropdowns if relationship is Hospital
        if (user.relationship === 'hospital') {
            await expect(this.hospitalSelect).toBeVisible({ timeout: 10000 });
            await this.hospitalSelect.selectOption({ label: user.hospital });

            await expect(this.hospitalUnitSelect).toBeVisible({ timeout: 10000 });
            await this.hospitalUnitSelect.selectOption({ label: user.hospitalUnit });
            //await this.page.pause();
        }

        // Wait for conditional dropdowns if relationship is Manufacturer
        if (user.relationship === 'manufacturer') {
            console.log("user relationship is mfg................")
            await expect(this.manufacturerSelect).toBeVisible({ timeout: 10000 });
            console.log("---------mfg dropdown is located")
            await this.manufacturerSelect.selectOption({ label: user.manufacturer });
            console.log("selected mfg dropdown")

            await this.assignedHospitalUnitsDropdown.click();
            // Then select an option dynamically
            await this.page.getByRole('cell', {name:user.assignedUnits})
            //await this.page.getByText(user.assignedUnits, { exact: true }).click();
            console.log("assigned hospital units selected")
            //await this.page.locator('span', { hasText: user.assignedUnits }).locator('..').click();
            await this.page.getByText('Hospital Unit', { exact: true }).click(); //this click is for closing the dropdown
            console.log("assigned units dropdown closed")

            await expect(this.divisionSelect).toBeVisible({ timeout: 10000 });
            await this.divisionSelect.selectOption({ label: user.division });
            console.log("division selected")

            await this.therapyAreasDropdown.click();
            await this.page.getByRole('cell', { name: user.therapies })
            //await this.page.getByText(user.therapies, { exact: true }).click();
            await this.page.getByText('Therapy Area', { exact: true }).click(); //this click is for closing the dropdown
            console.log("therapies selected")
            // await this.page.pause();
        }

    }

    async clickSaveButton() {
        const [response] = await Promise.all([
            this.page.waitForResponse(res => res.request().method() === 'POST'),
            this.saveButton.click()
        ]);

        console.log(' API response:', await response.text());
    }


}