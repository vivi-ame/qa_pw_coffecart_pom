import { expect } from '@playwright/test';

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.cartPageLink = this.page.getByLabel('Cart page');
    this.checkoutTotal = this.page.getByTestId('checkout');
    this.promoText = this.page.getByText("It's your lucky day! Get an extra cup of Mocha for $4.");
    this.consentPromoButton = this.page.getByRole('button', { name: 'Yes, of course!' });
    this.denialPromoButton = this.page.getByRole('button', { name: "Nah, I'll skip." });
  }

  async open() {
    await this.page.goto('https://coffee-cart.app/');
  }

  async selectItem(item) {
    await this.page.getByTestId(item).click();
  }

  async clickOnCartLink() {
    await this.cartPageLink.click();
  }

  async assertCheckoutTotal(total) {
    await expect(this.checkoutTotal).toContainText(total);
  }

  async assertItemCorrectCost(name, cost) {
    const itemName = this.page.getByTestId(name);
    const itemPerent = this.page.getByRole('listitem').filter({ has: itemName });

    await expect(itemPerent).toContainText(cost);
  }

  async assertPromoText() {
    await expect(this.promoText).toBeVisible();
  }

  async clickOnConsentPromoButton() {
    await this.consentPromoButton.click();
  }

  async clickOnDenialPromoButton() {
    await this.denialPromoButton.click();
  }

}



  
