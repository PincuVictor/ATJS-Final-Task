const { $ } = require('@wdio/globals');

class FooterComponent {
    get rootEl() {
        return $('[data-test="footer"]');
    }
    get footerText() {
        return this.rootEl.$('[data-test="footer-copy"]');
    }

    item(param) {
        const selectors = {
            twitter: '[data-test="social-twitter"]',
            facebook: '[data-test="social-facebook"]',
            linkedin: '[data-test="social-linkedin"]',
        }
        return this.rootEl.$(selectors[param.toLowerCase()]);
    }
}

module.exports = new FooterComponent();