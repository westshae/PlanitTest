const { Builder } = require('selenium-webdriver');
const ShopPage = require('../models/PageModels/ShopPage');
const NavComponent = require('../models/ComponentModels/NavComponent');
const CartPage = require('../models/PageModels/CartPage');
const chai = import('chai');

describe('Test Case 3', function () {
  this.timeout(80 * 1000);//80 seconds
  let driver;
  let shopPage;
  let cartPage;
  let navigationBar;

  before(async function () {
    driver = new Builder().forBrowser('chrome').build();
    await driver.manage().window().setRect({ width: 1920, height: 1080 });
    shopPage = new ShopPage(driver)
    cartPage = new CartPage(driver)
    navigationBar = new NavComponent(driver)
  });

  after(async function () {
    await driver.quit();
  });

  const expectedProducts = [
    { name: 'Stuffed Frog', quantity: 2, price: 10.99, subtotal: 21.98 },
    { name: 'Fluffy Bunny', quantity: 5, price: 9.99, subtotal: 49.95 },
    { name: 'Valentine Bear', quantity: 3, price: 14.99, subtotal: 44.97 }
  ];

  it('Add items to cart then go to cart page', async () => {
    await shopPage.open();

    for (const product of expectedProducts) {
      await shopPage.addItemToCart(product.name, product.quantity);
    }

    await navigationBar.navigateToCart();
    const currentUrl = await driver.getCurrentUrl();
    (await chai).expect(currentUrl).to.include('cart');
  })

  it('should verify the subtotal count of each product is correct', async () => {
    for (const product of expectedProducts) {
      const count = await cartPage.getProductCount(product.name);
      (await chai).expect(count).to.equal(product.quantity);
    }
  })

  it('should verify price of each product', async () => {
    for (const product of expectedProducts) {
      const price = await cartPage.getProductIndividualPrice(product.name);
      (await chai).expect(price).to.equal(product.price);
    }
  })

  it('should verify that the total is equal to the sum of the subtotals', async () => {
    const totalPrice = await cartPage.getTotalCartPrice();
    (await chai).expect(totalPrice).to.equal(116.9);
  })
});
