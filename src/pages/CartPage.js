import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartListLocator = this.page.getByRole('list').nth(1);
    this.cartEmptyMessage = this.page.getByText('No coffee, go add some.');
    this.checkoutTotal = this.page.getByTestId('checkout');

    
  }

  async open() {
    await this.page.goto('https://coffee-cart.app/cart');
  }

  async waitForLoading() {
    await this.page.waitForURL('https://coffee-cart.app/cart');
  }

  async assertItemCost(name, unit, total) {    
    const productItem = this.cartListLocator
      .getByRole('listitem')
      .filter({ hasText: name });

    const nameLocator = productItem.locator('div').nth(0);
    const unitLocator = productItem.locator('div').nth(1);
    const totalCostLocator = productItem.locator('div').nth(3);

    await expect(nameLocator).toContainText(name);
    await expect(unitLocator).toContainText(unit);
    await expect(totalCostLocator).toContainText(total);
  }

  async assertCartEmptyMessage() {
    await expect(this.cartEmptyMessage).toBeVisible();
  }

  async assertItemTotalCost(name, cost) {
    const productItem = this.cartListLocator
      .getByRole('listitem')
      .filter({ hasText: name });
    const prosuctItemTotalCost = productItem.locator('div').nth(3);
    await expect(prosuctItemTotalCost).toContainText(cost);
  }

  async assertItemIsVisible(name) {
    const productItem = this.cartListLocator
      .getByRole('listitem')
      .filter({ hasText: name });
    await expect(productItem).toBeVisible();
  }

  async assertItemIsHiden(name) {
    const productItem = this.cartListLocator
      .getByRole('listitem')
      .filter({ hasText: name });
    await expect(productItem).toBeHidden();
  }

  async removeItem(name) {
    await this.page.getByLabel(`Remove all ${name}`).click();
  }

  async minusOneItem(name) {
    const removeOneButton = this.page.getByRole('button', { name: `Remove one ${name}` });
    await removeOneButton.click();
  }

  async plusOneItem(name) {
    const addOneButton = this.page.getByRole('button', { name: `Add one ${name}` });
    await addOneButton.click();
  }

  async assertCheckoutTotal(total) {
    await expect(this.checkoutTotal).toContainText(total);
  }
}
