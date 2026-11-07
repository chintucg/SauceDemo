import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Loginpage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test("add and remove a product from the cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");

    const backpack = inventoryPage.productList.filter({
        hasText: "Sauce Labs Backpack",
    });
    const cartButton = backpack.locator(inventoryPage.addToCartButton);

    await expect(cartButton).toHaveText("Add to cart");
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await expect(cartButton).toHaveText("Remove");
    await expect(inventoryPage.cartBadge).toHaveText("1");

    await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    await expect(inventoryPage.cartBadge).toHaveText("2");

    await inventoryPage.removeProdcut("Sauce Labs Backpack");
    await inventoryPage.goToCart();

    await expect(cartPage.cartItem.locator(cartPage.cartProductName)).toContainText("Sauce Labs Bike Light");
    await expect(cartPage.cartItem).toContainText("Sauce Labs Bike Light");
    await expect(cartPage.cartPoductPrice).toContainText("$9.99");
     await cartPage.navigateToInventoryPage();
     await expect(page.url()). toContain("/inventory.html")
      await page.reload();
      await expect(inventoryPage.cartBadge).toHaveCount(1)

});