const db = require('../../db/db')

module.exports = function(done) {
  console.log('bootstrap')
  console.log(process.env.NODE_ENV)
    db.migrate.rollback().then(() => {
      db.migrate.latest().then(() => {
        db.seed.run().then(() => {
          done()
        })
      })
    })
}
