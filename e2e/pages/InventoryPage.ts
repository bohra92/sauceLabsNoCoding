import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async verifyInventoryPageURL() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }

  async verifyPageHeader() {
    await expect(this.page.getByText('Swag Labs')).toBeVisible();
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async getProductCount() {
    return await this.page.locator('[data-test="inventory-item"]').count();
  }

  async verifyProductsDisplayed(count: number) {
    await expect(this.page.locator('[data-test="inventory-item"]')).toHaveCount(count);
  }

  async verifyProductVisible(productName: string) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async verifyProductPrice(price: string) {
    await expect(this.page.getByText(price)).toBeVisible();
  }

  async clickAddToCartButton(productDataTestId: string) {
    await this.page.locator(`[data-test="add-to-cart-${productDataTestId}"]`).click();
  }

  async clickRemoveButton(productDataTestId: string) {
    await this.page.locator(`[data-test="remove-${productDataTestId}"]`).click();
  }

  async verifyRemoveButtonVisible(productDataTestId: string) {
    await expect(this.page.locator(`[data-test="remove-${productDataTestId}"]`)).toBeVisible();
  }

  async verifyAddToCartButtonVisible(productDataTestId: string) {
    await expect(this.page.locator(`[data-test="add-to-cart-${productDataTestId}"]`)).toBeVisible();
  }

  async getCartBadgeCount() {
    return await this.page.locator('[data-test="shopping-cart-badge"]').textContent();
  }

  async verifyCartBadgeCount(count: string) {
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toContainText(count);
  }

  async verifyCartBadgeNotVisible() {
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  }

  async clickCartLink() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async selectSortOption(option: string) {
    await this.page.locator('[data-test="product-sort-container"] select').selectOption(option);
  }

  async verifySortValue(value: string) {
    await expect(this.page.locator('[data-test="product-sort-container"] select')).toHaveValue(value);
  }

  async getFirstProductName() {
    return await this.page.locator('[data-test="inventory-item"]').first().locator('[data-test="inventory-item-name"]').textContent();
  }

  async getLastProductName() {
    return await this.page.locator('[data-test="inventory-item"]').last().locator('[data-test="inventory-item-name"]').textContent();
  }

  async verifyFirstProductName(productName: string) {
    await expect(this.page.locator('[data-test="inventory-item"]').first().locator('[data-test="inventory-item-name"]')).toContainText(productName);
  }

  async verifyLastProductName(productName: string) {
    await expect(this.page.locator('[data-test="inventory-item"]').last().locator('[data-test="inventory-item-name"]')).toContainText(productName);
  }

  async clickProductByDataTestId(productId: string) {
    await this.page.locator(`[data-test="${productId}"]`).click();
  }

  async openMenu() {
    await this.page.getByRole('button', { name: /open menu/i }).click();
  }

  async closeMenu() {
    await this.page.getByRole('button', { name: /close menu/i }).click();
  }

  async verifyMenuOpen() {
    await expect(this.page.getByRole('link', { name: /all items/i })).toBeVisible();
  }

  async verifyMenuClosed() {
    await expect(this.page.getByRole('link', { name: /all items/i })).not.toBeVisible();
  }

  async clickMenuLink(linkName: string) {
    await this.page.getByRole('link', { name: new RegExp(linkName, 'i') }).click();
  }
}
