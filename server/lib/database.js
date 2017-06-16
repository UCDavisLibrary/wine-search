var elasticsearch = require('elasticsearch');
var config = require('../config').elasticsearch;

module.exports = new elasticsearch.Client({
  host: `http://${config.username}:${config.password}@${config.host}:${config.port}`,
  log: config.log
});
