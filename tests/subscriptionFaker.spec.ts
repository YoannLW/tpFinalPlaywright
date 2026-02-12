import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Subscription Tests with Faker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth');
  });

  test('Création de compte - inscription avec des données Faker', async ({ page }) => {
    await page.getByRole('tab', { name: 'Inscription' }).click();

    const password = faker.internet.password();
    await page.locator('#signup-name').fill(faker.person.fullName());
    await page.locator('#signup-email').fill(faker.internet.email());
    await page.locator('#signup-password').fill(password);
    await page.locator('#signup-confirm').fill(password);
    
    await page.getByTestId('signup-submit-button').click();
  });
});