import {Page,Locator} from '@playwright/test';;

export class LoginPage{

    readonly page:Page;
    readonly username:Locator;
    readonly password:Locator;
    readonly loginbutton:Locator;
    readonly errorMessage:Locator;
    readonly cancelErrorMesassage:Locator;
    constructor(page:Page)
    {
        this.page=page;
        this.username=page.locator('[data-test="username"]');
        this.password=page.locator('[data-test="password"]');
        this.loginbutton=page.locator('[data-test="login-button"]');
        this.errorMessage=page.locator('[data-test="error"]');
        this.cancelErrorMesassage=page.locator("//button[@aria-label='Dismiss error']//*[name()='svg']//*[name()='path' and contains(@fill,'currentCol')]")
    }
     async navigate()
     {
        await this.page.goto("https://www.saucedemo.com/");
     }

    async login(username:string,password:string)
    {
     await this.username.fill(username);;
      await this.password.fill(password);
       await this.loginbutton.click();


    }
}