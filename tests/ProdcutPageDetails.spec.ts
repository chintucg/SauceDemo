import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Loginpage";
import { InventoryPage } from "../pages/InventoryPage";
 import { CartPage } from "../pages/CartPage";
 import { ProductPage } from "../pages/ProductPage";

test("Prodcut Details", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const productPage= new ProductPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");

    const tshirtName = await inventoryPage.productList.filter({hasText:"Sauce Labs Bolt T-Shirt"}).locator(inventoryPage.productName).allTextContents();
          const tshirtDesc = await inventoryPage.productList.filter({hasText:"Sauce Labs Bolt T-Shirt"}).locator(inventoryPage.productDescription).allTextContents();  
          const tshirtPrice = await inventoryPage.productList.filter({hasText:"Sauce Labs Bolt T-Shirt"}).locator(inventoryPage.productPrice).allTextContents();
        await inventoryPage.openProductDetails("Sauce Labs Bolt T-Shirt");
         console.log(await productPage.prodcutName.textContent());



    }); 
