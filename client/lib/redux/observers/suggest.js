var observer = require('cork-app-utils').ReduxObserver;
var ObserverEventEmitter = require('./ObserverEventEmitter');

var suggest = observer(
  (state) => state.suggest,
  (dispatch, current, previous) => {
    ObserverEventEmitter.onSuggestUpdate(current);
  }
);

module.exports = [suggest];