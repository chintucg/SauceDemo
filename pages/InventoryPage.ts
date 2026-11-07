import { expect, Locator, Page } from "@playwright/test";


export class InventoryPage
{
     readonly page:Page;
     readonly productHeading:Locator;
     readonly productList:Locator;
     readonly productName:Locator;
     readonly productDescription:Locator;
     readonly productPrice:Locator;
     readonly addToCartButton:Locator
     readonly sortDropDown:Locator;
      readonly menuButton:Locator;
      readonly menuOptions:Locator;
        readonly  logoutButton:Locator;
     readonly cartBadge:Locator;
      readonly cart:Locator;
    constructor(page:Page)
    {
        this.page=page;
        this.productHeading=page.locator('[data-test="title"]');
        this.productList=page.locator(".inventory_item");
        this.productName=page.locator(".inventory_item_name");
        this.productDescription=page.locator(".inventory_item_desc");
        this.productPrice=page.locator(".inventory_item_price");
        this.addToCartButton=page.locator(".btn_inventory");
         this.sortDropDown=page.locator(".product_sort_container");
         this.menuButton=page.locator("#react-burger-menu-btn");
         this.menuOptions=page.locator(".bm-item-list");
            this.logoutButton=page.locator("#logout_sidebar_link");
            this.cartBadge=page.locator(".shopping_cart_badge");
            this.cart=page.locator("a.shopping_cart_link");

    }

    async verifyProductList()
    {
        const count=await this.productList.count();
          for(let i=0;i<count;i++)
        {
             await expect(this.productName.nth(i)).toBeVisible();
             await expect(this.productDescription.nth(i)).toBeVisible();
             await expect(this.productPrice.nth(i)).toBeVisible();
             await expect(this.addToCartButton.nth(i)).toBeVisible();


            
        }
    }
    async verifyProductPrice(productName: string, expectedPrice: string)
    {
        const product = this.productList.filter({ hasText: productName });

        await expect(product.locator(".inventory_item_name")).toHaveText(productName);
        await expect(product.locator(".inventory_item_price")).toHaveText(expectedPrice);
    }
     async clickMenuButton()
     {
        await this.menuButton.click();
     }
          async verifyMenuOptions()
          {
            await  this.menuOptions.locator("#inventory_sidebar_link").isVisible();
             await this.menuOptions.locator(".dynamic_catalog_sidebar_link").isVisible();;
             await this.menuOptions.locator("#about_sidebar_link").isVisible();
             await this.menuOptions.locator("#logout_sidebar_link").isVisible();
             await this.menuOptions.locator("#reset_sidebar_link").isVisible();

          }
             async clickLogoutButton(): Promise<void>
           {
               await  this.logoutButton.click();
           }

            async VerifyProductNames()
            {
                const productNames= await this.productName.allTextContents();
              // await  console.log("Product Names:", productNames);
               const expectedProductNames = [...productNames].sort();
               await expect(productNames).toEqual(expectedProductNames);
            }
            async VerifyProductNamesReverse()
            {
                await this.sortDropDown.selectOption("za");
                const reverseProductNames= await this.productName.allTextContents();
              // await  console.log("Product Names:", productNames);
               const expectedReverseProductNames = [...reverseProductNames].sort().reverse();
               await expect(reverseProductNames).toEqual(expectedReverseProductNames);
            }

             async verifyProdcutPricesLowToHigh()
             {
                await this.sortDropDown.selectOption("Price (low to high)");
                const prices = await this.productPrice.allTextContents();
                const numericPrices = prices.map(price => Number(price.replace("$", "")));
                const expectedPrices= [...numericPrices].sort((a, b) => a - b);
                
            

                await expect(numericPrices).toEqual(expectedPrices);
                await expect(numericPrices[0]).toEqual(expectedPrices[0]);

             }
             async verifyProductPricesHighToLow()
             {
                await this.sortDropDown.selectOption("Price (high to low)");
                const prices = await this.productPrice.allTextContents();
                const numericPrices = prices.map(price => Number(price.replace("$", "")));
                const expectedPrices= [...numericPrices].sort((a, b) => b - a);
                
            

                await expect(numericPrices).toEqual(expectedPrices);
              const firstProductName = await  this.productName.first().textContent();
              expect(firstProductName).toEqual("Sauce Labs Fleece Jacket");
              const firstProductPrice = await this.productPrice.first().textContent();
              expect(firstProductPrice).toEqual("$49.99");
             }

             async addProductToCart(productName: string)
             {

               await this.productList.filter({hasText:productName}).locator(this.addToCartButton).click();
                
             }
              async removeProdcut(productName:string)
              {
                 await this.productList.filter({hasText:productName}).locator(this.addToCartButton).click();
                
                  
              }
              async goToCart()
              {
                await this.cart.click();

              }

               async openProductDetails(productName:string)
               {
                   await this.productList.filter({hasText:productName}).locator(this.productName).click();
                
               }

      

              
}
