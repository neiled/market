require('dotenv').config()

import app from './app'

const port = process.env.PORT || 3000
const server = app.listen(port)
console.log('Server ready on ' + port)
console.log("Running in "  + process.env.NODE_ENV + " v" + process.env.npm_package_version)

module.exports = {server: server}