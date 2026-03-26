import { expect } from "@playwright/test";

export default class ExceptionHandlingListPage{
    constructor(page){
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Exception Handling' });
        this.exceptionItemEditBtn = page.getByRole('button', { name: 'Edit' }).first()
        this.hospitalNameSearchInput = page.locator("input").nth(0)
        this.unitNameSearchInput = page.locator("input").nth(1)
        this.unitCodeSearchInput = page.locator("input").nth(3)
        this.emailSearchInput = page.locator("input").nth(4)
        this.hospitalItemNameSearchInput = page.locator("input").nth(5)
        this.supplierNameSearchInput = page.locator("input").nth(8)
    }

    async editException(){
        await expect(this.exceptionItemEditBtn).toBeEnabled({timeout:10000})
        await this.exceptionItemEditBtn.click();
        await this.page.pause();
    }

    async waitForPageToLoadComplete(){
         await expect(this.page.locator('.MuiSkeleton-root'), "wait for table to load completely", ).toHaveCount(0, {timeout:20000});
    }
}