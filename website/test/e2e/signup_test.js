
Feature('Sign Up')

Scenario('Should see the sign up form', (I) => {
  I.amOnPage('/')
  I.click('Sign Up')
  I.see('Email')
  I.see('Username')
  I.see('Password')
  I.see('Password Confirmation')
})
