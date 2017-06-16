/**
 * Handles HTTP service requests
 */
module.exports = function(store) {
  var dispatch = store.dispatch;

  return function(next) {
    return function(action) {

      const {
        api,
        types,
        callAPI,
        shouldCallAPI = () => true,
        select,
        shouldSelect = () => true,
        payload = {}
      } = action

      if (!types) {
        // Normal action: pass it on
        return next(action);
      }

      // All actions that flow through the API middleware should have
      // a type array with 3 values.  Request, success and failure action
      // types.
      if (
        !Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')
      ) {
        throw new Error('Expected an array of three string types.')
      }

      if (typeof callAPI !== 'function') {
        throw new Error('Expected callAPI to be a function.')
      }

      if( select && shouldSelect(store.getState()) ) {
        dispatch(Object.assign({}, payload, {
          type: select
        }))
      }

      // does this API need to be called?  Perhaps data has already been 
      // loaded.  This allows caller to define this answer.
      if (!shouldCallAPI(store.getState())) {
        return;
      }

      const [ requestType, successType, failureType ] = types

      // set the request event
      dispatch(Object.assign({}, payload, {
        type: requestType
      }))

      // actually call the API
      callAPI()
        .then((response) => {
          dispatch(Object.assign({}, payload, {
            response,
            type: successType
          }));
        })
        .catch((error) => {
          dispatch(Object.assign({}, payload, {
              error,
              type: failureType
          }));
        });
    }
  }
}