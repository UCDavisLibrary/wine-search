var ACTIONS = {
  SUGGEST_REQUEST_START: 'SUGGEST_REQUEST_START',
  SUGGEST_REQUEST_SUCCESS: 'SUGGEST_REQUEST_SUCCESS',
  SUGGEST_REQUEST_FAILURE: 'SUGGEST_REQUEST_FAILURE'
}

function suggest(params = {}, service) {
  return {
    types: [ACTIONS.SUGGEST_REQUEST_START, ACTIONS.SUGGEST_REQUEST_SUCCESS, ACTIONS.SUGGEST_REQUEST_FAILURE],
    shouldCallAPI: (state) => {
      return true;
    },
    callAPI: () => { 
      return service.search(params);
    },
    payload: {
      params : params
    }
  }
}

module.exports = {
  ACTIONS,
  suggest
}