# Bug Report: "Reset App State" causes UI inconsistency

**ID:** BUG-001
**Severity:** Medium
**Priority:** Low
**Found By:** Victor [Your Last Name]

---

### 1. Summary

The "Reset App State" feature in the sidebar correctly resets the shopping cart's internal state (the item count is cleared) but fails to update the UI of the items on the inventory page. The "Remove" button on an item is not reset back to "Add to cart".

This creates an inconsistent state where the UI is not in sync with the application's data.

### 2. Steps to Reproduce (STR)

1.  Log in as `standard_user`.
2.  Navigate to the `/inventory.html` page.
3.  Click the "Add to cart" button for any item (e.g., "Sauce Labs Backpack").
4.  **Observe:** The button correctly changes to "Remove".
5.  **Observe:** The shopping cart badge correctly shows "1".
6.  Click the sidebar "Menu" button.
7.  Click the "Reset App State" link.
8.  Click the "Close" (X) button on the sidebar.

### 3. Expected Result

* The shopping cart badge is hidden (or shows "0").
* The "Sauce Labs Backpack" button reverts from "Remove" back to "Add to cart".

### 4. Actual Result

* The shopping cart badge is **correctly** hidden.
* The "Sauce Labs Backpack" button **incorrectly** still displays "Remove".

### 5. Test Framework Workaround

A workaround was implemented in the test framework. After the "Reset App State" step is called, a `browser.refresh()` is executed. This forces the page to reload, which correctly syncs the UI and allows the test scenario to proceed.