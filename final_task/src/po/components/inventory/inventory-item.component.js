const { $ } = require('@wdio/globals');

class InventoryItemComponent {
    constructor(rootSelector) {
        this.rootEl = $(rootSelector);
    }

    get title() {
        return this.rootEl.$('[data-test="inventory-item-name"]');
    }
    get description() {
        return this.rootEl.$('[data-test="inventory-item-desc"]');
    }
    get price() {
        return this.rootEl.$('[data-test="inventory-item-price"]');
    }
    get addToCartButton() {
        return this.rootEl.$('button.btn_inventory[data-test^="add-to-cart"]');
    }
    get removeButton() {
        return this.rootEl.$('button.btn_inventory[data-test^="remove"]');
    }

    async getTitleText() {
        return this.title.getText();
    }
    async getPrice() {
        const price = await this.price.getText();
        price.replace('$', '');
        return parseFloat(price);
    }
    async clickAddToCart() {
        await this.addToCartButton.click();
    }
    async clickRemove() {
        await this.removeButton.click();
    }
}

module.exports = InventoryItemComponent;