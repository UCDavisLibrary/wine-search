var BaseService = require('cork-app-utils').BaseService;
var SearchStore = require('../store/SearchStore');

class SearchService extends BaseService {

  constructor() {
    super();
    this.store = SearchStore;
  }

  search(params = {}) {
    this.store.setSearchLoading(params);
    return this.call({
      request : this.request.post('/search').send(params),
      onSuccess : this.store.setSearchLoaded,
      onError : this.store.setSearchError
    })
  }

  defaultSearch(params = {}) {
    this.store.setDefaultSearchLoading(params);
    return this.call({
      request : this.request.post('/search').send(params),
      onSuccess : this.store.setDefaultSearchLoaded,
      onError : this.store.setDefaultSearchError
    })
  }

  suggest(params = {}) {
    this.store.setSuggestLoading(params);
    return this.call({
      request : this.request.post('/search').send(params),
      onSuccess : this.store.setSuggestLoaded,
      onError : this.store.setSuggestError
    })
  }

}

module.exports = new SearchService();