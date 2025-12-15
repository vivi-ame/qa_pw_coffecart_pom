import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Discounted Mocha added to the Cart after promo rejecting', async ({
  page,
}) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.selectItem('Cappuccino');
  await menuPage.selectItem('Espresso');
  await menuPage.selectItem('Americano');

  await menuPage.assertPromoText();
  await menuPage.clickOnDenialPromoButton();
  await menuPage.clickOnCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertItemIsVisible('Espresso');
  await cartPage.assertItemIsVisible('Cappuccino');
  await cartPage.assertItemIsVisible('Americano');
  await cartPage.assertItemIsHiden('(Discounted) Mocha');
  
})
