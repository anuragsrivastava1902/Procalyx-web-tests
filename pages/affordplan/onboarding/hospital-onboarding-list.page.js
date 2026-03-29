export default class HospitalOnboardingListPage {
    constructor(page) {
        this.page = page;
        this.addNewHospitalBtn = page.getByRole('button', { name: 'Add New Hospital' })
        this.approveOrRejectBtn = page.getByRole('button', { name: 'Approve / Reject' })
        this.pendingCardContainer = page.getByText('Pending Onboarding Request').locator('..')
        this.approvalNoteInput = page.getByRole('textbox', { name: /Add any note/i })
        this.confirmationDialogBox = page.locator('div[class*=MuiDialog-container]')
        this.rejectionNoteInput = page.getByRole('textbox', { name: /Please provide a reason for rejection/i })
        this.approveConfirmBtn = page.getByRole('button', { name: 'Approve Hospital' })
        this.rejectConfirmBtn = this.confirmationDialogBox.getByText('Reject', { exact: true })
    }

    async clickAddNewHospitalButton() {
        await this.addNewHospitalBtn.click();
    }

    // async print() {
    //     await this.pendingApprovalCard.waitFor({ state: 'visible' })
    //     const text = await this.pendingApprovalCard.innerText()
    //     const lines = text.split('\n').filter(line => line.trim() !== '');
    //     console.log(lines[1])
    // }

    async approveHospital(hospitalName) {
        await this.pendingCardContainer.waitFor({ state: 'visible' })
        const pendingHospitalcount = await this.pendingCardContainer.locator(':scope > div').count();
        console.log(pendingHospitalcount)
        for (let i = 0; i < pendingHospitalcount; i++) {
            const text = await this.pendingCardContainer.locator(':scope > div').nth(i).innerText()
            console.log(text)
            if (text.includes(hospitalName)) {
                this.pendingCardContainer.locator(':scope > div').nth(i).getByRole('button', { name: 'Approve / Reject' }).click()
                this.approvalNoteInput.fill('approved')
                await this.page.pause();
                this.approveConfirmBtn.click()
            }
        }
    }

    async rejectHospital(hospitalName) {
        await this.pendingCardContainer.waitFor({ state: 'visible' })
        const pendingHospitalcount = await this.pendingCardContainer.locator(':scope > div').count();
        console.log(pendingHospitalcount)
        for (let i = 0; i < pendingHospitalcount; i++) {
            const text = await this.pendingCardContainer.locator(':scope > div').nth(i).innerText()
            console.log(text)
            if (text.includes(hospitalName)) {
                this.pendingCardContainer.locator(':scope > div').nth(i).getByRole('button', { name: 'Approve / Reject' }).click()
                this.rejectionNoteInput.fill('rejected')
                this.rejectConfirmBtn.click()
            }
        }
    }

}