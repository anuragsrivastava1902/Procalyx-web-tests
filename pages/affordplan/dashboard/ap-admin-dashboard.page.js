export default class ApAdminDashboardPage {

    constructor(page) {
        this.page = page;
        /** -------------------- DASHBOARD MENU -------------------- **/
        this.addNewButton = page.getByRole('button', { name: /add new/i });

        /** Buttons */
        this.saveBtn = page.getByRole("button", { name: "Save" });
        this.confirmBtn = page.getByRole("button", { name: "Confirm" });
    }

    /** -------------------- ACTION METHODS -------------------- **/

    async save() {
        await this.saveBtn.click();
        await this.confirmBtn.click();
    }
}

