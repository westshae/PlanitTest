const { By, until } = require('selenium-webdriver');

class NavComponent {
  constructor(driver) {
    this.driver = driver;
  }

  async pageHasNavigationBar(){
    try {
      await this.driver.wait(
        until.elementLocated(By.css('.navbar')),
        5000
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async navigateToShop() {
    if((await this.pageHasNavigationBar()) === false) throw new Error("Page doesn't continue navigation bar");
    
    const shopNavLi = await this.driver.findElement(By.id('nav-shop'))
    const shopLink = await shopNavLi.findElement(By.css('a'));

    await shopLink.click();
  }
  async navigateToContact() {
    if((await this.pageHasNavigationBar()) === false) throw new Error("Page doesn't continue navigation bar");

    const shopNavLi = await this.driver.findElement(By.id('nav-contact'))
    const shopLink = await shopNavLi.findElement(By.css('a'));

    await shopLink.click();
  }
  async navigateToCart() {
    if((await this.pageHasNavigationBar()) === false) throw new Error("Page doesn't continue navigation bar");

    const shopNavLi = await this.driver.findElement(By.id('nav-cart'))
    const shopLink = await shopNavLi.findElement(By.css('a'));

    await shopLink.click();
  }
}

module.exports = NavComponent;
