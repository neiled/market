var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

let api_url = '"http://localhost:3000"'
if(process.env.API_URL) { api_url = '\'' + process.env.API_URL + '\'' }


module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: api_url
})
