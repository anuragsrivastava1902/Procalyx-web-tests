//@ts-check

class LoginPage {
    constructor(page) {
        this.page = page;

        // Store the locator directly
        this.emailInput = page.getByRole('textbox', { name: 'you@example.com' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.otpField = page.getByRole('textbox');
        this.dropdown = page.getByRole('combobox')
    }


    async enterUserEmail(username) {
        await this.emailInput.fill(username);
    }

    async enterOTP() {
        console.log(this.continueButton);
        // Wait for the response triggered by clicking "Continue"
        const [response] = await Promise.all([
            this.page.waitForResponse(res => {
                // console.log(res);
                return res.url().includes('/api/v1/auth/otp/send') && res.status() === 200
            })
            , this.continueButton.click()
        ]);

        // Convert response to JSON
        const data = await response.json();
        const code = data.data.otp;
        console.log("Your code is:", code);
        // Dynamic OTP Fill
        const digits = code.toString().split("");
        for (let i = 0; i < digits.length; i++) {
            await this.otpField.nth(i).fill(digits[i]);
        }
    }


    async selectDropdown() {
        // Open the dropdown
        console.log("selecting drop..............................");
        await this.dropdown.click();

        // Click the option by text
        await this.page.getByRole('option', { name: 'My Dashboard' }).click();
        console.log("exitung drop..............................");


    }

}

export default LoginPage;
