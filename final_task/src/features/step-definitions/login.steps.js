const { expect, browser } = require('@wdio/globals');
const { Given,
  When,
  Then } = require('@wdio/cucumber-framework')
const loginPage = require('../../po/pages/login.page.js');

Given('I am on the login page', async function() {
  await loginPage.open();
});

When('I enter username {string} and password {string}', async function(username, password) {
  await loginPage.usernameField.setValue(username);
  await loginPage.passwordField.setValue(password);
})
When('I click the login button', async function() {
  await loginPage.loginButton.click();
})
When('I try to access the inventory page', async function() {
  await browser.url('/inventory.html')
})

Then('I should be on the login page', async function() {
  await expect(browser).toHaveUrl('https://www.saucedemo.com/');
})
Then('I should see an error message {string}', async function(errorMessage) {
  await expect(loginPage.errorMessage).toHaveText(errorMessage);
})
Then('I should be on the inventory page', async function() {
  await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'));
})
Then('I should see the title {string}', async function(title) {
  await expect(browser).toHaveTitle(title);
})

