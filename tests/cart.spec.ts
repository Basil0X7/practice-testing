import { test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Feature: Add to Cart', () => {

  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await productsPage.navigate();
  });

  // TC-CART-01: Add a single product to cart ✅
  test('TC-CART-01: Add a single product to cart', async () => {
    await productsPage.openFirstProduct();
    await cartPage.addToCart();
    await cartPage.assertCartCount(1);
  });

  // TC-CART-02: Verify product appears in cart page ✅
  test('TC-CART-02: Verify product appears in cart page', async () => {
    await productsPage.openFirstProduct();
    await cartPage.addToCart();
    await cartPage.navigate();
    await cartPage.assertItemCount(1);
  });

  // TC-CART-03: Add multiple products to cart ✅
  test('TC-CART-03: Add multiple products to cart', async ({ page }) => {
    // Add first product
    await page.locator('[data-test="product-01KSF5T55Y5STJ3YSMSYHVMRTG"]').click();
    await cartPage.addToCart();

    // Go back to home
    await page.getByRole('link', { name: 'Practice Software Testing -' }).click();
    await page.waitForLoadState('networkidle');

    // Add second different product
    await page.locator('[data-test="product-01KSF5T55Q79PQ3K2M74SJX52G"]').click();
    await cartPage.addToCart();

    await cartPage.assertCartCount(2);
  });

});

test.describe('Feature: Remove from Cart', () => {

  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  // TC-REMOVE-01: Add one item, remove it, verify cart is empty ✅
  test('TC-REMOVE-01: Add one item then remove it and verify cart is empty', async () => {
    await productsPage.navigate();
    await productsPage.openFirstProduct();
    await cartPage.addToCart();
    await cartPage.navigate();
    await cartPage.assertItemCount(1);
    await cartPage.removeItemByIndex(0);
    await cartPage.assertCartEmpty();
  });

  // TC-REMOVE-02: Add two items and remove one, verify one remains ✅
  test('TC-REMOVE-02: Add two items and remove one', async ({ page }) => {
    // Add first product
    await productsPage.navigate();
    await page.locator('[data-test="product-01KSF5T55Y5STJ3YSMSYHVMRTG"]').click();
    await cartPage.addToCart();

    // Go back to home
    await page.getByRole('link', { name: 'Practice Software Testing -' }).click();
    await page.waitForLoadState('networkidle');

    // Add second different product
    await page.locator('[data-test="product-01KSF5T55Q79PQ3K2M74SJX52G"]').click();
    await cartPage.addToCart();

    // Go to cart and verify 2 items
    await cartPage.navigate();
    await cartPage.assertItemCount(2);

    // Remove first item and verify one remains
    await cartPage.removeItemByIndex(0);
    await cartPage.assertItemCount(1);
  });

  // TC-REMOVE-03: Add two items and remove them one by one ✅
  test('TC-REMOVE-03: Add two items and remove them one by one', async ({ page }) => {
    // Add first product
    await productsPage.navigate();
    await page.locator('[data-test="product-01KSF5T55Y5STJ3YSMSYHVMRTG"]').click();
    await cartPage.addToCart();

    // Go back to home
    await page.getByRole('link', { name: 'Practice Software Testing -' }).click();
    await page.waitForLoadState('networkidle');

    // Add second different product
    await page.locator('[data-test="product-01KSF5T55Q79PQ3K2M74SJX52G"]').click();
    await cartPage.addToCart();

    // Go to cart and verify 2 items
    await cartPage.navigate();
    await cartPage.assertItemCount(2);

    // Remove first item
    await cartPage.removeItemByIndex(0);
    await cartPage.assertItemCount(1);

    // Remove second item and verify cart is empty
    await cartPage.removeItemByIndex(0);
    await cartPage.assertCartEmpty();
  });

});