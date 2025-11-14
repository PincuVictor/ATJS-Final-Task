class InventoryItemComponent {
    /**
     * The constructor takes the root element of a single item
     * @param {WebdriverIO.Element} rootElement the element object for one '.inventory_item'
     */
    constructor(rootElement) {
        this.rootEl = rootElement;
    }

    //      LOCATORS

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

    //      ACTIONS

    /**
     * @returns {Promise<string>} the text of the item's title
     */
    async getTitleText() {
        return this.title.getText();
    }

    /**
     * @returns {Promise<number>} the price of the item as a number
     */
    async getPrice() {
        const priceText = await this.price.getText();
        const numericText = priceText.replace('$', '');
        return parseFloat(numericText);
    }

    /**
     * Clicks the add to cart button for this items
     */
    async clickAddToCart() {
        await this.addToCartButton.click();
    }

    /**
     * Clicks the remove button for this items
     */
    async clickRemove() {
        await this.removeButton.click();
    }
}

// Export the class itself for instantiating multiple components
module.exports = InventoryItemComponent;