var ACTIONS = {
  SEARCH_REQUEST_START: 'SEARCH_REQUEST_START',
  SEARCH_REQUEST_SUCCESS: 'SEARCH_REQUEST_SUCCESS',
  SEARCH_REQUEST_FAILURE: 'SEARCH_REQUEST_FAILURE'
}

function search(params = {}, service) {
  return {
    types: [ACTIONS.SEARCH_REQUEST_START, ACTIONS.SEARCH_REQUEST_SUCCESS, ACTIONS.SEARCH_REQUEST_FAILURE],
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
  search
}