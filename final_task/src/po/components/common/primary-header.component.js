const { $ } = require('@wdio/globals');

class PrimaryHeader {
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

    async openMenu() {
        await this.navbarButton.click();
    }
    async clickShoppingCart() {
        await this.shoppingCartButton.click();
    }
}

module.exports = new PrimaryHeader();