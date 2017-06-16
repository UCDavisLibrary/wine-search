var ReduxModel = require('./ReduxModel');
var config = require('../config');
var service = require('../services/search');
var actions = require('../redux/actions/search');


class SearchModel extends ReduxModel {

  search(body) {
    body.aggs = {};

    for( var key in config.facets ) {
      body.aggs[key] = {
        terms : { 
          field : key
        }
      }
    }

    this.dispatch(
      actions.search(body, service)
    );

    return this.getState().search;
  }

}

module.exports = new SearchModel();