import { test, expect } from '@playwright/test';

test('Création de compte - inscription', async ({ page }) => {
    await page.goto('https://techhubecommerce.lovable.app/auth');

    await page.getByRole('tab', { name: 'Inscription' }).click();
    await page.locator('#signup-name').fill('Jean Dupont');
    await page.locator('#signup-email').fill('jean.dupont@example.com');
    await page.locator('#signup-password').fill('SecurePassword123!');
    await page.locator('#signup-confirm').fill('SecurePassword123!');
    await page.getByTestId('signup-submit-button').click();

});