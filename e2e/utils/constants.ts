export const URLS = {
  BASE_URL: 'https://www.saucedemo.com',
  LOGIN_PAGE: 'https://www.saucedemo.com/',
  INVENTORY_PAGE: 'https://www.saucedemo.com/inventory.html',
  CART_PAGE: 'https://www.saucedemo.com/cart.html',
  CHECKOUT_STEP_ONE: 'https://www.saucedemo.com/checkout-step-one.html',
  CHECKOUT_STEP_TWO: 'https://www.saucedemo.com/checkout-step-two.html',
  CHECKOUT_COMPLETE: 'https://www.saucedemo.com/checkout-complete.html',
  INVENTORY_ITEM: 'https://www.saucedemo.com/inventory-item.html',
};

export const SELECTORS = {
  USERNAME_FIELD: '[data-test="username"]',
  PASSWORD_FIELD: '[data-test="password"]',
  LOGIN_BUTTON: '[data-test="login-button"]',
  ERROR_MESSAGE: '[data-test="error"]',
  INVENTORY_ITEM: '[data-test="inventory-item"]',
  INVENTORY_ITEM_NAME: '[data-test="inventory-item-name"]',
  INVENTORY_ITEM_PRICE: '[data-test="inventory-item-price"]',
  PRODUCT_SORT_CONTAINER: '[data-test="product-sort-container"] select',
  SHOPPING_CART_BADGE: '[data-test="shopping-cart-badge"]',
  SHOPPING_CART_LINK: '[data-test="shopping-cart-link"]',
  CART_ITEM: '[data-test="cart-item"]',
  FIRST_NAME_FIELD: '[data-test="firstName"]',
  LAST_NAME_FIELD: '[data-test="lastName"]',
  POSTAL_CODE_FIELD: '[data-test="postalCode"]',
};

export const SORT_OPTIONS = {
  NAME_AZ: 'az',
  NAME_ZA: 'za',
  PRICE_LOW_HIGH: 'lohi',
  PRICE_HIGH_LOW: 'hilo',
};

export const PRODUCT_DATA_TEST_IDS = {
  BACKPACK: 'sauce-labs-backpack',
  BIKE_LIGHT: 'sauce-labs-bike-light',
  BOLT_T_SHIRT: 'sauce-labs-bolt-t-shirt',
  FLEECE_JACKET: 'sauce-labs-fleece-jacket',
  ONESIE: 'sauce-labs-onesie',
  TEST_ALL_THINGS_T_SHIRT: 'test-allthethings()-t-shirt-(red)',
};

export const PRODUCT_IDS = {
  BACKPACK: 4,
  BIKE_LIGHT: 0,
  BOLT_T_SHIRT: 1,
  FLEECE_JACKET: 5,
  ONESIE: 2,
  TEST_ALL_THINGS_T_SHIRT: 3,
};

export const ERROR_MESSAGES = {
  LOCKED_OUT_USER: 'Epic sadface: Sorry, this user has been locked out.',
  INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
  MISSING_PASSWORD: 'Epic sadface: Password is required',
  MISSING_USERNAME: 'Epic sadface: Username is required',
};
