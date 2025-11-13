Feature: SauceDemo Inventory
  As a user, I want to test the functionality of the inventory page,
  to ensure that users can navigate and select the available items anf pages

  Background:
    Given I am logged in and on the inventory page

  @UC4
  Scenario: UC-4 Test sidebar logout button
    When I click the menu button
    And I click the sidebar "logout" button
    Then I should be on the login page
    And I should be logged out

  @UC5
  Scenario: UC-5 Test sidebar about button
    When I click the menu button
    And I click the sidebar "about" button
    Then I should be on the saucelabs page

  @UC6
  Scenario: UC-6 Test sidebar all items button
    When I click the menu button
    And I click the sidebar "all_items" button
    Then I should be on the inventory page

  @UC7
  Scenario: UC-7 Test header cart button
    When I click the cart button
    Then I should be on the shopping cart page

  @UC8
  Scenario: UC-8 Test footer Twitter button
    When I click the footer "twitter" button
    Then I should open the "Twitter" page in a new tab

  @UC9
  Scenario: UC-9 Test footer Facebook button
    When I click the footer "facebook" button
    Then I should open the "Facebook" page in a new tab

  @UC10
  Scenario: UC-10 Test footer LinkedIn button
    When I click the footer "linkedin" button
    Then I should open the "LinkedIn" page in a new tab

  @UC11
  Scenario Outline: UC-11 Test adding any singular item to cart
    When I click the add to cart button on "<item>"
    Then The shopping cart badge should show "1"
    And The remove button is now displayed on "<item>"
  Examples:
    | item                              |
    | Sauce Labs Backpack               |
    | Sauce Labs Bike Light             |
    | Sauce Labs Bolt T-Shirt           |
    | Sauce Labs Fleece Jacket          |
    | Sauce Labs Onesie                 |
    | Test.allTheThings() T-Shirt (Red) |
    
  @UC12
  Scenario: UC-12 Test adding all items to cart
    When I click the add to cart button on all of the items
    Then The shopping cart badge should show the number of items available
    And The remove button is now displayed on all of the items

  @UC13
  Scenario Outline: UC-13 Test removing any singular item to cart
    Given I have one item "<item>" added to cart
    When I click the remove button on "<item>"
    Then The shopping cart badge should not be displayed
    And The add to cart button is now displayed on "<item>"
    Examples:
      | item                              |
      | Sauce Labs Backpack               |
      | Sauce Labs Bike Light             |
      | Sauce Labs Bolt T-Shirt           |
      | Sauce Labs Fleece Jacket          |
      | Sauce Labs Onesie                 |
      | Test.allTheThings() T-Shirt (Red) |

  @UC14
  Scenario Outline: UC-14 Test inventory item sorting
    When I select the sorting option as "<method>"
    Then The active sorting option should be "<name>"
    And The items should be sorted according to the "<name>" order
  Examples:
    | method | name                 |
    |   az   | Name (A to Z)        |
    |   za   | Name (Z to A)        |
    |  lohi  | Price (low to high)  |
    |  hilo  | Price (high to low)  |