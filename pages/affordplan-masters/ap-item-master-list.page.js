export default class ApItemMasterListPage{

    constructor(page){
        this.page = page;
        this.addNewButton = page.getByRole('button', { name: /add new/i });
    }


    async startNewAPItemCreation(){
        await this.addNewButton.click();
    }
}
