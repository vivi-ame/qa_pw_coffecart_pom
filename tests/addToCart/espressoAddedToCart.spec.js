import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Espresso correctly added to the Cart', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.selectItem('Espresso');
  await menuPage.clickOnCartLink();

  await cartPage.waitForLoading();
  await cartPage.assertProductCost('Espresso', '$10.00 x 1', '$10.00');
});
