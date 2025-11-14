const { $, browser, expect} = require('@wdio/globals');

class SidebarComponent {

    //      LOCATORS

    get rootEl() {
        return $('.bm-menu-wrap');
    }
    get closeButton() {
        return this.rootEl.$('.bm-cross-button');
    }

    //      ACTIONS

    /**
     * Clicks an item from the sidebar link list
     * @param {string} param the name of the link to click ('all_items', 'about', 'logout', 'reset')
     */
    async clickItem(param) {
        const selectors = {
            all_items: '[data-test="inventory-sidebar-link"]',
            about: '[data-test="about-sidebar-link"]',
            logout: '[data-test="logout-sidebar-link"]',
            reset: '[data-test="reset-sidebar-link"]'
        }
        const selector = selectors[param.toLowerCase()];
        if (!selector) {
            throw new Error(`Sidebar item "${param}" not found`);
        }
        await this.rootEl.$(selector).click();
    }

    /**
     * Clicks the 'X' button and waits for the menu to be hidden
     */
    async closeMenu() {
        await this.closeButton.click();
        await browser.waitUntil(
            async () => {
                return !(await this.rootEl.isDisplayed());
            },
            {
                timeout: 5000,
                timeoutMsg: `Sidebar did not close after 5s`
            }
        );
    }
}

// Export a single instance
module.exports = new SidebarComponent();