import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async verifyCheckoutStep1URL() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  }

  async verifyCheckoutStep2URL() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  }

  async verifyCheckoutCompleteURL() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  }

  async verifyCheckoutFormFields() {
    await expect(this.page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(this.page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(this.page.locator('[data-test="postalCode"]')).toBeVisible();
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async fillFirstName(firstName: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.locator('[data-test="lastName"]').fill(lastName);
  }

  async fillPostalCode(postalCode: string) {
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async clickContinueButton() {
    await this.page.getByRole('button', { name: /continue/i }).click();
  }

  async clickCancelButton() {
    await this.page.getByRole('button', { name: /cancel/i }).click();
  }

  async clickFinishButton() {
    await this.page.getByRole('button', { name: /finish/i }).click();
  }

  async verifyPaymentInfo(paymentInfo: string) {
    await expect(this.page.getByText(paymentInfo)).toBeVisible();
  }

  async verifyShippingInfo(shippingInfo: string) {
    await expect(this.page.getByText(shippingInfo)).toBeVisible();
  }

  async verifyItemTotal(itemTotal: string) {
    await expect(this.page.getByText(`Item total: ${itemTotal}`)).toBeVisible();
  }

  async verifyTax(tax: string) {
    await expect(this.page.getByText(`Tax: ${tax}`)).toBeVisible();
  }

  async verifyTotal(total: string) {
    await expect(this.page.getByText(`Total: ${total}`)).toBeVisible();
  }

  async verifyErrorMessage() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  }

  async verifyPaymentInformation() {
    await expect(this.page.getByText('Payment Information')).toBeVisible();
  }

  async verifyOrderConfirmationMessage() {
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }

  async verifyOrderDispatchMessage() {
    await expect(this.page.getByText(/Your order has been dispatched/i)).toBeVisible();
  }

  async clickBackHomeButton() {
    await this.page.getByRole('button', { name: /back home/i }).click();
  }

  async verifyCheckoutOverviewPage() {
    await expect(this.page.getByText('Payment Information')).toBeVisible();
    await expect(this.page.getByText('Shipping Information')).toBeVisible();
  }
}
