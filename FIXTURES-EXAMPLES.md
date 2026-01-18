# Fixtures Examples & Recipes

## Quick Start Examples

### Example 1: Simple Login Test
```typescript
import { test } from './fixtures';

test('user can login', async ({ pageManager }) => {
  const loginPage = pageManager.getLoginPage();
  const inventoryPage = pageManager.getInventoryPage();

  await loginPage.navigateToLoginPage();
  await pageManager.login('validUser');
  
  await inventoryPage.verifyInventoryPageURL();
});
```

### Example 2: Shopping Flow with Auto-login
```typescript
test.describe('Shopping', () => {
  test.beforeEach(async ({ loggedInPageManager }) => {
    // User auto-logged in
  });

  test('add item to cart', async ({ pageManager }) => {
    const inventoryPage = pageManager.getInventoryPage();
    const cartPage = pageManager.getCartPage();

    await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
    await inventoryPage.clickCartLink();
    
    await cartPage.verifyCartItemsCount(1);
  });
});
```

### Example 3: Direct Page Object Usage
```typescript
test('verify cart is empty', async ({ cartPage }) => {
  await cartPage.verifyEmptyCart();
});
```

## Common Test Patterns

### Pattern: Test Login with Multiple Credentials
```typescript
test.describe('Login Tests', () => {
  test('standard user login', async ({ pageManager }) => {
    await pageManager.login('validUser');
    await pageManager.getInventoryPage().verifyInventoryPageURL();
  });

  test('locked out user login fails', async ({ pageManager, page }) => {
    await pageManager.login('lockedOutUser');
    await expect(page.getByText(/locked out/i)).toBeVisible();
  });

  test('invalid credentials fail', async ({ pageManager }) => {
    await pageManager.login('invalidCredentials');
    await pageManager.getLoginPage().verifyLoginPageURL();
  });
});
```

### Pattern: Multi-page Workflow
```typescript
test('complete purchase flow', async ({ pageManager }) => {
  const inventoryPage = pageManager.getInventoryPage();
  const cartPage = pageManager.getCartPage();
  const checkoutPage = pageManager.getCheckoutPage();
  
  // User already logged in via loggedInPageManager
  await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
  await inventoryPage.clickCartLink();
  
  await cartPage.verifyCartItemsCount(1);
  await cartPage.clickCheckoutButton();
  
  await checkoutPage.verifyCheckoutStep1URL();
});
```

### Pattern: Using Test Data with Fixtures
```typescript
test('checkout with form data', async ({ pageManager }) => {
  const checkoutData = TestDataHelper.getCheckoutData('validCheckoutInfo');
  const checkoutPage = pageManager.getCheckoutPage();
  
  // Navigate to checkout
  await pageManager.getInventoryPage().clickAddToCartButton('product-id');
  await pageManager.getInventoryPage().clickCartLink();
  await pageManager.getCartPage().clickCheckoutButton();
  
  // Fill form with test data
  await checkoutPage.fillCheckoutForm(
    checkoutData.firstName,
    checkoutData.lastName,
    checkoutData.postalCode
  );
  
  await checkoutPage.clickContinueButton();
  await checkoutPage.verifyCheckoutStep2URL();
});
```

### Pattern: Grouped Tests with Common Setup
```typescript
test.describe('Inventory Page', () => {
  test.beforeEach(async ({ loggedInPageManager }) => {
    // All tests in this group have logged-in user
  });

  test('display all products', async ({ pageManager }) => {
    await pageManager.getInventoryPage().verifyProductsDisplayed(6);
  });

  test('sort products', async ({ pageManager }) => {
    const inventoryPage = pageManager.getInventoryPage();
    await inventoryPage.selectSortOption('za');
    await inventoryPage.verifyFirstProductName('Test.allTheThings()');
  });

  test('filter products by price', async ({ pageManager }) => {
    const inventoryPage = pageManager.getInventoryPage();
    await inventoryPage.selectSortOption('hilo');
    await inventoryPage.verifyFirstProductName('Fleece Jacket');
  });
});
```

### Pattern: Mixing Direct Page Objects with PageManager
```typescript
test('verify footer links', async ({ pageManager, page }) => {
  // Use pageManager for page navigation
  const inventoryPage = pageManager.getInventoryPage();
  await inventoryPage.verifyInventoryPageURL();
  
  // Use page for direct DOM queries
  await expect(page.getByRole('link', { name: /twitter/i })).toHaveAttribute(
    'href',
    'https://twitter.com/saucelabs'
  );
});
```

### Pattern: Error Handling
```typescript
test('show error for missing fields', async ({ pageManager }) => {
  const checkoutPage = pageManager.getCheckoutPage();
  
  // Try to continue without filling form
  await checkoutPage.clickContinueButton();
  
  // Verify error message
  await checkoutPage.verifyErrorMessage();
  await checkoutPage.verifyCheckoutStep1URL();
});
```

### Pattern: Conditional Navigation
```typescript
test('return to home from order confirmation', async ({ pageManager }) => {
  const inventoryPage = pageManager.getInventoryPage();
  const cartPage = pageManager.getCartPage();
  const checkoutPage = pageManager.getCheckoutPage();
  
  // Complete purchase
  await inventoryPage.clickAddToCartButton('product-id');
  await inventoryPage.clickCartLink();
  await cartPage.clickCheckoutButton();
  
  // Fill and submit checkout
  const data = TestDataHelper.getCheckoutData('validCheckoutInfo');
  await checkoutPage.fillCheckoutForm(data.firstName, data.lastName, data.postalCode);
  await checkoutPage.clickContinueButton();
  await checkoutPage.clickFinishButton();
  
  // Verify order confirmation and return home
  await checkoutPage.verifyCheckoutCompleteURL();
  await checkoutPage.clickBackHomeButton();
  
  await inventoryPage.verifyInventoryPageURL();
  await inventoryPage.verifyCartBadgeNotVisible(); // Cart reset after purchase
});
```

## Advanced Patterns

### Using Multiple Fixture Instances
```typescript
test('compare pages', async ({ inventoryPage, cartPage, loginPage }) => {
  // Use individual page fixtures directly
  await loginPage.verifyLoginPageURL();
  await cartPage.verifyEmptyCart();
  // These are isolated instances, not linked via PageManager
});
```

### Parameterized Tests
```typescript
const users = ['validUser', 'problemUser', 'visualUser'];

for (const user of users) {
  test(`${user} can login`, async ({ pageManager }) => {
    await pageManager.login(user);
    await pageManager.getInventoryPage().verifyInventoryPageURL();
  });
}
```

### Dynamic Test Data
```typescript
test('test all products', async ({ pageManager }) => {
  const products = TestDataHelper.getAllProducts();
  const inventoryPage = pageManager.getInventoryPage();
  
  for (const product of products) {
    await inventoryPage.verifyProductVisible(product.name);
  }
});
```

### State Verification
```typescript
test('cart state persists', async ({ pageManager }) => {
  const inventoryPage = pageManager.getInventoryPage();
  const cartPage = pageManager.getCartPage();
  
  // Add items
  await inventoryPage.clickAddToCartButton('product-1');
  await inventoryPage.clickAddToCartButton('product-2');
  
  // Navigate away and back
  await inventoryPage.clickCartLink();
  await cartPage.clickContinueShoppingButton();
  await inventoryPage.clickCartLink();
  
  // Verify state persisted
  await cartPage.verifyCartItemsCount(2);
});
```

## Performance Tips

### Efficient Test Organization
```typescript
test.describe('Fast Tests', () => {
  test.beforeEach(async ({ loggedInPageManager }) => {
    // Auto-login saves time
  });

  test('quick assertion', async ({ inventoryPage }) => {
    // Direct fixture usage = less setup
    await inventoryPage.verifyProductsDisplayed(6);
  });
});
```

### Reducing Redundant Logins
```typescript
// ❌ Bad: Login in every test
test('test 1', async ({ pageManager }) => {
  await pageManager.login('validUser');
  // test code
});

// ✅ Good: Use loggedInPageManager in beforeEach
test.describe('Tests', () => {
  test.beforeEach(async ({ loggedInPageManager }) => { });
  
  test('test 1', async ({ pageManager }) => {
    // Already logged in, no login needed
  });
});
```

## Debugging with Fixtures

### Debug Individual Test
```bash
npx playwright test e2e/saucedemo-pom-fixtures.spec.ts -g "add to cart" --debug
```

### Debug with Step Through
```typescript
test('debug test', async ({ pageManager }) => {
  const inventoryPage = pageManager.getInventoryPage();
  
  // Breakpoint set in VS Code will pause here
  await inventoryPage.verifyProductsDisplayed(6);
  
  await inventoryPage.clickAddToCartButton('product-id');
});

// Run with: npx playwright test --debug
```

### Console Logging
```typescript
test('test with logging', async ({ pageManager }) => {
  const inventoryPage = pageManager.getInventoryPage();
  
  console.log('Starting product verification');
  await inventoryPage.verifyProductsDisplayed(6);
  console.log('Verification complete');
  
  console.log('Adding product to cart');
  await inventoryPage.clickAddToCartButton('product-id');
  console.log('Product added');
});
```

## Common Mistakes & Solutions

### ❌ Mistake 1: Forgetting beforeEach for auto-login
```typescript
// Wrong - user not logged in
test('my test', async ({ pageManager }) => {
  await pageManager.getInventoryPage().clickAddToCartButton('product-id');
  // Fails because not logged in
});

// Right
test.describe('Tests', () => {
  test.beforeEach(async ({ loggedInPageManager }) => {});
  
  test('my test', async ({ pageManager }) => {
    await pageManager.getInventoryPage().clickAddToCartButton('product-id');
    // Works, user is logged in
  });
});
```

### ❌ Mistake 2: Using both pageManager and individual page fixtures
```typescript
// Confusing - mixing patterns
test('test', async ({ pageManager, inventoryPage }) => {
  // Which InventoryPage to use? pageManager.getInventoryPage() or inventoryPage param?
});

// Clear - use one pattern
test('test', async ({ pageManager }) => {
  const inventoryPage = pageManager.getInventoryPage();
  // All page objects via PageManager
});
```

### ❌ Mistake 3: Sharing state between tests
```typescript
let cart = [];

test('test 1', async ({ pageManager }) => {
  cart.push('item');
  // Bad: modifies external state
});

test('test 2', async ({ pageManager }) => {
  console.log(cart); // Might have item from test 1
  // Bad: depends on test 1
});

// Right: fixtures ensure test isolation
test('test 1', async ({ pageManager }) => {
  // Fresh PageManager instance
});

test('test 2', async ({ pageManager }) => {
  // Completely independent PageManager instance
});
```

## Migration from Old Pattern

### Before (Without Fixtures)
```typescript
import { test, expect } from '@playwright/test';
import { PageManager } from './utils/PageManager';

test('my test', async ({ page }) => {
  const pageManager = new PageManager(page);
  const loginPage = pageManager.getLoginPage();
  const inventoryPage = pageManager.getInventoryPage();
  
  await loginPage.navigateToLoginPage();
  await pageManager.login('validUser');
  await inventoryPage.verifyInventoryPageURL();
});
```

### After (With Fixtures)
```typescript
import { test } from './fixtures';

test('my test', async ({ pageManager }) => {
  const loginPage = pageManager.getLoginPage();
  const inventoryPage = pageManager.getInventoryPage();
  
  await loginPage.navigateToLoginPage();
  await pageManager.login('validUser');
  await inventoryPage.verifyInventoryPageURL();
});
```

## Summary

| Feature | Code | Example |
|---------|------|---------|
| Simple login | `pageManager` | `test('...', async ({ pageManager }) => { ... })` |
| Auto-login tests | `loggedInPageManager` + `pageManager` | `beforeEach(async ({ loggedInPageManager }) => {})` |
| Single page object | Direct fixture | `test('...', async ({ cartPage }) => { ... })` |
| Multiple queries | `page` fixture | `test('...', async ({ page }) => { ... })` |

Choose the right pattern for your test's needs!
