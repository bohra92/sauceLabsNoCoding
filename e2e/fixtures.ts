import { test as base, Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PageManager } from './utils/PageManager';
import { TestDataHelper } from './utils/helpers';

/**
 * Custom fixtures for Sauce Demo tests
 * 
 * Usage in tests:
 * test('my test', async ({ loginPage, inventoryPage, pageManager }) => {
 *   await loginPage.navigateToLoginPage();
 *   // ... test code
 * });
 */

type CustomFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  productDetailPage: ProductDetailPage;
  pageManager: PageManager;
  loggedInPageManager: PageManager;
};

export const test = base.extend<CustomFixtures>({
  /**
   * LoginPage fixture
   * Provides LoginPage instance initialized with the test's page context
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
    // Cleanup (if needed)
  },

  /**
   * InventoryPage fixture
   * Provides InventoryPage instance for product listing and browsing
   */
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  /**
   * CartPage fixture
   * Provides CartPage instance for cart operations
   */
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  /**
   * CheckoutPage fixture
   * Provides CheckoutPage instance for checkout flow
   */
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  /**
   * ProductDetailPage fixture
   * Provides ProductDetailPage instance for product detail interactions
   */
  productDetailPage: async ({ page }, use) => {
    const productDetailPage = new ProductDetailPage(page);
    await use(productDetailPage);
  },

  /**
   * PageManager fixture
   * Provides central access point to all page objects
   * 
   * Usage: async ({ pageManager }) => {
   *   await pageManager.navigateTo(url);
   *   const loginPage = pageManager.getLoginPage();
   * }
   */
  pageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    await use(pageManager);
  },

  /**
   * LoggedInPageManager fixture
   * Provides PageManager with user already logged in
   * Uses 'standard_user' by default
   * 
   * Usage: async ({ loggedInPageManager }) => {
   *   const inventoryPage = loggedInPageManager.getInventoryPage();
   *   // User is already logged in at this point
   * }
   */
  loggedInPageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    
    // Navigate to login and login as standard user
    await pageManager.navigateToLogin();
    await pageManager.login('validUser');
    
    // Verify user is logged in
    await pageManager.getInventoryPage().verifyInventoryPageURL();
    
    await use(pageManager);
  },
});

export { expect } from '@playwright/test';
