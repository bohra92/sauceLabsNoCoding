import { test, expect } from './fixtures';
import { TestDataHelper } from './utils/helpers';

test.describe('Sauce Labs E-commerce Application - POM with Fixtures', () => {
  // ================== AUTHENTICATION & USER ACCOUNTS ==================

  test.describe('Authentication & User Accounts', () => {
    test('1.1 Valid Login with Standard User', async ({ pageManager }) => {
      const loginPage = pageManager.getLoginPage();
      const inventoryPage = pageManager.getInventoryPage();

      await loginPage.navigateToLoginPage();
      await pageManager.login('validUser');

      await inventoryPage.verifyInventoryPageURL();
      await inventoryPage.verifyPageHeader();
      await inventoryPage.verifyProductsDisplayed(6);
    });

    test('1.2 Locked Out User Cannot Login', async ({ pageManager, page }) => {
      const loginPage = pageManager.getLoginPage();

      await loginPage.navigateToLoginPage();
      await pageManager.login('lockedOutUser');

      await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
      await loginPage.verifyLoginPageURL();
    });

    test('1.3 Invalid Credentials Show Error', async ({ pageManager }) => {
      const loginPage = pageManager.getLoginPage();

      await loginPage.navigateToLoginPage();
      await pageManager.login('invalidCredentials');

      await loginPage.verifyLoginPageURL();
    });

    test('1.4 Login Credentials Information Displayed', async ({ pageManager }) => {
      const loginPage = pageManager.getLoginPage();

      await loginPage.navigateToLoginPage();
      await loginPage.verifyAcceptedUsernames();
      await loginPage.verifyPasswordInfo();
    });
  });

  // ================== PRODUCT BROWSING & INVENTORY ==================

  test.describe('Product Browsing & Inventory', () => {
    test.beforeEach(async ({ loggedInPageManager }) => {
      // User is already logged in via loggedInPageManager fixture
    });

    test('2.1 View Products on Inventory Page', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await inventoryPage.verifyProductsDisplayed(6);
      await inventoryPage.verifyProductVisible('Sauce Labs Backpack');
      await inventoryPage.verifyProductPrice('$29.99');
      await inventoryPage.verifyProductVisible('Sauce Labs Bike Light');
      await inventoryPage.verifyProductPrice('$9.99');
      await inventoryPage.verifySortValue('az');
    });

    test('2.2 Sort Products by Name A to Z', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await inventoryPage.verifySortValue('az');
      await inventoryPage.verifyFirstProductName('Backpack');
      await inventoryPage.verifyLastProductName('Test.allTheThings()');
    });

    test('2.3 Sort Products by Name Z to A', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await inventoryPage.selectSortOption('za');
      await inventoryPage.verifyFirstProductName('Test.allTheThings()');
      await inventoryPage.verifyLastProductName('Backpack');
    });

    test('2.4 Sort Products by Price Low to High', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await inventoryPage.selectSortOption('lohi');
      await inventoryPage.verifyFirstProductName('Onesie');
      await inventoryPage.verifyLastProductName('Fleece Jacket');
    });

    test('2.5 Sort Products by Price High to Low', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await inventoryPage.selectSortOption('hilo');
      await inventoryPage.verifyFirstProductName('Fleece Jacket');
      await inventoryPage.verifyLastProductName('Onesie');
    });

    test('2.6 View Product Details', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const productDetailPage = pageManager.getProductDetailPage();

      await inventoryPage.clickProductByDataTestId('item-4-title-link');
      await productDetailPage.verifyProductDetailPageURL();
      await productDetailPage.verifyProductPrice('$29.99');
      await productDetailPage.verifyBackToProductsButtonVisible();
    });

    test('2.7 Navigate Back from Product Details', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const productDetailPage = pageManager.getProductDetailPage();

      await inventoryPage.clickProductByDataTestId('item-4-title-link');
      await productDetailPage.clickBackToProductsButton();

      await inventoryPage.verifyInventoryPageURL();
      await inventoryPage.verifyProductsDisplayed(6);
    });
  });

  // ================== SHOPPING CART ==================

  test.describe('Shopping Cart', () => {
    test.beforeEach(async ({ loggedInPageManager }) => {
      // User is already logged in via loggedInPageManager fixture
    });

    test('3.1 Add Single Product to Cart', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.verifyRemoveButtonVisible('sauce-labs-backpack');
      await inventoryPage.verifyCartBadgeCount('1');
    });

    test('3.2 Add Multiple Products to Cart', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickAddToCartButton('sauce-labs-bike-light');
      await inventoryPage.clickAddToCartButton('sauce-labs-bolt-t-shirt');

      await inventoryPage.verifyCartBadgeCount('3');
      await inventoryPage.verifyRemoveButtonVisible('sauce-labs-backpack');
      await inventoryPage.verifyRemoveButtonVisible('sauce-labs-bike-light');
    });

    test('3.3 Remove Product from Cart', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickAddToCartButton('sauce-labs-bike-light');
      await inventoryPage.clickRemoveButton('sauce-labs-backpack');

      await inventoryPage.verifyCartBadgeCount('1');
      await inventoryPage.verifyAddToCartButtonVisible('sauce-labs-backpack');
    });

    test('3.4 View Shopping Cart', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const cartPage = pageManager.getCartPage();

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickAddToCartButton('sauce-labs-bike-light');
      await inventoryPage.clickCartLink();

      await cartPage.verifyCartPageURL();
      await cartPage.verifyCartHeading();
      await cartPage.verifyCartItemsCount(2);
    });

    test('3.5 Remove Product from Cart Page', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const cartPage = pageManager.getCartPage();

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickAddToCartButton('sauce-labs-bike-light');
      await inventoryPage.clickCartLink();

      await cartPage.clickRemoveButton('sauce-labs-backpack');
      await cartPage.verifyCartItemsCount(1);
      await cartPage.verifyCartBadgeCount('1');
    });

    test('3.6 Continue Shopping from Cart', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const cartPage = pageManager.getCartPage();

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickCartLink();
      await cartPage.clickContinueShoppingButton();

      await inventoryPage.verifyInventoryPageURL();
      await inventoryPage.verifyProductsDisplayed(6);
    });

    test('3.7 Empty Cart Display', async ({ pageManager }) => {
      const cartPage = pageManager.getCartPage();

      await pageManager.navigateTo('https://www.saucedemo.com/cart.html');
      await cartPage.verifyEmptyCart();
    });
  });

  // ================== CHECKOUT PROCESS ==================

  test.describe('Checkout Process', () => {
    test.beforeEach(async ({ loggedInPageManager }) => {
      // User is already logged in via loggedInPageManager fixture
    });

    test('4.1 Proceed to Checkout Information Step', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const cartPage = pageManager.getCartPage();
      const checkoutPage = pageManager.getCheckoutPage();

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickCartLink();
      await cartPage.clickCheckoutButton();

      await checkoutPage.verifyCheckoutStep1URL();
      await checkoutPage.verifyCheckoutFormFields();
    });

    test('4.2 Complete Checkout Information Form', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const cartPage = pageManager.getCartPage();
      const checkoutPage = pageManager.getCheckoutPage();
      const checkoutData = TestDataHelper.getCheckoutData('validCheckoutInfo');

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickCartLink();
      await cartPage.clickCheckoutButton();

      await checkoutPage.fillCheckoutForm(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
      await checkoutPage.clickContinueButton();

      await checkoutPage.verifyCheckoutStep2URL();
    });

    test('4.3 Checkout Overview Page', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const cartPage = pageManager.getCartPage();
      const checkoutPage = pageManager.getCheckoutPage();
      const checkoutData = TestDataHelper.getCheckoutData('validCheckoutInfo');

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickAddToCartButton('sauce-labs-bike-light');
      await inventoryPage.clickCartLink();
      await cartPage.clickCheckoutButton();

      await checkoutPage.fillCheckoutForm(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
      await checkoutPage.clickContinueButton();

      await checkoutPage.verifyPaymentInformation();
      await checkoutPage.verifyPaymentInfo(TestDataHelper.getCheckoutData('paymentInfo'));
      await checkoutPage.verifyShippingInfo(TestDataHelper.getCheckoutData('shippingInfo'));
      await checkoutPage.verifyItemTotal('$39.98');
      await checkoutPage.verifyTax('$3.20');
      await checkoutPage.verifyTotal('$43.18');
    });

    test('4.4 Cancel at Checkout Information Step', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const cartPage = pageManager.getCartPage();
      const checkoutPage = pageManager.getCheckoutPage();

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickCartLink();
      await cartPage.clickCheckoutButton();
      await checkoutPage.clickCancelButton();

      await cartPage.verifyCartPageURL();
    });

    test('4.5 Cancel at Checkout Overview Step', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const cartPage = pageManager.getCartPage();
      const checkoutPage = pageManager.getCheckoutPage();
      const checkoutData = TestDataHelper.getCheckoutData('validCheckoutInfo');

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickCartLink();
      await cartPage.clickCheckoutButton();

      await checkoutPage.fillCheckoutForm(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
      await checkoutPage.clickContinueButton();
      await checkoutPage.clickCancelButton();

      await inventoryPage.verifyInventoryPageURL();
    });

    test('4.6 Complete Purchase', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const cartPage = pageManager.getCartPage();
      const checkoutPage = pageManager.getCheckoutPage();
      const checkoutData = TestDataHelper.getCheckoutData('validCheckoutInfo');

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickAddToCartButton('sauce-labs-bike-light');
      await inventoryPage.clickCartLink();
      await cartPage.clickCheckoutButton();

      await checkoutPage.fillCheckoutForm(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
      await checkoutPage.clickContinueButton();
      await checkoutPage.clickFinishButton();

      await checkoutPage.verifyCheckoutCompleteURL();
      await checkoutPage.verifyOrderConfirmationMessage();
      await checkoutPage.verifyOrderDispatchMessage();
    });

    test('4.7 Return to Inventory from Order Confirmation', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const cartPage = pageManager.getCartPage();
      const checkoutPage = pageManager.getCheckoutPage();
      const checkoutData = TestDataHelper.getCheckoutData('validCheckoutInfo');

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickCartLink();
      await cartPage.clickCheckoutButton();

      await checkoutPage.fillCheckoutForm(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
      await checkoutPage.clickContinueButton();
      await checkoutPage.clickFinishButton();
      await checkoutPage.clickBackHomeButton();

      await inventoryPage.verifyInventoryPageURL();
      await inventoryPage.verifyCartBadgeNotVisible();
    });

    test('4.8 Checkout with Empty Cart', async ({ pageManager }) => {
      const checkoutPage = pageManager.getCheckoutPage();

      await pageManager.navigateTo('https://www.saucedemo.com/checkout-step-one.html');
      await checkoutPage.verifyCheckoutFormFields();
    });
  });

  // ================== NAVIGATION & MENU ==================

  test.describe('Navigation & Menu', () => {
    test.beforeEach(async ({ loggedInPageManager }) => {
      // User is already logged in via loggedInPageManager fixture
    });

    test('5.1 Open and Close Navigation Menu', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await inventoryPage.openMenu();
      await inventoryPage.verifyMenuOpen();

      await inventoryPage.closeMenu();
      await inventoryPage.verifyMenuClosed();
    });

    test('5.2 Navigate to All Items from Menu', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await inventoryPage.openMenu();
      await inventoryPage.clickMenuLink('all items');

      await inventoryPage.verifyInventoryPageURL();
      await inventoryPage.verifyProductsDisplayed(6);
    });

    test('5.3 Logout from Menu', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const loginPage = pageManager.getLoginPage();

      await inventoryPage.openMenu();
      await inventoryPage.clickMenuLink('logout');

      await loginPage.verifyLoginPageURL();
    });

    test('5.4 Reset App State from Menu', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickAddToCartButton('sauce-labs-bike-light');
      await inventoryPage.verifyCartBadgeCount('2');

      await inventoryPage.openMenu();
      await inventoryPage.clickMenuLink('reset app state');

      await inventoryPage.verifyCartBadgeNotVisible();
      await inventoryPage.verifyAddToCartButtonVisible('sauce-labs-backpack');
      await inventoryPage.verifyAddToCartButtonVisible('sauce-labs-bike-light');
    });
  });

  // ================== FOOTER & LINKS ==================

  test.describe('Footer & Links', () => {
    test.beforeEach(async ({ loggedInPageManager }) => {
      // User is already logged in via loggedInPageManager fixture
    });

    test('6.1 Social Media Links in Footer', async ({ page }) => {
      await expect(page.getByRole('link', { name: /twitter/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /twitter/i })).toHaveAttribute('href', 'https://twitter.com/saucelabs');

      await expect(page.getByRole('link', { name: /facebook/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /facebook/i })).toHaveAttribute('href', 'https://www.facebook.com/saucelabs');

      await expect(page.getByRole('link', { name: /linkedin/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');

      await expect(page.getByText(/© 2026 Sauce Labs/)).toBeVisible();
    });
  });

  // ================== SPECIAL TEST USERS & EDGE CASES ==================

  test.describe('Special Test Users & Edge Cases', () => {
    test('7.1 Problem User Account', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await pageManager.login('problemUser');
      await inventoryPage.verifyInventoryPageURL();
      await inventoryPage.verifyPageHeader();
    });

    test('7.2 Performance Glitch User Account', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await pageManager.login('performanceGlitchUser');
      await inventoryPage.verifyInventoryPageURL();
      await inventoryPage.verifyPageHeader();
    });

    test('7.3 Error User Account', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await pageManager.login('errorUser');
      await inventoryPage.verifyInventoryPageURL();
      await inventoryPage.verifyPageHeader();
    });

    test('7.4 Visual User Account', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();

      await pageManager.login('visualUser');
      await inventoryPage.verifyInventoryPageURL();
      await inventoryPage.verifyPageHeader();
    });
  });

  // ================== ERROR HANDLING & VALIDATION ==================

  test.describe('Error Handling & Validation', () => {
    test.beforeEach(async ({ loggedInPageManager }) => {
      // User is already logged in via loggedInPageManager fixture
    });

    test('8.1 Missing Required Fields in Checkout', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const cartPage = pageManager.getCartPage();
      const checkoutPage = pageManager.getCheckoutPage();

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickCartLink();
      await cartPage.clickCheckoutButton();

      await checkoutPage.clickContinueButton();
      await checkoutPage.verifyErrorMessage();
      await checkoutPage.verifyCheckoutStep1URL();
    });

    test('8.2 Checkout with Partial Information', async ({ pageManager }) => {
      const inventoryPage = pageManager.getInventoryPage();
      const cartPage = pageManager.getCartPage();
      const checkoutPage = pageManager.getCheckoutPage();

      await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
      await inventoryPage.clickCartLink();
      await cartPage.clickCheckoutButton();

      await checkoutPage.fillFirstName('John');
      await checkoutPage.clickContinueButton();

      await checkoutPage.verifyErrorMessage();
      await checkoutPage.verifyCheckoutStep1URL();
    });
  });
});
