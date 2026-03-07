import { test, expect } from '@playwright/test';
import { chromium, request } from '@playwright/test';
import { readConfig } from '../../utils/readConfig.js';
import fs from 'fs';


test('login by api', async ({ browser }) => {
    const { baseURL, email } = readConfig();

    const context = await browser.newContext({ baseURL: 'https://api-qa.procalyx.net' });
    const page = await context.newPage();

    // Send OTP
    const sendOtpResponse = await context.request.post(`/api/v1/auth/otp/send`, {
        data: { email }
    });

    const sendOtpBody = await sendOtpResponse.json();
    const otp = sendOtpBody.data.otp;

    // Verify OTP
    const verifyResponse = await context.request.post(`/api/v1/auth/otp/verify`, {
        data: { email, otp }
    });

    const verifyBody = await verifyResponse.json();
    const token = verifyBody.data.token;
    const refreshToken = verifyBody.data.refreshToken;

    console.log("Token:", token);

    // Inject token into localStorage
    await page.goto(baseURL);
    await page.evaluate(({ token, refreshToken }) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('refresh_token', refreshToken);
    }, { token, refreshToken });

    // Save storage
    await context.storageState({ path: 'storage/auth.json' });

    console.log("Auth state saved");
});