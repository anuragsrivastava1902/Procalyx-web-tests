export default class HospitalOnboardingListPage {
    constructor(page) {
        this.page = page;
        this.addNewHospital = page.getByRole('button', { name: 'Add New Hospital' })

        this.approvalCard = page.getByText('Pending Onboarding Request').locator('..')
        this.approveOrRejectBtn = page.getByRole('button', { name: 'Approve / Reject' })
    }

    async clickAddNewHospitalButton() {
        await this.addNewHospital.click();
    }

    async print() {
        await this.approvalCard.waitFor({ state: 'visible' })
        const text = await this.approvalCard.innerText()
        const lines = text.split('\n').filter(line => line.trim() !== '');
        console.log(lines[1])
    }

    async check() {
        await this.approvalCard.waitFor({ state: 'visible' })
        const parentDiv = this.approveOrRejectBtn.locator('xpath=../..')
        const parentTexts = await parentDiv.innerText()
        console.log("parent text >>>>>>> \n", parentTexts)
        if (parentTexts.includes('test hospital 02')){
            console.log('clickable \n\n clicking \n')
            this.approveOrRejectBtn.click();
        }
    }

}