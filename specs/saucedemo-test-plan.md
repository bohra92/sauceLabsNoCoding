# Sauce Demo E-commerce Application Test Plan

## Application Overview

Swag Labs is a demonstration e-commerce web application used for testing automation frameworks. It features user authentication with multiple test user accounts, a product inventory page with sorting capabilities, product detail pages, a shopping cart system, and a multi-step checkout process. The application includes special test user accounts that simulate different real-world scenarios such as locked accounts, performance issues, and visual glitches for comprehensive testing coverage.

## Test Scenarios

### 1. Authentication & User Accounts

**Seed:** `e2e/seed.spec.ts`

#### 1.1. Valid Login with Standard User

**File:** `tests/auth/valid-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
  2. Enter 'standard_user' in the Username field
  3. Enter 'secret_sauce' in the Password field
  4. Click the Login button
  5. Wait for the inventory page to load

**Expected Results:**
  - User is successfully authenticated
  - Page redirects to inventory.html
  - Page displays 'Swag Labs' header and Products section
  - Product list with 6 items is displayed (Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test.allTheThings() T-Shirt)

#### 1.2. Locked Out User Cannot Login

**File:** `tests/auth/locked-out-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
  2. Enter 'locked_out_user' in the Username field
  3. Enter 'secret_sauce' in the Password field
  4. Click the Login button
  5. Observe the error message

**Expected Results:**
  - User is not authenticated
  - Page displays error message: 'Epic sadface: Sorry, this user has been locked out.'
  - User remains on the login page
  - Error message can be closed with the X button

#### 1.3. Invalid Credentials Show Error

**File:** `tests/auth/invalid-credentials.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
  2. Enter 'standard_user' in the Username field
  3. Enter 'wrong_password' in the Password field
  4. Click the Login button
  5. Observe the error message

**Expected Results:**
  - User is not authenticated
  - Page displays an error message indicating credentials are incorrect
  - User remains on the login page

#### 1.4. Login Credentials Information Displayed

**File:** `tests/auth/credentials-info.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
  2. View the left side information panel

**Expected Results:**
  - Information section displays 'Accepted usernames are:' with list including: standard_user, locked_out_user, problem_user, performance_glitch_user, error_user, visual_user
  - Information section displays 'Password for all users: secret_sauce'

### 2. Product Browsing & Inventory

**Seed:** `e2e/seed.spec.ts`

#### 2.1. View Products on Inventory Page

**File:** `tests/inventory/view-products.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Observe the inventory page

**Expected Results:**
  - Six products are displayed in a grid layout
  - Each product shows: image, name, description, price, and 'Add to cart' button
  - Products shown: Sauce Labs Backpack ($29.99), Sauce Labs Bike Light ($9.99), Sauce Labs Bolt T-Shirt ($15.99), Sauce Labs Fleece Jacket ($49.99), Sauce Labs Onesie ($7.99), Test.allTheThings() T-Shirt (Red) ($15.99)
  - Sort dropdown is visible with 'Name (A to Z)' selected by default

#### 2.2. Sort Products by Name A to Z

**File:** `tests/inventory/sort-name-asc.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Verify sort dropdown shows 'Name (A to Z)' as selected
  3. Observe the product order

**Expected Results:**
  - Products are sorted alphabetically by name from A to Z
  - First product is 'Sauce Labs Backpack'
  - Last product is 'Test.allTheThings() T-Shirt (Red)'

#### 2.3. Sort Products by Name Z to A

**File:** `tests/inventory/sort-name-desc.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Click the sort dropdown
  3. Select 'Name (Z to A)' option
  4. Observe the product order

**Expected Results:**
  - Products are sorted alphabetically by name from Z to A
  - First product is 'Test.allTheThings() T-Shirt (Red)'
  - Last product is 'Sauce Labs Backpack'

#### 2.4. Sort Products by Price Low to High

**File:** `tests/inventory/sort-price-asc.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Click the sort dropdown
  3. Select 'Price (low to high)' option
  4. Observe the product order

**Expected Results:**
  - Products are sorted by price from lowest to highest
  - First product is 'Sauce Labs Onesie' ($7.99)
  - Last product is 'Sauce Labs Fleece Jacket' ($49.99)

#### 2.5. Sort Products by Price High to Low

**File:** `tests/inventory/sort-price-desc.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Click the sort dropdown
  3. Select 'Price (high to low)' option
  4. Observe the product order

**Expected Results:**
  - Products are sorted by price from highest to lowest
  - First product is 'Sauce Labs Fleece Jacket' ($49.99)
  - Last product is 'Sauce Labs Onesie' ($7.99)

#### 2.6. View Product Details

**File:** `tests/inventory/view-product-details.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Click on 'Sauce Labs Backpack' product name or image
  3. Observe the product details page

**Expected Results:**
  - Page navigates to inventory-item.html with product ID in URL
  - Product image is displayed
  - Product name, full description, price ($29.99), and 'Add to cart' button are shown
  - 'Back to products' button is visible at the top

#### 2.7. Navigate Back from Product Details

**File:** `tests/inventory/back-to-products.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Click on a product to view details
  3. Click 'Back to products' button
  4. Observe the page

**Expected Results:**
  - Page returns to inventory page
  - Product list is displayed again
  - All sorting and cart state is maintained

### 3. Shopping Cart

**Seed:** `e2e/seed.spec.ts`

#### 3.1. Add Single Product to Cart

**File:** `tests/cart/add-single-item.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Click 'Add to cart' button for 'Sauce Labs Backpack'
  3. Observe the cart badge and button change

**Expected Results:**
  - Button text changes from 'Add to cart' to 'Remove'
  - Cart badge appears with count '1'
  - Cart badge is visible in the top right corner of the header

#### 3.2. Add Multiple Products to Cart

**File:** `tests/cart/add-multiple-items.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Click 'Add to cart' for 'Sauce Labs Backpack'
  3. Click 'Add to cart' for 'Sauce Labs Bike Light'
  4. Click 'Add to cart' for 'Sauce Labs Bolt T-Shirt'
  5. Observe the cart badge

**Expected Results:**
  - Cart badge updates to show '3' items
  - All three products show 'Remove' button instead of 'Add to cart'
  - Cart badge reflects the current quantity

#### 3.3. Remove Product from Cart

**File:** `tests/cart/remove-item.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Add 2 products to cart
  3. Click 'Remove' button for one product
  4. Observe the cart badge and buttons

**Expected Results:**
  - Remove button changes back to 'Add to cart'
  - Cart badge decrements to '1'
  - Only the removed product's button changes to 'Add to cart'

#### 3.4. View Shopping Cart

**File:** `tests/cart/view-cart.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Add 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' to cart
  3. Click on the cart badge
  4. Observe the cart page

**Expected Results:**
  - Page navigates to cart.html
  - Cart page displays 'Your Cart' heading
  - Cart shows QTY and Description columns
  - Both added products are listed with quantity 1 each
  - Product prices are displayed ($29.99 and $9.99)
  - 'Continue Shopping' and 'Checkout' buttons are visible

#### 3.5. Remove Product from Cart Page

**File:** `tests/cart/remove-from-cart-page.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Add 2 products to cart
  3. Click on the cart badge to view cart
  4. Click 'Remove' button for one product
  5. Observe the cart update

**Expected Results:**
  - Product is removed from the cart
  - Cart now displays only the remaining product
  - Cart badge updates to show '1' item

#### 3.6. Continue Shopping from Cart

**File:** `tests/cart/continue-shopping.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Add items to cart
  3. View the cart page
  4. Click 'Continue Shopping' button
  5. Observe the page

**Expected Results:**
  - Page returns to inventory.html
  - Cart items are preserved
  - Product listing is displayed again

#### 3.7. Empty Cart Display

**File:** `tests/cart/empty-cart.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Navigate directly to cart.html without adding items
  3. Observe the cart page

**Expected Results:**
  - Cart page displays 'Your Cart' heading
  - No items are listed in the cart
  - QTY and Description columns are visible but empty
  - 'Continue Shopping' and 'Checkout' buttons are available

### 4. Checkout Process

**Seed:** `e2e/seed.spec.ts`

#### 4.1. Proceed to Checkout Information Step

**File:** `tests/checkout/checkout-step-one.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Add 'Sauce Labs Backpack' to cart
  3. View the cart
  4. Click 'Checkout' button
  5. Observe the checkout page

**Expected Results:**
  - Page navigates to checkout-step-one.html
  - Page displays 'Checkout: Your Information' heading
  - Three input fields are visible: First Name, Last Name, Zip/Postal Code
  - 'Cancel' and 'Continue' buttons are displayed

#### 4.2. Complete Checkout Information Form

**File:** `tests/checkout/fill-checkout-form.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Add an item to cart and proceed to checkout step 1
  3. Enter 'John' in First Name field
  4. Enter 'Doe' in Last Name field
  5. Enter '12345' in Zip/Postal Code field
  6. Click 'Continue' button
  7. Observe the next page

**Expected Results:**
  - Page navigates to checkout-step-two.html
  - Page displays 'Checkout: Overview' heading
  - Overview shows the added items with quantities and prices
  - Payment and shipping information is displayed

#### 4.3. Checkout Overview Page

**File:** `tests/checkout/checkout-overview.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Add 'Sauce Labs Backpack' ($29.99) and 'Sauce Labs Bike Light' ($9.99) to cart
  3. Complete checkout step 1 with valid information
  4. Observe the overview page

**Expected Results:**
  - Overview page shows QTY and Description columns
  - Both items are listed with correct prices
  - Payment Information section displays 'SauceCard #31337'
  - Shipping Information section displays 'Free Pony Express Delivery!'
  - Price totals are displayed: Item total: $39.98, Tax: $3.20, Total: $43.18
  - 'Cancel' and 'Finish' buttons are available

#### 4.4. Cancel at Checkout Information Step

**File:** `tests/checkout/cancel-step-one.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Add items to cart
  3. Proceed to checkout step 1
  4. Click 'Cancel' button
  5. Observe the page

**Expected Results:**
  - Page returns to cart.html
  - Cart items are preserved
  - User is not checked out

#### 4.5. Cancel at Checkout Overview Step

**File:** `tests/checkout/cancel-step-two.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Add items to cart
  3. Complete checkout step 1
  4. On the overview page, click 'Cancel' button
  5. Observe the page

**Expected Results:**
  - Page returns to inventory.html
  - Cart items are preserved
  - User is not checked out

#### 4.6. Complete Purchase

**File:** `tests/checkout/complete-purchase.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Add 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' to cart
  3. View cart and click 'Checkout'
  4. Fill in checkout information: First Name='John', Last Name='Doe', Zip='12345'
  5. Click 'Continue'
  6. On overview page, click 'Finish' button
  7. Observe the confirmation page

**Expected Results:**
  - Page navigates to checkout-complete.html
  - Page displays 'Checkout: Complete!' heading
  - Confirmation message displays: 'Thank you for your order!'
  - Order dispatch message is shown: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
  - Pony Express mascot image is displayed
  - 'Back Home' button is available

#### 4.7. Return to Inventory from Order Confirmation

**File:** `tests/checkout/back-home.spec.ts`

**Steps:**
  1. Complete a successful purchase
  2. Click 'Back Home' button on order confirmation page
  3. Observe the page

**Expected Results:**
  - Page returns to inventory.html
  - Cart badge is cleared (no items shown)
  - Product listing is displayed

#### 4.8. Checkout with Empty Cart

**File:** `tests/checkout/checkout-empty-cart.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Navigate directly to checkout-step-one.html without adding items
  3. Observe the checkout page

**Expected Results:**
  - Checkout page is accessible
  - Form fields are empty and available for input
  - User can proceed with checkout form

### 5. Navigation & Menu

**Seed:** `e2e/seed.spec.ts`

#### 5.1. Open and Close Navigation Menu

**File:** `tests/navigation/menu-open-close.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Click 'Open Menu' button in header
  3. Observe the menu
  4. Click 'Close Menu' button
  5. Observe the menu closes

**Expected Results:**
  - Menu opens to show navigation links
  - Menu contains: 'All Items', 'About', 'Logout', 'Reset App State' options
  - Menu closes when close button is clicked
  - Page content returns to normal view

#### 5.2. Navigate to All Items from Menu

**File:** `tests/navigation/all-items-link.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Click 'Open Menu'
  3. Click 'All Items' link
  4. Observe the page

**Expected Results:**
  - Page navigates to or stays on inventory.html
  - Product listing is displayed
  - Menu closes after selection

#### 5.3. Navigate to About Page

**File:** `tests/navigation/about-link.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Click 'Open Menu'
  3. Click 'About' link
  4. Observe the page navigation

**Expected Results:**
  - Link navigates to https://saucelabs.com/
  - SauceLabs main website is loaded or new tab opens

#### 5.4. Logout from Menu

**File:** `tests/navigation/logout.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Click 'Open Menu'
  3. Click 'Logout' link
  4. Observe the page

**Expected Results:**
  - User is logged out
  - Page navigates back to login page (root /)
  - Login form is displayed with empty fields

#### 5.5. Reset App State from Menu

**File:** `tests/navigation/reset-app-state.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Add multiple items to cart
  3. Click 'Open Menu'
  4. Click 'Reset App State' link
  5. Observe the cart badge and page state

**Expected Results:**
  - Cart is cleared of all items
  - Cart badge disappears or shows 0
  - All 'Remove' buttons change back to 'Add to cart'
  - User remains logged in on inventory page

### 6. Footer & Links

**Seed:** `e2e/seed.spec.ts`

#### 6.1. Social Media Links in Footer

**File:** `tests/footer/social-links.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Scroll to footer
  3. Observe the footer social links

**Expected Results:**
  - Twitter link is present linking to https://twitter.com/saucelabs
  - Facebook link is present linking to https://www.facebook.com/saucelabs
  - LinkedIn link is present linking to https://www.linkedin.com/company/sauce-labs/
  - Copyright notice displays: '© 2026 Sauce Labs. All Rights Reserved.'

#### 6.2. Footer Links Navigation

**File:** `tests/footer/footer-navigation.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Click on Twitter link in footer
  3. Observe the navigation

**Expected Results:**
  - Social media links are clickable
  - Links navigate to external social media platforms

### 7. Special Test Users & Edge Cases

**Seed:** `e2e/seed.spec.ts`

#### 7.1. Problem User Account

**File:** `tests/special-users/problem-user.spec.ts`

**Steps:**
  1. Navigate to login page
  2. Enter 'problem_user' as username
  3. Enter 'secret_sauce' as password
  4. Click Login
  5. Observe the inventory page and product behavior

**Expected Results:**
  - User successfully logs in
  - Inventory page loads
  - Products display with potential visual/layout inconsistencies (as designed for testing visual regression)

#### 7.2. Performance Glitch User Account

**File:** `tests/special-users/performance-glitch-user.spec.ts`

**Steps:**
  1. Navigate to login page
  2. Enter 'performance_glitch_user' as username
  3. Enter 'secret_sauce' as password
  4. Click Login
  5. Observe the page load and interactions

**Expected Results:**
  - User successfully logs in
  - Page may load slowly or have performance issues (as designed for performance testing)
  - Functionality remains intact despite performance degradation

#### 7.3. Error User Account

**File:** `tests/special-users/error-user.spec.ts`

**Steps:**
  1. Navigate to login page
  2. Enter 'error_user' as username
  3. Enter 'secret_sauce' as password
  4. Click Login
  5. Attempt to add items to cart and proceed with purchase

**Expected Results:**
  - User successfully logs in
  - Inventory page loads
  - Error messages may appear during operations (as designed for error handling testing)

#### 7.4. Visual User Account

**File:** `tests/special-users/visual-user.spec.ts`

**Steps:**
  1. Navigate to login page
  2. Enter 'visual_user' as username
  3. Enter 'secret_sauce' as password
  4. Click Login
  5. Browse products and complete a transaction

**Expected Results:**
  - User successfully logs in
  - Inventory page loads with visual design differences (as designed for visual regression testing)
  - Functionality remains the same but visual presentation differs

### 8. Error Handling & Validation

**Seed:** `e2e/seed.spec.ts`

#### 8.1. Missing Required Fields in Checkout

**File:** `tests/errors/missing-checkout-fields.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Add item to cart and proceed to checkout step 1
  3. Leave all fields empty
  4. Click 'Continue' button
  5. Observe any validation messages

**Expected Results:**
  - Form validation prevents submission with empty fields or displays error message
  - User cannot proceed to step 2 without required information

#### 8.2. Checkout with Partial Information

**File:** `tests/errors/partial-checkout-info.spec.ts`

**Steps:**
  1. Login with standard_user / secret_sauce
  2. Add item to cart and proceed to checkout step 1
  3. Enter only First Name
  4. Leave Last Name and Zip Code empty
  5. Click 'Continue' button
  6. Observe validation behavior

**Expected Results:**
  - Form validation prevents submission
  - Error messages indicate which fields are required
  - User remains on checkout step 1
