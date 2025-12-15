import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Espresso removed from Cart after clicking Remove', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.selectItem('Espresso');
  await menuPage.clickOnCartLink();
  await cartPage.waitForLoading();

  await cartPage.removeItem('Espresso');
  await cartPage.assertCartEmptyMessage();
});
