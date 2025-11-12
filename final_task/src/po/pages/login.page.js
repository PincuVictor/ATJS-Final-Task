const {browser, $} = require("@wdio/globals");

class LoginPage {
    get loginContainer() {
        return $('[data-test="login-container"]');
    }

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

    get errorButton() {
        return $('[data-test="error-button"]');
    }

    async open() {
        await browser.url('');
    }
}

module.exports = LoginPage;