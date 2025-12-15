import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cart updated correctly after clicking minus for drinks', async ({
  page,
}) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.selectItem('Cappuccino');
  await menuPage.selectItem('Espresso');
  await menuPage.clickOnCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertItemIsVisible('Espresso');
  await cartPage.minusOneItem('Espresso');
  await cartPage.assertItemIsHiden('Espresso');

  await cartPage.assertItemIsVisible('Cappuccino');
  await cartPage.minusOneItem('Cappuccino');
  await cartPage.assertItemIsHiden('Cappuccino');

  await cartPage.assertCartEmptyMessage();

});
