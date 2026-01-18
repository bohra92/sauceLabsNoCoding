import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigateToLoginPage(url: string = 'https://www.saucedemo.com/') {
    await this.page.goto(url);
  }

  async enterUsername(username: string) {
    await this.page.locator('[data-test="username"]').fill(username);
  }

  async enterPassword(password: string) {
    await this.page.locator('[data-test="password"]').fill(password);
  }

  async clickLoginButton() {
    await this.page.locator('[data-test="login-button"]').click();
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async getErrorMessage() {
    return await this.page.locator('[data-test="error"]').textContent();
  }

  async isErrorMessageVisible() {
    return await this.page.locator('[data-test="error"]').isVisible();
  }

  async isLockedOutMessageVisible() {
    return await this.page.getByText('Epic sadface: Sorry, this user has been locked out.').isVisible();
  }

  async verifyAcceptedUsernames() {
    await expect(this.page.getByText('Accepted usernames are:')).toBeVisible();
    await expect(this.page.getByText('standard_user')).toBeVisible();
    await expect(this.page.getByText('locked_out_user')).toBeVisible();
    await expect(this.page.getByText('problem_user')).toBeVisible();
    await expect(this.page.getByText('performance_glitch_user')).toBeVisible();
    await expect(this.page.getByText('error_user')).toBeVisible();
    await expect(this.page.getByText('visual_user')).toBeVisible();
  }

  async verifyPasswordInfo() {
    await expect(this.page.getByText('Password for all users:')).toBeVisible();
    await expect(this.page.getByText('secret_sauce')).toBeVisible();
  }

  async verifyLoginPageURL() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');
  }
}
