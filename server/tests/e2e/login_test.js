

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
  I.signup('basic@example.com', 'basic', 'test_password')
  I.seeElement('#signout-link')
  I.dontSee('Sign In')
  I.dontSee('Sign Up')
})

Scenario('When I sign in and then sign out I should not see a logout link', (I) => {
  I.signup('sign_out@example.com', 'sign_out', 'test_password')
  I.seeElement('#signout-link')
  I.click('Sign Out')
  I.dontSee('Sign Out')
  I.see('Sign In')
  I.amOnPage('/')
  I.dontSee('Sign Out')
  I.see('Sign In')
})

Scenario('When I sign in with the wrong password it should fail', (I) => {
  I.signup('wrong_pass@example.com', 'wrong_pass', 'test_password')
  I.seeElement('#signout-link')
  I.click('Sign Out')
  I.click('Sign In')
  I.fillField('email', 'wrong_pass@example.com')
  I.fillField('password', 'wrong_password')
  I.click('Sign In')
  I.wait(2)
  I.see('Incorrect email and/or password')
})

Scenario('When I refresh the page my login status is still remembered', (I) => {
  I.signup('test_email_refresh@example.com', 'test_username_refresh', 'test_password')
  // I.amOnPage('/')
  I.seeElement('#signout-link')
  I.amOnPage('/')
  I.seeElement('#signout-link')
})
