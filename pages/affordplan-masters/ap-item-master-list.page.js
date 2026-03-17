import { test, expect } from '@playwright/test';
export default class ApItemMasterListPage {

    constructor(page) {
        this.page = page;
        this.addNewButton = page.getByRole('button', { name: /add new/i });


        this.itemMasterHeading = page.getByRole('heading', { name: 'Item Master' });
        this.addNewItem = page.getByRole('button', { name: 'Add New' });

        this.searchSKU = page.getByRole('textbox').nth(0)
        this.searchItemCode = page.getByRole('textbox').nth(1)
        this.searchItemName = page.getByRole('textbox').nth(2)
        this.searchManufacturer = page.getByRole('textbox').nth(3);
        this.searchGenericName = page.getByRole('textbox').nth(4);
        this.searchDoseSize = page.getByRole('textbox').nth(5);
        this.searchMFS = page.getByRole('textbox').nth(6);
        this.searchUnitPerPack = page.getByRole('textbox').nth(7);
        this.searchUomName = page.getByRole('textbox').nth(8);
        this.searchCategory = page.getByRole('textbox').nth(9);
        this.searchSubcategory = page.getByRole('textbox').nth(10);
        this.searchPackingSize = page.getByRole('textbox').nth(11);
        this.searchTherapy = page.getByRole('textbox').nth(12);
        this.searchROA = page.getByRole('textbox').nth(13);
        this.searchGroup = page.getByRole('textbox').nth(14);
        this.searchForm = page.getByRole('textbox').nth(15);
        this.searchFormUnitType = page.getByRole('textbox').nth(16);
        this.searchDosageType = page.getByRole('textbox').nth(17);
        // this.searchGstPercent = page.getByRole('textbox').nth(18);
        this.searchHsnCode = page.getByRole('textbox').nth(18);
        this.searchDpcoNpcaList = page.getByRole('textbox').nth(19);
        this.searchDpcoCeilingPrice = page.getByRole('textbox').nth(20);
        this.searchInnovatorBrand = page.getByRole('textbox').nth(21);
        this.searchStatus = page.getByRole('textbox').nth(22);
        this.searchRemarks = page.getByRole('textbox').nth(23);
        // this.searchPackMrp = page.getByRole('textbox').nth(25);
        // this.searchUnitMrp = page.getByRole('textbox').nth(26);






    }


    async startNewAPItemCreation() {
        await this.addNewButton.click();
    }

    async searchItem(item) {
        await expect(this.page.locator('.MuiSkeleton-root')).toHaveCount(0);
        await expect(this.searchItemName).toBeVisible();
        await expect(this.searchItemName).toBeEnabled();
        await this.searchItemName.click();
        await this.searchItemName.fill(item);
    }
}
