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

  async backToForm(){
    const backButton = await this.driver.wait(
      until.elementLocated(By.linkText('« Back')),
      5000
    );
    await backButton.click();
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

  async successfulSubmissionMessageVisible(){
    try {
      await this.driver.wait(
        until.elementLocated(By.css('.alert-success')),
        15000
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async populateInputField(id, text){
    const input = await this.driver.wait(
      until.elementLocated(By.id(id)),
      5000
    );
    await input.sendKeys(text)
  }

  async populateForename(text){
    await this.populateInputField('forename', text)
  }
  async populateSurname(text){
    await this.populateInputField('surname', text)
  }
  async populateEmail(text){
    await this.populateInputField('email', text)
  }
  async populateTelephone(text){
    await this.populateInputField('telephone', text)
  }
  async populateMessage(text){
    await this.populateInputField('message', text)
  }
}

module.exports = ContactPage;
