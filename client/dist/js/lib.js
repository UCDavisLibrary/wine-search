(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var path = require('path');

window.EventBus = require('cork-app-utils').EventBus;
window.BaseModel = require('cork-app-utils').BaseModel;
window.App = { "config": require("../lib/config.js"), "models": { "ConfigModel": require("../lib/models/ConfigModel.js"), "SearchModel": require("../lib/models/SearchModel.js") }, "services": { "search": require("../lib/services/search.js"), "utils": require("../lib/services/utils.js") }, "store": { "SearchStore": require("../lib/store/SearchStore.js") } };

},{"../lib/config.js":2,"../lib/models/ConfigModel.js":3,"../lib/models/SearchModel.js":4,"../lib/services/search.js":5,"../lib/services/utils.js":6,"../lib/store/SearchStore.js":7,"cork-app-utils":9,"path":16}],2:[function(require,module,exports){
'use strict';

module.exports = {
  // facets to show on left side
  // filter : label
  facets: {
    'color.raw': {
      label: 'Color',
      type: 'facet'
    },
    'wine_type.raw': {
      label: 'Wine Type',
      type: 'facet'
    },
    vintage: {
      label: 'Vintage',
      type: 'range'
    },
    publication_date: {
      label: 'Published',
      type: 'range'
    },
    perprice: {
      label: 'Bottle Price',
      type: 'range',
      isDollar: true
    },
    'country.raw': {
      label: 'Country',
      type: 'facet'
    },
    'bottle_type.raw': {
      label: 'Bottle Size',
      type: 'facet'
    }
  },

  // max number of facets filter options
  maxFacetCount: 10
};

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseModel = require('cork-app-utils').BaseModel;
var config = require('../config');

var ConfigModel = function (_BaseModel) {
  _inherits(ConfigModel, _BaseModel);

  function ConfigModel() {
    _classCallCheck(this, ConfigModel);

    var _this = _possibleConstructorReturn(this, (ConfigModel.__proto__ || Object.getPrototypeOf(ConfigModel)).call(this));

    _this.registerIOC('ConfigModel');
    return _this;
  }

  _createClass(ConfigModel, [{
    key: 'get',
    value: async function get() {
      return config;
    }
  }]);

  return ConfigModel;
}(BaseModel);

module.exports = new ConfigModel();

},{"../config":2,"cork-app-utils":9}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseModel = require('cork-app-utils').BaseModel;
var config = require('../config');
var SearchService = require('../services/search');
var SearchStore = require('../store/SearchStore');
var ServiceWrapper = require('../services/utils');

var SearchModel = function (_BaseModel) {
  _inherits(SearchModel, _BaseModel);

  function SearchModel() {
    _classCallCheck(this, SearchModel);

    var _this = _possibleConstructorReturn(this, (SearchModel.__proto__ || Object.getPrototypeOf(SearchModel)).call(this));

    _this.store = SearchStore;
    _this.service = SearchService;

    _this.from = 0;
    _this.size = 10;
    _this.sort = {
      key: '',
      order: ''
    };

    _this.defaultSearch();

    _this.registerIOC('SearchModel');
    return _this;
  }

  /**
   * Triggers search-update event
   */


  _createClass(SearchModel, [{
    key: 'search',
    value: function search() {
      var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      body.aggs = {};

      body.from = this.from;
      body.size = this.size;

      if (this.sort.key) {
        body.sort = [_defineProperty({}, this.sort.key, this.sort.order)];
      } else if (body.sort) {
        delete body.sort;
      }

      this._addFacetsToBody(body);

      return this.service.search(body);
    }
  }, {
    key: 'defaultSearch',
    value: function defaultSearch() {
      var body = {
        aggs: {},
        from: 0,
        size: this.size
      };

      for (var key in config.facets) {
        if (config.facets[key].type === 'facet') {
          body.aggs[key] = {
            terms: {
              field: key,
              size: 1000
            }
          };
        } else if (config.facets[key].type === 'range') {
          body.aggs[key + '-min'] = {
            min: {
              field: key
            }
          };
          body.aggs[key + '-max'] = {
            max: {
              field: key
            }
          };
        }
      }

      return this.service.defaultSearch(body);
    }
  }, {
    key: '_addFacetsToBody',
    value: function _addFacetsToBody(body) {
      for (var key in config.facets) {
        if (config.facets[key].type === 'range') {
          body.aggs[key + '-min'] = {
            min: {
              field: key
            }
          };
          body.aggs[key + '-max'] = {
            max: {
              field: key
            }
          };
        }
      }
    }
  }, {
    key: 'getDefaultSearch',
    value: function getDefaultSearch() {
      var currentState = this.getState().defaultSearch;
    }
  }, {
    key: 'getSearch',
    value: function getSearch() {
      return this.store.getSearch();
    }
  }, {
    key: 'getDefaultSearch',
    value: function getDefaultSearch() {
      return this.store.getDefaultSearch();
    }
  }, {
    key: 'getSuggest',
    value: function getSuggest() {
      return this.store.getSuggest();
    }
  }, {
    key: 'setSort',
    value: function setSort(key, order, exec) {
      this.sort = { key: key, order: order };
      if (exec) this.search(this.getSearch().request);
    }
  }, {
    key: 'setPaging',
    value: function setPaging() {
      var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
      var exec = arguments[2];

      this.from = from;
      this.size = size;

      if (exec) this.search(this.getSearch().request);
    }
  }, {
    key: 'clearFilters',
    value: function clearFilters() {
      var body = this.getSearch().request;
      if (body.query) delete body.query;

      this.setPaging(); // reset page
      this.search(body);
      return body;
    }
  }, {
    key: 'appendFilter',
    value: function appendFilter(key, value, exec) {
      this.ensurePath('query.bool.filter', []);
      var body = this.getSearch().request;

      var arr = body.query.bool.filter;
      var updated = false;

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].terms[key]) {
          arr[i].terms[key].push(value);
          updated = true;
          break;
        }
      }

      if (!updated) {
        arr.push({
          terms: _defineProperty({}, key, [value])
        });
      }

      if (exec) {
        this.setPaging(); // reset page
        this.search(body);
      }

      return body;
    }
  }, {
    key: 'removeFilter',
    value: function removeFilter(key, value, exec) {
      this.ensurePath('query.bool.filter', []);
      var body = this.getSearch().request;

      var arr = body.query.bool.filter;

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].terms[key]) {
          if (arr[i].terms[key].indexOf(value) > -1) {
            arr[i].terms[key].splice(arr[i].terms[key].indexOf(value), 1);
          }
        }
      }

      this.cleanEmptyLeaves();
      if (exec) {
        this.setPaging(); // reset page
        this.search(body);
      }

      return body;
    }
  }, {
    key: 'removeRangeFilter',
    value: function removeRangeFilter(key, exec) {
      this.ensurePath('query.bool.must', []);
      var body = this.getSearch().request;

      for (var i = 0; i < body.query.bool.must.length; i++) {
        if (body.query.bool.must[i].range) {

          if (body.query.bool.must[i].range[key]) {
            delete body.query.bool.must[i].range[key];
          }

          break;
        }
      }

      this.cleanEmptyLeaves();
      if (exec) {
        this.setPaging(); // reset page
        this.search(body);
      }

      return body;
    }
  }, {
    key: 'addRangeFilter',
    value: function addRangeFilter(key, range, exec) {
      this.ensurePath('query.bool.must', []);
      var body = this.getSearch().request;
      var rangeQuery = this.getOrCreateFromArray(body.query.bool.must, 'range', key);

      rangeQuery[key] = {};
      if (range.min !== undefined) {
        rangeQuery[key].gte = range.min;
      }
      if (range.max) {
        rangeQuery[key].lte = range.max;
      }

      if (exec) {
        this.setPaging(); // reset page
        this.search(body);
      }

      return body;
    }
  }, {
    key: 'suggest',
    value: function suggest(text, exec) {
      this.ensurePath('suggest');
      var body = this.getSuggest().request;
      body = { suggest: {} };

      body.suggest['name-suggest'] = {
        prefix: text,
        completion: {
          field: 'name-suggest',
          fuzzy: {}
        }
      };

      return this.service.suggest(body);
    }
  }, {
    key: 'removeSuggest',
    value: function removeSuggest(key, exec) {
      var body = this.getSearch().request;

      if (body.suggest && body.suggest[key]) {
        delete body.suggest[key];
      }

      this.cleanEmptyLeaves();
      if (exec) this.search(body);

      return body;
    }
  }, {
    key: 'textSearch',
    value: function textSearch(text) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var body = this.getSearch().request;

      this.ensurePath('query.bool.must', []);
      this.removeFromArray(body.query.bool.must, 'multi_match');

      if (!text) {
        this.cleanEmptyLeaves();
        if (options.exec) this.search(body);
        return body;
      }

      body.query.bool.must.push({
        multi_match: {
          query: text,
          fields: ['name', 'section']
        }
      });

      if (options.exec) {
        this.setPaging(); // reset page
        this.search(body);
      }

      return body;
    }

    /**
     * Clean query
     * Remove any leaf nodes in object that do not contain information
     */

  }, {
    key: 'cleanEmptyLeaves',
    value: function cleanEmptyLeaves() {
      var body = this.getSearch().request;
      for (var key in body) {
        if (_typeof(body[key]) === 'object') {
          this._cleanEmptyLeaves(body, key);
        }
      }
    }
  }, {
    key: '_cleanEmptyLeaves',
    value: function _cleanEmptyLeaves(parent, parentKey) {
      var object = parent[parentKey];

      for (var key in object) {
        if (Array.isArray(object[key])) {
          for (var i = object[key].length - 1; i >= 0; i--) {
            this._cleanEmptyLeaves(object[key], i);
          }
          if (object[key].length === 0) {
            delete object[key];
          }
        } else if (_typeof(object[key]) === 'object') {
          this._cleanEmptyLeaves(object, key);
        } else if (object[key] === null || object[key] === undefined) {
          delete object[key];
        }
      }

      if (Object.keys(object).length === 0) {
        if (Array.isArray(parent)) {
          parent.splice(parent.indexOf(object), 1);
        } else {
          delete parent[parentKey];
        }
      }
    }

    /**
     * Ensure given path string exists in query body
     */

  }, {
    key: 'ensurePath',
    value: function ensurePath(path) {
      var last = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var object = this.getSearch().request;
      path.split('.').forEach(function (part, index, arr) {
        if (!object[part]) {
          if (arr.length - 1 === index) object[part] = last;else object[part] = {};
        }
        object = object[part];
      });
    }
  }, {
    key: 'getOrCreateFromArray',
    value: function getOrCreateFromArray(array, type, subtype) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][type]) {
          if (subtype) {
            if (array[i][type][subtype]) {
              return array[i][type];
            }
          } else {
            return array[i][type];
          }
        }
      }

      var obj = _defineProperty({}, type, {});
      array.push(obj);
      return obj[type];
    }
  }, {
    key: 'removeFromArray',
    value: function removeFromArray(array, type) {
      for (var i = array.length - 1; i >= 0; i--) {
        if (array[i][type]) {
          array.splice(i, 1);
        }
      }
    }
  }]);

  return SearchModel;
}(BaseModel);

module.exports = new SearchModel();

},{"../config":2,"../services/search":5,"../services/utils":6,"../store/SearchStore":7,"cork-app-utils":9}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseService = require('cork-app-utils').BaseService;
var SearchStore = require('../store/SearchStore');

var SearchService = function (_BaseService) {
  _inherits(SearchService, _BaseService);

  function SearchService() {
    _classCallCheck(this, SearchService);

    var _this = _possibleConstructorReturn(this, (SearchService.__proto__ || Object.getPrototypeOf(SearchService)).call(this));

    _this.store = SearchStore;
    return _this;
  }

  _createClass(SearchService, [{
    key: 'search',
    value: function search() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.store.setSearchLoading(params);
      return this.call({
        request: this.request.post('/search').send(params),
        onSuccess: this.store.setSearchLoaded,
        onError: this.store.setSearchError
      });
    }
  }, {
    key: 'defaultSearch',
    value: function defaultSearch() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.store.setDefaultSearchLoading(params);
      return this.call({
        request: this.request.post('/search').send(params),
        onSuccess: this.store.setDefaultSearchLoaded,
        onError: this.store.setDefaultSearchError
      });
    }
  }, {
    key: 'suggest',
    value: function suggest() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.store.setSuggestLoading(params);
      return this.call({
        request: this.request.post('/search').send(params),
        onSuccess: this.store.setSuggestLoaded,
        onError: this.store.setSuggestError
      });
    }
  }]);

  return SearchService;
}(BaseService);

module.exports = new SearchService();

},{"../store/SearchStore":7,"cork-app-utils":9}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceWrapper = function () {
  function ServiceWrapper() {
    _classCallCheck(this, ServiceWrapper);
  }

  _createClass(ServiceWrapper, null, [{
    key: "call",


    /**
     * 
     * @param {Object} options
     * @param {Function} options.loading
     * @param {Object} options.request
     * @param {Function} options.onError
     * @param {Function} options.onSuccess
     */
    value: function call(options) {
      options.request.then(function (resp) {
        if (resp.status !== 200 || resp.body && resp.body.error) {
          options.onError.call(options.store, resp.payload);
        } else {
          options.onSuccess.call(options.store, resp.body);
        }
      }).catch(function (e) {
        return options.onError.call(options.store, e);
      });
    }
  }]);

  return ServiceWrapper;
}();

module.exports = ServiceWrapper;

},{}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseStore = require('cork-app-utils').BaseStore;

var SearchStore = function (_BaseStore) {
  _inherits(SearchStore, _BaseStore);

  function SearchStore() {
    _classCallCheck(this, SearchStore);

    var _this = _possibleConstructorReturn(this, (SearchStore.__proto__ || Object.getPrototypeOf(SearchStore)).call(this));

    _this.events = {
      SEARCH_UPDATE: 'search-update',
      DEFAULT_SEARCH_UPDATE: 'default-search-update',
      SUGGEST_UPDATE: 'suggest-update'
    };

    _this.data = {
      defaultSearch: {
        state: 'init',
        payload: null
      },
      search: {
        state: 'init',
        payload: null,
        request: {}
      },
      suggest: {
        state: 'init',
        payload: null
      }
    };
    return _this;
  }

  /**
   * Default Search
   */
  // setDefaultSearch(state) {
  //   this.data.defaultSearch = Object.assign({}, this.data.defaultSearch, state);
  //   this.emit(this.events.DEFAULT_SEARCH_UPDATE, this.data.defaultSearch);
  // }

  _createClass(SearchStore, [{
    key: 'setDefaultSearchLoading',
    value: function setDefaultSearchLoading(data) {
      this._setDefaultSearchState({
        state: this.STATE.LOADING,
        request: data
      });
    }
  }, {
    key: 'setDefaultSearchLoaded',
    value: function setDefaultSearchLoaded(payload) {
      this._setDefaultSearchState({
        state: this.STATE.LOADED,
        request: this.data.defaultSearch.request,
        payload: payload
      });
    }
  }, {
    key: 'setDefaultSearchError',
    value: function setDefaultSearchError(e) {
      this._setSearchState({
        state: this.STATE.ERROR,
        request: this.data.defaultSearch.request,
        error: e
      });
    }
  }, {
    key: 'getDefaultSearch',
    value: function getDefaultSearch() {
      return this.data.defaultSearch;
    }
  }, {
    key: '_setDefaultSearchState',
    value: function _setDefaultSearchState(state) {
      this.data.defaultSearch = Object.assign({}, state);
      this.emit(this.events.DEFAULT_SEARCH_UPDATE, this.data.defaultSearch);
    }

    /**
     * Search
     */

  }, {
    key: 'setSearchLoading',
    value: function setSearchLoading(data) {
      this._setSearchState({
        state: this.STATE.LOADING,
        request: data
      });
    }
  }, {
    key: 'setSearchLoaded',
    value: function setSearchLoaded(payload) {
      this._setSearchState({
        state: this.STATE.LOADED,
        request: this.data.search.request,
        payload: payload
      });
    }
  }, {
    key: 'setSearchError',
    value: function setSearchError(e) {
      this._setSearchState({
        state: this.STATE.ERROR,
        request: this.data.search.request,
        error: e
      });
    }
  }, {
    key: '_setSearchState',
    value: function _setSearchState(state) {
      this.data.search = Object.assign({}, state);
      this.emit(this.events.SEARCH_UPDATE, this.data.search);
    }
  }, {
    key: 'getSearch',
    value: function getSearch() {
      return this.data.search;
    }

    /**
     * Suggest
     */

  }, {
    key: 'setSuggestLoading',
    value: function setSuggestLoading(data) {
      this._setSuggestState({
        state: this.STATE.LOADING,
        request: data
      });
    }
  }, {
    key: 'setSuggestLoaded',
    value: function setSuggestLoaded(payload) {
      this._setSuggestState({
        state: this.STATE.LOADED,
        request: this.data.suggest.request,
        payload: payload
      });
    }
  }, {
    key: 'setSuggestError',
    value: function setSuggestError(e) {
      this._setSuggestState({
        state: this.STATE.ERROR,
        request: this.data.suggest.request,
        error: e
      });
    }
  }, {
    key: '_setSuggestState',
    value: function _setSuggestState(state) {
      this.data.suggest = Object.assign({}, state);
      this.emit(this.events.SUGGEST_UPDATE, this.data.suggest);
    }
  }, {
    key: 'getSuggest',
    value: function getSuggest() {
      return this.data.suggest;
    }
  }]);

  return SearchStore;
}(BaseStore);

module.exports = new SearchStore();

},{"cork-app-utils":9}],8:[function(require,module,exports){
'use strict';

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1),
      callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};

},{}],9:[function(require,module,exports){
'use strict';

module.exports = {
  EventBus: require('./lib/EventBus'),
  BaseModel: require('./lib/BaseModel'),
  BaseStore: require('./lib/BaseStore'),
  BaseService: require('./lib/BaseService'),
  StoreServiceWrapper: require('./lib/StoreServiceWrapper'),
  request: require('superagent')
};

},{"./lib/BaseModel":10,"./lib/BaseService":11,"./lib/BaseStore":12,"./lib/EventBus":13,"./lib/StoreServiceWrapper":14,"superagent":18}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventBus = require('./EventBus');

var BaseModel = function () {
  function BaseModel() {
    _classCallCheck(this, BaseModel);
  }

  _createClass(BaseModel, [{
    key: 'registerIOC',
    value: function registerIOC(name) {
      if (!name) {
        console.warn('Name not passed to bindMethods().  This will fail in IE, cause, you know, IE.');
      }

      var className = name || this.__proto__.constructor.name;
      eventBus.registerIOC(className, this);
    }

    /**
     * Have to pass name for IE support.
     */

  }, {
    key: 'bindMethods',
    value: function bindMethods(name) {
      var _this = this;

      if (!name) {
        console.warn('Name not passed to bindMethods().  This will fail in IE, cause, you know, IE.');
      }

      var className = this.__proto__.constructor.name || name;
      var methods = Object.getOwnPropertyNames(this.__proto__);
      methods.forEach(function (method) {
        if (method === 'constructor') return;

        _this._bindMethod(className + '.' + method, method);
      });
    }
  }, {
    key: '_bindMethod',
    value: function _bindMethod(globalName, method) {
      this.eventBus.handleMethod(globalName, this[method].bind(this));
    }
  }, {
    key: 'emit',
    value: function emit(event, payload) {
      this.eventBus.emit(event, payload);
    }
  }, {
    key: 'eventBus',
    get: function get() {
      return eventBus;
    }
  }]);

  return BaseModel;
}();

module.exports = BaseModel;

},{"./EventBus":13}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('superagent');
var StoreSerivceWrapper = require('./StoreServiceWrapper');

var BaseService = function () {
  function BaseService() {
    _classCallCheck(this, BaseService);

    this.request = request;
  }

  /**
   * Help make service calls updating store w/ result
   * 
   * @param {Object} options
   * @param {Object} options.request - superagent promise
   * @param {Object} options.params - optional parameters to pass along to store
   * @param {Function} options.store - Store class (options, will default to this.store)
   * @param {Function} options.onError - Store class method to call onError
   * @param {Function} options.onSuccess - Store class method to call onSuccess
   * @param {Function} options.onSuccessMiddleware - method will be called before onSuccess, result is passed to onSuccess
   */


  _createClass(BaseService, [{
    key: 'call',
    value: function call(options) {
      // inject class store if none provided
      if (!options.store) {
        if (this.store) options.store = this.store;else return console.error(new Error('No store provided'));
      }

      // if we were give promise functions to resolve, use those
      if (options.resolve && options.reject) {
        return StoreSerivceWrapper.call(options);
      }

      // otherwise, use our own promise
      return new Promise(function (resolve, reject) {
        options.resolve = resolve;
        options.reject = reject;

        StoreSerivceWrapper.call(options);
      });
    }
  }]);

  return BaseService;
}();

module.exports = BaseService;

},{"./StoreServiceWrapper":14,"superagent":18}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = require('./EventBus');

var BaseStore = function () {
  function BaseStore() {
    _classCallCheck(this, BaseStore);

    // general states that should be used if possible
    this.STATE = {
      INIT: 'init',
      LOADING: 'loading',
      LOADED: 'loaded',
      ERROR: 'error',
      SAVING: 'saving',
      SAVE_ERROR: 'save-error',
      DELETING: 'deleting',
      DELETE_ERROR: 'delete-error',
      DELETED: 'deleted'
    };
  }

  _createClass(BaseStore, [{
    key: 'emit',
    value: function emit(event, payload) {
      var _this = this;

      setTimeout(function () {
        _this.eventBus.emit(event, payload);
      }, 0);
    }
  }, {
    key: 'eventBus',
    get: function get() {
      return EventBus;
    }
  }]);

  return BaseStore;
}();

module.exports = BaseStore;

},{"./EventBus":13}],13:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events').EventEmitter;

var EventBus = function (_EventEmitter) {
  _inherits(EventBus, _EventEmitter);

  function EventBus() {
    _classCallCheck(this, EventBus);

    var _this = _possibleConstructorReturn(this, (EventBus.__proto__ || Object.getPrototypeOf(EventBus)).call(this));

    _this.setMaxListeners(10000);
    _this.models = {};
    return _this;
  }

  _createClass(EventBus, [{
    key: 'registerIOC',
    value: function registerIOC(name, model) {
      if (this.models[name]) {
        throw new Error('A model has already been registered with name: ' + name);
      }

      this.models[name] = model;
    }
  }, {
    key: 'inject',
    value: function inject(name) {
      if (!this.models[name]) {
        throw new Error('No model has been registered with name: ' + name);
      }

      return this.models[name];
    }

    /**
     * This is what models bind with
     * 
     * @param {*} globalName 
     * @param {*} methodFunction 
     */

  }, {
    key: 'handleMethod',
    value: function handleMethod(globalName, methodFunction) {
      if (this._events[globalName]) {
        throw new Error('Global method already registered: ' + globalName);
      }

      // Note: you can't use arrow function to get arguments object
      _get(EventBus.prototype.__proto__ || Object.getPrototypeOf(EventBus.prototype), 'on', this).call(this, globalName, function () {

        // pop off the promise wrapper arguments
        var resolve = arguments[0];
        var reject = arguments[1];

        // fill up our actual argument array
        var args = [];
        for (var i = 2; i < arguments.length; i++) {
          args.push(arguments[i]);
        }

        try {
          // attempt to call handler with arguments
          var resp = methodFunction.apply(this, args);

          // method returned a promise, just wait for it to resolve
          if (resp && (typeof resp === 'undefined' ? 'undefined' : _typeof(resp)) === 'object' && typeof resp.then === 'function') {
            resp.then(function (result) {
              return resolve(result);
            }).catch(function (error) {
              return reject(error);
            });

            // method returned something other than a promise, resolve now
          } else {
            resolve(resp);
          }

          // badness happened
        } catch (error) {
          reject(error);
        }
      }.bind(this));
    }

    /**
     * This is what elements call
     */

  }, {
    key: 'callMethod',
    value: function callMethod() {
      var _arguments = arguments,
          _this2 = this;

      if (!this._events[arguments[0]]) {
        throw new Error('No global method registered: ' + arguments[0]);
      }

      var args = [arguments[0]];

      return new Promise(function (resolve, reject) {
        args.push(resolve);
        args.push(reject);

        for (var i = 1; i < _arguments.length; i++) {
          args.push(_arguments[i]);
        }

        _get(EventBus.prototype.__proto__ || Object.getPrototypeOf(EventBus.prototype), 'emit', _this2).apply(_this2, args);
      });
    }
  }]);

  return EventBus;
}(EventEmitter);

module.exports = new EventBus();

},{"events":15}],14:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StoreServiceWrapper = function () {
  function StoreServiceWrapper() {
    _classCallCheck(this, StoreServiceWrapper);
  }

  _createClass(StoreServiceWrapper, null, [{
    key: "call",


    /**
     * Help make service calls updating store w/ result
     * 
     * @param {Object} options
     * @param {Object} options.request - superagent promise
     * @param {Object} options.params - optional parameters to pass along to store
     * @param {Function} options.store - Store class
     * @param {Function} options.onError - Store class method to call onError
     * @param {Function} options.onSuccess - Store class method to call onSuccess
     * @param {Function} options.onSuccessMiddleware - method will be called before onSuccess, result is passed to onSuccess
     * @param {Function} options.resolve - resolve a promise when complete (optional)
     * @param {Function} options.reject - reject a promise on error (optional)
     */
    value: function call(options) {
      options.request.then(function (resp) {
        // response set back erro
        if (resp.status >= 300 || resp.body && resp.body.error) {
          resp = resp.body || { status: resp.status };
          options.onError.call(options.store, resp, options.params);
          if (options.reject) options.reject(resp);
        } else {

          if (options.onSuccessMiddleware) {
            resp = options.onSuccessMiddleware(resp);
            options.onSuccess.call(options.store, resp, options.params);
            if (options.resolve) options.resolve(resp);
          } else {
            var result = options.onSuccess.call(options.store, resp.body, options.params);
            if (options.resolve) options.resolve(result || resp.body);
          }
        }
      }).catch(function (e) {
        var result = options.onError.call(options.store, e, options.params);
        if (options.reject) options.reject(result || e);
      });
    }
  }]);

  return StoreServiceWrapper;
}();

module.exports = StoreServiceWrapper;

},{}],15:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function (n) {
  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function (type) {
  var er, handler, len, args, i, listeners;

  if (!this._events) this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler)) return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++) {
      listeners[i].apply(this, args);
    }
  }

  return true;
};

EventEmitter.prototype.addListener = function (type, listener) {
  var m;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function (type, listener) {
  if (!isFunction(listener)) throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function (type, listener) {
  var list, position, length, i;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events || !this._events[type]) return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener || isFunction(list.listener) && list.listener === listener) {
    delete this._events[type];
    if (this._events.removeListener) this.emit('removeListener', type, listener);
  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener) this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function (type) {
  var key, listeners;

  if (!this._events) return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length) {
      this.removeListener(type, listeners[listeners.length - 1]);
    }
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function (type) {
  var ret;
  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function (type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function (emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],16:[function(require,module,exports){
(function (process){
'use strict';

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function splitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function () {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function (path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function (path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function () {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};

// path.relative(from, to)
// posix version
exports.relative = function (from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};

exports.basename = function (path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};

}).call(this,require('_process'))

},{"_process":17}],17:[function(require,module,exports){
'use strict';

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

},{}],18:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') {
  // Browser window
  root = window;
} else if (typeof self !== 'undefined') {
  // Web Worker
  root = self;
} else {
  // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = undefined;
}

var Emitter = require('component-emitter');
var RequestBase = require('./request-base');
var isObject = require('./is-object');
var isFunction = require('./is-function');
var ResponseBase = require('./response-base');
var shouldRetry = require('./should-retry');

/**
 * Noop.
 */

function noop() {};

/**
 * Expose `request`.
 */

var request = exports = module.exports = function (method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
};

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest && (!root.location || 'file:' != root.location.protocol || !root.ActiveXObject)) {
    return new XMLHttpRequest();
  } else {
    try {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {}
    try {
      return new ActiveXObject('Msxml2.XMLHTTP.6.0');
    } catch (e) {}
    try {
      return new ActiveXObject('Msxml2.XMLHTTP.3.0');
    } catch (e) {}
    try {
      return new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {}
  }
  throw Error("Browser-only verison of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim ? function (s) {
  return s.trim();
} : function (s) {
  return s.replace(/(^\s*|\s*$)/g, '');
};

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(function (v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for (var subkey in val) {
        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

request.serializeObject = serialize;

/**
 * Parse the given x-www-form-urlencoded `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] = decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

request.serialize = {
  'application/x-www-form-urlencoded': serialize,
  'application/json': JSON.stringify
};

/**
 * Default parsers.
 *
 *     superagent.parse['application/xml'] = function(str){
 *       return { object parsed from str };
 *     };
 *
 */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return (/[\/+]json\b/.test(mime)
  );
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = this.req.method != 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text') || typeof this.xhr.responseType === 'undefined' ? this.xhr.responseText : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD' ? this._parseBody(this.text ? this.text : this.xhr.response) : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function (str) {
  var parse = request.parse[this.type];
  if (this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object) ? parse(str) : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function () {
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function () {
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch (e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    var new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
        new_err.original = err;
        new_err.response = res;
        new_err.status = res.status;
      }
    } catch (e) {
      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function (type) {
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function (type) {
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function (user, pass, options) {
  if ((typeof pass === 'undefined' ? 'undefined' : _typeof(pass)) === 'object' && pass !== null) {
    // pass is optional and can substitute for options
    options = pass;
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto'
    };
  }

  switch (options.type) {
    case 'basic':
      this.set('Authorization', 'Basic ' + btoa(user + ':' + pass));
      break;

    case 'auto':
      this.username = user;
      this.password = pass;
      break;

    case 'bearer':
      // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', 'Bearer ' + user);
      break;
  }
  return this;
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function (val) {
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function (field, file, options) {
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function () {
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function (err, res) {
  // console.log(this._retries, this._maxRetries)
  if (this._maxRetries && this._retries++ < this._maxRetries && shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function () {
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function () {
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = function () {
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */

Request.prototype._appendQueryString = function () {
  var query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }

  if (this._sort) {
    var index = this.url.indexOf('?');
    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split('&');
      if (isFunction(this._sort)) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function (fn) {
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._appendQueryString();

  return this._end();
};

Request.prototype._end = function () {
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = function () {
    var readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try {
      status = xhr.status;
    } catch (e) {
      status = 0;
    }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function handleProgress(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch (e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field)) xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function (url, data, fn) {
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = function (url, data, fn) {
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = function (url, data, fn) {
  var req = request('OPTIONS', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn) {
  var req = request('DELETE', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function (url, data, fn) {
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = function (url, data, fn) {
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = function (url, data, fn) {
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./is-function":19,"./is-object":20,"./request-base":21,"./response-base":22,"./should-retry":23,"component-emitter":8}],19:[function(require,module,exports){
'use strict';

/**
 * Check if `fn` is a function.
 *
 * @param {Function} fn
 * @return {Boolean}
 * @api private
 */
var isObject = require('./is-object');

function isFunction(fn) {
  var tag = isObject(fn) ? Object.prototype.toString.call(fn) : '';
  return tag === '[object Function]';
}

module.exports = isFunction;

},{"./is-object":20}],20:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === (typeof obj === 'undefined' ? 'undefined' : _typeof(obj));
}

module.exports = isObject;

},{}],21:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout() {
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn) {
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function (val) {
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn) {
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, read, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options) {
  if (!options || 'object' !== (typeof options === 'undefined' ? 'undefined' : _typeof(options))) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for (var option in options) {
    switch (option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count) {
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  return this;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function () {
  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise(function (innerResolve, innerReject) {
      self.end(function (err, res) {
        if (err) innerReject(err);else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
};

RequestBase.prototype.catch = function (cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
};

RequestBase.prototype.ok = function (cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function (res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};

/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function (field) {
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function (field, val) {
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function (field) {
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function (name, val) {

  // name should be either a string or an object.
  if (null === name || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function () {
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function (on) {
  // This is browser-only functionality. Node side is no-op.
  if (on == undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function (n) {
  this._maxRedirects = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function () {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function (data) {
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data ? this._data + '&' + data : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};

/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function (sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function (reason, timeout, errno) {
  if (this._aborted) {
    return;
  }
  var err = new Error(reason + timeout + 'ms exceeded');
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function () {
  var self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function () {
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function () {
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};

},{"./is-object":20}],22:[function(require,module,exports){
'use strict';

/**
 * Module dependencies.
 */

var utils = require('./utils');

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function (field) {
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function (header) {
  // TODO: moar!
  // TODO: make this a util

  // content-type
  var ct = header['content-type'] || '';
  this.type = utils.type(ct);

  // params
  var params = utils.params(ct);
  for (var key in params) {
    this[key] = params[key];
  }this.links = {};

  // links
  try {
    if (header.link) {
      this.links = utils.parseLinks(header.link);
    }
  } catch (err) {
    // ignore
  }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function (status) {
  var type = status / 100 | 0;

  // status / class
  this.status = this.statusCode = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.redirect = 3 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = 4 == type || 5 == type ? this.toError() : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.forbidden = 403 == status;
  this.notFound = 404 == status;
};

},{"./utils":24}],23:[function(require,module,exports){
'use strict';

var ERROR_CODES = ['ECONNRESET', 'ETIMEDOUT', 'EADDRINFO', 'ESOCKETTIMEDOUT'];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
module.exports = function shouldRetry(err, res) {
  if (err && err.code && ~ERROR_CODES.indexOf(err.code)) return true;
  if (res && res.status && res.status >= 500) return true;
  // Superagent timeout
  if (err && 'timeout' in err && err.code == 'ECONNABORTED') return true;
  if (err && 'crossDomain' in err) return true;
  return false;
};

},{}],24:[function(require,module,exports){
'use strict';

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = function (str) {
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = function (str) {
  return str.split(/ *; */).reduce(function (obj, str) {
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = function (str) {
  return str.split(/ *, */).reduce(function (obj, str) {
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = function (header, shouldStripCookie) {
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  if (shouldStripCookie) {
    delete header['cookie'];
  }
  return header;
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvYnVpbGQvZ2xvYi5qcyIsImNsaWVudC9saWIvY29uZmlnLmpzIiwiY2xpZW50L2xpYi9tb2RlbHMvQ29uZmlnTW9kZWwuanMiLCJjbGllbnQvbGliL21vZGVscy9TZWFyY2hNb2RlbC5qcyIsImNsaWVudC9saWIvc2VydmljZXMvc2VhcmNoLmpzIiwiY2xpZW50L2xpYi9zZXJ2aWNlcy91dGlscy5qcyIsImNsaWVudC9saWIvc3RvcmUvU2VhcmNoU3RvcmUuanMiLCJub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yay1hcHAtdXRpbHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yay1hcHAtdXRpbHMvbGliL0Jhc2VNb2RlbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JrLWFwcC11dGlscy9saWIvQmFzZVNlcnZpY2UuanMiLCJub2RlX21vZHVsZXMvY29yay1hcHAtdXRpbHMvbGliL0Jhc2VTdG9yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JrLWFwcC11dGlscy9saWIvRXZlbnRCdXMuanMiLCJub2RlX21vZHVsZXMvY29yay1hcHAtdXRpbHMvbGliL1N0b3JlU2VydmljZVdyYXBwZXIuanMiLCJub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoLWJyb3dzZXJpZnkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2NsaWVudC5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9pcy1mdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvcmVxdWVzdC1iYXNlLmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3Jlc3BvbnNlLWJhc2UuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvc2hvdWxkLXJldHJ5LmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQSxJQUFJLE9BQU8sUUFBUSxNQUFSLENBQVg7O0FBR0EsT0FBTyxRQUFQLEdBQWtCLFFBQVEsZ0JBQVIsRUFBMEIsUUFBNUM7QUFDQSxPQUFPLFNBQVAsR0FBbUIsUUFBUSxnQkFBUixFQUEwQixTQUE3QztBQUNBLE9BQU8sR0FBUCxHQUFjLEVBQUMsVUFBUyxRQUFRLGtCQUFSLENBQVYsRUFBc0MsVUFBVSxFQUFDLGVBQWMsUUFBUSw4QkFBUixDQUFmLEVBQXVELGVBQWMsUUFBUSw4QkFBUixDQUFyRSxFQUFoRCxFQUErSixZQUFZLEVBQUMsVUFBUyxRQUFRLDJCQUFSLENBQVYsRUFBK0MsU0FBUSxRQUFRLDBCQUFSLENBQXZELEVBQTNLLEVBQXdRLFNBQVMsRUFBQyxlQUFjLFFBQVEsNkJBQVIsQ0FBZixFQUFqUixFQUFkOzs7OztBQ05BLE9BQU8sT0FBUCxHQUFpQjtBQUNmO0FBQ0E7QUFDQSxVQUFTO0FBQ1AsaUJBQWM7QUFDWixhQUFRLE9BREk7QUFFWixZQUFPO0FBRkssS0FEUDtBQUtQLHFCQUFrQjtBQUNoQixhQUFRLFdBRFE7QUFFaEIsWUFBTztBQUZTLEtBTFg7QUFTUCxhQUFVO0FBQ1IsYUFBUSxTQURBO0FBRVIsWUFBTztBQUZDLEtBVEg7QUFhUCxzQkFBbUI7QUFDakIsYUFBUSxXQURTO0FBRWpCLFlBQU87QUFGVSxLQWJaO0FBaUJQLGNBQVc7QUFDVCxhQUFRLGNBREM7QUFFVCxZQUFPLE9BRkU7QUFHVCxnQkFBVztBQUhGLEtBakJKO0FBc0JQLG1CQUFnQjtBQUNkLGFBQVEsU0FETTtBQUVkLFlBQU87QUFGTyxLQXRCVDtBQTBCUCx1QkFBb0I7QUFDbEIsYUFBUSxhQURVO0FBRWxCLFlBQU87QUFGVztBQTFCYixH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QUFNLENBQU4sRUFBUyxLQUFULENBQWUsQ0FBZixFQUFrQixDQUFDLENBQW5CLENBQVY7QUFDQSxRQUFJLE1BQU0sTUFBTSxDQUFOLEVBQVMsS0FBVCxDQUFlLE9BQWYsRUFBd0IsQ0FBeEIsRUFBMkIsS0FBM0IsQ0FBaUMsQ0FBakMsRUFBb0MsQ0FBQyxDQUFyQyxDQUFWO0FBQ0EsUUFBSSxHQUFKLElBQVcsR0FBWDtBQUNBLFdBQU8sR0FBUDtBQUNELEdBTk0sRUFNSixFQU5JLENBQVA7QUFPRCxDQVJEOztBQVVBOzs7Ozs7OztBQVFBLFFBQVEsV0FBUixHQUFzQixVQUFTLE1BQVQsRUFBaUIsaUJBQWpCLEVBQW1DO0FBQ3ZELFNBQU8sT0FBTyxjQUFQLENBQVA7QUFDQSxTQUFPLE9BQU8sZ0JBQVAsQ0FBUDtBQUNBLFNBQU8sT0FBTyxtQkFBUCxDQUFQO0FBQ0EsU0FBTyxPQUFPLE1BQVAsQ0FBUDtBQUNBLE1BQUksaUJBQUosRUFBdUI7QUFDckIsV0FBTyxPQUFPLFFBQVAsQ0FBUDtBQUNEO0FBQ0QsU0FBTyxNQUFQO0FBQ0QsQ0FURCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5cbndpbmRvdy5FdmVudEJ1cyA9IHJlcXVpcmUoJ2NvcmstYXBwLXV0aWxzJykuRXZlbnRCdXM7XG53aW5kb3cuQmFzZU1vZGVsID0gcmVxdWlyZSgnY29yay1hcHAtdXRpbHMnKS5CYXNlTW9kZWw7XG53aW5kb3cuQXBwID0gKHtcImNvbmZpZ1wiOnJlcXVpcmUoXCIuLi9saWIvY29uZmlnLmpzXCIpLFwibW9kZWxzXCI6KHtcIkNvbmZpZ01vZGVsXCI6cmVxdWlyZShcIi4uL2xpYi9tb2RlbHMvQ29uZmlnTW9kZWwuanNcIiksXCJTZWFyY2hNb2RlbFwiOnJlcXVpcmUoXCIuLi9saWIvbW9kZWxzL1NlYXJjaE1vZGVsLmpzXCIpfSksXCJzZXJ2aWNlc1wiOih7XCJzZWFyY2hcIjpyZXF1aXJlKFwiLi4vbGliL3NlcnZpY2VzL3NlYXJjaC5qc1wiKSxcInV0aWxzXCI6cmVxdWlyZShcIi4uL2xpYi9zZXJ2aWNlcy91dGlscy5qc1wiKX0pLFwic3RvcmVcIjooe1wiU2VhcmNoU3RvcmVcIjpyZXF1aXJlKFwiLi4vbGliL3N0b3JlL1NlYXJjaFN0b3JlLmpzXCIpfSl9KTsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gZmFjZXRzIHRvIHNob3cgb24gbGVmdCBzaWRlXG4gIC8vIGZpbHRlciA6IGxhYmVsXG4gIGZhY2V0cyA6IHtcbiAgICAnY29sb3IucmF3JyA6IHtcbiAgICAgIGxhYmVsIDogJ0NvbG9yJyxcbiAgICAgIHR5cGUgOiAnZmFjZXQnXG4gICAgfSxcbiAgICAnd2luZV90eXBlLnJhdycgOiB7XG4gICAgICBsYWJlbCA6ICdXaW5lIFR5cGUnLFxuICAgICAgdHlwZSA6ICdmYWNldCdcbiAgICB9LFxuICAgIHZpbnRhZ2UgOiB7XG4gICAgICBsYWJlbCA6ICdWaW50YWdlJyxcbiAgICAgIHR5cGUgOiAncmFuZ2UnXG4gICAgfSxcbiAgICBwdWJsaWNhdGlvbl9kYXRlIDoge1xuICAgICAgbGFiZWwgOiAnUHVibGlzaGVkJyxcbiAgICAgIHR5cGUgOiAncmFuZ2UnXG4gICAgfSxcbiAgICBwZXJwcmljZSA6IHtcbiAgICAgIGxhYmVsIDogJ0JvdHRsZSBQcmljZScsXG4gICAgICB0eXBlIDogJ3JhbmdlJyxcbiAgICAgIGlzRG9sbGFyIDogdHJ1ZVxuICAgIH0sXG4gICAgJ2NvdW50cnkucmF3JyA6IHtcbiAgICAgIGxhYmVsIDogJ0NvdW50cnknLFxuICAgICAgdHlwZSA6ICdmYWNldCdcbiAgICB9LFxuICAgICdib3R0bGVfdHlwZS5yYXcnIDoge1xuICAgICAgbGFiZWwgOiAnQm90dGxlIFNpemUnLFxuICAgICAgdHlwZSA6ICdmYWNldCdcbiAgICB9XG4gIH0sXG4gIFxuICAvLyBtYXggbnVtYmVyIG9mIGZhY2V0cyBmaWx0ZXIgb3B0aW9uc1xuICBtYXhGYWNldENvdW50IDogMTBcbn0iLCJ2YXIgQmFzZU1vZGVsID0gcmVxdWlyZSgnY29yay1hcHAtdXRpbHMnKS5CYXNlTW9kZWw7XG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XG5cbmNsYXNzIENvbmZpZ01vZGVsIGV4dGVuZHMgQmFzZU1vZGVsIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVnaXN0ZXJJT0MoJ0NvbmZpZ01vZGVsJyk7XG4gIH1cblxuICBhc3luYyBnZXQoKSB7XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IENvbmZpZ01vZGVsKCk7IiwidmFyIEJhc2VNb2RlbCA9IHJlcXVpcmUoJ2NvcmstYXBwLXV0aWxzJykuQmFzZU1vZGVsO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xudmFyIFNlYXJjaFNlcnZpY2UgPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy9zZWFyY2gnKTtcbnZhciBTZWFyY2hTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3JlL1NlYXJjaFN0b3JlJyk7XG52YXIgU2VydmljZVdyYXBwZXIgPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy91dGlscycpO1xuXG5jbGFzcyBTZWFyY2hNb2RlbCBleHRlbmRzIEJhc2VNb2RlbCB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0b3JlID0gU2VhcmNoU3RvcmU7XG4gICAgdGhpcy5zZXJ2aWNlID0gU2VhcmNoU2VydmljZTtcblxuICAgIHRoaXMuZnJvbSA9IDA7XG4gICAgdGhpcy5zaXplID0gMTA7XG4gICAgdGhpcy5zb3J0ID0ge1xuICAgICAga2V5IDogJycsXG4gICAgICBvcmRlciA6ICcnXG4gICAgfVxuXG4gICAgdGhpcy5kZWZhdWx0U2VhcmNoKCk7XG5cbiAgICB0aGlzLnJlZ2lzdGVySU9DKCdTZWFyY2hNb2RlbCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIHNlYXJjaC11cGRhdGUgZXZlbnRcbiAgICovXG4gIHNlYXJjaChib2R5ID0ge30pIHtcbiAgICBib2R5LmFnZ3MgPSB7fTtcblxuICAgIGJvZHkuZnJvbSA9IHRoaXMuZnJvbTtcbiAgICBib2R5LnNpemUgPSB0aGlzLnNpemU7XG5cbiAgICBpZiggdGhpcy5zb3J0LmtleSApIHtcbiAgICAgIGJvZHkuc29ydCA9IFt7W3RoaXMuc29ydC5rZXldIDogdGhpcy5zb3J0Lm9yZGVyfV07XG4gICAgfSBlbHNlIGlmKCBib2R5LnNvcnQgKSB7XG4gICAgICBkZWxldGUgYm9keS5zb3J0O1xuICAgIH1cblxuICAgIHRoaXMuX2FkZEZhY2V0c1RvQm9keShib2R5KTtcblxuICAgIHJldHVybiB0aGlzLnNlcnZpY2Uuc2VhcmNoKGJvZHkpO1xuICB9XG5cbiAgZGVmYXVsdFNlYXJjaCgpIHtcbiAgICB2YXIgYm9keSA9IHtcbiAgICAgIGFnZ3MgOiB7fSxcbiAgICAgIGZyb20gOiAwLFxuICAgICAgc2l6ZSA6IHRoaXMuc2l6ZVxuICAgIH07XG5cbiAgICBmb3IoIHZhciBrZXkgaW4gY29uZmlnLmZhY2V0cyApIHtcbiAgICAgIGlmKCBjb25maWcuZmFjZXRzW2tleV0udHlwZSA9PT0gJ2ZhY2V0JyApIHtcbiAgICAgICAgYm9keS5hZ2dzW2tleV0gPSB7XG4gICAgICAgICAgdGVybXMgOiB7IFxuICAgICAgICAgICAgZmllbGQgOiBrZXksXG4gICAgICAgICAgICBzaXplIDogMTAwMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKCBjb25maWcuZmFjZXRzW2tleV0udHlwZSA9PT0gJ3JhbmdlJyApIHtcbiAgICAgICAgYm9keS5hZ2dzW2tleSsnLW1pbiddID0ge1xuICAgICAgICAgIG1pbiA6IHsgXG4gICAgICAgICAgICBmaWVsZCA6IGtleVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBib2R5LmFnZ3Nba2V5KyctbWF4J10gPSB7XG4gICAgICAgICAgbWF4IDogeyBcbiAgICAgICAgICAgIGZpZWxkIDoga2V5XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5kZWZhdWx0U2VhcmNoKGJvZHkpO1xuICB9XG5cbiAgX2FkZEZhY2V0c1RvQm9keShib2R5KSB7XG4gICAgZm9yKCB2YXIga2V5IGluIGNvbmZpZy5mYWNldHMgKSB7XG4gICAgICBpZiggY29uZmlnLmZhY2V0c1trZXldLnR5cGUgPT09ICdyYW5nZScgKSB7XG4gICAgICAgIGJvZHkuYWdnc1trZXkrJy1taW4nXSA9IHtcbiAgICAgICAgICBtaW4gOiB7IFxuICAgICAgICAgICAgZmllbGQgOiBrZXlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5hZ2dzW2tleSsnLW1heCddID0ge1xuICAgICAgICAgIG1heCA6IHsgXG4gICAgICAgICAgICBmaWVsZCA6IGtleVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldERlZmF1bHRTZWFyY2goKSB7XG4gICAgdmFyIGN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKS5kZWZhdWx0U2VhcmNoO1xuICB9XG5cbiAgZ2V0U2VhcmNoKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFNlYXJjaCgpO1xuICB9XG5cbiAgZ2V0RGVmYXVsdFNlYXJjaCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXREZWZhdWx0U2VhcmNoKCk7XG4gIH1cblxuICBnZXRTdWdnZXN0KCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN1Z2dlc3QoKTtcbiAgfVxuXG4gIHNldFNvcnQoa2V5LCBvcmRlciwgZXhlYykge1xuICAgIHRoaXMuc29ydCA9IHtrZXksIG9yZGVyfTtcbiAgICBpZiggZXhlYyApIHRoaXMuc2VhcmNoKHRoaXMuZ2V0U2VhcmNoKCkucmVxdWVzdCk7XG4gIH1cblxuICBzZXRQYWdpbmcoZnJvbSA9IDAsIHNpemUgPSAxMCwgZXhlYykge1xuICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcblxuICAgIGlmKCBleGVjICkgdGhpcy5zZWFyY2godGhpcy5nZXRTZWFyY2goKS5yZXF1ZXN0KTtcbiAgfVxuXG4gIGNsZWFyRmlsdGVycygpIHtcbiAgICB2YXIgYm9keSA9IHRoaXMuZ2V0U2VhcmNoKCkucmVxdWVzdDtcbiAgICBpZiggYm9keS5xdWVyeSApIGRlbGV0ZSBib2R5LnF1ZXJ5O1xuXG4gICAgdGhpcy5zZXRQYWdpbmcoKTsgLy8gcmVzZXQgcGFnZVxuICAgIHRoaXMuc2VhcmNoKGJvZHkpO1xuICAgIHJldHVybiBib2R5O1xuICB9XG5cbiAgYXBwZW5kRmlsdGVyKGtleSwgdmFsdWUsIGV4ZWMpIHtcbiAgICB0aGlzLmVuc3VyZVBhdGgoJ3F1ZXJ5LmJvb2wuZmlsdGVyJywgW10pO1xuICAgIHZhciBib2R5ID0gdGhpcy5nZXRTZWFyY2goKS5yZXF1ZXN0O1xuXG4gICAgdmFyIGFyciA9IGJvZHkucXVlcnkuYm9vbC5maWx0ZXI7XG4gICAgdmFyIHVwZGF0ZWQgPSBmYWxzZTtcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGFycltpXS50ZXJtc1trZXldICkge1xuICAgICAgICBhcnJbaV0udGVybXNba2V5XS5wdXNoKHZhbHVlKTtcbiAgICAgICAgdXBkYXRlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCAhdXBkYXRlZCApIHtcbiAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgdGVybXMgOiB7XG4gICAgICAgICAgW2tleV0gOiBbdmFsdWVdXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmKCBleGVjICkge1xuICAgICAgdGhpcy5zZXRQYWdpbmcoKTsgLy8gcmVzZXQgcGFnZVxuICAgICAgdGhpcy5zZWFyY2goYm9keSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cblxuICByZW1vdmVGaWx0ZXIoa2V5LCB2YWx1ZSwgZXhlYykge1xuICAgIHRoaXMuZW5zdXJlUGF0aCgncXVlcnkuYm9vbC5maWx0ZXInLCBbXSk7XG4gICAgdmFyIGJvZHkgPSB0aGlzLmdldFNlYXJjaCgpLnJlcXVlc3Q7XG5cbiAgICB2YXIgYXJyID0gYm9keS5xdWVyeS5ib29sLmZpbHRlcjtcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGFycltpXS50ZXJtc1trZXldICkge1xuICAgICAgICBpZiggYXJyW2ldLnRlcm1zW2tleV0uaW5kZXhPZih2YWx1ZSkgPiAtMSApIHtcbiAgICAgICAgICBhcnJbaV0udGVybXNba2V5XS5zcGxpY2UoYXJyW2ldLnRlcm1zW2tleV0uaW5kZXhPZih2YWx1ZSksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jbGVhbkVtcHR5TGVhdmVzKCk7XG4gICAgaWYoIGV4ZWMgKSB7XG4gICAgICB0aGlzLnNldFBhZ2luZygpOyAvLyByZXNldCBwYWdlXG4gICAgICB0aGlzLnNlYXJjaChib2R5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9keTtcbiAgfVxuXG4gIHJlbW92ZVJhbmdlRmlsdGVyKGtleSwgZXhlYykge1xuICAgIHRoaXMuZW5zdXJlUGF0aCgncXVlcnkuYm9vbC5tdXN0JywgW10pO1xuICAgIHZhciBib2R5ID0gdGhpcy5nZXRTZWFyY2goKS5yZXF1ZXN0O1xuXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBib2R5LnF1ZXJ5LmJvb2wubXVzdC5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBib2R5LnF1ZXJ5LmJvb2wubXVzdFtpXS5yYW5nZSApIHtcblxuICAgICAgICBpZiggYm9keS5xdWVyeS5ib29sLm11c3RbaV0ucmFuZ2Vba2V5XSApIHtcbiAgICAgICAgICBkZWxldGUgYm9keS5xdWVyeS5ib29sLm11c3RbaV0ucmFuZ2Vba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY2xlYW5FbXB0eUxlYXZlcygpO1xuICAgIGlmKCBleGVjICkge1xuICAgICAgdGhpcy5zZXRQYWdpbmcoKTsgLy8gcmVzZXQgcGFnZVxuICAgICAgdGhpcy5zZWFyY2goYm9keSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cblxuICBhZGRSYW5nZUZpbHRlcihrZXksIHJhbmdlLCBleGVjKSB7XG4gICAgdGhpcy5lbnN1cmVQYXRoKCdxdWVyeS5ib29sLm11c3QnLCBbXSk7XG4gICAgdmFyIGJvZHkgPSB0aGlzLmdldFNlYXJjaCgpLnJlcXVlc3Q7XG4gICAgdmFyIHJhbmdlUXVlcnkgPSB0aGlzLmdldE9yQ3JlYXRlRnJvbUFycmF5KGJvZHkucXVlcnkuYm9vbC5tdXN0LCAncmFuZ2UnLCBrZXkpO1xuXG4gICAgcmFuZ2VRdWVyeVtrZXldID0ge307XG4gICAgaWYoIHJhbmdlLm1pbiAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmFuZ2VRdWVyeVtrZXldLmd0ZSA9IHJhbmdlLm1pbjtcbiAgICB9XG4gICAgaWYoIHJhbmdlLm1heCApIHtcbiAgICAgIHJhbmdlUXVlcnlba2V5XS5sdGUgPSByYW5nZS5tYXg7XG4gICAgfVxuXG4gICAgaWYoIGV4ZWMgKSB7XG4gICAgICB0aGlzLnNldFBhZ2luZygpOyAvLyByZXNldCBwYWdlXG4gICAgICB0aGlzLnNlYXJjaChib2R5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9keTtcbiAgfVxuXG4gIHN1Z2dlc3QodGV4dCwgZXhlYykge1xuICAgIHRoaXMuZW5zdXJlUGF0aCgnc3VnZ2VzdCcpO1xuICAgIHZhciBib2R5ID0gdGhpcy5nZXRTdWdnZXN0KCkucmVxdWVzdDtcbiAgICBib2R5ID0ge3N1Z2dlc3Q6IHt9fTtcblxuICAgIGJvZHkuc3VnZ2VzdFsnbmFtZS1zdWdnZXN0J10gPSB7XG4gICAgICBwcmVmaXggOiB0ZXh0LFxuICAgICAgY29tcGxldGlvbiA6IHtcbiAgICAgICAgZmllbGQgOiAnbmFtZS1zdWdnZXN0JyxcbiAgICAgICAgZnV6enkgOiB7fVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNlcnZpY2Uuc3VnZ2VzdChib2R5KTtcbiAgfVxuXG4gIHJlbW92ZVN1Z2dlc3Qoa2V5LCBleGVjKSB7XG4gICAgdmFyIGJvZHkgPSB0aGlzLmdldFNlYXJjaCgpLnJlcXVlc3Q7XG5cbiAgICBpZiggYm9keS5zdWdnZXN0ICYmIGJvZHkuc3VnZ2VzdFtrZXldICkge1xuICAgICAgZGVsZXRlIGJvZHkuc3VnZ2VzdFtrZXldO1xuICAgIH1cblxuICAgIHRoaXMuY2xlYW5FbXB0eUxlYXZlcygpO1xuICAgIGlmKCBleGVjICkgdGhpcy5zZWFyY2goYm9keSk7XG5cbiAgICByZXR1cm4gYm9keTtcbiAgfVxuXG4gIHRleHRTZWFyY2godGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdmFyIGJvZHkgPSB0aGlzLmdldFNlYXJjaCgpLnJlcXVlc3Q7XG5cbiAgICB0aGlzLmVuc3VyZVBhdGgoJ3F1ZXJ5LmJvb2wubXVzdCcsIFtdKTtcbiAgICB0aGlzLnJlbW92ZUZyb21BcnJheShib2R5LnF1ZXJ5LmJvb2wubXVzdCwgJ211bHRpX21hdGNoJyk7XG5cbiAgICBpZiggIXRleHQgKSB7XG4gICAgICB0aGlzLmNsZWFuRW1wdHlMZWF2ZXMoKTtcbiAgICAgIGlmKCBvcHRpb25zLmV4ZWMgKSB0aGlzLnNlYXJjaChib2R5KTtcbiAgICAgIHJldHVybiBib2R5O1xuICAgIH1cblxuICAgIGJvZHkucXVlcnkuYm9vbC5tdXN0LnB1c2goe1xuICAgICAgbXVsdGlfbWF0Y2ggOiB7XG4gICAgICAgIHF1ZXJ5IDogdGV4dCxcbiAgICAgICAgZmllbGRzIDogWyduYW1lJywgJ3NlY3Rpb24nXVxuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGlmKCBvcHRpb25zLmV4ZWMgKSB7XG4gICAgICB0aGlzLnNldFBhZ2luZygpOyAvLyByZXNldCBwYWdlXG4gICAgICB0aGlzLnNlYXJjaChib2R5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9keTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbiBxdWVyeVxuICAgKiBSZW1vdmUgYW55IGxlYWYgbm9kZXMgaW4gb2JqZWN0IHRoYXQgZG8gbm90IGNvbnRhaW4gaW5mb3JtYXRpb25cbiAgICovXG4gIGNsZWFuRW1wdHlMZWF2ZXMoKSB7XG4gICAgdmFyIGJvZHkgPSB0aGlzLmdldFNlYXJjaCgpLnJlcXVlc3Q7XG4gICAgZm9yKCB2YXIga2V5IGluIGJvZHkgKSB7XG4gICAgICBpZiggdHlwZW9mIGJvZHlba2V5XSA9PT0gJ29iamVjdCcgKSB7XG4gICAgICAgIHRoaXMuX2NsZWFuRW1wdHlMZWF2ZXMoYm9keSwga2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfY2xlYW5FbXB0eUxlYXZlcyhwYXJlbnQsIHBhcmVudEtleSkge1xuICAgIHZhciBvYmplY3QgPSBwYXJlbnRbcGFyZW50S2V5XTtcblxuICAgIGZvciggdmFyIGtleSBpbiBvYmplY3QgKSB7XG4gICAgICBpZiggQXJyYXkuaXNBcnJheShvYmplY3Rba2V5XSkgKSB7XG4gICAgICAgIGZvciggdmFyIGkgPSBvYmplY3Rba2V5XS5sZW5ndGgtMTsgaSA+PSAwOyBpLS0gKSB7XG4gICAgICAgICAgdGhpcy5fY2xlYW5FbXB0eUxlYXZlcyhvYmplY3Rba2V5XSwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIG9iamVjdFtrZXldLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgICBkZWxldGUgb2JqZWN0W2tleV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiggdHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0JyApIHtcbiAgICAgICAgdGhpcy5fY2xlYW5FbXB0eUxlYXZlcyhvYmplY3QsIGtleSk7XG4gICAgICB9IGVsc2UgaWYoIG9iamVjdFtrZXldID09PSBudWxsIHx8IG9iamVjdFtrZXldID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiggT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPT09IDAgKSB7XG4gICAgICBpZiggQXJyYXkuaXNBcnJheShwYXJlbnQpICkge1xuICAgICAgICBwYXJlbnQuc3BsaWNlKHBhcmVudC5pbmRleE9mKG9iamVjdCksIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHBhcmVudFtwYXJlbnRLZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmUgZ2l2ZW4gcGF0aCBzdHJpbmcgZXhpc3RzIGluIHF1ZXJ5IGJvZHlcbiAgICovXG4gIGVuc3VyZVBhdGgocGF0aCwgbGFzdCA9IHt9KSB7XG4gICAgdmFyIG9iamVjdCA9IHRoaXMuZ2V0U2VhcmNoKCkucmVxdWVzdDtcbiAgICBwYXRoLnNwbGl0KCcuJylcbiAgICAgICAgLmZvckVhY2goKHBhcnQsIGluZGV4LCBhcnIpID0+IHtcbiAgICAgICAgICBpZiggIW9iamVjdFtwYXJ0XSApIHtcbiAgICAgICAgICAgIGlmKCBhcnIubGVuZ3RoLTEgPT09IGluZGV4ICkgb2JqZWN0W3BhcnRdID0gbGFzdDtcbiAgICAgICAgICAgIGVsc2Ugb2JqZWN0W3BhcnRdID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIG9iamVjdCA9IG9iamVjdFtwYXJ0XTtcbiAgICAgICAgfSk7XG4gICAgXG5cbiAgfVxuXG4gIGdldE9yQ3JlYXRlRnJvbUFycmF5KGFycmF5LCB0eXBlLCBzdWJ0eXBlKSB7XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBhcnJheVtpXVt0eXBlXSApIHtcbiAgICAgICAgaWYoIHN1YnR5cGUgKSB7XG4gICAgICAgICAgaWYoIGFycmF5W2ldW3R5cGVdW3N1YnR5cGVdICkge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5W2ldW3R5cGVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYXJyYXlbaV1bdHlwZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgb2JqID0ge1xuICAgICAgW3R5cGVdIDoge31cbiAgICB9XG4gICAgYXJyYXkucHVzaChvYmopO1xuICAgIHJldHVybiBvYmpbdHlwZV07XG4gIH1cblxuICByZW1vdmVGcm9tQXJyYXkoYXJyYXksIHR5cGUpIHtcbiAgICBmb3IoIHZhciBpID0gYXJyYXkubGVuZ3RoLTE7IGkgPj0gMDsgaS0tICkge1xuICAgICAgaWYoIGFycmF5W2ldW3R5cGVdICkge1xuICAgICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2VhcmNoTW9kZWwoKTsiLCJ2YXIgQmFzZVNlcnZpY2UgPSByZXF1aXJlKCdjb3JrLWFwcC11dGlscycpLkJhc2VTZXJ2aWNlO1xudmFyIFNlYXJjaFN0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmUvU2VhcmNoU3RvcmUnKTtcblxuY2xhc3MgU2VhcmNoU2VydmljZSBleHRlbmRzIEJhc2VTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RvcmUgPSBTZWFyY2hTdG9yZTtcbiAgfVxuXG4gIHNlYXJjaChwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMuc3RvcmUuc2V0U2VhcmNoTG9hZGluZyhwYXJhbXMpO1xuICAgIHJldHVybiB0aGlzLmNhbGwoe1xuICAgICAgcmVxdWVzdCA6IHRoaXMucmVxdWVzdC5wb3N0KCcvc2VhcmNoJykuc2VuZChwYXJhbXMpLFxuICAgICAgb25TdWNjZXNzIDogdGhpcy5zdG9yZS5zZXRTZWFyY2hMb2FkZWQsXG4gICAgICBvbkVycm9yIDogdGhpcy5zdG9yZS5zZXRTZWFyY2hFcnJvclxuICAgIH0pXG4gIH1cblxuICBkZWZhdWx0U2VhcmNoKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5zdG9yZS5zZXREZWZhdWx0U2VhcmNoTG9hZGluZyhwYXJhbXMpO1xuICAgIHJldHVybiB0aGlzLmNhbGwoe1xuICAgICAgcmVxdWVzdCA6IHRoaXMucmVxdWVzdC5wb3N0KCcvc2VhcmNoJykuc2VuZChwYXJhbXMpLFxuICAgICAgb25TdWNjZXNzIDogdGhpcy5zdG9yZS5zZXREZWZhdWx0U2VhcmNoTG9hZGVkLFxuICAgICAgb25FcnJvciA6IHRoaXMuc3RvcmUuc2V0RGVmYXVsdFNlYXJjaEVycm9yXG4gICAgfSlcbiAgfVxuXG4gIHN1Z2dlc3QocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnN0b3JlLnNldFN1Z2dlc3RMb2FkaW5nKHBhcmFtcyk7XG4gICAgcmV0dXJuIHRoaXMuY2FsbCh7XG4gICAgICByZXF1ZXN0IDogdGhpcy5yZXF1ZXN0LnBvc3QoJy9zZWFyY2gnKS5zZW5kKHBhcmFtcyksXG4gICAgICBvblN1Y2Nlc3MgOiB0aGlzLnN0b3JlLnNldFN1Z2dlc3RMb2FkZWQsXG4gICAgICBvbkVycm9yIDogdGhpcy5zdG9yZS5zZXRTdWdnZXN0RXJyb3JcbiAgICB9KVxuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2VhcmNoU2VydmljZSgpOyIsIlxuY2xhc3MgU2VydmljZVdyYXBwZXIge1xuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5sb2FkaW5nXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnJlcXVlc3RcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5vbkVycm9yXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMub25TdWNjZXNzXG4gICAqL1xuICBzdGF0aWMgY2FsbChvcHRpb25zKSB7XG4gICAgb3B0aW9uc1xuICAgICAgLnJlcXVlc3RcbiAgICAgIC50aGVuKHJlc3AgPT4ge1xuICAgICAgIGlmKCByZXNwLnN0YXR1cyAhPT0gMjAwIHx8IChyZXNwLmJvZHkgJiYgcmVzcC5ib2R5LmVycm9yKSApIHtcbiAgICAgICAgb3B0aW9ucy5vbkVycm9yLmNhbGwob3B0aW9ucy5zdG9yZSwgcmVzcC5wYXlsb2FkKTtcbiAgICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLm9uU3VjY2Vzcy5jYWxsKG9wdGlvbnMuc3RvcmUsIHJlc3AuYm9keSk7XG4gICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlID0+IG9wdGlvbnMub25FcnJvci5jYWxsKG9wdGlvbnMuc3RvcmUsIGUpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZpY2VXcmFwcGVyOyIsInZhciBCYXNlU3RvcmUgPSByZXF1aXJlKCdjb3JrLWFwcC11dGlscycpLkJhc2VTdG9yZTtcblxuY2xhc3MgU2VhcmNoU3RvcmUgZXh0ZW5kcyBCYXNlU3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5ldmVudHMgPSB7XG4gICAgICBTRUFSQ0hfVVBEQVRFIDogJ3NlYXJjaC11cGRhdGUnLFxuICAgICAgREVGQVVMVF9TRUFSQ0hfVVBEQVRFIDogJ2RlZmF1bHQtc2VhcmNoLXVwZGF0ZScsXG4gICAgICBTVUdHRVNUX1VQREFURSA6ICdzdWdnZXN0LXVwZGF0ZSdcbiAgICB9XG5cbiAgICB0aGlzLmRhdGEgPSB7XG4gICAgICBkZWZhdWx0U2VhcmNoIDoge1xuICAgICAgICBzdGF0ZSA6ICdpbml0JyxcbiAgICAgICAgcGF5bG9hZCA6IG51bGxcbiAgICAgIH0sXG4gICAgICBzZWFyY2ggOiB7XG4gICAgICAgIHN0YXRlIDogJ2luaXQnLFxuICAgICAgICBwYXlsb2FkIDogbnVsbCxcbiAgICAgICAgcmVxdWVzdCA6IHt9XG4gICAgICB9LFxuICAgICAgc3VnZ2VzdCA6IHtcbiAgICAgICAgc3RhdGUgOiAnaW5pdCcsXG4gICAgICAgIHBheWxvYWQgOiBudWxsXG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogRGVmYXVsdCBTZWFyY2hcbiAgICovXG4gIC8vIHNldERlZmF1bHRTZWFyY2goc3RhdGUpIHtcbiAgLy8gICB0aGlzLmRhdGEuZGVmYXVsdFNlYXJjaCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGF0YS5kZWZhdWx0U2VhcmNoLCBzdGF0ZSk7XG4gIC8vICAgdGhpcy5lbWl0KHRoaXMuZXZlbnRzLkRFRkFVTFRfU0VBUkNIX1VQREFURSwgdGhpcy5kYXRhLmRlZmF1bHRTZWFyY2gpO1xuICAvLyB9XG5cbiAgc2V0RGVmYXVsdFNlYXJjaExvYWRpbmcoZGF0YSkge1xuICAgIHRoaXMuX3NldERlZmF1bHRTZWFyY2hTdGF0ZSh7XG4gICAgICBzdGF0ZTogdGhpcy5TVEFURS5MT0FESU5HLCBcbiAgICAgIHJlcXVlc3Q6IGRhdGFcbiAgICB9KTtcbiAgfVxuXG4gIHNldERlZmF1bHRTZWFyY2hMb2FkZWQocGF5bG9hZCkge1xuICAgIHRoaXMuX3NldERlZmF1bHRTZWFyY2hTdGF0ZSh7XG4gICAgICBzdGF0ZTogdGhpcy5TVEFURS5MT0FERUQsICAgXG4gICAgICByZXF1ZXN0OiB0aGlzLmRhdGEuZGVmYXVsdFNlYXJjaC5yZXF1ZXN0LFxuICAgICAgcGF5bG9hZDogcGF5bG9hZFxuICAgIH0pO1xuICB9XG5cbiAgc2V0RGVmYXVsdFNlYXJjaEVycm9yKGUpIHtcbiAgICB0aGlzLl9zZXRTZWFyY2hTdGF0ZSh7XG4gICAgICBzdGF0ZTogdGhpcy5TVEFURS5FUlJPUiwgICBcbiAgICAgIHJlcXVlc3Q6IHRoaXMuZGF0YS5kZWZhdWx0U2VhcmNoLnJlcXVlc3QsXG4gICAgICBlcnJvcjogZVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGVmYXVsdFNlYXJjaCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmRlZmF1bHRTZWFyY2g7XG4gIH1cblxuICBfc2V0RGVmYXVsdFNlYXJjaFN0YXRlKHN0YXRlKSB7XG4gICAgdGhpcy5kYXRhLmRlZmF1bHRTZWFyY2ggPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSk7XG4gICAgdGhpcy5lbWl0KHRoaXMuZXZlbnRzLkRFRkFVTFRfU0VBUkNIX1VQREFURSwgdGhpcy5kYXRhLmRlZmF1bHRTZWFyY2gpO1xuICB9XG5cblxuICAvKipcbiAgICogU2VhcmNoXG4gICAqL1xuICBzZXRTZWFyY2hMb2FkaW5nKGRhdGEpIHtcbiAgICB0aGlzLl9zZXRTZWFyY2hTdGF0ZSh7XG4gICAgICBzdGF0ZTogdGhpcy5TVEFURS5MT0FESU5HLCBcbiAgICAgIHJlcXVlc3Q6IGRhdGFcbiAgICB9KTtcbiAgfVxuXG4gIHNldFNlYXJjaExvYWRlZChwYXlsb2FkKSB7XG4gICAgdGhpcy5fc2V0U2VhcmNoU3RhdGUoe1xuICAgICAgc3RhdGU6IHRoaXMuU1RBVEUuTE9BREVELCAgIFxuICAgICAgcmVxdWVzdDogdGhpcy5kYXRhLnNlYXJjaC5yZXF1ZXN0LFxuICAgICAgcGF5bG9hZDogcGF5bG9hZFxuICAgIH0pO1xuICB9XG5cbiAgc2V0U2VhcmNoRXJyb3IoZSkge1xuICAgIHRoaXMuX3NldFNlYXJjaFN0YXRlKHtcbiAgICAgIHN0YXRlOiB0aGlzLlNUQVRFLkVSUk9SLCAgIFxuICAgICAgcmVxdWVzdDogdGhpcy5kYXRhLnNlYXJjaC5yZXF1ZXN0LFxuICAgICAgZXJyb3I6IGVcbiAgICB9KTtcbiAgfVxuXG4gIF9zZXRTZWFyY2hTdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuZGF0YS5zZWFyY2ggPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSk7XG4gICAgdGhpcy5lbWl0KHRoaXMuZXZlbnRzLlNFQVJDSF9VUERBVEUsIHRoaXMuZGF0YS5zZWFyY2gpO1xuICB9XG5cbiAgZ2V0U2VhcmNoKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEuc2VhcmNoO1xuICB9XG5cblxuICAvKipcbiAgICogU3VnZ2VzdFxuICAgKi9cbiAgc2V0U3VnZ2VzdExvYWRpbmcoZGF0YSkge1xuICAgIHRoaXMuX3NldFN1Z2dlc3RTdGF0ZSh7XG4gICAgICBzdGF0ZTogdGhpcy5TVEFURS5MT0FESU5HLCBcbiAgICAgIHJlcXVlc3Q6IGRhdGFcbiAgICB9KTtcbiAgfVxuXG4gIHNldFN1Z2dlc3RMb2FkZWQocGF5bG9hZCkge1xuICAgIHRoaXMuX3NldFN1Z2dlc3RTdGF0ZSh7XG4gICAgICBzdGF0ZTogdGhpcy5TVEFURS5MT0FERUQsICAgXG4gICAgICByZXF1ZXN0OiB0aGlzLmRhdGEuc3VnZ2VzdC5yZXF1ZXN0LFxuICAgICAgcGF5bG9hZDogcGF5bG9hZFxuICAgIH0pO1xuICB9XG5cbiAgc2V0U3VnZ2VzdEVycm9yKGUpIHtcbiAgICB0aGlzLl9zZXRTdWdnZXN0U3RhdGUoe1xuICAgICAgc3RhdGU6IHRoaXMuU1RBVEUuRVJST1IsICAgXG4gICAgICByZXF1ZXN0OiB0aGlzLmRhdGEuc3VnZ2VzdC5yZXF1ZXN0LFxuICAgICAgZXJyb3I6IGVcbiAgICB9KTtcbiAgfVxuXG4gIF9zZXRTdWdnZXN0U3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLmRhdGEuc3VnZ2VzdCA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICB0aGlzLmVtaXQodGhpcy5ldmVudHMuU1VHR0VTVF9VUERBVEUsIHRoaXMuZGF0YS5zdWdnZXN0KTtcbiAgfVxuXG4gIGdldFN1Z2dlc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5zdWdnZXN0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNlYXJjaFN0b3JlKCk7IiwiXHJcbi8qKlxyXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxyXG4gKi9cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XHJcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XHJcbn07XHJcblxyXG4vKipcclxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1peGluKG9iaikge1xyXG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xyXG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xyXG4gIH1cclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub24gPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgKHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKVxyXG4gICAgLnB1c2goZm4pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxyXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICBmdW5jdGlvbiBvbigpIHtcclxuICAgIHRoaXMub2ZmKGV2ZW50LCBvbik7XHJcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gIH1cclxuXHJcbiAgb24uZm4gPSBmbjtcclxuICB0aGlzLm9uKGV2ZW50LCBvbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcclxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cclxuICAvLyBhbGxcclxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gc3BlY2lmaWMgZXZlbnRcclxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XHJcblxyXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcclxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcclxuICB2YXIgY2I7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcclxuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtNaXhlZH0gLi4uXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuXHJcbiAgaWYgKGNhbGxiYWNrcykge1xyXG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEV2ZW50QnVzIDogcmVxdWlyZSgnLi9saWIvRXZlbnRCdXMnKSxcbiAgQmFzZU1vZGVsIDogcmVxdWlyZSgnLi9saWIvQmFzZU1vZGVsJyksXG4gIEJhc2VTdG9yZSA6IHJlcXVpcmUoJy4vbGliL0Jhc2VTdG9yZScpLFxuICBCYXNlU2VydmljZSA6IHJlcXVpcmUoJy4vbGliL0Jhc2VTZXJ2aWNlJyksXG4gIFN0b3JlU2VydmljZVdyYXBwZXIgOiByZXF1aXJlKCcuL2xpYi9TdG9yZVNlcnZpY2VXcmFwcGVyJyksXG4gIHJlcXVlc3QgOiByZXF1aXJlKCdzdXBlcmFnZW50Jylcbn0iLCJ2YXIgZXZlbnRCdXMgPSByZXF1aXJlKCcuL0V2ZW50QnVzJyk7XG5cbmNsYXNzIEJhc2VNb2RlbCB7XG5cbiAgZ2V0IGV2ZW50QnVzKCkge1xuICAgIHJldHVybiBldmVudEJ1cztcbiAgfVxuXG4gIHJlZ2lzdGVySU9DKG5hbWUpIHtcbiAgICBpZiggIW5hbWUgKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ05hbWUgbm90IHBhc3NlZCB0byBiaW5kTWV0aG9kcygpLiAgVGhpcyB3aWxsIGZhaWwgaW4gSUUsIGNhdXNlLCB5b3Uga25vdywgSUUuJylcbiAgICB9XG5cbiAgICB2YXIgY2xhc3NOYW1lID0gbmFtZSB8fCB0aGlzLl9fcHJvdG9fXy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIGV2ZW50QnVzLnJlZ2lzdGVySU9DKGNsYXNzTmFtZSwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogSGF2ZSB0byBwYXNzIG5hbWUgZm9yIElFIHN1cHBvcnQuXG4gICAqL1xuICBiaW5kTWV0aG9kcyhuYW1lKSB7XG4gICAgaWYoICFuYW1lICkge1xuICAgICAgY29uc29sZS53YXJuKCdOYW1lIG5vdCBwYXNzZWQgdG8gYmluZE1ldGhvZHMoKS4gIFRoaXMgd2lsbCBmYWlsIGluIElFLCBjYXVzZSwgeW91IGtub3csIElFLicpXG4gICAgfVxuXG4gICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMuX19wcm90b19fLmNvbnN0cnVjdG9yLm5hbWUgfHwgbmFtZTtcbiAgICB2YXIgbWV0aG9kcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuX19wcm90b19fKTtcbiAgICBtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgICAgaWYoIG1ldGhvZCA9PT0gJ2NvbnN0cnVjdG9yJyApIHJldHVybjtcblxuICAgICAgdGhpcy5fYmluZE1ldGhvZChjbGFzc05hbWUrJy4nK21ldGhvZCwgbWV0aG9kKVxuICAgIH0pO1xuICB9XG5cbiAgX2JpbmRNZXRob2QoZ2xvYmFsTmFtZSwgbWV0aG9kKSB7XG4gICAgdGhpcy5ldmVudEJ1cy5oYW5kbGVNZXRob2QoZ2xvYmFsTmFtZSwgdGhpc1ttZXRob2RdLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZW1pdChldmVudCwgcGF5bG9hZCkge1xuICAgIHRoaXMuZXZlbnRCdXMuZW1pdChldmVudCwgcGF5bG9hZCk7XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VNb2RlbDsiLCJ2YXIgcmVxdWVzdCA9IHJlcXVpcmUoJ3N1cGVyYWdlbnQnKTtcbnZhciBTdG9yZVNlcml2Y2VXcmFwcGVyID0gcmVxdWlyZSgnLi9TdG9yZVNlcnZpY2VXcmFwcGVyJyk7XG5cbmNsYXNzIEJhc2VTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHAgbWFrZSBzZXJ2aWNlIGNhbGxzIHVwZGF0aW5nIHN0b3JlIHcvIHJlc3VsdFxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucmVxdWVzdCAtIHN1cGVyYWdlbnQgcHJvbWlzZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbXMgLSBvcHRpb25hbCBwYXJhbWV0ZXJzIHRvIHBhc3MgYWxvbmcgdG8gc3RvcmVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5zdG9yZSAtIFN0b3JlIGNsYXNzIChvcHRpb25zLCB3aWxsIGRlZmF1bHQgdG8gdGhpcy5zdG9yZSlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5vbkVycm9yIC0gU3RvcmUgY2xhc3MgbWV0aG9kIHRvIGNhbGwgb25FcnJvclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm9uU3VjY2VzcyAtIFN0b3JlIGNsYXNzIG1ldGhvZCB0byBjYWxsIG9uU3VjY2Vzc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm9uU3VjY2Vzc01pZGRsZXdhcmUgLSBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIG9uU3VjY2VzcywgcmVzdWx0IGlzIHBhc3NlZCB0byBvblN1Y2Nlc3NcbiAgICovXG4gIGNhbGwob3B0aW9ucykge1xuICAgIC8vIGluamVjdCBjbGFzcyBzdG9yZSBpZiBub25lIHByb3ZpZGVkXG4gICAgaWYoICFvcHRpb25zLnN0b3JlICkge1xuICAgICAgaWYoIHRoaXMuc3RvcmUgKSBvcHRpb25zLnN0b3JlID0gdGhpcy5zdG9yZTtcbiAgICAgIGVsc2UgcmV0dXJuIGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKCdObyBzdG9yZSBwcm92aWRlZCcpKTtcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSB3ZXJlIGdpdmUgcHJvbWlzZSBmdW5jdGlvbnMgdG8gcmVzb2x2ZSwgdXNlIHRob3NlXG4gICAgaWYoIG9wdGlvbnMucmVzb2x2ZSAmJiBvcHRpb25zLnJlamVjdCApIHtcbiAgICAgIHJldHVybiBTdG9yZVNlcml2Y2VXcmFwcGVyLmNhbGwob3B0aW9ucyk7XG4gICAgfSBcblxuICAgIC8vIG90aGVyd2lzZSwgdXNlIG91ciBvd24gcHJvbWlzZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBvcHRpb25zLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgb3B0aW9ucy5yZWplY3QgPSByZWplY3Q7XG5cbiAgICAgIFN0b3JlU2VyaXZjZVdyYXBwZXIuY2FsbChvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVNlcnZpY2U7IiwidmFyIEV2ZW50QnVzID0gcmVxdWlyZSgnLi9FdmVudEJ1cycpO1xuXG5jbGFzcyBCYXNlU3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGdlbmVyYWwgc3RhdGVzIHRoYXQgc2hvdWxkIGJlIHVzZWQgaWYgcG9zc2libGVcbiAgICB0aGlzLlNUQVRFID0ge1xuICAgICAgSU5JVCAgICAgICAgIDogJ2luaXQnLFxuICAgICAgTE9BRElORyAgICAgIDogJ2xvYWRpbmcnLFxuICAgICAgTE9BREVEICAgICAgIDogJ2xvYWRlZCcsXG4gICAgICBFUlJPUiAgICAgICAgOiAnZXJyb3InLFxuICAgICAgU0FWSU5HICAgICAgIDogJ3NhdmluZycsXG4gICAgICBTQVZFX0VSUk9SICAgOiAnc2F2ZS1lcnJvcicsXG4gICAgICBERUxFVElORyAgICAgOiAnZGVsZXRpbmcnLFxuICAgICAgREVMRVRFX0VSUk9SIDogJ2RlbGV0ZS1lcnJvcicsXG4gICAgICBERUxFVEVEICAgICAgOiAnZGVsZXRlZCdcbiAgICB9XG4gIH1cblxuICBnZXQgZXZlbnRCdXMoKSB7XG4gICAgcmV0dXJuIEV2ZW50QnVzO1xuICB9XG5cbiAgZW1pdChldmVudCwgcGF5bG9hZCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5ldmVudEJ1cy5lbWl0KGV2ZW50LCBwYXlsb2FkKTtcbiAgICB9LCAwKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VTdG9yZTsiLCJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xuXG5cbmNsYXNzIEV2ZW50QnVzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2V0TWF4TGlzdGVuZXJzKDEwMDAwKTtcbiAgICB0aGlzLm1vZGVscyA9IHt9XG4gIH1cblxuICByZWdpc3RlcklPQyhuYW1lLCBtb2RlbCkge1xuICAgIGlmKCB0aGlzLm1vZGVsc1tuYW1lXSApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQSBtb2RlbCBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWQgd2l0aCBuYW1lOiAke25hbWV9YCk7XG4gICAgfVxuXG4gICAgdGhpcy5tb2RlbHNbbmFtZV0gPSBtb2RlbDtcbiAgfVxuXG4gIGluamVjdChuYW1lKSB7XG4gICAgaWYoICF0aGlzLm1vZGVsc1tuYW1lXSApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbW9kZWwgaGFzIGJlZW4gcmVnaXN0ZXJlZCB3aXRoIG5hbWU6ICR7bmFtZX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tb2RlbHNbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyB3aGF0IG1vZGVscyBiaW5kIHdpdGhcbiAgICogXG4gICAqIEBwYXJhbSB7Kn0gZ2xvYmFsTmFtZSBcbiAgICogQHBhcmFtIHsqfSBtZXRob2RGdW5jdGlvbiBcbiAgICovXG4gIGhhbmRsZU1ldGhvZChnbG9iYWxOYW1lLCBtZXRob2RGdW5jdGlvbikge1xuICAgIGlmKCB0aGlzLl9ldmVudHNbZ2xvYmFsTmFtZV0gKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEdsb2JhbCBtZXRob2QgYWxyZWFkeSByZWdpc3RlcmVkOiAke2dsb2JhbE5hbWV9YCk7XG4gICAgfVxuXG4gICAgLy8gTm90ZTogeW91IGNhbid0IHVzZSBhcnJvdyBmdW5jdGlvbiB0byBnZXQgYXJndW1lbnRzIG9iamVjdFxuICAgIHN1cGVyLm9uKGdsb2JhbE5hbWUsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBwb3Agb2ZmIHRoZSBwcm9taXNlIHdyYXBwZXIgYXJndW1lbnRzXG4gICAgICB2YXIgcmVzb2x2ZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciByZWplY3QgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgIC8vIGZpbGwgdXAgb3VyIGFjdHVhbCBhcmd1bWVudCBhcnJheVxuICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgIGZvciggdmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gYXR0ZW1wdCB0byBjYWxsIGhhbmRsZXIgd2l0aCBhcmd1bWVudHNcbiAgICAgICAgdmFyIHJlc3AgPSBtZXRob2RGdW5jdGlvbi5hcHBseSh0aGlzLCBhcmdzKTtcblxuICAgICAgICAvLyBtZXRob2QgcmV0dXJuZWQgYSBwcm9taXNlLCBqdXN0IHdhaXQgZm9yIGl0IHRvIHJlc29sdmVcbiAgICAgICAgaWYoIHJlc3AgJiYgdHlwZW9mIHJlc3AgPT09ICdvYmplY3QnICYmIHR5cGVvZiByZXNwLnRoZW4gPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgICAgcmVzcFxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4gcmVzb2x2ZShyZXN1bHQpKVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG5cbiAgICAgICAgLy8gbWV0aG9kIHJldHVybmVkIHNvbWV0aGluZyBvdGhlciB0aGFuIGEgcHJvbWlzZSwgcmVzb2x2ZSBub3dcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3ApO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgIC8vIGJhZG5lc3MgaGFwcGVuZWRcbiAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgd2hhdCBlbGVtZW50cyBjYWxsXG4gICAqL1xuICBjYWxsTWV0aG9kKCkge1xuICAgIGlmKCAhdGhpcy5fZXZlbnRzW2FyZ3VtZW50c1swXV0gKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGdsb2JhbCBtZXRob2QgcmVnaXN0ZXJlZDogJHthcmd1bWVudHNbMF19YCk7XG4gICAgfVxuXG4gICAgdmFyIGFyZ3MgPSBbYXJndW1lbnRzWzBdXTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhcmdzLnB1c2gocmVzb2x2ZSk7XG4gICAgICBhcmdzLnB1c2gocmVqZWN0KTtcblxuICAgICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgICAgfVxuXG4gICAgICBzdXBlci5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0pO1xuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRXZlbnRCdXMoKTsiLCJjbGFzcyBTdG9yZVNlcnZpY2VXcmFwcGVyIHtcblxuICAvKipcbiAgICogSGVscCBtYWtlIHNlcnZpY2UgY2FsbHMgdXBkYXRpbmcgc3RvcmUgdy8gcmVzdWx0XG4gICAqIFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5yZXF1ZXN0IC0gc3VwZXJhZ2VudCBwcm9taXNlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtcyAtIG9wdGlvbmFsIHBhcmFtZXRlcnMgdG8gcGFzcyBhbG9uZyB0byBzdG9yZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnN0b3JlIC0gU3RvcmUgY2xhc3NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5vbkVycm9yIC0gU3RvcmUgY2xhc3MgbWV0aG9kIHRvIGNhbGwgb25FcnJvclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm9uU3VjY2VzcyAtIFN0b3JlIGNsYXNzIG1ldGhvZCB0byBjYWxsIG9uU3VjY2Vzc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm9uU3VjY2Vzc01pZGRsZXdhcmUgLSBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIG9uU3VjY2VzcywgcmVzdWx0IGlzIHBhc3NlZCB0byBvblN1Y2Nlc3NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5yZXNvbHZlIC0gcmVzb2x2ZSBhIHByb21pc2Ugd2hlbiBjb21wbGV0ZSAob3B0aW9uYWwpXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucmVqZWN0IC0gcmVqZWN0IGEgcHJvbWlzZSBvbiBlcnJvciAob3B0aW9uYWwpXG4gICAqL1xuICBzdGF0aWMgY2FsbChvcHRpb25zKSB7XG4gICAgb3B0aW9uc1xuICAgICAgLnJlcXVlc3RcbiAgICAgIC50aGVuKHJlc3AgPT4ge1xuICAgICAgICAvLyByZXNwb25zZSBzZXQgYmFjayBlcnJvXG4gICAgICAgIGlmKCAocmVzcC5zdGF0dXMgPj0gMzAwKSB8fCAocmVzcC5ib2R5ICYmIHJlc3AuYm9keS5lcnJvcikgKSB7XG4gICAgICAgICAgcmVzcCA9IHJlc3AuYm9keSB8fCB7c3RhdHVzOiByZXNwLnN0YXR1c307XG4gICAgICAgICAgb3B0aW9ucy5vbkVycm9yLmNhbGwob3B0aW9ucy5zdG9yZSwgcmVzcCwgb3B0aW9ucy5wYXJhbXMpO1xuICAgICAgICAgIGlmKCBvcHRpb25zLnJlamVjdCApIG9wdGlvbnMucmVqZWN0KHJlc3ApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBpZiggb3B0aW9ucy5vblN1Y2Nlc3NNaWRkbGV3YXJlICkge1xuICAgICAgICAgICAgcmVzcCA9IG9wdGlvbnMub25TdWNjZXNzTWlkZGxld2FyZShyZXNwKTtcbiAgICAgICAgICAgIG9wdGlvbnMub25TdWNjZXNzLmNhbGwob3B0aW9ucy5zdG9yZSwgcmVzcCwgb3B0aW9ucy5wYXJhbXMpO1xuICAgICAgICAgICAgaWYoIG9wdGlvbnMucmVzb2x2ZSApIG9wdGlvbnMucmVzb2x2ZShyZXNwKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gb3B0aW9ucy5vblN1Y2Nlc3MuY2FsbChvcHRpb25zLnN0b3JlLCByZXNwLmJvZHksIG9wdGlvbnMucGFyYW1zKTtcbiAgICAgICAgICAgIGlmKCBvcHRpb25zLnJlc29sdmUgKSBvcHRpb25zLnJlc29sdmUocmVzdWx0IHx8IHJlc3AuYm9keSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICB2YXIgcmVzdWx0ID0gb3B0aW9ucy5vbkVycm9yLmNhbGwob3B0aW9ucy5zdG9yZSwgZSwgb3B0aW9ucy5wYXJhbXMpO1xuICAgICAgICBpZiggb3B0aW9ucy5yZWplY3QgKSBvcHRpb25zLnJlamVjdChyZXN1bHQgfHwgZSk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0b3JlU2VydmljZVdyYXBwZXI7IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIHJlc29sdmVzIC4gYW5kIC4uIGVsZW1lbnRzIGluIGEgcGF0aCBhcnJheSB3aXRoIGRpcmVjdG9yeSBuYW1lcyB0aGVyZVxuLy8gbXVzdCBiZSBubyBzbGFzaGVzLCBlbXB0eSBlbGVtZW50cywgb3IgZGV2aWNlIG5hbWVzIChjOlxcKSBpbiB0aGUgYXJyYXlcbi8vIChzbyBhbHNvIG5vIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgLSBpdCBkb2VzIG5vdCBkaXN0aW5ndWlzaFxuLy8gcmVsYXRpdmUgYW5kIGFic29sdXRlIHBhdGhzKVxuZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkocGFydHMsIGFsbG93QWJvdmVSb290KSB7XG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciBsYXN0ID0gcGFydHNbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKGFsbG93QWJvdmVSb290KSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuLy8gU3BsaXQgYSBmaWxlbmFtZSBpbnRvIFtyb290LCBkaXIsIGJhc2VuYW1lLCBleHRdLCB1bml4IHZlcnNpb25cbi8vICdyb290JyBpcyBqdXN0IGEgc2xhc2gsIG9yIG5vdGhpbmcuXG52YXIgc3BsaXRQYXRoUmUgPVxuICAgIC9eKFxcLz98KShbXFxzXFxTXSo/KSgoPzpcXC57MSwyfXxbXlxcL10rP3wpKFxcLlteLlxcL10qfCkpKD86W1xcL10qKSQvO1xudmFyIHNwbGl0UGF0aCA9IGZ1bmN0aW9uKGZpbGVuYW1lKSB7XG4gIHJldHVybiBzcGxpdFBhdGhSZS5leGVjKGZpbGVuYW1lKS5zbGljZSgxKTtcbn07XG5cbi8vIHBhdGgucmVzb2x2ZShbZnJvbSAuLi5dLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVzb2x2ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzb2x2ZWRQYXRoID0gJycsXG4gICAgICByZXNvbHZlZEFic29sdXRlID0gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IC0xICYmICFyZXNvbHZlZEFic29sdXRlOyBpLS0pIHtcbiAgICB2YXIgcGF0aCA9IChpID49IDApID8gYXJndW1lbnRzW2ldIDogcHJvY2Vzcy5jd2QoKTtcblxuICAgIC8vIFNraXAgZW1wdHkgYW5kIGludmFsaWQgZW50cmllc1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLnJlc29sdmUgbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfSBlbHNlIGlmICghcGF0aCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmVzb2x2ZWRQYXRoID0gcGF0aCArICcvJyArIHJlc29sdmVkUGF0aDtcbiAgICByZXNvbHZlZEFic29sdXRlID0gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbiAgfVxuXG4gIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHBhdGggc2hvdWxkIGJlIHJlc29sdmVkIHRvIGEgZnVsbCBhYnNvbHV0ZSBwYXRoLCBidXRcbiAgLy8gaGFuZGxlIHJlbGF0aXZlIHBhdGhzIHRvIGJlIHNhZmUgKG1pZ2h0IGhhcHBlbiB3aGVuIHByb2Nlc3MuY3dkKCkgZmFpbHMpXG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHJlc29sdmVkUGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihyZXNvbHZlZFBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhcmVzb2x2ZWRBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIHJldHVybiAoKHJlc29sdmVkQWJzb2x1dGUgPyAnLycgOiAnJykgKyByZXNvbHZlZFBhdGgpIHx8ICcuJztcbn07XG5cbi8vIHBhdGgubm9ybWFsaXplKHBhdGgpXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCksXG4gICAgICB0cmFpbGluZ1NsYXNoID0gc3Vic3RyKHBhdGgsIC0xKSA9PT0gJy8nO1xuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICBwYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhaXNBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIGlmICghcGF0aCAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHBhdGggPSAnLic7XG4gIH1cbiAgaWYgKHBhdGggJiYgdHJhaWxpbmdTbGFzaCkge1xuICAgIHBhdGggKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIChpc0Fic29sdXRlID8gJy8nIDogJycpICsgcGF0aDtcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLyc7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmpvaW4gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHBhdGhzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgcmV0dXJuIGV4cG9ydHMubm9ybWFsaXplKGZpbHRlcihwYXRocywgZnVuY3Rpb24ocCwgaW5kZXgpIHtcbiAgICBpZiAodHlwZW9mIHAgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5qb2luIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfSkuam9pbignLycpKTtcbn07XG5cblxuLy8gcGF0aC5yZWxhdGl2ZShmcm9tLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVsYXRpdmUgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuICBmcm9tID0gZXhwb3J0cy5yZXNvbHZlKGZyb20pLnN1YnN0cigxKTtcbiAgdG8gPSBleHBvcnRzLnJlc29sdmUodG8pLnN1YnN0cigxKTtcblxuICBmdW5jdGlvbiB0cmltKGFycikge1xuICAgIHZhciBzdGFydCA9IDA7XG4gICAgZm9yICg7IHN0YXJ0IDwgYXJyLmxlbmd0aDsgc3RhcnQrKykge1xuICAgICAgaWYgKGFycltzdGFydF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgZW5kID0gYXJyLmxlbmd0aCAtIDE7XG4gICAgZm9yICg7IGVuZCA+PSAwOyBlbmQtLSkge1xuICAgICAgaWYgKGFycltlbmRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gW107XG4gICAgcmV0dXJuIGFyci5zbGljZShzdGFydCwgZW5kIC0gc3RhcnQgKyAxKTtcbiAgfVxuXG4gIHZhciBmcm9tUGFydHMgPSB0cmltKGZyb20uc3BsaXQoJy8nKSk7XG4gIHZhciB0b1BhcnRzID0gdHJpbSh0by5zcGxpdCgnLycpKTtcblxuICB2YXIgbGVuZ3RoID0gTWF0aC5taW4oZnJvbVBhcnRzLmxlbmd0aCwgdG9QYXJ0cy5sZW5ndGgpO1xuICB2YXIgc2FtZVBhcnRzTGVuZ3RoID0gbGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZyb21QYXJ0c1tpXSAhPT0gdG9QYXJ0c1tpXSkge1xuICAgICAgc2FtZVBhcnRzTGVuZ3RoID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHZhciBvdXRwdXRQYXJ0cyA9IFtdO1xuICBmb3IgKHZhciBpID0gc2FtZVBhcnRzTGVuZ3RoOyBpIDwgZnJvbVBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgb3V0cHV0UGFydHMucHVzaCgnLi4nKTtcbiAgfVxuXG4gIG91dHB1dFBhcnRzID0gb3V0cHV0UGFydHMuY29uY2F0KHRvUGFydHMuc2xpY2Uoc2FtZVBhcnRzTGVuZ3RoKSk7XG5cbiAgcmV0dXJuIG91dHB1dFBhcnRzLmpvaW4oJy8nKTtcbn07XG5cbmV4cG9ydHMuc2VwID0gJy8nO1xuZXhwb3J0cy5kZWxpbWl0ZXIgPSAnOic7XG5cbmV4cG9ydHMuZGlybmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIHJlc3VsdCA9IHNwbGl0UGF0aChwYXRoKSxcbiAgICAgIHJvb3QgPSByZXN1bHRbMF0sXG4gICAgICBkaXIgPSByZXN1bHRbMV07XG5cbiAgaWYgKCFyb290ICYmICFkaXIpIHtcbiAgICAvLyBObyBkaXJuYW1lIHdoYXRzb2V2ZXJcbiAgICByZXR1cm4gJy4nO1xuICB9XG5cbiAgaWYgKGRpcikge1xuICAgIC8vIEl0IGhhcyBhIGRpcm5hbWUsIHN0cmlwIHRyYWlsaW5nIHNsYXNoXG4gICAgZGlyID0gZGlyLnN1YnN0cigwLCBkaXIubGVuZ3RoIC0gMSk7XG4gIH1cblxuICByZXR1cm4gcm9vdCArIGRpcjtcbn07XG5cblxuZXhwb3J0cy5iYXNlbmFtZSA9IGZ1bmN0aW9uKHBhdGgsIGV4dCkge1xuICB2YXIgZiA9IHNwbGl0UGF0aChwYXRoKVsyXTtcbiAgLy8gVE9ETzogbWFrZSB0aGlzIGNvbXBhcmlzb24gY2FzZS1pbnNlbnNpdGl2ZSBvbiB3aW5kb3dzP1xuICBpZiAoZXh0ICYmIGYuc3Vic3RyKC0xICogZXh0Lmxlbmd0aCkgPT09IGV4dCkge1xuICAgIGYgPSBmLnN1YnN0cigwLCBmLmxlbmd0aCAtIGV4dC5sZW5ndGgpO1xuICB9XG4gIHJldHVybiBmO1xufTtcblxuXG5leHBvcnRzLmV4dG5hbWUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBzcGxpdFBhdGgocGF0aClbM107XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIgKHhzLCBmKSB7XG4gICAgaWYgKHhzLmZpbHRlcikgcmV0dXJuIHhzLmZpbHRlcihmKTtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZih4c1tpXSwgaSwgeHMpKSByZXMucHVzaCh4c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFN0cmluZy5wcm90b3R5cGUuc3Vic3RyIC0gbmVnYXRpdmUgaW5kZXggZG9uJ3Qgd29yayBpbiBJRThcbnZhciBzdWJzdHIgPSAnYWInLnN1YnN0cigtMSkgPT09ICdiJ1xuICAgID8gZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikgeyByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKSB9XG4gICAgOiBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7XG4gICAgICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gc3RyLmxlbmd0aCArIHN0YXJ0O1xuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKTtcbiAgICB9XG47XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyoqXG4gKiBSb290IHJlZmVyZW5jZSBmb3IgaWZyYW1lcy5cbiAqL1xuXG52YXIgcm9vdDtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgeyAvLyBCcm93c2VyIHdpbmRvd1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gV2ViIFdvcmtlclxuICByb290ID0gc2VsZjtcbn0gZWxzZSB7IC8vIE90aGVyIGVudmlyb25tZW50c1xuICBjb25zb2xlLndhcm4oXCJVc2luZyBicm93c2VyLW9ubHkgdmVyc2lvbiBvZiBzdXBlcmFnZW50IGluIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuICByb290ID0gdGhpcztcbn1cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIFJlcXVlc3RCYXNlID0gcmVxdWlyZSgnLi9yZXF1ZXN0LWJhc2UnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0Jyk7XG52YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXMtZnVuY3Rpb24nKTtcbnZhciBSZXNwb25zZUJhc2UgPSByZXF1aXJlKCcuL3Jlc3BvbnNlLWJhc2UnKTtcbnZhciBzaG91bGRSZXRyeSA9IHJlcXVpcmUoJy4vc2hvdWxkLXJldHJ5Jyk7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBub29wKCl7fTtcblxuLyoqXG4gKiBFeHBvc2UgYHJlcXVlc3RgLlxuICovXG5cbnZhciByZXF1ZXN0ID0gZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obWV0aG9kLCB1cmwpIHtcbiAgLy8gY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHVybCkge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpLmVuZCh1cmwpO1xuICB9XG5cbiAgLy8gdXJsIGZpcnN0XG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdCgnR0VUJywgbWV0aG9kKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbn1cblxuZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcblxuLyoqXG4gKiBEZXRlcm1pbmUgWEhSLlxuICovXG5cbnJlcXVlc3QuZ2V0WEhSID0gZnVuY3Rpb24gKCkge1xuICBpZiAocm9vdC5YTUxIdHRwUmVxdWVzdFxuICAgICAgJiYgKCFyb290LmxvY2F0aW9uIHx8ICdmaWxlOicgIT0gcm9vdC5sb2NhdGlvbi5wcm90b2NvbFxuICAgICAgICAgIHx8ICFyb290LkFjdGl2ZVhPYmplY3QpKSB7XG4gICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtcbiAgfSBlbHNlIHtcbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC4zLjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICB9XG4gIHRocm93IEVycm9yKFwiQnJvd3Nlci1vbmx5IHZlcmlzb24gb2Ygc3VwZXJhZ2VudCBjb3VsZCBub3QgZmluZCBYSFJcIik7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgYWRkZWQgdG8gc3VwcG9ydCBJRS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIHRyaW0gPSAnJy50cmltXG4gID8gZnVuY3Rpb24ocykgeyByZXR1cm4gcy50cmltKCk7IH1cbiAgOiBmdW5jdGlvbihzKSB7IHJldHVybiBzLnJlcGxhY2UoLyheXFxzKnxcXHMqJCkvZywgJycpOyB9O1xuXG4vKipcbiAqIFNlcmlhbGl6ZSB0aGUgZ2l2ZW4gYG9iamAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaikge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gIHZhciBwYWlycyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgb2JqW2tleV0pO1xuICB9XG4gIHJldHVybiBwYWlycy5qb2luKCcmJyk7XG59XG5cbi8qKlxuICogSGVscHMgJ3NlcmlhbGl6ZScgd2l0aCBzZXJpYWxpemluZyBhcnJheXMuXG4gKiBNdXRhdGVzIHRoZSBwYWlycyBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWlyc1xuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKi9cblxuZnVuY3Rpb24gcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgdmFsKSB7XG4gIGlmICh2YWwgIT0gbnVsbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHZhbC5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgdik7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbCkpIHtcbiAgICAgIGZvcih2YXIgc3Via2V5IGluIHZhbCkge1xuICAgICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5ICsgJ1snICsgc3Via2V5ICsgJ10nLCB2YWxbc3Via2V5XSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSlcbiAgICAgICAgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkpO1xuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICovXG5cbiByZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdCA9IHNlcmlhbGl6ZTtcblxuIC8qKlxuICAqIFBhcnNlIHRoZSBnaXZlbiB4LXd3dy1mb3JtLXVybGVuY29kZWQgYHN0cmAuXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICogQHJldHVybiB7T2JqZWN0fVxuICAqIEBhcGkgcHJpdmF0ZVxuICAqL1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhzdHIpIHtcbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgcGFpcnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgdmFyIHBhaXI7XG4gIHZhciBwb3M7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhaXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgcGFpciA9IHBhaXJzW2ldO1xuICAgIHBvcyA9IHBhaXIuaW5kZXhPZignPScpO1xuICAgIGlmIChwb3MgPT0gLTEpIHtcbiAgICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFpcildID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFpci5zbGljZSgwLCBwb3MpKV0gPVxuICAgICAgICBkZWNvZGVVUklDb21wb25lbnQocGFpci5zbGljZShwb3MgKyAxKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBFeHBvc2UgcGFyc2VyLlxuICovXG5cbnJlcXVlc3QucGFyc2VTdHJpbmcgPSBwYXJzZVN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IE1JTUUgdHlwZSBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICovXG5cbnJlcXVlc3QudHlwZXMgPSB7XG4gIGh0bWw6ICd0ZXh0L2h0bWwnLFxuICBqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG4gIHhtbDogJ2FwcGxpY2F0aW9uL3htbCcsXG4gIHVybGVuY29kZWQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybS1kYXRhJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBzZXJpYWxpemF0aW9uIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24ob2JqKXtcbiAqICAgICAgIHJldHVybiAnZ2VuZXJhdGVkIHhtbCBoZXJlJztcbiAqICAgICB9O1xuICpcbiAqL1xuXG4gcmVxdWVzdC5zZXJpYWxpemUgPSB7XG4gICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogc2VyaWFsaXplLFxuICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnN0cmluZ2lmeVxuIH07XG5cbiAvKipcbiAgKiBEZWZhdWx0IHBhcnNlcnMuXG4gICpcbiAgKiAgICAgc3VwZXJhZ2VudC5wYXJzZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihzdHIpe1xuICAqICAgICAgIHJldHVybiB7IG9iamVjdCBwYXJzZWQgZnJvbSBzdHIgfTtcbiAgKiAgICAgfTtcbiAgKlxuICAqL1xuXG5yZXF1ZXN0LnBhcnNlID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcGFyc2VTdHJpbmcsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5wYXJzZVxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaGVhZGVyIGBzdHJgIGludG9cbiAqIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXBwZWQgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVyKHN0cikge1xuICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoL1xccj9cXG4vKTtcbiAgdmFyIGZpZWxkcyA9IHt9O1xuICB2YXIgaW5kZXg7XG4gIHZhciBsaW5lO1xuICB2YXIgZmllbGQ7XG4gIHZhciB2YWw7XG5cbiAgbGluZXMucG9wKCk7IC8vIHRyYWlsaW5nIENSTEZcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBmaWVsZCA9IGxpbmUuc2xpY2UoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdHJpbShsaW5lLnNsaWNlKGluZGV4ICsgMSkpO1xuICAgIGZpZWxkc1tmaWVsZF0gPSB2YWw7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBtaW1lYCBpcyBqc29uIG9yIGhhcyAranNvbiBzdHJ1Y3R1cmVkIHN5bnRheCBzdWZmaXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1pbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0pTT04obWltZSkge1xuICByZXR1cm4gL1tcXC8rXWpzb25cXGIvLnRlc3QobWltZSk7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVzcG9uc2VgIHdpdGggdGhlIGdpdmVuIGB4aHJgLlxuICpcbiAqICAtIHNldCBmbGFncyAoLm9rLCAuZXJyb3IsIGV0YylcbiAqICAtIHBhcnNlIGhlYWRlclxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICBBbGlhc2luZyBgc3VwZXJhZ2VudGAgYXMgYHJlcXVlc3RgIGlzIG5pY2U6XG4gKlxuICogICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudDtcbiAqXG4gKiAgV2UgY2FuIHVzZSB0aGUgcHJvbWlzZS1saWtlIEFQSSwgb3IgcGFzcyBjYWxsYmFja3M6XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnLycpLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICogICAgICByZXF1ZXN0LmdldCgnLycsIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIFNlbmRpbmcgZGF0YSBjYW4gYmUgY2hhaW5lZDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAuc2VuZCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5wb3N0KClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBPciBmdXJ0aGVyIHJlZHVjZWQgdG8gYSBzaW5nbGUgY2FsbCBmb3Igc2ltcGxlIGNhc2VzOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIEBwYXJhbSB7WE1MSFRUUFJlcXVlc3R9IHhoclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlKHJlcSkge1xuICB0aGlzLnJlcSA9IHJlcTtcbiAgdGhpcy54aHIgPSB0aGlzLnJlcS54aHI7XG4gIC8vIHJlc3BvbnNlVGV4dCBpcyBhY2Nlc3NpYmxlIG9ubHkgaWYgcmVzcG9uc2VUeXBlIGlzICcnIG9yICd0ZXh0JyBhbmQgb24gb2xkZXIgYnJvd3NlcnNcbiAgdGhpcy50ZXh0ID0gKCh0aGlzLnJlcS5tZXRob2QgIT0nSEVBRCcgJiYgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcpKSB8fCB0eXBlb2YgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndW5kZWZpbmVkJylcbiAgICAgPyB0aGlzLnhoci5yZXNwb25zZVRleHRcbiAgICAgOiBudWxsO1xuICB0aGlzLnN0YXR1c1RleHQgPSB0aGlzLnJlcS54aHIuc3RhdHVzVGV4dDtcbiAgdmFyIHN0YXR1cyA9IHRoaXMueGhyLnN0YXR1cztcbiAgLy8gaGFuZGxlIElFOSBidWc6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAwNDY5NzIvbXNpZS1yZXR1cm5zLXN0YXR1cy1jb2RlLW9mLTEyMjMtZm9yLWFqYXgtcmVxdWVzdFxuICBpZiAoc3RhdHVzID09PSAxMjIzKSB7XG4gICAgICBzdGF0dXMgPSAyMDQ7XG4gIH1cbiAgdGhpcy5fc2V0U3RhdHVzUHJvcGVydGllcyhzdGF0dXMpO1xuICB0aGlzLmhlYWRlciA9IHRoaXMuaGVhZGVycyA9IHBhcnNlSGVhZGVyKHRoaXMueGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgLy8gZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIHNvbWV0aW1lcyBmYWxzZWx5IHJldHVybnMgXCJcIiBmb3IgQ09SUyByZXF1ZXN0cywgYnV0XG4gIC8vIGdldFJlc3BvbnNlSGVhZGVyIHN0aWxsIHdvcmtzLiBzbyB3ZSBnZXQgY29udGVudC10eXBlIGV2ZW4gaWYgZ2V0dGluZ1xuICAvLyBvdGhlciBoZWFkZXJzIGZhaWxzLlxuICB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gPSB0aGlzLnhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XG4gIHRoaXMuX3NldEhlYWRlclByb3BlcnRpZXModGhpcy5oZWFkZXIpO1xuXG4gIGlmIChudWxsID09PSB0aGlzLnRleHQgJiYgcmVxLl9yZXNwb25zZVR5cGUpIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnhoci5yZXNwb25zZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnJlcS5tZXRob2QgIT0gJ0hFQUQnXG4gICAgICA/IHRoaXMuX3BhcnNlQm9keSh0aGlzLnRleHQgPyB0aGlzLnRleHQgOiB0aGlzLnhoci5yZXNwb25zZSlcbiAgICAgIDogbnVsbDtcbiAgfVxufVxuXG5SZXNwb25zZUJhc2UoUmVzcG9uc2UucHJvdG90eXBlKTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYm9keSBgc3RyYC5cbiAqXG4gKiBVc2VkIGZvciBhdXRvLXBhcnNpbmcgb2YgYm9kaWVzLiBQYXJzZXJzXG4gKiBhcmUgZGVmaW5lZCBvbiB0aGUgYHN1cGVyYWdlbnQucGFyc2VgIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5fcGFyc2VCb2R5ID0gZnVuY3Rpb24oc3RyKXtcbiAgdmFyIHBhcnNlID0gcmVxdWVzdC5wYXJzZVt0aGlzLnR5cGVdO1xuICBpZih0aGlzLnJlcS5fcGFyc2VyKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLl9wYXJzZXIodGhpcywgc3RyKTtcbiAgfVxuICBpZiAoIXBhcnNlICYmIGlzSlNPTih0aGlzLnR5cGUpKSB7XG4gICAgcGFyc2UgPSByZXF1ZXN0LnBhcnNlWydhcHBsaWNhdGlvbi9qc29uJ107XG4gIH1cbiAgcmV0dXJuIHBhcnNlICYmIHN0ciAmJiAoc3RyLmxlbmd0aCB8fCBzdHIgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgPyBwYXJzZShzdHIpXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciByZXEgPSB0aGlzLnJlcTtcbiAgdmFyIG1ldGhvZCA9IHJlcS5tZXRob2Q7XG4gIHZhciB1cmwgPSByZXEudXJsO1xuXG4gIHZhciBtc2cgPSAnY2Fubm90ICcgKyBtZXRob2QgKyAnICcgKyB1cmwgKyAnICgnICsgdGhpcy5zdGF0dXMgKyAnKSc7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gbWV0aG9kO1xuICBlcnIudXJsID0gdXJsO1xuXG4gIHJldHVybiBlcnI7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VgLlxuICovXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5fcXVlcnkgPSB0aGlzLl9xdWVyeSB8fCBbXTtcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gIHRoaXMudXJsID0gdXJsO1xuICB0aGlzLmhlYWRlciA9IHt9OyAvLyBwcmVzZXJ2ZXMgaGVhZGVyIG5hbWUgY2FzZVxuICB0aGlzLl9oZWFkZXIgPSB7fTsgLy8gY29lcmNlcyBoZWFkZXIgbmFtZXMgdG8gbG93ZXJjYXNlXG4gIHRoaXMub24oJ2VuZCcsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGVyciA9IG51bGw7XG4gICAgdmFyIHJlcyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgcmVzID0gbmV3IFJlc3BvbnNlKHNlbGYpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgZXJyID0gbmV3IEVycm9yKCdQYXJzZXIgaXMgdW5hYmxlIHRvIHBhcnNlIHRoZSByZXNwb25zZScpO1xuICAgICAgZXJyLnBhcnNlID0gdHJ1ZTtcbiAgICAgIGVyci5vcmlnaW5hbCA9IGU7XG4gICAgICAvLyBpc3N1ZSAjNjc1OiByZXR1cm4gdGhlIHJhdyByZXNwb25zZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgaWYgKHNlbGYueGhyKSB7XG4gICAgICAgIC8vIGllOSBkb2Vzbid0IGhhdmUgJ3Jlc3BvbnNlJyBwcm9wZXJ0eVxuICAgICAgICBlcnIucmF3UmVzcG9uc2UgPSB0eXBlb2Ygc2VsZi54aHIucmVzcG9uc2VUeXBlID09ICd1bmRlZmluZWQnID8gc2VsZi54aHIucmVzcG9uc2VUZXh0IDogc2VsZi54aHIucmVzcG9uc2U7XG4gICAgICAgIC8vIGlzc3VlICM4NzY6IHJldHVybiB0aGUgaHR0cCBzdGF0dXMgY29kZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgICBlcnIuc3RhdHVzID0gc2VsZi54aHIuc3RhdHVzID8gc2VsZi54aHIuc3RhdHVzIDogbnVsbDtcbiAgICAgICAgZXJyLnN0YXR1c0NvZGUgPSBlcnIuc3RhdHVzOyAvLyBiYWNrd2FyZHMtY29tcGF0IG9ubHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVyci5yYXdSZXNwb25zZSA9IG51bGw7XG4gICAgICAgIGVyci5zdGF0dXMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIpO1xuICAgIH1cblxuICAgIHNlbGYuZW1pdCgncmVzcG9uc2UnLCByZXMpO1xuXG4gICAgdmFyIG5ld19lcnI7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghc2VsZi5faXNSZXNwb25zZU9LKHJlcykpIHtcbiAgICAgICAgbmV3X2VyciA9IG5ldyBFcnJvcihyZXMuc3RhdHVzVGV4dCB8fCAnVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2UnKTtcbiAgICAgICAgbmV3X2Vyci5vcmlnaW5hbCA9IGVycjtcbiAgICAgICAgbmV3X2Vyci5yZXNwb25zZSA9IHJlcztcbiAgICAgICAgbmV3X2Vyci5zdGF0dXMgPSByZXMuc3RhdHVzO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgbmV3X2VyciA9IGU7IC8vICM5ODUgdG91Y2hpbmcgcmVzIG1heSBjYXVzZSBJTlZBTElEX1NUQVRFX0VSUiBvbiBvbGQgQW5kcm9pZFxuICAgIH1cblxuICAgIC8vICMxMDAwIGRvbid0IGNhdGNoIGVycm9ycyBmcm9tIHRoZSBjYWxsYmFjayB0byBhdm9pZCBkb3VibGUgY2FsbGluZyBpdFxuICAgIGlmIChuZXdfZXJyKSB7XG4gICAgICBzZWxmLmNhbGxiYWNrKG5ld19lcnIsIHJlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuY2FsbGJhY2sobnVsbCwgcmVzKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIE1peGluIGBFbWl0dGVyYCBhbmQgYFJlcXVlc3RCYXNlYC5cbiAqL1xuXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblJlcXVlc3RCYXNlKFJlcXVlc3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBTZXQgQ29udGVudC1UeXBlIHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgneG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCdhcHBsaWNhdGlvbi94bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnR5cGUgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0NvbnRlbnQtVHlwZScsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQWNjZXB0IHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLmpzb24gPSAnYXBwbGljYXRpb24vanNvbic7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdqc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY2NlcHRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0FjY2VwdCcsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQXV0aG9yaXphdGlvbiBmaWVsZCB2YWx1ZSB3aXRoIGB1c2VyYCBhbmQgYHBhc3NgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gW3Bhc3NdIG9wdGlvbmFsIGluIGNhc2Ugb2YgdXNpbmcgJ2JlYXJlcicgYXMgdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgd2l0aCAndHlwZScgcHJvcGVydHkgJ2F1dG8nLCAnYmFzaWMnIG9yICdiZWFyZXInIChkZWZhdWx0ICdiYXNpYycpXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXV0aCA9IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIG9wdGlvbnMpe1xuICBpZiAodHlwZW9mIHBhc3MgPT09ICdvYmplY3QnICYmIHBhc3MgIT09IG51bGwpIHsgLy8gcGFzcyBpcyBvcHRpb25hbCBhbmQgY2FuIHN1YnN0aXR1dGUgZm9yIG9wdGlvbnNcbiAgICBvcHRpb25zID0gcGFzcztcbiAgfVxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgdHlwZTogJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGJ0b2EgPyAnYmFzaWMnIDogJ2F1dG8nLFxuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAob3B0aW9ucy50eXBlKSB7XG4gICAgY2FzZSAnYmFzaWMnOlxuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGJ0b2EodXNlciArICc6JyArIHBhc3MpKTtcbiAgICBicmVhaztcblxuICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXI7XG4gICAgICB0aGlzLnBhc3N3b3JkID0gcGFzcztcbiAgICBicmVhaztcbiAgICAgIFxuICAgIGNhc2UgJ2JlYXJlcic6IC8vIHVzYWdlIHdvdWxkIGJlIC5hdXRoKGFjY2Vzc1Rva2VuLCB7IHR5cGU6ICdiZWFyZXInIH0pXG4gICAgICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHVzZXIpO1xuICAgIGJyZWFrOyAgXG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZCBxdWVyeS1zdHJpbmcgYHZhbGAuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICByZXF1ZXN0LmdldCgnL3Nob2VzJylcbiAqICAgICAucXVlcnkoJ3NpemU9MTAnKVxuICogICAgIC5xdWVyeSh7IGNvbG9yOiAnYmx1ZScgfSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24odmFsKXtcbiAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHZhbCA9IHNlcmlhbGl6ZSh2YWwpO1xuICBpZiAodmFsKSB0aGlzLl9xdWVyeS5wdXNoKHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBRdWV1ZSB0aGUgZ2l2ZW4gYGZpbGVgIGFzIGFuIGF0dGFjaG1lbnQgdG8gdGhlIHNwZWNpZmllZCBgZmllbGRgLFxuICogd2l0aCBvcHRpb25hbCBgb3B0aW9uc2AgKG9yIGZpbGVuYW1lKS5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5hdHRhY2goJ2NvbnRlbnQnLCBuZXcgQmxvYihbJzxhIGlkPVwiYVwiPjxiIGlkPVwiYlwiPmhleSE8L2I+PC9hPiddLCB7IHR5cGU6IFwidGV4dC9odG1sXCJ9KSlcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7QmxvYnxGaWxlfSBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbihmaWVsZCwgZmlsZSwgb3B0aW9ucyl7XG4gIGlmIChmaWxlKSB7XG4gICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgIHRocm93IEVycm9yKFwic3VwZXJhZ2VudCBjYW4ndCBtaXggLnNlbmQoKSBhbmQgLmF0dGFjaCgpXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKGZpZWxkLCBmaWxlLCBvcHRpb25zIHx8IGZpbGUubmFtZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fZ2V0Rm9ybURhdGEgPSBmdW5jdGlvbigpe1xuICBpZiAoIXRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgdGhpcy5fZm9ybURhdGEgPSBuZXcgcm9vdC5Gb3JtRGF0YSgpO1xuICB9XG4gIHJldHVybiB0aGlzLl9mb3JtRGF0YTtcbn07XG5cbi8qKlxuICogSW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIGBlcnJgIGFuZCBgcmVzYFxuICogYW5kIGhhbmRsZSBhcml0eSBjaGVjay5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2FsbGJhY2sgPSBmdW5jdGlvbihlcnIsIHJlcyl7XG4gIC8vIGNvbnNvbGUubG9nKHRoaXMuX3JldHJpZXMsIHRoaXMuX21heFJldHJpZXMpXG4gIGlmICh0aGlzLl9tYXhSZXRyaWVzICYmIHRoaXMuX3JldHJpZXMrKyA8IHRoaXMuX21heFJldHJpZXMgJiYgc2hvdWxkUmV0cnkoZXJyLCByZXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JldHJ5KCk7XG4gIH1cblxuICB2YXIgZm4gPSB0aGlzLl9jYWxsYmFjaztcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICBpZiAoZXJyKSB7XG4gICAgaWYgKHRoaXMuX21heFJldHJpZXMpIGVyci5yZXRyaWVzID0gdGhpcy5fcmV0cmllcyAtIDE7XG4gICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIH1cblxuICBmbihlcnIsIHJlcyk7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHgtZG9tYWluIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNyb3NzRG9tYWluRXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCdSZXF1ZXN0IGhhcyBiZWVuIHRlcm1pbmF0ZWRcXG5Qb3NzaWJsZSBjYXVzZXM6IHRoZSBuZXR3b3JrIGlzIG9mZmxpbmUsIE9yaWdpbiBpcyBub3QgYWxsb3dlZCBieSBBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4sIHRoZSBwYWdlIGlzIGJlaW5nIHVubG9hZGVkLCBldGMuJyk7XG4gIGVyci5jcm9zc0RvbWFpbiA9IHRydWU7XG5cbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gdGhpcy5tZXRob2Q7XG4gIGVyci51cmwgPSB0aGlzLnVybDtcblxuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG4vLyBUaGlzIG9ubHkgd2FybnMsIGJlY2F1c2UgdGhlIHJlcXVlc3QgaXMgc3RpbGwgbGlrZWx5IHRvIHdvcmtcblJlcXVlc3QucHJvdG90eXBlLmJ1ZmZlciA9IFJlcXVlc3QucHJvdG90eXBlLmNhID0gUmVxdWVzdC5wcm90b3R5cGUuYWdlbnQgPSBmdW5jdGlvbigpe1xuICBjb25zb2xlLndhcm4oXCJUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciB2ZXJzaW9uIG9mIHN1cGVyYWdlbnRcIik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gVGhpcyB0aHJvd3MsIGJlY2F1c2UgaXQgY2FuJ3Qgc2VuZC9yZWNlaXZlIGRhdGEgYXMgZXhwZWN0ZWRcblJlcXVlc3QucHJvdG90eXBlLnBpcGUgPSBSZXF1ZXN0LnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uKCl7XG4gIHRocm93IEVycm9yKFwiU3RyZWFtaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciB2ZXJzaW9uIG9mIHN1cGVyYWdlbnRcIik7XG59O1xuXG4vKipcbiAqIENvbXBvc2UgcXVlcnlzdHJpbmcgdG8gYXBwZW5kIHRvIHJlcS51cmxcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fYXBwZW5kUXVlcnlTdHJpbmcgPSBmdW5jdGlvbigpe1xuICB2YXIgcXVlcnkgPSB0aGlzLl9xdWVyeS5qb2luKCcmJyk7XG4gIGlmIChxdWVyeSkge1xuICAgIHRoaXMudXJsICs9ICh0aGlzLnVybC5pbmRleE9mKCc/JykgPj0gMCA/ICcmJyA6ICc/JykgKyBxdWVyeTtcbiAgfVxuXG4gIGlmICh0aGlzLl9zb3J0KSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy51cmwuaW5kZXhPZignPycpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB2YXIgcXVlcnlBcnIgPSB0aGlzLnVybC5zdWJzdHJpbmcoaW5kZXggKyAxKS5zcGxpdCgnJicpO1xuICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5fc29ydCkpIHtcbiAgICAgICAgcXVlcnlBcnIuc29ydCh0aGlzLl9zb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5QXJyLnNvcnQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gdGhpcy51cmwuc3Vic3RyaW5nKDAsIGluZGV4KSArICc/JyArIHF1ZXJ5QXJyLmpvaW4oJyYnKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBob3N0IG9iamVjdCxcbiAqIHdlIGRvbid0IHdhbnQgdG8gc2VyaWFsaXplIHRoZXNlIDopXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SZXF1ZXN0LnByb3RvdHlwZS5faXNIb3N0ID0gZnVuY3Rpb24gX2lzSG9zdChvYmopIHtcbiAgLy8gTmF0aXZlIG9iamVjdHMgc3RyaW5naWZ5IHRvIFtvYmplY3QgRmlsZV0sIFtvYmplY3QgQmxvYl0sIFtvYmplY3QgRm9ybURhdGFdLCBldGMuXG4gIHJldHVybiBvYmogJiYgJ29iamVjdCcgPT09IHR5cGVvZiBvYmogJiYgIUFycmF5LmlzQXJyYXkob2JqKSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG5cbi8qKlxuICogSW5pdGlhdGUgcmVxdWVzdCwgaW52b2tpbmcgY2FsbGJhY2sgYGZuKHJlcylgXG4gKiB3aXRoIGFuIGluc3RhbmNlb2YgYFJlc3BvbnNlYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGZuKXtcbiAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IC5lbmQoKSB3YXMgY2FsbGVkIHR3aWNlLiBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gc3VwZXJhZ2VudFwiKTtcbiAgfVxuICB0aGlzLl9lbmRDYWxsZWQgPSB0cnVlO1xuXG4gIC8vIHN0b3JlIGNhbGxiYWNrXG4gIHRoaXMuX2NhbGxiYWNrID0gZm4gfHwgbm9vcDtcblxuICAvLyBxdWVyeXN0cmluZ1xuICB0aGlzLl9hcHBlbmRRdWVyeVN0cmluZygpO1xuXG4gIHJldHVybiB0aGlzLl9lbmQoKTtcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9lbmQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgeGhyID0gdGhpcy54aHIgPSByZXF1ZXN0LmdldFhIUigpO1xuICB2YXIgZGF0YSA9IHRoaXMuX2Zvcm1EYXRhIHx8IHRoaXMuX2RhdGE7XG5cbiAgdGhpcy5fc2V0VGltZW91dHMoKTtcblxuICAvLyBzdGF0ZSBjaGFuZ2VcbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHJlYWR5U3RhdGUgPSB4aHIucmVhZHlTdGF0ZTtcbiAgICBpZiAocmVhZHlTdGF0ZSA+PSAyICYmIHNlbGYuX3Jlc3BvbnNlVGltZW91dFRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQoc2VsZi5fcmVzcG9uc2VUaW1lb3V0VGltZXIpO1xuICAgIH1cbiAgICBpZiAoNCAhPSByZWFkeVN0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSW4gSUU5LCByZWFkcyB0byBhbnkgcHJvcGVydHkgKGUuZy4gc3RhdHVzKSBvZmYgb2YgYW4gYWJvcnRlZCBYSFIgd2lsbFxuICAgIC8vIHJlc3VsdCBpbiB0aGUgZXJyb3IgXCJDb3VsZCBub3QgY29tcGxldGUgdGhlIG9wZXJhdGlvbiBkdWUgdG8gZXJyb3IgYzAwYzAyM2ZcIlxuICAgIHZhciBzdGF0dXM7XG4gICAgdHJ5IHsgc3RhdHVzID0geGhyLnN0YXR1cyB9IGNhdGNoKGUpIHsgc3RhdHVzID0gMDsgfVxuXG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgIGlmIChzZWxmLnRpbWVkb3V0IHx8IHNlbGYuX2Fib3J0ZWQpIHJldHVybjtcbiAgICAgIHJldHVybiBzZWxmLmNyb3NzRG9tYWluRXJyb3IoKTtcbiAgICB9XG4gICAgc2VsZi5lbWl0KCdlbmQnKTtcbiAgfTtcblxuICAvLyBwcm9ncmVzc1xuICB2YXIgaGFuZGxlUHJvZ3Jlc3MgPSBmdW5jdGlvbihkaXJlY3Rpb24sIGUpIHtcbiAgICBpZiAoZS50b3RhbCA+IDApIHtcbiAgICAgIGUucGVyY2VudCA9IGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMDtcbiAgICB9XG4gICAgZS5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgc2VsZi5lbWl0KCdwcm9ncmVzcycsIGUpO1xuICB9XG4gIGlmICh0aGlzLmhhc0xpc3RlbmVycygncHJvZ3Jlc3MnKSkge1xuICAgIHRyeSB7XG4gICAgICB4aHIub25wcm9ncmVzcyA9IGhhbmRsZVByb2dyZXNzLmJpbmQobnVsbCwgJ2Rvd25sb2FkJyk7XG4gICAgICBpZiAoeGhyLnVwbG9hZCkge1xuICAgICAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcy5iaW5kKG51bGwsICd1cGxvYWQnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIC8vIEFjY2Vzc2luZyB4aHIudXBsb2FkIGZhaWxzIGluIElFIGZyb20gYSB3ZWIgd29ya2VyLCBzbyBqdXN0IHByZXRlbmQgaXQgZG9lc24ndCBleGlzdC5cbiAgICAgIC8vIFJlcG9ydGVkIGhlcmU6XG4gICAgICAvLyBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzgzNzI0NS94bWxodHRwcmVxdWVzdC11cGxvYWQtdGhyb3dzLWludmFsaWQtYXJndW1lbnQtd2hlbi11c2VkLWZyb20td2ViLXdvcmtlci1jb250ZXh0XG4gICAgfVxuICB9XG5cbiAgLy8gaW5pdGlhdGUgcmVxdWVzdFxuICB0cnkge1xuICAgIGlmICh0aGlzLnVzZXJuYW1lICYmIHRoaXMucGFzc3dvcmQpIHtcbiAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSwgdGhpcy51c2VybmFtZSwgdGhpcy5wYXNzd29yZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBzZWUgIzExNDlcbiAgICByZXR1cm4gdGhpcy5jYWxsYmFjayhlcnIpO1xuICB9XG5cbiAgLy8gQ09SU1xuICBpZiAodGhpcy5fd2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblxuICAvLyBib2R5XG4gIGlmICghdGhpcy5fZm9ybURhdGEgJiYgJ0dFVCcgIT0gdGhpcy5tZXRob2QgJiYgJ0hFQUQnICE9IHRoaXMubWV0aG9kICYmICdzdHJpbmcnICE9IHR5cGVvZiBkYXRhICYmICF0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICAvLyBzZXJpYWxpemUgc3R1ZmZcbiAgICB2YXIgY29udGVudFR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICAgIHZhciBzZXJpYWxpemUgPSB0aGlzLl9zZXJpYWxpemVyIHx8IHJlcXVlc3Quc2VyaWFsaXplW2NvbnRlbnRUeXBlID8gY29udGVudFR5cGUuc3BsaXQoJzsnKVswXSA6ICcnXTtcbiAgICBpZiAoIXNlcmlhbGl6ZSAmJiBpc0pTT04oY29udGVudFR5cGUpKSB7XG4gICAgICBzZXJpYWxpemUgPSByZXF1ZXN0LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24vanNvbiddO1xuICAgIH1cbiAgICBpZiAoc2VyaWFsaXplKSBkYXRhID0gc2VyaWFsaXplKGRhdGEpO1xuICB9XG5cbiAgLy8gc2V0IGhlYWRlciBmaWVsZHNcbiAgZm9yICh2YXIgZmllbGQgaW4gdGhpcy5oZWFkZXIpIHtcbiAgICBpZiAobnVsbCA9PSB0aGlzLmhlYWRlcltmaWVsZF0pIGNvbnRpbnVlO1xuXG4gICAgaWYgKHRoaXMuaGVhZGVyLmhhc093blByb3BlcnR5KGZpZWxkKSlcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGZpZWxkLCB0aGlzLmhlYWRlcltmaWVsZF0pO1xuICB9XG5cbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLl9yZXNwb25zZVR5cGU7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuXG4gIC8vIElFMTEgeGhyLnNlbmQodW5kZWZpbmVkKSBzZW5kcyAndW5kZWZpbmVkJyBzdHJpbmcgYXMgUE9TVCBwYXlsb2FkIChpbnN0ZWFkIG9mIG5vdGhpbmcpXG4gIC8vIFdlIG5lZWQgbnVsbCBoZXJlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gIHhoci5zZW5kKHR5cGVvZiBkYXRhICE9PSAndW5kZWZpbmVkJyA/IGRhdGEgOiBudWxsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEdFVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuZ2V0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdHRVQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogSEVBRCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuaGVhZCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnSEVBRCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIE9QVElPTlMgcXVlcnkgdG8gYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0Lm9wdGlvbnMgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ09QVElPTlMnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBERUxFVEUgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRlbCh1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0RFTEVURScsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG5yZXF1ZXN0WydkZWwnXSA9IGRlbDtcbnJlcXVlc3RbJ2RlbGV0ZSddID0gZGVsO1xuXG4vKipcbiAqIFBBVENIIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnBhdGNoID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQQVRDSCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBPU1QgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUE9TVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBVVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wdXQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BVVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuIiwiLyoqXG4gKiBDaGVjayBpZiBgZm5gIGlzIGEgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pcy1vYmplY3QnKTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihmbikge1xuICB2YXIgdGFnID0gaXNPYmplY3QoZm4pID8gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZuKSA6ICcnO1xuICByZXR1cm4gdGFnID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCIvKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gIHJldHVybiBudWxsICE9PSBvYmogJiYgJ29iamVjdCcgPT09IHR5cGVvZiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCIvKipcbiAqIE1vZHVsZSBvZiBtaXhlZC1pbiBmdW5jdGlvbnMgc2hhcmVkIGJldHdlZW4gbm9kZSBhbmQgY2xpZW50IGNvZGVcbiAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pcy1vYmplY3QnKTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlcXVlc3RCYXNlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RCYXNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlcXVlc3RCYXNlYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3RCYXNlKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cblxuLyoqXG4gKiBNaXhpbiB0aGUgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBSZXF1ZXN0QmFzZS5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogQ2xlYXIgcHJldmlvdXMgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmNsZWFyVGltZW91dCA9IGZ1bmN0aW9uIF9jbGVhclRpbWVvdXQoKXtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgZGVsZXRlIHRoaXMuX3RpbWVyO1xuICBkZWxldGUgdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXI7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlc3BvbnNlIGJvZHkgcGFyc2VyXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB0byBjb252ZXJ0IGluY29taW5nIGRhdGEgaW50byByZXF1ZXN0LmJvZHlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZShmbil7XG4gIHRoaXMuX3BhcnNlciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IGZvcm1hdCBvZiBiaW5hcnkgcmVzcG9uc2UgYm9keS5cbiAqIEluIGJyb3dzZXIgdmFsaWQgZm9ybWF0cyBhcmUgJ2Jsb2InIGFuZCAnYXJyYXlidWZmZXInLFxuICogd2hpY2ggcmV0dXJuIEJsb2IgYW5kIEFycmF5QnVmZmVyLCByZXNwZWN0aXZlbHkuXG4gKlxuICogSW4gTm9kZSBhbGwgdmFsdWVzIHJlc3VsdCBpbiBCdWZmZXIuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAucmVzcG9uc2VUeXBlKCdibG9iJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJlc3BvbnNlVHlwZSA9IGZ1bmN0aW9uKHZhbCl7XG4gIHRoaXMuX3Jlc3BvbnNlVHlwZSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQgcmVxdWVzdCBib2R5IHNlcmlhbGl6ZXJcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIGNvbnZlcnQgZGF0YSBzZXQgdmlhIC5zZW5kIG9yIC5hdHRhY2ggaW50byBwYXlsb2FkIHRvIHNlbmRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24gc2VyaWFsaXplKGZuKXtcbiAgdGhpcy5fc2VyaWFsaXplciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRpbWVvdXRzLlxuICpcbiAqIC0gcmVzcG9uc2UgdGltZW91dCBpcyB0aW1lIGJldHdlZW4gc2VuZGluZyByZXF1ZXN0IGFuZCByZWNlaXZpbmcgdGhlIGZpcnN0IGJ5dGUgb2YgdGhlIHJlc3BvbnNlLiBJbmNsdWRlcyBETlMgYW5kIGNvbm5lY3Rpb24gdGltZS5cbiAqIC0gZGVhZGxpbmUgaXMgdGhlIHRpbWUgZnJvbSBzdGFydCBvZiB0aGUgcmVxdWVzdCB0byByZWNlaXZpbmcgcmVzcG9uc2UgYm9keSBpbiBmdWxsLiBJZiB0aGUgZGVhZGxpbmUgaXMgdG9vIHNob3J0IGxhcmdlIGZpbGVzIG1heSBub3QgbG9hZCBhdCBhbGwgb24gc2xvdyBjb25uZWN0aW9ucy5cbiAqXG4gKiBWYWx1ZSBvZiAwIG9yIGZhbHNlIG1lYW5zIG5vIHRpbWVvdXQuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBtcyBvciB7cmVzcG9uc2UsIHJlYWQsIGRlYWRsaW5lfVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gdGltZW91dChvcHRpb25zKXtcbiAgaWYgKCFvcHRpb25zIHx8ICdvYmplY3QnICE9PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zO1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmb3IodmFyIG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgc3dpdGNoKG9wdGlvbikge1xuICAgICAgY2FzZSAnZGVhZGxpbmUnOlxuICAgICAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucy5kZWFkbGluZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXNwb25zZSc6XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IG9wdGlvbnMucmVzcG9uc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKFwiVW5rbm93biB0aW1lb3V0IG9wdGlvblwiLCBvcHRpb24pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IG51bWJlciBvZiByZXRyeSBhdHRlbXB0cyBvbiBlcnJvci5cbiAqXG4gKiBGYWlsZWQgcmVxdWVzdHMgd2lsbCBiZSByZXRyaWVkICdjb3VudCcgdGltZXMgaWYgdGltZW91dCBvciBlcnIuY29kZSA+PSA1MDAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJldHJ5ID0gZnVuY3Rpb24gcmV0cnkoY291bnQpe1xuICAvLyBEZWZhdWx0IHRvIDEgaWYgbm8gY291bnQgcGFzc2VkIG9yIHRydWVcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgY291bnQgPT09IHRydWUpIGNvdW50ID0gMTtcbiAgaWYgKGNvdW50IDw9IDApIGNvdW50ID0gMDtcbiAgdGhpcy5fbWF4UmV0cmllcyA9IGNvdW50O1xuICB0aGlzLl9yZXRyaWVzID0gMDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJldHJ5IHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fcmV0cnkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICAvLyBub2RlXG4gIGlmICh0aGlzLnJlcSkge1xuICAgIHRoaXMucmVxID0gbnVsbDtcbiAgICB0aGlzLnJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICB9XG5cbiAgdGhpcy5fYWJvcnRlZCA9IGZhbHNlO1xuICB0aGlzLnRpbWVkb3V0ID0gZmFsc2U7XG5cbiAgcmV0dXJuIHRoaXMuX2VuZCgpO1xufTtcblxuLyoqXG4gKiBQcm9taXNlIHN1cHBvcnRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVqZWN0XVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIHRoZW4ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gIGlmICghdGhpcy5fZnVsbGZpbGxlZFByb21pc2UpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgICAgY29uc29sZS53YXJuKFwiV2FybmluZzogc3VwZXJhZ2VudCByZXF1ZXN0IHdhcyBzZW50IHR3aWNlLCBiZWNhdXNlIGJvdGggLmVuZCgpIGFuZCAudGhlbigpIHdlcmUgY2FsbGVkLiBOZXZlciBjYWxsIC5lbmQoKSBpZiB5b3UgdXNlIHByb21pc2VzXCIpO1xuICAgIH1cbiAgICB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKGlubmVyUmVzb2x2ZSwgaW5uZXJSZWplY3Qpe1xuICAgICAgc2VsZi5lbmQoZnVuY3Rpb24oZXJyLCByZXMpe1xuICAgICAgICBpZiAoZXJyKSBpbm5lclJlamVjdChlcnIpOyBlbHNlIGlubmVyUmVzb2x2ZShyZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbn1cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmNhdGNoID0gZnVuY3Rpb24oY2IpIHtcbiAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIGNiKTtcbn07XG5cbi8qKlxuICogQWxsb3cgZm9yIGV4dGVuc2lvblxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZm4pIHtcbiAgZm4odGhpcyk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUub2sgPSBmdW5jdGlvbihjYikge1xuICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGNiKSB0aHJvdyBFcnJvcihcIkNhbGxiYWNrIHJlcXVpcmVkXCIpO1xuICB0aGlzLl9va0NhbGxiYWNrID0gY2I7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9pc1Jlc3BvbnNlT0sgPSBmdW5jdGlvbihyZXMpIHtcbiAgaWYgKCFyZXMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodGhpcy5fb2tDYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9va0NhbGxiYWNrKHJlcyk7XG4gIH1cblxuICByZXR1cm4gcmVzLnN0YXR1cyA+PSAyMDAgJiYgcmVzLnN0YXR1cyA8IDMwMDtcbn07XG5cblxuLyoqXG4gKiBHZXQgcmVxdWVzdCBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGhlYWRlciBgZmllbGRgIHZhbHVlLlxuICogVGhpcyBpcyBhIGRlcHJlY2F0ZWQgaW50ZXJuYWwgQVBJLiBVc2UgYC5nZXQoZmllbGQpYCBpbnN0ZWFkLlxuICpcbiAqIChnZXRIZWFkZXIgaXMgbm8gbG9uZ2VyIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgc3VwZXJhZ2VudCBjb2RlIGJhc2UpXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqIEBkZXByZWNhdGVkXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldEhlYWRlciA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQ7XG5cbi8qKlxuICogU2V0IGhlYWRlciBgZmllbGRgIHRvIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0LlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2V0KCdYLUFQSS1LZXknLCAnZm9vYmFyJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoeyBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtQVBJLUtleSc6ICdmb29iYXInIH0pXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihmaWVsZCwgdmFsKXtcbiAgaWYgKGlzT2JqZWN0KGZpZWxkKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBmaWVsZCkge1xuICAgICAgdGhpcy5zZXQoa2V5LCBmaWVsZFtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldID0gdmFsO1xuICB0aGlzLmhlYWRlcltmaWVsZF0gPSB2YWw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgaGVhZGVyIGBmaWVsZGAuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAudW5zZXQoJ1VzZXItQWdlbnQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIGRlbGV0ZSB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG4gIGRlbGV0ZSB0aGlzLmhlYWRlcltmaWVsZF07XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBXcml0ZSB0aGUgZmllbGQgYG5hbWVgIGFuZCBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdFxuICogZm9yIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiIHJlcXVlc3QgYm9kaWVzLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmZpZWxkKCdmb28nLCAnYmFyJylcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmZpZWxkKHsgZm9vOiAnYmFyJywgYmF6OiAncXV4JyB9KVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd8QmxvYnxGaWxlfEJ1ZmZlcnxmcy5SZWFkU3RyZWFtfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG5cbiAgLy8gbmFtZSBzaG91bGQgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIG9iamVjdC5cbiAgaWYgKG51bGwgPT09IG5hbWUgfHwgIHVuZGVmaW5lZCA9PT0gbmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgbmFtZSBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cblxuICBpZiAodGhpcy5fZGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCIuZmllbGQoKSBjYW4ndCBiZSB1c2VkIGlmIC5zZW5kKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiKTtcbiAgfVxuXG4gIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICB0aGlzLmZpZWxkKGtleSwgbmFtZVtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgZm9yICh2YXIgaSBpbiB2YWwpIHtcbiAgICAgIHRoaXMuZmllbGQobmFtZSwgdmFsW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyB2YWwgc2hvdWxkIGJlIGRlZmluZWQgbm93XG4gIGlmIChudWxsID09PSB2YWwgfHwgdW5kZWZpbmVkID09PSB2YWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJy5maWVsZChuYW1lLCB2YWwpIHZhbCBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PT0gdHlwZW9mIHZhbCkge1xuICAgIHZhbCA9ICcnICsgdmFsO1xuICB9XG4gIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKG5hbWUsIHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBYm9ydCB0aGUgcmVxdWVzdCwgYW5kIGNsZWFyIHBvdGVudGlhbCB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpe1xuICBpZiAodGhpcy5fYWJvcnRlZCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHRoaXMuX2Fib3J0ZWQgPSB0cnVlO1xuICB0aGlzLnhociAmJiB0aGlzLnhoci5hYm9ydCgpOyAvLyBicm93c2VyXG4gIHRoaXMucmVxICYmIHRoaXMucmVxLmFib3J0KCk7IC8vIG5vZGVcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgdGhpcy5lbWl0KCdhYm9ydCcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW5hYmxlIHRyYW5zbWlzc2lvbiBvZiBjb29raWVzIHdpdGggeC1kb21haW4gcmVxdWVzdHMuXG4gKlxuICogTm90ZSB0aGF0IGZvciB0aGlzIHRvIHdvcmsgdGhlIG9yaWdpbiBtdXN0IG5vdCBiZVxuICogdXNpbmcgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiB3aXRoIGEgd2lsZGNhcmQsXG4gKiBhbmQgYWxzbyBtdXN0IHNldCBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCJcbiAqIHRvIFwidHJ1ZVwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uKG9uKXtcbiAgLy8gVGhpcyBpcyBicm93c2VyLW9ubHkgZnVuY3Rpb25hbGl0eS4gTm9kZSBzaWRlIGlzIG5vLW9wLlxuICBpZihvbj09dW5kZWZpbmVkKSBvbiA9IHRydWU7XG4gIHRoaXMuX3dpdGhDcmVkZW50aWFscyA9IG9uO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtYXggcmVkaXJlY3RzIHRvIGBuYC4gRG9lcyBub3RpbmcgaW4gYnJvd3NlciBYSFIgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVkaXJlY3RzID0gZnVuY3Rpb24obil7XG4gIHRoaXMuX21heFJlZGlyZWN0cyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IHRvIGEgcGxhaW4gamF2YXNjcmlwdCBvYmplY3QgKG5vdCBKU09OIHN0cmluZykgb2Ygc2NhbGFyIHByb3BlcnRpZXMuXG4gKiBOb3RlIGFzIHRoaXMgbWV0aG9kIGlzIGRlc2lnbmVkIHRvIHJldHVybiBhIHVzZWZ1bCBub24tdGhpcyB2YWx1ZSxcbiAqIGl0IGNhbm5vdCBiZSBjaGFpbmVkLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZGVzY3JpYmluZyBtZXRob2QsIHVybCwgYW5kIGRhdGEgb2YgdGhpcyByZXF1ZXN0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpe1xuICByZXR1cm4ge1xuICAgIG1ldGhvZDogdGhpcy5tZXRob2QsXG4gICAgdXJsOiB0aGlzLnVybCxcbiAgICBkYXRhOiB0aGlzLl9kYXRhLFxuICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlclxuICB9O1xufTtcblxuXG4vKipcbiAqIFNlbmQgYGRhdGFgIGFzIHRoZSByZXF1ZXN0IGJvZHksIGRlZmF1bHRpbmcgdGhlIGAudHlwZSgpYCB0byBcImpzb25cIiB3aGVuXG4gKiBhbiBvYmplY3QgaXMgZ2l2ZW4uXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gbWFudWFsIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnanNvbicpXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifScpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoJ25hbWU9dGonKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0cyB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoJ25hbWU9dG9iaScpXG4gKiAgICAgICAgLnNlbmQoJ3NwZWNpZXM9ZmVycmV0JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oZGF0YSl7XG4gIHZhciBpc09iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICB2YXIgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG5cbiAgaWYgKHRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgY29uc29sZS5lcnJvcihcIi5zZW5kKCkgY2FuJ3QgYmUgdXNlZCBpZiAuYXR0YWNoKCkgb3IgLmZpZWxkKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiKTtcbiAgfVxuXG4gIGlmIChpc09iaiAmJiAhdGhpcy5fZGF0YSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICB0aGlzLl9kYXRhID0gW107XG4gICAgfSBlbHNlIGlmICghdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgfVxuICB9IGVsc2UgaWYgKGRhdGEgJiYgdGhpcy5fZGF0YSAmJiB0aGlzLl9pc0hvc3QodGhpcy5fZGF0YSkpIHtcbiAgICB0aHJvdyBFcnJvcihcIkNhbid0IG1lcmdlIHRoZXNlIHNlbmQgY2FsbHNcIik7XG4gIH1cblxuICAvLyBtZXJnZVxuICBpZiAoaXNPYmogJiYgaXNPYmplY3QodGhpcy5fZGF0YSkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgdGhpcy5fZGF0YVtrZXldID0gZGF0YVtrZXldO1xuICAgIH1cbiAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PSB0eXBlb2YgZGF0YSkge1xuICAgIC8vIGRlZmF1bHQgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2Zvcm0nKTtcbiAgICB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICBpZiAoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgPT0gdHlwZSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX2RhdGFcbiAgICAgICAgPyB0aGlzLl9kYXRhICsgJyYnICsgZGF0YVxuICAgICAgICA6IGRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGEgPSAodGhpcy5fZGF0YSB8fCAnJykgKyBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlmICghaXNPYmogfHwgdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBkZWZhdWx0IHRvIGpzb25cbiAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2pzb24nKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogU29ydCBgcXVlcnlzdHJpbmdgIGJ5IHRoZSBzb3J0IGZ1bmN0aW9uXG4gKlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgIC8vIGRlZmF1bHQgb3JkZXJcbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvdXNlcicpXG4gKiAgICAgICAgIC5xdWVyeSgnbmFtZT1OaWNrJylcbiAqICAgICAgICAgLnF1ZXJ5KCdzZWFyY2g9TWFubnknKVxuICogICAgICAgICAuc29ydFF1ZXJ5KClcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBjdXN0b21pemVkIHNvcnQgZnVuY3Rpb25cbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvdXNlcicpXG4gKiAgICAgICAgIC5xdWVyeSgnbmFtZT1OaWNrJylcbiAqICAgICAgICAgLnF1ZXJ5KCdzZWFyY2g9TWFubnknKVxuICogICAgICAgICAuc29ydFF1ZXJ5KGZ1bmN0aW9uKGEsIGIpe1xuICogICAgICAgICAgIHJldHVybiBhLmxlbmd0aCAtIGIubGVuZ3RoO1xuICogICAgICAgICB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzb3J0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNvcnRRdWVyeSA9IGZ1bmN0aW9uKHNvcnQpIHtcbiAgLy8gX3NvcnQgZGVmYXVsdCB0byB0cnVlIGJ1dCBvdGhlcndpc2UgY2FuIGJlIGEgZnVuY3Rpb24gb3IgYm9vbGVhblxuICB0aGlzLl9zb3J0ID0gdHlwZW9mIHNvcnQgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IHNvcnQ7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB0aW1lb3V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fdGltZW91dEVycm9yID0gZnVuY3Rpb24ocmVhc29uLCB0aW1lb3V0LCBlcnJubyl7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IocmVhc29uICsgdGltZW91dCArICdtcyBleGNlZWRlZCcpO1xuICBlcnIudGltZW91dCA9IHRpbWVvdXQ7XG4gIGVyci5jb2RlID0gJ0VDT05OQUJPUlRFRCc7XG4gIGVyci5lcnJubyA9IGVycm5vO1xuICB0aGlzLnRpbWVkb3V0ID0gdHJ1ZTtcbiAgdGhpcy5hYm9ydCgpO1xuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3NldFRpbWVvdXRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICAvLyBkZWFkbGluZVxuICBpZiAodGhpcy5fdGltZW91dCAmJiAhdGhpcy5fdGltZXIpIHtcbiAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHNlbGYuX3RpbWVvdXRFcnJvcignVGltZW91dCBvZiAnLCBzZWxmLl90aW1lb3V0LCAnRVRJTUUnKTtcbiAgICB9LCB0aGlzLl90aW1lb3V0KTtcbiAgfVxuICAvLyByZXNwb25zZSB0aW1lb3V0XG4gIGlmICh0aGlzLl9yZXNwb25zZVRpbWVvdXQgJiYgIXRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyKSB7XG4gICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoJ1Jlc3BvbnNlIHRpbWVvdXQgb2YgJywgc2VsZi5fcmVzcG9uc2VUaW1lb3V0LCAnRVRJTUVET1VUJyk7XG4gICAgfSwgdGhpcy5fcmVzcG9uc2VUaW1lb3V0KTtcbiAgfVxufVxuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VCYXNlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3BvbnNlQmFzZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZUJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2VCYXNlKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cblxuLyoqXG4gKiBNaXhpbiB0aGUgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBSZXNwb25zZUJhc2UucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBSZXNwb25zZUJhc2UucHJvdG90eXBlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgICByZXR1cm4gdGhpcy5oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgcmVsYXRlZCBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBgLnR5cGVgIHRoZSBjb250ZW50IHR5cGUgd2l0aG91dCBwYXJhbXNcbiAqXG4gKiBBIHJlc3BvbnNlIG9mIFwiQ29udGVudC1UeXBlOiB0ZXh0L3BsYWluOyBjaGFyc2V0PXV0Zi04XCJcbiAqIHdpbGwgcHJvdmlkZSB5b3Ugd2l0aCBhIGAudHlwZWAgb2YgXCJ0ZXh0L3BsYWluXCIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0SGVhZGVyUHJvcGVydGllcyA9IGZ1bmN0aW9uKGhlYWRlcil7XG4gICAgLy8gVE9ETzogbW9hciFcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgYSB1dGlsXG5cbiAgICAvLyBjb250ZW50LXR5cGVcbiAgICB2YXIgY3QgPSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICAgIHRoaXMudHlwZSA9IHV0aWxzLnR5cGUoY3QpO1xuXG4gICAgLy8gcGFyYW1zXG4gICAgdmFyIHBhcmFtcyA9IHV0aWxzLnBhcmFtcyhjdCk7XG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykgdGhpc1trZXldID0gcGFyYW1zW2tleV07XG5cbiAgICB0aGlzLmxpbmtzID0ge307XG5cbiAgICAvLyBsaW5rc1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChoZWFkZXIubGluaykge1xuICAgICAgICAgICAgdGhpcy5saW5rcyA9IHV0aWxzLnBhcnNlTGlua3MoaGVhZGVyLmxpbmspO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIGlnbm9yZVxuICAgIH1cbn07XG5cbi8qKlxuICogU2V0IGZsYWdzIHN1Y2ggYXMgYC5va2AgYmFzZWQgb24gYHN0YXR1c2AuXG4gKlxuICogRm9yIGV4YW1wbGUgYSAyeHggcmVzcG9uc2Ugd2lsbCBnaXZlIHlvdSBhIGAub2tgIG9mIF9fdHJ1ZV9fXG4gKiB3aGVyZWFzIDV4eCB3aWxsIGJlIF9fZmFsc2VfXyBhbmQgYC5lcnJvcmAgd2lsbCBiZSBfX3RydWVfXy4gVGhlXG4gKiBgLmNsaWVudEVycm9yYCBhbmQgYC5zZXJ2ZXJFcnJvcmAgYXJlIGFsc28gYXZhaWxhYmxlIHRvIGJlIG1vcmVcbiAqIHNwZWNpZmljLCBhbmQgYC5zdGF0dXNUeXBlYCBpcyB0aGUgY2xhc3Mgb2YgZXJyb3IgcmFuZ2luZyBmcm9tIDEuLjVcbiAqIHNvbWV0aW1lcyB1c2VmdWwgZm9yIG1hcHBpbmcgcmVzcG9uZCBjb2xvcnMgZXRjLlxuICpcbiAqIFwic3VnYXJcIiBwcm9wZXJ0aWVzIGFyZSBhbHNvIGRlZmluZWQgZm9yIGNvbW1vbiBjYXNlcy4gQ3VycmVudGx5IHByb3ZpZGluZzpcbiAqXG4gKiAgIC0gLm5vQ29udGVudFxuICogICAtIC5iYWRSZXF1ZXN0XG4gKiAgIC0gLnVuYXV0aG9yaXplZFxuICogICAtIC5ub3RBY2NlcHRhYmxlXG4gKiAgIC0gLm5vdEZvdW5kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cyl7XG4gICAgdmFyIHR5cGUgPSBzdGF0dXMgLyAxMDAgfCAwO1xuXG4gICAgLy8gc3RhdHVzIC8gY2xhc3NcbiAgICB0aGlzLnN0YXR1cyA9IHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgICB0aGlzLnN0YXR1c1R5cGUgPSB0eXBlO1xuXG4gICAgLy8gYmFzaWNzXG4gICAgdGhpcy5pbmZvID0gMSA9PSB0eXBlO1xuICAgIHRoaXMub2sgPSAyID09IHR5cGU7XG4gICAgdGhpcy5yZWRpcmVjdCA9IDMgPT0gdHlwZTtcbiAgICB0aGlzLmNsaWVudEVycm9yID0gNCA9PSB0eXBlO1xuICAgIHRoaXMuc2VydmVyRXJyb3IgPSA1ID09IHR5cGU7XG4gICAgdGhpcy5lcnJvciA9ICg0ID09IHR5cGUgfHwgNSA9PSB0eXBlKVxuICAgICAgICA/IHRoaXMudG9FcnJvcigpXG4gICAgICAgIDogZmFsc2U7XG5cbiAgICAvLyBzdWdhclxuICAgIHRoaXMuYWNjZXB0ZWQgPSAyMDIgPT0gc3RhdHVzO1xuICAgIHRoaXMubm9Db250ZW50ID0gMjA0ID09IHN0YXR1cztcbiAgICB0aGlzLmJhZFJlcXVlc3QgPSA0MDAgPT0gc3RhdHVzO1xuICAgIHRoaXMudW5hdXRob3JpemVkID0gNDAxID09IHN0YXR1cztcbiAgICB0aGlzLm5vdEFjY2VwdGFibGUgPSA0MDYgPT0gc3RhdHVzO1xuICAgIHRoaXMuZm9yYmlkZGVuID0gNDAzID09IHN0YXR1cztcbiAgICB0aGlzLm5vdEZvdW5kID0gNDA0ID09IHN0YXR1cztcbn07XG4iLCJ2YXIgRVJST1JfQ09ERVMgPSBbXG4gICdFQ09OTlJFU0VUJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFQUREUklORk8nLFxuICAnRVNPQ0tFVFRJTUVET1VUJ1xuXTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSByZXF1ZXN0IHNob3VsZCBiZSByZXRyaWVkLlxuICogKEJvcnJvd2VkIGZyb20gc2VnbWVudGlvL3N1cGVyYWdlbnQtcmV0cnkpXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzXVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hvdWxkUmV0cnkoZXJyLCByZXMpIHtcbiAgaWYgKGVyciAmJiBlcnIuY29kZSAmJiB+RVJST1JfQ09ERVMuaW5kZXhPZihlcnIuY29kZSkpIHJldHVybiB0cnVlO1xuICBpZiAocmVzICYmIHJlcy5zdGF0dXMgJiYgcmVzLnN0YXR1cyA+PSA1MDApIHJldHVybiB0cnVlO1xuICAvLyBTdXBlcmFnZW50IHRpbWVvdXRcbiAgaWYgKGVyciAmJiAndGltZW91dCcgaW4gZXJyICYmIGVyci5jb2RlID09ICdFQ09OTkFCT1JURUQnKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKGVyciAmJiAnY3Jvc3NEb21haW4nIGluIGVycikgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG4iLCJcbi8qKlxuICogUmV0dXJuIHRoZSBtaW1lIHR5cGUgZm9yIHRoZSBnaXZlbiBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnR5cGUgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKjsgKi8pLnNoaWZ0KCk7XG59O1xuXG4vKipcbiAqIFJldHVybiBoZWFkZXIgZmllbGQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnBhcmFtcyA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqOyAqLykucmVkdWNlKGZ1bmN0aW9uKG9iaiwgc3RyKXtcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqPSAqLyk7XG4gICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgdmFyIHZhbCA9IHBhcnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoa2V5ICYmIHZhbCkgb2JqW2tleV0gPSB2YWw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBQYXJzZSBMaW5rIGhlYWRlciBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5wYXJzZUxpbmtzID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICosICovKS5yZWR1Y2UoZnVuY3Rpb24ob2JqLCBzdHIpe1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICo7ICovKTtcbiAgICB2YXIgdXJsID0gcGFydHNbMF0uc2xpY2UoMSwgLTEpO1xuICAgIHZhciByZWwgPSBwYXJ0c1sxXS5zcGxpdCgvICo9ICovKVsxXS5zbGljZSgxLCAtMSk7XG4gICAgb2JqW3JlbF0gPSB1cmw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBTdHJpcCBjb250ZW50IHJlbGF0ZWQgZmllbGRzIGZyb20gYGhlYWRlcmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQHJldHVybiB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuY2xlYW5IZWFkZXIgPSBmdW5jdGlvbihoZWFkZXIsIHNob3VsZFN0cmlwQ29va2llKXtcbiAgZGVsZXRlIGhlYWRlclsnY29udGVudC10eXBlJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtbGVuZ3RoJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ3RyYW5zZmVyLWVuY29kaW5nJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2hvc3QnXTtcbiAgaWYgKHNob3VsZFN0cmlwQ29va2llKSB7XG4gICAgZGVsZXRlIGhlYWRlclsnY29va2llJ107XG4gIH1cbiAgcmV0dXJuIGhlYWRlcjtcbn07Il19
