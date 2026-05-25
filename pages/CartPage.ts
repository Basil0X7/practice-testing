import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

  // Locators
  private cartBadge    = () => this.page.locator('[data-test="cart-quantity"]');
  private removeBtn    = () => this.page.locator('.btn.btn-danger');
  private addToCartBtn = () => this.page.locator('[data-test="add-to-cart"]');
  private cartNavBtn   = () => this.page.locator('[data-test="nav-cart"]');

  constructor(page: Page) {
    super(page);
  }

  // Navigate to cart page via nav button
  async navigate() {
    await this.cartNavBtn().click();
    await this.waitForLoad();
    await this.page.waitForTimeout(1000);
  }

  // Add product to cart
  async addToCart() {
    await this.addToCartBtn().click();
    await this.page.waitForTimeout(1500);
  }

  // Remove item by index
  async removeItemByIndex(index: number = 0) {
    await this.removeBtn().nth(index).click();
    await this.page.waitForTimeout(1000);
  }

  // Get cart badge count
  async getCartCount(): Promise<number> {
    const text = await this.cartBadge().textContent();
    return parseInt(text?.trim() ?? '0', 10);
  }

  // Verify cart badge count
  async assertCartCount(expected: number) {
    await expect(this.cartBadge()).toHaveText(String(expected), { timeout: 10000 });
  }

  // Verify number of items in cart
  async assertItemCount(expected: number) {
    await expect(this.removeBtn()).toHaveCount(expected, { timeout: 10000 });
  }

  // Verify cart is empty
  async assertCartEmpty() {
    await expect(this.removeBtn()).toHaveCount(0, { timeout: 10000 });
  }

  // Verify product in cart by name
  async assertProductInCart(name: string) {
    await expect(this.page.locator('tbody').filter({ hasText: name })).toBeVisible();
  }

}