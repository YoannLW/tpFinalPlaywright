import { test, expect } from './pages/fixtures';

test.describe('Tests de connexion', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLogin();
  });

  test('Connection elements display', async ({ loginPage }) => {
    await expect(loginPage.title).toBeVisible();
    await expect(loginPage.subtitle).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.termsText).toBeVisible();
  });

  test('Connection w/ valid credentials', { 
    tag: ['@most-important'] },
    async ({ loginPage, validEmail, validPassword }) => {
    await loginPage.login(validEmail, validPassword);
    await loginPage.waitForRedirect();
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).not.toContain('/auth');
  });

  test('Connection w/ invalid email', async ({ loginPage }) => {
    await loginPage.login('email-invalide@test.com', 'password123');
    await expect(loginPage.getErrorMessage()).toBeVisible({ timeout: 5000 });
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('/auth');
  });

  test('Fill login form', async ({ loginPage, validEmail, validPassword }) => {
    await loginPage.fillEmail(validEmail);
    await loginPage.fillPassword(validPassword);
    expect(await loginPage.getEmailValue()).toBe(validEmail);
    expect(await loginPage.getPasswordValue()).toBe(validPassword);
    expect(await loginPage.isLoginButtonEnabled()).toBe(true);
  });

    test('Connection w/ incorrect password', async ({ loginPage, validEmail }) => {
    await loginPage.login(validEmail, 'password1234');
    await expect(loginPage.getErrorMessage()).toBeVisible({ timeout: 5000 });
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('/auth');
  });


  test('Keep email after a failed attempt', async ({ loginPage, validEmail }) => {
    await loginPage.login(validEmail, 'password1234');
    await loginPage.page.waitForTimeout(1000);
    const currentEmail = await loginPage.getEmailValue();
    expect(currentEmail).toBe(validEmail);
  });
});
