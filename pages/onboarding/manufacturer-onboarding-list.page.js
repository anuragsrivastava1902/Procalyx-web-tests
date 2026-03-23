import { expect } from "@playwright/test";

export default class ManufacturerOnboardingListPage {
    constructor(page) {
        this.page = page;
        this.addNewButton = page.getByRole('button', { name: /add new/i });
        this.unassignedTab = page.getByRole('button', { name: 'Unassigned' })
        this.editButton = page.locator('table tbody tr').first().locator('td').nth(47)

    }

    async startManufacturerCreation() {
        await this.addNewButton.click();
    }
    
    async editManufacturer() {
        await expect(this.editButton).toBeEnabled({timeout:18000});
        await this.editButton.click();

    }    
    
    async viewUnassignedManufacturers(){
        await expect(this.unassignedTab).toBeEnabled({timeout:18000});
        await this.unassignedTab.click();
    }

    async waitForPageToLoadComplete(){
         await expect(this.page.locator('.MuiSkeleton-root'), "wait for table to load completely", ).toHaveCount(0, {timeout:20000});
    }



}