import { expect } from "@playwright/test";

export default class MappingMasterFormPage {
    constructor(page) {
        this.page = page;
        // 🔹 Form fields
        this.itemName = page.getByRole('textbox', { name: 'Item Name' });
        this.itemCode = page.getByRole('textbox', { name: 'Item Code' });
        this.supplierCode = page.getByRole('textbox', { name: 'Hospital Supplier Code' });
        this.supplierName = page.getByRole('textbox', { name: 'Supplier Name' });
        this.mfgName = page.getByRole('textbox', { name: 'MFG Name' });
        this.grnNumber = page.getByRole('textbox', { name: 'GRN Number' });
        this.grnDate = page.getByRole('textbox', { name: 'GRN Date' });

        this.packMrp = page.getByRole('textbox', { name: 'Pack MRP' });
        this.unitMrp = page.getByRole('textbox', { name: 'Unit MRP' });
        this.packQty = page.getByRole('textbox', { name: 'Pack Qty', exact: true });
        this.grnUpp = page.getByRole('textbox', { name: 'GRN UPP' });
        this.unitQty = page.getByRole('textbox', { name: 'Unit Qty' });

        this.packCostWoGst = page.getByRole('textbox', { name: 'Pack Cost WO GST', exact: true });
        this.packCostWGst = page.getByRole('textbox', { name: 'Pack Cost W GST', exact: true });
        this.unitCostWGst = page.getByRole('textbox', { name: 'Unit Cost W GST', exact: true });
        this.unitCostWoGst = page.getByRole('textbox', { name: 'Unit Cost WO GST', exact: true });

        this.gst = page.getByRole('textbox', { name: 'GST %' });
        this.netAmount = page.getByRole('textbox', { name: 'Net Amount', exact: true });
        this.totalCostWoGst = page.getByRole('textbox', { name: 'Total Cost WO GST', exact: true });

        this.packFreeQty = page.getByRole('textbox', { name: 'Pack Free Qty' });
        this.unitFreeQty = page.getByRole('textbox', { name: 'Unit Free Qty' });

        // 🔹 Actions
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.successToast = page.getByText('GRN field mappings updated').nth(1);
    }

    async fillForm(mapping) {
        await this.itemName.fill(mapping.itemName || '');
        await this.itemCode.fill(mapping.itemCode || '');
        await this.supplierCode.fill(mapping.supplierCode || '');
        await this.supplierName.fill(mapping.supplierName || '');
        await this.mfgName.fill(mapping.mfgName || '');
        await this.grnNumber.fill(mapping.grnNumber || '');
        await this.grnDate.fill(mapping.grnDate || '');

        await this.packMrp.fill(mapping.packMrp?.toString() || '');
        await this.unitMrp.fill(mapping.unitMrp?.toString() || '');
        await this.packQty.fill(mapping.packQty?.toString() || '');
        await this.grnUpp.fill(mapping.grnUpp?.toString() || '');
        await this.unitQty.fill(mapping.unitQty?.toString() || '');

        await this.packCostWoGst.fill(mapping.packCostWoGst?.toString() || '');
        await this.packCostWGst.fill(mapping.packCostWGst?.toString() || '');
        await this.unitCostWGst.fill(mapping.unitCostWGst?.toString() || '');
        await this.unitCostWoGst.fill(mapping.unitCostWoGst?.toString() || '');

        await this.gst.fill(mapping.gst?.toString() || '');
        await this.netAmount.fill(mapping.netAmount?.toString() || '');
        await this.totalCostWoGst.fill(mapping.totalCostWoGst?.toString() || '');

        await this.packFreeQty.fill(mapping.packFreeQty?.toString() || '');
        await this.unitFreeQty.fill(mapping.unitFreeQty?.toString() || '');
    }

    async saveForm() {
        await Promise.all([this.page.waitForResponse(res =>
            res.status() == 201
        ), this.saveBtn.click()
        ])
    }

    async verifySuccessMessage() {
        await expect(this.successToast).toBeVisible();
    }


}