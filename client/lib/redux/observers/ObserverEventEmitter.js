var EventBus = require('cork-app-utils').EventBus;

class ObserverEventEmitter {

  static onSearchUpdate(state) {
    EventBus.emit('search-request-update', state);
  }

  static onSuggestUpdate(state) {
    EventBus.emit('suggest-request-update', state);
  }
}

module.exports = ObserverEventEmitter;