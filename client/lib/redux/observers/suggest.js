var observer = require('redux-observers').observer;
var controller = require('../../controllers/SearchController');

var suggest = observer(
  (state) => state.suggest,
  (dispatch, current, previous) => {
    controller.suggestObserver(current);
  }
);

module.exports = [suggest];