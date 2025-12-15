import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';

test('Espresso cost is added to Total on menu page', async ({ page }) => {
  const menuPage = new MenuPage(page);

  await menuPage.open();
  await menuPage.selectItem('Espresso');
  await menuPage.assertCheckoutTotal('Total: $10.00');
});
