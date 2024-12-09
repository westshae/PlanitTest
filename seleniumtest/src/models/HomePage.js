const { By } = require('selenium-webdriver');

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://jupiter.cloud.planittesting.com/#/';
  }

  async open() {
    await this.driver.get(this.url);
  }

  async navigateToShop() {
    const shopNavLi = await this.driver.findElement(By.id('nav-shop'))
    const shopLink = await shopNavLi.findElement(By.css('a'));
    
    await shopLink.click();
  }
  async navigateToContact() {
    const shopNavLi = await this.driver.findElement(By.id('nav-contact'))
    const shopLink = await shopNavLi.findElement(By.css('a'));
    
    await shopLink.click();
  }
  async navigateToCart() {
    const shopNavLi = await this.driver.findElement(By.id('nav-cart'))
    const shopLink = await shopNavLi.findElement(By.css('a'));
    
    await shopLink.click();
  }

}

module.exports = HomePage;
