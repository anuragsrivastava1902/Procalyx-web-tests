import { chromium } from '@playwright/test';
import { readConfig } from '../config/readConfig.js';
import fs from 'fs';

export async function loginAndSaveState(role, environment = 'qa', browser = null) {

    if (!browser) {
        browser = await chromium.launch();
    }
    const { apiURL, frontendURL, email } = readConfig(role, environment);

    console.log(`\n Logging in as: ${role}`);
    console.log(` ENV: ${environment}`);
    console.log(` Email: ${email}`);

    const context = await browser.newContext({ baseURL: apiURL });
    const page = await context.newPage();

    // Send OTP
    const sendOtpResponse = await context.request.post(`/api/v1/auth/otp/send`, {
        data: { email }
    });

    const otp = (await sendOtpResponse.json()).data.otp;

    // Verify OTP
    const verifyResponse = await context.request.post(`/api/v1/auth/otp/verify`, {
        data: { email, otp }
    });

    const { token, refreshToken } = (await verifyResponse.json()).data;

    // Inject token into FE
    await page.goto(frontendURL);
    await page.evaluate(({ token, refreshToken }) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('refresh_token', refreshToken);
    }, { token, refreshToken });

    const filePath = `storage/auth.${role}.json`;
    await context.storageState({ path: filePath });
    console.log(`Auth saved: ${filePath}`);
}