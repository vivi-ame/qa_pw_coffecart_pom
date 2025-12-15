import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Discounted Mocha added to the Cart after promo accepting', async ({
  page,
}) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.selectItem('Cappuccino');
  await menuPage.selectItem('Espresso');
  await menuPage.selectItem('Americano');

  await menuPage.assertPromoText();
  await menuPage.clickOnConsentPromoButton();
  await menuPage.clickOnCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertItemTotalCost('Espresso', '$10.00');
  await cartPage.assertItemTotalCost('(Discounted) Mocha', '$4.00');
  await cartPage.assertItemTotalCost('Cappuccino', '$19.00');
  await cartPage.assertItemTotalCost('Americano', '$7.00');

});
