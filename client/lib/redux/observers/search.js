var observer = require('redux-observers').observer;
var controller = require('../../controllers/SearchController');

var search = observer(
  (state) => state.search,
  (dispatch, current, previous) => {
    controller.searchObserver(current);
  }
);

module.exports = [search];