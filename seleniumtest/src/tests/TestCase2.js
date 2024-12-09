const { Builder } = require('selenium-webdriver');
const HomePage = require("../models/HomePage");
const ContactPage = require("../models/ContactPage");
const chai = import('chai');

describe('Test Case 2', function () {
  this.timeout(80 * 1000);//80 seconds
  let driver;
  let homePage;
  let contactPage;

  before(async function () {
    driver = new Builder().forBrowser('chrome').build();
    await driver.manage().window().setRect({ width: 1920, height: 1080 });
    homePage = new HomePage(driver);
    contactPage = new ContactPage(driver);
  });

  after(async function () {
    await driver.quit();
  });

  it('should navigate to contact page', async () => {
    await homePage.open();
    await homePage.navigateToContact();
    const currentUrl = await driver.getCurrentUrl();
    (await chai).expect(currentUrl).to.include('contact');
  })

  it('Populate mandatory fields, submit, wait for feedback loading screen, confirm success message', async () => {
    for (let i = 0; i < 5; i++) {
      await contactPage.populateForename("Jon")
      await contactPage.populateSurname("Snow")//Not mandatory
      await contactPage.populateEmail("jon.snow@gmail.com")
      await contactPage.populateTelephone("021021021021")//Not mandatory
      await contactPage.populateMessage("When enough people make false promises, words stop meaning anything. Then there are no more answers, only better and better lies.")
      await contactPage.submitForm();
      const success = await contactPage.successfulSubmissionMessageVisible();
      (await chai).expect(success).to.equal(true)
      await contactPage.backToForm()
    }
  })
});
