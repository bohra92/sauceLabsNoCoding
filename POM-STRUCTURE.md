# Page Object Model (POM) Structure - Sauce Labs Test Suite

## Overview

This test suite implements a comprehensive **Page Object Model (POM)** architecture following Playwright best practices. The structure separates test logic from page interactions, test data from test code, and utilities for reusability.

## Directory Structure

```
e2e/
├── pages/                          # Page Object classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── utils/                          # Utility files & helpers
│   ├── PageManager.ts              # Centralized page object manager
│   ├── constants.ts                # Constants, URLs, selectors
│   └── helpers.ts                  # Helper functions and test data loader
├── testdata/                       # Test data in JSON format
│   ├── credentials.json            # User credentials for different accounts
│   ├── products.json               # Product information
│   ├── checkout.json               # Checkout form data and totals
│   └── urls.json                   # Application URLs
├── saucedemo.spec.ts              # Original non-POM test suite
└── saucedemo-pom.spec.ts          # Refactored POM test suite
```

## Components

### 1. Page Objects (`e2e/pages/`)

Each page object class represents a specific page/component in the application and encapsulates:
- Locators (selectors)
- Methods to interact with page elements
- Assertions for page-specific validations

#### LoginPage.ts
Handles login page interactions:
- `navigateToLoginPage()` - Navigate to login
- `enterUsername()` / `enterPassword()` - Fill login form
- `clickLoginButton()` - Submit login form
- `login()` - Complete login flow
- Verification methods for error messages and credentials info

#### InventoryPage.ts
Manages product inventory page:
- `verifyProductsDisplayed()` - Verify product count
- `clickAddToCartButton()` - Add product to cart
- `selectSortOption()` - Change product sorting
- `clickCartLink()` - Navigate to cart
- Menu operations (open, close, navigate)
- Cart badge management

#### ProductDetailPage.ts
Handles individual product detail pages:
- `verifyProductPrice()` - Verify product price
- `clickAddToCartButton()` - Add to cart from details
- `clickBackToProductsButton()` - Return to inventory
- Product information verification

#### CartPage.ts
Manages shopping cart page:
- `verifyCartPageURL()` - Verify cart page
- `getCartItemsCount()` - Get number of items in cart
- `clickRemoveButton()` - Remove item from cart
- `clickCheckoutButton()` - Proceed to checkout
- `clickContinueShoppingButton()` - Return to inventory

#### CheckoutPage.ts
Handles checkout flow (both steps):
- `fillCheckoutForm()` - Fill checkout information
- `clickContinueButton()` / `clickFinishButton()` - Navigate checkout steps
- `verifyPaymentInfo()` / `verifyShippingInfo()` - Verify order summary
- `verifyOrderConfirmationMessage()` - Verify success
- Error validation methods

### 2. Utilities (`e2e/utils/`)

#### PageManager.ts
Centralized manager for all page objects:
- Provides single access point to all page objects
- Manages page instance
- Helper methods for common login/navigation flows

```typescript
const pageManager = new PageManager(page);
const loginPage = pageManager.getLoginPage();
const inventoryPage = pageManager.getInventoryPage();
```

#### constants.ts
Application constants:
- `URLS` - All application URLs
- `SELECTORS` - CSS selectors and data-test attributes
- `SORT_OPTIONS` - Product sorting options
- `PRODUCT_DATA_TEST_IDS` - Product identifiers
- `PRODUCT_IDS` - Product numeric IDs
- `ERROR_MESSAGES` - Expected error messages

#### helpers.ts
Helper utilities and test data management:
- `TestDataHelper` - Load and retrieve test data from JSON files
- `CommonHelpers` - Common utility functions
- Screenshot functionality
- Page navigation helpers
- Product data test ID mapping

### 3. Test Data (`e2e/testdata/`)

All test data is externalized in JSON format for easy maintenance and updates:

#### credentials.json
User credentials for different test scenarios:
```json
{
  "validUser": { "username": "standard_user", "password": "secret_sauce" },
  "lockedOutUser": { "username": "locked_out_user", "password": "secret_sauce" },
  "problemUser": { "username": "problem_user", "password": "secret_sauce" },
  "performanceGlitchUser": { ... },
  "errorUser": { ... },
  "visualUser": { ... },
  "invalidCredentials": { ... }
}
```

#### products.json
Product information:
```json
{
  "backpack": {
    "name": "Sauce Labs Backpack",
    "price": "$29.99",
    "id": 4,
    "description": "..."
  },
  "bikeLight": { ... },
  "boltTShirt": { ... },
  ...
}
```

#### checkout.json
Checkout form data and order totals:
```json
{
  "validCheckoutInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "postalCode": "12345"
  },
  "cartTotals": {
    "singleItemTotal": { "itemTotal": "$29.99", "tax": "$2.40", "total": "$32.39" },
    "twoItemsTotal": { "itemTotal": "$39.98", "tax": "$3.20", "total": "$43.18" }
  },
  "paymentInfo": "SauceCard #31337",
  "shippingInfo": "Free Pony Express Delivery!"
}
```

#### urls.json
Application URLs:
```json
{
  "baseUrl": "https://www.saucedemo.com",
  "loginPage": "https://www.saucedemo.com/",
  "inventoryPage": "https://www.saucedemo.com/inventory.html",
  ...
}
```

## Usage Examples

### Basic Test Structure with POM

```typescript
test('Example Test', async ({ page }) => {
  // Create page manager instance
  const pageManager = new PageManager(page);
  
  // Get page objects
  const loginPage = pageManager.getLoginPage();
  const inventoryPage = pageManager.getInventoryPage();
  
  // Use helper to load test data
  const credentials = TestDataHelper.getCredentials('validUser');
  
  // Perform actions using page objects
  await loginPage.navigateToLoginPage();
  await loginPage.login(credentials.username, credentials.password);
  
  // Verify using page object methods
  await inventoryPage.verifyInventoryPageURL();
  await inventoryPage.verifyProductsDisplayed(6);
});
```

### Login Flow

```typescript
// Using default credential type
const pageManager = new PageManager(page);
await pageManager.login('validUser');

// Or with custom credentials
await pageManager.loginWithCredentials('username', 'password');
```

### Adding Items to Cart and Checkout

```typescript
const pageManager = new PageManager(page);
const inventoryPage = pageManager.getInventoryPage();
const cartPage = pageManager.getCartPage();
const checkoutPage = pageManager.getCheckoutPage();

// Add items
await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
await inventoryPage.clickAddToCartButton('sauce-labs-bike-light');

// Navigate to cart
await inventoryPage.clickCartLink();

// Proceed to checkout
await cartPage.clickCheckoutButton();

// Fill checkout form using test data
const checkoutData = TestDataHelper.getCheckoutData('validCheckoutInfo');
await checkoutPage.fillCheckoutForm(
  checkoutData.firstName,
  checkoutData.lastName,
  checkoutData.postalCode
);

// Complete purchase
await checkoutPage.clickContinueButton();
await checkoutPage.clickFinishButton();
```

## Benefits of This POM Structure

1. **Maintainability** - Locators and page logic are centralized
2. **Reusability** - Page objects can be used across multiple tests
3. **Scalability** - Easy to add new page objects or methods
4. **Readability** - Tests read like business scenarios
5. **Data Separation** - Test data is independent of test logic
6. **Consistency** - Uniform way to interact with pages
7. **Reduced Duplication** - Common actions are abstracted into methods
8. **Easy Debugging** - Failures point to specific page object methods

## Running Tests

Run the POM test suite:
```bash
npx playwright test e2e/saucedemo-pom.spec.ts
```

Run specific test suite:
```bash
npx playwright test e2e/saucedemo-pom.spec.ts -g "Authentication"
```

Run specific test:
```bash
npx playwright test e2e/saucedemo-pom.spec.ts -g "Valid Login"
```

## Adding New Tests

1. Create page object methods for any new page/interactions
2. Add test data to appropriate JSON file
3. Use PageManager to access page objects
4. Use TestDataHelper to load test data
5. Write test using page object methods

## Modifying Test Data

Simply update the JSON files in `e2e/testdata/`:
- No code changes needed
- All tests using that data automatically use new values
- Easy to add new test scenarios

## Future Enhancements

- Add API intercept mocking for performance tests
- Add custom fixtures for common test setup
- Add visual regression testing support
- Add accessibility testing methods to page objects
- Create additional page objects for modal dialogs, popups, etc.
