var actions = require('../actions/suggest').ACTIONS;

var initialState = {
  body : null,
  state : 'init'
};

function set(state, newState) {
  return Object.assign({}, state, newState);
}

function suggest(state = initialState, action) {
  switch (action.type) {
    
    case actions.SUGGEST_REQUEST_START:
      return set(state, {
        body : action.params,
        state : 'loading'
      });
    case actions.SUGGEST_REQUEST_SUCCESS:
      return set(state, {
        body : action.params,
        response : action.response.body,
        state : 'loaded'
      });
    case actions.SUGGEST_REQUEST_FAILURE:
      return set(state, {
        body : action.params,
        error : action.error,
        state : 'error'
      });

    default:
      return state
  }
}
module.exports = suggest;