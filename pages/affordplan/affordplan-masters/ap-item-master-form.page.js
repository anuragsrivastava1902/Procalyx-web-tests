export default class ApItemMasterFormPage {
    constructor(page) {
        this.page = page;
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

    // ----------- action methods
    async fillForm(apItem) {
        await this.itemNameInputField.fill(apItem.itemName);
        await this.genericNameInputField.fill(apItem.genericName);
        await this.doseSizeInputField.fill(apItem.doseOrSize);

        //-------------------------------------------------------- select category from the dropdown

        await this.categoryDropdown.fill(apItem.category);
        const categoryOption = this.page.getByRole('option', {
            name: new RegExp(apItem.category, 'i')
        }).nth(0);
        await categoryOption.waitFor({ state: 'visible' })
        await categoryOption.click();

        //----------------------------------------------------------select dosageType from the dropdown
        if (apItem.category != 'Consumables') {
            await this.dosageTypeDropdown.fill(apItem.dosageType);
            const dosageTypeOption = this.page.getByRole('option', {
                name: new RegExp(apItem.dosageType, 'i')
            }).nth(0);
            await dosageTypeOption.waitFor({ state: 'visible' })
            await dosageTypeOption.click();
            // await this.page.keyboard.press('Tab');
        }


        //----------------------------------------------------- fill gst percent in the input field
        await this.gstPercentInputField.click();
        await this.gstPercentInputField.press('Control+A');
        await this.gstPercentInputField.press('Backspace');
        await this.gstPercentInputField.press('Backspace');
        await this.gstPercentInputField.fill(apItem.gstPercent);


        await this.hsnCodeInputField.fill(apItem.hsnCode);
        await this.packMrpInputField.press('Backspace');
        await this.packMrpInputField.type(apItem.packMrp);
        await this.unitPerPackInputField.press('Backspace');
        await this.unitPerPackInputField.fill(apItem.unitPerPack);


        //-------------------------------------------------------- select uom type from the dropdown
        await this.uomInputField.fill(apItem.uom);
        const uomTypeOption = this.page.getByRole('option', {
            name: new RegExp(apItem.uom, 'i')
        }).nth(0);
        await uomTypeOption.waitFor({ state: 'visible' })
        await uomTypeOption.click();

        //-------------------------------------------------------- select subcategory from the dropdown
        await this.subcategoryInputField.fill(apItem.subcategory)
        const subcategoryOption = this.page.getByRole('option', {
            name: new RegExp(apItem.subcategory, 'i')
        }).nth(0);
        await subcategoryOption.waitFor({ state: 'visible' })
        await subcategoryOption.click();

        //-------------------------------------------------------- select roa from the dropdown
        await this.roaInputField.fill(apItem.roa);
        const roaOption = this.page.getByRole('option', {
            name: new RegExp(apItem.roa, 'i')
        }).nth(0);
        await roaOption.waitFor({ state: 'visible' })
        await roaOption.click();

        //-------------------------------------------------------- select therapy from the dropdown
        await this.therapyAreaInputField.fill(apItem.therapyArea);
        const therapyOption = this.page.getByRole('option', {
            name: new RegExp(apItem.therapyArea, 'i')
        }).nth(0);
        await therapyOption.waitFor({ state: 'visible' })
        await therapyOption.click();

        //-------------------------------------------------------- select group from the dropdown
        await this.groupInputField.fill(apItem.group);
        const groupOption = this.page.getByRole('option', {
            name: new RegExp(apItem.group, 'i')
        }).nth(0);
        await groupOption.waitFor({ state: 'visible' })
        await groupOption.click();

        //-------------------------------------------------------- select form from the dropdown
        await this.formInputField.fill(apItem.form);
        const formOption = this.page.getByRole('option', {
            name: new RegExp(apItem.form, 'i')
        }).nth(0);
        await formOption.waitFor({ state: 'visible' })
        await formOption.click();

        //-------------------------------------------------------- select form/unit-type from the dropdown
        await this.formUnitTypeInputField.fill(apItem.formOrUnitType);
        const formUnitTypeOption = this.page.getByRole('option', {
            name: new RegExp(apItem.formOrUnitType, 'i')
        }).nth(0);
        await formUnitTypeOption.waitFor({ state: 'visible' })
        await formUnitTypeOption.click();

        //-------------------------------------------------------- select mfg from the dropdown
        await this.mfgInputField.fill(apItem.mfgName);
        const mfgOption = this.page.getByRole('option', {
            name: new RegExp(apItem.mfgName, 'i')
        }).nth(0);
        await mfgOption.waitFor({ state: 'visible' })
        await mfgOption.click();

        await this.packingSizeInputField.fill(apItem.packingSize);
        await this.remarksInputField.fill(apItem.remarks)
        // await this.page.pause();

        //-------------------------------------------------------- click SAVE button
        await Promise.all([this.page.waitForResponse(res =>
            res.status() == 201
        ), this.saveButton.click()
        ])
    }
}
