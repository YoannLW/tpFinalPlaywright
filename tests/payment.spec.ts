import { test, expect } from './pages/fixtures';
import { PomFormPayment } from './pages/pomPayment';

test.describe('Payment Tests', () => {
  // Use the cartWithItems fixture to ensure the cart is not empty
  test.beforeEach(async ({ cartWithItems, page }) => {
    // The cartWithItems fixture adds items and navigates to the cart page.
    // Now, click the "Passer au paiement" button to proceed to checkout.
    await page.getByRole('button', { name: 'Passer au paiement' }).click();
  });

  test('paiement', async ({ page }) => {
      const pageForms = new PomFormPayment(page);
      // The form should be visible now
      await pageForms.fillForm();

      await page.getByPlaceholder('1234 5678 9012 3456').fill('4242424242424242');
      await page.locator('#cardName').fill('Jean Dujardin');
      await page.locator('#expiry').fill('12/34');
      
      // FIX: Use a more specific locator for the CVV field
      await page.getByTestId('payment-cvv-input').fill('456');

      // Click
      await page.getByTestId('payment-submit-button').click();

      // Vérifier que la page de confirmation s'affiche
      await expect(page.getByRole('heading', { name: 'Commande confirmée !' })).toBeVisible();
  });


});