 var environment = process.env.NODE_ENV || 'development'
import config from '../knexfile'

 module.exports = require('knex')(config[environment])