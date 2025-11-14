const { browser, $ } = require('@wdio/globals');

class PrimaryHeader {

    //      LOCATORS

    get rootEl() {
        return $('[data-test="primary-header"]');
    }
    get headerLabel() {
        return this.rootEl.$('.app-logo');
    }
    get shoppingCartButton() {
        return this.rootEl.$('[data-test="shopping-cart-link"]');
    }
    get shoppingCartBadge() {
        return this.rootEl.$('[data-test="shopping-cart-badge"]');
    }
    get navbarButton() {
        return this.rootEl.$('.bm-burger-button');
    }

    //      ACTIONS

    /**
     * Clicks the burger menu button to open the sidebar
     * A small pause is added for the animation to start
     */
    async openMenu() {
        await this.navbarButton.click();
        await browser.pause(250);
    }

    /**
     * Clicks the shopping cart button
     */
    async clickShoppingCart() {
        await this.shoppingCartButton.click();
    }
}

// Export a single instance
module.exports = new PrimaryHeader();