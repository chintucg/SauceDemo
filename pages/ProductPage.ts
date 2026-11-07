import { expect, Locator, Page } from "@playwright/test";
export class ProductPage{
     readonly prodcutName:Locator;
     readonly page:Page
     constructor(page:Page)
     {
         this.page=page;
         this.prodcutName=page.locator(".inventory_details_container").getByTestId("inventory-item");
        
     }
}