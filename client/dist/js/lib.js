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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvYnVpbGQvZ2xvYi5qcyIsImNsaWVudC9saWIvY29uZmlnLmpzIiwiY2xpZW50L2xpYi9tb2RlbHMvQ29uZmlnTW9kZWwuanMiLCJjbGllbnQvbGliL21vZGVscy9TZWFyY2hNb2RlbC5qcyIsImNsaWVudC9saWIvc2VydmljZXMvc2VhcmNoLmpzIiwiY2xpZW50L2xpYi9zZXJ2aWNlcy91dGlscy5qcyIsImNsaWVudC9saWIvc3RvcmUvU2VhcmNoU3RvcmUuanMiLCJub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yay1hcHAtdXRpbHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yay1hcHAtdXRpbHMvbGliL0Jhc2VNb2RlbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JrLWFwcC11dGlscy9saWIvQmFzZVNlcnZpY2UuanMiLCJub2RlX21vZHVsZXMvY29yay1hcHAtdXRpbHMvbGliL0Jhc2VTdG9yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JrLWFwcC11dGlscy9saWIvRXZlbnRCdXMuanMiLCJub2RlX21vZHVsZXMvY29yay1hcHAtdXRpbHMvbGliL1N0b3JlU2VydmljZVdyYXBwZXIuanMiLCJub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoLWJyb3dzZXJpZnkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2NsaWVudC5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9pcy1mdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvcmVxdWVzdC1iYXNlLmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3Jlc3BvbnNlLWJhc2UuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvc2hvdWxkLXJldHJ5LmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQSxJQUFJLE9BQU8sUUFBUSxNQUFSLENBQVg7O0FBR0EsT0FBTyxRQUFQLEdBQWtCLFFBQVEsZ0JBQVIsRUFBMEIsUUFBNUM7QUFDQSxPQUFPLFNBQVAsR0FBbUIsUUFBUSxnQkFBUixFQUEwQixTQUE3QztBQUNBLE9BQU8sR0FBUCxHQUFjLEVBQUMsVUFBUyxRQUFRLGtCQUFSLENBQVYsRUFBc0MsVUFBVSxFQUFDLGVBQWMsUUFBUSw4QkFBUixDQUFmLEVBQXVELGVBQWMsUUFBUSw4QkFBUixDQUFyRSxFQUFoRCxFQUErSixZQUFZLEVBQUMsVUFBUyxRQUFRLDJCQUFSLENBQVYsRUFBK0MsU0FBUSxRQUFRLDBCQUFSLENBQXZELEVBQTNLLEVBQXdRLFNBQVMsRUFBQyxlQUFjLFFBQVEsNkJBQVIsQ0FBZixFQUFqUixFQUFkOzs7OztBQ05BLE9BQU8sT0FBUCxHQUFpQjtBQUNmO0FBQ0E7QUFDQSxVQUFTO0FBQ1AsaUJBQWM7QUFDWixhQUFRLE9BREk7QUFFWixZQUFPO0FBRkssS0FEUDtBQUtQLHFCQUFrQjtBQUNoQixhQUFRLFdBRFE7QUFFaEIsWUFBTztBQUZTLEtBTFg7QUFTUCxhQUFVO0FBQ1IsYUFBUSxTQURBO0FBRVIsWUFBTztBQUZDLEtBVEg7QUFhUCxzQkFBbUI7QUFDakIsYUFBUSxXQURTO0FBRWpCLFlBQU87QUFGVSxLQWJaO0FBaUJQLGNBQVc7QUFDVCxhQUFRLGNBREM7QUFFVCxZQUFPLE9BRkU7QUFHVCxnQkFBVztBQUhGLEtBakJKO0FBc0JQLG1CQUFnQjtBQUNkLGFBQVEsU0FETTtBQUVkLFlBQU87QUFGTyxLQXRCVDtBQTBCUCx1QkFBb0I7QUFDbEIsYUFBUSxhQURVO0FBRWxCLFlBQU87QUFGVztBQTFCYixH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Q0FBZSxDQUFmLEVBQWtCLENBQUMsQ0FBbkIsQ0FBVjtBQUNBLFFBQUksTUFBTSxNQUFNLENBQU4sRUFBUyxLQUFULENBQWUsT0FBZixFQUF3QixDQUF4QixFQUEyQixLQUEzQixDQUFpQyxDQUFqQyxFQUFvQyxDQUFDLENBQXJDLENBQVY7QUFDQSxRQUFJLEdBQUosSUFBVyxHQUFYO0FBQ0EsV0FBTyxHQUFQO0FBQ0QsR0FOTSxFQU1KLEVBTkksQ0FBUDtBQU9ELENBUkQ7O0FBVUE7Ozs7Ozs7O0FBUUEsUUFBUSxXQUFSLEdBQXNCLFVBQVMsTUFBVCxFQUFpQixpQkFBakIsRUFBbUM7QUFDdkQsU0FBTyxPQUFPLGNBQVAsQ0FBUDtBQUNBLFNBQU8sT0FBTyxnQkFBUCxDQUFQO0FBQ0EsU0FBTyxPQUFPLG1CQUFQLENBQVA7QUFDQSxTQUFPLE9BQU8sTUFBUCxDQUFQO0FBQ0EsTUFBSSxpQkFBSixFQUF1QjtBQUNyQixXQUFPLE9BQU8sUUFBUCxDQUFQO0FBQ0Q7QUFDRCxTQUFPLE1BQVA7QUFDRCxDQVREIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cblxud2luZG93LkV2ZW50QnVzID0gcmVxdWlyZSgnY29yay1hcHAtdXRpbHMnKS5FdmVudEJ1cztcbndpbmRvdy5CYXNlTW9kZWwgPSByZXF1aXJlKCdjb3JrLWFwcC11dGlscycpLkJhc2VNb2RlbDtcbndpbmRvdy5BcHAgPSAoe1wiY29uZmlnXCI6cmVxdWlyZShcIi4uL2xpYi9jb25maWcuanNcIiksXCJtb2RlbHNcIjooe1wiQ29uZmlnTW9kZWxcIjpyZXF1aXJlKFwiLi4vbGliL21vZGVscy9Db25maWdNb2RlbC5qc1wiKSxcIlNlYXJjaE1vZGVsXCI6cmVxdWlyZShcIi4uL2xpYi9tb2RlbHMvU2VhcmNoTW9kZWwuanNcIil9KSxcInNlcnZpY2VzXCI6KHtcInNlYXJjaFwiOnJlcXVpcmUoXCIuLi9saWIvc2VydmljZXMvc2VhcmNoLmpzXCIpLFwidXRpbHNcIjpyZXF1aXJlKFwiLi4vbGliL3NlcnZpY2VzL3V0aWxzLmpzXCIpfSksXCJzdG9yZVwiOih7XCJTZWFyY2hTdG9yZVwiOnJlcXVpcmUoXCIuLi9saWIvc3RvcmUvU2VhcmNoU3RvcmUuanNcIil9KX0pOyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBmYWNldHMgdG8gc2hvdyBvbiBsZWZ0IHNpZGVcbiAgLy8gZmlsdGVyIDogbGFiZWxcbiAgZmFjZXRzIDoge1xuICAgICdjb2xvci5yYXcnIDoge1xuICAgICAgbGFiZWwgOiAnQ29sb3InLFxuICAgICAgdHlwZSA6ICdmYWNldCdcbiAgICB9LFxuICAgICd3aW5lX3R5cGUucmF3JyA6IHtcbiAgICAgIGxhYmVsIDogJ1dpbmUgVHlwZScsXG4gICAgICB0eXBlIDogJ2ZhY2V0J1xuICAgIH0sXG4gICAgdmludGFnZSA6IHtcbiAgICAgIGxhYmVsIDogJ1ZpbnRhZ2UnLFxuICAgICAgdHlwZSA6ICdyYW5nZSdcbiAgICB9LFxuICAgIHB1YmxpY2F0aW9uX2RhdGUgOiB7XG4gICAgICBsYWJlbCA6ICdQdWJsaXNoZWQnLFxuICAgICAgdHlwZSA6ICdyYW5nZSdcbiAgICB9LFxuICAgIHBlcnByaWNlIDoge1xuICAgICAgbGFiZWwgOiAnQm90dGxlIFByaWNlJyxcbiAgICAgIHR5cGUgOiAncmFuZ2UnLFxuICAgICAgaXNEb2xsYXIgOiB0cnVlXG4gICAgfSxcbiAgICAnY291bnRyeS5yYXcnIDoge1xuICAgICAgbGFiZWwgOiAnQ291bnRyeScsXG4gICAgICB0eXBlIDogJ2ZhY2V0J1xuICAgIH0sXG4gICAgJ2JvdHRsZV90eXBlLnJhdycgOiB7XG4gICAgICBsYWJlbCA6ICdCb3R0bGUgU2l6ZScsXG4gICAgICB0eXBlIDogJ2ZhY2V0J1xuICAgIH1cbiAgfSxcbiAgXG4gIC8vIG1heCBudW1iZXIgb2YgZmFjZXRzIGZpbHRlciBvcHRpb25zXG4gIG1heEZhY2V0Q291bnQgOiAxMFxufSIsInZhciBCYXNlTW9kZWwgPSByZXF1aXJlKCdjb3JrLWFwcC11dGlscycpLkJhc2VNb2RlbDtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxuY2xhc3MgQ29uZmlnTW9kZWwgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZWdpc3RlcklPQygnQ29uZmlnTW9kZWwnKTtcbiAgfVxuXG4gIGFzeW5jIGdldCgpIHtcbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgQ29uZmlnTW9kZWwoKTsiLCJ2YXIgQmFzZU1vZGVsID0gcmVxdWlyZSgnY29yay1hcHAtdXRpbHMnKS5CYXNlTW9kZWw7XG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XG52YXIgU2VhcmNoU2VydmljZSA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL3NlYXJjaCcpO1xudmFyIFNlYXJjaFN0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmUvU2VhcmNoU3RvcmUnKTtcbnZhciBTZXJ2aWNlV3JhcHBlciA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL3V0aWxzJyk7XG5cbmNsYXNzIFNlYXJjaE1vZGVsIGV4dGVuZHMgQmFzZU1vZGVsIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RvcmUgPSBTZWFyY2hTdG9yZTtcbiAgICB0aGlzLnNlcnZpY2UgPSBTZWFyY2hTZXJ2aWNlO1xuXG4gICAgdGhpcy5mcm9tID0gMDtcbiAgICB0aGlzLnNpemUgPSAxMDtcbiAgICB0aGlzLnNvcnQgPSB7XG4gICAgICBrZXkgOiAnJyxcbiAgICAgIG9yZGVyIDogJydcbiAgICB9XG5cbiAgICB0aGlzLmRlZmF1bHRTZWFyY2goKTtcblxuICAgIHRoaXMucmVnaXN0ZXJJT0MoJ1NlYXJjaE1vZGVsJyk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgc2VhcmNoLXVwZGF0ZSBldmVudFxuICAgKi9cbiAgc2VhcmNoKGJvZHkgPSB7fSkge1xuICAgIGJvZHkuYWdncyA9IHt9O1xuXG4gICAgYm9keS5mcm9tID0gdGhpcy5mcm9tO1xuICAgIGJvZHkuc2l6ZSA9IHRoaXMuc2l6ZTtcblxuICAgIGlmKCB0aGlzLnNvcnQua2V5ICkge1xuICAgICAgYm9keS5zb3J0ID0gW3tbdGhpcy5zb3J0LmtleV0gOiB0aGlzLnNvcnQub3JkZXJ9XTtcbiAgICB9IGVsc2UgaWYoIGJvZHkuc29ydCApIHtcbiAgICAgIGRlbGV0ZSBib2R5LnNvcnQ7XG4gICAgfVxuXG4gICAgdGhpcy5fYWRkRmFjZXRzVG9Cb2R5KGJvZHkpO1xuXG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5zZWFyY2goYm9keSk7XG4gIH1cblxuICBkZWZhdWx0U2VhcmNoKCkge1xuICAgIHZhciBib2R5ID0ge1xuICAgICAgYWdncyA6IHt9LFxuICAgICAgZnJvbSA6IDAsXG4gICAgICBzaXplIDogdGhpcy5zaXplXG4gICAgfTtcblxuICAgIGZvciggdmFyIGtleSBpbiBjb25maWcuZmFjZXRzICkge1xuICAgICAgaWYoIGNvbmZpZy5mYWNldHNba2V5XS50eXBlID09PSAnZmFjZXQnICkge1xuICAgICAgICBib2R5LmFnZ3Nba2V5XSA9IHtcbiAgICAgICAgICB0ZXJtcyA6IHsgXG4gICAgICAgICAgICBmaWVsZCA6IGtleSxcbiAgICAgICAgICAgIHNpemUgOiAxMDAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYoIGNvbmZpZy5mYWNldHNba2V5XS50eXBlID09PSAncmFuZ2UnICkge1xuICAgICAgICBib2R5LmFnZ3Nba2V5KyctbWluJ10gPSB7XG4gICAgICAgICAgbWluIDogeyBcbiAgICAgICAgICAgIGZpZWxkIDoga2V5XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJvZHkuYWdnc1trZXkrJy1tYXgnXSA9IHtcbiAgICAgICAgICBtYXggOiB7IFxuICAgICAgICAgICAgZmllbGQgOiBrZXlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmRlZmF1bHRTZWFyY2goYm9keSk7XG4gIH1cblxuICBfYWRkRmFjZXRzVG9Cb2R5KGJvZHkpIHtcbiAgICBmb3IoIHZhciBrZXkgaW4gY29uZmlnLmZhY2V0cyApIHtcbiAgICAgIGlmKCBjb25maWcuZmFjZXRzW2tleV0udHlwZSA9PT0gJ3JhbmdlJyApIHtcbiAgICAgICAgYm9keS5hZ2dzW2tleSsnLW1pbiddID0ge1xuICAgICAgICAgIG1pbiA6IHsgXG4gICAgICAgICAgICBmaWVsZCA6IGtleVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBib2R5LmFnZ3Nba2V5KyctbWF4J10gPSB7XG4gICAgICAgICAgbWF4IDogeyBcbiAgICAgICAgICAgIGZpZWxkIDoga2V5XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVmYXVsdFNlYXJjaCgpIHtcbiAgICB2YXIgY3VycmVudFN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLmRlZmF1bHRTZWFyY2g7XG4gIH1cblxuICBnZXRTZWFyY2goKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U2VhcmNoKCk7XG4gIH1cblxuICBnZXREZWZhdWx0U2VhcmNoKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldERlZmF1bHRTZWFyY2goKTtcbiAgfVxuXG4gIGdldFN1Z2dlc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3VnZ2VzdCgpO1xuICB9XG5cbiAgc2V0U29ydChrZXksIG9yZGVyLCBleGVjKSB7XG4gICAgdGhpcy5zb3J0ID0ge2tleSwgb3JkZXJ9O1xuICAgIGlmKCBleGVjICkgdGhpcy5zZWFyY2godGhpcy5nZXRTZWFyY2goKS5yZXF1ZXN0KTtcbiAgfVxuXG4gIHNldFBhZ2luZyhmcm9tID0gMCwgc2l6ZSA9IDEwLCBleGVjKSB7XG4gICAgdGhpcy5mcm9tID0gZnJvbTtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuXG4gICAgaWYoIGV4ZWMgKSB0aGlzLnNlYXJjaCh0aGlzLmdldFNlYXJjaCgpLnJlcXVlc3QpO1xuICB9XG5cbiAgY2xlYXJGaWx0ZXJzKCkge1xuICAgIHZhciBib2R5ID0gdGhpcy5nZXRTZWFyY2goKS5yZXF1ZXN0O1xuICAgIGlmKCBib2R5LnF1ZXJ5ICkgZGVsZXRlIGJvZHkucXVlcnk7XG5cbiAgICB0aGlzLnNldFBhZ2luZygpOyAvLyByZXNldCBwYWdlXG4gICAgdGhpcy5zZWFyY2goYm9keSk7XG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cblxuICBhcHBlbmRGaWx0ZXIoa2V5LCB2YWx1ZSwgZXhlYykge1xuICAgIHRoaXMuZW5zdXJlUGF0aCgncXVlcnkuYm9vbC5maWx0ZXInLCBbXSk7XG4gICAgdmFyIGJvZHkgPSB0aGlzLmdldFNlYXJjaCgpLnJlcXVlc3Q7XG5cbiAgICB2YXIgYXJyID0gYm9keS5xdWVyeS5ib29sLmZpbHRlcjtcbiAgICB2YXIgdXBkYXRlZCA9IGZhbHNlO1xuXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggYXJyW2ldLnRlcm1zW2tleV0gKSB7XG4gICAgICAgIGFycltpXS50ZXJtc1trZXldLnB1c2godmFsdWUpO1xuICAgICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoICF1cGRhdGVkICkge1xuICAgICAgYXJyLnB1c2goe1xuICAgICAgICB0ZXJtcyA6IHtcbiAgICAgICAgICBba2V5XSA6IFt2YWx1ZV1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYoIGV4ZWMgKSB7XG4gICAgICB0aGlzLnNldFBhZ2luZygpOyAvLyByZXNldCBwYWdlXG4gICAgICB0aGlzLnNlYXJjaChib2R5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9keTtcbiAgfVxuXG4gIHJlbW92ZUZpbHRlcihrZXksIHZhbHVlLCBleGVjKSB7XG4gICAgdGhpcy5lbnN1cmVQYXRoKCdxdWVyeS5ib29sLmZpbHRlcicsIFtdKTtcbiAgICB2YXIgYm9keSA9IHRoaXMuZ2V0U2VhcmNoKCkucmVxdWVzdDtcblxuICAgIHZhciBhcnIgPSBib2R5LnF1ZXJ5LmJvb2wuZmlsdGVyO1xuXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggYXJyW2ldLnRlcm1zW2tleV0gKSB7XG4gICAgICAgIGlmKCBhcnJbaV0udGVybXNba2V5XS5pbmRleE9mKHZhbHVlKSA+IC0xICkge1xuICAgICAgICAgIGFycltpXS50ZXJtc1trZXldLnNwbGljZShhcnJbaV0udGVybXNba2V5XS5pbmRleE9mKHZhbHVlKSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNsZWFuRW1wdHlMZWF2ZXMoKTtcbiAgICBpZiggZXhlYyApIHtcbiAgICAgIHRoaXMuc2V0UGFnaW5nKCk7IC8vIHJlc2V0IHBhZ2VcbiAgICAgIHRoaXMuc2VhcmNoKGJvZHkpO1xuICAgIH1cblxuICAgIHJldHVybiBib2R5O1xuICB9XG5cbiAgcmVtb3ZlUmFuZ2VGaWx0ZXIoa2V5LCBleGVjKSB7XG4gICAgdGhpcy5lbnN1cmVQYXRoKCdxdWVyeS5ib29sLm11c3QnLCBbXSk7XG4gICAgdmFyIGJvZHkgPSB0aGlzLmdldFNlYXJjaCgpLnJlcXVlc3Q7XG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGJvZHkucXVlcnkuYm9vbC5tdXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGJvZHkucXVlcnkuYm9vbC5tdXN0W2ldLnJhbmdlICkge1xuXG4gICAgICAgIGlmKCBib2R5LnF1ZXJ5LmJvb2wubXVzdFtpXS5yYW5nZVtrZXldICkge1xuICAgICAgICAgIGRlbGV0ZSBib2R5LnF1ZXJ5LmJvb2wubXVzdFtpXS5yYW5nZVtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jbGVhbkVtcHR5TGVhdmVzKCk7XG4gICAgaWYoIGV4ZWMgKSB7XG4gICAgICB0aGlzLnNldFBhZ2luZygpOyAvLyByZXNldCBwYWdlXG4gICAgICB0aGlzLnNlYXJjaChib2R5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9keTtcbiAgfVxuXG4gIGFkZFJhbmdlRmlsdGVyKGtleSwgcmFuZ2UsIGV4ZWMpIHtcbiAgICB0aGlzLmVuc3VyZVBhdGgoJ3F1ZXJ5LmJvb2wubXVzdCcsIFtdKTtcbiAgICB2YXIgYm9keSA9IHRoaXMuZ2V0U2VhcmNoKCkucmVxdWVzdDtcbiAgICB2YXIgcmFuZ2VRdWVyeSA9IHRoaXMuZ2V0T3JDcmVhdGVGcm9tQXJyYXkoYm9keS5xdWVyeS5ib29sLm11c3QsICdyYW5nZScsIGtleSk7XG5cbiAgICByYW5nZVF1ZXJ5W2tleV0gPSB7fTtcbiAgICBpZiggcmFuZ2UubWluICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByYW5nZVF1ZXJ5W2tleV0uZ3RlID0gcmFuZ2UubWluO1xuICAgIH1cbiAgICBpZiggcmFuZ2UubWF4ICkge1xuICAgICAgcmFuZ2VRdWVyeVtrZXldLmx0ZSA9IHJhbmdlLm1heDtcbiAgICB9XG5cbiAgICBpZiggZXhlYyApIHtcbiAgICAgIHRoaXMuc2V0UGFnaW5nKCk7IC8vIHJlc2V0IHBhZ2VcbiAgICAgIHRoaXMuc2VhcmNoKGJvZHkpO1xuICAgIH1cblxuICAgIHJldHVybiBib2R5O1xuICB9XG5cbiAgc3VnZ2VzdCh0ZXh0LCBleGVjKSB7XG4gICAgdGhpcy5lbnN1cmVQYXRoKCdzdWdnZXN0Jyk7XG4gICAgdmFyIGJvZHkgPSB0aGlzLmdldFN1Z2dlc3QoKS5yZXF1ZXN0O1xuICAgIGJvZHkgPSB7c3VnZ2VzdDoge319O1xuXG4gICAgYm9keS5zdWdnZXN0WyduYW1lLXN1Z2dlc3QnXSA9IHtcbiAgICAgIHByZWZpeCA6IHRleHQsXG4gICAgICBjb21wbGV0aW9uIDoge1xuICAgICAgICBmaWVsZCA6ICduYW1lLXN1Z2dlc3QnLFxuICAgICAgICBmdXp6eSA6IHt9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5zdWdnZXN0KGJvZHkpO1xuICB9XG5cbiAgcmVtb3ZlU3VnZ2VzdChrZXksIGV4ZWMpIHtcbiAgICB2YXIgYm9keSA9IHRoaXMuZ2V0U2VhcmNoKCkucmVxdWVzdDtcblxuICAgIGlmKCBib2R5LnN1Z2dlc3QgJiYgYm9keS5zdWdnZXN0W2tleV0gKSB7XG4gICAgICBkZWxldGUgYm9keS5zdWdnZXN0W2tleV07XG4gICAgfVxuXG4gICAgdGhpcy5jbGVhbkVtcHR5TGVhdmVzKCk7XG4gICAgaWYoIGV4ZWMgKSB0aGlzLnNlYXJjaChib2R5KTtcblxuICAgIHJldHVybiBib2R5O1xuICB9XG5cbiAgdGV4dFNlYXJjaCh0ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICB2YXIgYm9keSA9IHRoaXMuZ2V0U2VhcmNoKCkucmVxdWVzdDtcblxuICAgIHRoaXMuZW5zdXJlUGF0aCgncXVlcnkuYm9vbC5tdXN0JywgW10pO1xuICAgIHRoaXMucmVtb3ZlRnJvbUFycmF5KGJvZHkucXVlcnkuYm9vbC5tdXN0LCAnbXVsdGlfbWF0Y2gnKTtcblxuICAgIGlmKCAhdGV4dCApIHtcbiAgICAgIHRoaXMuY2xlYW5FbXB0eUxlYXZlcygpO1xuICAgICAgaWYoIG9wdGlvbnMuZXhlYyApIHRoaXMuc2VhcmNoKGJvZHkpO1xuICAgICAgcmV0dXJuIGJvZHk7XG4gICAgfVxuXG4gICAgYm9keS5xdWVyeS5ib29sLm11c3QucHVzaCh7XG4gICAgICBtdWx0aV9tYXRjaCA6IHtcbiAgICAgICAgcXVlcnkgOiB0ZXh0LFxuICAgICAgICBmaWVsZHMgOiBbJ25hbWUnLCAnc2VjdGlvbiddXG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgaWYoIG9wdGlvbnMuZXhlYyApIHtcbiAgICAgIHRoaXMuc2V0UGFnaW5nKCk7IC8vIHJlc2V0IHBhZ2VcbiAgICAgIHRoaXMuc2VhcmNoKGJvZHkpO1xuICAgIH1cblxuICAgIHJldHVybiBib2R5O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFuIHF1ZXJ5XG4gICAqIFJlbW92ZSBhbnkgbGVhZiBub2RlcyBpbiBvYmplY3QgdGhhdCBkbyBub3QgY29udGFpbiBpbmZvcm1hdGlvblxuICAgKi9cbiAgY2xlYW5FbXB0eUxlYXZlcygpIHtcbiAgICB2YXIgYm9keSA9IHRoaXMuZ2V0U2VhcmNoKCkucmVxdWVzdDtcbiAgICBmb3IoIHZhciBrZXkgaW4gYm9keSApIHtcbiAgICAgIGlmKCB0eXBlb2YgYm9keVtrZXldID09PSAnb2JqZWN0JyApIHtcbiAgICAgICAgdGhpcy5fY2xlYW5FbXB0eUxlYXZlcyhib2R5LCBrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9jbGVhbkVtcHR5TGVhdmVzKHBhcmVudCwgcGFyZW50S2V5KSB7XG4gICAgdmFyIG9iamVjdCA9IHBhcmVudFtwYXJlbnRLZXldO1xuXG4gICAgZm9yKCB2YXIga2V5IGluIG9iamVjdCApIHtcbiAgICAgIGlmKCBBcnJheS5pc0FycmF5KG9iamVjdFtrZXldKSApIHtcbiAgICAgICAgZm9yKCB2YXIgaSA9IG9iamVjdFtrZXldLmxlbmd0aC0xOyBpID49IDA7IGktLSApIHtcbiAgICAgICAgICB0aGlzLl9jbGVhbkVtcHR5TGVhdmVzKG9iamVjdFtrZXldLCBpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiggb2JqZWN0W2tleV0ubGVuZ3RoID09PSAwICkge1xuICAgICAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKCB0eXBlb2Ygb2JqZWN0W2tleV0gPT09ICdvYmplY3QnICkge1xuICAgICAgICB0aGlzLl9jbGVhbkVtcHR5TGVhdmVzKG9iamVjdCwga2V5KTtcbiAgICAgIH0gZWxzZSBpZiggb2JqZWN0W2tleV0gPT09IG51bGwgfHwgb2JqZWN0W2tleV0gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgZGVsZXRlIG9iamVjdFtrZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCBPYmplY3Qua2V5cyhvYmplY3QpLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgIGlmKCBBcnJheS5pc0FycmF5KHBhcmVudCkgKSB7XG4gICAgICAgIHBhcmVudC5zcGxpY2UocGFyZW50LmluZGV4T2Yob2JqZWN0KSwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgcGFyZW50W3BhcmVudEtleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZSBnaXZlbiBwYXRoIHN0cmluZyBleGlzdHMgaW4gcXVlcnkgYm9keVxuICAgKi9cbiAgZW5zdXJlUGF0aChwYXRoLCBsYXN0ID0ge30pIHtcbiAgICB2YXIgb2JqZWN0ID0gdGhpcy5nZXRTZWFyY2goKS5yZXF1ZXN0O1xuICAgIHBhdGguc3BsaXQoJy4nKVxuICAgICAgICAuZm9yRWFjaCgocGFydCwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgICAgIGlmKCAhb2JqZWN0W3BhcnRdICkge1xuICAgICAgICAgICAgaWYoIGFyci5sZW5ndGgtMSA9PT0gaW5kZXggKSBvYmplY3RbcGFydF0gPSBsYXN0O1xuICAgICAgICAgICAgZWxzZSBvYmplY3RbcGFydF0gPSB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb2JqZWN0ID0gb2JqZWN0W3BhcnRdO1xuICAgICAgICB9KTtcbiAgICBcblxuICB9XG5cbiAgZ2V0T3JDcmVhdGVGcm9tQXJyYXkoYXJyYXksIHR5cGUsIHN1YnR5cGUpIHtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGFycmF5W2ldW3R5cGVdICkge1xuICAgICAgICBpZiggc3VidHlwZSApIHtcbiAgICAgICAgICBpZiggYXJyYXlbaV1bdHlwZV1bc3VidHlwZV0gKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbaV1bdHlwZV07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBhcnJheVtpXVt0eXBlXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBvYmogPSB7XG4gICAgICBbdHlwZV0gOiB7fVxuICAgIH1cbiAgICBhcnJheS5wdXNoKG9iaik7XG4gICAgcmV0dXJuIG9ialt0eXBlXTtcbiAgfVxuXG4gIHJlbW92ZUZyb21BcnJheShhcnJheSwgdHlwZSkge1xuICAgIGZvciggdmFyIGkgPSBhcnJheS5sZW5ndGgtMTsgaSA+PSAwOyBpLS0gKSB7XG4gICAgICBpZiggYXJyYXlbaV1bdHlwZV0gKSB7XG4gICAgICAgIGFycmF5LnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTZWFyY2hNb2RlbCgpOyIsInZhciBCYXNlU2VydmljZSA9IHJlcXVpcmUoJ2NvcmstYXBwLXV0aWxzJykuQmFzZVNlcnZpY2U7XG52YXIgU2VhcmNoU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZS9TZWFyY2hTdG9yZScpO1xuXG5jbGFzcyBTZWFyY2hTZXJ2aWNlIGV4dGVuZHMgQmFzZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdG9yZSA9IFNlYXJjaFN0b3JlO1xuICB9XG5cbiAgc2VhcmNoKHBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5zdG9yZS5zZXRTZWFyY2hMb2FkaW5nKHBhcmFtcyk7XG4gICAgcmV0dXJuIHRoaXMuY2FsbCh7XG4gICAgICByZXF1ZXN0IDogdGhpcy5yZXF1ZXN0LnBvc3QoJy9zZWFyY2gnKS5zZW5kKHBhcmFtcyksXG4gICAgICBvblN1Y2Nlc3MgOiB0aGlzLnN0b3JlLnNldFNlYXJjaExvYWRlZCxcbiAgICAgIG9uRXJyb3IgOiB0aGlzLnN0b3JlLnNldFNlYXJjaEVycm9yXG4gICAgfSlcbiAgfVxuXG4gIGRlZmF1bHRTZWFyY2gocGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnN0b3JlLnNldERlZmF1bHRTZWFyY2hMb2FkaW5nKHBhcmFtcyk7XG4gICAgcmV0dXJuIHRoaXMuY2FsbCh7XG4gICAgICByZXF1ZXN0IDogdGhpcy5yZXF1ZXN0LnBvc3QoJy9zZWFyY2gnKS5zZW5kKHBhcmFtcyksXG4gICAgICBvblN1Y2Nlc3MgOiB0aGlzLnN0b3JlLnNldERlZmF1bHRTZWFyY2hMb2FkZWQsXG4gICAgICBvbkVycm9yIDogdGhpcy5zdG9yZS5zZXREZWZhdWx0U2VhcmNoRXJyb3JcbiAgICB9KVxuICB9XG5cbiAgc3VnZ2VzdChwYXJhbXMgPSB7fSkge1xuICAgIHRoaXMuc3RvcmUuc2V0U3VnZ2VzdExvYWRpbmcocGFyYW1zKTtcbiAgICByZXR1cm4gdGhpcy5jYWxsKHtcbiAgICAgIHJlcXVlc3QgOiB0aGlzLnJlcXVlc3QucG9zdCgnL3NlYXJjaCcpLnNlbmQocGFyYW1zKSxcbiAgICAgIG9uU3VjY2VzcyA6IHRoaXMuc3RvcmUuc2V0U3VnZ2VzdExvYWRlZCxcbiAgICAgIG9uRXJyb3IgOiB0aGlzLnN0b3JlLnNldFN1Z2dlc3RFcnJvclxuICAgIH0pXG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTZWFyY2hTZXJ2aWNlKCk7IiwiXG5jbGFzcyBTZXJ2aWNlV3JhcHBlciB7XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLmxvYWRpbmdcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucmVxdWVzdFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm9uRXJyb3JcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5vblN1Y2Nlc3NcbiAgICovXG4gIHN0YXRpYyBjYWxsKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zXG4gICAgICAucmVxdWVzdFxuICAgICAgLnRoZW4ocmVzcCA9PiB7XG4gICAgICAgaWYoIHJlc3Auc3RhdHVzICE9PSAyMDAgfHwgKHJlc3AuYm9keSAmJiByZXNwLmJvZHkuZXJyb3IpICkge1xuICAgICAgICBvcHRpb25zLm9uRXJyb3IuY2FsbChvcHRpb25zLnN0b3JlLCByZXNwLnBheWxvYWQpO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMub25TdWNjZXNzLmNhbGwob3B0aW9ucy5zdG9yZSwgcmVzcC5ib2R5KTtcbiAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGUgPT4gb3B0aW9ucy5vbkVycm9yLmNhbGwob3B0aW9ucy5zdG9yZSwgZSkpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2VydmljZVdyYXBwZXI7IiwidmFyIEJhc2VTdG9yZSA9IHJlcXVpcmUoJ2NvcmstYXBwLXV0aWxzJykuQmFzZVN0b3JlO1xuXG5jbGFzcyBTZWFyY2hTdG9yZSBleHRlbmRzIEJhc2VTdG9yZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmV2ZW50cyA9IHtcbiAgICAgIFNFQVJDSF9VUERBVEUgOiAnc2VhcmNoLXVwZGF0ZScsXG4gICAgICBERUZBVUxUX1NFQVJDSF9VUERBVEUgOiAnZGVmYXVsdC1zZWFyY2gtdXBkYXRlJyxcbiAgICAgIFNVR0dFU1RfVVBEQVRFIDogJ3N1Z2dlc3QtdXBkYXRlJ1xuICAgIH1cblxuICAgIHRoaXMuZGF0YSA9IHtcbiAgICAgIGRlZmF1bHRTZWFyY2ggOiB7XG4gICAgICAgIHN0YXRlIDogJ2luaXQnLFxuICAgICAgICBwYXlsb2FkIDogbnVsbFxuICAgICAgfSxcbiAgICAgIHNlYXJjaCA6IHtcbiAgICAgICAgc3RhdGUgOiAnaW5pdCcsXG4gICAgICAgIHBheWxvYWQgOiBudWxsLFxuICAgICAgICByZXF1ZXN0IDoge31cbiAgICAgIH0sXG4gICAgICBzdWdnZXN0IDoge1xuICAgICAgICBzdGF0ZSA6ICdpbml0JyxcbiAgICAgICAgcGF5bG9hZCA6IG51bGxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IFNlYXJjaFxuICAgKi9cbiAgc2V0RGVmYXVsdFNlYXJjaExvYWRpbmcoZGF0YSkge1xuICAgIHRoaXMuX3NldERlZmF1bHRTZWFyY2hTdGF0ZSh7XG4gICAgICBzdGF0ZTogdGhpcy5TVEFURS5MT0FESU5HLCBcbiAgICAgIHJlcXVlc3Q6IGRhdGFcbiAgICB9KTtcbiAgfVxuXG4gIHNldERlZmF1bHRTZWFyY2hMb2FkZWQocGF5bG9hZCkge1xuICAgIHRoaXMuX3NldERlZmF1bHRTZWFyY2hTdGF0ZSh7XG4gICAgICBzdGF0ZTogdGhpcy5TVEFURS5MT0FERUQsICAgXG4gICAgICByZXF1ZXN0OiB0aGlzLmRhdGEuZGVmYXVsdFNlYXJjaC5yZXF1ZXN0LFxuICAgICAgcGF5bG9hZDogcGF5bG9hZFxuICAgIH0pO1xuICB9XG5cbiAgc2V0RGVmYXVsdFNlYXJjaEVycm9yKGUpIHtcbiAgICB0aGlzLl9zZXRTZWFyY2hTdGF0ZSh7XG4gICAgICBzdGF0ZTogdGhpcy5TVEFURS5FUlJPUiwgICBcbiAgICAgIHJlcXVlc3Q6IHRoaXMuZGF0YS5kZWZhdWx0U2VhcmNoLnJlcXVlc3QsXG4gICAgICBlcnJvcjogZVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGVmYXVsdFNlYXJjaCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmRlZmF1bHRTZWFyY2g7XG4gIH1cblxuICBfc2V0RGVmYXVsdFNlYXJjaFN0YXRlKHN0YXRlKSB7XG4gICAgdGhpcy5kYXRhLmRlZmF1bHRTZWFyY2ggPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSk7XG4gICAgdGhpcy5lbWl0KHRoaXMuZXZlbnRzLkRFRkFVTFRfU0VBUkNIX1VQREFURSwgdGhpcy5kYXRhLmRlZmF1bHRTZWFyY2gpO1xuICB9XG5cblxuICAvKipcbiAgICogU2VhcmNoXG4gICAqL1xuICBzZXRTZWFyY2hMb2FkaW5nKGRhdGEpIHtcbiAgICB0aGlzLl9zZXRTZWFyY2hTdGF0ZSh7XG4gICAgICBzdGF0ZTogdGhpcy5TVEFURS5MT0FESU5HLCBcbiAgICAgIHJlcXVlc3Q6IGRhdGFcbiAgICB9KTtcbiAgfVxuXG4gIHNldFNlYXJjaExvYWRlZChwYXlsb2FkKSB7XG4gICAgdGhpcy5fc2V0U2VhcmNoU3RhdGUoe1xuICAgICAgc3RhdGU6IHRoaXMuU1RBVEUuTE9BREVELCAgIFxuICAgICAgcmVxdWVzdDogdGhpcy5kYXRhLnNlYXJjaC5yZXF1ZXN0LFxuICAgICAgcGF5bG9hZDogcGF5bG9hZFxuICAgIH0pO1xuICB9XG5cbiAgc2V0U2VhcmNoRXJyb3IoZSkge1xuICAgIHRoaXMuX3NldFNlYXJjaFN0YXRlKHtcbiAgICAgIHN0YXRlOiB0aGlzLlNUQVRFLkVSUk9SLCAgIFxuICAgICAgcmVxdWVzdDogdGhpcy5kYXRhLnNlYXJjaC5yZXF1ZXN0LFxuICAgICAgZXJyb3I6IGVcbiAgICB9KTtcbiAgfVxuXG4gIF9zZXRTZWFyY2hTdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuZGF0YS5zZWFyY2ggPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSk7XG4gICAgdGhpcy5lbWl0KHRoaXMuZXZlbnRzLlNFQVJDSF9VUERBVEUsIHRoaXMuZGF0YS5zZWFyY2gpO1xuICB9XG5cbiAgZ2V0U2VhcmNoKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEuc2VhcmNoO1xuICB9XG5cblxuICAvKipcbiAgICogU3VnZ2VzdFxuICAgKi9cbiAgc2V0U3VnZ2VzdExvYWRpbmcoZGF0YSkge1xuICAgIHRoaXMuX3NldFN1Z2dlc3RTdGF0ZSh7XG4gICAgICBzdGF0ZTogdGhpcy5TVEFURS5MT0FESU5HLCBcbiAgICAgIHJlcXVlc3Q6IGRhdGFcbiAgICB9KTtcbiAgfVxuXG4gIHNldFN1Z2dlc3RMb2FkZWQocGF5bG9hZCkge1xuICAgIHRoaXMuX3NldFN1Z2dlc3RTdGF0ZSh7XG4gICAgICBzdGF0ZTogdGhpcy5TVEFURS5MT0FERUQsICAgXG4gICAgICByZXF1ZXN0OiB0aGlzLmRhdGEuc3VnZ2VzdC5yZXF1ZXN0LFxuICAgICAgcGF5bG9hZDogcGF5bG9hZFxuICAgIH0pO1xuICB9XG5cbiAgc2V0U3VnZ2VzdEVycm9yKGUpIHtcbiAgICB0aGlzLl9zZXRTdWdnZXN0U3RhdGUoe1xuICAgICAgc3RhdGU6IHRoaXMuU1RBVEUuRVJST1IsICAgXG4gICAgICByZXF1ZXN0OiB0aGlzLmRhdGEuc3VnZ2VzdC5yZXF1ZXN0LFxuICAgICAgZXJyb3I6IGVcbiAgICB9KTtcbiAgfVxuXG4gIF9zZXRTdWdnZXN0U3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLmRhdGEuc3VnZ2VzdCA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICB0aGlzLmVtaXQodGhpcy5ldmVudHMuU1VHR0VTVF9VUERBVEUsIHRoaXMuZGF0YS5zdWdnZXN0KTtcbiAgfVxuXG4gIGdldFN1Z2dlc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5zdWdnZXN0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNlYXJjaFN0b3JlKCk7IiwiXHJcbi8qKlxyXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxyXG4gKi9cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XHJcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XHJcbn07XHJcblxyXG4vKipcclxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1peGluKG9iaikge1xyXG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xyXG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xyXG4gIH1cclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub24gPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgKHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKVxyXG4gICAgLnB1c2goZm4pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxyXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICBmdW5jdGlvbiBvbigpIHtcclxuICAgIHRoaXMub2ZmKGV2ZW50LCBvbik7XHJcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gIH1cclxuXHJcbiAgb24uZm4gPSBmbjtcclxuICB0aGlzLm9uKGV2ZW50LCBvbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcclxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cclxuICAvLyBhbGxcclxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gc3BlY2lmaWMgZXZlbnRcclxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XHJcblxyXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcclxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcclxuICB2YXIgY2I7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcclxuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtNaXhlZH0gLi4uXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuXHJcbiAgaWYgKGNhbGxiYWNrcykge1xyXG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEV2ZW50QnVzIDogcmVxdWlyZSgnLi9saWIvRXZlbnRCdXMnKSxcbiAgQmFzZU1vZGVsIDogcmVxdWlyZSgnLi9saWIvQmFzZU1vZGVsJyksXG4gIEJhc2VTdG9yZSA6IHJlcXVpcmUoJy4vbGliL0Jhc2VTdG9yZScpLFxuICBCYXNlU2VydmljZSA6IHJlcXVpcmUoJy4vbGliL0Jhc2VTZXJ2aWNlJyksXG4gIFN0b3JlU2VydmljZVdyYXBwZXIgOiByZXF1aXJlKCcuL2xpYi9TdG9yZVNlcnZpY2VXcmFwcGVyJyksXG4gIHJlcXVlc3QgOiByZXF1aXJlKCdzdXBlcmFnZW50Jylcbn0iLCJ2YXIgZXZlbnRCdXMgPSByZXF1aXJlKCcuL0V2ZW50QnVzJyk7XG5cbmNsYXNzIEJhc2VNb2RlbCB7XG5cbiAgZ2V0IGV2ZW50QnVzKCkge1xuICAgIHJldHVybiBldmVudEJ1cztcbiAgfVxuXG4gIHJlZ2lzdGVySU9DKG5hbWUpIHtcbiAgICBpZiggIW5hbWUgKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ05hbWUgbm90IHBhc3NlZCB0byBiaW5kTWV0aG9kcygpLiAgVGhpcyB3aWxsIGZhaWwgaW4gSUUsIGNhdXNlLCB5b3Uga25vdywgSUUuJylcbiAgICB9XG5cbiAgICB2YXIgY2xhc3NOYW1lID0gbmFtZSB8fCB0aGlzLl9fcHJvdG9fXy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIGV2ZW50QnVzLnJlZ2lzdGVySU9DKGNsYXNzTmFtZSwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogSGF2ZSB0byBwYXNzIG5hbWUgZm9yIElFIHN1cHBvcnQuXG4gICAqL1xuICBiaW5kTWV0aG9kcyhuYW1lKSB7XG4gICAgaWYoICFuYW1lICkge1xuICAgICAgY29uc29sZS53YXJuKCdOYW1lIG5vdCBwYXNzZWQgdG8gYmluZE1ldGhvZHMoKS4gIFRoaXMgd2lsbCBmYWlsIGluIElFLCBjYXVzZSwgeW91IGtub3csIElFLicpXG4gICAgfVxuXG4gICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMuX19wcm90b19fLmNvbnN0cnVjdG9yLm5hbWUgfHwgbmFtZTtcbiAgICB2YXIgbWV0aG9kcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuX19wcm90b19fKTtcbiAgICBtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgICAgaWYoIG1ldGhvZCA9PT0gJ2NvbnN0cnVjdG9yJyApIHJldHVybjtcblxuICAgICAgdGhpcy5fYmluZE1ldGhvZChjbGFzc05hbWUrJy4nK21ldGhvZCwgbWV0aG9kKVxuICAgIH0pO1xuICB9XG5cbiAgX2JpbmRNZXRob2QoZ2xvYmFsTmFtZSwgbWV0aG9kKSB7XG4gICAgdGhpcy5ldmVudEJ1cy5oYW5kbGVNZXRob2QoZ2xvYmFsTmFtZSwgdGhpc1ttZXRob2RdLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZW1pdChldmVudCwgcGF5bG9hZCkge1xuICAgIHRoaXMuZXZlbnRCdXMuZW1pdChldmVudCwgcGF5bG9hZCk7XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VNb2RlbDsiLCJ2YXIgcmVxdWVzdCA9IHJlcXVpcmUoJ3N1cGVyYWdlbnQnKTtcbnZhciBTdG9yZVNlcml2Y2VXcmFwcGVyID0gcmVxdWlyZSgnLi9TdG9yZVNlcnZpY2VXcmFwcGVyJyk7XG5cbmNsYXNzIEJhc2VTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHAgbWFrZSBzZXJ2aWNlIGNhbGxzIHVwZGF0aW5nIHN0b3JlIHcvIHJlc3VsdFxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucmVxdWVzdCAtIHN1cGVyYWdlbnQgcHJvbWlzZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbXMgLSBvcHRpb25hbCBwYXJhbWV0ZXJzIHRvIHBhc3MgYWxvbmcgdG8gc3RvcmVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5zdG9yZSAtIFN0b3JlIGNsYXNzIChvcHRpb25zLCB3aWxsIGRlZmF1bHQgdG8gdGhpcy5zdG9yZSlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5vbkVycm9yIC0gU3RvcmUgY2xhc3MgbWV0aG9kIHRvIGNhbGwgb25FcnJvclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm9uU3VjY2VzcyAtIFN0b3JlIGNsYXNzIG1ldGhvZCB0byBjYWxsIG9uU3VjY2Vzc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm9uU3VjY2Vzc01pZGRsZXdhcmUgLSBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIG9uU3VjY2VzcywgcmVzdWx0IGlzIHBhc3NlZCB0byBvblN1Y2Nlc3NcbiAgICovXG4gIGNhbGwob3B0aW9ucykge1xuICAgIC8vIGluamVjdCBjbGFzcyBzdG9yZSBpZiBub25lIHByb3ZpZGVkXG4gICAgaWYoICFvcHRpb25zLnN0b3JlICkge1xuICAgICAgaWYoIHRoaXMuc3RvcmUgKSBvcHRpb25zLnN0b3JlID0gdGhpcy5zdG9yZTtcbiAgICAgIGVsc2UgcmV0dXJuIGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKCdObyBzdG9yZSBwcm92aWRlZCcpKTtcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSB3ZXJlIGdpdmUgcHJvbWlzZSBmdW5jdGlvbnMgdG8gcmVzb2x2ZSwgdXNlIHRob3NlXG4gICAgaWYoIG9wdGlvbnMucmVzb2x2ZSAmJiBvcHRpb25zLnJlamVjdCApIHtcbiAgICAgIHJldHVybiBTdG9yZVNlcml2Y2VXcmFwcGVyLmNhbGwob3B0aW9ucyk7XG4gICAgfSBcblxuICAgIC8vIG90aGVyd2lzZSwgdXNlIG91ciBvd24gcHJvbWlzZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBvcHRpb25zLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgb3B0aW9ucy5yZWplY3QgPSByZWplY3Q7XG5cbiAgICAgIFN0b3JlU2VyaXZjZVdyYXBwZXIuY2FsbChvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVNlcnZpY2U7IiwidmFyIEV2ZW50QnVzID0gcmVxdWlyZSgnLi9FdmVudEJ1cycpO1xuXG5jbGFzcyBCYXNlU3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGdlbmVyYWwgc3RhdGVzIHRoYXQgc2hvdWxkIGJlIHVzZWQgaWYgcG9zc2libGVcbiAgICB0aGlzLlNUQVRFID0ge1xuICAgICAgSU5JVCAgICAgICAgIDogJ2luaXQnLFxuICAgICAgTE9BRElORyAgICAgIDogJ2xvYWRpbmcnLFxuICAgICAgTE9BREVEICAgICAgIDogJ2xvYWRlZCcsXG4gICAgICBFUlJPUiAgICAgICAgOiAnZXJyb3InLFxuICAgICAgU0FWSU5HICAgICAgIDogJ3NhdmluZycsXG4gICAgICBTQVZFX0VSUk9SICAgOiAnc2F2ZS1lcnJvcicsXG4gICAgICBERUxFVElORyAgICAgOiAnZGVsZXRpbmcnLFxuICAgICAgREVMRVRFX0VSUk9SIDogJ2RlbGV0ZS1lcnJvcicsXG4gICAgICBERUxFVEVEICAgICAgOiAnZGVsZXRlZCdcbiAgICB9XG4gIH1cblxuICBnZXQgZXZlbnRCdXMoKSB7XG4gICAgcmV0dXJuIEV2ZW50QnVzO1xuICB9XG5cbiAgZW1pdChldmVudCwgcGF5bG9hZCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5ldmVudEJ1cy5lbWl0KGV2ZW50LCBwYXlsb2FkKTtcbiAgICB9LCAwKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VTdG9yZTsiLCJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xuXG5cbmNsYXNzIEV2ZW50QnVzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2V0TWF4TGlzdGVuZXJzKDEwMDAwKTtcbiAgICB0aGlzLm1vZGVscyA9IHt9XG4gIH1cblxuICByZWdpc3RlcklPQyhuYW1lLCBtb2RlbCkge1xuICAgIGlmKCB0aGlzLm1vZGVsc1tuYW1lXSApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQSBtb2RlbCBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWQgd2l0aCBuYW1lOiAke25hbWV9YCk7XG4gICAgfVxuXG4gICAgdGhpcy5tb2RlbHNbbmFtZV0gPSBtb2RlbDtcbiAgfVxuXG4gIGluamVjdChuYW1lKSB7XG4gICAgaWYoICF0aGlzLm1vZGVsc1tuYW1lXSApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbW9kZWwgaGFzIGJlZW4gcmVnaXN0ZXJlZCB3aXRoIG5hbWU6ICR7bmFtZX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tb2RlbHNbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyB3aGF0IG1vZGVscyBiaW5kIHdpdGhcbiAgICogXG4gICAqIEBwYXJhbSB7Kn0gZ2xvYmFsTmFtZSBcbiAgICogQHBhcmFtIHsqfSBtZXRob2RGdW5jdGlvbiBcbiAgICovXG4gIGhhbmRsZU1ldGhvZChnbG9iYWxOYW1lLCBtZXRob2RGdW5jdGlvbikge1xuICAgIGlmKCB0aGlzLl9ldmVudHNbZ2xvYmFsTmFtZV0gKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEdsb2JhbCBtZXRob2QgYWxyZWFkeSByZWdpc3RlcmVkOiAke2dsb2JhbE5hbWV9YCk7XG4gICAgfVxuXG4gICAgLy8gTm90ZTogeW91IGNhbid0IHVzZSBhcnJvdyBmdW5jdGlvbiB0byBnZXQgYXJndW1lbnRzIG9iamVjdFxuICAgIHN1cGVyLm9uKGdsb2JhbE5hbWUsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBwb3Agb2ZmIHRoZSBwcm9taXNlIHdyYXBwZXIgYXJndW1lbnRzXG4gICAgICB2YXIgcmVzb2x2ZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciByZWplY3QgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgIC8vIGZpbGwgdXAgb3VyIGFjdHVhbCBhcmd1bWVudCBhcnJheVxuICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgIGZvciggdmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gYXR0ZW1wdCB0byBjYWxsIGhhbmRsZXIgd2l0aCBhcmd1bWVudHNcbiAgICAgICAgdmFyIHJlc3AgPSBtZXRob2RGdW5jdGlvbi5hcHBseSh0aGlzLCBhcmdzKTtcblxuICAgICAgICAvLyBtZXRob2QgcmV0dXJuZWQgYSBwcm9taXNlLCBqdXN0IHdhaXQgZm9yIGl0IHRvIHJlc29sdmVcbiAgICAgICAgaWYoIHJlc3AgJiYgdHlwZW9mIHJlc3AgPT09ICdvYmplY3QnICYmIHR5cGVvZiByZXNwLnRoZW4gPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgICAgcmVzcFxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4gcmVzb2x2ZShyZXN1bHQpKVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG5cbiAgICAgICAgLy8gbWV0aG9kIHJldHVybmVkIHNvbWV0aGluZyBvdGhlciB0aGFuIGEgcHJvbWlzZSwgcmVzb2x2ZSBub3dcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3ApO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgIC8vIGJhZG5lc3MgaGFwcGVuZWRcbiAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgd2hhdCBlbGVtZW50cyBjYWxsXG4gICAqL1xuICBjYWxsTWV0aG9kKCkge1xuICAgIGlmKCAhdGhpcy5fZXZlbnRzW2FyZ3VtZW50c1swXV0gKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGdsb2JhbCBtZXRob2QgcmVnaXN0ZXJlZDogJHthcmd1bWVudHNbMF19YCk7XG4gICAgfVxuXG4gICAgdmFyIGFyZ3MgPSBbYXJndW1lbnRzWzBdXTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhcmdzLnB1c2gocmVzb2x2ZSk7XG4gICAgICBhcmdzLnB1c2gocmVqZWN0KTtcblxuICAgICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgICAgfVxuXG4gICAgICBzdXBlci5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0pO1xuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRXZlbnRCdXMoKTsiLCJjbGFzcyBTdG9yZVNlcnZpY2VXcmFwcGVyIHtcblxuICAvKipcbiAgICogSGVscCBtYWtlIHNlcnZpY2UgY2FsbHMgdXBkYXRpbmcgc3RvcmUgdy8gcmVzdWx0XG4gICAqIFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5yZXF1ZXN0IC0gc3VwZXJhZ2VudCBwcm9taXNlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtcyAtIG9wdGlvbmFsIHBhcmFtZXRlcnMgdG8gcGFzcyBhbG9uZyB0byBzdG9yZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnN0b3JlIC0gU3RvcmUgY2xhc3NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5vbkVycm9yIC0gU3RvcmUgY2xhc3MgbWV0aG9kIHRvIGNhbGwgb25FcnJvclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm9uU3VjY2VzcyAtIFN0b3JlIGNsYXNzIG1ldGhvZCB0byBjYWxsIG9uU3VjY2Vzc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm9uU3VjY2Vzc01pZGRsZXdhcmUgLSBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIG9uU3VjY2VzcywgcmVzdWx0IGlzIHBhc3NlZCB0byBvblN1Y2Nlc3NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5yZXNvbHZlIC0gcmVzb2x2ZSBhIHByb21pc2Ugd2hlbiBjb21wbGV0ZSAob3B0aW9uYWwpXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucmVqZWN0IC0gcmVqZWN0IGEgcHJvbWlzZSBvbiBlcnJvciAob3B0aW9uYWwpXG4gICAqL1xuICBzdGF0aWMgY2FsbChvcHRpb25zKSB7XG4gICAgb3B0aW9uc1xuICAgICAgLnJlcXVlc3RcbiAgICAgIC50aGVuKHJlc3AgPT4ge1xuICAgICAgICAvLyByZXNwb25zZSBzZXQgYmFjayBlcnJvXG4gICAgICAgIGlmKCAocmVzcC5zdGF0dXMgPj0gMzAwKSB8fCAocmVzcC5ib2R5ICYmIHJlc3AuYm9keS5lcnJvcikgKSB7XG4gICAgICAgICAgcmVzcCA9IHJlc3AuYm9keSB8fCB7c3RhdHVzOiByZXNwLnN0YXR1c307XG4gICAgICAgICAgb3B0aW9ucy5vbkVycm9yLmNhbGwob3B0aW9ucy5zdG9yZSwgcmVzcCwgb3B0aW9ucy5wYXJhbXMpO1xuICAgICAgICAgIGlmKCBvcHRpb25zLnJlamVjdCApIG9wdGlvbnMucmVqZWN0KHJlc3ApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBpZiggb3B0aW9ucy5vblN1Y2Nlc3NNaWRkbGV3YXJlICkge1xuICAgICAgICAgICAgcmVzcCA9IG9wdGlvbnMub25TdWNjZXNzTWlkZGxld2FyZShyZXNwKTtcbiAgICAgICAgICAgIG9wdGlvbnMub25TdWNjZXNzLmNhbGwob3B0aW9ucy5zdG9yZSwgcmVzcCwgb3B0aW9ucy5wYXJhbXMpO1xuICAgICAgICAgICAgaWYoIG9wdGlvbnMucmVzb2x2ZSApIG9wdGlvbnMucmVzb2x2ZShyZXNwKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gb3B0aW9ucy5vblN1Y2Nlc3MuY2FsbChvcHRpb25zLnN0b3JlLCByZXNwLmJvZHksIG9wdGlvbnMucGFyYW1zKTtcbiAgICAgICAgICAgIGlmKCBvcHRpb25zLnJlc29sdmUgKSBvcHRpb25zLnJlc29sdmUocmVzdWx0IHx8IHJlc3AuYm9keSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICB2YXIgcmVzdWx0ID0gb3B0aW9ucy5vbkVycm9yLmNhbGwob3B0aW9ucy5zdG9yZSwgZSwgb3B0aW9ucy5wYXJhbXMpO1xuICAgICAgICBpZiggb3B0aW9ucy5yZWplY3QgKSBvcHRpb25zLnJlamVjdChyZXN1bHQgfHwgZSk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0b3JlU2VydmljZVdyYXBwZXI7IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIHJlc29sdmVzIC4gYW5kIC4uIGVsZW1lbnRzIGluIGEgcGF0aCBhcnJheSB3aXRoIGRpcmVjdG9yeSBuYW1lcyB0aGVyZVxuLy8gbXVzdCBiZSBubyBzbGFzaGVzLCBlbXB0eSBlbGVtZW50cywgb3IgZGV2aWNlIG5hbWVzIChjOlxcKSBpbiB0aGUgYXJyYXlcbi8vIChzbyBhbHNvIG5vIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgLSBpdCBkb2VzIG5vdCBkaXN0aW5ndWlzaFxuLy8gcmVsYXRpdmUgYW5kIGFic29sdXRlIHBhdGhzKVxuZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkocGFydHMsIGFsbG93QWJvdmVSb290KSB7XG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciBsYXN0ID0gcGFydHNbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKGFsbG93QWJvdmVSb290KSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuLy8gU3BsaXQgYSBmaWxlbmFtZSBpbnRvIFtyb290LCBkaXIsIGJhc2VuYW1lLCBleHRdLCB1bml4IHZlcnNpb25cbi8vICdyb290JyBpcyBqdXN0IGEgc2xhc2gsIG9yIG5vdGhpbmcuXG52YXIgc3BsaXRQYXRoUmUgPVxuICAgIC9eKFxcLz98KShbXFxzXFxTXSo/KSgoPzpcXC57MSwyfXxbXlxcL10rP3wpKFxcLlteLlxcL10qfCkpKD86W1xcL10qKSQvO1xudmFyIHNwbGl0UGF0aCA9IGZ1bmN0aW9uKGZpbGVuYW1lKSB7XG4gIHJldHVybiBzcGxpdFBhdGhSZS5leGVjKGZpbGVuYW1lKS5zbGljZSgxKTtcbn07XG5cbi8vIHBhdGgucmVzb2x2ZShbZnJvbSAuLi5dLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVzb2x2ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzb2x2ZWRQYXRoID0gJycsXG4gICAgICByZXNvbHZlZEFic29sdXRlID0gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IC0xICYmICFyZXNvbHZlZEFic29sdXRlOyBpLS0pIHtcbiAgICB2YXIgcGF0aCA9IChpID49IDApID8gYXJndW1lbnRzW2ldIDogcHJvY2Vzcy5jd2QoKTtcblxuICAgIC8vIFNraXAgZW1wdHkgYW5kIGludmFsaWQgZW50cmllc1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLnJlc29sdmUgbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfSBlbHNlIGlmICghcGF0aCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmVzb2x2ZWRQYXRoID0gcGF0aCArICcvJyArIHJlc29sdmVkUGF0aDtcbiAgICByZXNvbHZlZEFic29sdXRlID0gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbiAgfVxuXG4gIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHBhdGggc2hvdWxkIGJlIHJlc29sdmVkIHRvIGEgZnVsbCBhYnNvbHV0ZSBwYXRoLCBidXRcbiAgLy8gaGFuZGxlIHJlbGF0aXZlIHBhdGhzIHRvIGJlIHNhZmUgKG1pZ2h0IGhhcHBlbiB3aGVuIHByb2Nlc3MuY3dkKCkgZmFpbHMpXG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHJlc29sdmVkUGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihyZXNvbHZlZFBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhcmVzb2x2ZWRBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIHJldHVybiAoKHJlc29sdmVkQWJzb2x1dGUgPyAnLycgOiAnJykgKyByZXNvbHZlZFBhdGgpIHx8ICcuJztcbn07XG5cbi8vIHBhdGgubm9ybWFsaXplKHBhdGgpXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCksXG4gICAgICB0cmFpbGluZ1NsYXNoID0gc3Vic3RyKHBhdGgsIC0xKSA9PT0gJy8nO1xuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICBwYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhaXNBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIGlmICghcGF0aCAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHBhdGggPSAnLic7XG4gIH1cbiAgaWYgKHBhdGggJiYgdHJhaWxpbmdTbGFzaCkge1xuICAgIHBhdGggKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIChpc0Fic29sdXRlID8gJy8nIDogJycpICsgcGF0aDtcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLyc7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmpvaW4gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHBhdGhzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgcmV0dXJuIGV4cG9ydHMubm9ybWFsaXplKGZpbHRlcihwYXRocywgZnVuY3Rpb24ocCwgaW5kZXgpIHtcbiAgICBpZiAodHlwZW9mIHAgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5qb2luIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfSkuam9pbignLycpKTtcbn07XG5cblxuLy8gcGF0aC5yZWxhdGl2ZShmcm9tLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVsYXRpdmUgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuICBmcm9tID0gZXhwb3J0cy5yZXNvbHZlKGZyb20pLnN1YnN0cigxKTtcbiAgdG8gPSBleHBvcnRzLnJlc29sdmUodG8pLnN1YnN0cigxKTtcblxuICBmdW5jdGlvbiB0cmltKGFycikge1xuICAgIHZhciBzdGFydCA9IDA7XG4gICAgZm9yICg7IHN0YXJ0IDwgYXJyLmxlbmd0aDsgc3RhcnQrKykge1xuICAgICAgaWYgKGFycltzdGFydF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgZW5kID0gYXJyLmxlbmd0aCAtIDE7XG4gICAgZm9yICg7IGVuZCA+PSAwOyBlbmQtLSkge1xuICAgICAgaWYgKGFycltlbmRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gW107XG4gICAgcmV0dXJuIGFyci5zbGljZShzdGFydCwgZW5kIC0gc3RhcnQgKyAxKTtcbiAgfVxuXG4gIHZhciBmcm9tUGFydHMgPSB0cmltKGZyb20uc3BsaXQoJy8nKSk7XG4gIHZhciB0b1BhcnRzID0gdHJpbSh0by5zcGxpdCgnLycpKTtcblxuICB2YXIgbGVuZ3RoID0gTWF0aC5taW4oZnJvbVBhcnRzLmxlbmd0aCwgdG9QYXJ0cy5sZW5ndGgpO1xuICB2YXIgc2FtZVBhcnRzTGVuZ3RoID0gbGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZyb21QYXJ0c1tpXSAhPT0gdG9QYXJ0c1tpXSkge1xuICAgICAgc2FtZVBhcnRzTGVuZ3RoID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHZhciBvdXRwdXRQYXJ0cyA9IFtdO1xuICBmb3IgKHZhciBpID0gc2FtZVBhcnRzTGVuZ3RoOyBpIDwgZnJvbVBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgb3V0cHV0UGFydHMucHVzaCgnLi4nKTtcbiAgfVxuXG4gIG91dHB1dFBhcnRzID0gb3V0cHV0UGFydHMuY29uY2F0KHRvUGFydHMuc2xpY2Uoc2FtZVBhcnRzTGVuZ3RoKSk7XG5cbiAgcmV0dXJuIG91dHB1dFBhcnRzLmpvaW4oJy8nKTtcbn07XG5cbmV4cG9ydHMuc2VwID0gJy8nO1xuZXhwb3J0cy5kZWxpbWl0ZXIgPSAnOic7XG5cbmV4cG9ydHMuZGlybmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIHJlc3VsdCA9IHNwbGl0UGF0aChwYXRoKSxcbiAgICAgIHJvb3QgPSByZXN1bHRbMF0sXG4gICAgICBkaXIgPSByZXN1bHRbMV07XG5cbiAgaWYgKCFyb290ICYmICFkaXIpIHtcbiAgICAvLyBObyBkaXJuYW1lIHdoYXRzb2V2ZXJcbiAgICByZXR1cm4gJy4nO1xuICB9XG5cbiAgaWYgKGRpcikge1xuICAgIC8vIEl0IGhhcyBhIGRpcm5hbWUsIHN0cmlwIHRyYWlsaW5nIHNsYXNoXG4gICAgZGlyID0gZGlyLnN1YnN0cigwLCBkaXIubGVuZ3RoIC0gMSk7XG4gIH1cblxuICByZXR1cm4gcm9vdCArIGRpcjtcbn07XG5cblxuZXhwb3J0cy5iYXNlbmFtZSA9IGZ1bmN0aW9uKHBhdGgsIGV4dCkge1xuICB2YXIgZiA9IHNwbGl0UGF0aChwYXRoKVsyXTtcbiAgLy8gVE9ETzogbWFrZSB0aGlzIGNvbXBhcmlzb24gY2FzZS1pbnNlbnNpdGl2ZSBvbiB3aW5kb3dzP1xuICBpZiAoZXh0ICYmIGYuc3Vic3RyKC0xICogZXh0Lmxlbmd0aCkgPT09IGV4dCkge1xuICAgIGYgPSBmLnN1YnN0cigwLCBmLmxlbmd0aCAtIGV4dC5sZW5ndGgpO1xuICB9XG4gIHJldHVybiBmO1xufTtcblxuXG5leHBvcnRzLmV4dG5hbWUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBzcGxpdFBhdGgocGF0aClbM107XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIgKHhzLCBmKSB7XG4gICAgaWYgKHhzLmZpbHRlcikgcmV0dXJuIHhzLmZpbHRlcihmKTtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZih4c1tpXSwgaSwgeHMpKSByZXMucHVzaCh4c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFN0cmluZy5wcm90b3R5cGUuc3Vic3RyIC0gbmVnYXRpdmUgaW5kZXggZG9uJ3Qgd29yayBpbiBJRThcbnZhciBzdWJzdHIgPSAnYWInLnN1YnN0cigtMSkgPT09ICdiJ1xuICAgID8gZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikgeyByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKSB9XG4gICAgOiBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7XG4gICAgICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gc3RyLmxlbmd0aCArIHN0YXJ0O1xuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKTtcbiAgICB9XG47XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyoqXG4gKiBSb290IHJlZmVyZW5jZSBmb3IgaWZyYW1lcy5cbiAqL1xuXG52YXIgcm9vdDtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgeyAvLyBCcm93c2VyIHdpbmRvd1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gV2ViIFdvcmtlclxuICByb290ID0gc2VsZjtcbn0gZWxzZSB7IC8vIE90aGVyIGVudmlyb25tZW50c1xuICBjb25zb2xlLndhcm4oXCJVc2luZyBicm93c2VyLW9ubHkgdmVyc2lvbiBvZiBzdXBlcmFnZW50IGluIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuICByb290ID0gdGhpcztcbn1cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIFJlcXVlc3RCYXNlID0gcmVxdWlyZSgnLi9yZXF1ZXN0LWJhc2UnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0Jyk7XG52YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXMtZnVuY3Rpb24nKTtcbnZhciBSZXNwb25zZUJhc2UgPSByZXF1aXJlKCcuL3Jlc3BvbnNlLWJhc2UnKTtcbnZhciBzaG91bGRSZXRyeSA9IHJlcXVpcmUoJy4vc2hvdWxkLXJldHJ5Jyk7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBub29wKCl7fTtcblxuLyoqXG4gKiBFeHBvc2UgYHJlcXVlc3RgLlxuICovXG5cbnZhciByZXF1ZXN0ID0gZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obWV0aG9kLCB1cmwpIHtcbiAgLy8gY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHVybCkge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpLmVuZCh1cmwpO1xuICB9XG5cbiAgLy8gdXJsIGZpcnN0XG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdCgnR0VUJywgbWV0aG9kKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbn1cblxuZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcblxuLyoqXG4gKiBEZXRlcm1pbmUgWEhSLlxuICovXG5cbnJlcXVlc3QuZ2V0WEhSID0gZnVuY3Rpb24gKCkge1xuICBpZiAocm9vdC5YTUxIdHRwUmVxdWVzdFxuICAgICAgJiYgKCFyb290LmxvY2F0aW9uIHx8ICdmaWxlOicgIT0gcm9vdC5sb2NhdGlvbi5wcm90b2NvbFxuICAgICAgICAgIHx8ICFyb290LkFjdGl2ZVhPYmplY3QpKSB7XG4gICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtcbiAgfSBlbHNlIHtcbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC4zLjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICB9XG4gIHRocm93IEVycm9yKFwiQnJvd3Nlci1vbmx5IHZlcmlzb24gb2Ygc3VwZXJhZ2VudCBjb3VsZCBub3QgZmluZCBYSFJcIik7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgYWRkZWQgdG8gc3VwcG9ydCBJRS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIHRyaW0gPSAnJy50cmltXG4gID8gZnVuY3Rpb24ocykgeyByZXR1cm4gcy50cmltKCk7IH1cbiAgOiBmdW5jdGlvbihzKSB7IHJldHVybiBzLnJlcGxhY2UoLyheXFxzKnxcXHMqJCkvZywgJycpOyB9O1xuXG4vKipcbiAqIFNlcmlhbGl6ZSB0aGUgZ2l2ZW4gYG9iamAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaikge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gIHZhciBwYWlycyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgb2JqW2tleV0pO1xuICB9XG4gIHJldHVybiBwYWlycy5qb2luKCcmJyk7XG59XG5cbi8qKlxuICogSGVscHMgJ3NlcmlhbGl6ZScgd2l0aCBzZXJpYWxpemluZyBhcnJheXMuXG4gKiBNdXRhdGVzIHRoZSBwYWlycyBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWlyc1xuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKi9cblxuZnVuY3Rpb24gcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgdmFsKSB7XG4gIGlmICh2YWwgIT0gbnVsbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHZhbC5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgdik7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbCkpIHtcbiAgICAgIGZvcih2YXIgc3Via2V5IGluIHZhbCkge1xuICAgICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5ICsgJ1snICsgc3Via2V5ICsgJ10nLCB2YWxbc3Via2V5XSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSlcbiAgICAgICAgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkpO1xuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICovXG5cbiByZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdCA9IHNlcmlhbGl6ZTtcblxuIC8qKlxuICAqIFBhcnNlIHRoZSBnaXZlbiB4LXd3dy1mb3JtLXVybGVuY29kZWQgYHN0cmAuXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICogQHJldHVybiB7T2JqZWN0fVxuICAqIEBhcGkgcHJpdmF0ZVxuICAqL1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhzdHIpIHtcbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgcGFpcnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgdmFyIHBhaXI7XG4gIHZhciBwb3M7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhaXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgcGFpciA9IHBhaXJzW2ldO1xuICAgIHBvcyA9IHBhaXIuaW5kZXhPZignPScpO1xuICAgIGlmIChwb3MgPT0gLTEpIHtcbiAgICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFpcildID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFpci5zbGljZSgwLCBwb3MpKV0gPVxuICAgICAgICBkZWNvZGVVUklDb21wb25lbnQocGFpci5zbGljZShwb3MgKyAxKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBFeHBvc2UgcGFyc2VyLlxuICovXG5cbnJlcXVlc3QucGFyc2VTdHJpbmcgPSBwYXJzZVN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IE1JTUUgdHlwZSBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICovXG5cbnJlcXVlc3QudHlwZXMgPSB7XG4gIGh0bWw6ICd0ZXh0L2h0bWwnLFxuICBqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG4gIHhtbDogJ2FwcGxpY2F0aW9uL3htbCcsXG4gIHVybGVuY29kZWQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybS1kYXRhJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBzZXJpYWxpemF0aW9uIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24ob2JqKXtcbiAqICAgICAgIHJldHVybiAnZ2VuZXJhdGVkIHhtbCBoZXJlJztcbiAqICAgICB9O1xuICpcbiAqL1xuXG4gcmVxdWVzdC5zZXJpYWxpemUgPSB7XG4gICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogc2VyaWFsaXplLFxuICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnN0cmluZ2lmeVxuIH07XG5cbiAvKipcbiAgKiBEZWZhdWx0IHBhcnNlcnMuXG4gICpcbiAgKiAgICAgc3VwZXJhZ2VudC5wYXJzZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihzdHIpe1xuICAqICAgICAgIHJldHVybiB7IG9iamVjdCBwYXJzZWQgZnJvbSBzdHIgfTtcbiAgKiAgICAgfTtcbiAgKlxuICAqL1xuXG5yZXF1ZXN0LnBhcnNlID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcGFyc2VTdHJpbmcsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5wYXJzZVxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaGVhZGVyIGBzdHJgIGludG9cbiAqIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXBwZWQgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVyKHN0cikge1xuICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoL1xccj9cXG4vKTtcbiAgdmFyIGZpZWxkcyA9IHt9O1xuICB2YXIgaW5kZXg7XG4gIHZhciBsaW5lO1xuICB2YXIgZmllbGQ7XG4gIHZhciB2YWw7XG5cbiAgbGluZXMucG9wKCk7IC8vIHRyYWlsaW5nIENSTEZcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBmaWVsZCA9IGxpbmUuc2xpY2UoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdHJpbShsaW5lLnNsaWNlKGluZGV4ICsgMSkpO1xuICAgIGZpZWxkc1tmaWVsZF0gPSB2YWw7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBtaW1lYCBpcyBqc29uIG9yIGhhcyAranNvbiBzdHJ1Y3R1cmVkIHN5bnRheCBzdWZmaXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1pbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0pTT04obWltZSkge1xuICByZXR1cm4gL1tcXC8rXWpzb25cXGIvLnRlc3QobWltZSk7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVzcG9uc2VgIHdpdGggdGhlIGdpdmVuIGB4aHJgLlxuICpcbiAqICAtIHNldCBmbGFncyAoLm9rLCAuZXJyb3IsIGV0YylcbiAqICAtIHBhcnNlIGhlYWRlclxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICBBbGlhc2luZyBgc3VwZXJhZ2VudGAgYXMgYHJlcXVlc3RgIGlzIG5pY2U6XG4gKlxuICogICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudDtcbiAqXG4gKiAgV2UgY2FuIHVzZSB0aGUgcHJvbWlzZS1saWtlIEFQSSwgb3IgcGFzcyBjYWxsYmFja3M6XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnLycpLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICogICAgICByZXF1ZXN0LmdldCgnLycsIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIFNlbmRpbmcgZGF0YSBjYW4gYmUgY2hhaW5lZDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAuc2VuZCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5wb3N0KClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBPciBmdXJ0aGVyIHJlZHVjZWQgdG8gYSBzaW5nbGUgY2FsbCBmb3Igc2ltcGxlIGNhc2VzOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIEBwYXJhbSB7WE1MSFRUUFJlcXVlc3R9IHhoclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlKHJlcSkge1xuICB0aGlzLnJlcSA9IHJlcTtcbiAgdGhpcy54aHIgPSB0aGlzLnJlcS54aHI7XG4gIC8vIHJlc3BvbnNlVGV4dCBpcyBhY2Nlc3NpYmxlIG9ubHkgaWYgcmVzcG9uc2VUeXBlIGlzICcnIG9yICd0ZXh0JyBhbmQgb24gb2xkZXIgYnJvd3NlcnNcbiAgdGhpcy50ZXh0ID0gKCh0aGlzLnJlcS5tZXRob2QgIT0nSEVBRCcgJiYgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcpKSB8fCB0eXBlb2YgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndW5kZWZpbmVkJylcbiAgICAgPyB0aGlzLnhoci5yZXNwb25zZVRleHRcbiAgICAgOiBudWxsO1xuICB0aGlzLnN0YXR1c1RleHQgPSB0aGlzLnJlcS54aHIuc3RhdHVzVGV4dDtcbiAgdmFyIHN0YXR1cyA9IHRoaXMueGhyLnN0YXR1cztcbiAgLy8gaGFuZGxlIElFOSBidWc6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAwNDY5NzIvbXNpZS1yZXR1cm5zLXN0YXR1cy1jb2RlLW9mLTEyMjMtZm9yLWFqYXgtcmVxdWVzdFxuICBpZiAoc3RhdHVzID09PSAxMjIzKSB7XG4gICAgICBzdGF0dXMgPSAyMDQ7XG4gIH1cbiAgdGhpcy5fc2V0U3RhdHVzUHJvcGVydGllcyhzdGF0dXMpO1xuICB0aGlzLmhlYWRlciA9IHRoaXMuaGVhZGVycyA9IHBhcnNlSGVhZGVyKHRoaXMueGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgLy8gZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIHNvbWV0aW1lcyBmYWxzZWx5IHJldHVybnMgXCJcIiBmb3IgQ09SUyByZXF1ZXN0cywgYnV0XG4gIC8vIGdldFJlc3BvbnNlSGVhZGVyIHN0aWxsIHdvcmtzLiBzbyB3ZSBnZXQgY29udGVudC10eXBlIGV2ZW4gaWYgZ2V0dGluZ1xuICAvLyBvdGhlciBoZWFkZXJzIGZhaWxzLlxuICB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gPSB0aGlzLnhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XG4gIHRoaXMuX3NldEhlYWRlclByb3BlcnRpZXModGhpcy5oZWFkZXIpO1xuXG4gIGlmIChudWxsID09PSB0aGlzLnRleHQgJiYgcmVxLl9yZXNwb25zZVR5cGUpIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnhoci5yZXNwb25zZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnJlcS5tZXRob2QgIT0gJ0hFQUQnXG4gICAgICA/IHRoaXMuX3BhcnNlQm9keSh0aGlzLnRleHQgPyB0aGlzLnRleHQgOiB0aGlzLnhoci5yZXNwb25zZSlcbiAgICAgIDogbnVsbDtcbiAgfVxufVxuXG5SZXNwb25zZUJhc2UoUmVzcG9uc2UucHJvdG90eXBlKTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYm9keSBgc3RyYC5cbiAqXG4gKiBVc2VkIGZvciBhdXRvLXBhcnNpbmcgb2YgYm9kaWVzLiBQYXJzZXJzXG4gKiBhcmUgZGVmaW5lZCBvbiB0aGUgYHN1cGVyYWdlbnQucGFyc2VgIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5fcGFyc2VCb2R5ID0gZnVuY3Rpb24oc3RyKXtcbiAgdmFyIHBhcnNlID0gcmVxdWVzdC5wYXJzZVt0aGlzLnR5cGVdO1xuICBpZih0aGlzLnJlcS5fcGFyc2VyKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLl9wYXJzZXIodGhpcywgc3RyKTtcbiAgfVxuICBpZiAoIXBhcnNlICYmIGlzSlNPTih0aGlzLnR5cGUpKSB7XG4gICAgcGFyc2UgPSByZXF1ZXN0LnBhcnNlWydhcHBsaWNhdGlvbi9qc29uJ107XG4gIH1cbiAgcmV0dXJuIHBhcnNlICYmIHN0ciAmJiAoc3RyLmxlbmd0aCB8fCBzdHIgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgPyBwYXJzZShzdHIpXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciByZXEgPSB0aGlzLnJlcTtcbiAgdmFyIG1ldGhvZCA9IHJlcS5tZXRob2Q7XG4gIHZhciB1cmwgPSByZXEudXJsO1xuXG4gIHZhciBtc2cgPSAnY2Fubm90ICcgKyBtZXRob2QgKyAnICcgKyB1cmwgKyAnICgnICsgdGhpcy5zdGF0dXMgKyAnKSc7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gbWV0aG9kO1xuICBlcnIudXJsID0gdXJsO1xuXG4gIHJldHVybiBlcnI7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VgLlxuICovXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5fcXVlcnkgPSB0aGlzLl9xdWVyeSB8fCBbXTtcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gIHRoaXMudXJsID0gdXJsO1xuICB0aGlzLmhlYWRlciA9IHt9OyAvLyBwcmVzZXJ2ZXMgaGVhZGVyIG5hbWUgY2FzZVxuICB0aGlzLl9oZWFkZXIgPSB7fTsgLy8gY29lcmNlcyBoZWFkZXIgbmFtZXMgdG8gbG93ZXJjYXNlXG4gIHRoaXMub24oJ2VuZCcsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGVyciA9IG51bGw7XG4gICAgdmFyIHJlcyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgcmVzID0gbmV3IFJlc3BvbnNlKHNlbGYpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgZXJyID0gbmV3IEVycm9yKCdQYXJzZXIgaXMgdW5hYmxlIHRvIHBhcnNlIHRoZSByZXNwb25zZScpO1xuICAgICAgZXJyLnBhcnNlID0gdHJ1ZTtcbiAgICAgIGVyci5vcmlnaW5hbCA9IGU7XG4gICAgICAvLyBpc3N1ZSAjNjc1OiByZXR1cm4gdGhlIHJhdyByZXNwb25zZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgaWYgKHNlbGYueGhyKSB7XG4gICAgICAgIC8vIGllOSBkb2Vzbid0IGhhdmUgJ3Jlc3BvbnNlJyBwcm9wZXJ0eVxuICAgICAgICBlcnIucmF3UmVzcG9uc2UgPSB0eXBlb2Ygc2VsZi54aHIucmVzcG9uc2VUeXBlID09ICd1bmRlZmluZWQnID8gc2VsZi54aHIucmVzcG9uc2VUZXh0IDogc2VsZi54aHIucmVzcG9uc2U7XG4gICAgICAgIC8vIGlzc3VlICM4NzY6IHJldHVybiB0aGUgaHR0cCBzdGF0dXMgY29kZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgICBlcnIuc3RhdHVzID0gc2VsZi54aHIuc3RhdHVzID8gc2VsZi54aHIuc3RhdHVzIDogbnVsbDtcbiAgICAgICAgZXJyLnN0YXR1c0NvZGUgPSBlcnIuc3RhdHVzOyAvLyBiYWNrd2FyZHMtY29tcGF0IG9ubHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVyci5yYXdSZXNwb25zZSA9IG51bGw7XG4gICAgICAgIGVyci5zdGF0dXMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIpO1xuICAgIH1cblxuICAgIHNlbGYuZW1pdCgncmVzcG9uc2UnLCByZXMpO1xuXG4gICAgdmFyIG5ld19lcnI7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghc2VsZi5faXNSZXNwb25zZU9LKHJlcykpIHtcbiAgICAgICAgbmV3X2VyciA9IG5ldyBFcnJvcihyZXMuc3RhdHVzVGV4dCB8fCAnVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2UnKTtcbiAgICAgICAgbmV3X2Vyci5vcmlnaW5hbCA9IGVycjtcbiAgICAgICAgbmV3X2Vyci5yZXNwb25zZSA9IHJlcztcbiAgICAgICAgbmV3X2Vyci5zdGF0dXMgPSByZXMuc3RhdHVzO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgbmV3X2VyciA9IGU7IC8vICM5ODUgdG91Y2hpbmcgcmVzIG1heSBjYXVzZSBJTlZBTElEX1NUQVRFX0VSUiBvbiBvbGQgQW5kcm9pZFxuICAgIH1cblxuICAgIC8vICMxMDAwIGRvbid0IGNhdGNoIGVycm9ycyBmcm9tIHRoZSBjYWxsYmFjayB0byBhdm9pZCBkb3VibGUgY2FsbGluZyBpdFxuICAgIGlmIChuZXdfZXJyKSB7XG4gICAgICBzZWxmLmNhbGxiYWNrKG5ld19lcnIsIHJlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuY2FsbGJhY2sobnVsbCwgcmVzKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIE1peGluIGBFbWl0dGVyYCBhbmQgYFJlcXVlc3RCYXNlYC5cbiAqL1xuXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblJlcXVlc3RCYXNlKFJlcXVlc3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBTZXQgQ29udGVudC1UeXBlIHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgneG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCdhcHBsaWNhdGlvbi94bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnR5cGUgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0NvbnRlbnQtVHlwZScsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQWNjZXB0IHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLmpzb24gPSAnYXBwbGljYXRpb24vanNvbic7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdqc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY2NlcHRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0FjY2VwdCcsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQXV0aG9yaXphdGlvbiBmaWVsZCB2YWx1ZSB3aXRoIGB1c2VyYCBhbmQgYHBhc3NgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gW3Bhc3NdIG9wdGlvbmFsIGluIGNhc2Ugb2YgdXNpbmcgJ2JlYXJlcicgYXMgdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgd2l0aCAndHlwZScgcHJvcGVydHkgJ2F1dG8nLCAnYmFzaWMnIG9yICdiZWFyZXInIChkZWZhdWx0ICdiYXNpYycpXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXV0aCA9IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIG9wdGlvbnMpe1xuICBpZiAodHlwZW9mIHBhc3MgPT09ICdvYmplY3QnICYmIHBhc3MgIT09IG51bGwpIHsgLy8gcGFzcyBpcyBvcHRpb25hbCBhbmQgY2FuIHN1YnN0aXR1dGUgZm9yIG9wdGlvbnNcbiAgICBvcHRpb25zID0gcGFzcztcbiAgfVxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgdHlwZTogJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGJ0b2EgPyAnYmFzaWMnIDogJ2F1dG8nLFxuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAob3B0aW9ucy50eXBlKSB7XG4gICAgY2FzZSAnYmFzaWMnOlxuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGJ0b2EodXNlciArICc6JyArIHBhc3MpKTtcbiAgICBicmVhaztcblxuICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXI7XG4gICAgICB0aGlzLnBhc3N3b3JkID0gcGFzcztcbiAgICBicmVhaztcbiAgICAgIFxuICAgIGNhc2UgJ2JlYXJlcic6IC8vIHVzYWdlIHdvdWxkIGJlIC5hdXRoKGFjY2Vzc1Rva2VuLCB7IHR5cGU6ICdiZWFyZXInIH0pXG4gICAgICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHVzZXIpO1xuICAgIGJyZWFrOyAgXG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZCBxdWVyeS1zdHJpbmcgYHZhbGAuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICByZXF1ZXN0LmdldCgnL3Nob2VzJylcbiAqICAgICAucXVlcnkoJ3NpemU9MTAnKVxuICogICAgIC5xdWVyeSh7IGNvbG9yOiAnYmx1ZScgfSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24odmFsKXtcbiAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHZhbCA9IHNlcmlhbGl6ZSh2YWwpO1xuICBpZiAodmFsKSB0aGlzLl9xdWVyeS5wdXNoKHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBRdWV1ZSB0aGUgZ2l2ZW4gYGZpbGVgIGFzIGFuIGF0dGFjaG1lbnQgdG8gdGhlIHNwZWNpZmllZCBgZmllbGRgLFxuICogd2l0aCBvcHRpb25hbCBgb3B0aW9uc2AgKG9yIGZpbGVuYW1lKS5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5hdHRhY2goJ2NvbnRlbnQnLCBuZXcgQmxvYihbJzxhIGlkPVwiYVwiPjxiIGlkPVwiYlwiPmhleSE8L2I+PC9hPiddLCB7IHR5cGU6IFwidGV4dC9odG1sXCJ9KSlcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7QmxvYnxGaWxlfSBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbihmaWVsZCwgZmlsZSwgb3B0aW9ucyl7XG4gIGlmIChmaWxlKSB7XG4gICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgIHRocm93IEVycm9yKFwic3VwZXJhZ2VudCBjYW4ndCBtaXggLnNlbmQoKSBhbmQgLmF0dGFjaCgpXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKGZpZWxkLCBmaWxlLCBvcHRpb25zIHx8IGZpbGUubmFtZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fZ2V0Rm9ybURhdGEgPSBmdW5jdGlvbigpe1xuICBpZiAoIXRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgdGhpcy5fZm9ybURhdGEgPSBuZXcgcm9vdC5Gb3JtRGF0YSgpO1xuICB9XG4gIHJldHVybiB0aGlzLl9mb3JtRGF0YTtcbn07XG5cbi8qKlxuICogSW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIGBlcnJgIGFuZCBgcmVzYFxuICogYW5kIGhhbmRsZSBhcml0eSBjaGVjay5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2FsbGJhY2sgPSBmdW5jdGlvbihlcnIsIHJlcyl7XG4gIC8vIGNvbnNvbGUubG9nKHRoaXMuX3JldHJpZXMsIHRoaXMuX21heFJldHJpZXMpXG4gIGlmICh0aGlzLl9tYXhSZXRyaWVzICYmIHRoaXMuX3JldHJpZXMrKyA8IHRoaXMuX21heFJldHJpZXMgJiYgc2hvdWxkUmV0cnkoZXJyLCByZXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JldHJ5KCk7XG4gIH1cblxuICB2YXIgZm4gPSB0aGlzLl9jYWxsYmFjaztcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICBpZiAoZXJyKSB7XG4gICAgaWYgKHRoaXMuX21heFJldHJpZXMpIGVyci5yZXRyaWVzID0gdGhpcy5fcmV0cmllcyAtIDE7XG4gICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIH1cblxuICBmbihlcnIsIHJlcyk7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHgtZG9tYWluIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNyb3NzRG9tYWluRXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCdSZXF1ZXN0IGhhcyBiZWVuIHRlcm1pbmF0ZWRcXG5Qb3NzaWJsZSBjYXVzZXM6IHRoZSBuZXR3b3JrIGlzIG9mZmxpbmUsIE9yaWdpbiBpcyBub3QgYWxsb3dlZCBieSBBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4sIHRoZSBwYWdlIGlzIGJlaW5nIHVubG9hZGVkLCBldGMuJyk7XG4gIGVyci5jcm9zc0RvbWFpbiA9IHRydWU7XG5cbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gdGhpcy5tZXRob2Q7XG4gIGVyci51cmwgPSB0aGlzLnVybDtcblxuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG4vLyBUaGlzIG9ubHkgd2FybnMsIGJlY2F1c2UgdGhlIHJlcXVlc3QgaXMgc3RpbGwgbGlrZWx5IHRvIHdvcmtcblJlcXVlc3QucHJvdG90eXBlLmJ1ZmZlciA9IFJlcXVlc3QucHJvdG90eXBlLmNhID0gUmVxdWVzdC5wcm90b3R5cGUuYWdlbnQgPSBmdW5jdGlvbigpe1xuICBjb25zb2xlLndhcm4oXCJUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciB2ZXJzaW9uIG9mIHN1cGVyYWdlbnRcIik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gVGhpcyB0aHJvd3MsIGJlY2F1c2UgaXQgY2FuJ3Qgc2VuZC9yZWNlaXZlIGRhdGEgYXMgZXhwZWN0ZWRcblJlcXVlc3QucHJvdG90eXBlLnBpcGUgPSBSZXF1ZXN0LnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uKCl7XG4gIHRocm93IEVycm9yKFwiU3RyZWFtaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciB2ZXJzaW9uIG9mIHN1cGVyYWdlbnRcIik7XG59O1xuXG4vKipcbiAqIENvbXBvc2UgcXVlcnlzdHJpbmcgdG8gYXBwZW5kIHRvIHJlcS51cmxcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fYXBwZW5kUXVlcnlTdHJpbmcgPSBmdW5jdGlvbigpe1xuICB2YXIgcXVlcnkgPSB0aGlzLl9xdWVyeS5qb2luKCcmJyk7XG4gIGlmIChxdWVyeSkge1xuICAgIHRoaXMudXJsICs9ICh0aGlzLnVybC5pbmRleE9mKCc/JykgPj0gMCA/ICcmJyA6ICc/JykgKyBxdWVyeTtcbiAgfVxuXG4gIGlmICh0aGlzLl9zb3J0KSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy51cmwuaW5kZXhPZignPycpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB2YXIgcXVlcnlBcnIgPSB0aGlzLnVybC5zdWJzdHJpbmcoaW5kZXggKyAxKS5zcGxpdCgnJicpO1xuICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5fc29ydCkpIHtcbiAgICAgICAgcXVlcnlBcnIuc29ydCh0aGlzLl9zb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5QXJyLnNvcnQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gdGhpcy51cmwuc3Vic3RyaW5nKDAsIGluZGV4KSArICc/JyArIHF1ZXJ5QXJyLmpvaW4oJyYnKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBob3N0IG9iamVjdCxcbiAqIHdlIGRvbid0IHdhbnQgdG8gc2VyaWFsaXplIHRoZXNlIDopXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SZXF1ZXN0LnByb3RvdHlwZS5faXNIb3N0ID0gZnVuY3Rpb24gX2lzSG9zdChvYmopIHtcbiAgLy8gTmF0aXZlIG9iamVjdHMgc3RyaW5naWZ5IHRvIFtvYmplY3QgRmlsZV0sIFtvYmplY3QgQmxvYl0sIFtvYmplY3QgRm9ybURhdGFdLCBldGMuXG4gIHJldHVybiBvYmogJiYgJ29iamVjdCcgPT09IHR5cGVvZiBvYmogJiYgIUFycmF5LmlzQXJyYXkob2JqKSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG5cbi8qKlxuICogSW5pdGlhdGUgcmVxdWVzdCwgaW52b2tpbmcgY2FsbGJhY2sgYGZuKHJlcylgXG4gKiB3aXRoIGFuIGluc3RhbmNlb2YgYFJlc3BvbnNlYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGZuKXtcbiAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IC5lbmQoKSB3YXMgY2FsbGVkIHR3aWNlLiBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gc3VwZXJhZ2VudFwiKTtcbiAgfVxuICB0aGlzLl9lbmRDYWxsZWQgPSB0cnVlO1xuXG4gIC8vIHN0b3JlIGNhbGxiYWNrXG4gIHRoaXMuX2NhbGxiYWNrID0gZm4gfHwgbm9vcDtcblxuICAvLyBxdWVyeXN0cmluZ1xuICB0aGlzLl9hcHBlbmRRdWVyeVN0cmluZygpO1xuXG4gIHJldHVybiB0aGlzLl9lbmQoKTtcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9lbmQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgeGhyID0gdGhpcy54aHIgPSByZXF1ZXN0LmdldFhIUigpO1xuICB2YXIgZGF0YSA9IHRoaXMuX2Zvcm1EYXRhIHx8IHRoaXMuX2RhdGE7XG5cbiAgdGhpcy5fc2V0VGltZW91dHMoKTtcblxuICAvLyBzdGF0ZSBjaGFuZ2VcbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHJlYWR5U3RhdGUgPSB4aHIucmVhZHlTdGF0ZTtcbiAgICBpZiAocmVhZHlTdGF0ZSA+PSAyICYmIHNlbGYuX3Jlc3BvbnNlVGltZW91dFRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQoc2VsZi5fcmVzcG9uc2VUaW1lb3V0VGltZXIpO1xuICAgIH1cbiAgICBpZiAoNCAhPSByZWFkeVN0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSW4gSUU5LCByZWFkcyB0byBhbnkgcHJvcGVydHkgKGUuZy4gc3RhdHVzKSBvZmYgb2YgYW4gYWJvcnRlZCBYSFIgd2lsbFxuICAgIC8vIHJlc3VsdCBpbiB0aGUgZXJyb3IgXCJDb3VsZCBub3QgY29tcGxldGUgdGhlIG9wZXJhdGlvbiBkdWUgdG8gZXJyb3IgYzAwYzAyM2ZcIlxuICAgIHZhciBzdGF0dXM7XG4gICAgdHJ5IHsgc3RhdHVzID0geGhyLnN0YXR1cyB9IGNhdGNoKGUpIHsgc3RhdHVzID0gMDsgfVxuXG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgIGlmIChzZWxmLnRpbWVkb3V0IHx8IHNlbGYuX2Fib3J0ZWQpIHJldHVybjtcbiAgICAgIHJldHVybiBzZWxmLmNyb3NzRG9tYWluRXJyb3IoKTtcbiAgICB9XG4gICAgc2VsZi5lbWl0KCdlbmQnKTtcbiAgfTtcblxuICAvLyBwcm9ncmVzc1xuICB2YXIgaGFuZGxlUHJvZ3Jlc3MgPSBmdW5jdGlvbihkaXJlY3Rpb24sIGUpIHtcbiAgICBpZiAoZS50b3RhbCA+IDApIHtcbiAgICAgIGUucGVyY2VudCA9IGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMDtcbiAgICB9XG4gICAgZS5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgc2VsZi5lbWl0KCdwcm9ncmVzcycsIGUpO1xuICB9XG4gIGlmICh0aGlzLmhhc0xpc3RlbmVycygncHJvZ3Jlc3MnKSkge1xuICAgIHRyeSB7XG4gICAgICB4aHIub25wcm9ncmVzcyA9IGhhbmRsZVByb2dyZXNzLmJpbmQobnVsbCwgJ2Rvd25sb2FkJyk7XG4gICAgICBpZiAoeGhyLnVwbG9hZCkge1xuICAgICAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcy5iaW5kKG51bGwsICd1cGxvYWQnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIC8vIEFjY2Vzc2luZyB4aHIudXBsb2FkIGZhaWxzIGluIElFIGZyb20gYSB3ZWIgd29ya2VyLCBzbyBqdXN0IHByZXRlbmQgaXQgZG9lc24ndCBleGlzdC5cbiAgICAgIC8vIFJlcG9ydGVkIGhlcmU6XG4gICAgICAvLyBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzgzNzI0NS94bWxodHRwcmVxdWVzdC11cGxvYWQtdGhyb3dzLWludmFsaWQtYXJndW1lbnQtd2hlbi11c2VkLWZyb20td2ViLXdvcmtlci1jb250ZXh0XG4gICAgfVxuICB9XG5cbiAgLy8gaW5pdGlhdGUgcmVxdWVzdFxuICB0cnkge1xuICAgIGlmICh0aGlzLnVzZXJuYW1lICYmIHRoaXMucGFzc3dvcmQpIHtcbiAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSwgdGhpcy51c2VybmFtZSwgdGhpcy5wYXNzd29yZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBzZWUgIzExNDlcbiAgICByZXR1cm4gdGhpcy5jYWxsYmFjayhlcnIpO1xuICB9XG5cbiAgLy8gQ09SU1xuICBpZiAodGhpcy5fd2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblxuICAvLyBib2R5XG4gIGlmICghdGhpcy5fZm9ybURhdGEgJiYgJ0dFVCcgIT0gdGhpcy5tZXRob2QgJiYgJ0hFQUQnICE9IHRoaXMubWV0aG9kICYmICdzdHJpbmcnICE9IHR5cGVvZiBkYXRhICYmICF0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICAvLyBzZXJpYWxpemUgc3R1ZmZcbiAgICB2YXIgY29udGVudFR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICAgIHZhciBzZXJpYWxpemUgPSB0aGlzLl9zZXJpYWxpemVyIHx8IHJlcXVlc3Quc2VyaWFsaXplW2NvbnRlbnRUeXBlID8gY29udGVudFR5cGUuc3BsaXQoJzsnKVswXSA6ICcnXTtcbiAgICBpZiAoIXNlcmlhbGl6ZSAmJiBpc0pTT04oY29udGVudFR5cGUpKSB7XG4gICAgICBzZXJpYWxpemUgPSByZXF1ZXN0LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24vanNvbiddO1xuICAgIH1cbiAgICBpZiAoc2VyaWFsaXplKSBkYXRhID0gc2VyaWFsaXplKGRhdGEpO1xuICB9XG5cbiAgLy8gc2V0IGhlYWRlciBmaWVsZHNcbiAgZm9yICh2YXIgZmllbGQgaW4gdGhpcy5oZWFkZXIpIHtcbiAgICBpZiAobnVsbCA9PSB0aGlzLmhlYWRlcltmaWVsZF0pIGNvbnRpbnVlO1xuXG4gICAgaWYgKHRoaXMuaGVhZGVyLmhhc093blByb3BlcnR5KGZpZWxkKSlcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGZpZWxkLCB0aGlzLmhlYWRlcltmaWVsZF0pO1xuICB9XG5cbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLl9yZXNwb25zZVR5cGU7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuXG4gIC8vIElFMTEgeGhyLnNlbmQodW5kZWZpbmVkKSBzZW5kcyAndW5kZWZpbmVkJyBzdHJpbmcgYXMgUE9TVCBwYXlsb2FkIChpbnN0ZWFkIG9mIG5vdGhpbmcpXG4gIC8vIFdlIG5lZWQgbnVsbCBoZXJlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gIHhoci5zZW5kKHR5cGVvZiBkYXRhICE9PSAndW5kZWZpbmVkJyA/IGRhdGEgOiBudWxsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEdFVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuZ2V0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdHRVQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogSEVBRCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuaGVhZCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnSEVBRCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIE9QVElPTlMgcXVlcnkgdG8gYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0Lm9wdGlvbnMgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ09QVElPTlMnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBERUxFVEUgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRlbCh1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0RFTEVURScsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG5yZXF1ZXN0WydkZWwnXSA9IGRlbDtcbnJlcXVlc3RbJ2RlbGV0ZSddID0gZGVsO1xuXG4vKipcbiAqIFBBVENIIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnBhdGNoID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQQVRDSCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBPU1QgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUE9TVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBVVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wdXQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BVVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuIiwiLyoqXG4gKiBDaGVjayBpZiBgZm5gIGlzIGEgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pcy1vYmplY3QnKTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihmbikge1xuICB2YXIgdGFnID0gaXNPYmplY3QoZm4pID8gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZuKSA6ICcnO1xuICByZXR1cm4gdGFnID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCIvKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gIHJldHVybiBudWxsICE9PSBvYmogJiYgJ29iamVjdCcgPT09IHR5cGVvZiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCIvKipcbiAqIE1vZHVsZSBvZiBtaXhlZC1pbiBmdW5jdGlvbnMgc2hhcmVkIGJldHdlZW4gbm9kZSBhbmQgY2xpZW50IGNvZGVcbiAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pcy1vYmplY3QnKTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlcXVlc3RCYXNlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RCYXNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlcXVlc3RCYXNlYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3RCYXNlKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cblxuLyoqXG4gKiBNaXhpbiB0aGUgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBSZXF1ZXN0QmFzZS5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogQ2xlYXIgcHJldmlvdXMgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmNsZWFyVGltZW91dCA9IGZ1bmN0aW9uIF9jbGVhclRpbWVvdXQoKXtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgZGVsZXRlIHRoaXMuX3RpbWVyO1xuICBkZWxldGUgdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXI7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlc3BvbnNlIGJvZHkgcGFyc2VyXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB0byBjb252ZXJ0IGluY29taW5nIGRhdGEgaW50byByZXF1ZXN0LmJvZHlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZShmbil7XG4gIHRoaXMuX3BhcnNlciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IGZvcm1hdCBvZiBiaW5hcnkgcmVzcG9uc2UgYm9keS5cbiAqIEluIGJyb3dzZXIgdmFsaWQgZm9ybWF0cyBhcmUgJ2Jsb2InIGFuZCAnYXJyYXlidWZmZXInLFxuICogd2hpY2ggcmV0dXJuIEJsb2IgYW5kIEFycmF5QnVmZmVyLCByZXNwZWN0aXZlbHkuXG4gKlxuICogSW4gTm9kZSBhbGwgdmFsdWVzIHJlc3VsdCBpbiBCdWZmZXIuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAucmVzcG9uc2VUeXBlKCdibG9iJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJlc3BvbnNlVHlwZSA9IGZ1bmN0aW9uKHZhbCl7XG4gIHRoaXMuX3Jlc3BvbnNlVHlwZSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQgcmVxdWVzdCBib2R5IHNlcmlhbGl6ZXJcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIGNvbnZlcnQgZGF0YSBzZXQgdmlhIC5zZW5kIG9yIC5hdHRhY2ggaW50byBwYXlsb2FkIHRvIHNlbmRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24gc2VyaWFsaXplKGZuKXtcbiAgdGhpcy5fc2VyaWFsaXplciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRpbWVvdXRzLlxuICpcbiAqIC0gcmVzcG9uc2UgdGltZW91dCBpcyB0aW1lIGJldHdlZW4gc2VuZGluZyByZXF1ZXN0IGFuZCByZWNlaXZpbmcgdGhlIGZpcnN0IGJ5dGUgb2YgdGhlIHJlc3BvbnNlLiBJbmNsdWRlcyBETlMgYW5kIGNvbm5lY3Rpb24gdGltZS5cbiAqIC0gZGVhZGxpbmUgaXMgdGhlIHRpbWUgZnJvbSBzdGFydCBvZiB0aGUgcmVxdWVzdCB0byByZWNlaXZpbmcgcmVzcG9uc2UgYm9keSBpbiBmdWxsLiBJZiB0aGUgZGVhZGxpbmUgaXMgdG9vIHNob3J0IGxhcmdlIGZpbGVzIG1heSBub3QgbG9hZCBhdCBhbGwgb24gc2xvdyBjb25uZWN0aW9ucy5cbiAqXG4gKiBWYWx1ZSBvZiAwIG9yIGZhbHNlIG1lYW5zIG5vIHRpbWVvdXQuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBtcyBvciB7cmVzcG9uc2UsIHJlYWQsIGRlYWRsaW5lfVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gdGltZW91dChvcHRpb25zKXtcbiAgaWYgKCFvcHRpb25zIHx8ICdvYmplY3QnICE9PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zO1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmb3IodmFyIG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgc3dpdGNoKG9wdGlvbikge1xuICAgICAgY2FzZSAnZGVhZGxpbmUnOlxuICAgICAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucy5kZWFkbGluZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXNwb25zZSc6XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IG9wdGlvbnMucmVzcG9uc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKFwiVW5rbm93biB0aW1lb3V0IG9wdGlvblwiLCBvcHRpb24pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IG51bWJlciBvZiByZXRyeSBhdHRlbXB0cyBvbiBlcnJvci5cbiAqXG4gKiBGYWlsZWQgcmVxdWVzdHMgd2lsbCBiZSByZXRyaWVkICdjb3VudCcgdGltZXMgaWYgdGltZW91dCBvciBlcnIuY29kZSA+PSA1MDAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJldHJ5ID0gZnVuY3Rpb24gcmV0cnkoY291bnQpe1xuICAvLyBEZWZhdWx0IHRvIDEgaWYgbm8gY291bnQgcGFzc2VkIG9yIHRydWVcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgY291bnQgPT09IHRydWUpIGNvdW50ID0gMTtcbiAgaWYgKGNvdW50IDw9IDApIGNvdW50ID0gMDtcbiAgdGhpcy5fbWF4UmV0cmllcyA9IGNvdW50O1xuICB0aGlzLl9yZXRyaWVzID0gMDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJldHJ5IHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fcmV0cnkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICAvLyBub2RlXG4gIGlmICh0aGlzLnJlcSkge1xuICAgIHRoaXMucmVxID0gbnVsbDtcbiAgICB0aGlzLnJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICB9XG5cbiAgdGhpcy5fYWJvcnRlZCA9IGZhbHNlO1xuICB0aGlzLnRpbWVkb3V0ID0gZmFsc2U7XG5cbiAgcmV0dXJuIHRoaXMuX2VuZCgpO1xufTtcblxuLyoqXG4gKiBQcm9taXNlIHN1cHBvcnRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVqZWN0XVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIHRoZW4ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gIGlmICghdGhpcy5fZnVsbGZpbGxlZFByb21pc2UpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgICAgY29uc29sZS53YXJuKFwiV2FybmluZzogc3VwZXJhZ2VudCByZXF1ZXN0IHdhcyBzZW50IHR3aWNlLCBiZWNhdXNlIGJvdGggLmVuZCgpIGFuZCAudGhlbigpIHdlcmUgY2FsbGVkLiBOZXZlciBjYWxsIC5lbmQoKSBpZiB5b3UgdXNlIHByb21pc2VzXCIpO1xuICAgIH1cbiAgICB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKGlubmVyUmVzb2x2ZSwgaW5uZXJSZWplY3Qpe1xuICAgICAgc2VsZi5lbmQoZnVuY3Rpb24oZXJyLCByZXMpe1xuICAgICAgICBpZiAoZXJyKSBpbm5lclJlamVjdChlcnIpOyBlbHNlIGlubmVyUmVzb2x2ZShyZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbn1cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmNhdGNoID0gZnVuY3Rpb24oY2IpIHtcbiAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIGNiKTtcbn07XG5cbi8qKlxuICogQWxsb3cgZm9yIGV4dGVuc2lvblxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZm4pIHtcbiAgZm4odGhpcyk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUub2sgPSBmdW5jdGlvbihjYikge1xuICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGNiKSB0aHJvdyBFcnJvcihcIkNhbGxiYWNrIHJlcXVpcmVkXCIpO1xuICB0aGlzLl9va0NhbGxiYWNrID0gY2I7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9pc1Jlc3BvbnNlT0sgPSBmdW5jdGlvbihyZXMpIHtcbiAgaWYgKCFyZXMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodGhpcy5fb2tDYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9va0NhbGxiYWNrKHJlcyk7XG4gIH1cblxuICByZXR1cm4gcmVzLnN0YXR1cyA+PSAyMDAgJiYgcmVzLnN0YXR1cyA8IDMwMDtcbn07XG5cblxuLyoqXG4gKiBHZXQgcmVxdWVzdCBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGhlYWRlciBgZmllbGRgIHZhbHVlLlxuICogVGhpcyBpcyBhIGRlcHJlY2F0ZWQgaW50ZXJuYWwgQVBJLiBVc2UgYC5nZXQoZmllbGQpYCBpbnN0ZWFkLlxuICpcbiAqIChnZXRIZWFkZXIgaXMgbm8gbG9uZ2VyIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgc3VwZXJhZ2VudCBjb2RlIGJhc2UpXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqIEBkZXByZWNhdGVkXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldEhlYWRlciA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQ7XG5cbi8qKlxuICogU2V0IGhlYWRlciBgZmllbGRgIHRvIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0LlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2V0KCdYLUFQSS1LZXknLCAnZm9vYmFyJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoeyBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtQVBJLUtleSc6ICdmb29iYXInIH0pXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihmaWVsZCwgdmFsKXtcbiAgaWYgKGlzT2JqZWN0KGZpZWxkKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBmaWVsZCkge1xuICAgICAgdGhpcy5zZXQoa2V5LCBmaWVsZFtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldID0gdmFsO1xuICB0aGlzLmhlYWRlcltmaWVsZF0gPSB2YWw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgaGVhZGVyIGBmaWVsZGAuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAudW5zZXQoJ1VzZXItQWdlbnQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIGRlbGV0ZSB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG4gIGRlbGV0ZSB0aGlzLmhlYWRlcltmaWVsZF07XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBXcml0ZSB0aGUgZmllbGQgYG5hbWVgIGFuZCBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdFxuICogZm9yIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiIHJlcXVlc3QgYm9kaWVzLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmZpZWxkKCdmb28nLCAnYmFyJylcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmZpZWxkKHsgZm9vOiAnYmFyJywgYmF6OiAncXV4JyB9KVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd8QmxvYnxGaWxlfEJ1ZmZlcnxmcy5SZWFkU3RyZWFtfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG5cbiAgLy8gbmFtZSBzaG91bGQgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIG9iamVjdC5cbiAgaWYgKG51bGwgPT09IG5hbWUgfHwgIHVuZGVmaW5lZCA9PT0gbmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgbmFtZSBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cblxuICBpZiAodGhpcy5fZGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCIuZmllbGQoKSBjYW4ndCBiZSB1c2VkIGlmIC5zZW5kKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiKTtcbiAgfVxuXG4gIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICB0aGlzLmZpZWxkKGtleSwgbmFtZVtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgZm9yICh2YXIgaSBpbiB2YWwpIHtcbiAgICAgIHRoaXMuZmllbGQobmFtZSwgdmFsW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyB2YWwgc2hvdWxkIGJlIGRlZmluZWQgbm93XG4gIGlmIChudWxsID09PSB2YWwgfHwgdW5kZWZpbmVkID09PSB2YWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJy5maWVsZChuYW1lLCB2YWwpIHZhbCBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PT0gdHlwZW9mIHZhbCkge1xuICAgIHZhbCA9ICcnICsgdmFsO1xuICB9XG4gIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKG5hbWUsIHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBYm9ydCB0aGUgcmVxdWVzdCwgYW5kIGNsZWFyIHBvdGVudGlhbCB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpe1xuICBpZiAodGhpcy5fYWJvcnRlZCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHRoaXMuX2Fib3J0ZWQgPSB0cnVlO1xuICB0aGlzLnhociAmJiB0aGlzLnhoci5hYm9ydCgpOyAvLyBicm93c2VyXG4gIHRoaXMucmVxICYmIHRoaXMucmVxLmFib3J0KCk7IC8vIG5vZGVcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgdGhpcy5lbWl0KCdhYm9ydCcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW5hYmxlIHRyYW5zbWlzc2lvbiBvZiBjb29raWVzIHdpdGggeC1kb21haW4gcmVxdWVzdHMuXG4gKlxuICogTm90ZSB0aGF0IGZvciB0aGlzIHRvIHdvcmsgdGhlIG9yaWdpbiBtdXN0IG5vdCBiZVxuICogdXNpbmcgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiB3aXRoIGEgd2lsZGNhcmQsXG4gKiBhbmQgYWxzbyBtdXN0IHNldCBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCJcbiAqIHRvIFwidHJ1ZVwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uKG9uKXtcbiAgLy8gVGhpcyBpcyBicm93c2VyLW9ubHkgZnVuY3Rpb25hbGl0eS4gTm9kZSBzaWRlIGlzIG5vLW9wLlxuICBpZihvbj09dW5kZWZpbmVkKSBvbiA9IHRydWU7XG4gIHRoaXMuX3dpdGhDcmVkZW50aWFscyA9IG9uO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtYXggcmVkaXJlY3RzIHRvIGBuYC4gRG9lcyBub3RpbmcgaW4gYnJvd3NlciBYSFIgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVkaXJlY3RzID0gZnVuY3Rpb24obil7XG4gIHRoaXMuX21heFJlZGlyZWN0cyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IHRvIGEgcGxhaW4gamF2YXNjcmlwdCBvYmplY3QgKG5vdCBKU09OIHN0cmluZykgb2Ygc2NhbGFyIHByb3BlcnRpZXMuXG4gKiBOb3RlIGFzIHRoaXMgbWV0aG9kIGlzIGRlc2lnbmVkIHRvIHJldHVybiBhIHVzZWZ1bCBub24tdGhpcyB2YWx1ZSxcbiAqIGl0IGNhbm5vdCBiZSBjaGFpbmVkLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZGVzY3JpYmluZyBtZXRob2QsIHVybCwgYW5kIGRhdGEgb2YgdGhpcyByZXF1ZXN0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpe1xuICByZXR1cm4ge1xuICAgIG1ldGhvZDogdGhpcy5tZXRob2QsXG4gICAgdXJsOiB0aGlzLnVybCxcbiAgICBkYXRhOiB0aGlzLl9kYXRhLFxuICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlclxuICB9O1xufTtcblxuXG4vKipcbiAqIFNlbmQgYGRhdGFgIGFzIHRoZSByZXF1ZXN0IGJvZHksIGRlZmF1bHRpbmcgdGhlIGAudHlwZSgpYCB0byBcImpzb25cIiB3aGVuXG4gKiBhbiBvYmplY3QgaXMgZ2l2ZW4uXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gbWFudWFsIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnanNvbicpXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifScpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoJ25hbWU9dGonKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0cyB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoJ25hbWU9dG9iaScpXG4gKiAgICAgICAgLnNlbmQoJ3NwZWNpZXM9ZmVycmV0JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oZGF0YSl7XG4gIHZhciBpc09iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICB2YXIgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG5cbiAgaWYgKHRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgY29uc29sZS5lcnJvcihcIi5zZW5kKCkgY2FuJ3QgYmUgdXNlZCBpZiAuYXR0YWNoKCkgb3IgLmZpZWxkKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiKTtcbiAgfVxuXG4gIGlmIChpc09iaiAmJiAhdGhpcy5fZGF0YSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICB0aGlzLl9kYXRhID0gW107XG4gICAgfSBlbHNlIGlmICghdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgfVxuICB9IGVsc2UgaWYgKGRhdGEgJiYgdGhpcy5fZGF0YSAmJiB0aGlzLl9pc0hvc3QodGhpcy5fZGF0YSkpIHtcbiAgICB0aHJvdyBFcnJvcihcIkNhbid0IG1lcmdlIHRoZXNlIHNlbmQgY2FsbHNcIik7XG4gIH1cblxuICAvLyBtZXJnZVxuICBpZiAoaXNPYmogJiYgaXNPYmplY3QodGhpcy5fZGF0YSkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgdGhpcy5fZGF0YVtrZXldID0gZGF0YVtrZXldO1xuICAgIH1cbiAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PSB0eXBlb2YgZGF0YSkge1xuICAgIC8vIGRlZmF1bHQgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2Zvcm0nKTtcbiAgICB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICBpZiAoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgPT0gdHlwZSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX2RhdGFcbiAgICAgICAgPyB0aGlzLl9kYXRhICsgJyYnICsgZGF0YVxuICAgICAgICA6IGRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGEgPSAodGhpcy5fZGF0YSB8fCAnJykgKyBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlmICghaXNPYmogfHwgdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBkZWZhdWx0IHRvIGpzb25cbiAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2pzb24nKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogU29ydCBgcXVlcnlzdHJpbmdgIGJ5IHRoZSBzb3J0IGZ1bmN0aW9uXG4gKlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgIC8vIGRlZmF1bHQgb3JkZXJcbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvdXNlcicpXG4gKiAgICAgICAgIC5xdWVyeSgnbmFtZT1OaWNrJylcbiAqICAgICAgICAgLnF1ZXJ5KCdzZWFyY2g9TWFubnknKVxuICogICAgICAgICAuc29ydFF1ZXJ5KClcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBjdXN0b21pemVkIHNvcnQgZnVuY3Rpb25cbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvdXNlcicpXG4gKiAgICAgICAgIC5xdWVyeSgnbmFtZT1OaWNrJylcbiAqICAgICAgICAgLnF1ZXJ5KCdzZWFyY2g9TWFubnknKVxuICogICAgICAgICAuc29ydFF1ZXJ5KGZ1bmN0aW9uKGEsIGIpe1xuICogICAgICAgICAgIHJldHVybiBhLmxlbmd0aCAtIGIubGVuZ3RoO1xuICogICAgICAgICB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzb3J0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNvcnRRdWVyeSA9IGZ1bmN0aW9uKHNvcnQpIHtcbiAgLy8gX3NvcnQgZGVmYXVsdCB0byB0cnVlIGJ1dCBvdGhlcndpc2UgY2FuIGJlIGEgZnVuY3Rpb24gb3IgYm9vbGVhblxuICB0aGlzLl9zb3J0ID0gdHlwZW9mIHNvcnQgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IHNvcnQ7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB0aW1lb3V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fdGltZW91dEVycm9yID0gZnVuY3Rpb24ocmVhc29uLCB0aW1lb3V0LCBlcnJubyl7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IocmVhc29uICsgdGltZW91dCArICdtcyBleGNlZWRlZCcpO1xuICBlcnIudGltZW91dCA9IHRpbWVvdXQ7XG4gIGVyci5jb2RlID0gJ0VDT05OQUJPUlRFRCc7XG4gIGVyci5lcnJubyA9IGVycm5vO1xuICB0aGlzLnRpbWVkb3V0ID0gdHJ1ZTtcbiAgdGhpcy5hYm9ydCgpO1xuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3NldFRpbWVvdXRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICAvLyBkZWFkbGluZVxuICBpZiAodGhpcy5fdGltZW91dCAmJiAhdGhpcy5fdGltZXIpIHtcbiAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHNlbGYuX3RpbWVvdXRFcnJvcignVGltZW91dCBvZiAnLCBzZWxmLl90aW1lb3V0LCAnRVRJTUUnKTtcbiAgICB9LCB0aGlzLl90aW1lb3V0KTtcbiAgfVxuICAvLyByZXNwb25zZSB0aW1lb3V0XG4gIGlmICh0aGlzLl9yZXNwb25zZVRpbWVvdXQgJiYgIXRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyKSB7XG4gICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoJ1Jlc3BvbnNlIHRpbWVvdXQgb2YgJywgc2VsZi5fcmVzcG9uc2VUaW1lb3V0LCAnRVRJTUVET1VUJyk7XG4gICAgfSwgdGhpcy5fcmVzcG9uc2VUaW1lb3V0KTtcbiAgfVxufVxuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VCYXNlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3BvbnNlQmFzZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZUJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2VCYXNlKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cblxuLyoqXG4gKiBNaXhpbiB0aGUgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBSZXNwb25zZUJhc2UucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBSZXNwb25zZUJhc2UucHJvdG90eXBlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgICByZXR1cm4gdGhpcy5oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgcmVsYXRlZCBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBgLnR5cGVgIHRoZSBjb250ZW50IHR5cGUgd2l0aG91dCBwYXJhbXNcbiAqXG4gKiBBIHJlc3BvbnNlIG9mIFwiQ29udGVudC1UeXBlOiB0ZXh0L3BsYWluOyBjaGFyc2V0PXV0Zi04XCJcbiAqIHdpbGwgcHJvdmlkZSB5b3Ugd2l0aCBhIGAudHlwZWAgb2YgXCJ0ZXh0L3BsYWluXCIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0SGVhZGVyUHJvcGVydGllcyA9IGZ1bmN0aW9uKGhlYWRlcil7XG4gICAgLy8gVE9ETzogbW9hciFcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgYSB1dGlsXG5cbiAgICAvLyBjb250ZW50LXR5cGVcbiAgICB2YXIgY3QgPSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICAgIHRoaXMudHlwZSA9IHV0aWxzLnR5cGUoY3QpO1xuXG4gICAgLy8gcGFyYW1zXG4gICAgdmFyIHBhcmFtcyA9IHV0aWxzLnBhcmFtcyhjdCk7XG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykgdGhpc1trZXldID0gcGFyYW1zW2tleV07XG5cbiAgICB0aGlzLmxpbmtzID0ge307XG5cbiAgICAvLyBsaW5rc1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChoZWFkZXIubGluaykge1xuICAgICAgICAgICAgdGhpcy5saW5rcyA9IHV0aWxzLnBhcnNlTGlua3MoaGVhZGVyLmxpbmspO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIGlnbm9yZVxuICAgIH1cbn07XG5cbi8qKlxuICogU2V0IGZsYWdzIHN1Y2ggYXMgYC5va2AgYmFzZWQgb24gYHN0YXR1c2AuXG4gKlxuICogRm9yIGV4YW1wbGUgYSAyeHggcmVzcG9uc2Ugd2lsbCBnaXZlIHlvdSBhIGAub2tgIG9mIF9fdHJ1ZV9fXG4gKiB3aGVyZWFzIDV4eCB3aWxsIGJlIF9fZmFsc2VfXyBhbmQgYC5lcnJvcmAgd2lsbCBiZSBfX3RydWVfXy4gVGhlXG4gKiBgLmNsaWVudEVycm9yYCBhbmQgYC5zZXJ2ZXJFcnJvcmAgYXJlIGFsc28gYXZhaWxhYmxlIHRvIGJlIG1vcmVcbiAqIHNwZWNpZmljLCBhbmQgYC5zdGF0dXNUeXBlYCBpcyB0aGUgY2xhc3Mgb2YgZXJyb3IgcmFuZ2luZyBmcm9tIDEuLjVcbiAqIHNvbWV0aW1lcyB1c2VmdWwgZm9yIG1hcHBpbmcgcmVzcG9uZCBjb2xvcnMgZXRjLlxuICpcbiAqIFwic3VnYXJcIiBwcm9wZXJ0aWVzIGFyZSBhbHNvIGRlZmluZWQgZm9yIGNvbW1vbiBjYXNlcy4gQ3VycmVudGx5IHByb3ZpZGluZzpcbiAqXG4gKiAgIC0gLm5vQ29udGVudFxuICogICAtIC5iYWRSZXF1ZXN0XG4gKiAgIC0gLnVuYXV0aG9yaXplZFxuICogICAtIC5ub3RBY2NlcHRhYmxlXG4gKiAgIC0gLm5vdEZvdW5kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cyl7XG4gICAgdmFyIHR5cGUgPSBzdGF0dXMgLyAxMDAgfCAwO1xuXG4gICAgLy8gc3RhdHVzIC8gY2xhc3NcbiAgICB0aGlzLnN0YXR1cyA9IHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgICB0aGlzLnN0YXR1c1R5cGUgPSB0eXBlO1xuXG4gICAgLy8gYmFzaWNzXG4gICAgdGhpcy5pbmZvID0gMSA9PSB0eXBlO1xuICAgIHRoaXMub2sgPSAyID09IHR5cGU7XG4gICAgdGhpcy5yZWRpcmVjdCA9IDMgPT0gdHlwZTtcbiAgICB0aGlzLmNsaWVudEVycm9yID0gNCA9PSB0eXBlO1xuICAgIHRoaXMuc2VydmVyRXJyb3IgPSA1ID09IHR5cGU7XG4gICAgdGhpcy5lcnJvciA9ICg0ID09IHR5cGUgfHwgNSA9PSB0eXBlKVxuICAgICAgICA/IHRoaXMudG9FcnJvcigpXG4gICAgICAgIDogZmFsc2U7XG5cbiAgICAvLyBzdWdhclxuICAgIHRoaXMuYWNjZXB0ZWQgPSAyMDIgPT0gc3RhdHVzO1xuICAgIHRoaXMubm9Db250ZW50ID0gMjA0ID09IHN0YXR1cztcbiAgICB0aGlzLmJhZFJlcXVlc3QgPSA0MDAgPT0gc3RhdHVzO1xuICAgIHRoaXMudW5hdXRob3JpemVkID0gNDAxID09IHN0YXR1cztcbiAgICB0aGlzLm5vdEFjY2VwdGFibGUgPSA0MDYgPT0gc3RhdHVzO1xuICAgIHRoaXMuZm9yYmlkZGVuID0gNDAzID09IHN0YXR1cztcbiAgICB0aGlzLm5vdEZvdW5kID0gNDA0ID09IHN0YXR1cztcbn07XG4iLCJ2YXIgRVJST1JfQ09ERVMgPSBbXG4gICdFQ09OTlJFU0VUJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFQUREUklORk8nLFxuICAnRVNPQ0tFVFRJTUVET1VUJ1xuXTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSByZXF1ZXN0IHNob3VsZCBiZSByZXRyaWVkLlxuICogKEJvcnJvd2VkIGZyb20gc2VnbWVudGlvL3N1cGVyYWdlbnQtcmV0cnkpXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzXVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hvdWxkUmV0cnkoZXJyLCByZXMpIHtcbiAgaWYgKGVyciAmJiBlcnIuY29kZSAmJiB+RVJST1JfQ09ERVMuaW5kZXhPZihlcnIuY29kZSkpIHJldHVybiB0cnVlO1xuICBpZiAocmVzICYmIHJlcy5zdGF0dXMgJiYgcmVzLnN0YXR1cyA+PSA1MDApIHJldHVybiB0cnVlO1xuICAvLyBTdXBlcmFnZW50IHRpbWVvdXRcbiAgaWYgKGVyciAmJiAndGltZW91dCcgaW4gZXJyICYmIGVyci5jb2RlID09ICdFQ09OTkFCT1JURUQnKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKGVyciAmJiAnY3Jvc3NEb21haW4nIGluIGVycikgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG4iLCJcbi8qKlxuICogUmV0dXJuIHRoZSBtaW1lIHR5cGUgZm9yIHRoZSBnaXZlbiBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnR5cGUgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKjsgKi8pLnNoaWZ0KCk7XG59O1xuXG4vKipcbiAqIFJldHVybiBoZWFkZXIgZmllbGQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnBhcmFtcyA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqOyAqLykucmVkdWNlKGZ1bmN0aW9uKG9iaiwgc3RyKXtcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqPSAqLyk7XG4gICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgdmFyIHZhbCA9IHBhcnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoa2V5ICYmIHZhbCkgb2JqW2tleV0gPSB2YWw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBQYXJzZSBMaW5rIGhlYWRlciBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5wYXJzZUxpbmtzID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICosICovKS5yZWR1Y2UoZnVuY3Rpb24ob2JqLCBzdHIpe1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICo7ICovKTtcbiAgICB2YXIgdXJsID0gcGFydHNbMF0uc2xpY2UoMSwgLTEpO1xuICAgIHZhciByZWwgPSBwYXJ0c1sxXS5zcGxpdCgvICo9ICovKVsxXS5zbGljZSgxLCAtMSk7XG4gICAgb2JqW3JlbF0gPSB1cmw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBTdHJpcCBjb250ZW50IHJlbGF0ZWQgZmllbGRzIGZyb20gYGhlYWRlcmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQHJldHVybiB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuY2xlYW5IZWFkZXIgPSBmdW5jdGlvbihoZWFkZXIsIHNob3VsZFN0cmlwQ29va2llKXtcbiAgZGVsZXRlIGhlYWRlclsnY29udGVudC10eXBlJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtbGVuZ3RoJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ3RyYW5zZmVyLWVuY29kaW5nJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2hvc3QnXTtcbiAgaWYgKHNob3VsZFN0cmlwQ29va2llKSB7XG4gICAgZGVsZXRlIGhlYWRlclsnY29va2llJ107XG4gIH1cbiAgcmV0dXJuIGhlYWRlcjtcbn07Il19
