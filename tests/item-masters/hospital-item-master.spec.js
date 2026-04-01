import { test, expect } from '@playwright/test';
import ApAdminMenu from '../../pages/affordplan/ap-admin-menu.page.js';
import HospitalItemMasterListPage from '../../pages/affordplan/hospital-item-master/hospital-item-master-list.page.js';


test.describe.parallel('testing hospital item master', () => {
    test.use({ storageState: 'storage/auth.ap_superadmin.json' });
        test(`Hospital Item update test`, async ({ page }) => {
            const apAdminMenu = new ApAdminMenu(page);
            const hospitalItemMasterListPage = new HospitalItemMasterListPage(page);

            await page.goto("/dashboard");
            await apAdminMenu.goToHospitalItemMaster();
            await hospitalItemMasterListPage.waitForPageToLoadComplete();
            const hospitalItem = "SURGEON GLOVES NO. 7.0"
            await hospitalItemMasterListPage.editHospitalItem(hospitalItem);
            await page.pause()
        })
})
