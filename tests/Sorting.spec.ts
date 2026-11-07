import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { InventoryPage } from '../pages/InventoryPage';


test('test', async ({ page }) => {

    const loginPage=new LoginPage(page);
    const inventoryPage=new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user","secret_sauce");
    
    await inventoryPage.VerifyProductNames();
    await inventoryPage.VerifyProductNamesReverse();
    await inventoryPage.verifyProdcutPricesLowToHigh();
}
);