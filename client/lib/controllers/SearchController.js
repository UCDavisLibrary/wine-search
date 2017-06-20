var EventController = require('./EventController');
var model = require('../models/SearchModel');

class SearchController extends EventController {

  constructor() {
    super();
    
    this.handle = {
      search : {
        triggerEvent : 'search-request',
        updateEvent : 'search-request-update'
      },
      getSearch : {
        triggerEvent : 'get-search'
      },
      appendFilter : {
        triggerEvent : 'append-search-filter'
      },
      removeFilter : {
        triggerEvent : 'remove-search-filter'
      },
      addRangeFilter : {
        triggerEvent : 'add-search-range-filter'
      },
      addSuggest : {
        triggerEvent : 'add-search-suggest'
      },
      removeSuggest : {
        triggerEvent : 'remove-search-suggest'
      },
      textSearch : {
        triggerEvent : 'text-search'
      },
      setPaging : {
        triggerEvent : 'set-search-paging'
      }
    }

    this.bind();
  }

  search(e) {
    model.search(e.body);
  }

  searchObserver(state) {
    if( state.response && state.response.error ) {
      console.error(state.response);
    }
    this.eventBus.emit(this.handle.search.updateEvent, state);
  }

  getSearch() {
    return model.getSearch();  
  }

  addRangeFilter(e) {
    return model.addRangeFilter(e.key, e.range, e.exec);
  }

  appendFilter(e) {
    return model.appendFilter(e.key, e.value, e.exec);
  }
  
  removeFilter(e) {
    return model.removeFilter(e.key, e.value, e.exec);
  }

  addSuggest(e) {
    return model.addSuggest(e.key, e.value, e.exec);
  }
  
  removeSuggest(e) {
    return model.removeSuggest(e.key, e.exec);
  }

  textSearch(e) {
    return model.textSearch(e.text, e.options);
  }

  setPaging(e) {
    return model.setPaging(e.from, e.size, e.exec);
  }

}

module.exports = new SearchController();