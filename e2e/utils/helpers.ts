import { Page } from '@playwright/test';
import credentials from '../testdata/credentials.json';
import products from '../testdata/products.json';
import checkout from '../testdata/checkout.json';
import urls from '../testdata/urls.json';

export class TestDataHelper {
  static getCredentials(userType: string) {
    return (credentials as any)[userType] || null;
  }

  static getProduct(productType: string) {
    return (products as any)[productType] || null;
  }

  static getCheckoutData(dataType: string) {
    return (checkout as any)[dataType] || null;
  }

  static getURL(urlType: string) {
    return (urls as any)[urlType] || null;
  }

  static getAllProducts() {
    return products as any;
  }

  static getAllCredentials() {
    return credentials as any;
  }
}

export class CommonHelpers {
  static async waitForElementVisibility(page: Page, selector: string, timeout: number = 5000) {
    await page.waitForSelector(selector, { timeout });
  }

  static async takeScreenshot(page: Page, filename: string) {
    await page.screenshot({ path: `./screenshots/${filename}.png` });
  }

  static async navigateTo(page: Page, url: string) {
    await page.goto(url);
  }

  static async reloadPage(page: Page) {
    await page.reload();
  }

  static async goBack(page: Page) {
    await page.goBack();
  }

  static async goForward(page: Page) {
    await page.goForward();
  }

  static getProductDataTestId(productName: string): string {
    const productMap: { [key: string]: string } = {
      'Sauce Labs Backpack': 'add-to-cart-sauce-labs-backpack',
      'Sauce Labs Bike Light': 'add-to-cart-sauce-labs-bike-light',
      'Sauce Labs Bolt T-Shirt': 'add-to-cart-sauce-labs-bolt-t-shirt',
      'Sauce Labs Fleece Jacket': 'add-to-cart-sauce-labs-fleece-jacket',
      'Sauce Labs Onesie': 'add-to-cart-sauce-labs-onesie',
      'Test.allTheThings() T-Shirt (Red)': 'add-to-cart-test-allthethings()-t-shirt-(red)',
    };
    return productMap[productName] || '';
  }
}
