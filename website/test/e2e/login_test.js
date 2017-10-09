

Feature('Sign In')

Scenario('Should see the sign in form', (I) => {
  I.amOnPage('/')
  I.click('Sign In')
  I.seeInCurrentUrl('/signin')
  I.see('Email')
  I.see('Password')
})

Scenario('Should be taken back to the main page if I cancel', (I) => {
  I.amOnPage('/')
  I.click('Sign In')
  I.click('Cancel')
  I.see('Welcome')
})

Scenario('Should see error if forget to fill in email', (I) => {
  I.amOnPage('/')
  I.click('Sign In')
  I.click('Sign In')
  I.see('Please enter a valid email address.')
})

Scenario('When I sign in I should see a logout link on the main page', (I) => {
  I.amOnPage('/')
  I.click('Sign In')
  I.fillField('email', 'test_email@example.com')
  I.fillField('password', 'test_password')
  I.click('Sign In')
  I.seeElement('#sign_out_button')
  I.dontSee('Sign In')
  I.dontSee('Sign Up')
})

Scenario('When I sign in and then sign out I should not see a logout link', (I) => {
  I.amOnPage('/')
  I.click('Sign In')
  I.fillField('email', 'test_email@example.com')
  I.fillField('password', 'test_password')
  I.click('Sign In')
  I.click('Sign Out')
  I.dontSee('Sign Out')
  I.see('Sign In')
})

Scenario('When I sign in with the wrong password it should fail', (I) => {
  I.amOnPage('/')
  I.click('Sign In')
  I.fillField('email', 'test_email@example.com')
  I.fillField('password', 'wrong_password')
  I.click('Sign In')
  I.dontSee('Sign Out')
  I.see('Sign In')
  I.see('Incorrect email and/or password')
})
