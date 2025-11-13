const {browser, $, $$} = require("@wdio/globals");
const sidebarComponent = require("../components/common/sidebar.component.js");
const primaryHeaderComponent = require("../components/common/primary-header.component.js");
const footerComponent = require("../components/common/footer.component.js");
const InventoryItemComponent = require("../components/inventory/inventory-item.component.js");

class InventoryPage {
    get primaryHeader() {
        return primaryHeaderComponent;
    }
    get sidebarComponent() {
        return sidebarComponent;
    }
    get footerComponent() {
        return footerComponent;
    }
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

    async getItemByName(itemName) {
        const items = await this.allInventoryItems;
        for (const itemElement of items) {
            const item = new InventoryItemComponent(itemElement);
            if (await item.getTitleText() === itemName) {
                return item;
            }
        }
        throw new Error(`Could not find item with name: ${itemName}`);
    }
    async getItemNames() {
        const nameElements = await this.allItemNames;
        const names = [];
        for (const element of nameElements) {
            names.push(await element.getText());
        }
        return names;
    }
    async getItemPrices() {
        const priceElements = await this.allItemPrices;
        const prices = [];
        for (const element of priceElements) {
            const text = await element.getText();
            prices.push(Number(text.replace('$', '')));
        }
        return prices;
    }

    async open() {
        await browser.url('/inventory.html');
    }
}

module.exports = new InventoryPage();