import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { InventoryPage } from '../pages/InventoryPage';


test('test', async ({ page }) => {

    const loginPage=new LoginPage(page);
    const inventoryPage=new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user","secret_sauce");
    
     await inventoryPage.clickMenuButton();
     await inventoryPage.verifyMenuOptions();
     await inventoryPage.clickLogoutButton();
 await expect(page.url()).toContain("https://www.saucedemo.com/");
  await page.goto("https://www.saucedemo.com/inventory.html");
   await  expect(loginPage.errorMessage).toContainText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
}
);