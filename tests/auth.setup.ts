import { test as setup, expect } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const AUTH_FILE = path.join(__dirname, '../playwright/.auth/user.json');

setup('Save login session', async ({ page }) => {

  await page.goto('/auth/login');
  await page.waitForLoadState('networkidle');

  await page.locator('[data-test="email"]').fill(process.env.USER_EMAIL!);
  await page.locator('[data-test="password"]').fill(process.env.USER_PASSWORD!);
  await page.locator('[data-test="login-submit"]').click();

  await expect(page.locator('[data-test="nav-menu"]')).toBeVisible({ timeout: 15000 });

  await page.context().storageState({ path: AUTH_FILE });

  console.log('Auth state saved successfully');

});