
Feature('Sign Up')

Scenario('Should see the sign up form', (I) => {
  I.amOnPage('/')
  I.click('Sign Up')
  I.seeInCurrentUrl('/signup')
  I.see('Email')
  I.see('Username')
  I.see('Password')
  I.see('Password Confirmation')
})

Scenario('Should be taken back to the main page if I cancel', (I) => {
  I.amOnPage('/')
  I.click('Sign Up')
  I.click('Cancel')
  I.see('Welcome')
})

Scenario('Should see error if forget to fill in email', (I) => {
  I.amOnPage('/')
  I.click('Sign Up')
  I.click('Sign Up')
  I.see('Please enter a valid email address.')
})
