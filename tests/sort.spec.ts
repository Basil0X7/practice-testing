import { test } from '@playwright/test';
import { ProductsPage, SortOption } from '../pages/ProductsPage';
import dotenv from 'dotenv';

dotenv.config();

const sortScenarios: { label: string; option: SortOption; assert: string }[] = [
  { label: 'Name A to Z',          option: 'name,asc',   assert: 'assertSortedAZ'           },
  { label: 'Name Z to A',          option: 'name,desc',  assert: 'assertSortedZA'           },
  { label: 'Price Low to High',    option: 'price,asc',  assert: 'assertSortedPriceLowToHigh' },
  { label: 'Price High to Low',    option: 'price,desc', assert: 'assertSortedPriceHighToLow' },
];

test.describe('Feature: Sort', () => {

  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.navigate();
    await productsPage.assertProductsVisible();
  });

  for (const scenario of sortScenarios) {
    test(`TC-SORT: Sort products by ${scenario.label}`, async () => {
      await productsPage.sortBy(scenario.option);
      await (productsPage as any)[scenario.assert]();
    });
  }

  test('TC-SORT-05: Switch sort from A-Z then Price High to Low', async () => {
    await productsPage.sortBy('name,asc');
    await productsPage.assertSortedAZ();

    await productsPage.sortBy('price,desc');
    await productsPage.assertSortedPriceHighToLow();
  });

});