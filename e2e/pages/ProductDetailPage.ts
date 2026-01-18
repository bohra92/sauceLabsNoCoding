import { Page, expect } from '@playwright/test';

export class ProductDetailPage {
  constructor(private page: Page) {}

  async verifyProductDetailPageURL() {
    await expect(this.page).toHaveURL(/inventory-item\.html/);
  }

  async verifyProductPrice(price: string) {
    await expect(this.page.locator('[data-test="inventory-item-price"]')).toContainText(price);
  }

  async clickAddToCartButton() {
    await expect(this.page.getByRole('button', { name: /add to cart/i })).toBeVisible();
    await this.page.getByRole('button', { name: /add to cart/i }).click();
  }

  async verifyBackToProductsButtonVisible() {
    await expect(this.page.getByRole('button', { name: /back to products/i })).toBeVisible();
  }

  async clickBackToProductsButton() {
    await this.page.getByRole('button', { name: /back to products/i }).click();
  }

  async verifyProductName(productName: string) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async verifyProductDescription(description: string) {
    await expect(this.page.getByText(description)).toBeVisible();
  }
}
