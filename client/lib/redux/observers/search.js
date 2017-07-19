var observer = require('cork-app-utils').ReduxObserver;
var ObserverEventEmitter = require('./ObserverEventEmitter');

var search = observer(
  (state) => state.search,
  (dispatch, current, previous) => {
    ObserverEventEmitter.onSearchUpdate(current);
  }
);

module.exports = [search];