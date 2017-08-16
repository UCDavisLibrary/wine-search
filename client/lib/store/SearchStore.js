var BaseStore = require('cork-app-utils').BaseStore;

class SearchStore extends BaseStore {

  constructor() {
    super();
    this.events = {
      SEARCH_UPDATE : 'search-update',
      DEFAULT_SEARCH_UPDATE : 'default-search-update',
      SUGGEST_UPDATE : 'suggest-update'
    }

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
  // setDefaultSearch(state) {
  //   this.data.defaultSearch = Object.assign({}, this.data.defaultSearch, state);
  //   this.emit(this.events.DEFAULT_SEARCH_UPDATE, this.data.defaultSearch);
  // }

  setDefaultSearchLoading(data) {
    this._setDefaultSearchState({
      state: this.STATE.LOADING, 
      request: data
    });
  }

  setDefaultSearchLoaded(payload) {
    this._setDefaultSearchState({
      state: this.STATE.LOADED,   
      request: this.data.defaultSearch.request,
      payload: payload
    });
  }

  setDefaultSearchError(e) {
    this._setSearchState({
      state: this.STATE.ERROR,   
      request: this.data.defaultSearch.request,
      error: e
    });
  }

  getDefaultSearch() {
    return this.data.defaultSearch;
  }

  _setDefaultSearchState(state) {
    this.data.defaultSearch = Object.assign({}, state);
    this.emit(this.events.DEFAULT_SEARCH_UPDATE, this.data.defaultSearch);
  }


  /**
   * Search
   */
  setSearchLoading(data) {
    this._setSearchState({
      state: this.STATE.LOADING, 
      request: data
    });
  }

  setSearchLoaded(payload) {
    this._setSearchState({
      state: this.STATE.LOADED,   
      request: this.data.search.request,
      payload: payload
    });
  }

  setSearchError(e) {
    this._setSearchState({
      state: this.STATE.ERROR,   
      request: this.data.search.request,
      error: e
    });
  }

  _setSearchState(state) {
    this.data.search = Object.assign({}, state);
    this.emit(this.events.SEARCH_UPDATE, this.data.search);
  }

  getSearch() {
    return this.data.search;
  }


  /**
   * Suggest
   */
  setSuggestLoading(data) {
    this._setSuggestState({
      state: this.STATE.LOADING, 
      request: data
    });
  }

  setSuggestLoaded(payload) {
    this._setSuggestState({
      state: this.STATE.LOADED,   
      request: this.data.suggest.request,
      payload: payload
    });
  }

  setSuggestError(e) {
    this._setSuggestState({
      state: this.STATE.ERROR,   
      request: this.data.suggest.request,
      error: e
    });
  }

  _setSuggestState(state) {
    this.data.suggest = Object.assign({}, state);
    this.emit(this.events.SUGGEST_UPDATE, this.data.suggest);
  }

  getSuggest() {
    return this.data.suggest;
  }
}

module.exports = new SearchStore();