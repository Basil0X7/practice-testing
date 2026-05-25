import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Feature: Login', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('TC-LOGIN-01: Login with valid credentials', async () => {
        await loginPage.login(
        process.env.USER_EMAIL!,
        process.env.USER_PASSWORD!
        );
        await loginPage.assertLoggedIn();
    });

    test('TC-LOGIN-02: Login with wrong password', async () => {
        await loginPage.login(
        process.env.USER_EMAIL!,
        'WrongPassword123'
        );
        await loginPage.assertLoginError();
    });

    test('TC-LOGIN-03: Login with wrong email', async () => {
        await loginPage.login(
        'wrong@email.com',
        process.env.USER_PASSWORD!
        );
        await loginPage.assertLoginError();
    });

  // TC-LOGIN-04: Login with empty fields ❌
    test('TC-LOGIN-04: Login with empty fields', async ({ page }) => {
    await page.locator('[data-test="login-submit"]').click();
    // Verify the button does nothing and we stay on login page
    await expect(page).toHaveURL(/.*login.*/);
    });

    test('TC-LOGIN-05: Verify login page URL', async () => {
        await loginPage.assertOnLoginPage();
    });

    test('TC-LOGIN-06: Password field should be masked', async ({ page }) => {
        await page.locator('[data-test="password"]').fill('mysecret');
        await expect(page.locator('[data-test="password"]')).toHaveAttribute('type', 'password');
    });

});