/**
 * Wire up our redux store with middleware, reducers and observers.
 */
var redux = require('redux');

var middleware = redux
                    .applyMiddleware(
                      require('./middleware/api')
                    )

var store = redux
              .createStore(
                  require('./reducers'),
                  middleware
                );

require('./observers')(store);

module.exports = store;