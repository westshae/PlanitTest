const { By, until } = require('selenium-webdriver');

class CartPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://jupiter.cloud.planittesting.com/#/cart';
  }

  async open() {
    await this.driver.get(this.url);
  }

  //Take product name, return individual price
  //Take product name, return count of products in cart
  //Take product name, return subtotal price

  async getProductRow(productName){
    return await this.driver.wait(
      until.elementLocated(By.xpath(`//tr//td[contains(text(), ' ${productName}')]`)),
      5000
    );
  }
  
  async getProductIndividualPrice(productName){
    const productRow  = await this.getProductRow(productName)

    const priceElement = await productRow.findElement(By.xpath('./following-sibling::td[1]'));

    const stringPrice = await priceElement.getText();
    return parseFloat(stringPrice.replace('$', '').trim());
  }

  async getProductCount(productName){
    const productRow  = await this.getProductRow(productName)

    const quantityTd = await productRow.findElement(By.xpath("./following-sibling::td[2]"));
    const quantityInput = await quantityTd.findElement(By.css(".input-mini.ng-pristine.ng-valid.ng-valid-number.ng-valid-min"));

    const stringQuantity = await quantityInput.getAttribute('value');
    return parseInt(stringQuantity);
  }

  async getTotalCartPrice(){
    const totalPriceElement = await this.driver.findElement(By.css(".total.ng-binding"));

    const stringTotalPrice = await totalPriceElement.getText();
    return parseFloat(stringTotalPrice.replace('Total:', '').trim());
  }
}

module.exports = CartPage;
