import { chromium } from '@playwright/test';
import { loginAndSaveState } from '../utils/auth/login-service.js';


const roles = [
    'ap_superadmin',
    'ap_admin',
    'ap_hkam',
    'ap_mkam',
    'ap_operator',
    'h_superadmin',
    'h_cxo',
    'h_operator',
    'm_superadmin',
    'm_businesshead',
    'm_cxo',
    'm_operator'
];

export default async () => {
    const browser = await chromium.launch();
    const environment = (process.env.ENV || 'qa').toLowerCase();

    console.log(`Running global setup for ENV: ${environment}`);
    await Promise.all(
        roles.map(role => loginAndSaveState(role, environment, browser))
    );
    await browser.close();
    console.log('All roles authenticated');
};