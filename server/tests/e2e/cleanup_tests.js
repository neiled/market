const db = require('../../db/db')

module.exports = function(done) {
    console.log('teardown')
    db.migrate.rollback().then(() => {
        db.destroy().then(() => {
            done()
        })
    })
}
