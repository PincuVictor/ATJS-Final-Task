Feature: Saucedemo Login

  As a user, I want to test the login functionality of Saucedemo
  to ensure only valid users can access the dashboard.

  @UC1
  Scenario: UC-1 Test Login with empty username
    Given I am on the login page
    When I enter username "" and password "secret_sauce"
    And I click the login button
    Then I should still be on the login page
    And I should see an error message "Username is required"

  @UC2
  Scenario: UC-2 Test Login with empty password
    Given I am on the login page
    When I enter username "standard_user" and password ""
    And I click the login button
    Then I should still be on the login page
    And I should see an error message "Password is required"

  @UC3 @Negative
  Scenario: UC-3 Test Login with a locked out user
    Given I am on the login page
    When I enter username "locked_out_user" and password "secret_sauce"
    And I click the login button
    Then I should still be on the login page
    And I should see an error message "Sorry, this user has been locked out"

  @UC3 @Positive
  Scenario Outline: UC-3 Test Login with valid users (Data Provider)
    Given I am on the login page
    When I enter username <username> and password "secret_sauce"
    And I click the login button
    Then I should be on the dashboard page
    And I should see the title "Swag Labs"

    Examples:
      | username                |
      | standard_user           |
      | problem_user            |
      | performance_glitch_user |
      | error_user              |
      | visual_user             |