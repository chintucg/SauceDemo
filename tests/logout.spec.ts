import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { InventoryPage } from '../pages/InventoryPage';


test('test', async ({ page }) => {

    const loginPage=new LoginPage(page);
    const inventoryPage=new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user","secret_sauce");
    
  await expect(inventoryPage.productList).toHaveCount(6);
   await inventoryPage.verifyProductList();
    await inventoryPage.verifyProductPrice("Sauce Labs Backpack", "$29.99");
      expect( await inventoryPage.sortDropDown).toContainText ("Name (A to Z)");
}
);