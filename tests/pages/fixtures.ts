import { test as base } from '@playwright/test';
import { LoginPage } from './pomLoginPage';
import { CartPage } from './pomCartPage';

type PageObjectFixtures = {
  loginPage: LoginPage;
  cartPage: CartPage;
  cartWithItems: CartPage;
};

type TestCredentials = {
  validEmail: string;
  validPassword: string;
};

export const test = base.extend<PageObjectFixtures & TestCredentials>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  // Fixture pour un panier déjà rempli avec des produits
  cartWithItems: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await page.goto('/products', { waitUntil: 'networkidle' });

    const addItemToCart3 = page.locator('[data-testid="add-to-cart-3"]');
    const addItemToCart1 = page.locator('[data-testid="add-to-cart-1"]');

    // Ajouter des éléments au panier

    await addItemToCart1.click();
    await page.locator('[data-testid="cart-button"]').getByText('1').waitFor();
    await addItemToCart1.click();
    await page.locator('[data-testid="cart-button"]').getByText('2').waitFor();

    await addItemToCart3.click();
    await page.locator('[data-testid="cart-button"]').getByText('3').waitFor();
    await addItemToCart3.click();
    await page.locator('[data-testid="cart-button"]').getByText('4').waitFor();
    await addItemToCart3.click();
    await page.locator('[data-testid="cart-button"]').getByText('5').waitFor();
    
    // Naviguer vers le panier
    const buttonPanier = page.locator('[data-testid="cart-button"]');
    await buttonPanier.click();
    await page.waitForLoadState('networkidle');
    await page.locator('.bg-card.rounded-2xl').first().waitFor();
    await use(cartPage);
  },

  validEmail: async ({ }, use) => {
    await use('jean.dujardin@email.com');
  },

  validPassword: async ({ }, use) => {
    await use('password123');
  },

});

export { expect } from '@playwright/test';
