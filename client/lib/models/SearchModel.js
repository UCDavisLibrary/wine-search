var ReduxModel = require('./ReduxModel');
var config = require('../config');
var service = require('../services/search');
var actions = require('../redux/actions/search');


class SearchModel extends ReduxModel {

  search(body) {
    body.aggs = {};

    if( !body.from ) body.from = 0;
    if( !body.size ) body.size = body.from + 10;

    for( var key in config.facets ) {
      body.aggs[key] = {
        terms : { 
          field : key,
          size : config.maxFacetCount
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