import { test, expect } from './pages/fixtures';
import { PomFormPayment } from './pages/pomPayment';

test.describe('Parcours d\'achat de bout en bout', () => {
  test('devrait permettre à un utilisateur de se connecter, ajouter un article, et payer', async ({ page, loginPage, validEmail, validPassword }) => {
    // 1. Se connecter
    await loginPage.navigateToLogin();
    await loginPage.login(validEmail, validPassword);
    await loginPage.waitForRedirect();
    await expect(page).not.toHaveURL(/.*auth/);

    // 2. Ajouter un article au panier
    await page.goto('/products');
    await page.locator('[data-testid="add-to-cart-1"]').click();
    await page.locator('[data-testid="cart-button"]').getByText('1').waitFor();

    // 3. Aller au panier et passer au paiement
    await page.locator('[data-testid="cart-button"]').click();
    await page.getByRole('button', { name: 'Passer au paiement' }).click();

    // 4. Remplir le formulaire de livraison
    const shippingForm = new PomFormPayment(page);
    await shippingForm.fillForm();

    // 5. Remplir le formulaire de paiement et payer
    // Les champs de carte sont souvent dans des iframes pour la sécurité
    const iframe = page.frameLocator('iframe[title="Secure payment input frame"]');
    
    await iframe.locator('input[name="cardnumber"]').fill('4242 4242 4242 4242');
    await iframe.locator('input[name="exp-date"]').fill('12/28');
    await iframe.locator('input[name="cvc"]').fill('123');
    
    await page.getByRole('button', { name: /Payer/ }).click();

    // 6. Vérifier le succès
    await expect(page.getByText('Paiement réussi')).toBeVisible({ timeout: 10000 });
  });
});
