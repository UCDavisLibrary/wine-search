
class ServiceWrapper {

  /**
   * 
   * @param {Object} options
   * @param {Function} options.loading
   * @param {Object} options.request
   * @param {Function} options.onError
   * @param {Function} options.onSuccess
   */
  static call(options) {
    options
      .request
      .then(resp => {
       if( resp.status !== 200 || (resp.body && resp.body.error) ) {
        options.onError.call(options.store, resp.payload);
       } else {
        options.onSuccess.call(options.store, resp.body);
       }
      })
      .catch(e => options.onError.call(options.store, e));
  }
}

module.exports = ServiceWrapper;