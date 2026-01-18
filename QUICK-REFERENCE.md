# Quick Reference Guide - POM Test Suite

## File Structure Overview

```
e2e/
├── pages/
│   ├── LoginPage.ts              ← Login interactions
│   ├── InventoryPage.ts          ← Product browsing & cart
│   ├── ProductDetailPage.ts      ← Product details
│   ├── CartPage.ts               ← Shopping cart
│   └── CheckoutPage.ts           ← Checkout flow
├── utils/
│   ├── PageManager.ts            ← Central access point
│   ├── constants.ts              ← Constants & selectors
│   └── helpers.ts                ← Test data & helpers
├── testdata/
│   ├── credentials.json          ← User logins
│   ├── products.json             ← Product data
│   ├── checkout.json             ← Checkout data
│   └── urls.json                 ← Application URLs
├── saucedemo.spec.ts             ← Original tests
└── saucedemo-pom.spec.ts         ← POM tests
```

## Common Test Patterns

### Pattern 1: Basic Login and Verify
```typescript
test('Test Name', async ({ page }) => {
  const pageManager = new PageManager(page);
  
  // Login
  await pageManager.login('validUser');
  
  // Verify
  await pageManager.getInventoryPage().verifyInventoryPageURL();
});
```

### Pattern 2: Using Test Data
```typescript
const credentials = TestDataHelper.getCredentials('validUser');
const product = TestDataHelper.getProduct('backpack');
const checkoutData = TestDataHelper.getCheckoutData('validCheckoutInfo');

// Use in tests
await loginPage.login(credentials.username, credentials.password);
await inventoryPage.verifyProductVisible(product.name);
```

### Pattern 3: Page Navigation Flow
```typescript
// Get page objects
const inventoryPage = pageManager.getInventoryPage();
const cartPage = pageManager.getCartPage();
const checkoutPage = pageManager.getCheckoutPage();

// Follow user flow
await inventoryPage.clickAddToCartButton('sauce-labs-backpack');
await inventoryPage.clickCartLink();
await cartPage.clickCheckoutButton();
```

### Pattern 4: Assertion Methods
```typescript
// Verify URLs
await inventoryPage.verifyInventoryPageURL();

// Verify content
await inventoryPage.verifyProductVisible('Product Name');
await inventoryPage.verifyProductPrice('$29.99');

// Verify counts
await inventoryPage.verifyProductsDisplayed(6);
await cartPage.verifyCartItemsCount(2);
```

## PageManager Methods

```typescript
const pageManager = new PageManager(page);

// Get page objects
pageManager.getLoginPage()           // LoginPage instance
pageManager.getInventoryPage()       // InventoryPage instance
pageManager.getCartPage()            // CartPage instance
pageManager.getCheckoutPage()        // CheckoutPage instance
pageManager.getProductDetailPage()   // ProductDetailPage instance

// Helper methods
pageManager.login('userType')        // Login with test data
pageManager.loginWithCredentials()   // Login with custom credentials
pageManager.navigateTo(url)          // Navigate to URL
```

## TestDataHelper Methods

```typescript
// Get specific credential set
TestDataHelper.getCredentials('validUser')
TestDataHelper.getCredentials('lockedOutUser')
TestDataHelper.getCredentials('invalidCredentials')

// Get product information
TestDataHelper.getProduct('backpack')
TestDataHelper.getProduct('bikeLight')

// Get checkout data
TestDataHelper.getCheckoutData('validCheckoutInfo')
TestDataHelper.getCheckoutData('cartTotals')

// Get all data
TestDataHelper.getAllCredentials()
TestDataHelper.getAllProducts()
```

## Available Test Users (credentials.json)

| User Type | Username | Password | Purpose |
|-----------|----------|----------|---------|
| validUser | standard_user | secret_sauce | Normal user |
| lockedOutUser | locked_out_user | secret_sauce | Locked account |
| problemUser | problem_user | secret_sauce | Visual issues |
| performanceGlitchUser | performance_glitch_user | secret_sauce | Performance test |
| errorUser | error_user | secret_sauce | Error handling |
| visualUser | visual_user | secret_sauce | Visual regression |
| invalidCredentials | standard_user | wrong_password | Invalid login |

## Available Products (products.json)

```
backpack          - $29.99
bikeLight         - $9.99
boltTShirt        - $15.99
fleeceJacket      - $49.99
onesie            - $7.99
testAllThingsTShirt - $15.99
```

## Common Commands

```bash
# Run all POM tests
npx playwright test e2e/saucedemo-pom.spec.ts

# Run with UI mode
npx playwright test e2e/saucedemo-pom.spec.ts --ui

# Run specific test suite
npx playwright test e2e/saucedemo-pom.spec.ts -g "Authentication"

# Run specific test
npx playwright test e2e/saucedemo-pom.spec.ts -g "Valid Login"

# Debug a test
npx playwright test e2e/saucedemo-pom.spec.ts --debug

# Generate test report
npx playwright test e2e/saucedemo-pom.spec.ts --reporter=html
```

## LoginPage Key Methods

```typescript
navigateToLoginPage()           // Go to login page
enterUsername(username)         // Enter username
enterPassword(password)         // Enter password
clickLoginButton()              // Click login button
login(username, password)       // Complete login
verifyAcceptedUsernames()       // Verify username list
verifyPasswordInfo()            // Verify password info
```

## InventoryPage Key Methods

```typescript
verifyProductsDisplayed(6)          // Verify product count
verifyProductVisible('Name')        // Check product exists
verifyProductPrice('$29.99')        // Check price
clickAddToCartButton('id')          // Add to cart
clickRemoveButton('id')             // Remove from cart
selectSortOption('az')              // Sort products
clickCartLink()                     // Go to cart
verifyCartBadgeCount('2')           // Check cart count
openMenu() / closeMenu()            // Menu operations
```

## CartPage Key Methods

```typescript
verifyCartPageURL()              // Verify cart URL
verifyCartHeading()              // Check cart heading
verifyCartItemsCount(2)          // Verify item count
clickRemoveButton('id')          // Remove item
clickCheckoutButton()            // Proceed to checkout
clickContinueShoppingButton()    // Back to inventory
```

## CheckoutPage Key Methods

```typescript
verifyCheckoutStep1URL()         // Verify step 1 URL
verifyCheckoutStep2URL()         // Verify step 2 URL
verifyCheckoutFormFields()       // Check form fields exist
fillCheckoutForm(fn, ln, zip)    // Fill all fields
fillFirstName(name)              // Fill first name only
clickContinueButton()            // Go to step 2
clickFinishButton()              // Complete purchase
verifyOrderConfirmationMessage() // Verify success
```

## ProductDetailPage Key Methods

```typescript
verifyProductDetailPageURL()     // Verify detail page URL
verifyProductPrice('$29.99')     // Check price
clickAddToCartButton()           // Add to cart
clickBackToProductsButton()      // Return to inventory
verifyProductName('Name')        // Check product name
```

## Test Data Examples

### Using Credentials
```typescript
const user = TestDataHelper.getCredentials('validUser');
await pageManager.login('validUser');  // Simpler way
```

### Using Products
```typescript
const product = TestDataHelper.getProduct('backpack');
console.log(product.name);   // "Sauce Labs Backpack"
console.log(product.price);  // "$29.99"
```

### Using Checkout Data
```typescript
const data = TestDataHelper.getCheckoutData('validCheckoutInfo');
await checkoutPage.fillCheckoutForm(
  data.firstName,
  data.lastName,
  data.postalCode
);
```

## Troubleshooting

### Test Fails with "Element Not Found"
1. Check the selector in `constants.ts`
2. Verify page object method exists
3. Ensure page has loaded before interacting

### Test Data Not Loading
1. Check JSON file path in helpers.ts
2. Verify JSON syntax is valid
3. Use `TestDataHelper.getCredentials('key')` with correct key

### URL Assertions Failing
1. Check expected URL in `urls.json`
2. Verify navigation method called correctly
3. Check for URL parameters in test data

## Best Practices

✅ **DO:**
- Use PageManager for all page objects
- Use TestDataHelper for test data
- Create specific page object methods
- Keep tests readable and concise
- Use meaningful test names

❌ **DON'T:**
- Hardcode selectors in tests
- Mix page logic with test logic
- Use element IDs as selectors
- Hardcode test data
- Create selector strings in tests

## Adding New Features

### Add New Page Object
1. Create file in `e2e/pages/NewPage.ts`
2. Add methods for page interactions
3. Register in PageManager
4. Use in tests

### Add Test Data
1. Edit appropriate JSON in `e2e/testdata/`
2. Use TestDataHelper to access
3. No code changes needed for tests

### Add New Test
1. Use PageManager for page access
2. Use TestDataHelper for data
3. Follow existing test patterns
4. Use meaningful assertions

## Contact & Support

For questions about:
- **Structure** → See POM-STRUCTURE.md
- **Usage** → See POM-IMPLEMENTATION-SUMMARY.md
- **Examples** → See saucedemo-pom.spec.ts
- **Page Objects** → See e2e/pages/*.ts
