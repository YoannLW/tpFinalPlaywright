import { Locator, Page, expect } from "@playwright/test";

export class PomFormPayment {
    firstNameInput: Locator;
    lastNameInput: Locator;
    emailInput: Locator;
    mobileInput: Locator;
    currentAddressInput: Locator;
    cityInput: Locator;
    zipCodeInput: Locator;
    continueButton: Locator;


    constructor(private page: Page) {
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#email');
        this.mobileInput = page.locator('#phone');
        this.currentAddressInput = page.locator('#address');
        this.cityInput = page.locator('#city');
        this.zipCodeInput = page.locator('#postalCode');

        this.continueButton = page.getByTestId('shipping-submit-button');
    }

    async fillForm() {
        await this.firstNameInput.fill('Jean');
        await this.lastNameInput.fill('Dujardin');
        await this.emailInput.fill('jean.dujardin@email.com');    
        await this.mobileInput.fill('0606060606');
        await this.currentAddressInput.fill("Chez moi c'est la rue");
        await this.cityInput.fill('Paris');
        await this.zipCodeInput.fill('75001');

        await expect(this.continueButton).toBeVisible();
        await this.continueButton.scrollIntoViewIfNeeded();
        await this.continueButton.click({ force: true });
    }

}

