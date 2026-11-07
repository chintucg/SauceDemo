import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { InventoryPage } from '../pages/InventoryPage';
import testData from './data/testData.json';


test('test', async ({ page }) => {

    const loginPage=new LoginPage(page);
    const inventoryPage=new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login(testData.username, testData.password);
    await expect(page.url()).toContain("inventory.html");
   await expect(inventoryPage.productHeading).toBeVisible();

}
);
test('E2 Invalid Login message', async ({ page }) => {

    const loginPage=new LoginPage(page);
    const inventoryPage=new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login("","");
    await expect(loginPage.errorMessage).toContainText("Username is required");
    
    await loginPage.login("standard_user","");
    await expect(loginPage.errorMessage).toContainText("Password is required");
    await loginPage.login("standard_user","adsd");
    await expect(loginPage.errorMessage).toContainText("Username and password do not match any user in this service");
   await loginPage.cancelErrorMesassage.click();
    

}
);
