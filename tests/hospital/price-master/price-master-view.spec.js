import { test, expect } from '@playwright/test';
import HospitalPriceMasterPage from '../../../pages/hospital/price-master/hospital-price-master.page.js';

test.describe('Hospital Price Master Suite', () => {

    test.use({ storageState: 'storage/auth.h_superadmin.json' });

    test('Verify Price Master page loads and table is visible', async ({ page }) => {
        const priceMasterPage = new HospitalPriceMasterPage(page);

        // Navigate to the dashboard or base URL first if needed, or directly to Price Master
        await page.goto('/dashboard');
        
        // Alternatively, starting from dashboard, click the menu:
        // await page.goto('/dashboard');
        // await priceMasterPage.clickPriceMasterMenu();

        // Verify the data table loads
        await priceMasterPage.verifyTableLoaded();

        // Example: interact with hospital unit dropdown
        // await priceMasterPage.selectHospitalUnit('Delta Hospital_1');
    });

});
