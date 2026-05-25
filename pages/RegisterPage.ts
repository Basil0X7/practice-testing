import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface RegisterData {
    firstName: string;
    lastName: string;
    birthDate: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
    phone: string;
    email: string;
    password: string;
}

export class RegisterPage extends BasePage {

  private firstNameInput = () => this.page.getByPlaceholder('First name *');
  private lastNameInput  = () => this.page.getByPlaceholder('Your last name *');
  private birthDateInput = () => this.page.getByPlaceholder('YYYY-MM-DD');

  private houseNumberInput = () => this.page.getByPlaceholder('e.g. 42 *');
  private streetInput      = () => this.page.getByPlaceholder('Your Street *');
  private cityInput        = () => this.page.getByPlaceholder('Your City *');
  private stateInput       = () => this.page.getByPlaceholder('Your State *');

  private countrySelect  = () => this.page.getByLabel('Country');

  private postcodeInput  = () => this.page.getByPlaceholder('Your Postcode *');
  private phoneInput     = () => this.page.getByPlaceholder('Your phone *');

  private emailInput     = () => this.page.getByPlaceholder('Your email *');
  private passwordInput  = () => this.page.getByPlaceholder('Your password');

  private submitButton   = () =>
    this.page.getByRole('button', { name: /register/i });

  private loginHeading = () =>
    this.page.getByRole('heading', { name: 'Login' });

  private errorMsg = () =>
    this.page.locator('.alert-danger');

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await this.goto('/auth/register');

    await this.page.waitForLoadState('domcontentloaded');

    await expect(this.firstNameInput()).toBeVisible({ timeout: 15000 });
  }

  async fillForm(data: RegisterData) {
    const houseNumber = data.address.match(/\d+/)?.[0] ?? '1';
    const street = data.address.replace(houseNumber, '').trim() || data.address;

    await this.firstNameInput().fill(data.firstName);
    await this.lastNameInput().fill(data.lastName);
    await this.birthDateInput().fill(data.birthDate);

    await this.countrySelect().selectOption(data.country);

    await this.postcodeInput().fill(data.postcode);
    await this.houseNumberInput().fill(houseNumber);
    await this.streetInput().fill(street);
    await this.cityInput().fill(data.city);
    await this.stateInput().fill(data.state);

    await this.phoneInput().fill(data.phone);
    await this.emailInput().fill(data.email);
    await this.passwordInput().fill(data.password);
  }

  async submit() {
    await expect(this.submitButton()).toBeVisible();
    await this.submitButton().click();

    await this.page.waitForLoadState('networkidle');
  }

  async register(data: RegisterData) {
    await this.navigate();
    await this.fillForm(data);
    await this.submit();
  }

  async assertSuccess() {
    await expect(this.page).toHaveURL(/.*\/auth\/login.*/, { timeout: 15000 });
    await expect(this.loginHeading()).toBeVisible();
  }

  async assertError() {
    await expect(this.errorMsg()).toBeVisible({ timeout: 10000 });
  }
}
