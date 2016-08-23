'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.addReducer = addReducer;
exports.removeReducer = removeReducer;

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.curry');

var _lodash4 = _interopRequireDefault(_lodash3);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeIs = (0, _lodash4.default)(function (type, val) {
  return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === type;
});
var isObject = typeIs('object');

function _createReducer(fixedReducers) {
  var asyncReducers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return (0, _redux.combineReducers)((0, _lodash2.default)({}, fixedReducers, asyncReducers));
}

function addReducer(store) {
  return function (name, reducer) {
    (0, _invariant2.default)(isObject(store.fixedReducers), 'To use async reducers, the reducer parameter passed to createStoreWith must be an Object. Instead received %s.', _typeof(store.fixedReducers));

    store.asyncReducers[name] = reducer;
    store.replaceReducer(_createReducer(store.fixedReducers, store.asyncReducers));
  };
}

function removeReducer(store) {
  return function (name) {
    (0, _invariant2.default)(isObject(store.fixedReducers), 'To use async reducers, the reducer parameter passed to createStoreWith must be an Object. Instead received %s.', _typeof(store.fixedReducers));

    delete store.asyncReducers[name];
    store.replaceReducer(_createReducer(store.fixedReducers, store.asyncReducers));
  };
}