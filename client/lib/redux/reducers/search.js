var actions = require('../actions/search').ACTIONS;

var initialState = {
  body : null,
  state : 'init'
};

function set(state, newState) {
  return Object.assign({}, state, newState);
}

function search(state = initialState, action) {
  switch (action.type) {
    
    case actions.SEARCH_REQUEST_START:
      return set(state, {
        body : action.params,
        state : 'loading'
      });
    case actions.SEARCH_REQUEST_SUCCESS:
      return set(state, {
        body : action.params,
        response : action.response.body,
        state : 'loaded'
      });
    case actions.SEARCH_REQUEST_FAILURE:
      return set(state, {
        body : action.params,
        error : action.error,
        state : 'error'
      });

    default:
      return state
  }
}
module.exports = search;