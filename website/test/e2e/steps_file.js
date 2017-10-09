module.exports = function() {
  return actor({

    signup: function(email, username, password) {
      this.amOnPage('/')
      this.click('Sign Up')
      this.fillField('email', email)
      this.fillField('username', username)
      this.fillField('password', password)
      this.fillField('password_confirmation', password)
      this.click('Sign Up')
    }
  })
}
