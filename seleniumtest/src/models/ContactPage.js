const { By, until } = require('selenium-webdriver');

class ContactPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://jupiter.cloud.planittesting.com/#/contact';
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

  async submitForm() {
    const submitButton = await this.driver.wait(
      until.elementLocated(By.css('.btn-contact.btn.btn-primary')),
      5000
    );
    await submitButton.click();
  }

  async errorMessageVisible() {
    try {
      await this.driver.wait(
        until.elementLocated(By.css('.alert-error')),
        5000
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async populateForename(text){
    const input = await this.driver.findElement(By.id('forename'))
    await input.sendKeys(text)
  }
  async populateSurname(text){
    const input = await this.driver.findElement(By.id('surname'))
    await input.sendKeys(text)
  }
  async populateEmail(text){
    const input = await this.driver.findElement(By.id('email'))
    await input.sendKeys(text)
  }
  async populateTelephone(text){
    const input = await this.driver.findElement(By.id('telephone'))
    await input.sendKeys(text)
  }
  async populateMessage(text){
    const input = await this.driver.findElement(By.id('message'))
    await input.sendKeys(text)
  }
}

module.exports = ContactPage;
