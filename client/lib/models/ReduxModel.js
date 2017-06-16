

class ReduxModel {

  get store() {
    if( this._store ) return this._store;
    this._store = require('../redux/store');
    return this._store;
  }

  dispatch(action) {
    this.store.dispatch(action);
  }

  getState() {
    return this.store.getState();
  }

}

module.exports = ReduxModel;