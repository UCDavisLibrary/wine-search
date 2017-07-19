var bulk = require('bulk-require');
var path = require('path');


window.EventBus = require('cork-app-utils').EventBus;
window.BaseModel = require('cork-app-utils').BaseModel;
window.App = bulk(path.join(__dirname, '..', 'lib'), [ '**/*.js']);