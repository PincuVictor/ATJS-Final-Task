const {browser, $} = require("@wdio/globals");

class LoginPage {
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

    async clickLoginButton() {
        await this.loginButton.click();
    }
    async login(username, password) {
        await this.usernameField.setValue(username);
        await this.passwordField.setValue(password);
        await this.clickLoginButton();
    }

    async open() {
        await browser.url('');
    }
}

module.exports = new LoginPage();