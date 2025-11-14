const {browser, $, $$} = require("@wdio/globals");
const sidebarComponent = require("../components/common/sidebar.component.js");
const primaryHeaderComponent = require("../components/common/primary-header.component.js");
const footerComponent = require("../components/common/footer.component.js");
const InventoryItemComponent = require("../components/inventory/inventory-item.component.js");

class InventoryPage {

    //      COMPONENT GETTERS

    get primaryHeader() {
        return primaryHeaderComponent;
    }
    get sidebarComponent() {
        return sidebarComponent;
    }
    get footerComponent() {
        return footerComponent;
    }

    //      LOCATORS

    get secondaryHeaderActiveOption() {
        return $('[data-test="active-option"]');
    }
    get secondaryHeaderSort() {
        return $('[data-test="product-sort-container"]');
    }
    get allInventoryItems() {
        return $$('[data-test="inventory-item"]');
    }
    get allAddToCartButtons() {
        return $$('button.btn_inventory[data-test^="add-to-cart"]');
    }
    get allRemoveButtons() {
        return $$('button.btn_inventory[data-test^="remove"]');
    }
    get allItemNames() {
        return $$('.inventory_item_name');
    }
    get allItemPrices() {
        return $$('.inventory_item_price');
    }

    //      ACTIONS

    /**
     * Finds a specific item by its name and returns a component for it
     * @param {string} itemName the visible text of the item's title ('Sauce Labs Backpack' etc.)
     * @returns {Promise<InventoryItemComponent>} a new component object for that specific item
     */
    async getItemByName(itemName) {
        const items = await this.allInventoryItems;
        for (const itemElement of items) {
            const item = new InventoryItemComponent(itemElement);
            if (await item.getTitleText() === itemName) {
                return item;
            }
        }
        throw new Error(`Could not find item with title: ${itemName}`);
    }

    /**
     * Gets the text of all item names currently displayed on the page
     * @returns {Promise<string[]>} an array of item name strings
     */
    async getItemNames() {
        const nameElements = await this.allItemNames;
        const names = [];
        for (const element of nameElements) {
            names.push(await element.getText());
        }
        return names;
    }

    /**
     * Gets the price of all items currently displayed on the page
     * @returns {Promise<number[]>} an array of item prices as numbers
     */
    async getItemPrices() {
        const priceElements = await this.allItemPrices;
        const prices = [];
        for (const element of priceElements) {
            const numericText = (await element.getText()).replace('$', '');
            prices.push(parseFloat(numericText));
        }
        return prices;
    }

    /**
     * Selects an option from the sort dropdown by its 'value' attribute
     * @param {string} optionValue the value of the option ('az', 'za', 'lohi', 'hilo')
     */
    async selectSortOption(optionValue) {
        await this.secondaryHeaderSort.selectByAttribute('value', optionValue);
        await browser.pause(500);
    }

    /**
     * Opens the inventory page (login is required)
     */
    async open() {
        await browser.url('/inventory.html');
    }
}

// Export a single instance
module.exports = new InventoryPage();