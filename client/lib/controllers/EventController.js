var eventBus = require('../eventBus');
var observer = require('redux-observers').observer;

class EventController {
  constructor() {
    this.eventBus = eventBus;
    this.observer = observer;
  }

  bind() {
    if( !this.handle ) {
      console.warn('EventController attempting to wire events, but none given');
    }

    for( var fn in this.handle ) {
      if( !this[fn] ) {
        console.warn(`EventController attempting to wire event: ${this.handle[fn].triggerEvent}, but method ${fn} does not exist on class`);
        continue;
      }

      this.eventBus.on(this.handle[fn].triggerEvent, (e) => {
        var response = this[fn].call(this, e);
        if( e.handler ) e.handler(response);
      });
    }
  }
}

module.exports = EventController;