const { By, until } = require('selenium-webdriver');

class ShopPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://jupiter.cloud.planittesting.com/#/shop';
  }

  async open() {
    await this.driver.get(this.url);
  }

  async addItemToCart(itemName, quantity){
    const itemHeader  = await this.driver.wait(
      until.elementLocated(By.xpath(`//h4[contains(text(), '${itemName}')]`)),
      5000
    );
    const submitButton = await itemHeader
    .findElement(By.xpath(".."))
    .findElement(By.linkText("Buy"));

    for(let i = 0; i < quantity; i++){
      await submitButton.click();
    }
  }
}

module.exports = ShopPage;
