module.exports = function() {
  return actor({

    signup: function(email, username) {
      this.amOnPage('/')
      this.click('Sign Up')
      this.fillField('email', email)
      this.fillField('username', username)
      this.fillField('password', 'test_pass')
      this.fillField('password_confirmation', 'test_pass')
      this.click('Sign Up')
    }
  })
}
