var EventController = require('./EventController');
var model = require('../models/SearchModel');

class SearchController extends EventController {

  constructor() {
    super();
    
    this.handle = {
      search : {
        triggerEvent : 'search-request',
        updateEvent : 'search-request-update'
      }
    }

    this.bind();
  }

  search(e) {
    model.search(e.body);
  }

  searchObserver(state) {
    this.eventBus.emit(this.handle.search.updateEvent, state);
  }

}

module.exports = new SearchController();