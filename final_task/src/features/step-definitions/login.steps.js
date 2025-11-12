const { expect, browser } = require('@wdio/globals');
const { Given,
  When,
  Then } = require('@wdio/cucumber-framework')
const LoginPage = require('../../po/pages/login.page.js');

const loginPage = new LoginPage();

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

Then('I should still be on the login page', async function() {
  await expect(browser).toHaveUrl('https://www.saucedemo.com/');
})

Then('I should see an error message {string}', async function(errorMessage) {
  await expect(loginPage.errorMessage).toHaveText(errorMessage);
})

Then('I should be on the dashboard page', async function() {
  await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'));
})

Then('I should see the title {string}', async function(title) {
  await expect(browser).toHaveTitle(title);
})

