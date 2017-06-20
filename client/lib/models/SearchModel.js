var ReduxModel = require('./ReduxModel');
var config = require('../config');
var service = require('../services/search');
var actions = require('../redux/actions/search');


class SearchModel extends ReduxModel {

  constructor() {
    super();

    this.from = 0;
    this.size = 10;
  }

  search(body) {
    body.aggs = {};

    body.from = this.from;
    body.size = this.size;

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

  setPaging(from = 0, size = 10, exec) {
    this.from = from;
    this.size = size;

    if( exec ) this.search(this.getSearch().body);
  }

  appendFilter(key, value, exec) {
    this.ensurePath('query.bool.filter.terms');
    var body = this.getSearch().body;

    if( !body.query.bool.filter.terms[key] ) {
      body.query.bool.filter.terms[key] = [value];
    } else {
      body.query.bool.filter.terms[key].push(value);
    }

    if( exec ) {
      this.setPaging(); // reset page
      this.search(body);
    }

    return body;
  }

  removeFilter(key, value, exec) {
    this.ensurePath('query.bool.filter.terms');
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

    this.cleanEmptyLeaves();
    if( exec ) {
      this.setPaging(); // reset page
      this.search(body);
    }

    return body;
  }

  removeRangeFilter(key, exec) {
    this.ensurePath('query.bool.must', []);
    var body = this.getSearch().body;

    for( var i = 0; i < body.query.bool.must.length; i++ ) {
      if( body.query.bool.must.range ) {

        if( body.query.bool.must.range[key] ) {
          delete body.query.bool.must.range[key];
        }

        break;
      }
    }

    this.cleanEmptyLeaves();
    if( options.exec ) {
      this.setPaging(); // reset page
      this.search(body);
    }

    return body;
  }

  addRangeFilter(key, range, exec) {
    this.ensurePath('query.bool.must', []);
    var body = this.getSearch().body;
    var rangeQuery = this.getOrCreateFromArray(body.query.bool.must, 'range');

    rangeQuery[key] = {};
    if( range.min !== undefined ) {
      rangeQuery[key].gte = range.min;
    }
    if( range.max ) {
      rangeQuery[key].lte = range.max;
    }

    if( exec ) {
      this.setPaging(); // reset page
      this.search(body);
    }

    return body;
  }

  addSuggest(key, value, exec) {
    this.ensurePath('suggest');
    var body = this.getSearch().body;

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

    if( body.suggest && body.suggest[key] ) {
      delete body.suggest[key];
    }

    this.cleanEmptyLeaves();
    if( exec ) this.search(body);

    return body;
  }

  textSearch(text, options = {}) {
    var body = this.getSearch().body;

    this.ensurePath('query.bool.must', []);

    if( !text ) {
      this.removeFromArray(body.query.bool.must, 'match');
      this.cleanEmptyLeaves();
      if( options.exec ) this.search(body);
      return body;
    }

    var match = this.getOrCreateFromArray(body.query.bool.must, 'match');
    match.name = text;
    if( options.exec ) {
      this.setPaging(); // reset page
      this.search(body);
    }

    return body;
  }

  /**
   * Clean query
   * Remove any leaf nodes in object that do not contain information
   */
  cleanEmptyLeaves() {
    var body = this.getSearch().body;
    for( var key in body ) {
      if( typeof body[key] === 'object' ) {
        this._cleanEmptyLeaves(body, key);
      }
    }
  }

  _cleanEmptyLeaves(parent, parentKey) {
    var object = parent[parentKey];

    for( var key in object ) {
      if( Array.isArray(object[key]) ) {
        for( var i = object[key].length-1; i >= 0; i-- ) {
          this._cleanEmptyLeaves(object[key], i);
        }
        if( object[key].length === 0 ) {
          delete object[key];
        }
      } else if( typeof object[key] === 'object' ) {
        this._cleanEmptyLeaves(object, key);
      } else if( object[key] === null || object[key] === undefined ) {
        delete object[key];
      }
    }

    if( Object.keys(object).length === 0 ) {
      if( Array.isArray(parent) ) {
        parent.splice(parent.indexOf(object), 1);
      } else {
        delete parent[parentKey];
      }
    }
  }

  /**
   * Ensure given path string exists in query body
   */
  ensurePath(path, last = {}) {
    var object = this.getSearch().body;
    path.split('.')
        .forEach((part, index, arr) => {
          if( !object[part] ) {
            if( arr.length-1 === index ) object[part] = last;
            else object[part] = {};
          }
          object = object[part];
        });
    

  }

  getOrCreateFromArray(array, type) {
    for( var i = 0; i < array.length; i++ ) {
      if( array[i][type] ) {
        return array[i][type];
      }
    }

    var obj = {
      [type] : {}
    }
    array.push(obj);
    return obj[type];
  }

  removeFromArray(array, type) {
    for( var i = 0; i < array.length; i++ ) {
      if( array[i][type] ) {
        array.splice(i, 1);
        return;
      }
    }
  }

}

module.exports = new SearchModel();