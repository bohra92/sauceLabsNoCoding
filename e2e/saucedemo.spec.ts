// spec: specs/saucedemo-test-plan.md

import { test, expect } from '@playwright/test';

test.describe('Sauce Labs E-commerce Application', () => {
  // ================== AUTHENTICATION & USER ACCOUNTS ==================

  test.describe('Authentication & User Accounts', () => {
    test('1.1 Valid Login with Standard User', async ({ page }) => {
      // 1. Navigate to https://www.saucedemo.com/
      await page.goto('https://www.saucedemo.com/');

      // 2. Enter 'standard_user' in the Username field
      await page.locator('[data-test="username"]').fill('standard_user');

      // 3. Enter 'secret_sauce' in the Password field
      await page.locator('[data-test="password"]').fill('secret_sauce');

      // 4. Click the Login button
      await page.locator('[data-test="login-button"]').click();

      // 5. Wait for the inventory page to load
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

      // Verify expected results
      await expect(page.getByText('Swag Labs')).toBeVisible();
      await expect(page.getByText('Products')).toBeVisible();
      await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    });

    test('1.2 Locked Out User Cannot Login', async ({ page }) => {
      // 1. Navigate to https://www.saucedemo.com/
      await page.goto('https://www.saucedemo.com/');

      // 2. Enter 'locked_out_user' in the Username field
      await page.locator('[data-test="username"]').fill('locked_out_user');

      // 3. Enter 'secret_sauce' in the Password field
      await page.locator('[data-test="password"]').fill('secret_sauce');

      // 4. Click the Login button
      await page.locator('[data-test="login-button"]').click();

      // 5. Observe the error message
      await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
      
      // Verify expected results
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('1.3 Invalid Credentials Show Error', async ({ page }) => {
      // 1. Navigate to https://www.saucedemo.com/
      await page.goto('https://www.saucedemo.com/');

      // 2. Enter 'standard_user' in the Username field
      await page.locator('[data-test="username"]').fill('standard_user');

      // 3. Enter 'wrong_password' in the Password field
      await page.locator('[data-test="password"]').fill('wrong_password');

      // 4. Click the Login button
      await page.locator('[data-test="login-button"]').click();

      // 5. Observe the error message
      await expect(page.locator('[data-test="error"]')).toBeVisible();
      
      // Verify user remains on login page
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('1.4 Login Credentials Information Displayed', async ({ page }) => {
      // 1. Navigate to https://www.saucedemo.com/
      await page.goto('https://www.saucedemo.com/');

      // 2. View the left side information panel
      await expect(page.getByText('Accepted usernames are:')).toBeVisible();
      await expect(page.getByText('standard_user')).toBeVisible();
      await expect(page.getByText('locked_out_user')).toBeVisible();
      await expect(page.getByText('problem_user')).toBeVisible();
      await expect(page.getByText('performance_glitch_user')).toBeVisible();
      await expect(page.getByText('error_user')).toBeVisible();
      await expect(page.getByText('visual_user')).toBeVisible();
      await expect(page.getByText('Password for all users:')).toBeVisible();
      await expect(page.getByText('secret_sauce')).toBeVisible();
    });
  });

  // ================== PRODUCT BROWSING & INVENTORY ==================

  test.describe('Product Browsing & Inventory', () => {
    test.beforeEach(async ({ page }) => {
      // Login before each test
      await page.goto('https://www.saucedemo.com/');
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('2.1 View Products on Inventory Page', async ({ page }) => {
      // Verify six products are displayed in a grid layout
      const products = page.locator('[data-test="inventory-item"]');
      await expect(products).toHaveCount(6);

      // Verify product names and prices
      await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
      await expect(page.getByText('$29.99')).toBeVisible();
      await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
      await expect(page.getByText('$9.99')).toBeVisible();
      await expect(page.getByText('Sauce Labs Bolt T-Shirt')).toBeVisible();
      await expect(page.getByText('$15.99')).toBeVisible();
      await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
      await expect(page.getByText('$49.99')).toBeVisible();
      await expect(page.getByText('Sauce Labs Onesie')).toBeVisible();
      await expect(page.getByText('$7.99')).toBeVisible();
      
      // Verify sort dropdown with default selection
      await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
      const sortDropdown = page.locator('[data-test="product-sort-container"] select');
      await expect(sortDropdown).toHaveValue('az');
    });

    test('2.2 Sort Products by Name A to Z', async ({ page }) => {
      // Verify sort dropdown shows 'Name (A to Z)' as selected
      const sortDropdown = page.locator('[data-test="product-sort-container"] select');
      await expect(sortDropdown).toHaveValue('az');

      // Verify product order - first should be Backpack, last should be Test.allTheThings()
      const firstProduct = page.locator('[data-test="inventory-item"]').first();
      await expect(firstProduct.locator('[data-test="inventory-item-name"]')).toContainText('Backpack');

      const lastProduct = page.locator('[data-test="inventory-item"]').last();
      await expect(lastProduct.locator('[data-test="inventory-item-name"]')).toContainText('Test.allTheThings()');
    });

    test('2.3 Sort Products by Name Z to A', async ({ page }) => {
      // Click the sort dropdown and select Name Z to A
      await page.locator('[data-test="product-sort-container"] select').selectOption('za');

      // Verify product order - first should be Test.allTheThings(), last should be Backpack
      const firstProduct = page.locator('[data-test="inventory-item"]').first();
      await expect(firstProduct.locator('[data-test="inventory-item-name"]')).toContainText('Test.allTheThings()');

      const lastProduct = page.locator('[data-test="inventory-item"]').last();
      await expect(lastProduct.locator('[data-test="inventory-item-name"]')).toContainText('Backpack');
    });

    test('2.4 Sort Products by Price Low to High', async ({ page }) => {
      // Click the sort dropdown and select Price low to high
      await page.locator('[data-test="product-sort-container"] select').selectOption('lohi');

      // Verify product order - first should be Onesie ($7.99), last should be Fleece Jacket ($49.99)
      const firstProduct = page.locator('[data-test="inventory-item"]').first();
      await expect(firstProduct.locator('[data-test="inventory-item-name"]')).toContainText('Onesie');

      const lastProduct = page.locator('[data-test="inventory-item"]').last();
      await expect(lastProduct.locator('[data-test="inventory-item-name"]')).toContainText('Fleece Jacket');
    });

    test('2.5 Sort Products by Price High to Low', async ({ page }) => {
      // Click the sort dropdown and select Price high to low
      await page.locator('[data-test="product-sort-container"] select').selectOption('hilo');

      // Verify product order - first should be Fleece Jacket ($49.99), last should be Onesie ($7.99)
      const firstProduct = page.locator('[data-test="inventory-item"]').first();
      await expect(firstProduct.locator('[data-test="inventory-item-name"]')).toContainText('Fleece Jacket');

      const lastProduct = page.locator('[data-test="inventory-item"]').last();
      await expect(lastProduct.locator('[data-test="inventory-item-name"]')).toContainText('Onesie');
    });

    test('2.6 View Product Details', async ({ page }) => {
      // Click on 'Sauce Labs Backpack' product name
      await page.locator('[data-test="item-4-title-link"]').click();

      // Verify page navigates to inventory-item.html
      await expect(page).toHaveURL(/inventory-item\.html\?id=4/);

      // Verify product details are displayed
      await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');
      await expect(page.getByRole('button', { name: /add to cart/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /back to products/i })).toBeVisible();
    });

    test('2.7 Navigate Back from Product Details', async ({ page }) => {
      // Click on a product to view details
      await page.locator('[data-test="item-4-title-link"]').click();
      await expect(page).toHaveURL(/inventory-item\.html/);

      // Click 'Back to products' button
      await page.getByRole('button', { name: /back to products/i }).click();

      // Verify page returns to inventory page
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    });
  });

  // ================== SHOPPING CART ==================

  test.describe('Shopping Cart', () => {
    test.beforeEach(async ({ page }) => {
      // Login before each test
      await page.goto('https://www.saucedemo.com/');
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('3.1 Add Single Product to Cart', async ({ page }) => {
      // Click 'Add to cart' button for 'Sauce Labs Backpack'
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

      // Verify button changes to 'Remove'
      await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

      // Verify cart badge appears with count '1'
      await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
    });

    test('3.2 Add Multiple Products to Cart', async ({ page }) => {
      // Add three products to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

      // Verify cart badge shows '3' items
      await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('3');

      // Verify all three products show 'Remove' button
      await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
      await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
      await expect(page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]')).toBeVisible();
    });

    test('3.3 Remove Product from Cart', async ({ page }) => {
      // Add 2 products to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      
      // Click 'Remove' button for one product
      await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

      // Verify cart badge decrements to '1'
      await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');

      // Verify removed product's button changes back to 'Add to cart'
      await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    });

    test('3.4 View Shopping Cart', async ({ page }) => {
      // Add products to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

      // Click on the cart badge
      await page.locator('[data-test="shopping-cart-link"]').click();

      // Verify page navigates to cart.html
      await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

      // Verify cart heading and items are displayed
      await expect(page.getByText('Your Cart')).toBeVisible();
      const cartItems = page.locator('[data-test="cart-item"]');
      await expect(cartItems).toHaveCount(2);
    });

    test('3.5 Remove Product from Cart Page', async ({ page }) => {
      // Add 2 products to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

      // View cart
      await page.locator('[data-test="shopping-cart-link"]').click();

      // Click 'Remove' button for one product
      await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

      // Verify cart displays only remaining product
      const cartItems = page.locator('[data-test="cart-item"]');
      await expect(cartItems).toHaveCount(1);

      // Verify cart badge updates to '1'
      await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
    });

    test('3.6 Continue Shopping from Cart', async ({ page }) => {
      // Add items to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

      // View cart
      await page.locator('[data-test="shopping-cart-link"]').click();

      // Click 'Continue Shopping' button
      await page.getByRole('button', { name: /continue shopping/i }).click();

      // Verify page returns to inventory
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    });

    test('3.7 Empty Cart Display', async ({ page }) => {
      // Navigate directly to cart.html without adding items
      await page.goto('https://www.saucedemo.com/cart.html');

      // Verify cart displays empty state
      await expect(page.getByText('Your Cart')).toBeVisible();
      const cartItems = page.locator('[data-test="cart-item"]');
      await expect(cartItems).toHaveCount(0);
    });
  });

  // ================== CHECKOUT PROCESS ==================

  test.describe('Checkout Process', () => {
    test.beforeEach(async ({ page }) => {
      // Login and add item to cart before each test
      await page.goto('https://www.saucedemo.com/');
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('4.1 Proceed to Checkout Information Step', async ({ page }) => {
      // Add item to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

      // View cart
      await page.locator('[data-test="shopping-cart-link"]').click();

      // Click 'Checkout' button
      await page.getByRole('button', { name: /checkout/i }).click();

      // Verify page navigates to checkout-step-one.html
      await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

      // Verify form fields are visible
      await expect(page.locator('[data-test="firstName"]')).toBeVisible();
      await expect(page.locator('[data-test="lastName"]')).toBeVisible();
      await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
      await expect(page.getByRole('button', { name: /continue/i })).toBeVisible();
    });

    test('4.2 Complete Checkout Information Form', async ({ page }) => {
      // Add item to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

      // View cart
      await page.locator('[data-test="shopping-cart-link"]').click();

      // Click 'Checkout' button
      await page.getByRole('button', { name: /checkout/i }).click();

      // Fill in form
      await page.locator('[data-test="firstName"]').fill('John');
      await page.locator('[data-test="lastName"]').fill('Doe');
      await page.locator('[data-test="postalCode"]').fill('12345');

      // Click 'Continue' button
      await page.getByRole('button', { name: /continue/i }).click();

      // Verify page navigates to checkout-step-two.html
      await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    });

    test('4.3 Checkout Overview Page', async ({ page }) => {
      // Add items to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

      // View cart
      await page.locator('[data-test="shopping-cart-link"]').click();

      // Click 'Checkout' button
      await page.getByRole('button', { name: /checkout/i }).click();

      // Fill in form
      await page.locator('[data-test="firstName"]').fill('John');
      await page.locator('[data-test="lastName"]').fill('Doe');
      await page.locator('[data-test="postalCode"]').fill('12345');

      // Click 'Continue'
      await page.getByRole('button', { name: /continue/i }).click();

      // Verify overview page displays correct information
      await expect(page.getByText('Payment Information')).toBeVisible();
      await expect(page.getByText('SauceCard #31337')).toBeVisible();
      await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
      await expect(page.getByText('Item total: $39.98')).toBeVisible();
      await expect(page.getByText('Tax: $3.20')).toBeVisible();
      await expect(page.getByText('Total: $43.18')).toBeVisible();
    });

    test('4.4 Cancel at Checkout Information Step', async ({ page }) => {
      // Add items to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

      // View cart
      await page.locator('[data-test="shopping-cart-link"]').click();

      // Click 'Checkout' button
      await page.getByRole('button', { name: /checkout/i }).click();

      // Click 'Cancel' button
      await page.getByRole('button', { name: /cancel/i }).click();

      // Verify page returns to cart
      await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });

    test('4.5 Cancel at Checkout Overview Step', async ({ page }) => {
      // Add items to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

      // View cart
      await page.locator('[data-test="shopping-cart-link"]').click();

      // Click 'Checkout' button
      await page.getByRole('button', { name: /checkout/i }).click();

      // Fill in form
      await page.locator('[data-test="firstName"]').fill('John');
      await page.locator('[data-test="lastName"]').fill('Doe');
      await page.locator('[data-test="postalCode"]').fill('12345');

      // Click 'Continue'
      await page.getByRole('button', { name: /continue/i }).click();

      // Click 'Cancel' on overview page
      await page.getByRole('button', { name: /cancel/i }).click();

      // Verify page returns to inventory
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('4.6 Complete Purchase', async ({ page }) => {
      // Add items to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

      // View cart
      await page.locator('[data-test="shopping-cart-link"]').click();

      // Click 'Checkout' button
      await page.getByRole('button', { name: /checkout/i }).click();

      // Fill in form
      await page.locator('[data-test="firstName"]').fill('John');
      await page.locator('[data-test="lastName"]').fill('Doe');
      await page.locator('[data-test="postalCode"]').fill('12345');

      // Click 'Continue'
      await page.getByRole('button', { name: /continue/i }).click();

      // Click 'Finish' button
      await page.getByRole('button', { name: /finish/i }).click();

      // Verify page navigates to checkout-complete.html
      await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

      // Verify confirmation message
      await expect(page.getByText('Thank you for your order!')).toBeVisible();
      await expect(page.getByText(/Your order has been dispatched/i)).toBeVisible();
    });

    test('4.7 Return to Inventory from Order Confirmation', async ({ page }) => {
      // Add items to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

      // View cart
      await page.locator('[data-test="shopping-cart-link"]').click();

      // Click 'Checkout' button
      await page.getByRole('button', { name: /checkout/i }).click();

      // Fill in form
      await page.locator('[data-test="firstName"]').fill('John');
      await page.locator('[data-test="lastName"]').fill('Doe');
      await page.locator('[data-test="postalCode"]').fill('12345');

      // Click 'Continue'
      await page.getByRole('button', { name: /continue/i }).click();

      // Click 'Finish' button
      await page.getByRole('button', { name: /finish/i }).click();

      // Click 'Back Home' button
      await page.getByRole('button', { name: /back home/i }).click();

      // Verify page returns to inventory
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
    });

    test('4.8 Checkout with Empty Cart', async ({ page }) => {
      // Navigate directly to checkout-step-one.html
      await page.goto('https://www.saucedemo.com/checkout-step-one.html');

      // Verify checkout page is accessible
      await expect(page.locator('[data-test="firstName"]')).toBeVisible();
      await expect(page.locator('[data-test="lastName"]')).toBeVisible();
      await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
    });
  });

  // ================== NAVIGATION & MENU ==================

  test.describe('Navigation & Menu', () => {
    test.beforeEach(async ({ page }) => {
      // Login before each test
      await page.goto('https://www.saucedemo.com/');
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('5.1 Open and Close Navigation Menu', async ({ page }) => {
      // Click 'Open Menu' button
      await page.getByRole('button', { name: /open menu/i }).click();

      // Verify menu is opened with navigation links
      await expect(page.getByRole('link', { name: /all items/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /logout/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /reset app state/i })).toBeVisible();

      // Click 'Close Menu' button
      await page.getByRole('button', { name: /close menu/i }).click();

      // Verify menu is closed
      await expect(page.getByRole('link', { name: /all items/i })).not.toBeVisible();
    });

    test('5.2 Navigate to All Items from Menu', async ({ page }) => {
      // Click 'Open Menu'
      await page.getByRole('button', { name: /open menu/i }).click();

      // Click 'All Items' link
      await page.getByRole('link', { name: /all items/i }).click();

      // Verify page stays on inventory
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    });

    test('5.3 Logout from Menu', async ({ page }) => {
      // Click 'Open Menu'
      await page.getByRole('button', { name: /open menu/i }).click();

      // Click 'Logout' link
      await page.getByRole('link', { name: /logout/i }).click();

      // Verify page navigates to login page
      await expect(page).toHaveURL('https://www.saucedemo.com/');
      await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    });

    test('5.4 Reset App State from Menu', async ({ page }) => {
      // Add items to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

      // Verify cart badge shows items
      await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');

      // Click 'Open Menu'
      await page.getByRole('button', { name: /open menu/i }).click();

      // Click 'Reset App State'
      await page.getByRole('link', { name: /reset app state/i }).click();

      // Verify cart is cleared
      await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();

      // Verify all 'Remove' buttons changed back to 'Add to cart'
      await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
      await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();
    });
  });

  // ================== FOOTER & LINKS ==================

  test.describe('Footer & Links', () => {
    test.beforeEach(async ({ page }) => {
      // Login before each test
      await page.goto('https://www.saucedemo.com/');
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('6.1 Social Media Links in Footer', async ({ page }) => {
      // Verify footer social links and copyright notice
      await expect(page.getByRole('link', { name: /twitter/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /facebook/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /linkedin/i })).toBeVisible();
      
      // Verify links have correct URLs
      const twitterLink = page.getByRole('link', { name: /twitter/i });
      await expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/saucelabs');

      const facebookLink = page.getByRole('link', { name: /facebook/i });
      await expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/saucelabs');

      const linkedinLink = page.getByRole('link', { name: /linkedin/i });
      await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');

      // Verify copyright notice
      await expect(page.getByText(/© 2026 Sauce Labs/)).toBeVisible();
    });
  });

  // ================== SPECIAL TEST USERS & EDGE CASES ==================

  test.describe('Special Test Users & Edge Cases', () => {
    test('7.1 Problem User Account', async ({ page }) => {
      // Navigate to login page
      await page.goto('https://www.saucedemo.com/');

      // Enter 'problem_user' credentials
      await page.locator('[data-test="username"]').fill('problem_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');

      // Click Login
      await page.locator('[data-test="login-button"]').click();

      // Verify user successfully logs in
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect(page.getByText('Products')).toBeVisible();
    });

    test('7.2 Performance Glitch User Account', async ({ page }) => {
      // Navigate to login page
      await page.goto('https://www.saucedemo.com/');

      // Enter 'performance_glitch_user' credentials
      await page.locator('[data-test="username"]').fill('performance_glitch_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');

      // Click Login
      await page.locator('[data-test="login-button"]').click();

      // Verify user successfully logs in
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect(page.getByText('Products')).toBeVisible();
    });

    test('7.3 Error User Account', async ({ page }) => {
      // Navigate to login page
      await page.goto('https://www.saucedemo.com/');

      // Enter 'error_user' credentials
      await page.locator('[data-test="username"]').fill('error_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');

      // Click Login
      await page.locator('[data-test="login-button"]').click();

      // Verify user successfully logs in
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect(page.getByText('Products')).toBeVisible();
    });

    test('7.4 Visual User Account', async ({ page }) => {
      // Navigate to login page
      await page.goto('https://www.saucedemo.com/');

      // Enter 'visual_user' credentials
      await page.locator('[data-test="username"]').fill('visual_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');

      // Click Login
      await page.locator('[data-test="login-button"]').click();

      // Verify user successfully logs in
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect(page.getByText('Products')).toBeVisible();
    });
  });

  // ================== ERROR HANDLING & VALIDATION ==================

  test.describe('Error Handling & Validation', () => {
    test.beforeEach(async ({ page }) => {
      // Login before each test
      await page.goto('https://www.saucedemo.com/');
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('8.1 Missing Required Fields in Checkout', async ({ page }) => {
      // Add item to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

      // View cart
      await page.locator('[data-test="shopping-cart-link"]').click();

      // Click 'Checkout' button
      await page.getByRole('button', { name: /checkout/i }).click();

      // Leave all fields empty and click 'Continue'
      await page.getByRole('button', { name: /continue/i }).click();

      // Verify validation error is displayed
      await expect(page.locator('[data-test="error"]')).toBeVisible();
      
      // Verify user remains on checkout step 1
      await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

    test('8.2 Checkout with Partial Information', async ({ page }) => {
      // Add item to cart
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

      // View cart
      await page.locator('[data-test="shopping-cart-link"]').click();

      // Click 'Checkout' button
      await page.getByRole('button', { name: /checkout/i }).click();

      // Enter only First Name
      await page.locator('[data-test="firstName"]').fill('John');

      // Leave Last Name and Zip Code empty and click 'Continue'
      await page.getByRole('button', { name: /continue/i }).click();

      // Verify validation error is displayed
      await expect(page.locator('[data-test="error"]')).toBeVisible();
      
      // Verify user remains on checkout step 1
      await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });
  });
});
