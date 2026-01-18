import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { TestDataHelper } from './helpers';

export class PageManager {
  private page: Page;
  private loginPage: LoginPage;
  private inventoryPage: InventoryPage;
  private cartPage: CartPage;
  private checkoutPage: CheckoutPage;
  private productDetailPage: ProductDetailPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new InventoryPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.productDetailPage = new ProductDetailPage(page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getInventoryPage(): InventoryPage {
    return this.inventoryPage;
  }

  getCartPage(): CartPage {
    return this.cartPage;
  }

  getCheckoutPage(): CheckoutPage {
    return this.checkoutPage;
  }

  getProductDetailPage(): ProductDetailPage {
    return this.productDetailPage;
  }

  async login(userType: string = 'validUser') {
    const credentials = TestDataHelper.getCredentials(userType);
    await this.loginPage.login(credentials.username, credentials.password);
  }

  async loginWithCredentials(username: string, password: string) {
    await this.loginPage.login(username, password);
  }

  async navigateToLogin() {
    await this.loginPage.navigateToLoginPage();
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }
}
