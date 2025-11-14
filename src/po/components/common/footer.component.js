const { $ } = require('@wdio/globals');

class FooterComponent {

    //      LOCATORS

    get rootEl() {
        return $('[data-test="footer"]');
    }
    get footerText() {
        return this.rootEl.$('[data-test="footer-copy"]');
    }

    /**
     * Method to get a specific social media link element.
     * @param {string} param The name of the social media link ('twitter', 'facebook', 'linkedin')
     * @returns {ChainablePromiseElement} The <a> element for the specified link.
     */
    item(param) {
        const selectors = {
            twitter: '[data-test="social-twitter"]',
            facebook: '[data-test="social-facebook"]',
            linkedin: '[data-test="social-linkedin"]',
        }
        return this.rootEl.$(selectors[param.toLowerCase()]);
    }
}

// Export a single instance
module.exports = new FooterComponent();