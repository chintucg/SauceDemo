import { expect, Locator, Page } from "@playwright/test";


export class CartPage
{
     readonly page:Page;
  
     readonly cartList:Locator;
     readonly cartProductName:Locator;
     readonly cartProductDescription:Locator;
     readonly cartPoductPrice:Locator;
    
    
      readonly menuButton:Locator;
      readonly menuOptions:Locator;
        readonly  logoutButton:Locator;
     readonly cartBadge:Locator;
      readonly cart:Locator;
       readonly cartItem:Locator
       readonly continueShopping: Locator
    constructor(page:Page)
    {
        this.page=page;
       this.cartItem=page.locator(".cart_item");
        this.cartList=page.locator(".cart_list");
        this.cartProductName=page.locator(".inventory_item_name");
        this.cartProductDescription=page.locator(".inventory_item_desc");
        this.cartPoductPrice=page.locator(".inventory_item_price");
       this.continueShopping=page.getByRole('button',{name:"Continue Shopping"});
         this.menuButton=page.locator("#react-burger-menu-btn");
         this.menuOptions=page.locator(".bm-item-list");
            this.logoutButton=page.locator("#logout_sidebar_link");
            this.cartBadge=page.locator(".shopping_cart_badge");
            this.cart=page.locator("a.shopping_cart_link");

    }
     async verifyCartItem(productName:string)
     {
       await expect(this.cartItem).toContainText("$productName");
     }
      async navigateToInventoryPage()
      {
        await this.continueShopping.click();

      }
}
