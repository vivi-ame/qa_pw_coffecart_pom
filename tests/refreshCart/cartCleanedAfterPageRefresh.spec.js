import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cart cleaned after page refresh', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.selectItem('Cappuccino');
  await menuPage.selectItem('Espresso');
  await menuPage.clickOnCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertItemIsVisible('Cappuccino');
  await page.reload();
  await cartPage.assertItemIsHiden('Cappuccino');
  await cartPage.assertCartEmptyMessage();
});
