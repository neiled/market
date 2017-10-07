
Feature('Welcome')

Scenario('Should be welcomed to the site', (I) => {
  I.amOnPage('/')
  I.see('Welcome')
})

Scenario('Should be able to see the sign up link', (I) => {
  I.amOnPage('/')
  I.see('Sign Up')
})

Scenario('Following signup up link should take me to the sign up page', (I) => {
  I.amOnPage('/')
  I.click('Sign Up')
  I.amOnPage('/signup')
})
