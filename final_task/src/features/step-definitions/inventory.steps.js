const { expect, browser,  } = require('@wdio/globals');
const { Given,
    When,
    Then } = require('@wdio/cucumber-framework')

const loginPage = require('../../po/pages/login.page.js');
const inventoryPage = require('../../po/pages/inventory.page.js');

Given('I am logged in and on the inventory page', async function () {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce')
    await inventoryPage.primaryHeader.rootEl.waitForDisplayed();
})
Given('I have one item {string} added to cart', async function (item) {
    const badgeIsDisplayed = await inventoryPage.primaryHeader.shoppingCartBadge.isDisplayed();
    if (badgeIsDisplayed) {
        await inventoryPage.primaryHeader.openMenu();
        await inventoryPage.sidebarComponent.clickItem('reset');
    }
    await browser.refresh(); // Added because of the persistent remove button bug
    const itemComponent = await inventoryPage.getItemByName(item);
    await itemComponent.clickAddToCart();
})

When('I click the menu button', async function () {
    await inventoryPage.primaryHeader.navbarButton.click();
    await expect(inventoryPage.sidebarComponent.rootEl).toBeDisplayed();
})
When('I click the sidebar {string} button', async function (button) {
    await inventoryPage.sidebarComponent.clickItem(button);
})
When('I click the cart button', async function () {
    await inventoryPage.primaryHeader.shoppingCartButton.click();
})
When('I click the footer {string} button', async function (button) {
    await inventoryPage.footerComponent.item(button).click();
})
When('I click the add to cart button on {string}', async function (item) {
    const badgeIsDisplayed = await inventoryPage.primaryHeader.shoppingCartBadge.isDisplayed();
    if (badgeIsDisplayed) {
        await inventoryPage.primaryHeader.openMenu();
        await inventoryPage.sidebarComponent.clickItem('reset');
    }
    const itemComponent = await inventoryPage.getItemByName(item);
    await itemComponent.clickAddToCart();
})
When('I click the add to cart button on all of the items', async function () {
    let addButtons = await inventoryPage.allAddToCartButtons;
    while (addButtons.length > 0) {
        await addButtons[0].click();
        addButtons = await inventoryPage.allAddToCartButtons;
    }
})
When('I click the remove button on {string}', async function (item) {
    const badgeIsDisplayed = await inventoryPage.primaryHeader.shoppingCartBadge.isDisplayed();
    if (badgeIsDisplayed) {
        await inventoryPage.primaryHeader.openMenu();
        await inventoryPage.sidebarComponent.clickItem('reset');
    }
    const itemComponent = await inventoryPage.getItemByName(item);
    await itemComponent.clickRemove();
})
When('I select the sorting option as {string}', async function (method) {
    await inventoryPage.secondaryHeaderSort.selectByAttribute('value', method);
})

Then('I should be on the saucelabs page', async function () {
    await expect(browser).toHaveUrl('https://saucelabs.com/');
})
Then('I should be on the shopping cart page', async function () {
    await expect(browser).toHaveUrl(expect.stringContaining('/cart.html'));
})
Then('I should be logged out', async function () {
    await browser.url('/inventory.html');
    await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: ' +
        'You can only access \'/inventory.html\' when you are logged in.');
})
Then('I should open the {string} page in a new tab', async function (pageName) {
    const urlMap = {
        twitter: 'https://x.com/saucelabs',
        facebook: 'https://www.facebook.com/saucelabs',
        linkedin: 'https://www.linkedin.com/company/sauce-labs/'
    };
    const expectedUrl = urlMap[pageName.toLowerCase()];
    const handles = await browser.getWindowHandles();
    await browser.switchWindow(handles[1]);
    await browser.waitUntil(
        async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl.includes(expectedUrl);
    },
        {
            timeout: 10000,
            timeoutMsg: `New tab did not load ${expectedUrl} in time`
        }
);
    await expect(browser).toHaveUrl(expect.stringContaining(expectedUrl));
    await browser.closeWindow();
    await browser.switchWindow(handles[0]);
});
Then('The shopping cart badge should show {string}', async function (number) {
    await expect(inventoryPage.primaryHeader.shoppingCartBadge).toBeDisplayed();
    await expect(inventoryPage.primaryHeader.shoppingCartBadge).toHaveText(number);
})
Then('The remove button is now displayed on {string}', async function (item) {
    const itemComponent = await inventoryPage.getItemByName(item);
    await expect(itemComponent.removeButton).toBeDisplayed();
})
Then('The shopping cart badge should show the number of items available', async function () {
    const items = await inventoryPage.allInventoryItems
    await expect(inventoryPage.primaryHeader.shoppingCartBadge).toHaveText(items.length.toString());
})
Then('The remove button is now displayed on all of the items', async function () {
    const items = await inventoryPage.allInventoryItems
    const removeButtons = await inventoryPage.allRemoveButtons
    expect(removeButtons.length).toBe(items.length);
})
Then('The shopping cart badge should not be displayed', async function () {
    await expect(inventoryPage.primaryHeader.shoppingCartBadge).not.toBeDisplayed();
})
Then('The add to cart button is now displayed on {string}', async function (item) {
    const itemComponent = await inventoryPage.getItemByName(item);
    await expect(itemComponent.addToCartButton).toBeDisplayed();
})
Then('The active sorting option should be {string}', async function (name) {
    await expect(inventoryPage.secondaryHeaderActiveOption).toHaveText(name);
})
Then('The items should be sorted according to the {string} order', async function (sortMethod) {
    if (sortMethod === "Name (A to Z)" || sortMethod === "Name (Z to A)") {
        const actualNames = await inventoryPage.getItemNames();
        const expectedNames = [...actualNames].sort();
        if (sortMethod === "Name (Z to A)") {
            expectedNames.reverse();
        }
        await expect(actualNames).toEqual(expectedNames);
    } else if (sortMethod === "Price (low to high)" || sortMethod === "Price (high to low)") {
        const actualPrices = await inventoryPage.getItemPrices();
        const expectedPrices = [...actualPrices].sort((a, b) => a - b);
        if (sortMethod === "Price (high to low)") {
            expectedPrices.reverse();
        }
        await expect(actualPrices).toEqual(expectedPrices);
    } else {
        throw new Error("Unknown sort method in test");
    }
})