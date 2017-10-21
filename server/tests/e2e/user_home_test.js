const assert = require('assert')

Feature('User Home')

Scenario('Should see the users username', (I) => {
  I.signup('user_home@example.com', 'user_home', 'test_password')
  I.seeElement('#home-link')
  I.click('Home')
  I.seeInCurrentUrl('/home')
  I.see('user_home')
})

Scenario('Should not see the home link when not signed in', (I) => {
  I.signup('user_not_home@example.com', 'user_not_home', 'test_password')
  I.seeElement('#home-link')
  I.seeElement('#signout-link')
  I.click('Sign Out')
  I.dontSeeElement('#home-link')
})

Scenario('Should not be able to access home when not signed in', (I) => {
  I.signup('user_link_home@example.com', 'user_link_home', 'test_password')
  I.seeElement('#home-link')
  I.seeElement('#signout-link')
  I.click('Sign Out')
  I.amOnPage('/home')
  I.dontSee('user_home')
})