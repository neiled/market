let Helper = codecept_helper

// use any assertion library you like
let assert = require('assert')

class AuthHelper extends Helper {
  /**
   * checks that authentication cookie is set
   */
  seeAuthentication() {
    // access current client of WebDriverIO helper
    let client = this.helpers['WebDriverIO'].browser
    client.localStorage('POST', {key: 'someKey', value: 'someValue'})
    client.localStorage().then(function (t) {
      console.log(t)
      assert.ok(t, 'Token should exist')
    })
  }
  clearAuthentication() {
    // access current client of WebDriverIO helper
    let client = this.helpers['WebDriverIO'].browser
    client.localStorage('DELETE', 'token')
  }
}

module.exports = AuthHelper
