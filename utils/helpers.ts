import { Page } from '@playwright/test';

// توليد إيميل عشوائي لتجنب التكرار عند التسجيل
export function generateUniqueEmail(): string {
  return `testuser_${Date.now()}@test.com`;
}

// انتظار حتى يظهر عدد معين في شارة السلة
export async function waitForCartCount(page: Page, expected: number): Promise<void> {
  await page.waitForFunction(
    (exp) => {
      const badge = document.querySelector('[data-test="cart-quantity"]');
      return badge?.textContent?.trim() === String(exp);
    },
    expected,
    { timeout: 10000 }
  );
}