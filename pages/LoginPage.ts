import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  // Locators
  private emailInput    = () => this.page.locator('[data-test="email"]');
  private passwordInput = () => this.page.locator('[data-test="password"]');
  private loginButton   = () => this.page.locator('[data-test="login-submit"]');
  private errorMessage  = () => this.page.locator('[data-test="login-error"]');
  private navMenu       = () => this.page.locator('[data-test="nav-menu"]');

  constructor(page: Page) {
    super(page);
  }

  // الانتقال لصفحة الدخول
  async navigate() {
    await this.goto('/auth/login');
    await this.waitForLoad();
  }

  // تسجيل الدخول
  async login(email: string, password: string) {
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
    await this.waitForLoad();
  }

  // التحقق من نجاح الدخول
  async assertLoggedIn() {
    await expect(this.navMenu()).toBeVisible({ timeout: 10000 });
  }

  // التحقق من ظهور رسالة خطأ
  async assertLoginError() {
    await expect(this.errorMessage()).toBeVisible();
  }

  // التحقق أننا في صفحة الدخول
  async assertOnLoginPage() {
    await expect(this.page).toHaveURL(/.*login.*/);
  }

}