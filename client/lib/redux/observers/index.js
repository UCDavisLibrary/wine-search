/**
 * Observe the redux store and send change events to UI
 */
var observe = require('redux-observers').observe;

var observers = []
          .concat(require('./search'));


module.exports = function(store) {
  observe(store, observers);
}