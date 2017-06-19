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
      if( config.facets[key].type === 'facet' ) {
        body.aggs[key] = {
          terms : { 
            field : key,
            size : config.maxFacetCount
          }
        }
      } else if( config.facets[key].type === 'range' ) {
        body.aggs[key+'-min'] = {
          min : { 
            field : key
          }
        }
        body.aggs[key+'-max'] = {
          max : { 
            field : key
          }
        }
      }
    }

    this.dispatch(
      actions.search(body, service)
    );

    return this.getSearch();
  }

  getSearch() {
    return this.getState().search;
  }

  appendFilter(key, value, exec) {
    this.ensureBoolTerms();
    var body = this.getSearch().body;

    if( !body.query.bool.filter.terms[key] ) {
      body.query.bool.filter.terms[key] = [value];
    } else {
      body.query.bool.filter.terms[key].push(value);
    }

    if( exec ) this.search(body);

    return body;
  }

  removeFilter(key, value, exec) {
    this.ensureBoolTerms();
    var body = this.getSearch().body;

    var arr = body.query.bool.filter.terms[key];
    if( arr ) {
      if( arr.indexOf(value) > -1 ) {
        arr.splice(arr.indexOf(value), 1);
      }

      if( arr.length === 0 ) {
        delete body.query.bool.filter.terms[key];
      }
    }

    if( Object.keys(body.query.bool.filter.terms).length === 0 ) {
      delete body.query.bool.filter.terms;
    }
    if( Object.keys(body.query.bool.filter).length === 0 ) {
      delete body.query.bool.filter;
    }
    if( Object.keys(body.query.bool).length === 0 ) {
      delete body.query.bool;
    }
    if( Object.keys(body.query).length === 0 ) {
      delete body.query;
    }

    if( exec ) this.search(body);

    return body;
  }

  addRangeFilter(key, range, exec) {
    this.ensureBoolRange();
    var body = this.getSearch().body;

    body.query.bool.must.range[key] = {};
    if( range.min !== undefined ) {
      body.query.bool.must.range[key].gte = range.min;
    }
    if( range.max ) {
      body.query.bool.must.range[key].lte = range.max;
    }

    if( exec ) this.search(body);

    return body;
  }

  addSuggest(key, value, exec) {
    var body = this.getSearch().body;

    if( !body.suggest ) body.suggest = {};
    body.suggest[key] = {
      prefix : value,
      completion : {
        field : key,
        fuzzy : {}
      }
    }

    if( exec ) this.search(body);

    return body;
  }

  removeSuggest(key, exec) {
    var body = this.getSearch().body;

    if( body.suggest ) {
      if( body.suggest[key] ) {
        delete body.suggest[key];
      }
    }

    if( exec ) this.search(body);

    return body;
  }

  textSearch(text, options = {}) {
    var body = this.getSearch().body;

    if( !text ) {
      if( body.query && body.query.bool && body.query.bool.must ) {
        delete body.query.bool.must;
        if( Object.keys(body.query.bool).length === 0 ) {
          delete body.query;
        }
      }
      if( options.exec ) this.search(body);

      return body;
    }

    if( !body.query ) body.query = {};
    if( !body.query.bool ) body.query.bool = {};
    if( !body.query.bool.must ) body.query.bool.must = {};
    if( !body.query.bool.must.match ) body.query.bool.must.match = {};

    body.query.bool.must.match.name = text;

    if( options.exec ) this.search(body);

    return body;
  }

  ensureBoolText() {
    var body = this.getSearch().body;
    if( !body.query ) body.query = {};
    if( !body.query.bool ) body.query.bool = {};
    if( !body.query.bool.must ) body.query.must = {};
    if( !body.query.bool.must.match ) body.query.must.match = {};
  }

  ensureBoolRange() {
    var body = this.getSearch().body;
    if( !body.query ) body.query = {};
    if( !body.query.bool ) body.query.bool = {};
    if( !body.query.bool.must ) body.query.bool.must = {};
    if( !body.query.bool.must.range ) body.query.bool.must.range = {};
  }

  ensureBoolTerms() {
    var body = this.getSearch().body;
    if( !body.query ) body.query = {};
    if( !body.query.bool ) body.query.bool = {};
    if( !body.query.bool.filter ) body.query.bool.filter = {};
    if( !body.query.bool.filter.terms ) body.query.bool.filter.terms = {};
  }

}

module.exports = new SearchModel();