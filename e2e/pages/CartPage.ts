import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async verifyCartPageURL() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
  }

  async verifyCartHeading() {
    await expect(this.page.getByText('Your Cart')).toBeVisible();
  }

  async getCartItemsCount() {
    return await this.page.locator('[data-test="cart-item"]').count();
  }

  async verifyCartItemsCount(count: number) {
    await expect(this.page.locator('[data-test="cart-item"]')).toHaveCount(count);
  }

  async clickRemoveButton(productDataTestId: string) {
    await this.page.locator(`[data-test="remove-${productDataTestId}"]`).click();
  }

  async verifyCartBadgeCount(count: string) {
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toContainText(count);
  }

  async clickContinueShoppingButton() {
    await this.page.getByRole('button', { name: /continue shopping/i }).click();
  }

  async clickCheckoutButton() {
    await this.page.getByRole('button', { name: /checkout/i }).click();
  }

  async verifyEmptyCart() {
    await this.verifyCartHeading();
    await expect(this.page.locator('[data-test="cart-item"]')).toHaveCount(0);
  }

  async verifyProductInCart(productName: string) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async verifyProductPrice(price: string) {
    await expect(this.page.getByText(price)).toBeVisible();
  }
}
