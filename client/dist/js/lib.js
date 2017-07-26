(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var path = require('path');

window.EventBus = require('cork-app-utils').EventBus;
window.BaseModel = require('cork-app-utils').BaseModel;
window.App = { "config": require("../lib/config.js"), "models": { "ConfigModel": require("../lib/models/ConfigModel.js"), "SearchModel": require("../lib/models/SearchModel.js") }, "services": { "search": require("../lib/services/search.js"), "utils": require("../lib/services/utils.js") }, "store": { "SearchStore": require("../lib/store/SearchStore.js") } };

},{"../lib/config.js":2,"../lib/models/ConfigModel.js":3,"../lib/models/SearchModel.js":4,"../lib/services/search.js":5,"../lib/services/utils.js":6,"../lib/store/SearchStore.js":7,"cork-app-utils":9,"path":14}],2:[function(require,module,exports){
'use strict';

module.exports = {
  // facets to show on left side
  // filter : label
  facets: {
    'color.raw': {
      label: 'Color',
      type: 'facet'
    },
    'winetype.raw': {
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
    'bottletype.raw': {
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

    _this.bindMethods('ConfigModel');
    return _this;
  }

  _createClass(ConfigModel, [{
    key: 'get',
    value: function get() {
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
var service = require('../services/search');
var store = require('../store/SearchStore');
var ServiceWrapper = require('../services/utils');

var SearchModel = function (_BaseModel) {
  _inherits(SearchModel, _BaseModel);

  function SearchModel() {
    _classCallCheck(this, SearchModel);

    var _this = _possibleConstructorReturn(this, (SearchModel.__proto__ || Object.getPrototypeOf(SearchModel)).call(this));

    _this.jstore = store;

    _this.from = 0;
    _this.size = 10;
    _this.sort = {
      key: '',
      order: ''
    };

    _this.defaultSearch();

    _this.bindMethods('SearchModel');
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

      this.jstore.setSearchLoading(body);
      ServiceWrapper.call({
        store: this.jstore,
        request: service.search(body),
        onSuccess: this.jstore.setSearchLoaded,
        onError: this.jstore.setSearchError
      });

      return this.getSearch();
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

      this.jstore.setDefaultSearchLoading(body);
      ServiceWrapper.call({
        store: this.jstore,
        request: service.search(body),
        onSuccess: this.jstore.setDefaultSearchLoaded,
        onError: this.jstore.setDefaultSearchError
      });

      return this.getDefaultSearch();
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
      return this.jstore.getSearch();
    }
  }, {
    key: 'getDefaultSearch',
    value: function getDefaultSearch() {
      return this.jstore.getDefaultSearch();
    }
  }, {
    key: 'getSuggest',
    value: function getSuggest() {
      return this.jstore.getSuggest();
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

      this.jstore.setSuggestLoading(body);
      ServiceWrapper.call({
        store: this.jstore,
        request: service.search(body),
        onSuccess: this.jstore.setSuggestLoaded,
        onError: this.jstore.setSuggestError
      });

      return this.getSuggest();
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

      if (!text) {
        this.removeFromArray(body.query.bool.must, 'match');
        this.cleanEmptyLeaves();
        if (options.exec) this.search(body);
        return body;
      }

      var match = this.getOrCreateFromArray(body.query.bool.must, 'match');
      match.name = text;
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
      for (var i = 0; i < array.length; i++) {
        if (array[i][type]) {
          array.splice(i, 1);
          return;
        }
      }
    }
  }]);

  return SearchModel;
}(BaseModel);

module.exports = new SearchModel();

},{"../config":2,"../services/search":5,"../services/utils":6,"../store/SearchStore":7,"cork-app-utils":9}],5:[function(require,module,exports){
'use strict';

var request = require('superagent');

function search(body) {
  return request.post('/search').send(body);
}

module.exports = {
  search: search
};

},{"superagent":16}],6:[function(require,module,exports){
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

var EventBus = require('cork-app-utils').EventBus;

var SearchStore = function () {
  function SearchStore() {
    _classCallCheck(this, SearchStore);

    this.data = {
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
  }

  /**
   * Default Search
   */


  _createClass(SearchStore, [{
    key: 'setDefaultSearch',
    value: function setDefaultSearch(state) {
      this.data.defaultSearch = Object.assign({}, this.data.defaultSearch, state);
      EventBus.emit('default-search-update', this.data.defaultSearch);
    }
  }, {
    key: 'setDefaultSearchLoading',
    value: function setDefaultSearchLoading(data) {
      this._setDefaultSearchState({ state: 'loading', request: data });
    }
  }, {
    key: 'setDefaultSearchLoaded',
    value: function setDefaultSearchLoaded(payload) {
      this._setDefaultSearchState({
        state: 'loaded',
        request: this.data.defaultSearch.request,
        payload: payload
      });
    }
  }, {
    key: 'setDefaultSearchError',
    value: function setDefaultSearchError(e) {
      this._setSearchState({
        state: 'error',
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
      EventBus.emit('default-search-update', this.data.defaultSearch);
    }

    /**
     * Search
     */

  }, {
    key: 'setSearchLoading',
    value: function setSearchLoading(data) {
      this._setSearchState({ state: 'loading', request: data });
    }
  }, {
    key: 'setSearchLoaded',
    value: function setSearchLoaded(payload) {
      this._setSearchState({
        state: 'loaded',
        request: this.data.search.request,
        payload: payload
      });
    }
  }, {
    key: 'setSearchError',
    value: function setSearchError(e) {
      this._setSearchState({
        state: 'error',
        request: this.data.search.request,
        error: e
      });
    }
  }, {
    key: '_setSearchState',
    value: function _setSearchState(state) {
      this.data.search = Object.assign({}, state);
      EventBus.emit('search-update', this.data.search);
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
      this._setSuggestState({ state: 'loading', request: data });
    }
  }, {
    key: 'setSuggestLoaded',
    value: function setSuggestLoaded(payload) {
      this._setSuggestState({
        state: 'loaded',
        request: this.data.suggest.request,
        payload: payload
      });
    }
  }, {
    key: 'setSuggestError',
    value: function setSuggestError(e) {
      this._setSuggestState({
        state: 'error',
        request: this.data.suggest.request,
        error: e
      });
    }
  }, {
    key: '_setSuggestState',
    value: function _setSuggestState(state) {
      this.data.suggest = Object.assign({}, state);
      EventBus.emit('suggest-update', this.data.suggest);
    }
  }, {
    key: 'getSuggest',
    value: function getSuggest() {
      return this.data.suggest;
    }
  }]);

  return SearchStore;
}();

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
  BaseModel: require('./lib/BaseModel'),
  EventBus: require('./lib/EventBus'),
  BaseStore: require('./lib/BaseStore')
};

},{"./lib/BaseModel":10,"./lib/BaseStore":11,"./lib/EventBus":12}],10:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventBus = require('./EventBus');

var BaseModel = function () {
  function BaseModel() {
    _classCallCheck(this, BaseModel);
  }

  _createClass(BaseModel, [{
    key: 'bindMethods',


    /**
     * Have to pass name for IE support.
     */
    value: function bindMethods(name) {
      var _this = this;

      if (!name) {
        console.warn('Name not passed to bindMethods().  This will fail in IE, cause, you know, IE.');
      }

      var className = this.__proto__.constructor.name || name;
      var methods = Object.getOwnPropertyNames(this.__proto__);
      methods.forEach(function (method) {
        if (method === 'constructor') return;

        _this._bindMethod(method, className + '.' + method);
      });
    }
  }, {
    key: '_bindMethod',
    value: function _bindMethod(method, event) {
      this.eventBus.on(event, function () {
        var _arguments = arguments;


        var resolve = arguments[0];
        var reject = arguments[1];

        var args = [];
        for (var i = 2; i < arguments.length; i++) {
          args.push(arguments[i]);
        }

        try {
          var resp = this[method].apply(this, args);

          // method returned a promise, just wait for it to resolve
          if (resp && (typeof resp === 'undefined' ? 'undefined' : _typeof(resp)) === 'object' && typeof resp.then === 'function') {
            resp.then(function () {
              return resolve.apply(null, _arguments);
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
  }, {
    key: 'emit',
    value: function emit(event, payload) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.eventBus.emit(event, payload, resolve, reject);
      });
    }
  }, {
    key: 'store',
    set: function set(store) {
      this._store = store;
    },
    get: function get() {
      return this.store;
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

},{"./EventBus":12}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = require('./EventBus');

var BaseStore = function () {
  function BaseStore() {
    _classCallCheck(this, BaseStore);
  }

  _createClass(BaseStore, [{
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

  return BaseStore;
}();

module.exports = BaseStore;

},{"./EventBus":12}],12:[function(require,module,exports){
'use strict';

var Events = require('events').EventEmitter;
var events = new Events();
events.setMaxListeners(10000);
module.exports = events;

},{"events":13}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"_process":15}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./is-function":17,"./is-object":18,"./request-base":19,"./response-base":20,"./should-retry":21,"component-emitter":8}],17:[function(require,module,exports){
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

},{"./is-object":18}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{"./is-object":18}],20:[function(require,module,exports){
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

},{"./utils":22}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvYnVpbGQvZ2xvYi5qcyIsImNsaWVudC9saWIvY29uZmlnLmpzIiwiY2xpZW50L2xpYi9tb2RlbHMvQ29uZmlnTW9kZWwuanMiLCJjbGllbnQvbGliL21vZGVscy9TZWFyY2hNb2RlbC5qcyIsImNsaWVudC9saWIvc2VydmljZXMvc2VhcmNoLmpzIiwiY2xpZW50L2xpYi9zZXJ2aWNlcy91dGlscy5qcyIsImNsaWVudC9saWIvc3RvcmUvU2VhcmNoU3RvcmUuanMiLCJub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yay1hcHAtdXRpbHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yay1hcHAtdXRpbHMvbGliL0Jhc2VNb2RlbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JrLWFwcC11dGlscy9saWIvQmFzZVN0b3JlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmstYXBwLXV0aWxzL2xpYi9FdmVudEJ1cy5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvY2xpZW50LmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2lzLWZ1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2lzLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9yZXF1ZXN0LWJhc2UuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvcmVzcG9uc2UtYmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9zaG91bGQtcmV0cnkuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIv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VCxFQUFhO0FBQ2hDLFNBQU8sSUFBSSxLQUFKLENBQVUsT0FBVixFQUFtQixNQUFuQixDQUEwQixVQUFTLEdBQVQsRUFBYyxHQUFkLEVBQWtCO0FBQ2pELFFBQUksUUFBUSxJQUFJLEtBQUosQ0FBVSxPQUFWLENBQVo7QUFDQSxRQUFJLE1BQU0sTUFBTSxDQUFOLEVBQVMsS0FBVCxDQUFlLENBQWYsRUFBa0IsQ0FBQyxDQUFuQixDQUFWO0FBQ0EsUUFBSSxNQUFNLE1BQU0sQ0FBTixFQUFTLEtBQVQsQ0FBZSxPQUFmLEVBQXdCLENBQXhCLEVBQTJCLEtBQTNCLENBQWlDLENBQWpDLEVBQW9DLENBQUMsQ0FBckMsQ0FBVjtBQUNBLFFBQUksR0FBSixJQUFXLEdBQVg7QUFDQSxXQUFPLEdBQVA7QUFDRCxHQU5NLEVBTUosRUFOSSxDQUFQO0FBT0QsQ0FSRDs7QUFVQTs7Ozs7Ozs7QUFRQSxRQUFRLFdBQVIsR0FBc0IsVUFBUyxNQUFULEVBQWlCLGlCQUFqQixFQUFtQztBQUN2RCxTQUFPLE9BQU8sY0FBUCxDQUFQO0FBQ0EsU0FBTyxPQUFPLGdCQUFQLENBQVA7QUFDQSxTQUFPLE9BQU8sbUJBQVAsQ0FBUDtBQUNBLFNBQU8sT0FBTyxNQUFQLENBQVA7QUFDQSxNQUFJLGlCQUFKLEVBQXVCO0FBQ3JCLFdBQU8sT0FBTyxRQUFQLENBQVA7QUFDRDtBQUNELFNBQU8sTUFBUDtBQUNELENBVEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuXG53aW5kb3cuRXZlbnRCdXMgPSByZXF1aXJlKCdjb3JrLWFwcC11dGlscycpLkV2ZW50QnVzO1xud2luZG93LkJhc2VNb2RlbCA9IHJlcXVpcmUoJ2NvcmstYXBwLXV0aWxzJykuQmFzZU1vZGVsO1xud2luZG93LkFwcCA9ICh7XCJjb25maWdcIjpyZXF1aXJlKFwiLi4vbGliL2NvbmZpZy5qc1wiKSxcIm1vZGVsc1wiOih7XCJDb25maWdNb2RlbFwiOnJlcXVpcmUoXCIuLi9saWIvbW9kZWxzL0NvbmZpZ01vZGVsLmpzXCIpLFwiU2VhcmNoTW9kZWxcIjpyZXF1aXJlKFwiLi4vbGliL21vZGVscy9TZWFyY2hNb2RlbC5qc1wiKX0pLFwic2VydmljZXNcIjooe1wic2VhcmNoXCI6cmVxdWlyZShcIi4uL2xpYi9zZXJ2aWNlcy9zZWFyY2guanNcIiksXCJ1dGlsc1wiOnJlcXVpcmUoXCIuLi9saWIvc2VydmljZXMvdXRpbHMuanNcIil9KSxcInN0b3JlXCI6KHtcIlNlYXJjaFN0b3JlXCI6cmVxdWlyZShcIi4uL2xpYi9zdG9yZS9TZWFyY2hTdG9yZS5qc1wiKX0pfSk7IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGZhY2V0cyB0byBzaG93IG9uIGxlZnQgc2lkZVxuICAvLyBmaWx0ZXIgOiBsYWJlbFxuICBmYWNldHMgOiB7XG4gICAgJ2NvbG9yLnJhdycgOiB7XG4gICAgICBsYWJlbCA6ICdDb2xvcicsXG4gICAgICB0eXBlIDogJ2ZhY2V0J1xuICAgIH0sXG4gICAgJ3dpbmV0eXBlLnJhdycgOiB7XG4gICAgICBsYWJlbCA6ICdXaW5lIFR5cGUnLFxuICAgICAgdHlwZSA6ICdmYWNldCdcbiAgICB9LFxuICAgIHZpbnRhZ2UgOiB7XG4gICAgICBsYWJlbCA6ICdWaW50YWdlJyxcbiAgICAgIHR5cGUgOiAncmFuZ2UnXG4gICAgfSxcbiAgICBwdWJsaWNhdGlvbl9kYXRlIDoge1xuICAgICAgbGFiZWwgOiAnUHVibGlzaGVkJyxcbiAgICAgIHR5cGUgOiAncmFuZ2UnXG4gICAgfSxcbiAgICBwZXJwcmljZSA6IHtcbiAgICAgIGxhYmVsIDogJ0JvdHRsZSBQcmljZScsXG4gICAgICB0eXBlIDogJ3JhbmdlJyxcbiAgICAgIGlzRG9sbGFyIDogdHJ1ZVxuICAgIH0sXG4gICAgJ2NvdW50cnkucmF3JyA6IHtcbiAgICAgIGxhYmVsIDogJ0NvdW50cnknLFxuICAgICAgdHlwZSA6ICdmYWNldCdcbiAgICB9LFxuICAgICdib3R0bGV0eXBlLnJhdycgOiB7XG4gICAgICBsYWJlbCA6ICdCb3R0bGUgU2l6ZScsXG4gICAgICB0eXBlIDogJ2ZhY2V0J1xuICAgIH1cbiAgfSxcbiAgXG4gIC8vIG1heCBudW1iZXIgb2YgZmFjZXRzIGZpbHRlciBvcHRpb25zXG4gIG1heEZhY2V0Q291bnQgOiAxMFxufSIsInZhciBCYXNlTW9kZWwgPSByZXF1aXJlKCdjb3JrLWFwcC11dGlscycpLkJhc2VNb2RlbDtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxuY2xhc3MgQ29uZmlnTW9kZWwgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5iaW5kTWV0aG9kcygnQ29uZmlnTW9kZWwnKTtcbiAgfVxuXG4gIGdldCgpIHtcbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgQ29uZmlnTW9kZWwoKTsiLCJ2YXIgQmFzZU1vZGVsID0gcmVxdWlyZSgnY29yay1hcHAtdXRpbHMnKS5CYXNlTW9kZWw7XG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XG52YXIgc2VydmljZSA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL3NlYXJjaCcpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmUvU2VhcmNoU3RvcmUnKTtcbnZhciBTZXJ2aWNlV3JhcHBlciA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL3V0aWxzJyk7XG5cbmNsYXNzIFNlYXJjaE1vZGVsIGV4dGVuZHMgQmFzZU1vZGVsIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuanN0b3JlID0gc3RvcmU7XG5cbiAgICB0aGlzLmZyb20gPSAwO1xuICAgIHRoaXMuc2l6ZSA9IDEwO1xuICAgIHRoaXMuc29ydCA9IHtcbiAgICAgIGtleSA6ICcnLFxuICAgICAgb3JkZXIgOiAnJ1xuICAgIH1cblxuICAgIHRoaXMuZGVmYXVsdFNlYXJjaCgpO1xuXG4gICAgdGhpcy5iaW5kTWV0aG9kcygnU2VhcmNoTW9kZWwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBzZWFyY2gtdXBkYXRlIGV2ZW50XG4gICAqL1xuICBzZWFyY2goYm9keSA9IHt9KSB7XG4gICAgYm9keS5hZ2dzID0ge307XG5cbiAgICBib2R5LmZyb20gPSB0aGlzLmZyb207XG4gICAgYm9keS5zaXplID0gdGhpcy5zaXplO1xuXG4gICAgaWYoIHRoaXMuc29ydC5rZXkgKSB7XG4gICAgICBib2R5LnNvcnQgPSBbe1t0aGlzLnNvcnQua2V5XSA6IHRoaXMuc29ydC5vcmRlcn1dO1xuICAgIH0gZWxzZSBpZiggYm9keS5zb3J0ICkge1xuICAgICAgZGVsZXRlIGJvZHkuc29ydDtcbiAgICB9XG5cbiAgICB0aGlzLl9hZGRGYWNldHNUb0JvZHkoYm9keSk7XG5cbiAgICB0aGlzLmpzdG9yZS5zZXRTZWFyY2hMb2FkaW5nKGJvZHkpO1xuICAgIFNlcnZpY2VXcmFwcGVyLmNhbGwoe1xuICAgICAgc3RvcmUgOiB0aGlzLmpzdG9yZSxcbiAgICAgIHJlcXVlc3QgOiBzZXJ2aWNlLnNlYXJjaChib2R5KSxcbiAgICAgIG9uU3VjY2VzcyA6IHRoaXMuanN0b3JlLnNldFNlYXJjaExvYWRlZCxcbiAgICAgIG9uRXJyb3IgOiB0aGlzLmpzdG9yZS5zZXRTZWFyY2hFcnJvclxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0U2VhcmNoKCk7XG4gIH1cblxuICBkZWZhdWx0U2VhcmNoKCkge1xuICAgIHZhciBib2R5ID0ge1xuICAgICAgYWdncyA6IHt9LFxuICAgICAgZnJvbSA6IDAsXG4gICAgICBzaXplIDogdGhpcy5zaXplXG4gICAgfTtcblxuICAgIGZvciggdmFyIGtleSBpbiBjb25maWcuZmFjZXRzICkge1xuICAgICAgaWYoIGNvbmZpZy5mYWNldHNba2V5XS50eXBlID09PSAnZmFjZXQnICkge1xuICAgICAgICBib2R5LmFnZ3Nba2V5XSA9IHtcbiAgICAgICAgICB0ZXJtcyA6IHsgXG4gICAgICAgICAgICBmaWVsZCA6IGtleSxcbiAgICAgICAgICAgIHNpemUgOiAxMDAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYoIGNvbmZpZy5mYWNldHNba2V5XS50eXBlID09PSAncmFuZ2UnICkge1xuICAgICAgICBib2R5LmFnZ3Nba2V5KyctbWluJ10gPSB7XG4gICAgICAgICAgbWluIDogeyBcbiAgICAgICAgICAgIGZpZWxkIDoga2V5XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJvZHkuYWdnc1trZXkrJy1tYXgnXSA9IHtcbiAgICAgICAgICBtYXggOiB7IFxuICAgICAgICAgICAgZmllbGQgOiBrZXlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmpzdG9yZS5zZXREZWZhdWx0U2VhcmNoTG9hZGluZyhib2R5KTtcbiAgICBTZXJ2aWNlV3JhcHBlci5jYWxsKHtcbiAgICAgIHN0b3JlIDogdGhpcy5qc3RvcmUsXG4gICAgICByZXF1ZXN0IDogc2VydmljZS5zZWFyY2goYm9keSksXG4gICAgICBvblN1Y2Nlc3MgOiB0aGlzLmpzdG9yZS5zZXREZWZhdWx0U2VhcmNoTG9hZGVkLFxuICAgICAgb25FcnJvciA6IHRoaXMuanN0b3JlLnNldERlZmF1bHRTZWFyY2hFcnJvclxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdFNlYXJjaCgpO1xuICB9XG5cbiAgX2FkZEZhY2V0c1RvQm9keShib2R5KSB7XG4gICAgZm9yKCB2YXIga2V5IGluIGNvbmZpZy5mYWNldHMgKSB7XG4gICAgICBpZiggY29uZmlnLmZhY2V0c1trZXldLnR5cGUgPT09ICdyYW5nZScgKSB7XG4gICAgICAgIGJvZHkuYWdnc1trZXkrJy1taW4nXSA9IHtcbiAgICAgICAgICBtaW4gOiB7IFxuICAgICAgICAgICAgZmllbGQgOiBrZXlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5hZ2dzW2tleSsnLW1heCddID0ge1xuICAgICAgICAgIG1heCA6IHsgXG4gICAgICAgICAgICBmaWVsZCA6IGtleVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldERlZmF1bHRTZWFyY2goKSB7XG4gICAgdmFyIGN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKS5kZWZhdWx0U2VhcmNoO1xuICB9XG5cbiAgZ2V0U2VhcmNoKCkge1xuICAgIHJldHVybiB0aGlzLmpzdG9yZS5nZXRTZWFyY2goKTtcbiAgfVxuXG4gIGdldERlZmF1bHRTZWFyY2goKSB7XG4gICAgcmV0dXJuIHRoaXMuanN0b3JlLmdldERlZmF1bHRTZWFyY2goKTtcbiAgfVxuXG4gIGdldFN1Z2dlc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuanN0b3JlLmdldFN1Z2dlc3QoKTtcbiAgfVxuXG4gIHNldFNvcnQoa2V5LCBvcmRlciwgZXhlYykge1xuICAgIHRoaXMuc29ydCA9IHtrZXksIG9yZGVyfTtcbiAgICBpZiggZXhlYyApIHRoaXMuc2VhcmNoKHRoaXMuZ2V0U2VhcmNoKCkucmVxdWVzdCk7XG4gIH1cblxuICBzZXRQYWdpbmcoZnJvbSA9IDAsIHNpemUgPSAxMCwgZXhlYykge1xuICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcblxuICAgIGlmKCBleGVjICkgdGhpcy5zZWFyY2godGhpcy5nZXRTZWFyY2goKS5yZXF1ZXN0KTtcbiAgfVxuXG4gIGNsZWFyRmlsdGVycygpIHtcbiAgICB2YXIgYm9keSA9IHRoaXMuZ2V0U2VhcmNoKCkucmVxdWVzdDtcbiAgICBpZiggYm9keS5xdWVyeSApIGRlbGV0ZSBib2R5LnF1ZXJ5O1xuXG4gICAgdGhpcy5zZXRQYWdpbmcoKTsgLy8gcmVzZXQgcGFnZVxuICAgIHRoaXMuc2VhcmNoKGJvZHkpO1xuICAgIHJldHVybiBib2R5O1xuICB9XG5cbiAgYXBwZW5kRmlsdGVyKGtleSwgdmFsdWUsIGV4ZWMpIHtcbiAgICB0aGlzLmVuc3VyZVBhdGgoJ3F1ZXJ5LmJvb2wuZmlsdGVyJywgW10pO1xuICAgIHZhciBib2R5ID0gdGhpcy5nZXRTZWFyY2goKS5yZXF1ZXN0O1xuXG4gICAgdmFyIGFyciA9IGJvZHkucXVlcnkuYm9vbC5maWx0ZXI7XG4gICAgdmFyIHVwZGF0ZWQgPSBmYWxzZTtcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGFycltpXS50ZXJtc1trZXldICkge1xuICAgICAgICBhcnJbaV0udGVybXNba2V5XS5wdXNoKHZhbHVlKTtcbiAgICAgICAgdXBkYXRlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCAhdXBkYXRlZCApIHtcbiAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgdGVybXMgOiB7XG4gICAgICAgICAgW2tleV0gOiBbdmFsdWVdXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmKCBleGVjICkge1xuICAgICAgdGhpcy5zZXRQYWdpbmcoKTsgLy8gcmVzZXQgcGFnZVxuICAgICAgdGhpcy5zZWFyY2goYm9keSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cblxuICByZW1vdmVGaWx0ZXIoa2V5LCB2YWx1ZSwgZXhlYykge1xuICAgIHRoaXMuZW5zdXJlUGF0aCgncXVlcnkuYm9vbC5maWx0ZXInLCBbXSk7XG4gICAgdmFyIGJvZHkgPSB0aGlzLmdldFNlYXJjaCgpLnJlcXVlc3Q7XG5cbiAgICB2YXIgYXJyID0gYm9keS5xdWVyeS5ib29sLmZpbHRlcjtcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGFycltpXS50ZXJtc1trZXldICkge1xuICAgICAgICBpZiggYXJyW2ldLnRlcm1zW2tleV0uaW5kZXhPZih2YWx1ZSkgPiAtMSApIHtcbiAgICAgICAgICBhcnJbaV0udGVybXNba2V5XS5zcGxpY2UoYXJyW2ldLnRlcm1zW2tleV0uaW5kZXhPZih2YWx1ZSksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jbGVhbkVtcHR5TGVhdmVzKCk7XG4gICAgaWYoIGV4ZWMgKSB7XG4gICAgICB0aGlzLnNldFBhZ2luZygpOyAvLyByZXNldCBwYWdlXG4gICAgICB0aGlzLnNlYXJjaChib2R5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9keTtcbiAgfVxuXG4gIHJlbW92ZVJhbmdlRmlsdGVyKGtleSwgZXhlYykge1xuICAgIHRoaXMuZW5zdXJlUGF0aCgncXVlcnkuYm9vbC5tdXN0JywgW10pO1xuICAgIHZhciBib2R5ID0gdGhpcy5nZXRTZWFyY2goKS5yZXF1ZXN0O1xuXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBib2R5LnF1ZXJ5LmJvb2wubXVzdC5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBib2R5LnF1ZXJ5LmJvb2wubXVzdFtpXS5yYW5nZSApIHtcblxuICAgICAgICBpZiggYm9keS5xdWVyeS5ib29sLm11c3RbaV0ucmFuZ2Vba2V5XSApIHtcbiAgICAgICAgICBkZWxldGUgYm9keS5xdWVyeS5ib29sLm11c3RbaV0ucmFuZ2Vba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY2xlYW5FbXB0eUxlYXZlcygpO1xuICAgIGlmKCBleGVjICkge1xuICAgICAgdGhpcy5zZXRQYWdpbmcoKTsgLy8gcmVzZXQgcGFnZVxuICAgICAgdGhpcy5zZWFyY2goYm9keSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cblxuICBhZGRSYW5nZUZpbHRlcihrZXksIHJhbmdlLCBleGVjKSB7XG4gICAgdGhpcy5lbnN1cmVQYXRoKCdxdWVyeS5ib29sLm11c3QnLCBbXSk7XG4gICAgdmFyIGJvZHkgPSB0aGlzLmdldFNlYXJjaCgpLnJlcXVlc3Q7XG4gICAgdmFyIHJhbmdlUXVlcnkgPSB0aGlzLmdldE9yQ3JlYXRlRnJvbUFycmF5KGJvZHkucXVlcnkuYm9vbC5tdXN0LCAncmFuZ2UnLCBrZXkpO1xuXG4gICAgcmFuZ2VRdWVyeVtrZXldID0ge307XG4gICAgaWYoIHJhbmdlLm1pbiAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmFuZ2VRdWVyeVtrZXldLmd0ZSA9IHJhbmdlLm1pbjtcbiAgICB9XG4gICAgaWYoIHJhbmdlLm1heCApIHtcbiAgICAgIHJhbmdlUXVlcnlba2V5XS5sdGUgPSByYW5nZS5tYXg7XG4gICAgfVxuXG4gICAgaWYoIGV4ZWMgKSB7XG4gICAgICB0aGlzLnNldFBhZ2luZygpOyAvLyByZXNldCBwYWdlXG4gICAgICB0aGlzLnNlYXJjaChib2R5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9keTtcbiAgfVxuXG4gIHN1Z2dlc3QodGV4dCwgZXhlYykge1xuICAgIHRoaXMuZW5zdXJlUGF0aCgnc3VnZ2VzdCcpO1xuICAgIHZhciBib2R5ID0gdGhpcy5nZXRTdWdnZXN0KCkucmVxdWVzdDtcbiAgICBib2R5ID0ge3N1Z2dlc3Q6IHt9fTtcblxuICAgIGJvZHkuc3VnZ2VzdFsnbmFtZS1zdWdnZXN0J10gPSB7XG4gICAgICBwcmVmaXggOiB0ZXh0LFxuICAgICAgY29tcGxldGlvbiA6IHtcbiAgICAgICAgZmllbGQgOiAnbmFtZS1zdWdnZXN0JyxcbiAgICAgICAgZnV6enkgOiB7fVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuanN0b3JlLnNldFN1Z2dlc3RMb2FkaW5nKGJvZHkpO1xuICAgIFNlcnZpY2VXcmFwcGVyLmNhbGwoe1xuICAgICAgc3RvcmUgOiB0aGlzLmpzdG9yZSxcbiAgICAgIHJlcXVlc3QgOiBzZXJ2aWNlLnNlYXJjaChib2R5KSxcbiAgICAgIG9uU3VjY2VzcyA6IHRoaXMuanN0b3JlLnNldFN1Z2dlc3RMb2FkZWQsXG4gICAgICBvbkVycm9yIDogdGhpcy5qc3RvcmUuc2V0U3VnZ2VzdEVycm9yXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRTdWdnZXN0KCk7XG4gIH1cblxuICByZW1vdmVTdWdnZXN0KGtleSwgZXhlYykge1xuICAgIHZhciBib2R5ID0gdGhpcy5nZXRTZWFyY2goKS5yZXF1ZXN0O1xuXG4gICAgaWYoIGJvZHkuc3VnZ2VzdCAmJiBib2R5LnN1Z2dlc3Rba2V5XSApIHtcbiAgICAgIGRlbGV0ZSBib2R5LnN1Z2dlc3Rba2V5XTtcbiAgICB9XG5cbiAgICB0aGlzLmNsZWFuRW1wdHlMZWF2ZXMoKTtcbiAgICBpZiggZXhlYyApIHRoaXMuc2VhcmNoKGJvZHkpO1xuXG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cblxuICB0ZXh0U2VhcmNoKHRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIHZhciBib2R5ID0gdGhpcy5nZXRTZWFyY2goKS5yZXF1ZXN0O1xuXG4gICAgdGhpcy5lbnN1cmVQYXRoKCdxdWVyeS5ib29sLm11c3QnLCBbXSk7XG5cbiAgICBpZiggIXRleHQgKSB7XG4gICAgICB0aGlzLnJlbW92ZUZyb21BcnJheShib2R5LnF1ZXJ5LmJvb2wubXVzdCwgJ21hdGNoJyk7XG4gICAgICB0aGlzLmNsZWFuRW1wdHlMZWF2ZXMoKTtcbiAgICAgIGlmKCBvcHRpb25zLmV4ZWMgKSB0aGlzLnNlYXJjaChib2R5KTtcbiAgICAgIHJldHVybiBib2R5O1xuICAgIH1cblxuICAgIHZhciBtYXRjaCA9IHRoaXMuZ2V0T3JDcmVhdGVGcm9tQXJyYXkoYm9keS5xdWVyeS5ib29sLm11c3QsICdtYXRjaCcpO1xuICAgIG1hdGNoLm5hbWUgPSB0ZXh0O1xuICAgIGlmKCBvcHRpb25zLmV4ZWMgKSB7XG4gICAgICB0aGlzLnNldFBhZ2luZygpOyAvLyByZXNldCBwYWdlXG4gICAgICB0aGlzLnNlYXJjaChib2R5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9keTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbiBxdWVyeVxuICAgKiBSZW1vdmUgYW55IGxlYWYgbm9kZXMgaW4gb2JqZWN0IHRoYXQgZG8gbm90IGNvbnRhaW4gaW5mb3JtYXRpb25cbiAgICovXG4gIGNsZWFuRW1wdHlMZWF2ZXMoKSB7XG4gICAgdmFyIGJvZHkgPSB0aGlzLmdldFNlYXJjaCgpLnJlcXVlc3Q7XG4gICAgZm9yKCB2YXIga2V5IGluIGJvZHkgKSB7XG4gICAgICBpZiggdHlwZW9mIGJvZHlba2V5XSA9PT0gJ29iamVjdCcgKSB7XG4gICAgICAgIHRoaXMuX2NsZWFuRW1wdHlMZWF2ZXMoYm9keSwga2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfY2xlYW5FbXB0eUxlYXZlcyhwYXJlbnQsIHBhcmVudEtleSkge1xuICAgIHZhciBvYmplY3QgPSBwYXJlbnRbcGFyZW50S2V5XTtcblxuICAgIGZvciggdmFyIGtleSBpbiBvYmplY3QgKSB7XG4gICAgICBpZiggQXJyYXkuaXNBcnJheShvYmplY3Rba2V5XSkgKSB7XG4gICAgICAgIGZvciggdmFyIGkgPSBvYmplY3Rba2V5XS5sZW5ndGgtMTsgaSA+PSAwOyBpLS0gKSB7XG4gICAgICAgICAgdGhpcy5fY2xlYW5FbXB0eUxlYXZlcyhvYmplY3Rba2V5XSwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIG9iamVjdFtrZXldLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgICBkZWxldGUgb2JqZWN0W2tleV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiggdHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0JyApIHtcbiAgICAgICAgdGhpcy5fY2xlYW5FbXB0eUxlYXZlcyhvYmplY3QsIGtleSk7XG4gICAgICB9IGVsc2UgaWYoIG9iamVjdFtrZXldID09PSBudWxsIHx8IG9iamVjdFtrZXldID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiggT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPT09IDAgKSB7XG4gICAgICBpZiggQXJyYXkuaXNBcnJheShwYXJlbnQpICkge1xuICAgICAgICBwYXJlbnQuc3BsaWNlKHBhcmVudC5pbmRleE9mKG9iamVjdCksIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHBhcmVudFtwYXJlbnRLZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmUgZ2l2ZW4gcGF0aCBzdHJpbmcgZXhpc3RzIGluIHF1ZXJ5IGJvZHlcbiAgICovXG4gIGVuc3VyZVBhdGgocGF0aCwgbGFzdCA9IHt9KSB7XG4gICAgdmFyIG9iamVjdCA9IHRoaXMuZ2V0U2VhcmNoKCkucmVxdWVzdDtcbiAgICBwYXRoLnNwbGl0KCcuJylcbiAgICAgICAgLmZvckVhY2goKHBhcnQsIGluZGV4LCBhcnIpID0+IHtcbiAgICAgICAgICBpZiggIW9iamVjdFtwYXJ0XSApIHtcbiAgICAgICAgICAgIGlmKCBhcnIubGVuZ3RoLTEgPT09IGluZGV4ICkgb2JqZWN0W3BhcnRdID0gbGFzdDtcbiAgICAgICAgICAgIGVsc2Ugb2JqZWN0W3BhcnRdID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIG9iamVjdCA9IG9iamVjdFtwYXJ0XTtcbiAgICAgICAgfSk7XG4gICAgXG5cbiAgfVxuXG4gIGdldE9yQ3JlYXRlRnJvbUFycmF5KGFycmF5LCB0eXBlLCBzdWJ0eXBlKSB7XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCBhcnJheVtpXVt0eXBlXSApIHtcbiAgICAgICAgaWYoIHN1YnR5cGUgKSB7XG4gICAgICAgICAgaWYoIGFycmF5W2ldW3R5cGVdW3N1YnR5cGVdICkge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5W2ldW3R5cGVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYXJyYXlbaV1bdHlwZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgb2JqID0ge1xuICAgICAgW3R5cGVdIDoge31cbiAgICB9XG4gICAgYXJyYXkucHVzaChvYmopO1xuICAgIHJldHVybiBvYmpbdHlwZV07XG4gIH1cblxuICByZW1vdmVGcm9tQXJyYXkoYXJyYXksIHR5cGUpIHtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGFycmF5W2ldW3R5cGVdICkge1xuICAgICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTZWFyY2hNb2RlbCgpOyIsInZhciByZXF1ZXN0ID0gcmVxdWlyZSgnc3VwZXJhZ2VudCcpO1xuXG5mdW5jdGlvbiBzZWFyY2goYm9keSkge1xuICByZXR1cm4gcmVxdWVzdC5wb3N0KCcvc2VhcmNoJykuc2VuZChib2R5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlYXJjaFxufSIsIlxuY2xhc3MgU2VydmljZVdyYXBwZXIge1xuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5sb2FkaW5nXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnJlcXVlc3RcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5vbkVycm9yXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMub25TdWNjZXNzXG4gICAqL1xuICBzdGF0aWMgY2FsbChvcHRpb25zKSB7XG4gICAgb3B0aW9uc1xuICAgICAgLnJlcXVlc3RcbiAgICAgIC50aGVuKHJlc3AgPT4ge1xuICAgICAgIGlmKCByZXNwLnN0YXR1cyAhPT0gMjAwIHx8IChyZXNwLmJvZHkgJiYgcmVzcC5ib2R5LmVycm9yKSApIHtcbiAgICAgICAgb3B0aW9ucy5vbkVycm9yLmNhbGwob3B0aW9ucy5zdG9yZSwgcmVzcC5wYXlsb2FkKTtcbiAgICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLm9uU3VjY2Vzcy5jYWxsKG9wdGlvbnMuc3RvcmUsIHJlc3AuYm9keSk7XG4gICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlID0+IG9wdGlvbnMub25FcnJvci5jYWxsKG9wdGlvbnMuc3RvcmUsIGUpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZpY2VXcmFwcGVyOyIsInZhciBFdmVudEJ1cyA9IHJlcXVpcmUoJ2NvcmstYXBwLXV0aWxzJykuRXZlbnRCdXM7XG5cbmNsYXNzIFNlYXJjaFN0b3JlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGEgPSB7XG4gICAgICBkZWZhdWx0U2VhcmNoIDoge1xuICAgICAgICBzdGF0ZSA6ICdpbml0JyxcbiAgICAgICAgcGF5bG9hZCA6IG51bGxcbiAgICAgIH0sXG4gICAgICBzZWFyY2ggOiB7XG4gICAgICAgIHN0YXRlIDogJ2luaXQnLFxuICAgICAgICBwYXlsb2FkIDogbnVsbCxcbiAgICAgICAgcmVxdWVzdCA6IHt9XG4gICAgICB9LFxuICAgICAgc3VnZ2VzdCA6IHtcbiAgICAgICAgc3RhdGUgOiAnaW5pdCcsXG4gICAgICAgIHBheWxvYWQgOiBudWxsXG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogRGVmYXVsdCBTZWFyY2hcbiAgICovXG4gIHNldERlZmF1bHRTZWFyY2goc3RhdGUpIHtcbiAgICB0aGlzLmRhdGEuZGVmYXVsdFNlYXJjaCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGF0YS5kZWZhdWx0U2VhcmNoLCBzdGF0ZSk7XG4gICAgRXZlbnRCdXMuZW1pdCgnZGVmYXVsdC1zZWFyY2gtdXBkYXRlJywgdGhpcy5kYXRhLmRlZmF1bHRTZWFyY2gpO1xuICB9XG5cbiAgc2V0RGVmYXVsdFNlYXJjaExvYWRpbmcoZGF0YSkge1xuICAgIHRoaXMuX3NldERlZmF1bHRTZWFyY2hTdGF0ZSh7c3RhdGU6ICdsb2FkaW5nJywgcmVxdWVzdDogZGF0YX0pO1xuICB9XG5cbiAgc2V0RGVmYXVsdFNlYXJjaExvYWRlZChwYXlsb2FkKSB7XG4gICAgdGhpcy5fc2V0RGVmYXVsdFNlYXJjaFN0YXRlKHtcbiAgICAgIHN0YXRlOiAnbG9hZGVkJywgICBcbiAgICAgIHJlcXVlc3Q6IHRoaXMuZGF0YS5kZWZhdWx0U2VhcmNoLnJlcXVlc3QsXG4gICAgICBwYXlsb2FkOiBwYXlsb2FkXG4gICAgfSk7XG4gIH1cblxuICBzZXREZWZhdWx0U2VhcmNoRXJyb3IoZSkge1xuICAgIHRoaXMuX3NldFNlYXJjaFN0YXRlKHtcbiAgICAgIHN0YXRlOiAnZXJyb3InLCAgIFxuICAgICAgcmVxdWVzdDogdGhpcy5kYXRhLmRlZmF1bHRTZWFyY2gucmVxdWVzdCxcbiAgICAgIGVycm9yOiBlXG4gICAgfSk7XG4gIH1cblxuICBnZXREZWZhdWx0U2VhcmNoKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEuZGVmYXVsdFNlYXJjaDtcbiAgfVxuXG4gIF9zZXREZWZhdWx0U2VhcmNoU3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLmRhdGEuZGVmYXVsdFNlYXJjaCA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICBFdmVudEJ1cy5lbWl0KCdkZWZhdWx0LXNlYXJjaC11cGRhdGUnLCB0aGlzLmRhdGEuZGVmYXVsdFNlYXJjaCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBTZWFyY2hcbiAgICovXG4gIHNldFNlYXJjaExvYWRpbmcoZGF0YSkge1xuICAgIHRoaXMuX3NldFNlYXJjaFN0YXRlKHtzdGF0ZTogJ2xvYWRpbmcnLCByZXF1ZXN0OiBkYXRhfSk7XG4gIH1cblxuICBzZXRTZWFyY2hMb2FkZWQocGF5bG9hZCkge1xuICAgIHRoaXMuX3NldFNlYXJjaFN0YXRlKHtcbiAgICAgIHN0YXRlOiAnbG9hZGVkJywgICBcbiAgICAgIHJlcXVlc3Q6IHRoaXMuZGF0YS5zZWFyY2gucmVxdWVzdCxcbiAgICAgIHBheWxvYWQ6IHBheWxvYWRcbiAgICB9KTtcbiAgfVxuXG4gIHNldFNlYXJjaEVycm9yKGUpIHtcbiAgICB0aGlzLl9zZXRTZWFyY2hTdGF0ZSh7XG4gICAgICBzdGF0ZTogJ2Vycm9yJywgICBcbiAgICAgIHJlcXVlc3Q6IHRoaXMuZGF0YS5zZWFyY2gucmVxdWVzdCxcbiAgICAgIGVycm9yOiBlXG4gICAgfSk7XG4gIH1cblxuICBfc2V0U2VhcmNoU3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLmRhdGEuc2VhcmNoID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICAgIEV2ZW50QnVzLmVtaXQoJ3NlYXJjaC11cGRhdGUnLCB0aGlzLmRhdGEuc2VhcmNoKTtcbiAgfVxuXG4gIGdldFNlYXJjaCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLnNlYXJjaDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFN1Z2dlc3RcbiAgICovXG4gIHNldFN1Z2dlc3RMb2FkaW5nKGRhdGEpIHtcbiAgICB0aGlzLl9zZXRTdWdnZXN0U3RhdGUoe3N0YXRlOiAnbG9hZGluZycsIHJlcXVlc3Q6IGRhdGF9KTtcbiAgfVxuXG4gIHNldFN1Z2dlc3RMb2FkZWQocGF5bG9hZCkge1xuICAgIHRoaXMuX3NldFN1Z2dlc3RTdGF0ZSh7XG4gICAgICBzdGF0ZTogJ2xvYWRlZCcsICAgXG4gICAgICByZXF1ZXN0OiB0aGlzLmRhdGEuc3VnZ2VzdC5yZXF1ZXN0LFxuICAgICAgcGF5bG9hZDogcGF5bG9hZFxuICAgIH0pO1xuICB9XG5cbiAgc2V0U3VnZ2VzdEVycm9yKGUpIHtcbiAgICB0aGlzLl9zZXRTdWdnZXN0U3RhdGUoe1xuICAgICAgc3RhdGU6ICdlcnJvcicsICAgXG4gICAgICByZXF1ZXN0OiB0aGlzLmRhdGEuc3VnZ2VzdC5yZXF1ZXN0LFxuICAgICAgZXJyb3I6IGVcbiAgICB9KTtcbiAgfVxuXG4gIF9zZXRTdWdnZXN0U3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLmRhdGEuc3VnZ2VzdCA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICBFdmVudEJ1cy5lbWl0KCdzdWdnZXN0LXVwZGF0ZScsIHRoaXMuZGF0YS5zdWdnZXN0KTtcbiAgfVxuXG4gIGdldFN1Z2dlc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5zdWdnZXN0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNlYXJjaFN0b3JlKCk7IiwiXHJcbi8qKlxyXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxyXG4gKi9cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XHJcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XHJcbn07XHJcblxyXG4vKipcclxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1peGluKG9iaikge1xyXG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xyXG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xyXG4gIH1cclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub24gPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgKHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKVxyXG4gICAgLnB1c2goZm4pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxyXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICBmdW5jdGlvbiBvbigpIHtcclxuICAgIHRoaXMub2ZmKGV2ZW50LCBvbik7XHJcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gIH1cclxuXHJcbiAgb24uZm4gPSBmbjtcclxuICB0aGlzLm9uKGV2ZW50LCBvbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcclxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cclxuICAvLyBhbGxcclxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gc3BlY2lmaWMgZXZlbnRcclxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XHJcblxyXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcclxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcclxuICB2YXIgY2I7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcclxuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtNaXhlZH0gLi4uXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuXHJcbiAgaWYgKGNhbGxiYWNrcykge1xyXG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEJhc2VNb2RlbCA6IHJlcXVpcmUoJy4vbGliL0Jhc2VNb2RlbCcpLFxuICBFdmVudEJ1cyA6IHJlcXVpcmUoJy4vbGliL0V2ZW50QnVzJyksXG4gIEJhc2VTdG9yZSA6IHJlcXVpcmUoJy4vbGliL0Jhc2VTdG9yZScpXG59IiwidmFyIGV2ZW50QnVzID0gcmVxdWlyZSgnLi9FdmVudEJ1cycpO1xuXG5jbGFzcyBCYXNlTW9kZWwge1xuXG4gIHNldCBzdG9yZShzdG9yZSkge1xuICAgIHRoaXMuX3N0b3JlID0gc3RvcmU7XG4gIH1cblxuICBnZXQgc3RvcmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmU7XG4gIH1cblxuICBnZXQgZXZlbnRCdXMoKSB7XG4gICAgcmV0dXJuIGV2ZW50QnVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhdmUgdG8gcGFzcyBuYW1lIGZvciBJRSBzdXBwb3J0LlxuICAgKi9cbiAgYmluZE1ldGhvZHMobmFtZSkge1xuICAgIGlmKCAhbmFtZSApIHtcbiAgICAgIGNvbnNvbGUud2FybignTmFtZSBub3QgcGFzc2VkIHRvIGJpbmRNZXRob2RzKCkuICBUaGlzIHdpbGwgZmFpbCBpbiBJRSwgY2F1c2UsIHlvdSBrbm93LCBJRS4nKVxuICAgIH1cblxuICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLl9fcHJvdG9fXy5jb25zdHJ1Y3Rvci5uYW1lIHx8IG5hbWU7XG4gICAgdmFyIG1ldGhvZHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLl9fcHJvdG9fXyk7XG4gICAgbWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICAgIGlmKCBtZXRob2QgPT09ICdjb25zdHJ1Y3RvcicgKSByZXR1cm47XG5cbiAgICAgIHRoaXMuX2JpbmRNZXRob2QobWV0aG9kLCBjbGFzc05hbWUrJy4nK21ldGhvZClcbiAgICB9KTtcbiAgfVxuXG4gIF9iaW5kTWV0aG9kKG1ldGhvZCwgZXZlbnQpIHtcbiAgICB0aGlzLmV2ZW50QnVzLm9uKGV2ZW50LCBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIHJlc29sdmUgPSBhcmd1bWVudHNbMF07XG4gICAgICB2YXIgcmVqZWN0ID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgZm9yKCB2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzcCA9IHRoaXNbbWV0aG9kXS5hcHBseSh0aGlzLCBhcmdzKTtcblxuICAgICAgICAvLyBtZXRob2QgcmV0dXJuZWQgYSBwcm9taXNlLCBqdXN0IHdhaXQgZm9yIGl0IHRvIHJlc29sdmVcbiAgICAgICAgaWYoIHJlc3AgJiYgdHlwZW9mIHJlc3AgPT09ICdvYmplY3QnICYmIHR5cGVvZiByZXNwLnRoZW4gPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgICAgcmVzcFxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gcmVzb2x2ZS5hcHBseShudWxsLCBhcmd1bWVudHMpKVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG5cbiAgICAgICAgLy8gbWV0aG9kIHJldHVybmVkIHNvbWV0aGluZyBvdGhlciB0aGFuIGEgcHJvbWlzZSwgcmVzb2x2ZSBub3dcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3ApO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgIC8vIGJhZG5lc3MgaGFwcGVuZWRcbiAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgZW1pdChldmVudCwgcGF5bG9hZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmV2ZW50QnVzLmVtaXQoZXZlbnQsIHBheWxvYWQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VNb2RlbDsiLCJ2YXIgRXZlbnRCdXMgPSByZXF1aXJlKCcuL0V2ZW50QnVzJyk7XG5cbmNsYXNzIEJhc2VTdG9yZSB7XG5cbiAgZ2V0IGV2ZW50QnVzKCkge1xuICAgIHJldHVybiBldmVudEJ1cztcbiAgfVxuXG4gIGVtaXQoZXZlbnQsIHBheWxvYWQpIHtcbiAgICB0aGlzLmV2ZW50QnVzLmVtaXQoZXZlbnQsIHBheWxvYWQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVN0b3JlOyIsInZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG52YXIgZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuZXZlbnRzLnNldE1heExpc3RlbmVycygxMDAwMCk7XG5tb2R1bGUuZXhwb3J0cyA9IGV2ZW50czsiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gcmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIGFycmF5IHdpdGggZGlyZWN0b3J5IG5hbWVzIHRoZXJlXG4vLyBtdXN0IGJlIG5vIHNsYXNoZXMsIGVtcHR5IGVsZW1lbnRzLCBvciBkZXZpY2UgbmFtZXMgKGM6XFwpIGluIHRoZSBhcnJheVxuLy8gKHNvIGFsc28gbm8gbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcyAtIGl0IGRvZXMgbm90IGRpc3Rpbmd1aXNoXG4vLyByZWxhdGl2ZSBhbmQgYWJzb2x1dGUgcGF0aHMpXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cywgYWxsb3dBYm92ZVJvb3QpIHtcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGxhc3QgPSBwYXJ0c1tpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzO1xufVxuXG4vLyBTcGxpdCBhIGZpbGVuYW1lIGludG8gW3Jvb3QsIGRpciwgYmFzZW5hbWUsIGV4dF0sIHVuaXggdmVyc2lvblxuLy8gJ3Jvb3QnIGlzIGp1c3QgYSBzbGFzaCwgb3Igbm90aGluZy5cbnZhciBzcGxpdFBhdGhSZSA9XG4gICAgL14oXFwvP3wpKFtcXHNcXFNdKj8pKCg/OlxcLnsxLDJ9fFteXFwvXSs/fCkoXFwuW14uXFwvXSp8KSkoPzpbXFwvXSopJC87XG52YXIgc3BsaXRQYXRoID0gZnVuY3Rpb24oZmlsZW5hbWUpIHtcbiAgcmV0dXJuIHNwbGl0UGF0aFJlLmV4ZWMoZmlsZW5hbWUpLnNsaWNlKDEpO1xufTtcblxuLy8gcGF0aC5yZXNvbHZlKFtmcm9tIC4uLl0sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZXNvbHZlID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNvbHZlZFBhdGggPSAnJyxcbiAgICAgIHJlc29sdmVkQWJzb2x1dGUgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xuICAgIHZhciBwYXRoID0gKGkgPj0gMCkgPyBhcmd1bWVudHNbaV0gOiBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgLy8gU2tpcCBlbXB0eSBhbmQgaW52YWxpZCBlbnRyaWVzXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9IGVsc2UgaWYgKCFwYXRoKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xuICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xuICB9XG5cbiAgLy8gQXQgdGhpcyBwb2ludCB0aGUgcGF0aCBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gYSBmdWxsIGFic29sdXRlIHBhdGgsIGJ1dFxuICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcmVzb2x2ZWRQYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHJlc29sdmVkUGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFyZXNvbHZlZEFic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgcmV0dXJuICgocmVzb2x2ZWRBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHJlc29sdmVkUGF0aCkgfHwgJy4nO1xufTtcblxuLy8gcGF0aC5ub3JtYWxpemUocGF0aClcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMubm9ybWFsaXplID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKSxcbiAgICAgIHRyYWlsaW5nU2xhc2ggPSBzdWJzdHIocGF0aCwgLTEpID09PSAnLyc7XG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFpc0Fic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgaWYgKCFwYXRoICYmICFpc0Fic29sdXRlKSB7XG4gICAgcGF0aCA9ICcuJztcbiAgfVxuICBpZiAocGF0aCAmJiB0cmFpbGluZ1NsYXNoKSB7XG4gICAgcGF0aCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gKGlzQWJzb2x1dGUgPyAnLycgOiAnJykgKyBwYXRoO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuam9pbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcGF0aHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICByZXR1cm4gZXhwb3J0cy5ub3JtYWxpemUoZmlsdGVyKHBhdGhzLCBmdW5jdGlvbihwLCBpbmRleCkge1xuICAgIGlmICh0eXBlb2YgcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLmpvaW4gbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9KS5qb2luKCcvJykpO1xufTtcblxuXG4vLyBwYXRoLnJlbGF0aXZlKGZyb20sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZWxhdGl2ZSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gIGZyb20gPSBleHBvcnRzLnJlc29sdmUoZnJvbSkuc3Vic3RyKDEpO1xuICB0byA9IGV4cG9ydHMucmVzb2x2ZSh0bykuc3Vic3RyKDEpO1xuXG4gIGZ1bmN0aW9uIHRyaW0oYXJyKSB7XG4gICAgdmFyIHN0YXJ0ID0gMDtcbiAgICBmb3IgKDsgc3RhcnQgPCBhcnIubGVuZ3RoOyBzdGFydCsrKSB7XG4gICAgICBpZiAoYXJyW3N0YXJ0XSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbmQgPSBhcnIubGVuZ3RoIC0gMTtcbiAgICBmb3IgKDsgZW5kID49IDA7IGVuZC0tKSB7XG4gICAgICBpZiAoYXJyW2VuZF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBbXTtcbiAgICByZXR1cm4gYXJyLnNsaWNlKHN0YXJ0LCBlbmQgLSBzdGFydCArIDEpO1xuICB9XG5cbiAgdmFyIGZyb21QYXJ0cyA9IHRyaW0oZnJvbS5zcGxpdCgnLycpKTtcbiAgdmFyIHRvUGFydHMgPSB0cmltKHRvLnNwbGl0KCcvJykpO1xuXG4gIHZhciBsZW5ndGggPSBNYXRoLm1pbihmcm9tUGFydHMubGVuZ3RoLCB0b1BhcnRzLmxlbmd0aCk7XG4gIHZhciBzYW1lUGFydHNMZW5ndGggPSBsZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZnJvbVBhcnRzW2ldICE9PSB0b1BhcnRzW2ldKSB7XG4gICAgICBzYW1lUGFydHNMZW5ndGggPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdmFyIG91dHB1dFBhcnRzID0gW107XG4gIGZvciAodmFyIGkgPSBzYW1lUGFydHNMZW5ndGg7IGkgPCBmcm9tUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBvdXRwdXRQYXJ0cy5wdXNoKCcuLicpO1xuICB9XG5cbiAgb3V0cHV0UGFydHMgPSBvdXRwdXRQYXJ0cy5jb25jYXQodG9QYXJ0cy5zbGljZShzYW1lUGFydHNMZW5ndGgpKTtcblxuICByZXR1cm4gb3V0cHV0UGFydHMuam9pbignLycpO1xufTtcblxuZXhwb3J0cy5zZXAgPSAnLyc7XG5leHBvcnRzLmRlbGltaXRlciA9ICc6JztcblxuZXhwb3J0cy5kaXJuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgcmVzdWx0ID0gc3BsaXRQYXRoKHBhdGgpLFxuICAgICAgcm9vdCA9IHJlc3VsdFswXSxcbiAgICAgIGRpciA9IHJlc3VsdFsxXTtcblxuICBpZiAoIXJvb3QgJiYgIWRpcikge1xuICAgIC8vIE5vIGRpcm5hbWUgd2hhdHNvZXZlclxuICAgIHJldHVybiAnLic7XG4gIH1cblxuICBpZiAoZGlyKSB7XG4gICAgLy8gSXQgaGFzIGEgZGlybmFtZSwgc3RyaXAgdHJhaWxpbmcgc2xhc2hcbiAgICBkaXIgPSBkaXIuc3Vic3RyKDAsIGRpci5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIHJldHVybiByb290ICsgZGlyO1xufTtcblxuXG5leHBvcnRzLmJhc2VuYW1lID0gZnVuY3Rpb24ocGF0aCwgZXh0KSB7XG4gIHZhciBmID0gc3BsaXRQYXRoKHBhdGgpWzJdO1xuICAvLyBUT0RPOiBtYWtlIHRoaXMgY29tcGFyaXNvbiBjYXNlLWluc2Vuc2l0aXZlIG9uIHdpbmRvd3M/XG4gIGlmIChleHQgJiYgZi5zdWJzdHIoLTEgKiBleHQubGVuZ3RoKSA9PT0gZXh0KSB7XG4gICAgZiA9IGYuc3Vic3RyKDAsIGYubGVuZ3RoIC0gZXh0Lmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIGY7XG59O1xuXG5cbmV4cG9ydHMuZXh0bmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHNwbGl0UGF0aChwYXRoKVszXTtcbn07XG5cbmZ1bmN0aW9uIGZpbHRlciAoeHMsIGYpIHtcbiAgICBpZiAoeHMuZmlsdGVyKSByZXR1cm4geHMuZmlsdGVyKGYpO1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmKHhzW2ldLCBpLCB4cykpIHJlcy5wdXNoKHhzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuLy8gU3RyaW5nLnByb3RvdHlwZS5zdWJzdHIgLSBuZWdhdGl2ZSBpbmRleCBkb24ndCB3b3JrIGluIElFOFxudmFyIHN1YnN0ciA9ICdhYicuc3Vic3RyKC0xKSA9PT0gJ2InXG4gICAgPyBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7IHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pIH1cbiAgICA6IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHtcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSBzdHIubGVuZ3RoICsgc3RhcnQ7XG4gICAgICAgIHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pO1xuICAgIH1cbjtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIFJvb3QgcmVmZXJlbmNlIGZvciBpZnJhbWVzLlxuICovXG5cbnZhciByb290O1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7IC8vIEJyb3dzZXIgd2luZG93XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgeyAvLyBXZWIgV29ya2VyXG4gIHJvb3QgPSBzZWxmO1xufSBlbHNlIHsgLy8gT3RoZXIgZW52aXJvbm1lbnRzXG4gIGNvbnNvbGUud2FybihcIlVzaW5nIGJyb3dzZXItb25seSB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQgaW4gbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG4gIHJvb3QgPSB0aGlzO1xufVxuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgUmVxdWVzdEJhc2UgPSByZXF1aXJlKCcuL3JlcXVlc3QtYmFzZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pcy1vYmplY3QnKTtcbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pcy1mdW5jdGlvbicpO1xudmFyIFJlc3BvbnNlQmFzZSA9IHJlcXVpcmUoJy4vcmVzcG9uc2UtYmFzZScpO1xudmFyIHNob3VsZFJldHJ5ID0gcmVxdWlyZSgnLi9zaG91bGQtcmV0cnknKTtcblxuLyoqXG4gKiBOb29wLlxuICovXG5cbmZ1bmN0aW9uIG5vb3AoKXt9O1xuXG4vKipcbiAqIEV4cG9zZSBgcmVxdWVzdGAuXG4gKi9cblxudmFyIHJlcXVlc3QgPSBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtZXRob2QsIHVybCkge1xuICAvLyBjYWxsYmFja1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgdXJsKSB7XG4gICAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QoJ0dFVCcsIG1ldGhvZCkuZW5kKHVybCk7XG4gIH1cblxuICAvLyB1cmwgZmlyc3RcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QobWV0aG9kLCB1cmwpO1xufVxuXG5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0O1xuXG4vKipcbiAqIERldGVybWluZSBYSFIuXG4gKi9cblxucmVxdWVzdC5nZXRYSFIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChyb290LlhNTEh0dHBSZXF1ZXN0XG4gICAgICAmJiAoIXJvb3QubG9jYXRpb24gfHwgJ2ZpbGU6JyAhPSByb290LmxvY2F0aW9uLnByb3RvY29sXG4gICAgICAgICAgfHwgIXJvb3QuQWN0aXZlWE9iamVjdCkpIHtcbiAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0O1xuICB9IGVsc2Uge1xuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuNi4wJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjMuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUCcpOyB9IGNhdGNoKGUpIHt9XG4gIH1cbiAgdGhyb3cgRXJyb3IoXCJCcm93c2VyLW9ubHkgdmVyaXNvbiBvZiBzdXBlcmFnZW50IGNvdWxkIG5vdCBmaW5kIFhIUlwiKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBhZGRlZCB0byBzdXBwb3J0IElFLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgdHJpbSA9ICcnLnRyaW1cbiAgPyBmdW5jdGlvbihzKSB7IHJldHVybiBzLnRyaW0oKTsgfVxuICA6IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMucmVwbGFjZSgvKF5cXHMqfFxccyokKS9nLCAnJyk7IH07XG5cbi8qKlxuICogU2VyaWFsaXplIHRoZSBnaXZlbiBgb2JqYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZXJpYWxpemUob2JqKSB7XG4gIGlmICghaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgdmFyIHBhaXJzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCBvYmpba2V5XSk7XG4gIH1cbiAgcmV0dXJuIHBhaXJzLmpvaW4oJyYnKTtcbn1cblxuLyoqXG4gKiBIZWxwcyAnc2VyaWFsaXplJyB3aXRoIHNlcmlhbGl6aW5nIGFycmF5cy5cbiAqIE11dGF0ZXMgdGhlIHBhaXJzIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXJzXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqL1xuXG5mdW5jdGlvbiBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2YWwpIHtcbiAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgdmFsLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsKSkge1xuICAgICAgZm9yKHZhciBzdWJrZXkgaW4gdmFsKSB7XG4gICAgICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXkgKyAnWycgKyBzdWJrZXkgKyAnXScsIHZhbFtzdWJrZXldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KVxuICAgICAgICArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodmFsID09PSBudWxsKSB7XG4gICAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBFeHBvc2Ugc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gKi9cblxuIHJlcXVlc3Quc2VyaWFsaXplT2JqZWN0ID0gc2VyaWFsaXplO1xuXG4gLyoqXG4gICogUGFyc2UgdGhlIGdpdmVuIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBgc3RyYC5cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICogQGFwaSBwcml2YXRlXG4gICovXG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKHN0cikge1xuICB2YXIgb2JqID0ge307XG4gIHZhciBwYWlycyA9IHN0ci5zcGxpdCgnJicpO1xuICB2YXIgcGFpcjtcbiAgdmFyIHBvcztcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGFpcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBwYWlyID0gcGFpcnNbaV07XG4gICAgcG9zID0gcGFpci5pbmRleE9mKCc9Jyk7XG4gICAgaWYgKHBvcyA9PSAtMSkge1xuICAgICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYWlyKV0gPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYWlyLnNsaWNlKDAsIHBvcykpXSA9XG4gICAgICAgIGRlY29kZVVSSUNvbXBvbmVudChwYWlyLnNsaWNlKHBvcyArIDEpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEV4cG9zZSBwYXJzZXIuXG4gKi9cblxucmVxdWVzdC5wYXJzZVN0cmluZyA9IHBhcnNlU3RyaW5nO1xuXG4vKipcbiAqIERlZmF1bHQgTUlNRSB0eXBlIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKi9cblxucmVxdWVzdC50eXBlcyA9IHtcbiAgaHRtbDogJ3RleHQvaHRtbCcsXG4gIGpzb246ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgeG1sOiAnYXBwbGljYXRpb24veG1sJyxcbiAgdXJsZW5jb2RlZDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtLWRhdGEnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IHNlcmlhbGl6YXRpb24gbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihvYmope1xuICogICAgICAgcmV0dXJuICdnZW5lcmF0ZWQgeG1sIGhlcmUnO1xuICogICAgIH07XG4gKlxuICovXG5cbiByZXF1ZXN0LnNlcmlhbGl6ZSA9IHtcbiAgICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBzZXJpYWxpemUsXG4gICAnYXBwbGljYXRpb24vanNvbic6IEpTT04uc3RyaW5naWZ5XG4gfTtcblxuIC8qKlxuICAqIERlZmF1bHQgcGFyc2Vycy5cbiAgKlxuICAqICAgICBzdXBlcmFnZW50LnBhcnNlWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKHN0cil7XG4gICogICAgICAgcmV0dXJuIHsgb2JqZWN0IHBhcnNlZCBmcm9tIHN0ciB9O1xuICAqICAgICB9O1xuICAqXG4gICovXG5cbnJlcXVlc3QucGFyc2UgPSB7XG4gICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBwYXJzZVN0cmluZyxcbiAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnBhcnNlXG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBoZWFkZXIgYHN0cmAgaW50b1xuICogYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1hcHBlZCBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VIZWFkZXIoc3RyKSB7XG4gIHZhciBsaW5lcyA9IHN0ci5zcGxpdCgvXFxyP1xcbi8pO1xuICB2YXIgZmllbGRzID0ge307XG4gIHZhciBpbmRleDtcbiAgdmFyIGxpbmU7XG4gIHZhciBmaWVsZDtcbiAgdmFyIHZhbDtcblxuICBsaW5lcy5wb3AoKTsgLy8gdHJhaWxpbmcgQ1JMRlxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICBpbmRleCA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGZpZWxkID0gbGluZS5zbGljZSgwLCBpbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB0cmltKGxpbmUuc2xpY2UoaW5kZXggKyAxKSk7XG4gICAgZmllbGRzW2ZpZWxkXSA9IHZhbDtcbiAgfVxuXG4gIHJldHVybiBmaWVsZHM7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYG1pbWVgIGlzIGpzb24gb3IgaGFzICtqc29uIHN0cnVjdHVyZWQgc3ludGF4IHN1ZmZpeC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWltZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzSlNPTihtaW1lKSB7XG4gIHJldHVybiAvW1xcLytdanNvblxcYi8udGVzdChtaW1lKTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZWAgd2l0aCB0aGUgZ2l2ZW4gYHhocmAuXG4gKlxuICogIC0gc2V0IGZsYWdzICgub2ssIC5lcnJvciwgZXRjKVxuICogIC0gcGFyc2UgaGVhZGVyXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogIEFsaWFzaW5nIGBzdXBlcmFnZW50YCBhcyBgcmVxdWVzdGAgaXMgbmljZTpcbiAqXG4gKiAgICAgIHJlcXVlc3QgPSBzdXBlcmFnZW50O1xuICpcbiAqICBXZSBjYW4gdXNlIHRoZSBwcm9taXNlLWxpa2UgQVBJLCBvciBwYXNzIGNhbGxiYWNrczpcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJykuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJywgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgU2VuZGluZyBkYXRhIGNhbiBiZSBjaGFpbmVkOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5zZW5kKClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnBvc3QoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIE9yIGZ1cnRoZXIgcmVkdWNlZCB0byBhIHNpbmdsZSBjYWxsIGZvciBzaW1wbGUgY2FzZXM6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogQHBhcmFtIHtYTUxIVFRQUmVxdWVzdH0geGhyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2UocmVxKSB7XG4gIHRoaXMucmVxID0gcmVxO1xuICB0aGlzLnhociA9IHRoaXMucmVxLnhocjtcbiAgLy8gcmVzcG9uc2VUZXh0IGlzIGFjY2Vzc2libGUgb25seSBpZiByZXNwb25zZVR5cGUgaXMgJycgb3IgJ3RleHQnIGFuZCBvbiBvbGRlciBicm93c2Vyc1xuICB0aGlzLnRleHQgPSAoKHRoaXMucmVxLm1ldGhvZCAhPSdIRUFEJyAmJiAodGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAnJyB8fCB0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JykpIHx8IHR5cGVvZiB0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICd1bmRlZmluZWQnKVxuICAgICA/IHRoaXMueGhyLnJlc3BvbnNlVGV4dFxuICAgICA6IG51bGw7XG4gIHRoaXMuc3RhdHVzVGV4dCA9IHRoaXMucmVxLnhoci5zdGF0dXNUZXh0O1xuICB2YXIgc3RhdHVzID0gdGhpcy54aHIuc3RhdHVzO1xuICAvLyBoYW5kbGUgSUU5IGJ1ZzogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDA0Njk3Mi9tc2llLXJldHVybnMtc3RhdHVzLWNvZGUtb2YtMTIyMy1mb3ItYWpheC1yZXF1ZXN0XG4gIGlmIChzdGF0dXMgPT09IDEyMjMpIHtcbiAgICAgIHN0YXR1cyA9IDIwNDtcbiAgfVxuICB0aGlzLl9zZXRTdGF0dXNQcm9wZXJ0aWVzKHN0YXR1cyk7XG4gIHRoaXMuaGVhZGVyID0gdGhpcy5oZWFkZXJzID0gcGFyc2VIZWFkZXIodGhpcy54aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAvLyBnZXRBbGxSZXNwb25zZUhlYWRlcnMgc29tZXRpbWVzIGZhbHNlbHkgcmV0dXJucyBcIlwiIGZvciBDT1JTIHJlcXVlc3RzLCBidXRcbiAgLy8gZ2V0UmVzcG9uc2VIZWFkZXIgc3RpbGwgd29ya3MuIHNvIHdlIGdldCBjb250ZW50LXR5cGUgZXZlbiBpZiBnZXR0aW5nXG4gIC8vIG90aGVyIGhlYWRlcnMgZmFpbHMuXG4gIHRoaXMuaGVhZGVyWydjb250ZW50LXR5cGUnXSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKTtcbiAgdGhpcy5fc2V0SGVhZGVyUHJvcGVydGllcyh0aGlzLmhlYWRlcik7XG5cbiAgaWYgKG51bGwgPT09IHRoaXMudGV4dCAmJiByZXEuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHRoaXMuYm9keSA9IHRoaXMueGhyLnJlc3BvbnNlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYm9keSA9IHRoaXMucmVxLm1ldGhvZCAhPSAnSEVBRCdcbiAgICAgID8gdGhpcy5fcGFyc2VCb2R5KHRoaXMudGV4dCA/IHRoaXMudGV4dCA6IHRoaXMueGhyLnJlc3BvbnNlKVxuICAgICAgOiBudWxsO1xuICB9XG59XG5cblJlc3BvbnNlQmFzZShSZXNwb25zZS5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBib2R5IGBzdHJgLlxuICpcbiAqIFVzZWQgZm9yIGF1dG8tcGFyc2luZyBvZiBib2RpZXMuIFBhcnNlcnNcbiAqIGFyZSBkZWZpbmVkIG9uIHRoZSBgc3VwZXJhZ2VudC5wYXJzZWAgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLl9wYXJzZUJvZHkgPSBmdW5jdGlvbihzdHIpe1xuICB2YXIgcGFyc2UgPSByZXF1ZXN0LnBhcnNlW3RoaXMudHlwZV07XG4gIGlmKHRoaXMucmVxLl9wYXJzZXIpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEuX3BhcnNlcih0aGlzLCBzdHIpO1xuICB9XG4gIGlmICghcGFyc2UgJiYgaXNKU09OKHRoaXMudHlwZSkpIHtcbiAgICBwYXJzZSA9IHJlcXVlc3QucGFyc2VbJ2FwcGxpY2F0aW9uL2pzb24nXTtcbiAgfVxuICByZXR1cm4gcGFyc2UgJiYgc3RyICYmIChzdHIubGVuZ3RoIHx8IHN0ciBpbnN0YW5jZW9mIE9iamVjdClcbiAgICA/IHBhcnNlKHN0cilcbiAgICA6IG51bGw7XG59O1xuXG4vKipcbiAqIFJldHVybiBhbiBgRXJyb3JgIHJlcHJlc2VudGF0aXZlIG9mIHRoaXMgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybiB7RXJyb3J9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS50b0Vycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIHJlcSA9IHRoaXMucmVxO1xuICB2YXIgbWV0aG9kID0gcmVxLm1ldGhvZDtcbiAgdmFyIHVybCA9IHJlcS51cmw7XG5cbiAgdmFyIG1zZyA9ICdjYW5ub3QgJyArIG1ldGhvZCArICcgJyArIHVybCArICcgKCcgKyB0aGlzLnN0YXR1cyArICcpJztcbiAgdmFyIGVyciA9IG5ldyBFcnJvcihtc2cpO1xuICBlcnIuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gIGVyci5tZXRob2QgPSBtZXRob2Q7XG4gIGVyci51cmwgPSB1cmw7XG5cbiAgcmV0dXJuIGVycjtcbn07XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZWAuXG4gKi9cblxucmVxdWVzdC5SZXNwb25zZSA9IFJlc3BvbnNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlcXVlc3RgIHdpdGggdGhlIGdpdmVuIGBtZXRob2RgIGFuZCBgdXJsYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3QobWV0aG9kLCB1cmwpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLl9xdWVyeSA9IHRoaXMuX3F1ZXJ5IHx8IFtdO1xuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgdGhpcy51cmwgPSB1cmw7XG4gIHRoaXMuaGVhZGVyID0ge307IC8vIHByZXNlcnZlcyBoZWFkZXIgbmFtZSBjYXNlXG4gIHRoaXMuX2hlYWRlciA9IHt9OyAvLyBjb2VyY2VzIGhlYWRlciBuYW1lcyB0byBsb3dlcmNhc2VcbiAgdGhpcy5vbignZW5kJywgZnVuY3Rpb24oKXtcbiAgICB2YXIgZXJyID0gbnVsbDtcbiAgICB2YXIgcmVzID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICByZXMgPSBuZXcgUmVzcG9uc2Uoc2VsZik7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoJ1BhcnNlciBpcyB1bmFibGUgdG8gcGFyc2UgdGhlIHJlc3BvbnNlJyk7XG4gICAgICBlcnIucGFyc2UgPSB0cnVlO1xuICAgICAgZXJyLm9yaWdpbmFsID0gZTtcbiAgICAgIC8vIGlzc3VlICM2NzU6IHJldHVybiB0aGUgcmF3IHJlc3BvbnNlIGlmIHRoZSByZXNwb25zZSBwYXJzaW5nIGZhaWxzXG4gICAgICBpZiAoc2VsZi54aHIpIHtcbiAgICAgICAgLy8gaWU5IGRvZXNuJ3QgaGF2ZSAncmVzcG9uc2UnIHByb3BlcnR5XG4gICAgICAgIGVyci5yYXdSZXNwb25zZSA9IHR5cGVvZiBzZWxmLnhoci5yZXNwb25zZVR5cGUgPT0gJ3VuZGVmaW5lZCcgPyBzZWxmLnhoci5yZXNwb25zZVRleHQgOiBzZWxmLnhoci5yZXNwb25zZTtcbiAgICAgICAgLy8gaXNzdWUgIzg3NjogcmV0dXJuIHRoZSBodHRwIHN0YXR1cyBjb2RlIGlmIHRoZSByZXNwb25zZSBwYXJzaW5nIGZhaWxzXG4gICAgICAgIGVyci5zdGF0dXMgPSBzZWxmLnhoci5zdGF0dXMgPyBzZWxmLnhoci5zdGF0dXMgOiBudWxsO1xuICAgICAgICBlcnIuc3RhdHVzQ29kZSA9IGVyci5zdGF0dXM7IC8vIGJhY2t3YXJkcy1jb21wYXQgb25seVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyLnJhd1Jlc3BvbnNlID0gbnVsbDtcbiAgICAgICAgZXJyLnN0YXR1cyA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmLmNhbGxiYWNrKGVycik7XG4gICAgfVxuXG4gICAgc2VsZi5lbWl0KCdyZXNwb25zZScsIHJlcyk7XG5cbiAgICB2YXIgbmV3X2VycjtcbiAgICB0cnkge1xuICAgICAgaWYgKCFzZWxmLl9pc1Jlc3BvbnNlT0socmVzKSkge1xuICAgICAgICBuZXdfZXJyID0gbmV3IEVycm9yKHJlcy5zdGF0dXNUZXh0IHx8ICdVbnN1Y2Nlc3NmdWwgSFRUUCByZXNwb25zZScpO1xuICAgICAgICBuZXdfZXJyLm9yaWdpbmFsID0gZXJyO1xuICAgICAgICBuZXdfZXJyLnJlc3BvbnNlID0gcmVzO1xuICAgICAgICBuZXdfZXJyLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG4gICAgICB9XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBuZXdfZXJyID0gZTsgLy8gIzk4NSB0b3VjaGluZyByZXMgbWF5IGNhdXNlIElOVkFMSURfU1RBVEVfRVJSIG9uIG9sZCBBbmRyb2lkXG4gICAgfVxuXG4gICAgLy8gIzEwMDAgZG9uJ3QgY2F0Y2ggZXJyb3JzIGZyb20gdGhlIGNhbGxiYWNrIHRvIGF2b2lkIGRvdWJsZSBjYWxsaW5nIGl0XG4gICAgaWYgKG5ld19lcnIpIHtcbiAgICAgIHNlbGYuY2FsbGJhY2sobmV3X2VyciwgcmVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi5jYWxsYmFjayhudWxsLCByZXMpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogTWl4aW4gYEVtaXR0ZXJgIGFuZCBgUmVxdWVzdEJhc2VgLlxuICovXG5cbkVtaXR0ZXIoUmVxdWVzdC5wcm90b3R5cGUpO1xuUmVxdWVzdEJhc2UoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFNldCBDb250ZW50LVR5cGUgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCd4bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ2FwcGxpY2F0aW9uL3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudHlwZSA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQ29udGVudC1UeXBlJywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBY2NlcHQgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMuanNvbiA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjY2VwdFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQWNjZXB0JywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBdXRob3JpemF0aW9uIGZpZWxkIHZhbHVlIHdpdGggYHVzZXJgIGFuZCBgcGFzc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbcGFzc10gb3B0aW9uYWwgaW4gY2FzZSBvZiB1c2luZyAnYmVhcmVyJyBhcyB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB3aXRoICd0eXBlJyBwcm9wZXJ0eSAnYXV0bycsICdiYXNpYycgb3IgJ2JlYXJlcicgKGRlZmF1bHQgJ2Jhc2ljJylcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdXRoID0gZnVuY3Rpb24odXNlciwgcGFzcywgb3B0aW9ucyl7XG4gIGlmICh0eXBlb2YgcGFzcyA9PT0gJ29iamVjdCcgJiYgcGFzcyAhPT0gbnVsbCkgeyAvLyBwYXNzIGlzIG9wdGlvbmFsIGFuZCBjYW4gc3Vic3RpdHV0ZSBmb3Igb3B0aW9uc1xuICAgIG9wdGlvbnMgPSBwYXNzO1xuICB9XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICB0eXBlOiAnZnVuY3Rpb24nID09PSB0eXBlb2YgYnRvYSA/ICdiYXNpYycgOiAnYXV0bycsXG4gICAgfVxuICB9XG5cbiAgc3dpdGNoIChvcHRpb25zLnR5cGUpIHtcbiAgICBjYXNlICdiYXNpYyc6XG4gICAgICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgYnRvYSh1c2VyICsgJzonICsgcGFzcykpO1xuICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYXV0byc6XG4gICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcjtcbiAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzO1xuICAgIGJyZWFrO1xuICAgICAgXG4gICAgY2FzZSAnYmVhcmVyJzogLy8gdXNhZ2Ugd291bGQgYmUgLmF1dGgoYWNjZXNzVG9rZW4sIHsgdHlwZTogJ2JlYXJlcicgfSlcbiAgICAgIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdXNlcik7XG4gICAgYnJlYWs7ICBcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkIHF1ZXJ5LXN0cmluZyBgdmFsYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgIHJlcXVlc3QuZ2V0KCcvc2hvZXMnKVxuICogICAgIC5xdWVyeSgnc2l6ZT0xMCcpXG4gKiAgICAgLnF1ZXJ5KHsgY29sb3I6ICdibHVlJyB9KVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbih2YWwpe1xuICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkgdmFsID0gc2VyaWFsaXplKHZhbCk7XG4gIGlmICh2YWwpIHRoaXMuX3F1ZXJ5LnB1c2godmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFF1ZXVlIHRoZSBnaXZlbiBgZmlsZWAgYXMgYW4gYXR0YWNobWVudCB0byB0aGUgc3BlY2lmaWVkIGBmaWVsZGAsXG4gKiB3aXRoIG9wdGlvbmFsIGBvcHRpb25zYCAob3IgZmlsZW5hbWUpLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmF0dGFjaCgnY29udGVudCcsIG5ldyBCbG9iKFsnPGEgaWQ9XCJhXCI+PGIgaWQ9XCJiXCI+aGV5ITwvYj48L2E+J10sIHsgdHlwZTogXCJ0ZXh0L2h0bWxcIn0pKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtCbG9ifEZpbGV9IGZpbGVcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uKGZpZWxkLCBmaWxlLCBvcHRpb25zKXtcbiAgaWYgKGZpbGUpIHtcbiAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJzdXBlcmFnZW50IGNhbid0IG1peCAuc2VuZCgpIGFuZCAuYXR0YWNoKClcIik7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQoZmllbGQsIGZpbGUsIG9wdGlvbnMgfHwgZmlsZS5uYW1lKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9nZXRGb3JtRGF0YSA9IGZ1bmN0aW9uKCl7XG4gIGlmICghdGhpcy5fZm9ybURhdGEpIHtcbiAgICB0aGlzLl9mb3JtRGF0YSA9IG5ldyByb290LkZvcm1EYXRhKCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Zvcm1EYXRhO1xufTtcblxuLyoqXG4gKiBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggYGVycmAgYW5kIGByZXNgXG4gKiBhbmQgaGFuZGxlIGFyaXR5IGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jYWxsYmFjayA9IGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgLy8gY29uc29sZS5sb2codGhpcy5fcmV0cmllcywgdGhpcy5fbWF4UmV0cmllcylcbiAgaWYgKHRoaXMuX21heFJldHJpZXMgJiYgdGhpcy5fcmV0cmllcysrIDwgdGhpcy5fbWF4UmV0cmllcyAmJiBzaG91bGRSZXRyeShlcnIsIHJlcykpIHtcbiAgICByZXR1cm4gdGhpcy5fcmV0cnkoKTtcbiAgfVxuXG4gIHZhciBmbiA9IHRoaXMuX2NhbGxiYWNrO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gIGlmIChlcnIpIHtcbiAgICBpZiAodGhpcy5fbWF4UmV0cmllcykgZXJyLnJldHJpZXMgPSB0aGlzLl9yZXRyaWVzIC0gMTtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxuXG4gIGZuKGVyciwgcmVzKTtcbn07XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggeC1kb21haW4gZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY3Jvc3NEb21haW5FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1JlcXVlc3QgaGFzIGJlZW4gdGVybWluYXRlZFxcblBvc3NpYmxlIGNhdXNlczogdGhlIG5ldHdvcmsgaXMgb2ZmbGluZSwgT3JpZ2luIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiwgdGhlIHBhZ2UgaXMgYmVpbmcgdW5sb2FkZWQsIGV0Yy4nKTtcbiAgZXJyLmNyb3NzRG9tYWluID0gdHJ1ZTtcblxuICBlcnIuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gIGVyci5tZXRob2QgPSB0aGlzLm1ldGhvZDtcbiAgZXJyLnVybCA9IHRoaXMudXJsO1xuXG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cbi8vIFRoaXMgb25seSB3YXJucywgYmVjYXVzZSB0aGUgcmVxdWVzdCBpcyBzdGlsbCBsaWtlbHkgdG8gd29ya1xuUmVxdWVzdC5wcm90b3R5cGUuYnVmZmVyID0gUmVxdWVzdC5wcm90b3R5cGUuY2EgPSBSZXF1ZXN0LnByb3RvdHlwZS5hZ2VudCA9IGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUud2FybihcIlRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiBicm93c2VyIHZlcnNpb24gb2Ygc3VwZXJhZ2VudFwiKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBUaGlzIHRocm93cywgYmVjYXVzZSBpdCBjYW4ndCBzZW5kL3JlY2VpdmUgZGF0YSBhcyBleHBlY3RlZFxuUmVxdWVzdC5wcm90b3R5cGUucGlwZSA9IFJlcXVlc3QucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24oKXtcbiAgdGhyb3cgRXJyb3IoXCJTdHJlYW1pbmcgaXMgbm90IHN1cHBvcnRlZCBpbiBicm93c2VyIHZlcnNpb24gb2Ygc3VwZXJhZ2VudFwiKTtcbn07XG5cbi8qKlxuICogQ29tcG9zZSBxdWVyeXN0cmluZyB0byBhcHBlbmQgdG8gcmVxLnVybFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLl9hcHBlbmRRdWVyeVN0cmluZyA9IGZ1bmN0aW9uKCl7XG4gIHZhciBxdWVyeSA9IHRoaXMuX3F1ZXJ5LmpvaW4oJyYnKTtcbiAgaWYgKHF1ZXJ5KSB7XG4gICAgdGhpcy51cmwgKz0gKHRoaXMudXJsLmluZGV4T2YoJz8nKSA+PSAwID8gJyYnIDogJz8nKSArIHF1ZXJ5O1xuICB9XG5cbiAgaWYgKHRoaXMuX3NvcnQpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnVybC5pbmRleE9mKCc/Jyk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHZhciBxdWVyeUFyciA9IHRoaXMudXJsLnN1YnN0cmluZyhpbmRleCArIDEpLnNwbGl0KCcmJyk7XG4gICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLl9zb3J0KSkge1xuICAgICAgICBxdWVyeUFyci5zb3J0KHRoaXMuX3NvcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnlBcnIuc29ydCgpO1xuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSB0aGlzLnVybC5zdWJzdHJpbmcoMCwgaW5kZXgpICsgJz8nICsgcXVlcnlBcnIuam9pbignJicpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIGhvc3Qgb2JqZWN0LFxuICogd2UgZG9uJ3Qgd2FudCB0byBzZXJpYWxpemUgdGhlc2UgOilcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblJlcXVlc3QucHJvdG90eXBlLl9pc0hvc3QgPSBmdW5jdGlvbiBfaXNIb3N0KG9iaikge1xuICAvLyBOYXRpdmUgb2JqZWN0cyBzdHJpbmdpZnkgdG8gW29iamVjdCBGaWxlXSwgW29iamVjdCBCbG9iXSwgW29iamVjdCBGb3JtRGF0YV0sIGV0Yy5cbiAgcmV0dXJuIG9iaiAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIG9iaiAmJiAhQXJyYXkuaXNBcnJheShvYmopICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuLyoqXG4gKiBJbml0aWF0ZSByZXF1ZXN0LCBpbnZva2luZyBjYWxsYmFjayBgZm4ocmVzKWBcbiAqIHdpdGggYW4gaW5zdGFuY2VvZiBgUmVzcG9uc2VgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oZm4pe1xuICBpZiAodGhpcy5fZW5kQ2FsbGVkKSB7XG4gICAgY29uc29sZS53YXJuKFwiV2FybmluZzogLmVuZCgpIHdhcyBjYWxsZWQgdHdpY2UuIFRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiBzdXBlcmFnZW50XCIpO1xuICB9XG4gIHRoaXMuX2VuZENhbGxlZCA9IHRydWU7XG5cbiAgLy8gc3RvcmUgY2FsbGJhY2tcbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wO1xuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIHRoaXMuX2FwcGVuZFF1ZXJ5U3RyaW5nKCk7XG5cbiAgcmV0dXJuIHRoaXMuX2VuZCgpO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX2VuZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB4aHIgPSB0aGlzLnhociA9IHJlcXVlc3QuZ2V0WEhSKCk7XG4gIHZhciBkYXRhID0gdGhpcy5fZm9ybURhdGEgfHwgdGhpcy5fZGF0YTtcblxuICB0aGlzLl9zZXRUaW1lb3V0cygpO1xuXG4gIC8vIHN0YXRlIGNoYW5nZVxuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgcmVhZHlTdGF0ZSA9IHhoci5yZWFkeVN0YXRlO1xuICAgIGlmIChyZWFkeVN0YXRlID49IDIgJiYgc2VsZi5fcmVzcG9uc2VUaW1lb3V0VGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dChzZWxmLl9yZXNwb25zZVRpbWVvdXRUaW1lcik7XG4gICAgfVxuICAgIGlmICg0ICE9IHJlYWR5U3RhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJbiBJRTksIHJlYWRzIHRvIGFueSBwcm9wZXJ0eSAoZS5nLiBzdGF0dXMpIG9mZiBvZiBhbiBhYm9ydGVkIFhIUiB3aWxsXG4gICAgLy8gcmVzdWx0IGluIHRoZSBlcnJvciBcIkNvdWxkIG5vdCBjb21wbGV0ZSB0aGUgb3BlcmF0aW9uIGR1ZSB0byBlcnJvciBjMDBjMDIzZlwiXG4gICAgdmFyIHN0YXR1cztcbiAgICB0cnkgeyBzdGF0dXMgPSB4aHIuc3RhdHVzIH0gY2F0Y2goZSkgeyBzdGF0dXMgPSAwOyB9XG5cbiAgICBpZiAoIXN0YXR1cykge1xuICAgICAgaWYgKHNlbGYudGltZWRvdXQgfHwgc2VsZi5fYWJvcnRlZCkgcmV0dXJuO1xuICAgICAgcmV0dXJuIHNlbGYuY3Jvc3NEb21haW5FcnJvcigpO1xuICAgIH1cbiAgICBzZWxmLmVtaXQoJ2VuZCcpO1xuICB9O1xuXG4gIC8vIHByb2dyZXNzXG4gIHZhciBoYW5kbGVQcm9ncmVzcyA9IGZ1bmN0aW9uKGRpcmVjdGlvbiwgZSkge1xuICAgIGlmIChlLnRvdGFsID4gMCkge1xuICAgICAgZS5wZXJjZW50ID0gZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwO1xuICAgIH1cbiAgICBlLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICBzZWxmLmVtaXQoJ3Byb2dyZXNzJywgZSk7XG4gIH1cbiAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKCdwcm9ncmVzcycpKSB7XG4gICAgdHJ5IHtcbiAgICAgIHhoci5vbnByb2dyZXNzID0gaGFuZGxlUHJvZ3Jlc3MuYmluZChudWxsLCAnZG93bmxvYWQnKTtcbiAgICAgIGlmICh4aHIudXBsb2FkKSB7XG4gICAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGhhbmRsZVByb2dyZXNzLmJpbmQobnVsbCwgJ3VwbG9hZCcpO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgLy8gQWNjZXNzaW5nIHhoci51cGxvYWQgZmFpbHMgaW4gSUUgZnJvbSBhIHdlYiB3b3JrZXIsIHNvIGp1c3QgcHJldGVuZCBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgLy8gUmVwb3J0ZWQgaGVyZTpcbiAgICAgIC8vIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODM3MjQ1L3htbGh0dHByZXF1ZXN0LXVwbG9hZC10aHJvd3MtaW52YWxpZC1hcmd1bWVudC13aGVuLXVzZWQtZnJvbS13ZWItd29ya2VyLWNvbnRleHRcbiAgICB9XG4gIH1cblxuICAvLyBpbml0aWF0ZSByZXF1ZXN0XG4gIHRyeSB7XG4gICAgaWYgKHRoaXMudXNlcm5hbWUgJiYgdGhpcy5wYXNzd29yZCkge1xuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJsLCB0cnVlLCB0aGlzLnVzZXJuYW1lLCB0aGlzLnBhc3N3b3JkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJsLCB0cnVlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIHNlZSAjMTE0OVxuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrKGVycik7XG4gIH1cblxuICAvLyBDT1JTXG4gIGlmICh0aGlzLl93aXRoQ3JlZGVudGlhbHMpIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXG4gIC8vIGJvZHlcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSAmJiAnR0VUJyAhPSB0aGlzLm1ldGhvZCAmJiAnSEVBRCcgIT0gdGhpcy5tZXRob2QgJiYgJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgJiYgIXRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgIC8vIHNlcmlhbGl6ZSBzdHVmZlxuICAgIHZhciBjb250ZW50VHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG4gICAgdmFyIHNlcmlhbGl6ZSA9IHRoaXMuX3NlcmlhbGl6ZXIgfHwgcmVxdWVzdC5zZXJpYWxpemVbY29udGVudFR5cGUgPyBjb250ZW50VHlwZS5zcGxpdCgnOycpWzBdIDogJyddO1xuICAgIGlmICghc2VyaWFsaXplICYmIGlzSlNPTihjb250ZW50VHlwZSkpIHtcbiAgICAgIHNlcmlhbGl6ZSA9IHJlcXVlc3Quc2VyaWFsaXplWydhcHBsaWNhdGlvbi9qc29uJ107XG4gICAgfVxuICAgIGlmIChzZXJpYWxpemUpIGRhdGEgPSBzZXJpYWxpemUoZGF0YSk7XG4gIH1cblxuICAvLyBzZXQgaGVhZGVyIGZpZWxkc1xuICBmb3IgKHZhciBmaWVsZCBpbiB0aGlzLmhlYWRlcikge1xuICAgIGlmIChudWxsID09IHRoaXMuaGVhZGVyW2ZpZWxkXSkgY29udGludWU7XG5cbiAgICBpZiAodGhpcy5oZWFkZXIuaGFzT3duUHJvcGVydHkoZmllbGQpKVxuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoZmllbGQsIHRoaXMuaGVhZGVyW2ZpZWxkXSk7XG4gIH1cblxuICBpZiAodGhpcy5fcmVzcG9uc2VUeXBlKSB7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9IHRoaXMuX3Jlc3BvbnNlVHlwZTtcbiAgfVxuXG4gIC8vIHNlbmQgc3R1ZmZcbiAgdGhpcy5lbWl0KCdyZXF1ZXN0JywgdGhpcyk7XG5cbiAgLy8gSUUxMSB4aHIuc2VuZCh1bmRlZmluZWQpIHNlbmRzICd1bmRlZmluZWQnIHN0cmluZyBhcyBQT1NUIHBheWxvYWQgKGluc3RlYWQgb2Ygbm90aGluZylcbiAgLy8gV2UgbmVlZCBudWxsIGhlcmUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgeGhyLnNlbmQodHlwZW9mIGRhdGEgIT09ICd1bmRlZmluZWQnID8gZGF0YSA6IG51bGwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogR0VUIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5nZXQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0dFVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnF1ZXJ5KGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBIRUFEIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5oZWFkID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdIRUFEJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogT1BUSU9OUyBxdWVyeSB0byBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3Qub3B0aW9ucyA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnT1BUSU9OUycsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIERFTEVURSBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGVsKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnREVMRVRFJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbnJlcXVlc3RbJ2RlbCddID0gZGVsO1xucmVxdWVzdFsnZGVsZXRlJ10gPSBkZWw7XG5cbi8qKlxuICogUEFUQ0ggYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucGF0Y2ggPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BBVENIJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUE9TVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wb3N0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQT1NUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUFVUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnB1dCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUFVUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG4iLCIvKipcbiAqIENoZWNrIGlmIGBmbmAgaXMgYSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzLW9iamVjdCcpO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZuKSB7XG4gIHZhciB0YWcgPSBpc09iamVjdChmbikgPyBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZm4pIDogJyc7XG4gIHJldHVybiB0YWcgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsIi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIG51bGwgIT09IG9iaiAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogTW9kdWxlIG9mIG1peGVkLWluIGZ1bmN0aW9ucyBzaGFyZWQgYmV0d2VlbiBub2RlIGFuZCBjbGllbnQgY29kZVxuICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzLW9iamVjdCcpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVxdWVzdEJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdEJhc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdEJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdEJhc2Uob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIFJlcXVlc3RCYXNlLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gUmVxdWVzdEJhc2UucHJvdG90eXBlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBDbGVhciBwcmV2aW91cyB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuY2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24gX2NsZWFyVGltZW91dCgpe1xuICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICBjbGVhclRpbWVvdXQodGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIpO1xuICBkZWxldGUgdGhpcy5fdGltZXI7XG4gIGRlbGV0ZSB0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQgcmVzcG9uc2UgYm9keSBwYXJzZXJcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIGNvbnZlcnQgaW5jb21pbmcgZGF0YSBpbnRvIHJlcXVlc3QuYm9keVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKGZuKXtcbiAgdGhpcy5fcGFyc2VyID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgZm9ybWF0IG9mIGJpbmFyeSByZXNwb25zZSBib2R5LlxuICogSW4gYnJvd3NlciB2YWxpZCBmb3JtYXRzIGFyZSAnYmxvYicgYW5kICdhcnJheWJ1ZmZlcicsXG4gKiB3aGljaCByZXR1cm4gQmxvYiBhbmQgQXJyYXlCdWZmZXIsIHJlc3BlY3RpdmVseS5cbiAqXG4gKiBJbiBOb2RlIGFsbCB2YWx1ZXMgcmVzdWx0IGluIEJ1ZmZlci5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5yZXNwb25zZVR5cGUoJ2Jsb2InKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVzcG9uc2VUeXBlID0gZnVuY3Rpb24odmFsKXtcbiAgdGhpcy5fcmVzcG9uc2VUeXBlID0gdmFsO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3ZlcnJpZGUgZGVmYXVsdCByZXF1ZXN0IGJvZHkgc2VyaWFsaXplclxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgdG8gY29udmVydCBkYXRhIHNldCB2aWEgLnNlbmQgb3IgLmF0dGFjaCBpbnRvIHBheWxvYWQgdG8gc2VuZFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbiBzZXJpYWxpemUoZm4pe1xuICB0aGlzLl9zZXJpYWxpemVyID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGltZW91dHMuXG4gKlxuICogLSByZXNwb25zZSB0aW1lb3V0IGlzIHRpbWUgYmV0d2VlbiBzZW5kaW5nIHJlcXVlc3QgYW5kIHJlY2VpdmluZyB0aGUgZmlyc3QgYnl0ZSBvZiB0aGUgcmVzcG9uc2UuIEluY2x1ZGVzIEROUyBhbmQgY29ubmVjdGlvbiB0aW1lLlxuICogLSBkZWFkbGluZSBpcyB0aGUgdGltZSBmcm9tIHN0YXJ0IG9mIHRoZSByZXF1ZXN0IHRvIHJlY2VpdmluZyByZXNwb25zZSBib2R5IGluIGZ1bGwuIElmIHRoZSBkZWFkbGluZSBpcyB0b28gc2hvcnQgbGFyZ2UgZmlsZXMgbWF5IG5vdCBsb2FkIGF0IGFsbCBvbiBzbG93IGNvbm5lY3Rpb25zLlxuICpcbiAqIFZhbHVlIG9mIDAgb3IgZmFsc2UgbWVhbnMgbm8gdGltZW91dC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IG1zIG9yIHtyZXNwb25zZSwgcmVhZCwgZGVhZGxpbmV9XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbiB0aW1lb3V0KG9wdGlvbnMpe1xuICBpZiAoIW9wdGlvbnMgfHwgJ29iamVjdCcgIT09IHR5cGVvZiBvcHRpb25zKSB7XG4gICAgdGhpcy5fdGltZW91dCA9IG9wdGlvbnM7XG4gICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0ID0gMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZvcih2YXIgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICBzd2l0Y2gob3B0aW9uKSB7XG4gICAgICBjYXNlICdkZWFkbGluZSc6XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zLmRlYWRsaW5lO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Jlc3BvbnNlJzpcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0ID0gb3B0aW9ucy5yZXNwb25zZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oXCJVbmtub3duIHRpbWVvdXQgb3B0aW9uXCIsIG9wdGlvbik7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgbnVtYmVyIG9mIHJldHJ5IGF0dGVtcHRzIG9uIGVycm9yLlxuICpcbiAqIEZhaWxlZCByZXF1ZXN0cyB3aWxsIGJlIHJldHJpZWQgJ2NvdW50JyB0aW1lcyBpZiB0aW1lb3V0IG9yIGVyci5jb2RlID49IDUwMC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmV0cnkgPSBmdW5jdGlvbiByZXRyeShjb3VudCl7XG4gIC8vIERlZmF1bHQgdG8gMSBpZiBubyBjb3VudCBwYXNzZWQgb3IgdHJ1ZVxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCBjb3VudCA9PT0gdHJ1ZSkgY291bnQgPSAxO1xuICBpZiAoY291bnQgPD0gMCkgY291bnQgPSAwO1xuICB0aGlzLl9tYXhSZXRyaWVzID0gY291bnQ7XG4gIHRoaXMuX3JldHJpZXMgPSAwO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0cnkgcmVxdWVzdFxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9yZXRyeSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gIC8vIG5vZGVcbiAgaWYgKHRoaXMucmVxKSB7XG4gICAgdGhpcy5yZXEgPSBudWxsO1xuICAgIHRoaXMucmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gIH1cblxuICB0aGlzLl9hYm9ydGVkID0gZmFsc2U7XG4gIHRoaXMudGltZWRvdXQgPSBmYWxzZTtcblxuICByZXR1cm4gdGhpcy5fZW5kKCk7XG59O1xuXG4vKipcbiAqIFByb21pc2Ugc3VwcG9ydFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZWplY3RdXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gdGhlbihyZXNvbHZlLCByZWplY3QpIHtcbiAgaWYgKCF0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAodGhpcy5fZW5kQ2FsbGVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJXYXJuaW5nOiBzdXBlcmFnZW50IHJlcXVlc3Qgd2FzIHNlbnQgdHdpY2UsIGJlY2F1c2UgYm90aCAuZW5kKCkgYW5kIC50aGVuKCkgd2VyZSBjYWxsZWQuIE5ldmVyIGNhbGwgLmVuZCgpIGlmIHlvdSB1c2UgcHJvbWlzZXNcIik7XG4gICAgfVxuICAgIHRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24oaW5uZXJSZXNvbHZlLCBpbm5lclJlamVjdCl7XG4gICAgICBzZWxmLmVuZChmdW5jdGlvbihlcnIsIHJlcyl7XG4gICAgICAgIGlmIChlcnIpIGlubmVyUmVqZWN0KGVycik7IGVsc2UgaW5uZXJSZXNvbHZlKHJlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdGhpcy5fZnVsbGZpbGxlZFByb21pc2UudGhlbihyZXNvbHZlLCByZWplY3QpO1xufVxuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbihjYikge1xuICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgY2IpO1xufTtcblxuLyoqXG4gKiBBbGxvdyBmb3IgZXh0ZW5zaW9uXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmbikge1xuICBmbih0aGlzKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5vayA9IGZ1bmN0aW9uKGNiKSB7XG4gIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgY2IpIHRocm93IEVycm9yKFwiQ2FsbGJhY2sgcmVxdWlyZWRcIik7XG4gIHRoaXMuX29rQ2FsbGJhY2sgPSBjYjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2lzUmVzcG9uc2VPSyA9IGZ1bmN0aW9uKHJlcykge1xuICBpZiAoIXJlcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLl9va0NhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX29rQ2FsbGJhY2socmVzKTtcbiAgfVxuXG4gIHJldHVybiByZXMuc3RhdHVzID49IDIwMCAmJiByZXMuc3RhdHVzIDwgMzAwO1xufTtcblxuXG4vKipcbiAqIEdldCByZXF1ZXN0IGhlYWRlciBgZmllbGRgLlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgcmV0dXJuIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgaGVhZGVyIGBmaWVsZGAgdmFsdWUuXG4gKiBUaGlzIGlzIGEgZGVwcmVjYXRlZCBpbnRlcm5hbCBBUEkuIFVzZSBgLmdldChmaWVsZClgIGluc3RlYWQuXG4gKlxuICogKGdldEhlYWRlciBpcyBubyBsb25nZXIgdXNlZCBpbnRlcm5hbGx5IGJ5IHRoZSBzdXBlcmFnZW50IGNvZGUgYmFzZSlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICogQGRlcHJlY2F0ZWRcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZ2V0SGVhZGVyID0gUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldDtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIGBmaWVsZGAgdG8gYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3QuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5zZXQoJ1gtQVBJLUtleScsICdmb29iYXInKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCh7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1BUEktS2V5JzogJ2Zvb2JhcicgfSlcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGZpZWxkLCB2YWwpe1xuICBpZiAoaXNPYmplY3QoZmllbGQpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGZpZWxkKSB7XG4gICAgICB0aGlzLnNldChrZXksIGZpZWxkW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV0gPSB2YWw7XG4gIHRoaXMuaGVhZGVyW2ZpZWxkXSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC51bnNldCgnVXNlci1BZ2VudCcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgZGVsZXRlIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbiAgZGVsZXRlIHRoaXMuaGVhZGVyW2ZpZWxkXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlIHRoZSBmaWVsZCBgbmFtZWAgYW5kIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0XG4gKiBmb3IgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIgcmVxdWVzdCBib2RpZXMuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoJ2ZvbycsICdiYXInKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoeyBmb286ICdiYXInLCBiYXo6ICdxdXgnIH0pXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ3xCbG9ifEZpbGV8QnVmZmVyfGZzLlJlYWRTdHJlYW19IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbihuYW1lLCB2YWwpIHtcblxuICAvLyBuYW1lIHNob3VsZCBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gb2JqZWN0LlxuICBpZiAobnVsbCA9PT0gbmFtZSB8fCAgdW5kZWZpbmVkID09PSBuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCcuZmllbGQobmFtZSwgdmFsKSBuYW1lIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgY29uc29sZS5lcnJvcihcIi5maWVsZCgpIGNhbid0IGJlIHVzZWQgaWYgLnNlbmQoKSBpcyB1c2VkLiBQbGVhc2UgdXNlIG9ubHkgLnNlbmQoKSBvciBvbmx5IC5maWVsZCgpICYgLmF0dGFjaCgpXCIpO1xuICB9XG5cbiAgaWYgKGlzT2JqZWN0KG5hbWUpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgIHRoaXMuZmllbGQoa2V5LCBuYW1lW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICBmb3IgKHZhciBpIGluIHZhbCkge1xuICAgICAgdGhpcy5maWVsZChuYW1lLCB2YWxbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHZhbCBzaG91bGQgYmUgZGVmaW5lZCBub3dcbiAgaWYgKG51bGwgPT09IHZhbCB8fCB1bmRlZmluZWQgPT09IHZhbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgdmFsIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09PSB0eXBlb2YgdmFsKSB7XG4gICAgdmFsID0gJycgKyB2YWw7XG4gIH1cbiAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQobmFtZSwgdmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFib3J0IHRoZSByZXF1ZXN0LCBhbmQgY2xlYXIgcG90ZW50aWFsIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCl7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGhpcy5fYWJvcnRlZCA9IHRydWU7XG4gIHRoaXMueGhyICYmIHRoaXMueGhyLmFib3J0KCk7IC8vIGJyb3dzZXJcbiAgdGhpcy5yZXEgJiYgdGhpcy5yZXEuYWJvcnQoKTsgLy8gbm9kZVxuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB0aGlzLmVtaXQoJ2Fib3J0Jyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdHJhbnNtaXNzaW9uIG9mIGNvb2tpZXMgd2l0aCB4LWRvbWFpbiByZXF1ZXN0cy5cbiAqXG4gKiBOb3RlIHRoYXQgZm9yIHRoaXMgdG8gd29yayB0aGUgb3JpZ2luIG11c3Qgbm90IGJlXG4gKiB1c2luZyBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiIHdpdGggYSB3aWxkY2FyZCxcbiAqIGFuZCBhbHNvIG11c3Qgc2V0IFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIlxuICogdG8gXCJ0cnVlXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUud2l0aENyZWRlbnRpYWxzID0gZnVuY3Rpb24ob24pe1xuICAvLyBUaGlzIGlzIGJyb3dzZXItb25seSBmdW5jdGlvbmFsaXR5LiBOb2RlIHNpZGUgaXMgbm8tb3AuXG4gIGlmKG9uPT11bmRlZmluZWQpIG9uID0gdHJ1ZTtcbiAgdGhpcy5fd2l0aENyZWRlbnRpYWxzID0gb247XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1heCByZWRpcmVjdHMgdG8gYG5gLiBEb2VzIG5vdGluZyBpbiBicm93c2VyIFhIUiBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZWRpcmVjdHMgPSBmdW5jdGlvbihuKXtcbiAgdGhpcy5fbWF4UmVkaXJlY3RzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvbnZlcnQgdG8gYSBwbGFpbiBqYXZhc2NyaXB0IG9iamVjdCAobm90IEpTT04gc3RyaW5nKSBvZiBzY2FsYXIgcHJvcGVydGllcy5cbiAqIE5vdGUgYXMgdGhpcyBtZXRob2QgaXMgZGVzaWduZWQgdG8gcmV0dXJuIGEgdXNlZnVsIG5vbi10aGlzIHZhbHVlLFxuICogaXQgY2Fubm90IGJlIGNoYWluZWQuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBkZXNjcmliaW5nIG1ldGhvZCwgdXJsLCBhbmQgZGF0YSBvZiB0aGlzIHJlcXVlc3RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgbWV0aG9kOiB0aGlzLm1ldGhvZCxcbiAgICB1cmw6IHRoaXMudXJsLFxuICAgIGRhdGE6IHRoaXMuX2RhdGEsXG4gICAgaGVhZGVyczogdGhpcy5faGVhZGVyXG4gIH07XG59O1xuXG5cbi8qKlxuICogU2VuZCBgZGF0YWAgYXMgdGhlIHJlcXVlc3QgYm9keSwgZGVmYXVsdGluZyB0aGUgYC50eXBlKClgIHRvIFwianNvblwiIHdoZW5cbiAqIGFuIG9iamVjdCBpcyBnaXZlbi5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBtYW51YWwganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdqc29uJylcbiAqICAgICAgICAgLnNlbmQoJ3tcIm5hbWVcIjpcInRqXCJ9JylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtYW51YWwgeC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCgnbmFtZT10aicpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGRlZmF1bHRzIHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCgnbmFtZT10b2JpJylcbiAqICAgICAgICAuc2VuZCgnc3BlY2llcz1mZXJyZXQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKXtcbiAgdmFyIGlzT2JqID0gaXNPYmplY3QoZGF0YSk7XG4gIHZhciB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcblxuICBpZiAodGhpcy5fZm9ybURhdGEpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiLnNlbmQoKSBjYW4ndCBiZSB1c2VkIGlmIC5hdHRhY2goKSBvciAuZmllbGQoKSBpcyB1c2VkLiBQbGVhc2UgdXNlIG9ubHkgLnNlbmQoKSBvciBvbmx5IC5maWVsZCgpICYgLmF0dGFjaCgpXCIpO1xuICB9XG5cbiAgaWYgKGlzT2JqICYmICF0aGlzLl9kYXRhKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZGF0YSAmJiB0aGlzLl9kYXRhICYmIHRoaXMuX2lzSG9zdCh0aGlzLl9kYXRhKSkge1xuICAgIHRocm93IEVycm9yKFwiQ2FuJ3QgbWVyZ2UgdGhlc2Ugc2VuZCBjYWxsc1wiKTtcbiAgfVxuXG4gIC8vIG1lcmdlXG4gIGlmIChpc09iaiAmJiBpc09iamVjdCh0aGlzLl9kYXRhKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICB0aGlzLl9kYXRhW2tleV0gPSBkYXRhW2tleV07XG4gICAgfVxuICB9IGVsc2UgaWYgKCdzdHJpbmcnID09IHR5cGVvZiBkYXRhKSB7XG4gICAgLy8gZGVmYXVsdCB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAgICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnZm9ybScpO1xuICAgIHR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICAgIGlmICgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyA9PSB0eXBlKSB7XG4gICAgICB0aGlzLl9kYXRhID0gdGhpcy5fZGF0YVxuICAgICAgICA/IHRoaXMuX2RhdGEgKyAnJicgKyBkYXRhXG4gICAgICAgIDogZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0YSA9ICh0aGlzLl9kYXRhIHx8ICcnKSArIGRhdGE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICB9XG5cbiAgaWYgKCFpc09iaiB8fCB0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGRlZmF1bHQgdG8ganNvblxuICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnanNvbicpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiBTb3J0IGBxdWVyeXN0cmluZ2AgYnkgdGhlIHNvcnQgZnVuY3Rpb25cbiAqXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gZGVmYXVsdCBvcmRlclxuICogICAgICAgcmVxdWVzdC5nZXQoJy91c2VyJylcbiAqICAgICAgICAgLnF1ZXJ5KCduYW1lPU5pY2snKVxuICogICAgICAgICAucXVlcnkoJ3NlYXJjaD1NYW5ueScpXG4gKiAgICAgICAgIC5zb3J0UXVlcnkoKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGN1c3RvbWl6ZWQgc29ydCBmdW5jdGlvblxuICogICAgICAgcmVxdWVzdC5nZXQoJy91c2VyJylcbiAqICAgICAgICAgLnF1ZXJ5KCduYW1lPU5pY2snKVxuICogICAgICAgICAucXVlcnkoJ3NlYXJjaD1NYW5ueScpXG4gKiAgICAgICAgIC5zb3J0UXVlcnkoZnVuY3Rpb24oYSwgYil7XG4gKiAgICAgICAgICAgcmV0dXJuIGEubGVuZ3RoIC0gYi5sZW5ndGg7XG4gKiAgICAgICAgIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc29ydFF1ZXJ5ID0gZnVuY3Rpb24oc29ydCkge1xuICAvLyBfc29ydCBkZWZhdWx0IHRvIHRydWUgYnV0IG90aGVyd2lzZSBjYW4gYmUgYSBmdW5jdGlvbiBvciBib29sZWFuXG4gIHRoaXMuX3NvcnQgPSB0eXBlb2Ygc29ydCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogc29ydDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHRpbWVvdXQgZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl90aW1lb3V0RXJyb3IgPSBmdW5jdGlvbihyZWFzb24sIHRpbWVvdXQsIGVycm5vKXtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGVyciA9IG5ldyBFcnJvcihyZWFzb24gKyB0aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyk7XG4gIGVyci50aW1lb3V0ID0gdGltZW91dDtcbiAgZXJyLmNvZGUgPSAnRUNPTk5BQk9SVEVEJztcbiAgZXJyLmVycm5vID0gZXJybm87XG4gIHRoaXMudGltZWRvdXQgPSB0cnVlO1xuICB0aGlzLmFib3J0KCk7XG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fc2V0VGltZW91dHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIC8vIGRlYWRsaW5lXG4gIGlmICh0aGlzLl90aW1lb3V0ICYmICF0aGlzLl90aW1lcikge1xuICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgc2VsZi5fdGltZW91dEVycm9yKCdUaW1lb3V0IG9mICcsIHNlbGYuX3RpbWVvdXQsICdFVElNRScpO1xuICAgIH0sIHRoaXMuX3RpbWVvdXQpO1xuICB9XG4gIC8vIHJlc3BvbnNlIHRpbWVvdXRcbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVGltZW91dCAmJiAhdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIpIHtcbiAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHNlbGYuX3RpbWVvdXRFcnJvcignUmVzcG9uc2UgdGltZW91dCBvZiAnLCBzZWxmLl9yZXNwb25zZVRpbWVvdXQsICdFVElNRURPVVQnKTtcbiAgICB9LCB0aGlzLl9yZXNwb25zZVRpbWVvdXQpO1xuICB9XG59XG4iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZUJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzcG9uc2VCYXNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlQmFzZWAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZUJhc2Uob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIFJlc3BvbnNlQmFzZS5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IFJlc3BvbnNlQmFzZS5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICAgIHJldHVybiB0aGlzLmhlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciByZWxhdGVkIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGAudHlwZWAgdGhlIGNvbnRlbnQgdHlwZSB3aXRob3V0IHBhcmFtc1xuICpcbiAqIEEgcmVzcG9uc2Ugb2YgXCJDb250ZW50LVR5cGU6IHRleHQvcGxhaW47IGNoYXJzZXQ9dXRmLThcIlxuICogd2lsbCBwcm92aWRlIHlvdSB3aXRoIGEgYC50eXBlYCBvZiBcInRleHQvcGxhaW5cIi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLl9zZXRIZWFkZXJQcm9wZXJ0aWVzID0gZnVuY3Rpb24oaGVhZGVyKXtcbiAgICAvLyBUT0RPOiBtb2FyIVxuICAgIC8vIFRPRE86IG1ha2UgdGhpcyBhIHV0aWxcblxuICAgIC8vIGNvbnRlbnQtdHlwZVxuICAgIHZhciBjdCA9IGhlYWRlclsnY29udGVudC10eXBlJ10gfHwgJyc7XG4gICAgdGhpcy50eXBlID0gdXRpbHMudHlwZShjdCk7XG5cbiAgICAvLyBwYXJhbXNcbiAgICB2YXIgcGFyYW1zID0gdXRpbHMucGFyYW1zKGN0KTtcbiAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zKSB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcblxuICAgIHRoaXMubGlua3MgPSB7fTtcblxuICAgIC8vIGxpbmtzXG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKGhlYWRlci5saW5rKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmtzID0gdXRpbHMucGFyc2VMaW5rcyhoZWFkZXIubGluayk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gaWdub3JlXG4gICAgfVxufTtcblxuLyoqXG4gKiBTZXQgZmxhZ3Mgc3VjaCBhcyBgLm9rYCBiYXNlZCBvbiBgc3RhdHVzYC5cbiAqXG4gKiBGb3IgZXhhbXBsZSBhIDJ4eCByZXNwb25zZSB3aWxsIGdpdmUgeW91IGEgYC5va2Agb2YgX190cnVlX19cbiAqIHdoZXJlYXMgNXh4IHdpbGwgYmUgX19mYWxzZV9fIGFuZCBgLmVycm9yYCB3aWxsIGJlIF9fdHJ1ZV9fLiBUaGVcbiAqIGAuY2xpZW50RXJyb3JgIGFuZCBgLnNlcnZlckVycm9yYCBhcmUgYWxzbyBhdmFpbGFibGUgdG8gYmUgbW9yZVxuICogc3BlY2lmaWMsIGFuZCBgLnN0YXR1c1R5cGVgIGlzIHRoZSBjbGFzcyBvZiBlcnJvciByYW5naW5nIGZyb20gMS4uNVxuICogc29tZXRpbWVzIHVzZWZ1bCBmb3IgbWFwcGluZyByZXNwb25kIGNvbG9ycyBldGMuXG4gKlxuICogXCJzdWdhclwiIHByb3BlcnRpZXMgYXJlIGFsc28gZGVmaW5lZCBmb3IgY29tbW9uIGNhc2VzLiBDdXJyZW50bHkgcHJvdmlkaW5nOlxuICpcbiAqICAgLSAubm9Db250ZW50XG4gKiAgIC0gLmJhZFJlcXVlc3RcbiAqICAgLSAudW5hdXRob3JpemVkXG4gKiAgIC0gLm5vdEFjY2VwdGFibGVcbiAqICAgLSAubm90Rm91bmRcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdHVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLl9zZXRTdGF0dXNQcm9wZXJ0aWVzID0gZnVuY3Rpb24oc3RhdHVzKXtcbiAgICB2YXIgdHlwZSA9IHN0YXR1cyAvIDEwMCB8IDA7XG5cbiAgICAvLyBzdGF0dXMgLyBjbGFzc1xuICAgIHRoaXMuc3RhdHVzID0gdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzO1xuICAgIHRoaXMuc3RhdHVzVHlwZSA9IHR5cGU7XG5cbiAgICAvLyBiYXNpY3NcbiAgICB0aGlzLmluZm8gPSAxID09IHR5cGU7XG4gICAgdGhpcy5vayA9IDIgPT0gdHlwZTtcbiAgICB0aGlzLnJlZGlyZWN0ID0gMyA9PSB0eXBlO1xuICAgIHRoaXMuY2xpZW50RXJyb3IgPSA0ID09IHR5cGU7XG4gICAgdGhpcy5zZXJ2ZXJFcnJvciA9IDUgPT0gdHlwZTtcbiAgICB0aGlzLmVycm9yID0gKDQgPT0gdHlwZSB8fCA1ID09IHR5cGUpXG4gICAgICAgID8gdGhpcy50b0Vycm9yKClcbiAgICAgICAgOiBmYWxzZTtcblxuICAgIC8vIHN1Z2FyXG4gICAgdGhpcy5hY2NlcHRlZCA9IDIwMiA9PSBzdGF0dXM7XG4gICAgdGhpcy5ub0NvbnRlbnQgPSAyMDQgPT0gc3RhdHVzO1xuICAgIHRoaXMuYmFkUmVxdWVzdCA9IDQwMCA9PSBzdGF0dXM7XG4gICAgdGhpcy51bmF1dGhvcml6ZWQgPSA0MDEgPT0gc3RhdHVzO1xuICAgIHRoaXMubm90QWNjZXB0YWJsZSA9IDQwNiA9PSBzdGF0dXM7XG4gICAgdGhpcy5mb3JiaWRkZW4gPSA0MDMgPT0gc3RhdHVzO1xuICAgIHRoaXMubm90Rm91bmQgPSA0MDQgPT0gc3RhdHVzO1xufTtcbiIsInZhciBFUlJPUl9DT0RFUyA9IFtcbiAgJ0VDT05OUkVTRVQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VBRERSSU5GTycsXG4gICdFU09DS0VUVElNRURPVVQnXG5dO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHJlcXVlc3Qgc2hvdWxkIGJlIHJldHJpZWQuXG4gKiAoQm9ycm93ZWQgZnJvbSBzZWdtZW50aW8vc3VwZXJhZ2VudC1yZXRyeSlcbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaG91bGRSZXRyeShlcnIsIHJlcykge1xuICBpZiAoZXJyICYmIGVyci5jb2RlICYmIH5FUlJPUl9DT0RFUy5pbmRleE9mKGVyci5jb2RlKSkgcmV0dXJuIHRydWU7XG4gIGlmIChyZXMgJiYgcmVzLnN0YXR1cyAmJiByZXMuc3RhdHVzID49IDUwMCkgcmV0dXJuIHRydWU7XG4gIC8vIFN1cGVyYWdlbnQgdGltZW91dFxuICBpZiAoZXJyICYmICd0aW1lb3V0JyBpbiBlcnIgJiYgZXJyLmNvZGUgPT0gJ0VDT05OQUJPUlRFRCcpIHJldHVybiB0cnVlO1xuICBpZiAoZXJyICYmICdjcm9zc0RvbWFpbicgaW4gZXJyKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcbiIsIlxuLyoqXG4gKiBSZXR1cm4gdGhlIG1pbWUgdHlwZSBmb3IgdGhlIGdpdmVuIGBzdHJgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMudHlwZSA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqOyAqLykuc2hpZnQoKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGhlYWRlciBmaWVsZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucGFyYW1zID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICo7ICovKS5yZWR1Y2UoZnVuY3Rpb24ob2JqLCBzdHIpe1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICo9ICovKTtcbiAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKTtcbiAgICB2YXIgdmFsID0gcGFydHMuc2hpZnQoKTtcblxuICAgIGlmIChrZXkgJiYgdmFsKSBvYmpba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gb2JqO1xuICB9LCB7fSk7XG59O1xuXG4vKipcbiAqIFBhcnNlIExpbmsgaGVhZGVyIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnBhcnNlTGlua3MgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKiwgKi8pLnJlZHVjZShmdW5jdGlvbihvYmosIHN0cil7XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8gKjsgKi8pO1xuICAgIHZhciB1cmwgPSBwYXJ0c1swXS5zbGljZSgxLCAtMSk7XG4gICAgdmFyIHJlbCA9IHBhcnRzWzFdLnNwbGl0KC8gKj0gKi8pWzFdLnNsaWNlKDEsIC0xKTtcbiAgICBvYmpbcmVsXSA9IHVybDtcbiAgICByZXR1cm4gb2JqO1xuICB9LCB7fSk7XG59O1xuXG4vKipcbiAqIFN0cmlwIGNvbnRlbnQgcmVsYXRlZCBmaWVsZHMgZnJvbSBgaGVhZGVyYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAcmV0dXJuIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5jbGVhbkhlYWRlciA9IGZ1bmN0aW9uKGhlYWRlciwgc2hvdWxkU3RyaXBDb29raWUpe1xuICBkZWxldGUgaGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgZGVsZXRlIGhlYWRlclsnY29udGVudC1sZW5ndGgnXTtcbiAgZGVsZXRlIGhlYWRlclsndHJhbnNmZXItZW5jb2RpbmcnXTtcbiAgZGVsZXRlIGhlYWRlclsnaG9zdCddO1xuICBpZiAoc2hvdWxkU3RyaXBDb29raWUpIHtcbiAgICBkZWxldGUgaGVhZGVyWydjb29raWUnXTtcbiAgfVxuICByZXR1cm4gaGVhZGVyO1xufTsiXX0=
