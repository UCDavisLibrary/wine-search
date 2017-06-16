var Events = require('events').EventEmitter;
var events = new Events();
events.setMaxListeners(10000);
module.exports = events;