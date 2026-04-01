import { expect } from "@playwright/test";

export default class ApItemMasterFormPage {
    constructor(page) {
        this.page = page;
        this.formHeading = page.getByText(/New Affordplan Item/)
        this.itemNameInputField = page.getByRole('textbox', { name: /Item Name/i });
        this.genericNameInputField = page.getByRole('textbox', { name: /Generic Name/i });
        this.doseSizeInputField = page.getByRole('textbox', { name: /Dose\/Size/i });
        this.categoryDropdown = page.getByPlaceholder('Select Category');
        this.dosageTypeDropdown = page.getByRole('combobox', { name: 'Dosage Type' })
        this.gstPercentInputField = page.getByRole('spinbutton', { name: /GST%/i }); // for type = number in html, the role is "spinbutton"
        this.hsnCodeInputField = page.getByRole('textbox', { name: /HSN Code/i });
        this.packMrpInputField = page.getByRole('spinbutton', { name: /Pack MRP/i })
        this.unitPerPackInputField = page.getByRole('spinbutton', { name: /Unit per Pack/i })
        this.uomInputField = page.getByRole('combobox', { name: /UOM/i })
        this.dpcoInputField = page.getByRole('textbox', { name: /DPCO Ceiling Price/i })
        this.subcategoryInputField = page.getByRole('combobox', { name: /Sub Category/i })
        this.roaInputField = page.getByRole('combobox', { name: /ROA/i })
        this.therapyAreaInputField = page.getByRole('combobox', { name: /Therapy Area/i })
        this.groupInputField = page.getByRole('combobox', { name: /Group/i })
        this.formInputField = page.getByRole('combobox', { name: 'Form', exact: true })
        this.formUnitTypeInputField = page.getByPlaceholder('Select Form/Unit Type')
        this.mfgInputField = page.getByRole('combobox', { name: /Manufacturer/i })
        this.packingSizeInputField = page.getByRole('textbox', { name: 'Packing Size' })
        this.remarksInputField = page.getByRole('textbox', { name: 'Remarks' })
        this.statusDropdown = page.getByRole('combobox', { name: /Status/i })
        this.saveButton = page.getByRole('button', { name: /Save/i })
    }

    // Helper method for selecting dropdown options dynamically
    async selectDropdownOption(inputLocator, optionText) {
        if (!optionText) return;
        await inputLocator.fill(optionText);
        const optionLocator = this.page.getByRole('option', { name: new RegExp(optionText, 'i') }).first();
        await optionLocator.waitFor({ state: 'visible' });
        await optionLocator.click();
    }

    // ----------- action methods
    async fillForm(apItem) {
        await this.itemNameInputField.fill(apItem.itemName);
        await this.genericNameInputField.fill(apItem.genericName);
        await this.doseSizeInputField.fill(apItem.doseOrSize);

        //-------------------------------------------------------- select category from the dropdown
        await this.selectDropdownOption(this.categoryDropdown, apItem.category);

        //----------------------------------------------------------select dosageType from the dropdown
        if (apItem.category != 'Consumables') {
            await this.selectDropdownOption(this.dosageTypeDropdown, apItem.dosageType);
            await expect(this.dosageTypeDropdown).toHaveValue(apItem.dosageType);
        }

        //----------------------------------------------------- fill gst percent in the input field
        await this.gstPercentInputField.clear();
        await this.gstPercentInputField.fill(apItem.gstPercent);


        await this.hsnCodeInputField.fill(apItem.hsnCode);
        await this.packMrpInputField.clear();
        await this.packMrpInputField.fill(apItem.packMrp);
        await this.unitPerPackInputField.clear();
        await this.unitPerPackInputField.fill(apItem.unitPerPack);

        //-------------------------------------------------------- select uom type from the dropdown
        await this.selectDropdownOption(this.uomInputField, apItem.uom);

        //-------------------------------------------------------- select subcategory from the dropdown
        await this.selectDropdownOption(this.subcategoryInputField, apItem.subcategory);

        //-------------------------------------------------------- select roa from the dropdown
        await this.selectDropdownOption(this.roaInputField, apItem.roa);

        //-------------------------------------------------------- select therapy from the dropdown
        await this.selectDropdownOption(this.therapyAreaInputField, apItem.therapyArea);

        //-------------------------------------------------------- select group from the dropdown
        await this.selectDropdownOption(this.groupInputField, apItem.group);

        //-------------------------------------------------------- select form from the dropdown
        await this.selectDropdownOption(this.formInputField, apItem.form);

        //-------------------------------------------------------- select form/unit-type from the dropdown
        await this.selectDropdownOption(this.formUnitTypeInputField, apItem.formOrUnitType);

        //-------------------------------------------------------- select mfg from the dropdown
        await this.selectDropdownOption(this.mfgInputField, apItem.mfgName);

        await this.packingSizeInputField.fill(apItem.packingSize);
        await this.remarksInputField.fill(apItem.remarks);
        await this.page.pause();

        //-------------------------------------------------------- click SAVE button
        await Promise.all([this.page.waitForResponse(res =>
            res.status() == 201
        ), this.saveButton.click()
        ])
    }
}
