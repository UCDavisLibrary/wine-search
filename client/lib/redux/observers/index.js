/**
 * Observe the redux store and send change events to UI
 */
var observe = require('redux-observers').observe;

var observers = []
          .concat(require('./search'))
          .concat(require('./suggest'));


module.exports = function(store) {
  observe(store, observers);
}