require('dotenv').config()

import app from './app'

const server = app.listen(3000)
console.log('Server ready on 3000')
console.log("Running in "  + process.env.NODE_ENV + " v" + process.env.npm_package_version)

module.exports = {server: server}