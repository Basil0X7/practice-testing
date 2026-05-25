import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export type SortOption = 'name,asc' | 'name,desc' | 'price,asc' | 'price,desc';

export class ProductsPage extends BasePage {

  // Locators - use partial match for product cards
  private sortSelect    = () => this.page.locator('[data-test="sort"]');
  private productCards  = () => this.page.locator('[data-test^="product-"]');
  private productNames  = () => this.page.locator('.card-title');
  private productPrices = () => this.page.locator('[data-test="product-price"]');

  constructor(page: Page) {
    super(page);
  }

  // Navigate to home page
  async navigate() {
    await this.goto('/');
    await this.waitForLoad();
    await this.page.waitForTimeout(2000);
  }

  // Open first product
  async openFirstProduct() {
    await this.productCards().first().click();
    await this.waitForLoad();
  }

  // Open product by index
  async openProductByIndex(index: number) {
    await this.productCards().nth(index).click();
    await this.waitForLoad();
  }

  // Select sort option
  async sortBy(option: SortOption) {
    await this.sortSelect().selectOption(option);
    await this.page.waitForTimeout(2000);
    await this.waitForLoad();
  }

  // Get product names visible on current page
  async getProductNames(): Promise<string[]> {
    await this.productNames().first().waitFor({ state: 'visible', timeout: 10000 });
    const names = await this.productNames().allTextContents();
    return names.map(n => n.trim());
  }

  // Get product prices visible on current page
  async getProductPrices(): Promise<number[]> {
    await this.productPrices().first().waitFor({ state: 'visible', timeout: 10000 });
    const texts = await this.productPrices().allTextContents();
    return texts.map(t => parseFloat(t.replace(/[^0-9.]/g, '')));
  }

  // Verify names sorted A to Z
  async assertSortedAZ() {
    const names = await this.getProductNames();
    for (let i = 0; i < names.length - 1; i++) {
      expect(names[i].localeCompare(names[i + 1])).toBeLessThanOrEqual(0);
    }
  }

  // Verify names sorted Z to A
  async assertSortedZA() {
    const names = await this.getProductNames();
    for (let i = 0; i < names.length - 1; i++) {
      expect(names[i].localeCompare(names[i + 1])).toBeGreaterThanOrEqual(0);
    }
  }

  // Verify prices sorted High to Low
  async assertSortedPriceHighToLow() {
    const prices = await this.getProductPrices();
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  }

  // Verify prices sorted Low to High
  async assertSortedPriceLowToHigh() {
    const prices = await this.getProductPrices();
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  }

  // Verify products are visible
  async assertProductsVisible() {
    await expect(this.productCards().first()).toBeVisible({ timeout: 15000 });
  }

}