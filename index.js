var barista = new require('barista').Router,
    util = require('util'),
    fs = require('fs')


// Export

module.exports = Router

/**
 * Router that extends barista router
 *
 * @param {Object} Options List of options
 */
function Router(options) {
  this.options = options || {};
  barista.call(this)
}

// Inherit from barista

util.inherits(Router, barista)

/**
 * Callback method for koa middleware
 *
 * @return {Function} Returns generator function
 */
Router.prototype.callback = function() {

  var self = this

  return function *router(next) {

    // Try to get the first match

    var match = self.first(this.request.url, this.request.method)

    // Add router to context

    self.match = match;
    this.router = self;

    // No match found

    if (match === false) {
      yield next
      return
    }

    // Try to get the controller file

    var dir = self.options.directory || ''

    var filename = dir + match.controller + '.js'

    if (!fs.existsSync(filename)) {
      yield next
      return
    }

    // Load controller and check the action method

    var controller = require(filename)

    if (typeof controller[match.action] === 'function') {
      yield controller[match.action]
      return
    }

    // Nothing found

    yield next

  }

}