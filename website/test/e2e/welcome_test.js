
Feature('Welcome')

Scenario('test something', (I) => {
  I.amOnPage('/')
  I.see('Welcome')
})
