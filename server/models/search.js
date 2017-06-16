var db = require('../lib/database');
var config = require('../config');

class DBSearch {

  search(body) {
    return db.search({
      index : config.elasticsearch.index,
      body : body
    });
  }

}

module.exports = new DBSearch();