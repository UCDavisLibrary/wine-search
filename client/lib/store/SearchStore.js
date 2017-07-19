var EventBus = require('cork-app-utils').EventBus;

class SearchStore {

  constructor() {
    this.data = {
      defaultSearch : {
        state : 'init',
        payload : null
      },
      search : {
        state : 'init',
        payload : null,
        request : {}
      },
      suggest : {
        state : 'init',
        payload : null
      }
    }
  }


  /**
   * Default Search
   */
  setDefaultSearch(state) {
    this.data.defaultSearch = Object.assign({}, this.data.defaultSearch, state);
    EventBus.emit('default-search-update', this.data.defaultSearch);
  }

  setDefaultSearchLoading(data) {
    this._setDefaultSearchState({state: 'loading', request: data});
  }

  setDefaultSearchLoaded(payload) {
    this._setDefaultSearchState({
      state: 'loaded',   
      request: this.data.defaultSearch.request,
      payload: payload
    });
  }

  setDefaultSearchError(e) {
    this._setSearchState({
      state: 'error',   
      request: this.data.defaultSearch.request,
      error: e
    });
  }

  getDefaultSearch() {
    return this.data.defaultSearch;
  }

  _setDefaultSearchState(state) {
    this.data.defaultSearch = Object.assign({}, state);
    EventBus.emit('default-search-update', this.data.defaultSearch);
  }


  /**
   * Search
   */
  setSearchLoading(data) {
    this._setSearchState({state: 'loading', request: data});
  }

  setSearchLoaded(payload) {
    this._setSearchState({
      state: 'loaded',   
      request: this.data.search.request,
      payload: payload
    });
  }

  setSearchError(e) {
    this._setSearchState({
      state: 'error',   
      request: this.data.search.request,
      error: e
    });
  }

  _setSearchState(state) {
    this.data.search = Object.assign({}, state);
    EventBus.emit('search-update', this.data.search);
  }

  getSearch() {
    return this.data.search;
  }


  /**
   * Suggest
   */
  setSuggestLoading(data) {
    this._setSuggestState({state: 'loading', request: data});
  }

  setSuggestLoaded(payload) {
    this._setSuggestState({
      state: 'loaded',   
      request: this.data.suggest.request,
      payload: payload
    });
  }

  setSuggestError(e) {
    this._setSuggesthState({
      state: 'error',   
      request: this.data.suggest.request,
      error: e
    });
  }

  _setSuggestState(state) {
    this.data.suggest = Object.assign({}, state);
    EventBus.emit('suggest-update', this.data.suggest);
  }

  getSuggest() {
    return this.data.suggest;
  }
}

module.exports = new SearchStore();