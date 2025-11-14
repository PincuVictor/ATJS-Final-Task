const {browser, $} = require("@wdio/globals");

class LoginPage {
    //      LOCATORS
    get usernameField() {
        return $('[data-test="username"]');
    }
    get passwordField() {
        return $('[data-test="password"]');
    }
    get loginButton() {
        return $('[data-test="login-button"]');
    }
    get errorMessage() {
        return $('[data-test="error"]');
    }
    //      ACTIONS

    /**
     * Clicks the login button
     */
    async clickLoginButton() {
        await this.loginButton.click();
    }
    /**
     * Perform a full login.
     * @param {string} username the username to enter
     * @param {string} password the password to enter
     */
    async login(username, password) {
        await this.usernameField.setValue(username);
        await this.passwordField.setValue(password);
        await this.clickLoginButton();
    }

    /**
     * Opens the base url set in wdio.conf.js
     */
    async open() {
        await browser.url('');
    }
}

// Export a single instance
module.exports = new LoginPage();