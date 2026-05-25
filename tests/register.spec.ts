import { test } from '@playwright/test';
import { RegisterPage, RegisterData } from '../pages/RegisterPage';
import { generateUniqueEmail } from '../utils/helpers';
import dotenv from 'dotenv';

dotenv.config();

const baseData: Omit<RegisterData, 'email' | 'password'> = {
  firstName : process.env.REG_FIRST_NAME!,
  lastName  : process.env.REG_LAST_NAME!,
  birthDate : process.env.REG_BIRTH_DATE!,
  address   : process.env.REG_ADDRESS!,
  city      : process.env.REG_CITY!,
  state     : process.env.REG_STATE!,
  country   : process.env.REG_COUNTRY!,
  postcode  : process.env.REG_POSTCODE!,
  phone     : process.env.REG_PHONE!,
};

test.describe('Feature: Register', () => {

  test.use({ storageState: { cookies: [], origins: [] } });

  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
  });

  test('TC-REG-01: Register a new user with valid data', async () => {
    const data: RegisterData = {
      ...baseData,
      email   : generateUniqueEmail(),
      password: `Secure!${Date.now()}Aa1`,
    };
    await registerPage.register(data);
    await registerPage.assertSuccess();
  });

  test('TC-REG-02: Register with an already existing email', async () => {
    const data: RegisterData = {
      ...baseData,
      email   : process.env.USER_EMAIL!,
      password: process.env.USER_PASSWORD!,
    };
    await registerPage.register(data);
    await registerPage.assertError();
  });

  test('TC-REG-03: Register without email', async () => {
    const data: RegisterData = {
      ...baseData,
      email   : '',
      password: 'Test@1234!',
    };
    await registerPage.register(data);
    await registerPage.assertError();
  });

  test('TC-REG-04: Register without password', async () => {
    const data: RegisterData = {
      ...baseData,
      email   : generateUniqueEmail(),
      password: '',
    };
    await registerPage.register(data);
    await registerPage.assertError();
  });

  test('TC-REG-05: Register without first name', async () => {
    const data: RegisterData = {
      ...baseData,
      firstName: '',
      email    : generateUniqueEmail(),
      password : 'Test@1234!',
    };
    await registerPage.register(data);
    await registerPage.assertError();
  });

});
