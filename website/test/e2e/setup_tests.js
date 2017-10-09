const event = require('codeceptjs').event

module.exports = function() {

  event.dispatcher.on(event.all.before, function () {


  })
}
