const { expect, browser,  } = require('@wdio/globals');
const { Given,
    When,
    Then } = require('@wdio/cucumber-framework')

const loginPage = require('../../po/pages/login.page.js');
const inventoryPage = require('../../po/pages/inventory.page.js');

//      GIVEN

/**
 * This is the Background step for all scenarios
 * It performs a full login AND resets the app state
 * This guarantees every scenario starts from a clean, known state
 */
Given('I am logged in and on the inventory page', async function () {
    // Login
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    // Wait for the page to load
    await inventoryPage.primaryHeader.rootEl.waitForDisplayed();
    // State reset
    await inventoryPage.primaryHeader.openMenu();
    await inventoryPage.sidebarComponent.clickItem('reset');
    await inventoryPage.sidebarComponent.closeMenu();
    // Bug workaround
    await browser.refresh();
});

/**
 * A setup step for 'Remove' or 'Add to cart' tests
 * It adds a single, specific item to the cart
 * @param {string} item the name of the item to add
 */
Given('I have one item {string} added to cart', async function (item) {
    const itemComponent = await inventoryPage.getItemByName(item);
    await itemComponent.clickAddToCart();
});


//      WHEN


/**
 * Opens the sidebar menu.
 */
When('I click the menu button', async function () {
    await inventoryPage.primaryHeader.navbarButton.click();
    await expect(inventoryPage.sidebarComponent.rootEl).toBeDisplayed();
});

/**
 * Clicks a specific button in the sidebar
 * @param {string} button the name of the button
 */
When('I click the sidebar {string} button', async function (button) {
    await inventoryPage.sidebarComponent.clickItem(button);
});

/**
 * Clicks the main shopping cart button in the header.
 */
When('I click the cart button', async function () {
    await inventoryPage.primaryHeader.clickShoppingCart();
});

/**
 * Clicks a specific social media button in the footer
 * @param {string} button the name of the button
 */
When('I click the footer {string} button', async function (button) {
    await inventoryPage.footerComponent.item(button).click();
});

/**
 * Clicks the add to cart button for one specific item.
 * @param {string} item the title of the item
 */
When('I click the add to cart button on {string}', async function (item) {
    const itemComponent = await inventoryPage.getItemByName(item);
    await itemComponent.clickAddToCart();
});

/**
 * Clicks all add to cart buttons on the page using a while loop
 * to avoid Stale Element Reference errors.
 */
When('I click the add to cart button on all of the items', async function () {
    let addButtons = await inventoryPage.allAddToCartButtons;
    while (addButtons.length > 0) {
        await addButtons[0].click();
        addButtons = await inventoryPage.allAddToCartButtons;
    }
});

/**
 * Clicks the remove button for one specific item
 * @param {string} item the title of the item
 */
When('I click the remove button on {string}', async function (item) {
    const itemComponent = await inventoryPage.getItemByName(item);
    await itemComponent.clickRemove();
});

/**
 * Selects an option from the sorting dropdown
 * @param {string} method the value of the sort option
 */
When('I select the sorting option as {string}', async function (method) {
    await inventoryPage.selectSortOption(method);
});

//      THEN

/**
 * Asserts the browser is on the Saucelabs page
 */
Then('I should be on the saucelabs page', async function () {
    await expect(browser).toHaveUrl('https://saucelabs.com/');
});

/**
 * Asserts the browser is on the Shopping Cart page
 */
Then('I should be on the shopping cart page', async function () {
    await expect(browser).toHaveUrl(expect.stringContaining('/cart.html'));
});

/**
 * Assertion to prove logout was successful.
 * 1. Tries to access the secure inventory page.
 * 2. Asserts it was redirected to the login page.
 * 3. Asserts the correct error message is shown.
 */
Then('I should be logged out', async function () {
    await browser.url('/inventory.html');
    await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: ' +
        'You can only access \'/inventory.html\' when you are logged in.');
});

/**
 * A step to handle new tabs.
 * 1. Gets all window handles.
 * 2. Switches to the new tab (index 1).
 * 3. Waits for the URL to be correct.
 * 4. Asserts the URL.
 * 5. Closes the new tab.
 * 6. Switches back to the main tab (index 0).
 * @param {string} pageName The name of the social media page
 */
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

/**
 * Asserts the shopping cart badge has the correct item count
 * @param {string} number the expected number as a string
 */
Then('The shopping cart badge should show {string}', async function (number) {
    await expect(inventoryPage.primaryHeader.shoppingCartBadge).toBeDisplayed();
    await expect(inventoryPage.primaryHeader.shoppingCartBadge).toHaveText(number);
});

/**
 * Asserts the remove button is displayed for a specific item
 * @param {string} item the name of the item
 */
Then('The remove button is now displayed on {string}', async function (item) {
    const itemComponent = await inventoryPage.getItemByName(item);
    await expect(itemComponent.removeButton).toBeDisplayed();
});

/**
 * Asserts the cart badge count matches the total number of items on the page
 */
Then('The shopping cart badge should show the number of items available', async function () {
    const items = await inventoryPage.allInventoryItems
    await expect(inventoryPage.primaryHeader.shoppingCartBadge).toHaveText(items.length.toString());
});

/**
 * Asserts all items on the page are showing a remove button
 */
Then('The remove button is now displayed on all of the items', async function () {
    const items = await inventoryPage.allInventoryItems
    const removeButtons = await inventoryPage.allRemoveButtons
    expect(removeButtons.length).toBe(items.length);
});

/**
 * Asserts the shopping cart badge is no longer displayed
 */
Then('The shopping cart badge should not be displayed', async function () {
    await expect(inventoryPage.primaryHeader.shoppingCartBadge).not.toBeDisplayed();
});

/**
 * Asserts the add to cart button is displayed for a specific item
 * @param {string} item the title of the item
 */
Then('The add to cart button is now displayed on {string}', async function (item) {
    const itemComponent = await inventoryPage.getItemByName(item);
    await expect(itemComponent.addToCartButton).toBeDisplayed();
});

/**
 * Asserts the active sorting <select> dropdown text is correct
 * @param {string} name the expected text
 */
Then('The active sorting option should be {string}', async function (name) {
    await expect(inventoryPage.secondaryHeaderActiveOption).toHaveText(name);
});

/**
 * A data validation step to assert sorting is correct.
 * 1. Gets the actual list of names/prices from the UI.
 * 2. Creates a copy and sorts it using JavaScript.
 * 3. Asserts the UI list is identical to the sorted list.
 * @param {string} sortMethod the name of the sort method
 */
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
});