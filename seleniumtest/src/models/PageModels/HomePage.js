const { By } = require('selenium-webdriver');

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://jupiter.cloud.planittesting.com/#/';
  }

  async open() {
    await this.driver.get(this.url);
  }
}

module.exports = HomePage;
