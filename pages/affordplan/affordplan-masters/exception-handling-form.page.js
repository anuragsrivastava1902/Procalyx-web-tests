export default class ExceptionHandlingFormPage{
    constructor(page){
        this.page = page;
        this.hospitalNameField = page.getByRole('combobox',{name:"Hospital Name"})
        this.hospitalUnitNameField = page.getByRole('textbox',{name:"Hospital Unit"})
        this.hospitalItemNameField = page.getByRole('textbox',{name:"Item Name"})
        this.apItemNameDropdown = page.getByRole('combobox', { name: 'Item Name (AP Item)' })
        this.uppInput = page.getByRole('spinbutton', { name: 'Unit Per Pack (UPP)' })
        this.remarksField = page.getByRole('textbox', {name: 'Remarks'})
        this.mrpField = page.getByRole('spinbutton', {name:'MRP', exact: true})
        this.rateWoGstField = page.getByRole('spinbutton', {name:'Rate W/O GST'})
        this.addNewApItemButton = page.getByRole('button', { name: 'Add New in Item Master' })
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }
}