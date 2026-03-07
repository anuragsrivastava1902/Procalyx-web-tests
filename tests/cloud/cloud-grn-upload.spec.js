import { test, expect, chromium } from '@playwright/test';


test('check grn upload', async () => {
    const browser = await chromium.launch({ headless: false }); // set true for headless
    const context = await browser.newContext();
    const page = await context.newPage();


    const url = 'https://cloud-qa.procalyx.net/login';
    const email = 'anurag.srivastava@affordplan.com';
    const password = 'affordplan@1902';
    const cloud_id = "HOS-597B9BE1"

    await page.goto(url, { waitUntil: 'networkidle' });

    // Fill username/email

    await page.getByRole('textbox', { name: 'Account name or email' }).fill(email);

    // Fill password
    await page.getByRole('textbox', { name: 'Password' }).fill(password);

    // Click login button
    await page.getByText('Log in', { exact: true }).click();

    // Wait for dashboard (Files app usually loads)
    //   await page.waitForSelector('#app-content');

    console.log('Login successful!');

    // Optional: keep browser open
    // await browser.close();
    
    // open hospital files folder
    await page.getByRole('button', { name: 'Open folder Hospital Files' }).click();
    
    //click on add new button
    await page.getByText('New', { exact: true }).first().click();

    //click on "add new folder" button
    await page.getByText('New folder', { exact: true }).click();

    //enter folder name (hospital cloud id)
    await page.getByRole('textbox', { name: 'Folder name' }).first().fill(cloud_id);

    //click create button
    await page.getByText('Create', { exact: true }).first().click();
//----------------------------------------------------------------

    //open the created folder
    await page.getByRole('button', { name: `Open folder ${cloud_id}` }).click();

    //click on add new button
    await page.getByText('New', { exact: true }).click();

    //click on "add new folder" button
    await page.getByText('New folder', { exact: true }).click();

    //enter folder name (GRNs)
    await page.getByRole('textbox', { name: 'Folder name' }).first().fill("GRNs");

    //click create button
    await page.getByText('Create', { exact: true }).first().click();



    await page.pause();

});