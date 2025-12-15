import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cart updated correctly after clicking plus for drinks', async ({
  page,
}) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.selectItem('Cappuccino');
  await menuPage.selectItem('Espresso');
  await menuPage.clickOnCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertItemTotalCost('Espresso', '$10.00');
  await cartPage.plusOneItem('Espresso');
  await cartPage.assertItemTotalCost('Espresso', '$20.00');

  await cartPage.assertItemTotalCost('Cappuccino', '$19.00');
  await cartPage.plusOneItem('Cappuccino');
  await cartPage.assertItemTotalCost('Cappuccino', '$38.00');
  await cartPage.assertItemTotalCost('Espresso', '$20.00');
  await cartPage.assertCheckoutTotal('$58.00');
  
});
