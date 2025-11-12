import { expect, browser } from '@wdio/globals';
import { Given, When, Then } from '@wdio/cucumber-framework'

Given('I am on the login page', async function() {
  await expect(browser).toHaveUrl('saucedemo.com');
});

When('I enter username {string} and password {string}', async function() {
  await loginPage.usernameField.setValue()
})