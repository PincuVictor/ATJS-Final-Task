const { expect, browser } = require('@wdio/globals');
const { Given,
  When,
  Then } = require('@wdio/cucumber-framework')
const loginPage = require('../../po/pages/login.page.js');

//    GIVEN

/**
 * Opens the login page
 */
Given('I am on the login page', async function() {
  await loginPage.open();
});

//    WHEN

/**
 * Enter a username and password
 * @param {string} username the username to enter
 * @param {string} password the password to enter
 */
When('I enter username {string} and password {string}', async function(username, password) {
  await loginPage.usernameField.setValue(username);
  await loginPage.passwordField.setValue(password);
})

/**
 * Clicks the login button
 */
When('I click the login button', async function() {
  await loginPage.loginButton.click();
})
/**
 * Attempts to navigate to a secure page directly
 */
When('I try to access the inventory page', async function() {
  await browser.url('/inventory.html')
})

//    THEN


/**
 * Asserts that the browser is currently on the login page/base url
 */
Then('I should be on the login page', async function() {
  await expect(browser).toHaveUrl('https://www.saucedemo.com/');
})

/**
 * Asserts that the correct error message is displayed
 * @param {string} errorMessage the expected text of the error
 */
Then('I should see an error message {string}', async function(errorMessage) {
  await expect(loginPage.errorMessage).toHaveText(errorMessage);
})

/**
 * Asserts that the browser has successfully navigated to the inventory page
 */
Then('I should be on the inventory page', async function() {
  await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'));
})

/**
 * Asserts that the page title is correct
 * @param {string} title the expected page title
 */
Then('I should see the title {string}', async function(title) {
  await expect(browser).toHaveTitle(title);
})

