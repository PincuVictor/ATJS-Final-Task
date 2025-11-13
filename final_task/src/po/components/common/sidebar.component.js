const { $, browser, expect} = require('@wdio/globals');

class SidebarComponent {
    get rootEl() {
        return $('.bm-menu-wrap');
    }
    get closeButton() {
        return this.rootEl.$('.bm-cross-button');
    }

    async clickItem(param) {
        const selectors = {
            all_items: '[data-test="inventory-sidebar-link"]',
            about: '[data-test="about-sidebar-link"]',
            logout: '[data-test="logout-sidebar-link"]',
            reset: '[data-test="reset-sidebar-link"]'
        }
        await this.rootEl.$(selectors[param.toLowerCase()]).click();
    }
    async closeMenu() {
        await this.closeButton.click();
        await browser.waitUntil( async () => {
                return !expect(this.rootEl).toBeDisplayed();
            },
            {
                timeout: 10000,
                timeoutMsg: `Sidebar did not close`
            }
        )
    }

}

module.exports = new SidebarComponent();