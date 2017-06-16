var bulk = require('bulk-require');
var path = require('path');

var App = bulk(path.join(__dirname, '..', 'lib'), [ '**/*.js']);

/**
 * Set global namespace
 */
window.App = App;
window.EventBus = App.eventBus;
window.EventBusClass = App.eventBus.behavior;