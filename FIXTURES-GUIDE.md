# Playwright Fixtures Guide

## Overview

Fixtures are reusable pieces of test infrastructure that set up the test environment before each test and clean up afterward. They reduce code duplication and make tests more readable and maintainable.

## Available Fixtures

### 1. `pageManager`
Provides access to all page objects and helper methods for navigation and login.

**Usage:**
```typescript
test('my test', async ({ pageManager }) => {
  const inventoryPage = pageManager.getInventoryPage();
  const cartPage = pageManager.getCartPage();
  
  await inventoryPage.clickAddToCartButton('product-id');
  await inventoryPage.clickCartLink();
  await cartPage.verifyCartPageURL();
});
```

**Methods:**
- `getLoginPage()` - Returns LoginPage instance
- `getInventoryPage()` - Returns InventoryPage instance
- `getCartPage()` - Returns CartPage instance
- `getCheckoutPage()` - Returns CheckoutPage instance
- `getProductDetailPage()` - Returns ProductDetailPage instance
- `login(userType)` - Login with test user type
- `navigateTo(url)` - Navigate to URL

### 2. `loggedInPageManager`
Provides a PageManager with user already logged in as 'standard_user'.

**Usage:**
```typescript
test('my test', async ({ loggedInPageManager }) => {
  // User is already logged in, no need to call login()
  const inventoryPage = loggedInPageManager.getInventoryPage();
  await inventoryPage.verifyInventoryPageURL();
  
  // Can still use all PageManager methods
  await loggedInPageManager.navigateTo(someUrl);
});
```

**Perfect for:**
- Tests that require logged-in state
- When you don't need to test login flow
- Reducing test setup code
- Tests in describe blocks with `test.beforeEach()`

### 3. `loginPage`
Direct access to LoginPage without creating PageManager.

**Usage:**
```typescript
test('login test', async ({ loginPage }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.enterUsername('standard_user');
  await loginPage.enterPassword('secret_sauce');
  await loginPage.clickLoginButton();
});
```

### 4. `inventoryPage`
Direct access to InventoryPage without creating PageManager.

**Usage:**
```typescript
test('inventory test', async ({ inventoryPage }) => {
  await inventoryPage.verifyProductsDisplayed(6);
});
```

### 5. `cartPage`
Direct access to CartPage without creating PageManager.

**Usage:**
```typescript
test('cart test', async ({ cartPage }) => {
  await cartPage.verifyCartPageURL();
  await cartPage.verifyEmptyCart();
});
```

### 6. `checkoutPage`
Direct access to CheckoutPage without creating PageManager.

**Usage:**
```typescript
test('checkout test', async ({ checkoutPage }) => {
  await checkoutPage.verifyCheckoutStep1URL();
  await checkoutPage.verifyCheckoutFormFields();
});
```

### 7. `productDetailPage`
Direct access to ProductDetailPage without creating PageManager.

**Usage:**
```typescript
test('product detail test', async ({ productDetailPage }) => {
  await productDetailPage.verifyProductDetailPageURL();
});
```

### 8. `page` (Built-in)
The raw Playwright page object for direct DOM interactions.

**Usage:**
```typescript
test('dom test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('button')).toBeVisible();
});
```

## Common Patterns

### Pattern 1: Using PageManager Directly
```typescript
test('add to cart', async ({ pageManager }) => {
  const inventoryPage = pageManager.getInventoryPage();
  const cartPage = pageManager.getCartPage();
  
  await inventoryPage.clickAddToCartButton('product-id');
  await inventoryPage.clickCartLink();
  await cartPage.verifyCartItemsCount(1);
});
```

### Pattern 2: Using LoggedInPageManager in beforeEach
```typescript
test.describe('Inventory Tests', () => {
  test.beforeEach(async ({ loggedInPageManager }) => {
    // User automatically logged in before each test
  });

  test('view products', async ({ pageManager }) => {
    const inventoryPage = pageManager.getInventoryPage();
    await inventoryPage.verifyProductsDisplayed(6);
  });

  test('add product', async ({ pageManager }) => {
    const inventoryPage = pageManager.getInventoryPage();
    await inventoryPage.clickAddToCartButton('product-id');
  });
});
```

### Pattern 3: Combined Fixtures
```typescript
test('footer test', async ({ pageManager, page }) => {
  const inventoryPage = pageManager.getInventoryPage();
  
  // Use pageManager for page objects
  await inventoryPage.verifyInventoryPageURL();
  
  // Use page for raw DOM queries when needed
  await expect(page.getByRole('link', { name: /twitter/i })).toBeVisible();
});
```

### Pattern 4: Direct Page Object Usage
```typescript
test('minimal test', async ({ cartPage }) => {
  await cartPage.verifyEmptyCart();
});
```

## Benefits of Fixtures

✅ **Reduces Boilerplate Code**
- No need to manually create PageManager instances
- Automatic page object initialization

✅ **Improved Test Readability**
- Tests focus on what they're testing
- Setup/teardown handled automatically

✅ **Better Maintainability**
- Fixtures defined in one place (fixtures.ts)
- Changes to fixture setup apply to all tests

✅ **Automatic Setup/Teardown**
- loggedInPageManager automatically logs in user
- Resources cleaned up after each test

✅ **Test Isolation**
- Fresh fixture instance for each test
- No state leakage between tests

## File Structure

```
e2e/
├── fixtures.ts                        ← Fixture definitions
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── ProductDetailPage.ts
├── utils/
│   ├── PageManager.ts
│   ├── constants.ts
│   └── helpers.ts
├── testdata/
│   ├── credentials.json
│   ├── products.json
│   ├── checkout.json
│   └── urls.json
├── saucedemo-pom.spec.ts              ← Without fixtures
└── saucedemo-pom-fixtures.spec.ts     ← With fixtures (recommended)
```

## Running Tests with Fixtures

```bash
# Run tests with fixtures
npx playwright test e2e/saucedemo-pom-fixtures.spec.ts

# Run with UI mode
npx playwright test e2e/saucedemo-pom-fixtures.spec.ts --ui

# Run specific test
npx playwright test e2e/saucedemo-pom-fixtures.spec.ts -g "View Products"

# Debug mode
npx playwright test e2e/saucedemo-pom-fixtures.spec.ts --debug
```

## Creating Custom Fixtures

To add a new fixture, extend the test object in `fixtures.ts`:

```typescript
type CustomFixtures = {
  newFixture: YourType;
};

export const test = base.extend<CustomFixtures>({
  newFixture: async ({ page }, use) => {
    // Setup code here
    const instance = new YourClass(page);
    
    // Provide instance to test
    await use(instance);
    
    // Cleanup code here (if needed)
  },
});
```

## Fixture vs Direct Instantiation

### Without Fixtures (Old Way)
```typescript
test('test', async ({ page }) => {
  const pageManager = new PageManager(page);
  const loginPage = pageManager.getLoginPage();
  // ... test code
});
```

### With Fixtures (New Way) ✅
```typescript
test('test', async ({ pageManager }) => {
  const loginPage = pageManager.getLoginPage();
  // ... test code
});
```

**Advantages of fixtures:**
- Less code to write
- Automatic injection
- Centralized management
- Easier to maintain

## Fixture Scope

All fixtures in this setup have **test scope**, meaning:
- Fresh instance created for each test
- Completely isolated between tests
- No cross-test contamination
- Resources cleaned up after each test

## Error Handling

Fixtures automatically handle resource cleanup even if tests fail:

```typescript
test('test with fixture', async ({ loggedInPageManager }) => {
  try {
    // Test code
  } catch (error) {
    // Fixture cleanup still happens
    throw error;
  }
});
```

## Best Practices

✅ **DO:**
- Use `loggedInPageManager` for tests that need logged-in state
- Use `pageManager` when you need access to multiple page objects
- Use individual page fixtures for simple, isolated tests
- Keep fixtures in `e2e/fixtures.ts`

❌ **DON'T:**
- Instantiate PageManager manually when fixture is available
- Share state between tests via global variables
- Modify fixture definitions in test files
- Use fixtures for unrelated concerns

## Migration Guide

To migrate from old pattern to fixtures:

1. **Update imports:**
   ```typescript
   // Old
   import { test, expect } from '@playwright/test';
   import { PageManager } from './utils/PageManager';
   
   // New
   import { test, expect } from './fixtures';
   ```

2. **Remove PageManager instantiation:**
   ```typescript
   // Old
   test('test', async ({ page }) => {
     const pageManager = new PageManager(page);
   
   // New
   test('test', async ({ pageManager }) => {
     // pageManager already provided
   ```

3. **Use loggedInPageManager in beforeEach:**
   ```typescript
   // Old
   test.beforeEach(async ({ page }) => {
     const pageManager = new PageManager(page);
     await pageManager.login('validUser');
   });
   
   // New
   test.beforeEach(async ({ loggedInPageManager }) => {
     // Automatic login
   });
   ```

## Summary

| Feature | Without Fixtures | With Fixtures |
|---------|-----------------|---------------|
| PageManager creation | Manual | Automatic |
| Code lines per test | More | Less |
| Setup consistency | Manual | Automatic |
| Maintenance | Harder | Easier |
| Readability | Lower | Higher |
| Test isolation | Possible | Guaranteed |

**Recommendation:** Use `saucedemo-pom-fixtures.spec.ts` as the primary test file. It's cleaner, more maintainable, and follows Playwright best practices.
