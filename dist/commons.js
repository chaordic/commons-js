/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/browser/deleteCookie.js":
/*!*************************************!*\
  !*** ./src/browser/deleteCookie.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCookie = deleteCookie;
var pastDate = 'expires=Thu, 01 Jan 1970 00:00:01 GMT';

/**
 * Deletes a page cookie.
 *
 * @memberof module:@linx-impulse/commons-js/browser
 * @method deleteCookie
 * @param {string} name The cookie name.
 * @param {object} options A key value pair set with method settings.
 * @param {string} options.domain The domain to set.
 * @param {string} options.path The path to set.
 * @param {HTMLDocument} [options.document] The document object to use. If not
 *  provided, uses the global `window.top.document`.
 */
function deleteCookie(name, options) {
  var opt = options || {};
  var domain = opt.domain,
      path = opt.path;

  var doc = opt.document || window.top.document;
  var keyValues = [name + '=', pastDate];

  if (domain) {
    keyValues.push('domain=' + domain);
  }

  if (path) {
    keyValues.push('path=' + path);
  }

  doc.cookie = keyValues.join(';');
}

/***/ }),

/***/ "./src/browser/getCookie.js":
/*!**********************************!*\
  !*** ./src/browser/getCookie.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookie = getCookie;
/* eslint-disable no-useless-escape */

/**
 * Returns a cookie value by its name
 *
 * @memberof module:@linx-impulse/commons-js/browser
 * @method getCookie
 * @param {string} name The name of cookie to get
 * @param {object} options A list of key-value pair options.
 * @param {HTMLDocument} [options.document] The document object to use. If not
 *  provided, uses the global `window.top.document`.
 */
function getCookie(name, options) {
  var opt = options || {};
  var doc = opt.document || window.top.document;

  var regex = '(?:(?:^|.*;)\\s*';
  regex += encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&');
  regex += '\\s*\\=\\s*([^;]*).*$)|^.*$';

  var value = doc.cookie.replace(new RegExp(regex), '$1');
  value = decodeURIComponent(value);

  return value || undefined;
}

/* eslint-enable no-useless-escape */

/***/ }),

/***/ "./src/browser/index.js":
/*!******************************!*\
  !*** ./src/browser/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopPropagation = exports.deleteCookie = exports.setCookie = exports.getCookie = exports.isMobile = exports.isInViewport = undefined;

var _getCookie = __webpack_require__(/*! ./getCookie */ "./src/browser/getCookie.js");

var _isInViewport = __webpack_require__(/*! ./isInViewport */ "./src/browser/isInViewport.js");

var _isMobile = __webpack_require__(/*! ./isMobile */ "./src/browser/isMobile.js");

var _setCookie = __webpack_require__(/*! ./setCookie */ "./src/browser/setCookie.js");

var _deleteCookie = __webpack_require__(/*! ./deleteCookie */ "./src/browser/deleteCookie.js");

var _stopPropagation = __webpack_require__(/*! ./stopPropagation */ "./src/browser/stopPropagation.js");

/**
 * browser module.
 *
 * @module @linx-impulse/commons-js/browser
 */
/*
 * Linx commons-js.
 *
 * A library with common functions implementations for javascript applications.
 *
 * Copyright (c) 2018 - Linx S.A
 *
 * LICENSE: This software is the confidential and proprietary information of
 * Linx S.A ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Linx S.A.
 */

exports.isInViewport = _isInViewport.isInViewport;
exports.isMobile = _isMobile.isMobile;
exports.getCookie = _getCookie.getCookie;
exports.setCookie = _setCookie.setCookie;
exports.deleteCookie = _deleteCookie.deleteCookie;
exports.stopPropagation = _stopPropagation.stopPropagation;

/***/ }),

/***/ "./src/browser/isInViewport.js":
/*!*************************************!*\
  !*** ./src/browser/isInViewport.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInViewport = isInViewport;
function isInViewport(el, options) {
  var opt = options || {};

  var win = opt.window || window;
  var doc = opt.document || document;
  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (win.innerHeight || doc.documentElement.clientHeight) && rect.right <= (win.innerWidth || doc.documentElement.clientWidth);
}

/***/ }),

/***/ "./src/browser/isMobile.js":
/*!*********************************!*\
  !*** ./src/browser/isMobile.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMobile = isMobile;
/**
 * Indicates whether the user is using mobile device
 *
 * @param {object} options A list of key-value pair options.
 * @param {Window} [options.window] The window object to use. If not
 *  provided, uses the global `window.top`.
 */

/* eslint-disable no-useless-escape */
var regex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
var prefixRegex = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
/* eslint-enable no-useless-escape */

function isMobile(options) {
  var opt = options || {};
  var win = opt.window || window.top;

  var ua = win.navigator.userAgent;

  return regex.test(ua) || prefixRegex.test(ua.substr(0, 4));
}

/***/ }),

/***/ "./src/browser/setCookie.js":
/*!**********************************!*\
  !*** ./src/browser/setCookie.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCookie = setCookie;
/* eslint-disable no-useless-escape */

/**
 * Set a cookie on the browser
 *
 * @memberof module:@linx-impulse/commons-js/browser
 * @method setCookie
 * @param {string} name The name of the cookie
 * @param {string} value The value to set.
 * @param {object} options A key value pair set with method settings.
 * @param {string} options.expires Period to expire the cookie in minutes.
 * @param {string} options.domain The domain to set.
 * @param {string} options.path The path to set.
 * @param {HTMLDocument} [options.document] The document object to use. If not
 *  provided, uses the global `window.top.document`.
 * @param {boolean} options.secure Indicates if the flag secure must be set.
 */
function setCookie(name, value, options) {
  var opt = options || {};
  var expires = opt.expires,
      path = opt.path,
      domain = opt.domain,
      secure = opt.secure;

  var doc = opt.document || window.top.document;

  var expireDate = void 0;
  if (expires !== Infinity && typeof expires === 'number') {
    expireDate = new Date();
    expireDate.setTime(expires.getTime() + expires * 60 * 1000);
  }

  if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) {
    throw new TypeError('invalid cookie name ' + name);
  }

  var keyValues = [encodeURIComponent(name) + '=' + encodeURIComponent(value)];

  if (expireDate) {
    keyValues.push('expires=' + expireDate);
  }

  if (domain) {
    keyValues.push('domain=' + domain);
  }

  if (path) {
    keyValues.push('path=' + path);
  }

  if (secure) {
    keyValues.push('secure');
  }

  doc.cookie = keyValues.join(';');

  return true;
}

/* eslint-enable no-useless-escape */

/***/ }),

/***/ "./src/browser/stopPropagation.js":
/*!****************************************!*\
  !*** ./src/browser/stopPropagation.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopPropagation = stopPropagation;
/**
 * Calls functions to prevent further propagation
 * of a given event in the capturing and bubbling phases.
 *
 * @memberof module:@linx-impulse/commons-js/browser
 * @method stopPropagation
 * @param {object} event The event whose functions will be called
 */
function stopPropagation(event) {
  if (event.preventDefault && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }

  if (event.stopPropagation && typeof event.stopPropagation === 'function') {
    event.stopPropagation();
  }

  // eslint-disable-next-line no-param-reassign
  event.cancelBubble = true;
}

/***/ }),

/***/ "./src/http/ajax.js":
/*!**************************!*\
  !*** ./src/http/ajax.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.ajax = ajax;
/*
 * Linx commons-js.
 *
 * A library with common functions implementations for javascript applications.
 *
 * Copyright (c) 2018 - Linx S.A
 *
 * LICENSE: This software is the confidential and proprietary information of
 * Linx S.A ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Linx S.A.
 */

function arrayToQueryParams(key, values) {
  return values.map(function (val) {
    return key + '[]=' + encodeURIComponent(val);
  }).join('&');
}

function serializeParams(params) {
  return (Object.keys(params) || []).map(function (param) {
    if (Array.isArray(params[param])) {
      return arrayToQueryParams(param, params[param]);
    }if (params[param]) {
      return param + '=' + encodeURIComponent(params[param]);
    }

    return null;
  }).filter(function (token) {
    return !!token;
  }).join('&');
}

/**
 * Default ajax request.
 *
 * @memberof module:@linx-impulse/commons-js/http
 * @method ajax
 * @param {object} options A set of key/value pairs that configure
 *          the Ajax request.
 * @param {object} options.url A string containing the URL to
 *          which the request is sent. This parameter is obrigatory.
 * @param {object} [options.type=GET] The method of request.
 * @param {object} options.params Url query params.
 * @param {object} options.data Data to be sent to the server.
 *          It is converted to a query string,
 * @param {function} options.callback A function to execute always when
 *          the request is finished.
 * @param {function} options.success A function to execute when the request
 *          is successfully finished.
 * @param {function} options.error A function to execute when some error
 *          occurs on request.
 * @param {number} [options.timeout] Specifies the number of milliseconds before
 *          the request times out. If the request takes longer than `timeout`,
 *          the request will be aborted. If not provided the request will wait
 *          indefinitely.
 */
function ajax(options) {
  var callback = typeof options.callback === 'function' ? options.callback : function () {};

  var success = typeof options.success === 'function' ? options.success : function () {};

  var error = typeof options.error === 'function' ? options.error : function () {};

  var requestData = _typeof(options.data) === 'object' ? options.data : {};

  var params = _typeof(options.params) === 'object' ? options.params : {};

  var requestMethod = options.type === undefined || options.type.toUpperCase() !== 'GET' && options.type.toUpperCase() !== 'POST' && options.type.toUpperCase() !== 'PUT' && options.type.toUpperCase() !== 'DELETE' ? 'GET' : options.type.toUpperCase();

  if (typeof options.url !== 'string' && options.url === '') {
    return;
  }

  var queryParams = serializeParams(params);
  var queryConnector = options.url.indexOf('?') >= 0 ? '&' : '?';
  var url = '' + options.url + queryConnector + queryParams;

  var _options$timeout = options.timeout,
      timeout = _options$timeout === undefined ? 0 : _options$timeout;


  var xhr = new XMLHttpRequest();
  xhr.open(requestMethod, url, true);

  xhr.onload = function (res) {
    var status = res.target.status;

    var responseData = void 0;

    try {
      responseData = JSON.parse(xhr.response);
    } catch (e) {
      responseData = xhr.response;
    }

    if (status >= 200 && status < 300) {
      callback(responseData);
      success(responseData);
    } else {
      callback({ status: status, statusText: xhr.statusText });
      error({ status: status, statusText: xhr.statusText });
    }
  };

  xhr.onerror = function (res) {
    var status = res.target.status;


    callback({ status: status, statusText: xhr.statusText });
    error({ status: status, statusText: xhr.statusText });
  };

  xhr.timeout = timeout;
  xhr.ontimeout = function (err) {
    callback(err);
    error(err);
  };

  if (requestMethod !== 'GET') {
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(serializeParams(requestData));
  } else {
    xhr.send();
  }
}

/***/ }),

/***/ "./src/http/index.js":
/*!***************************!*\
  !*** ./src/http/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ajax = undefined;

var _ajax = __webpack_require__(/*! ./ajax */ "./src/http/ajax.js");

/**
 * Http module.
 *
 * @module @linx-impulse/commons-js/http
 */
exports.ajax = _ajax.ajax; /*
                            * Linx commons-js.
                            *
                            * A library with common functions implementations for javascript applications.
                            *
                            * Copyright (c) 2018 - Linx S.A
                            *
                            * LICENSE: This software is the confidential and proprietary information of
                            * Linx S.A ("Confidential Information"). You shall not disclose such
                            * Confidential Information and shall use it only in accordance with the terms
                            * of the license agreement you entered into with Linx S.A.
                            */

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commons = undefined;

var _browser = __webpack_require__(/*! ./browser */ "./src/browser/index.js");

var _browser2 = _interopRequireDefault(_browser);

var _http = __webpack_require__(/*! ./http */ "./src/http/index.js");

var _http2 = _interopRequireDefault(_http);

var _queryString = __webpack_require__(/*! ./query-string */ "./src/query-string/index.js");

var _queryString2 = _interopRequireDefault(_queryString);

var _util = __webpack_require__(/*! ./util */ "./src/util/index.js");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module @linx-impulse/commons-js
 */
/*
 * Linx commons-js.
 *
 * A library with common functions implementations for javascript applications.
 *
 * Copyright (c) 2018 - Linx S.A
 *
 * LICENSE: This software is the confidential and proprietary information of
 * Linx S.A ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Linx S.A.
 */

var commons = exports.commons = { browser: _browser2.default, http: _http2.default, queryString: _queryString2.default, util: _util2.default };

window.top.linx = window.top.linx || {};
window.top.linx.commons = commons;

/***/ }),

/***/ "./src/query-string/index.js":
/*!***********************************!*\
  !*** ./src/query-string/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify = exports.parse = undefined;

var _parse = __webpack_require__(/*! ./parse */ "./src/query-string/parse.js");

var _stringify = __webpack_require__(/*! ./stringify */ "./src/query-string/stringify.js");

/**
 * browser module.
 *
 * @module @linx-impulse/commons-js/query-string
 */
/*
 * Linx commons-js.
 *
 * A library with common functions implementations for javascript applications.
 *
 * Copyright (c) 2018 - Linx S.A
 *
 * LICENSE: This software is the confidential and proprietary information of
 * Linx S.A ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Linx S.A.
 */

exports.parse = _parse.parse;
exports.stringify = _stringify.stringify;

/***/ }),

/***/ "./src/query-string/parse.js":
/*!***********************************!*\
  !*** ./src/query-string/parse.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parse = parse;
function addToObj(parameters, key, value) {
  var innerObj = parameters;
  var decodedValue = decodeURIComponent(value);
  var decodedKey = decodeURIComponent(key);

  if (typeof innerObj[decodedKey] === 'string') {
    innerObj[decodedKey] = [innerObj[decodedKey], decodedValue];
  } else if (Array.isArray(innerObj[decodedKey])) {
    innerObj[decodedKey].push(decodedValue);
  } else if (decodedKey) {
    innerObj[decodedKey] = decodedValue;
  }
  return innerObj;
}

/**
 * Parse a query string and return the object with
 * the parameters and values
 *
 * @memberof module:@linx-impulse/commons-js/query-string
 * @method parse
 * @param {string} query The query to be parsed
 * @returns {object} parameters The object to be returned with the parameters
 */
function parse(query) {
  if (typeof query !== 'string') {
    return {};
  }

  var arrayVars = query.split('&');

  return arrayVars.reduce(function (parameters, element) {
    var _element$split = element.split('='),
        _element$split2 = _slicedToArray(_element$split, 2),
        key = _element$split2[0],
        value = _element$split2[1];

    return addToObj(parameters, key, value);
  }, {});
}

/***/ }),

/***/ "./src/query-string/stringify.js":
/*!***************************************!*\
  !*** ./src/query-string/stringify.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify = stringify;
function arrayToQueryParams(key, values) {
  return values.map(function (val) {
    return key + '[]=' + encodeURIComponent(val);
  }).join('&');
}

/**
 * From an object with the url parameters concatenate
 * all in one string
 *
 * @memberof module:@linx-impulse/commons-js/query-string
 * @method stringify
 * @param {object} params The object to be transformed in string
 * @returns {string} The object parameters in the url format
 */

function stringify(params) {
  return (Object.keys(params) || []).map(function (param) {
    if (Array.isArray(params[param])) {
      return arrayToQueryParams(param, params[param]);
    }if (params[param]) {
      return param + '=' + encodeURIComponent(params[param]);
    }

    return null;
  }).filter(function (token) {
    return !!token;
  }).join('&');
}

/***/ }),

/***/ "./src/util/formatCategories.js":
/*!**************************************!*\
  !*** ./src/util/formatCategories.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.formatCategories = formatCategories;
function getFirstChild(categories, item) {
  return (categories || []).find(function (category) {
    return !category.used && Array.isArray(category.parents) && category.parents.indexOf(item.id) !== -1;
  });
}

/**
 * Formats an array of categories passed, sorting them
 * based on hierarchic structure and returns an array
 * of category ids.
 *
 * @memberof module:@linx-impulse/commons-js/util
 * @method formatCategories
 * @param {Array} An array of objects, each consisting of a category
 * with id, name and an array of parents.
 * @returns {Array} An array of strings where each string represents
 * one category id.
 */
function formatCategories(categories) {
  // Filter wrong formatted
  var filteredCategories = (categories || []).filter(function (category) {
    return category && category.id;
  }).map(function (category) {
    return { id: category.id, parents: category.parents };
  });

  // Find the root node
  var item = filteredCategories.find(function (category) {
    return !category.parents || Array.isArray(category.parents) && !category.parents.length;
  });
  var ids = [];

  while ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
    ids.push(item.id);
    item.used = true;
    item = getFirstChild(filteredCategories, item);
  }
  return ids;
}

/***/ }),

/***/ "./src/util/formatCurrency.js":
/*!************************************!*\
  !*** ./src/util/formatCurrency.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatCurrency = formatCurrency;
// Default values
var DECIMAL_PLACES = 2;
var THOUSANDS_SEPARATOR = '.';
var DECIMAL_POINT = ',';
var CURRENCY_SYMBOL = 'R$';

/**
 * Formats a number to have specified number of decimal places,
 * a thousdands separator and decimal point, as well as adding a
 * currency symbol to the resulting string.
 *
 * @memberof module:@linx-impulse/commons-js/util
 * @method formatCurrency
 * @param {Number} number A number to be formatted
 * @param {Object} options Parameters to format the passed number
 * @param {Number} options.decimalPlaces The number of digits after
 * the decimal point.
 * @param {string} options.thousandsSeparator The symbol used to separate
 * thousands.
 * @param {string} options.decimalPoint The symbol used to separated
 * the integer part of the number from the decimal part.
 * @param {string} options.currencySymbol The symbol of the currency.
 * Ex: U$, R$, etc.
 * @returns {string} The resulting formatted string.
 */
function formatCurrency(number) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$decimalPlaces = _ref.decimalPlaces,
      decimalPlaces = _ref$decimalPlaces === undefined ? DECIMAL_PLACES : _ref$decimalPlaces,
      _ref$thousandsSeparat = _ref.thousandsSeparator,
      thousandsSeparator = _ref$thousandsSeparat === undefined ? THOUSANDS_SEPARATOR : _ref$thousandsSeparat,
      _ref$decimalPoint = _ref.decimalPoint,
      decimalPoint = _ref$decimalPoint === undefined ? DECIMAL_POINT : _ref$decimalPoint,
      _ref$currencySymbol = _ref.currencySymbol,
      currencySymbol = _ref$currencySymbol === undefined ? CURRENCY_SYMBOL : _ref$currencySymbol;

  var parts = number.toFixed(decimalPlaces).split('.');
  var integerPart = parts[0];
  var decimalPart = Number(parts[1] || 0);
  var formattedNumber = '';

  decimalPart += Math.pow(10, decimalPlaces);
  decimalPart = decimalPart.toFixed().substr(1);

  if (thousandsSeparator) {
    // eslint-disable-next-line no-plusplus
    for (var i = integerPart.length - 1, j = 0; i > -1; i--, j++) {
      if (j % 3 === 0 && formattedNumber) {
        formattedNumber = '' + thousandsSeparator + formattedNumber;
      }

      formattedNumber = '' + integerPart.charAt(i) + formattedNumber;
    }

    if (formattedNumber.charAt(0) === thousandsSeparator) {
      formattedNumber = formattedNumber.substr(1);
    }
  } else {
    formattedNumber = integerPart;
  }

  formattedNumber += '' + decimalPoint + decimalPart;

  return currencySymbol + ' ' + formattedNumber;
}

/***/ }),

/***/ "./src/util/index.js":
/*!***************************!*\
  !*** ./src/util/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatCurrency = exports.formatCategories = exports.objectMergeRecursive = exports.loadFile = undefined;

var _loadFile = __webpack_require__(/*! ./loadFile */ "./src/util/loadFile.js");

var _objectMergeRecursive = __webpack_require__(/*! ./objectMergeRecursive */ "./src/util/objectMergeRecursive.js");

var _formatCategories = __webpack_require__(/*! ./formatCategories */ "./src/util/formatCategories.js");

var _formatCurrency = __webpack_require__(/*! ./formatCurrency */ "./src/util/formatCurrency.js");

/**
 * browser module.
 *
 * @module @linx-impulse/commons-js/util
 */
/*
 * Linx commons-js.
 *
 * A library with common functions implementations for javascript applications.
 *
 * Copyright (c) 2018 - Linx S.A
 *
 * LICENSE: This software is the confidential and proprietary information of
 * Linx S.A ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Linx S.A.
 */

exports.loadFile = _loadFile.loadFile;
exports.objectMergeRecursive = _objectMergeRecursive.objectMergeRecursive;
exports.formatCategories = _formatCategories.formatCategories;
exports.formatCurrency = _formatCurrency.formatCurrency;

/***/ }),

/***/ "./src/util/loadFile.js":
/*!******************************!*\
  !*** ./src/util/loadFile.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.loadFile = loadFile;
/**
 * Creates and appends an element that links the HTML document to a given file
 * source and sets a callback function to be called once the element finishes
 * loading.
 *
 * @memberof module:@linx-impulse/commons-js/util
 * @method loadFile
 * @param {string} source The path to the file that will be loaded.
 * @param {function} callback The function to be called once the
 * element created finishes loading.
 * @param {object} document The document object to be used,
 * defaults to Window.document.
 * @returns {object} The element that was created and appended.
 */
function loadFile(source, callback) {
  var document = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.document;

  var file = void 0;

  if (source.indexOf('.js') !== -1) {
    file = document.createElement('script');
    file.setAttribute('type', 'text/javascript');
    file.setAttribute('async', 'true');
    file.setAttribute('src', source);
  } else if (source.indexOf('.css') !== -1) {
    file = document.createElement('link');
    file.setAttribute('type', 'text/css');
    file.setAttribute('rel', 'stylesheet');
    file.setAttribute('href', source);
  }

  // Append in the HEAD element
  if (file) {
    var _document$getElements = document.getElementsByTagName('head'),
        _document$getElements2 = _slicedToArray(_document$getElements, 1),
        head = _document$getElements2[0];

    head.appendChild(file);

    if (file.readyState) {
      file.onreadystatechange = function () {
        if (file.readyState === 'loaded' || file.readyState === 'complete') {
          file.onreadystatechange = null;

          if (typeof callback === 'function') {
            callback();
          }
        }
      };
    } else {
      file.onload = function () {
        file.onload = null;

        if (typeof callback === 'function') {
          callback();
        }
      };
    }
  }

  return file;
}

/***/ }),

/***/ "./src/util/objectMergeRecursive.js":
/*!******************************************!*\
  !*** ./src/util/objectMergeRecursive.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.objectMergeRecursive = objectMergeRecursive;
/**
 * Merges two or more objects, combining common properties. Overwrites
 * the properties from right to left in case of conflicts and ignores parameters
 * (but not properties) that are not objects.
 *
 * @memberof module:@linx-impulse/commons-js/util
 * @method objectMergeRecursive
 * @param {...object} source An object to be merged
 * @returns {object} An object containing merged properties of all valid sources
 * given.
 */
function objectMergeRecursive() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var target = args[0] && _typeof(args[0]) === 'object' && !Array.isArray(args[0]) ? args[0] : {};

  // eslint-disable-next-line no-plusplus

  var _loop = function _loop(i) {
    var source = args[i] && _typeof(args[i]) === 'object' && !Array.isArray(args[i]) ? args[i] : {};

    // eslint-disable-next-line no-loop-func
    Object.keys(source).forEach(function (key) {
      if (_typeof(target[key]) === 'object' && !Array.isArray(target[key]) && _typeof(source[key]) === 'object' && !Array.isArray(source[key])) {
        target[key] = objectMergeRecursive(target[key], source[key]);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      }
    });
  };

  for (var i = 1; i < args.length; i++) {
    _loop(i);
  }

  return target;
}

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=commons.js.map