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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var global = exports.global = window;
var doc = exports.doc = document;
var LIB_NAME = exports.LIB_NAME = 'JUI';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Core = undefined;

var _config = __webpack_require__(0);

var _debug = __webpack_require__(16);

var _isType = __webpack_require__(3);

var _each = __webpack_require__(7);

var _reverse = __webpack_require__(18);

var _extend = __webpack_require__(19);

var _clone = __webpack_require__(20);

// import {isPlainObject} from '../Native/isPlainObject';
// import {isArray} from '../Native/isArray';
// import {isFunction} from '../Native/isFunction';
// import {isObject} from '../Native/isObject';
if (_config.global[_config.LIB_NAME]) {
    throw new Error('The same core name exists.');
}
// if (!global['$']) { throw new Error('This library requires jQuery'); }

/**
 * Core
 * @namespace
 * @name Core
 * @description root namespace
 */
var Core = _config.global[_config.LIB_NAME] || (_config.global[_config.LIB_NAME] = {});

/** 라이브러리 기본 코어 */
(0, _extend.extend)(Core, {
    constructor: _config.LIB_NAME, // 생성자(프레임워크) 이름
    debug: _debug.debug, // 디버깅 로그
    each: _each.each, // 반복함수
    reverse: _reverse.reverse, // 역순 반복함수
    extend: _extend.extend, // 객체 병합함수
    clone: _clone.clone, // 객체 복제함수
    emptyFn: function emptyFn() {}, // 빈 함수

    /**
     * 특정속성을 지원하는지 체크하기 위한 엘리먼트
     * @name {{LIB_NAME}}.tmpInput
     * @example
     * if ('placeholder' in {{LIB_NAME}}.tmpInput) {
     *     alert('placeholder를 지원합니다.');
     * }
     */
    tmpInput: _config.doc.createElement('input'),

    /**
     * 특정 css스타일을 지원하는지 체크하기 위한 엘리먼트
     * @name {{LIB_NAME}}.tmpNode
     * @example
     * if ('transform' in {{LIB_NAME}}.tmpNode.style) {
     *     alert('transform를 지원합니다.');
     * }
     */
    tmpNode: _config.doc.createElement('div'),

    /**
     * 타입 체크
     * @name {{LIB_NAME}}.is
     */
    is: _isType.isType,

    /**
     * 주어진 인자가 빈값인지 체크
     * @param {*} value - 체크할 값(문자열, 객체 등등)
     * @param {Boolean} [allowEmptyString = false] - 빈문자를 허용할 것인지 여부
     * @return {Boolean} 빈값인지 체크 후 불린값 반환
     * @example
     * {{LIB_NAME}}.isEmpty(null); // true
     * {{LIB_NAME}}.isEmpty(undefined); // true
     * {{LIB_NAME}}.isEmpty(''); // true
     * {{LIB_NAME}}.isEmpty(0); // true
     * {{LIB_NAME}}.isEmpty([]); // true
     * {{LIB_NAME}}.isEmpty({}); // true
     */
    isEmpty: function isEmpty(value, allowEmptyString) {
        return typeof value === null || typeof value === 'undefined' || value === 0 || (Core.is(value, 'string') && !allowEmptyString ? value === '' : false) || Core.is(value, 'array') && value.length === 0 || Core.is(value, 'object') && !Core.object.hasObject(value);
    },

    /**
     * 객체 자체에 주어진 이름의 속성이 있는지 조회
     * @param {Object} obj - 객체
     * @param {String} name - 키 이름
     * @return {Boolean} 키의 존재 여부
     * @example
     * var obj = {a: 'A'};
     * if ({{LIB_NAME}}.hasOwn(obj, 'a')) {
     *     alert('obj객체에 a가 존재합니다.');
     * }
     */
    hasOwn: function hasOwn(obj, name) {
        return Object.prototype.hasOwnProperty.call(obj, name);
    },

    /**
     * 네임스페이스 공간을 생성하고 객체를 설정하며 .를 구분자로 하여 하위 네임스페이스가 생성된다.
     * @name {{LIB_NAME}}.namespace
     * @param {String} part - 네임스페이스명
     * @param {Object|Function} [obj] - 지정된 네임스페이스에 등록할 객체, 함수 등
     * @return {Object} 생성된 새로운 네임스페이스
     * @example
     * {{LIB_NAME}}.namespace('app.ui.Module', Module);
     * // 를 native로 풀면,
     * var app = {
     *     ui: {
     *         Module: Module
     *     }
     * };
     */
    namespace: function namespace(part, obj) {
        if (typeof part !== 'string') {
            obj && (part = obj);

            return part;
        }

        var parent = Core,
            parts = part.split('.'),
            i = void 0,
            item = void 0;

        for (i = -1; item = parts[++i];) {
            if (parent[item]) {
                throw new Error('The same core namespace exists.');
            } // 기본 네임스페이스 이름 생성시 에러 반환

            parent = parent[item] || (parent[item] = {});
        }

        return Core.extend(parent, obj || {});
    },

    /**
     * 의존성 모듈 패턴
     * @name {{LIB_NAME}}.dependency
     * @example
     * // device 모듈 추가
     * {{LIB_NAME}}.dependency.module.device = function(app) {
     *    app.deviceChk = function() {
     *        console.log('deviceChk');
     *    };
     *    app.isMobile = function() {
     *        console.log('isMobile');
     *    };
     * };
     * // os 모듈 추가
     * {{LIB_NAME}}.dependency.module.os = function(app) {
     *    app.isFlatForm = function(viewType, callback) {
     *        console.log('isFlatForm');
     *    };
     * };
     *
     * // 추가된 모듈 사용
     * {{LIB_NAME}}.dependency(['*'], function(Module) {}); // 의존성 모듈 전체 사용
     * {{LIB_NAME}}.dependency(function(Module) {}); // 의존성 모듈 생략 가능
     * {{LIB_NAME}}.dependency(['device', 'os'], function(Module) {
     *     console.log(Module); // {device, os} 추가한 모듈 객체가 인자로 들어온다.
     *     Module.deviceChk(); // 추가한 모듈의 메소드, 프로퍼티 사용
     * });
     *
     * // 코어 별칭 모듈 추가 단축 네이밍: module
     * {{LIB_NAME}}.module.os = function(app) {});
     * // 코어 별칭 모듈 사용 단축 네이밍: modules
     * {{LIB_NAME}}.modules(['*'], function(Module) {});
     */
    dependency: function dependency() {
        var args = Array.prototype.slice.call(arguments),
            callback = args.pop();
        var modules = args[0] && typeof args[0] === 'string' ? args : args[0];

        if (!(this instanceof Core.dependency)) {
            return new Core['dependency'](modules, callback);
        }

        // 모듈선언이 생략되거나 전체선택자일 경우
        if (!modules || modules === '*' || modules[0] === '*') {
            modules = [];
            var ref = Core.dependency.module;

            for (var k in ref) {
                if (Core.dependency.module.hasOwnProperty(k)) {
                    modules.push(k);
                }
            }
        }

        for (var i = 0, len = modules.length; i < len; i++) {
            Core.dependency.module[modules[i]](this);
        }

        if (typeof callback !== 'undefined' && typeof callback === 'function') {
            return callback(this);
        }
    },

    /**
     * {{LIB_NAME}} 하위에 name에 해당하는 네임스페이스를 생성하여 object를 설정해주는 함수
     * @name {{LIB_NAME}}.define
     * @param {String} part - .를 구분자로 해서 {{LIB_NAME}}을 시작으로 하위 네임스페이스를 생성하며 part가 없으면 {{LIB_NAME}}에 추가된다.
     * @param {Object|Function} obj - 지정된 네임스페이스에 등록할 객체, 함수 등
     * @return {Object} 생성된 새로운 네임스페이스
     * @example
     * {{LIB_NAME}}.define('urls', {
     *     store: 'Store',
     *     company: 'Company'
     * });
     * alert({{LIB_NAME}}.urls.store);
     * alert({{LIB_NAME}}.urls.company);
     */
    define: function define(part, obj, isExecFn) {
        if (typeof part !== 'string') {
            obj = part;
            part = '';
        }

        var parent = Core,
            parts = part ? part.replace(/^_core\.?/, '').split('.') : [],
            ln = parts.length - 1,
            leaf = parts[ln];

        if (isExecFn !== false && typeof obj === 'function' && !Core.hasOwn.call(obj, 'superclass')) {
            obj = obj.call(parent);
        }

        for (var i = 0; i < ln; i++) {
            parent = parent[parts[i]] || (parent[parts[i]] = {});
        }

        return (leaf && parent[leaf] ? Core.extend(parent[leaf], obj) : parent[leaf] = obj) || Core.extend(parent, obj), obj;
    }
});

/** 코어 별칭 */
Core.name = Core.constructor;
Core.ver = 'v1.0.0';
Core.ns = Core.namespace;
Core.modules = Core.dependency;
Core.module = Core.dependency.module = {};

exports.Core = Core;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isType = undefined;
var _arguments = arguments;

var _isPlainObject = __webpack_require__(4);

/**
 * isType
 * @description 타입 체크
 * @param {*} value - 타입을 확인할 값 (숫자, 문자, 배열, 객체)
 * @param {String} typeName - 타입명 ('null', 'number', 'string', 'element', 'nan', 'infinity', 'date', 'array')
 * @return {String|Boolean} 인자값에 typeName이 안넘오면 타입값을 반환
 * @api
 * isPlainObject(* [, typeName])
 * @example
 * isType('test', 'string'); // true
 * isType(new Date(), 'date'); // true
 * isType(1, 'number'); // true
 * isType(/[a-z]/, 'regexp'); // true
 * isType(document.getElementById('box'), 'element'); // true
 * isType({a:'a'}, 'object'); // true
 * isType([], 'array'); // true
 * isType(NaN, 'nan'); // true
 * isType(null, 'null'); // true
 * // 파라미터를 하나만 넘기면 타입명을 반환받을 수 있다.
 * isType(''); // 'string'
 * isType(null); // 'null'
 * isType(1); // 'number'
 * isType({}); // 'object'
 * isType([]); // 'array'
 * isType(undefined); // 'undefined'
 * isType(new Date()); // 'date'
 * isType(/[a-z]/); // 'regexp'
 * isType(document.body); // 'element'
 */
var isType = function isType(value, typeName) {
    var isGet = _arguments.length === 1;
    var s = Object.prototype.toString.call(value),
        type = s.match(/\[object (.*?)\]/)[1].toLowerCase();
    var resultType = null;

    function result(name) {
        return isGet ? name : typeName === name;
    }

    if (typeof value === null) {
        resultType = result('null');
    } else if (value && value.nodeType) {
        if (value.nodeType === 1 || value.nodeType === 9) {
            resultType = result('element');
        } else if (value && value.nodeType === 3 && value.nodeName === '#text') {
            resultType = result('textnode');
        }
    } else if (typeName === 'object' || typeName === 'json') {
        resultType = isGet ? 'object' : (0, _isPlainObject.isPlainObject)(value);
    } else if (type === 'number') {
        if (isNaN(value)) {
            resultType = result('nan');
        } else if (!isFinite(value)) {
            resultType = result('infinity');
        } else {
            resultType = result('number');
        }
    } else {
        resultType = isGet ? type : type === typeName;
    }

    return resultType;
};

exports.isType = isType;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * isPlainObject
 * @description Plain Object 여부 확인
 * @param {Object} value - 오브젝트 객체
 * @return {Boolean}
 * @api
 * isPlainObject(object)
 * @example
 * isPlainObject({}) // 객체 리터럴
 * isPlainObject(new Object) // 객체 new 생성자
 */
var isPlainObject = Object.prototype.toString.call(null) === '[object Object]' ? function (value) {
    return typeof value !== null && typeof value !== 'undefined' && typeof value.ownerDocument === 'undefined' && Object.prototype.toString.call(value) === '[object Object]';
} : function (value) {
    return Object.prototype.toString.call(value) === '[object Object]';
};

exports.isPlainObject = isPlainObject;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isArray = undefined;

var _isType = __webpack_require__(3);

/**
 * isArray
 * @description 배열 타입 여부 확인
 * @param {Array} arr - 배열
 * @return {Boolean} 타입이 배열인지 확인 후 불린값을 반환
 * @api
 * isArray(*)
 * @example
 * isArray([]); // true
 */
var isArray = function isArray(arr) {
  return (0, _isType.isType)(arr, 'array');
};

exports.isArray = isArray;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _config = __webpack_require__(0);

/**
 * @name bindPolyfill
 * @description 바인드 폴리필 기능 지원
 * @param {Object} obj - 바인딩 객체 데이터
 * @example
 * function Test() {
 *      alert(this.name);
 * }
 *
 * Test.bind({name: 'axl rose'})();
 * // 'axl rose';
 */
exports['default'] = function () {
    if (typeof Function.prototype.bind === 'undefined') {
        /**
         * 함수내의 컨텐스트를 지정
         * @param {Object} context - 컨텍스트
         * @param {*} ... - 두번째 인자부터는 실제로 실행될 콜백함수로 전달된다.
         * @return {function(context=, ...} 주어진 객체가 켄텍스트로 적용된 함수
         * @example
         * function Test() {
         *      alert(this.name);
         * }
         *
         * Test.bind({name: 'axl rose'})(); -> alert('axl rose');
         */
        Function.prototype.bind = function () {
            var fn = this,
                args = Array.prototype.slice.call(arguments),
                object = args.shift();

            return function (context) {
                var local_args = args.concat(Array.prototype.slice.call(arguments)); // bind로 넘어오는 인자와 원본함수의 인자를 병합하여 넘겨줌.

                if (this !== _config.global) {
                    local_args.push(this);
                }

                return fn.apply(object, local_args);
            };
        };
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.each = undefined;

var _isArray = __webpack_require__(5);

var _isObject = __webpack_require__(17);

/**
 * each
 * @description 반복 함수
 * @param {Array|Object} obj - 배열 및 객체
 * @param {Function} cb - 콜백함수
 * @param {*} context - 컨텍스트
 * @return {Array|Object} 배열 및 객체 원형 반환
 * @api
 * each(object, function)
 * @example
 * each(['a', 'b', 'c'], function(value, index, obj) {
 *     alert('value:' + value + ', index:' + index);
 *     if (value === 'b') { return false; } // false 를 반환하면 순환을 멈춘다.
 * });
 * each({a: 'A', b: 'B', c: 'C'}, function(key, value, obj) {
 *     alert('key:' + key + ', value:' + value);
 *     if (value === 'B') { return false; } // false 를 반환하면 순환을 멈춘다.
 * });
 */
var each = function each(obj, cb, context) {
    if (!obj) {
        return obj;
    }

    if ((0, _isArray.isArray)(obj)) {
        // 배열
        for (var i = 0, len = obj.length; i < len; i++) {
            if (cb.call(context || obj, obj[i], i, obj) === false) {
                break;
            }
        }
    } else if ((0, _isObject.isObject)(obj)) {
        // 객체
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (cb.call(context || obj, key, obj[key], obj) === false) {
                    break;
                }
            }
        }
    } else {
        //throw new Error('each 함수는 배열이나 객체에만 사용할 수 있습니다.');
    }

    return obj;
};

exports.each = each;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _template = __webpack_require__(10);

var _template2 = _interopRequireDefault(_template);

var _querySelector = __webpack_require__(11);

var _querySelector2 = _interopRequireDefault(_querySelector);

var _querySelectorAll = __webpack_require__(12);

var _querySelectorAll2 = _interopRequireDefault(_querySelectorAll);

var _getElementsByClassName = __webpack_require__(13);

var _getElementsByClassName2 = _interopRequireDefault(_getElementsByClassName);

var _bind = __webpack_require__(6);

var _bind2 = _interopRequireDefault(_bind);

var _matchMedia = __webpack_require__(14);

var _matchMedia2 = _interopRequireDefault(_matchMedia);

var _number = __webpack_require__(15);

var _string = __webpack_require__(21);

var _array = __webpack_require__(22);

var _object = __webpack_require__(23);

var _date = __webpack_require__(24);

var _uri = __webpack_require__(25);

var _dom = __webpack_require__(26);

var _css = __webpack_require__(27);

var _cookie = __webpack_require__(28);

var _util = __webpack_require__(29);

var _class = __webpack_require__(30);

var _env = __webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/** 폴리필 */
// https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills

// import {addonImportJs} from './lib/Addon/importJs';

// import matchMediaAddListenerPolyfill from './lib/Polyfill/matchMediaAddListener'; // IE11 에러
// import picturePolyfill from './lib/Polyfill/picture'; // IE8 에러

/*!
 * 코어 라이브러리
 * @author woonyzzang
 * @email seungwoonjjang@gmail.com
 * @license ISC License
 * @create 180706
 */

// import 'babel-polyfill'; // IE8 에러

// import {global, doc, LIB_NAME as core} from './lib/config';

(0, _template2['default'])();
(0, _querySelector2['default'])();
(0, _querySelectorAll2['default'])();
(0, _getElementsByClassName2['default'])();
(0, _bind2['default'])();
(0, _matchMedia2['default'])();
// matchMediaAddListenerPolyfill();
// picturePolyfill();

/** 코어 확장 기능 */
(0, _number.addonNumber)();
(0, _string.addonString)();
(0, _array.addonArray)();
(0, _object.addonObject)();
(0, _date.addonDate)();
(0, _uri.addonUri)();
(0, _dom.addonDom)();
(0, _css.addonCss3)();
(0, _cookie.addonCookie)();
(0, _util.addonUtil)();
// addonImportJs();
(0, _class.addonClass)();
(0, _env.addonEnv)();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _config = __webpack_require__(0);

/**
 * @name templatePolyfill
 * @description HTML5 템플릿 폴리필 기능 지원
 * @example
 * // Shim so we can style in IE6/7/8
 * 1. CSS안에 template{display:none} 선언
 * <style>template{display:none}</style>
 * 2. HTML 안에 <template>를 렌더링 하기전 head안의 스크립트 선언
 * <head>
 * <script>document.createElement('template');</script>
 * </head>
 * 3. BODY 안에 탬플릿 엘리먼트 사용
 * <body>
 * <template>
 *     <h1>This is template content.</h1>
 *     <p>Its really great.</p>
 * </template>
 * <div id="target">
 *     <p>This is regular old content.</p>
 * </div>
 * </body>
 *
 * @example
 * var $template = document.getElementsByTagName('template')[0];
 * var $target = document.getElementById('target');
 *
 * $target.appendChild($template.content.cloneNode(true));
 */
exports['default'] = function () {
    if ('content' in _config.doc.createElement('template')) {
        // return document.importNode(template.content, true);
        return false;
    } else {
        var template = _config.doc.getElementsByTagName('template'),
            elPlate = void 0,
            qContent = void 0,
            contentLen = void 0,
            docContent = void 0;

        for (var x = 0, len = template.length; x < len; ++x) {
            elPlate = template[x];
            qContent = elPlate.childNodes;
            contentLen = qContent.length;
            docContent = _config.doc.createDocumentFragment();

            while (qContent[0]) {
                docContent.appendChild(qContent[0]);
            }

            elPlate.content = docContent;
        }
    }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _config = __webpack_require__(0);

/**
 * @name querySelectorPolyfill
 * @description 쿼리 셀렉터 폴리필 기능 지원
 * @param {DOMSeletor} selector - DOM 셀렉터
 * @example
 * document.querySelector('#gnb');
 */
exports['default'] = function () {
    if (!_config.doc.querySelector) {
        _config.doc.querySelector = function (selectors) {
            var elements = _config.doc.querySelectorAll(selectors);

            return elements.length ? elements[0] : null;
        };
    }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _config = __webpack_require__(0);

/**
 * @name querySelectorAllPolyfill
 * @description 쿼리 전체 셀렉터 폴리필 기능 지원
 * @param {DOMSeletor} selector - DOM 셀렉터
 * @example
 * document.querySelectorAll('a');
 */
exports['default'] = function () {
            if (!_config.doc.querySelectorAll) {
                        _config.doc.querySelectorAll = function (selectors) {
                                    var style = _config.doc.createElement('style'),
                                        elements = [],
                                        element = void 0;

                                    _config.doc.documentElement.firstChild.appendChild(style);

                                    _config.doc._qsa = [];
                                    style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';

                                    _config.global.scrollBy(0, 0);
                                    style.parentNode.removeChild(style);

                                    while (_config.doc._qsa.length) {
                                                element = _config.doc._qsa.shift();

                                                element.style.removeAttribute('x-qsa');
                                                elements.push(element);
                                    }

                                    _config.doc._qsa = null;

                                    return elements;
                        };
            }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _config = __webpack_require__(0);

/**
 * @name getElementsByClassNamePolyfill
 * @description 클래스 셀렉터 폴리필 기능 지원
 * @param {DOMSeletor} selector - DOM 셀렉터 (class명)
 * @example
 * document.getElementsByClassName('tab_menu');
 */
exports['default'] = function () {
    if (!_config.doc.getElementsByClassName) {
        _config.doc.getElementsByClassName = function (cn) {
            var rx = new RegExp('(?:^|\\s)' + cn + '(?:$|\\s)');
            var allT = _config.doc.getElementsByTagName('*'),
                allCN = [],
                ac = '',
                i = 0,
                a = void 0;

            while (a = allT[i = i + 1]) {
                ac = a.className;

                if (ac && ac.indexOf(cn) !== -1) {
                    if (ac === cn) {
                        allCN[allCN.length] = a;

                        continue;
                    }

                    rx.test(ac) ? allCN[allCN.length] = a : 0;
                }
            }

            return allCN;
        };
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _config = __webpack_require__(0);

/**
 * @name matchMediaPolyfill
 * @description 미디어쿼리 폴리필 기능 지원
 * https://github.com/paulirish/matchMedia.js/
 * https://gist.github.com/benplum/8045336 // IE8 대응
 * @param {String} mediaQuery - CSS 미디어 쿼리
 * @example
 * if (matchMedia('only screen and (max-width: 480px)').matches) {
 *    // smartphone/iphone... maybe run some small-screen related dom scripting?
 * }
 * if (matchMedia('all and (orientation:landscape)').matches) {
 *    // probably tablet in widescreen view
 * }
 */
exports['default'] = function () {
    window.matchMedia || (window.matchMedia = function () {
        var docElem = _config.doc.documentElement,
            refNode = docElem.firstElementChild || docElem.firstChild,

        // fakeBody required for <FF4 when executed in <head>
        fakeBody = _config.doc.createElement('body'),
            div = _config.doc.createElement('div');

        div.id = 'mq-test-1';
        div.style.cssText = 'position:absolute;top:-100em';
        fakeBody.style.background = 'none';
        fakeBody.appendChild(div);

        var mqRun = function mqRun(mq) {
            div.innerHTML = '&shy;<style media="' + mq + '"> #mq-test-1 { width: 42px; }</style>';
            bool = div.offsetWidth === 42;

            docElem.insertBefore(fakeBody, refNode);
            docElem.removeChild(fakeBody);

            return { matches: bool, media: mq };
        },
            getEmValue = function getEmValue() {
            var ret,
                body = docElem.body,
                fakeUsed = false;

            div.style.cssText = "position:absolute;font-size:1em;width:1em";

            if (!body) {
                body = fakeUsed = _config.doc.createElement('body');
                body.style.background = 'none';
            }

            body.appendChild(div);
            docElem.insertBefore(body, docElem.firstChild);

            if (fakeUsed) {
                docElem.removeChild(body);
            } else {
                body.removeChild(div);
            }

            //also update eminpx before returning
            ret = eminpx = parseFloat(div.offsetWidth);

            return ret;
        },


        //cached container for 1em value, populated the first time it's needed
        eminpx,


        // verify that we have support for a simple media query
        mqSupport = mqRun('(min-width: 0px)').matches;

        return function (mq) {
            if (mqSupport) {
                return mqRun(mq);
            } else {
                if (_config.doc.body) {
                    var min = mq.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        max = mq.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        minnull = min === null,
                        maxnull = max === null,
                        currWidth = _config.doc.body.offsetWidth,
                        em = 'em';

                    if (!!min) {
                        min = parseFloat(min) * (min.indexOf(em) > -1 ? eminpx || getEmValue() : 1);
                    }
                    if (!!max) {
                        max = parseFloat(max) * (max.indexOf(em) > -1 ? eminpx || getEmValue() : 1);
                    }

                    bool = (!minnull || !maxnull) && (minnull || currWidth >= min) && (maxnull || currWidth <= max);

                    return { matches: bool, media: mq };
                } else {
                    return { matches: false, media: {} };
                }
            }
        };
    }());
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addonNumber = undefined;

var _core = __webpack_require__(1);

/**
 * 숫자 관련 유틸 함수 모음
 * @namespace
 * @name Core.number
 */
var addonNumber = function addonNumber() {
    _core.Core.define('number', {
        /**
         * 세자릿수 마다 ,(콤마)를 삽입
         * @param {Number} value - 숫자값
         * @return {String} 세자릿수 마다 콤마 삽입 후 반환
         * @example
         * {{LIB_NAME}}.number.addComma(21342); // '21,342'
         */
        addComma: function () {
            var regComma = /(\d+)(\d{3})/;

            return function (value) {
                value += '';

                var x = value.split('.'),
                    x1 = x[0],
                    x2 = x.length > 1 ? '.' + x[1] : '';

                while (regComma.test(x1)) {
                    x1 = x1.replace(regComma, '$1' + ',' + '$2');
                }

                return x1 + x2;
            };
        }(),

        /**
         * min ~ max사이의 랜덤값 반환
         * @param {Number} min - 최소값
         * @param {Number} max - 최대값
         * @return {Number} 랜덤값 반환
         */
        random: function random(min, max) {
            if (!max) {
                max = min;
                min = 0;
            }

            return min + Math.floor(Math.random() * (max - min + 1));
        },

        /**
         * value가 min보다 작을 경우 min을, max보다 클 경우 max를 반환
         * @param {Number} value - 기준값
         * @param {Number} min - 최소값
         * @param {Number} max - 최대값
         * @return {Number} 상하한값을 반환
         */
        limit: function limit(value, min, max) {
            if (value < min) {
                return min;
            } else if (value > max) {
                return max;
            }

            return value;
        },

        /**
         * 어떠한 경우에도 숫자로 변환(뒤에 있는 숫자외의 문자를 제거한 후 숫자만 추출)
         * @param {*} value - 숫자 + 문자가 포함된 값
         * @return {Number} 숫자 반환
         * @example
         * {{LIB_NAME}}.number.parse('100만원'); // 100
         */
        parse: function parse(value) {
            value = (value || '').toString().replace(/[^-0-9\.]+$/, '');
            value = value * 1;

            return isNaN(value) ? 0 : value;
        },

        /**
         * 수를 한글로 변환
         * @param {Number} num - 숫자
         * @return {String} 한글로 변환된 값 반환
         * @example
         * {{LIB_NAME}}.number.toKor(123456); // 십이만삼천사백오십육
         */
        toKor: function toKor(num) {
            var nums = [],
                sign = '',
                c = 0,
                c2 = 0,
                result = '',
                ch = '';
            var kor = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'],
                unit = ['', '십', '백', '천'],
                unit2 = ['', '만', '억', '조', '경', '해'];

            if (typeof num === null) {
                return '';
            }

            num = num + '';

            if (num === '0') {
                return '영';
            }

            if (num.substr(0, 1) === '-') {
                sign = '마이너스 ';
                num = num.substr(1);
            }

            nums = num.split('');

            for (var i = nums.length - 1; i >= 0; i--, c++) {
                if (c > 0 && c % 4 === 0) {
                    c2++;
                }
                if (!(ch = kor[nums[i]])) {
                    continue;
                }

                if (c % 4 === 0) {
                    result = unit2[c2] + result; // 만, 억, 조, 경, 해

                    if (ch === '일' && i === 0 && c2 <= 1) {
                        ch = '';
                    }
                } else {
                    if (ch === '일') {
                        ch = '';
                    }
                }

                if (ch += unit[c % 4]) {
                    result = ch + result;
                }
            }

            return sign + result;
        }
    });

    /** 코어 별칭 */
    _core.Core.comma = _core.Core.number.addComma;
};

exports.addonNumber = addonNumber;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.debug = undefined;

var _config = __webpack_require__(0);

_config.global['LIB_DEV_DEBUG'] = false;

/**
 * debug
 * @description 로그 확인
 * @example
 * {{LIB_NAME}}.debug.log();
 * {{LIB_NAME}}.debug.logs();
 */
var debug = function () {
    var $debugDiv = _config.doc.createElement('div');

    $debugDiv.id = 'debug';
    $debugDiv.className = 'ui_debug';
    $debugDiv.setAttribute('style', 'overflow:auto;position:fixed;bottom:20px;right:20px;left:20px;z-index:10000;height:8%;padding:10px;border:2px solid #f00;background-color:#eee');

    /** [Polyfill] console */
    if (!_config.global.console) {
        // 데스크탑 로그 확인용(콘솔을 지원하지 않는 브라우저를 위해 출력요소를 생성)
        _config.global.console = {};

        if (_config.global['LIB_DEV_DEBUG']) {
            if (!_config.doc.getElementById('debug')) {
                _config.doc.body.appendChild($debugDiv);
            }
        }

        $debugDiv = _config.doc.getElementById('debug');

        var consoleMethods = ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd', 'trace'];

        for (var i = -1, method; method = consoleMethods[++i];) {
            (function (method) {
                _config.global.console[method] = _config.global['LIB_DEV_DEBUG'] ? function () {
                    while ($debugDiv.firstChild) {
                        $debugDiv.removeChild($debugDiv.firstChild);
                    }

                    $debugDiv.innerHTML = '<div style="font-size:12px;">&gt; <span>[' + method + ']</span> ' + [].slice.call(arguments).join(', ') + '</div>';
                } : function () {};
            })(method);
        }
    }

    return {
        mode: false, // 디버깅 여부

        /**
         * 모바일 로그 확인용(클린)
         * @name {{LIB_NAME}}.degug.log
         * @example
         * {{LIB_NAME}}.degug.log('...');
         */
        log: function log() {
            if (!_config.doc.getElementById('debug')) {
                _config.doc.body.appendChild($debugDiv);
            }

            $debugDiv = _config.doc.getElementById('debug');

            var consoleMethods = ['log'];

            for (var _i = -1, _method; _method = consoleMethods[++_i];) {
                while ($debugDiv.firstChild) {
                    $debugDiv.removeChild($debugDiv.firstChild);
                }

                $debugDiv.innerHTML = '<div style="font-size:12px;">&gt; <span>[' + _method + ']</span> ' + [].slice.call(arguments).join(', ') + '</div>';
            }
        },

        /**
         * 모바일 로그 확인용
         * @name {{LIB_NAME}}.degug.logs
         * @example
         * {{LIB_NAME}}.degug.logs('...');
         */
        logs: function logs() {
            // 모바일 로그 확인용
            if (!_config.doc.getElementById('debug')) {
                _config.doc.body.appendChild($debugDiv);
            }

            $debugDiv = _config.doc.getElementById('debug');

            var $outputDiv = _config.doc.createElement('div');
            var consoleMethods = ['log'];

            for (var _i2 = -1, _method2; _method2 = consoleMethods[++_i2];) {
                $outputDiv.innerHTML = '<div style="font-size:12px;">&gt; <span>[' + _method2 + ' ' + $debugDiv.childNodes.length + ']</span> ' + [].slice.call(arguments).join(', ') + '</div>';

                $debugDiv.insertBefore($outputDiv, $debugDiv.firstChild);
            }
        }
    };
}();

exports.debug = debug;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isObject = undefined;

var _isType = __webpack_require__(3);

/**
 * isObject
 * @description 객체 타입 여부 확인
 * @param {Array} arr - 함수
 * @return {Boolean} 타입이 함수인지 확인 후 불린값을 반환
 * @api
 * isObject(*)
 * @example
 * isObject(new Object()); // true
 */
var isObject = function isObject(obj) {
  return (0, _isType.isType)(obj, 'object');
};

exports.isObject = isObject;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.reverse = undefined;

var _isArray = __webpack_require__(5);

/**
 * reverse
 * @description 역순 반복 함수(배열 타입만 유효)
 * @param {Array} arr - 배열
 * @param {Function} cb - 콜백함수
 * @param {*} context - 컨텍스트
 * @return {Array} 배열 원형 반환
 * @api
 * reverse(object, function)
 * @example
 * reverse(['a', 'b', 'c', 'd'], function(value, index, array) {
 *     alert('value:' + value + ', index:' + index);
 *     if (value === 'b') { return false; } // false 를 반환하면 순환을 멈춘다.
 * });
 */
var reverse = function reverse(arr, cb, context) {
    if (!arr) {
        return arr;
    }

    if ((0, _isArray.isArray)(arr)) {
        for (var i = arr.length - 1; i >= 0; i--) {
            if (cb.call(context || arr, arr[i], i, arr) === false) {
                break;
            }
        }
    } else {
        throw new Error('reverse 함수는 배열에만 사용할 수 있습니다.');
    }

    return arr;
};

exports.reverse = reverse;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.extend = undefined;

var _isArray = __webpack_require__(5);

var _isPlainObject = __webpack_require__(4);

var _each = __webpack_require__(7);

/**
 * extend
 * @description 객체 확장 함수
 * @param {Boolean} [deep] - 깊은 확장 여부 옵션값
 * @param {Object} target - 원본객체
 * @param {Object} obj - 확장객체
 * @return {Object} 원본객체 + 확장객체를 병합해서 하나의 객체로 반환한다.
 * @api
 * extend([deep,] target, object1 [, extendN])
 * @example
 * var obj1 = {apple: 0, banana: { weight: 52, price: 100 }, cherry: 97};
 * var obj2 = {banana: { price: 200 }, durian: 100};
 * extend(obj1, obj2);
 * extend(true, obj1, obj2);
 */
var extend = function extend(target, obj) {
    var args = {};

    // if (!isArray(obj) || !isObject(obj)) { throw new Error('extend 함수는 배열이나 객체 타입만 확장할 수 있습니다.'); }

    if (target === true) {
        args = Array.prototype.slice.call(arguments, 2);
    } else {
        args = Array.prototype.slice.call(arguments, 1);
        obj = target;
        target = false;
    }

    (0, _each.each)(args, function (source) {
        if (!source) {
            return;
        }

        (0, _each.each)(source, function (key, value) {
            var isArr = (0, _isArray.isArray)(value);

            if (target && (isArr || (0, _isPlainObject.isPlainObject)(value))) {
                obj[key] || (obj[key] = isArr ? [] : {});
                obj[key] = extend(target, obj[key], value);
            } else {
                obj[key] = value;
            }
        });
    });

    return obj;
};

exports.extend = extend;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * clone
 * @description 객체 복제 함수
 * @param {Array|Object} obj 배열 및 json객체
 * @return {Array|Object} 깊은 객체 복사 후 반환한다.
 * @api
 * clone(object)
 * @example
 * var ori = {a: 'A', b: [1, 2, 3]};
 * var clone = clone(ori); // {a: 'A', b: [1, 2, 3]};
 * // ori 복제본, ori를 변경하여도 clone은 변하지 않는다.
 */
var clone = function clone(obj) {
    if (typeof obj === null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        var copy = new Date();

        copy.setTime(obj.getTime());

        return copy;
    } else if (obj instanceof Array) {
        var _copy = [];

        for (var i = 0, len = obj.length; i < len; i++) {
            _copy[i] = clone(obj[i]);
        }

        return _copy;
    } else if (obj instanceof Object) {
        var _copy2 = {};

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                _copy2[key] = clone(obj[key]);
            }
        }

        return _copy2;
    } else {
        throw new Error('복제 실패');
    }
};

exports.clone = clone;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addonString = undefined;

var _core = __webpack_require__(1);

/**
 * 문자열 관련 유틸 함수 모음
 * @namespace
 * @name Core.string
 */
var addonString = function addonString() {
    _core.Core.define('string', function () {
        var escapeChars = {
            '&': '&amp;',
            '>': '&gt;',
            '<': '&lt;',
            '"': '&quot;',
            "'": '&#39;'
        },
            unescapeChars = function (escapeChars) {
            var results = {};

            _core.Core.each(escapeChars, function (v, k) {
                results[v] = k;
            });

            return results;
        }(escapeChars),
            escapeRegexp = /[&><'"]/g,
            unescapeRegexp = /\&[^;]+;/g,
            // /(&amp;|&gt;|&lt;|&quot;|&#39;|&#[0-9]{1,5};)/g,
        tagRegexp = /<\/?[^>]+>/gi,
            scriptRegexp = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/ig,
            hexRegexp = /^\&#x([\da-fA-F]+);$/;

        return {
            /**
             * 앞뒤 빈문자열을 제거
             * @param {String} value - 문자값
             * @return {String} 공백 제거 후 문자 반환
             * @example
             * {{LIB_NAME}}.string.trim(' abc '); // 'abc'
             */
            trim: function trim(value) {
                return value ? value.replace(/^\s+|\s+$/g, '') : value;
            },

            /**
             * 정규식이나 검색문자열을 사용하여 문자열에서 텍스트를 교체
             * @param {String} value - 교체를 수행할 문자열
             * @param {RegExp|String} - find 검색할 문자열이나 정규식 패턴
             * @param {String} rep - 대체할 문자열
             * @return {String} 대체된 결과 문자열
             * @example
             * {{LIB_NAME}}.string.replaceAll('a,b,c,d', ',', ''); // 'abcd'
             */
            replaceAll: function replaceAll(value, find, rep) {
                if (find.constructor === RegExp) {
                    return value.replace(new RegExp(find.toString().replace(/^\/|\/$/gi, ''), 'gi'), rep);
                }

                return value.split(find).join(rep);
            },

            /**
             * 주어진 문자열의 바이트길이 반환
             * @param {String} value - 길이를 계산할 문자열
             * @return {Number} 문자열 바이트 반환
             * @example
             * {{LIB_NAME}}.string.byteSize('동해물과'); // euckr:8byte, utf8:12byte
             */
            byteSize: function byteSize(value) {
                if (!value) {
                    return 0;
                }

                return encodeURIComponent(value).replace(/%[A-F\d]{2}/g, 'U').length;
            },

            /**
             * 주어진 path에서 파일명을 추출
             * @param {String} str - path경로
             * @return {String} 경로가 제거된 파일명 반환
             * @example
             * {{LIB_NAME}}.string.getFileName('etc/bin/jslib.js'); // 'jslib.js'
             */
            getFileName: function getFileName(str) {
                var paths = str.split(/\/|\\/g);

                return paths[paths.length - 1];
            },

            /**
             * 주어진 path에서 확장자를 추출
             * @param {String} fname - path문자열
             * @return {String} 경로가 제거된 확장자 반환
             * @example
             * {{LIB_NAME}}.string.getFileExt('etc/bin/jslib.js'); // 'js'
             */
            getFileExt: function getFileExt(fname) {
                fname || (fname = '');

                return fname.substr((~-fname.lastIndexOf('.') >>> 0) + 2);
            },

            /**
             * 주어진 문자열을 지정된 길이만큼 자른 후, 꼬리글을 덧붙여 반환
             * @param {String} value - 문자열
             * @param {Number} length - 잘라낼 길이
             * @param {String='...'} [truncation = '...'] - 꼬리글
             * @return {String} 결과 문자열 반환
             * @example
             * {{LIB_NAME}}.string.cut('동해물과', 3, '...'); // '동해물...'
             */
            cut: function cut(value, length, truncation) {
                var str = value;

                truncation || (truncation = '');

                if (str.length > length) {
                    return str.substring(0, length) + truncation;
                }

                return str;
            },

            /**
             * 주어진 문자열을 지정된 길이(바이트)만큼 자른 후, 꼬리글을 덧붙여 반환
             * @param {String} value - 문자열
             * @param {Number} length - 잘라낼 길이
             * @param {String='...'} [truncation = '...'] - 꼬리글
             * @return {String} 결과 문자열 반환
             * @example
             * {{LIB_NAME}}.string.cutByByte('동해물과', 3, '...'); // '동...'
             */
            cutByByte: function cutByByte(value, length, truncation) {
                var str = value,
                    chars = this.indexByByte(value, length);

                truncation || (truncation = '');

                if (str.length > chars) {
                    return str.substring(0, chars) + truncation;
                }

                return str;
            },

            /**
             * 주어진 바이트길이에 해당하는 char index 반환(UTF-8 상에서 한글은 3바이트로 계산)
             * @param {String} value - 문자열
             * @param {Number} length - 제한 문자수
             * @return {Number} 결과 문자열에 해당하는 char index 반환
             * @example
             * {{LIB_NAME}}.string.indexByByte('동해물과', 3); // 2
             */
            indexByByte: function indexByByte(value, length) {
                var len = void 0,
                    i = void 0,
                    c = void 0;

                if (typeof value !== 'string') {
                    return 0;
                }

                for (len = i = 0; c = value.charCodeAt(i++);) {
                    len += c >> 11 ? 3 : c >> 7 ? 2 : 1;

                    if (len > length) {
                        return i > 0 ? i - 1 : 0;
                    }
                }

                return i;
            },

            /**
             * 첫글자를 대문자로 변환하고 이후의 문자들은 소문자로 변환
             * @param {String} value - 문자열
             * @return {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.capitalize('abCdEfg'); // 'Abcdefg'
             */
            capitalize: function capitalize(value) {
                return value ? value.charAt(0).toUpperCase() + value.substring(1) : value;
            },

            /**
             * 첫글자를 소문자로 변환
             * @param {String} value - 문자열
             * @returns {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.toFirstLower('Welcome'); // 'welcome'
             */
            toFirstLower: function toFirstLower(value) {
                return value ? value.replace(/^[A-Z]/, function (s) {
                    return s.toLowerCase();
                }) : value;
            },

            /**
             * 카멜 형식으로 변환
             * @param {String} value - 문자열
             * @return {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.camelize('ab-cd-efg'); // 'abCdEfg'
             */
            camelize: function camelize(value) {
                return value ? value.replace(/(\-|_|\s)+(.)?/g, function (a, b, c) {
                    return c ? c.toUpperCase() : '';
                }) : value;
            },

            /**
             * 대쉬 형식으로 변환
             * @param {String} value - 문자열
             * @return {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.dasherize('abCdEfg'); // 'ab-cd-efg'
             */
            dasherize: function dasherize(value) {
                return value ? value.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase() : value;
            },

            /**
             * 주어진 문자열을 지정한 수만큼 연속적으로 반복하여 조합
             * @param {String} value - 문자열
             * @param {Number} cnt - 반복 횟수
             * @return {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.repeat('ab', 4); // 'abababab'
             */
            repeat: function repeat(value, cnt, sep) {
                sep || (sep = '');

                var result = [];

                for (var i = 0; i < cnt; i++) {
                    result.push(value);
                }

                return result.join(sep);
            },

            /**
             * 특수기호를 HTML ENTITY로 변환
             * @param {String} value - 특수기호
             * @return {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.escapeHTML('<div><a href="#">링크</a></div>'); // "&lt;div&gt;&lt;a href=&quot;#&quot;&gt;링크&lt;/a&gt;&lt;/div&gt;"
             */
            escapeHTML: function escapeHTML(value) {
                return value ? (value + '').replace(escapeRegexp, function (m) {
                    return escapeChars[m];
                }) : value;
            },

            /**
             * HTML ENTITY로 변환된 문자열을 원래 특수기호로 변환
             * @param {String} value - 문자열
             * @return {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.unescapeHTML('&lt;div&gt;&lt;a href=&quot;#&quot;&gt;링크&lt;/a&gt;&lt;/div&gt;');  // '<div><a href="#">링크</a></div>'
             */
            unescapeHTML: function () {
                return function (value) {
                    var temp = doc.createElement('div'),
                        result = '';

                    temp.innerHTML = value;

                    for (var i = -1, item; item = temp.childNodes[++i];) {
                        result += item.nodeValue;
                    }

                    temp = null;

                    return result;
                };
            }(),

            /**
             * value === these 이면 other 를,  value !== these 이면 value 를 반환
             * @param {String} value - 현재 상태값
             * @param {String} these - 첫번째 상태값
             * @param {String} other - 두번째 상태값
             * @return {String} 토글된 상태값 반환
             * @example
             * // 정렬버튼에 이용
             * {{LIB_NAME}}.string.toggle('ASC', 'ASC', 'DESC'); // 'DESC'
             * {{LIB_NAME}}.string.toggle('DESC', 'ASC', 'DESC'); // 'ASC'
             */
            toggle: function toggle(value, these, other) {
                return value === these ? other : value;
            },

            /**
             * 주어진 문자열에 있는 {인덱스} 부분을 주어진 인수에 해당하는 값으로 치환 후 반환
             * @param {String} format - 문자열
             * @param {String|Object} val - 대체할 문자열
             * @return {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.format('{0}:{1}:{2} {0}', 'a', 'b', 'c');  // 'a:b:c a'
             * {{LIB_NAME}}.string.format('{a}:{b}:{c} {d}', {a: 'a', b: 'b', c: 'c', d: 'd'});  // 'a:b:c a'
             */
            format: function format(_format, val) {
                var args = _core.Core.array.toArray(arguments).slice(1),
                    isJson = _core.Core.is(val, 'object');

                return _format.replace(/\{([0-9a-z_]+)\}/ig, function (m, i) {
                    return isJson ? val[i] : args[i] || '';
                });
            },

            /**
             * 문자열을 HTML ENTITIES로 변환
             * @param {String} value - HTML 특수기호
             * @return {String} HTML 엔티티코드 반환
             * @example
             * {{LIB_NAME}}.string.toEntities('/'); // '&#47'
             */
            toEntities: function toEntities(value) {
                var buffer = [];

                for (var i = 0, len = value.length; i < len; i++) {
                    buffer.push('&#', value.charCodeAt(i).toString(), ';');
                }

                return buffer.join('');
            },

            /**
             * 랜덤문자열 생성
             * @param {Number} len - 길이
             * @return {String} 랜덤문자열 반환
             * @example
             * {{LIB_NAME}}.string.random(10); // '4r1kf9piku'
             */
            random: function random(len) {
                var keystr = '',
                    x = 0;

                for (var i = 0; i < len; i++) {
                    x = Math.floor(Math.random() * 36);

                    if (x < 10) {
                        keystr += String(x);
                    } else {
                        keystr += String.fromCharCode(x + 87);
                    }
                }

                return keystr;
            },

            /**
             * 주어진 문자열에서 HTML를 제거
             * @param {string} value - 문자열
             * @return {string} 태그가 제거된 문자열
             * @example
             * {{LIB_NAME}}.string.stripTags('welcome to <b>the</b> jungle'); // 'welcome to the jungle'
             */
            stripTags: function stripTags(value) {
                return (value || '').toString().replace(tagRegexp, '');
            },

            /**
             * 주어진 문자열에서 스크립트를 제거
             * @param {string} value - 문자열
             * @return {string} 스크립트가 제거된 문자열
             * @example
             * {{LIB_NAME}}.string.stripScripts('welcome <s'+'cript>alert('hello');</s'+'cript> to the jungle'); // 'welcome to the jungle'
             */
            stripScripts: function stripScripts(value) {
                return (value || '').toString().replace(scriptRegexp, '');
            },

            /**
             * 주어진 문자열에서 한글 존재 여부 체크
             * @param {string} value - 문자열
             * @param {string} type - 옵션 구분자 ('ONLY' || 'INCLUDE')
             * @return {boolean} 결과값
             * @example
             * {{LIB_NAME}}.string.isKor('한글여부1', 'ONLY'); // false
             */
            isKor: function isKor(value, type) {
                var check = void 0;

                switch (type) {
                    case 'ONLY':
                        check = /([^ㄱ-ㅎㅏ-ㅣ가-힣])/i;

                        if (check.test(value)) {
                            return false;
                        } else {
                            return true;
                        }

                        break;
                    case 'INCLUDE':
                        check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

                        if (check.test(value)) {
                            return true;
                        } else {
                            return false;
                        }

                        break;
                }
            }
        };
    });
};

exports.addonString = addonString;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addonArray = undefined;

var _core = __webpack_require__(1);

/**
 * 배열관련 유틸함수
 * @namespace
 * @name Core.array
 */
var addonArray = function addonArray() {
    _core.Core.define('array', function () {
        /**
         * 네이티브 배열 프로토타입 속성 및 메서드 기능 지원 확인
         * @name {{LIB_NAME}}.array.nativeCall
         * @param {Function} f - 네이티브 배열 프로토타입 기능
         * @return {Function|Boolean} 네이티브 배열 프로토타입에 f가 존재하지 않으면 false 반환
         * @exmaple
         * {{LIB_NAME}}.array.nativeCall(Array.prototype.map)
         */
        function nativeCall(f) {
            return f ? function (obj) {
                return f.apply(obj, Array.prototype.slice.call(arguments, 1));
            } : false;
        }

        return {
            /**
             * 배열 병합
             * @name {{LIB_NAME}}.array.append
             * @param {Array} array - 원본 배열
             * @param {...*} var_args - 합칠 요소들
             * @return {Array} 모두 합쳐진 배열
             * @exmaple
             * var newArray = {{LIB_NAME}}.array.append([1,2,3], [4,5,6], [6, 7, 8]); // [1,2,3,4,5,6,7,8]
             */
            append: function append(array) {
                var args = Array.prototype.slice.call(arguments);

                return Array.prototype.concat.apply([], args);
            },

            /**
             * 콜백함수로 하여금 요소를 가공하는 함수
             * @name {{LIB_NAME}}.array.map
             * @param {Array} array - 배열
             * @param {ArrayCallback} cb - 콜백함수
             * @param {Object} (optional) - 컨텍스트
             * @return {Array} 기공된 배열
             * @example
             * {{LIB_NAME}}.array.map([1, 2, 3], function(item, index) {
             *     return item * 10;
             * });
             * // [10, 20, 30]
             */
            map: nativeCall(Array.prototype.map) || function (array, cb, context) {
                var results = [];

                if (!_core.Core.is(obj, 'array') || !_core.Core.is(cb, 'function')) {
                    return results;
                }

                for (var i = 0, len = array.length; i < len; i++) {
                    results[results.length] = cb.call(context || array, array[i], i, array);
                }

                return results;
            },

            /**
             * 반복자함수의 반환값이 true가 아닐 때까지 반복
             * @name {{LIB_NAME}}.array.every
             * @param {Array} array - 배열
             * @param {ArrayCallback} cb - 함수
             * @return {Boolean} 최종 결과
             * @example
             * {{LIB_NAME}}.array.every([1, 3, 5, 7], function(value) {
             *     return value > 5;
             * });
             * // false
             */
            every: nativeCall(Array.prototype.every) || function (array, cb, context) {
                var isTrue = true;

                if (!_core.Core.is(array, 'array') || !_core.Core.is(cb, 'function')) {
                    return isTrue;
                }

                _core.Core.each(array, function (value, index) {
                    if (cb.call(context || this, value, index) !== true) {
                        return isTrue = false;
                    }
                });

                return isTrue;
            },

            /**
             * 반복자함수의 반환값이 true일 때까지 반복
             * @name {{LIB_NAME}}.array.any
             * @param {Array} array 배열
             * @param {ArrayCallback} cb 콜백함수
             * @return {Boolean} 최종 결과
             * @example
             * {{LIB_NAME}}.array.any([1, 3, 5, 7], function(val) {
             *     return val < 5;
             * });
             * // true
             */
            any: nativeCall(Array.prototype.any) || function (array, cb, context) {
                var isTrue = false;

                if (!_core.Core.is(array, 'array') || !_core.Core.is(cb, 'function')) {
                    return isTrue;
                }

                _core.Core.each(array, function (value, index) {
                    if (cb.call(context || this, value, index) === true) {
                        return isTrue = true;
                    }
                });

                return isTrue;
            },

            /**
             * 배열 요소의 순서를 섞어주는 함수
             * @name {{LIB_NAME}}.array.shuffle
             * @param {Array} array - 배열
             * @return {Array} 순서가 섞인 새로운 배열
             * @example
             * {{LIB_NAME}}.array.shuffle([1, 3, 4, 6, 7, 8]); // [6, 3, 8, 4, 1, 7]
             */
            shuffle: function shuffle(array) {
                var rand = 0,
                    index = 0,
                    shuffled = [],
                    number = _core.Core.number;

                _core.Core.each(array, function (value) {
                    rand = number.random(index++);
                    shuffled[index - 1] = shuffled[rand], shuffled[rand] = value;
                });

                return shuffled;
            },

            /**
             * 콜백함수로 하여금 요소를 걸려내는 함수
             * @name {{LIB_NAME}}.array.filter
             * @param {Array} array - 배열
             * @param {Function(value, index)} cb - 콜백함수
             * @param {*=} (optional) 컨텍스트
             * @returns {Array}
             * @example
             * {{LIB_NAME}}.array.filter([1, '일', 2, '이', 3, '삼'], function(item, index) {
             *     return (typeof item === 'string');
             * });
             * // ['일','이','삼']
             */
            filter: nativeCall(Array.prototype.filter) || function (array, cb, context) {
                var results = [];

                if (!_core.Core.is(array, 'array') || !_core.Core.is(cb, 'function')) {
                    return results;
                }

                for (var i = 0, len = array.length; i < len; i++) {
                    cb.call(context || array, array[i], i, array) && (results[results.length] = array[i]);
                }

                return results;
            },

            /**
             * 주어진 인덱스의 요소를 반환
             * @name {{LIB_NAME}}.array.indexOf
             * @param {Array} array - 배열
             * @param {*} value - 찾을 값
             * @return {Number}
             * @example
             * {{LIB_NAME}}.array.indexOf([1, '일', 2, '이', 3, '삼'], '일');  // 1
             */
            indexOf: nativeCall(Array.prototype.indexOf) || function (array, value, b) {
                for (var i = 0, len = array.length; i < len; i++) {
                    if (b !== false && array[i] === value || b === false && array[i] == value) {
                        return i;
                    }
                }

                return -1;
            },

            /**
             * 주어진 배열에 지정된 값이 존재하는지 체크
             * @name {{LIB_NAME}}.array.include
             * @param {Array} array - 배열
             * @param {*} value - 찾을 값
             * @return {Boolean}
             * @example
             * {{LIB_NAME}}.array.include([1, '일', 2, '이', 3, '삼'], '삼');  // true
             */
            include: function include(array, value, b) {
                if (!_core.Core.is(array, 'array')) {
                    return value;
                }

                if (_core.Core.is(value, 'function')) {
                    for (var i = 0, len = array.length; i < len; i++) {
                        if (value(array[i], i) === true) {
                            return true;
                        }
                    }

                    return false;
                }

                return this.indexOf(array, value, b) > -1;
            },

            /**
             * 주어진 배열에서 index에 해당하는 요소를 삭제
             * @name {{LIB_NAME}}.array.removeAt
             * @param {Array} value 배열
             * @param {Number} index 삭제할 인덱스 or 요소
             * @return {Array} 지정한 요소가 삭제된 배열
             * @example
             * {{LIB_NAME}}.array.removeAt([1, 2, 3, 4], 1); // [1, 3, 4]
             */
            removeAt: function removeAt(value, index) {
                if (!_core.Core.is(value, 'array')) {
                    return value;
                }

                value.splice(index, 1);

                return value;
            },

            /**
             * 주어진 배열에서 해당하는 요소를 삭제
             * @name {{LIB_NAME}}.array.remove
             * @param {Array} value - 배열
             * @param {*|Function(value, index)} iter - 요소 및 필터콜백
             * @return {Array} 지정한 요소가 삭제된 배열
             * @example
             * {{LIB_NAME}}.array.remove(['a', 'b', 'c'], 'b'); // ['a', 'c']
             * {{LIB_NAME}}.array.remove(['a', 'b', 'c'], function(value) {
             *     return value === 'b';
             * }); // ['a', 'c']
             */
            remove: function remove(value, iter) {
                if (!_core.Core.is(value, 'array')) {
                    return value;
                }

                if (typeof iter === 'function') {
                    for (var i = value.length, item; item = value[--i];) {
                        if (iter(item, i) === true) {
                            value = this.removeAt(value, i);
                        }
                    }

                    return value;
                } else {
                    var index = this.indexOf(value, iter);

                    if (index < 0) {
                        return value;
                    }

                    return this.removeAt(value, index);
                }
            },

            /**
             * 주어진 배열에서 가장 큰 요소를 반환
             * @name {{LIB_NAME}}.array.max
             * @param {Array} array - 배열
             * @return {Number} 최대값
             * @example
             * {{LIB_NAME}}.array.max([2, 1, 3, 5, 2, 8]); // 8
             */
            max: function max(array) {
                return Math.max.apply(Math, array);
            },

            /**
             * 주어진 배열에서 가장 작은 요소를 반환
             * @name {{LIB_NAME}}.array.min
             * @param {Array} array - 배열
             * @return {Number} 최소값
             * @example
             * {{LIB_NAME}}.array.min([2, 1, 3, 5, 2, 8]); // 1
             */
            min: function min(array) {
                return Math.min.apply(Math, array);
            },

            /**
             * 배열의 요소를 역순으로 재배치
             * @name {{LIB_NAME}}.array.reverse
             * @param {Array} array - 배열
             * @return {Array} 역순으로 정렬된 새로운 배열
             * @example
             * {{LIB_NAME}}.array.reverse([1, 2, 3]); // [3, 2, 1]
             */
            reverse: nativeCall(Array.prototype.reverse) || function (array) {
                var tmp = null,
                    first = void 0,
                    last = void 0;
                var length = array.length;

                for (first = 0, last = length - 1; first < length / 2; first++, last--) {
                    tmp = array[first];
                    array[first] = array[last];
                    array[last] = tmp;
                }

                return array;
            },

            /**
             * 두 배열의 차집합을 반환
             * @name {{LIB_NAME}}.array.different
             * @param {Array} array1 - 배열1
             * @param {Array} array2 - 배열2
             * @returns {Array} 차집합 배열
             * @example
             * {{LIB_NAME}}.array.different([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]); // [1, 2, 6, 7]
             */
            different: function different(array1, array2) {
                var newArr = [];

                _core.Core.each(array1, function (value) {
                    if (_core.Core.array.indexOf(array2, value) < 0) {
                        newArr.push(value);
                    }
                });

                _core.Core.each(array2, function (value) {
                    if (_core.Core.array.indexOf(array1, value) < 0) {
                        newArr.push(value);
                    }
                });

                return newArr;
            },

            /**
             * 배열요소들의 합을 반환
             * @name {{LIB_NAME}}.array.sum
             * @param {Array} array - 배열
             * @return {number}
             * @example
             * {{LIB_NAME}}.array.sum([1, 2, 3]); // 6
             */
            sum: function sum(array) {
                var total = 0;

                _core.Core.each(array, function (value) {
                    total += value | 0;
                });

                return total;
            },

            /**
             * 주어진 값을 배열로 변환
             * @name {{LIB_NAME}}.array.toArray
             * @param {*} value 배열로 변환하고자 하는 값
             * @return {Array}
             * @example
             * {{LIB_NAME}}.toArray('abcd'); // ['a', 'b', 'c', 'd']
             * {{LIB_NAME}}.toArray(arguments);  // arguments를 객체를 array로 변환하여 Array에서 지원하는 유틸함수(slice, reverse ...)를 쓸수 있다.
             */
            toArray: function toArray(value) {
                try {
                    return Array.prototype.slice.apply(value, Array.prototype.slice.call(arguments, 1));
                } catch (e) {}

                var ret = [];

                try {
                    for (var i = 0, len = value.length; i < len; i++) {
                        ret.push(value[i]);
                    }
                } catch (e) {}

                return ret;
            }
        };
    });
};

exports.addonArray = addonArray;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addonObject = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _config = __webpack_require__(0);

var _core = __webpack_require__(1);

var _isPlainObject = __webpack_require__(4);

/**
 * JSON객체 관련 유틸함수
 * @namespace
 * @name {{LIB_NAME}}.object
 */
var addonObject = function addonObject() {
    _core.Core.define('object', {
        /**
         * 객체의 열거가능한 속성 및 메서드 이름을 배열로 반환
         * @name {{LIB_NAME}}.object.keys
         * @param {Object} obj - 리터럴 객체
         * @return {Array} 객체의 열거가능한 속성의 이름이 포함된 배열
         * @example
         * {{LIB_NAME}}.object.keys({name: 'Axl rose', age: 50}); // ['name', 'age']
         */
        keys: Object.keys || function (obj) {
            var results = [];

            _core.Core.each(obj, function (key, value) {
                results.push(value);
            });

            return results;
        },

        /**
         * 객체의 열거가능한 속성의 값을 배열로 반환
         * @name {{LIB_NAME}}.object.values
         * @param {Object} obj - 리터럴 객체
         * @return {Array} 객체의 열거가능한 속성의 값들이 포함된 배열
         * @example
         * {{LIB_NAME}}.object.values({name: 'Axl rose', age: 50}); // ['Axl rose', 50]
         */
        values: Object.values || function (obj) {
            var results = [];

            _core.Core.each(obj, function (value) {
                results.push(value);
            });

            return results;
        },

        /**
         * 콜백함수로 바탕으로 각 요소를 가공하는 함수
         * @name {{LIB_NAME}}.object.map
         * @param {Object} obj 객체
         * @param {Function(value, index)} cb - 콜백함수
         * @return {Object}
         * @example
         * {{LIB_NAME}}.object.map({1; 'one', 2: 'two', 3: 'three'}, function(item, key) {
         *     return item + '__';
         * });
         * // {1: 'one__', 2: 'two__', 3: 'three__'}
         */
        map: function map(obj, cb) {
            if (!_core.Core.is(obj, 'object') || !_core.Core.is(cb, 'function')) {
                return obj;
            }

            var results = {};

            _core.Core.each(obj, function (v, k) {
                results[k] = cb(obj[k], k, obj);
            });

            return results;
        },

        /**
         * 요소가 있는 json 객체인지 체크
         * @name {{LIB_NAME}}.object.hasObject
         * @param {Object} obj - json객체
         * @return {Boolean} 요소가 하나라도 있는지 여부
         * @example
         * var obj1 = {};
         * var obj2 = {a: 'A'};
         * {{LIB_NAME}}.object.hasObject(obj1); // false
         * {{LIB_NAME}}.object.hasObject(obj2); // true
         */
        hasObject: function hasObject(obj) {
            if (!_core.Core.is(obj, 'object')) {
                return false;
            }

            var has = false;

            _core.Core.each(obj, function () {
                return has = true;
            });

            return has;
        },

        /**
         * 객체를 쿼리스크링으로 변환
         * @name {{LIB_NAME}}.object.toQueryString
         * @param {Object} obj - json객체
         * @param {Boolean} [isEncode = true] - URL 인코딩할지 여부
         * @return {String} 결과 문자열 반환
         * @example
         * {{LIB_NAME}}.object.toQueryString({a:1, b: 2, c: {d: 4}}); // 'a=1&b=2&c[d]=4'
         * {{LIB_NAME}}.object.toQueryString({google:'https://www.google.co.kr/'}, true); // 'google=https%3A%2F%2Fwww.google.co.kr%2F'
         */
        toQueryString: function toQueryString(params, isEncode) {
            if (typeof params === 'string') {
                return params;
            }

            var queryString = '',
                encode = isEncode === false ? function (value) {
                return value;
            } : encodeURIComponent;

            _core.Core.each(params, function (key, value) {
                if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                    _core.Core.each(value, function (innerValue, innerKey) {
                        if (queryString !== '') {
                            queryString += '&';
                        }

                        queryString += encode(key) + '[' + encode(innerKey) + ']=' + encode(innerValue);
                    });
                } else if (typeof value !== 'undefined') {
                    if (queryString !== '') {
                        queryString += '&';
                    }

                    queryString += encode(key) + '=' + encode(value);
                }
            });

            return queryString;
        },

        /**
         * 주어진 json를 키와 요소를 맞바꿔주는 함수
         * @name {{LIB_NAME}}.object.traverse
         * @param {Object} obj - 객체
         * @return {Object}
         * @example
         * {{LIB_NAME}}.object.traverse({1:'a', 2:'b', 3:'c', 4:'d'});
         * // {a:1, b:2, c:3, d:4}
         */
        traverse: function traverse(obj) {
            var result = {};

            _core.Core.each(obj, function (key, value) {
                result[value] = key;
            });

            return result;
        },

        /**
         * 주어진 리터럴에서 key에 해당하는 요소를 삭제
         * @name {{LIB_NAME}}.object.remove
         * @param {Object} value - 리터럴
         * @param {String} key - 삭제할 키
         * @return 지정한 요소가 삭제된 리터럴 반환
         * @example
         * var obj = {a: 'A', b: 'B'};
         * {{LIB_NAME}}.object.remove(obj, 'b'); // {a: 'A'}
         * // delete obj.b 네이티브 삭제 기능 권장
         */
        remove: function remove(value, key) {
            if (!_core.Core.is(value, 'object')) {
                return value;
            }

            value[key] = null;

            delete value[key];

            return value;
        },

        /**
         * json를 문자열로 변환(JSON을 지원하는 브라우저에서는 JSON.stringify를 사용.)
         * @name {{LIB_NAME}}.object.stringfy
         * @param {Object} val - json 객체
         * @param {Object} [opts]
         * @param {Boolean} [opts.singleQuotes = false] - 문자열을 '로 감쌀것인가
         * @param {String} [opts.indent = ''] - 들여쓰기 문자(\t or 스페이스)
         * @param {String} [opts.nr = ''] - 줄바꿈 문자(\n or 스페이스)
         * @param {String} [pad = ''] - 기호와 문자간의 간격
         * @return {String}
         * @example
         * {{LIB_NAME}}.object.stringify({a: 'A'}); // '{"a": "A"}'
         */
        stringify: _config.global.JSON ? JSON.stringify : function (val, opts, pad) {
            var cache = [];

            return function stringify(val, opts, pad) {
                var objKeys = void 0;

                opts = _core.Core.extend({}, {
                    singleQuotes: false,
                    indent: '', // '\t'
                    nr: '' // '\n'
                }, opts);

                pad = pad || '';

                if (typeof val === 'number' || typeof val === 'boolean' || val === null || val === undefined) {
                    return val;
                }

                if (typeof val === 'string') {
                    return '"' + val + '"';
                }
                if (val instanceof Date) {
                    return "new Date('" + val.toString() + "')";
                }

                if (_core.Core.is(val, 'array')) {
                    if (_core.Core.isEmpty(val)) {
                        return '[]';
                    }

                    return '[' + opts.nr + _core.Core.array.map(val, function (el, i) {
                        var eol = val.length - 1 === i ? opts.nr : ', ' + opts.nr;

                        return pad + opts.indent + stringify(el, opts, pad + opts.indent) + eol;
                    }).join('') + pad + ']';
                }

                if ((0, _isPlainObject.isPlainObject)(val)) {
                    if (_core.Core.array.indexOf(cache, val) !== -1) {
                        return null;
                    }
                    if (_core.Core.isEmpty(val)) {
                        return '{}';
                    }

                    cache.push(val);

                    objKeys = _core.Core.object.keys(val);

                    return '{' + opts.nr + _core.Core.array.map(objKeys, function (el, i) {
                        var eol = objKeys.length - 1 === i ? opts.nr : ', ' + opts.nr;
                        var key = /^[^a-z_]|\W+/ig.test(el) && el[0] !== '$' ? stringify(el, opts) : el;

                        return pad + opts.indent + '"' + key + '": ' + stringify(val[el], opts, pad + opts.indent) + eol;
                    }).join('') + pad + '}';
                }

                if (opts.singleQuotes === false) {
                    return '"' + (val + '').replace(/"/g, '\\\"') + '"';
                } else {
                    return "'" + (val + '').replace(/'/g, "\\\'") + "'";
                }
            }(val, opts, pad);
        }
    });
};

exports.addonObject = addonObject;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addonDate = undefined;

var _core = __webpack_require__(1);

/**
 * 날짜관련 유틸함수
 * @namespace
 * @name Core.date
 */
var addonDate = function addonDate() {
    _core.Core.define('date', function () {
        var months = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
            fullMonths = 'January,Febrary,March,April,May,June,July,Augst,September,October,November,December'.split(',');

        function compare(d1, d2) {
            if (!(d1 instanceof Date)) {
                d1 = core.date.parse(d1);
            }
            if (!(d2 instanceof Date)) {
                d2 = core.date.parse(d2);
            }

            return d1.getTime() > d2.getTime() ? -1 : d1.getTime() === d2.getTime() ? 0 : 1;
        }

        return {
            MONTHS_NAME: months,
            MONTHS_FULLNAME: fullMonths,
            FORMAT: 'yyyy.MM.dd',

            /**
             * 주어진 날짜 형식의 문자열을 Date객체로 변환
             * @function
             * @name {{LIB_NAME}}.date.parse
             * @param {String} dateStringInRange - 날짜 형식의 문자열
             * @return {Date} 주어진 날짜문자열을 파싱한 값을 Date형으로 반환
             * @example
             * {{LIB_NAME}}.date.parse('2014-11-12'); // Wed Nov 12 2014 00:00:00 GMT+0900 (대한민국 표준시)
             * {{LIB_NAME}}.date.parse('20141112'); // Wed Nov 12 2014 00:00:00 GMT+0900 (대한민국 표준시)
             */
            parse: function () {
                var isoExp = /^\s*(\d{4})(\d{2})(\d{2})(\d{2})?(\d{2})?(\d{2})?\s*$/;

                return function (dateStringInRange) {
                    var date = void 0,
                        month = void 0,
                        parts = void 0;

                    if (dateStringInRange instanceof Date) {
                        return _core.Core.clone(dateStringInRange);
                    }

                    dateStringInRange = (dateStringInRange + '').replace(/[^\d]+/g, '');

                    if (dateStringInRange.length !== 8 && dateStringInRange.length !== 14) {
                        return new Date(NaN);
                    }

                    if (dateStringInRange.length === 14) {
                        date = new Date(dateStringInRange.substr(0, 4) | 0, (dateStringInRange.substr(4, 2) | 0) - 1, dateStringInRange.substr(6, 2) | 0, dateStringInRange.substr(8, 2) | 0, dateStringInRange.substr(10, 2) | 0, dateStringInRange.substr(12, 2) | 0);

                        if (!isNaN(date)) {
                            return date;
                        }
                    }

                    date = new Date(dateStringInRange);

                    if (!isNaN(date)) {
                        return date;
                    }

                    date = new Date(NaN);
                    parts = isoExp.exec(dateStringInRange);

                    if (parts) {
                        month = +parts[2];
                        date.setFullYear(parts[1] | 0, month - 1, parts[3] | 0);
                        date.setHours(parts[4] | 0);
                        date.setMinutes(parts[5] | 0);
                        date.setSeconds(parts[6] | 0);

                        if (month != date.getMonth() + 1) {
                            date.setTime(NaN);
                        }

                        return date;
                    }

                    return date;
                };
            }(),

            /**
             * 날짜형식을 지정한 포맷의 문자열로 변환
             * @name {{LIB_NAME}}.date.format
             * @param {Date} formatDate
             * @param {String} formatString - 포맷 문자열
             * @return {String} 변환된 문자열
             * @example
             * // ex) 2015-04-07 15:03:45
             * // yyyy: 2015
             * // yy: 15
             * // M: 4
             * // MM: 04
             * // MMM: Apr
             * // MMMMM: April
             * // d: 7
             * // dd: 07
             * // h: 15
             * // hh: 15
             * // H: 3
             * // m: 3
             * // mm: 03
             * // s: 45
             * // ss: 45
             * // x: PM
             * {{LIB_NAME}}.date.format(new Date(), 'yy/MM/dd'); // '15/01/05'
             */
            format: function format(formatDate, formatString) {
                if (formatDate === '' || typeof formatDate === null) {
                    return '';
                };

                formatString || (formatString = this.FORMAT);

                if (_core.Core.is(formatDate, 'number')) {
                    formatDate = new Date(formatDate);
                } else if (_core.Core.is(formatDate, 'string')) {
                    formatDate = this.parse(formatDate);
                }

                if (formatDate instanceof Date) {
                    var yyyy = formatDate.getFullYear(),
                        yy = yyyy.toString().substring(2),
                        M = formatDate.getMonth() + 1,
                        MM = M < 10 ? '0' + M : M,
                        MMM = this.MONTHS_NAME[M - 1],
                        MMMM = this.MONTHS_FULLNAME[M - 1],
                        d = formatDate.getDate(),
                        dd = d < 10 ? '0' + d : d,
                        h = formatDate.getHours(),
                        hh = h < 10 ? '0' + h : h,
                        m = formatDate.getMinutes(),
                        mm = m < 10 ? '0' + m : m,
                        s = formatDate.getSeconds(),
                        ss = s < 10 ? '0' + s : s,
                        x = h > 11 ? 'PM' : 'AM',
                        H = h % 12;

                    if (H === 0) {
                        H = 12;
                    }

                    return formatString.replace(/yyyy/g, yyyy).replace(/yy/g, yy).replace(/MMMM/g, MMMM).replace(/MMM/g, MMM).replace(/MM/g, MM).replace(/M/g, M).replace(/dd/g, dd).replace(/d/g, d).replace(/hh/g, hh).replace(/h/g, h).replace(/mm/g, mm).replace(/m/g, m).replace(/ss/g, ss).replace(/s/g, s).replace(/!!!!/g, MMMM).replace(/!!!/g, MMM).replace(/H/g, H).replace(/x/g, x);
                } else {
                    return '';
                }
            },

            /**
             * 주어진 날자가 유효한지 체크
             * @name {{LIB_NAME}}.date.isValid
             * @param {String} date 날짜 문자열
             * @returns {Boolean} 유효한 날자인지 여부
             * @example
             * {{LIB_NAME}}.date.isValid('2018-13-23'); // false
             * {{LIB_NAME}}.date.isValid('1984-06-28'); // true
             */
            isValid: function isValid(date) {
                try {
                    return !isNaN(this.parse(date).getTime());
                } catch (e) {
                    return false;
                }
            },

            /**
             * date가 start와 end사이인지 여부
             * @name {{LIB_NAME}}.date.between
             * @param {Date} date - 날짜
             * @param {Date} start - 시작일시
             * @param {Date} end - 만료일시
             * @return {Boolean} 두날짜 사이에 있는지 여부
             * @example
             * {{LIB_NAME}}.date.between('2014-09-12', '2014-09-11', '2014-09-12'); // true
             * {{LIB_NAME}}.date.between('2014-09-12', '2014-09-11', '2014-09-11'); // false
             */
            between: function between(date, start, end) {
                if (!date.getDate) {
                    date = _core.Core.date.parse(date);
                }
                if (!start.getDate) {
                    start = _core.Core.date.parse(start);
                }
                if (!end.getDate) {
                    end = _core.Core.date.parse(end);
                }

                return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
            },

            /**
             * 날짜 비교
             * @name {{LIB_NAME}}.date.compare
             * @param {Date} date1 - 날짜1
             * @param {Date} date2 - 날짜2
             * @return {Number} -1: date1가 이후, 0: 동일, 1:date2가 이후
             * @example
             * var d1 = new Date(2014, 11, 23);
             * var d2 = new Date(2014, 09, 23);
             * {{LIB_NAME}}.date.compare(d1, d2); // -1
             * {{LIB_NAME}}.date.compare(d1, d1); // 0
             * {{LIB_NAME}}.date.compare(d2, d1); // 1
             */
            compare: compare,

            /**
             * 년월일이 동일한가
             * @name {{LIB_NAME}}.date.equalsYMD
             * @param {Date|String} date1 - 날짜1
             * @param {Date|String} date2 - 날짜2
             * @return {Boolean} 두 날짜의 년월일이 동일한지 여부
             * @example
             * {{LIB_NAME}}.date.equalsYMD('2014-12-23 11:12:23', '2014-12-23 09:00:21'); // true
             */
            equalsYMD: function equalsYMD(a, b) {
                var ret = true;

                if (!a || !b) {
                    return false;
                }
                if (!a.getDate) {
                    a = this.parse(a);
                }
                if (!b.getDate) {
                    b = this.parse(b);
                }

                _core.Core.each(['getFullYear', 'getMonth', 'getDate'], function (fn) {
                    ret = ret && a[fn]() === b[fn]();

                    if (!ret) {
                        return false;
                    }
                });

                return ret;
            },

            /**
             * 주어진 날짜를 기준으로 type만큼 가감된 날짜를 format형태로 반환
             * @name {{LIB_NAME}}.date.calcDate
             * @param {Date} date - 기준날짜
             * @param {String} type - -2d, -3d, 4M, 2y ..
             * @param {String} format - 포맷
             * @return {Date|String} format지정값에 따라 결과를 날짜형 또는 문자열로 변환해서 반환
             * @example
             * {{LIB_NAME}}.date.calcDate('2014-12-23', '-3m'); // 2014-09-23(Date)
             * {{LIB_NAME}}.date.calcDate('2014-12-23', '-3m', 'yyyy/MM/dd'); // '2014/09/23'(string)
             * {{LIB_NAME}}.date.calcDate('2014-12-23', '-10d'); // 2014-12-13(Date)
             */
            calcDate: function calcDate(date, type, format) {
                date = this.parse(date);

                if (!date) {
                    return null;
                }

                var m = type.match(/([-+]*)([0-9]*)([a-z]+)/i),
                    g = m[1] === '-' ? -1 : 1,
                    d = (m[2] | 0) * g;

                switch (m[3]) {
                    case 'd':
                        date.setDate(date.getDate() + d);
                        break;
                    case 'w':
                        date.setDate(date.getDate() + d * 7);
                        break;
                    case 'M':
                        var tDate = new Date(new Date(date.getFullYear(), date.getMonth() + 1 + d, 1) - 86400000);
                        var tMaxDay = tDate.getDate(); //타겟 달의 마지막 날

                        //타겟 날짜보다 클 경우
                        date.getDate() > tMaxDay ? date = tDate : date.setMonth(date.getMonth() + d);
                        break;
                    case 'y':
                        date.setFullYear(date.getFullYear() + d);
                        break;
                }

                if (format) {
                    return this.format(date, format === 'format' ? this.FORMAT : format);
                }

                return date;
            },

            calc: function calc() {
                return this.calcDate.apply(this, Array.prototype.slice.call(arguments));
            },

            /**
             * 두 날짜의 월 간격
             * @name {{LIB_NAME}}.date.monthDiff
             * @param {Date} d1 - 날짜 1
             * @param {Date} d2 - 날짜 2
             * @return {Number} 두날짜의 월차
             * {{LIB_NAME}}.date.monthDiff('2011-02-12', '2014-11-23'); // 44
             */
            monthDiff: function monthDiff(d1, d2) {
                d1 = this.parse(d1);
                d2 = this.parse(d2);

                var months = void 0;

                months = (d2.getFullYear() - d1.getFullYear()) * 12;
                months -= d1.getMonth() + 1;
                months += d2.getMonth();

                return months;
            },

            /**
             * 주어진 년월의 일수를 반환
             * @name {{LIB_NAME}}.date.daysInMonth
             * @param {Number} year - 년도
             * @param {Number} month - 월
             * @return {Date} 주어진 년월이 마지막 날짜
             * @example
             * {{LIB_NAME}}.date.daysInMonth(2014, 2); // 28
             */
            daysInMonth: function daysInMonth(year, month) {
                var dd = new Date(year | 0, month | 0, 0);

                return dd.getDate();
            },

            /**
             * 밀리초를 시,분,초로 변환
             * @name {{LIB_NAME}}.date.splits
             * @param {Number} amount - 밀리초값
             * @return {Object} dates 변환된 시간 값
             * @return {Number} dates.days 일 수
             * @return {Number} dates.hours 시간 수
             * @return {Number} dates.mins 분 수
             * @return {Number} dates.secs 초 수
             * @example
             * {{LIB_NAME}}.date.splits(2134000); // {days: 0, hours: 0, mins: 35, secs: 34}
             */
            splits: function splits(amount) {
                var days = void 0,
                    hours = void 0,
                    mins = void 0,
                    secs = void 0;

                amount = amount / 1000;
                days = Math.floor(amount / 86400), amount = amount % 86400;
                hours = Math.floor(amount / 3600), amount = amount % 3600;
                mins = Math.floor(amount / 60), amount = amount % 60;
                secs = Math.floor(amount);

                return {
                    days: days,
                    hours: hours,
                    mins: mins,
                    secs: secs
                };
            },

            /**
             * 주어진 두 날짜의 간견을 시, 분, 초로 반환
             * @name {{LIB_NAME}}.date.diff
             * @param {Date} t1 - 기준 시간
             * @param {Date} t2 - 비교할 시간
             * @return {Object} dates 시간차 값들이 들어있는 객체
             * @return {Number} dates.ms 밀리초
             * @return {Number} dates.secs 초
             * @return {Number} dates.mins 분
             * @return {Number} dates.hours 시
             * @return {Number} dates.days 일
             * @return {Number} dates.weeks 주
             * @return {Number} dates.diff
             * @example
             * {{LIB_NAME}}.date.diff(new Date, new Date(new Date() - 51811)); // {ms: 811, secs: 51, mins: 0, hours: 0, days: 0, weeks: 0, diff: 51811}
             */
            diff: function diff(t1, t2) {
                if (!_core.Core.is(t1, 'date')) {
                    t1 = new Date(t1);
                }
                if (!_core.Core.is(t2, 'date')) {
                    t2 = new Date(t2);
                }

                var diff = t1.getTime() - t2.getTime(),
                    ddiff = diff;

                diff = Math.abs(diff);

                var ms = diff % 1000;
                diff /= 1000;

                var s = Math.floor(diff % 60);
                diff /= 60;

                var m = Math.floor(diff % 60);
                diff /= 60;

                var h = Math.floor(diff % 24);
                diff /= 24;

                var d = Math.floor(diff);
                var w = Math.floor(diff / 7);

                return {
                    ms: ms,
                    secs: s,
                    mins: m,
                    hours: h,
                    days: d,
                    weeks: w,
                    diff: ddiff
                };
            },

            /**
             * 주어진 날짜가 몇번째 주인가
             * @name {{LIB_NAME}}.date.weekOfYear
             * @param {Date} date - 날짜
             * @return {Number}
             * @example
             * {{LIB_NAME}}.date.weekOfYear(new Date); // 2 // 2015-01-05를 기준으로 했을 때
             */
            weekOfYear: function () {
                var ms1d = 1000 * 60 * 60 * 24,
                    ms7d = 7 * ms1d;

                return function (date) {
                    var DC3 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 3) / ms1d,
                        AWN = Math.floor(DC3 / 7),
                        Wyr = new Date(AWN * ms7d).getUTCFullYear();

                    return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
                };
            }(),

            /**
             * 윤년인가
             * @name {{LIB_NAME}}.date.isLeapYear
             * @param {Number} y 년도
             * @return {Boolean}
             * @example
             * {{LIB_NAME}}.date.isLeapYear(2014); // false
             */
            isLeapYear: function isLeapYear(y) {
                if (Object.prototype.toString.call(y) === '[object Date]') {
                    y = y.getUTCFullYear();
                }

                return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0;
            },

            /**
             * 날짜 가감함수
             * @name {{LIB_NAME}}.date.add
             * @param {Date} date 날짜
             * @param {String} interval 가감타입(ms, s, m, h, d, M, y)
             * @param {Number} value 가감 크기
             * @return {Date} 가감된 날짜의 Date객체
             * @example
             * // 2014-06-10에서 y(년도)를 -4 한 값을 계산
             * var d = {{LIB_NAME}}.date.add(new Date(2014, 5, 10), 'y', -4); // 2010-06-10
             */
            add: function add(date, interval, value) {
                var d = new Date(date.getTime());

                if (!interval || value === 0) {
                    return d;
                }

                switch (interval) {
                    case 'ms':
                        d.setMilliseconds(d.getMilliseconds() + value);
                        break;
                    case 's':
                        d.setSeconds(d.getSeconds() + value);
                        break;
                    case 'm':
                        d.setMinutes(d.getMinutes() + value);
                        break;
                    case 'h':
                        d.setHours(d.getHours() + value);
                        break;
                    case 'd':
                        d.setDate(d.getDate() + value);
                        break;
                    case 'M':
                        d.setMonth(d.getMonth() + value);
                        break;
                    case 'y':
                        d.setFullYear(d.getFullYear() + value);
                        break;
                }

                return d;
            },

            /**
             * 주어진 두 날짜 중에서 작은값 반환
             * @name {{LIB_NAME}}.date.min
             * @param {Date} a - 날짜1
             * @param {Date} b - 날짜2
             * @return {Date} 작은값 날짜
             * @example
             * {{LIB_NAME}}.date.min(new Date(2014, 5, 10), new Date(2018, 7, 19)); // Tue Jun 10 2014 00:00:00 GMT+0900 (한국 표준시)
             */
            min: function min(a, b) {
                return new Date(Math.min(this.parse(a), this.parse(b)));
            },

            /**
             * 주어진 두 날짜 중에서 큰값 반환
             * @name {{LIB_NAME}}.date.max
             * @param {Date} a - 날짜1
             * @param {Date} b - 날짜2
             * @return {Date} 큰값 날짜
             * @example
             * {{LIB_NAME}}.date.max(new Date(2014, 5, 10), new Date(2018, 7, 19)); // Sun Aug 19 2018 00:00:00 GMT+0900 (한국 표준시)
             */
            max: function max(a, b) {
                return new Date(Math.max(this.parse(a), this.parse(b)));
            },

            /**
             * 시분초 normalize화 처리
             * @name {{LIB_NAME}}.date.normalize
             * @param {Number} h - 시
             * @param {Number} M - 분
             * @param {Number} s - 초
             * @param {Number} ms - 밀리초
             * @return {Object} dates 시간정보가 담긴 객체
             * @return {Number} dates.day 일
             * @return {Number} dates.hour 시
             * @return {Number} dates.min 분
             * @return {Number} dates.sec 초
             * @return {Number} dates.ms 밀리초
             * @example
             * {{LIB_NAME}}.date.normalize(0, 0, 120, 0); // {day:0, hour: 0, min: 2, sec: 0, ms: 0} // 즉, 120초가 2분으로 변환
             */
            normalize: function normalize(h, M, s, ms) {
                h = h || 0;
                M = M || 0;
                s = s || 0;
                ms = ms || 0;

                var d = 0;

                if (ms > 1000) {
                    s += Math.floor(ms / 1000);
                    ms = ms % 1000;
                }

                if (s > 60) {
                    M += Math.floor(s / 60);
                    s = s % 60;
                }

                if (M > 60) {
                    h += Math.floor(M / 60);
                    M = M % 60;
                }

                if (h > 24) {
                    d += Math.floor(h / 24);
                    h = h % 24;
                }

                return {
                    day: d,
                    hour: h,
                    min: M,
                    sec: s,
                    ms: ms
                };
            }
        };
    });
};

exports.addonDate = addonDate;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.__esModule = true;
exports.addonUri = undefined;

var _config = __webpack_require__(0);

var _core = __webpack_require__(1);

/**
 * @namespace
 * @name Core.uri
 */
var addonUri = function addonUri() {
    _core.Core.define('uri', {
        /**
         * 현재 페이지의 호스트주소를 반환
         * @returns {String}
         * @example
         * {{LIB_NAME}}.uri.getHost(); // 'http://127.0.0.1:8080'
         */
        getHost: function getHost() {
            var loc = _config.doc.location;

            return loc.protocol + '//' + loc.host;
        },
        /**
         * 현재 url 반환(쿼리스트링, # 제외)
         * @returns {String}
         * @example
         * {{LIB_NAME}}.uri.getPageUrl(); // 'http://127.0.0.1:8080/'
         */
        getPageUrl: function getPageUrl() {
            var loc = _config.doc.location;

            return loc.protocol + '//' + loc.host + loc.pathname;
        },

        /**
         * 주어진 url에 쿼리스트링을 조합
         * @name {{LIB_NAME}}.uri.addParam
         * @param {String} url
         * @param {String|Object} string
         * @return {String}
         * @example
         * {{LIB_NAME}}.uri.addParam('board.do', {a:1, b: 2, c: {d: 4}}); // 'board.do?a=1&b=2&c[d]=4'
         * {{LIB_NAME}}.uri.addParam('board.do?id=123', {a:1, b: 2, c: {d: 4}}); // 'board.do?id=123&a=1&b=2&c[d]=4'
         */
        addParam: function addParam(url, string) {
            if (_core.Core.is(string, 'object')) {
                string = _core.Core.object.toQueryString(string);
            }
            if (!_core.Core.isEmpty(string)) {
                return url + (url.indexOf('?') === -1 ? '?' : '&') + string;
            }

            return url;
        },

        /**
         * 쿼리스트링을 객체로 변환
         * @name {{LIB_NAME}}.uri.parseQuery
         * @param {String} query - 쿼리스트링 문자열
         * @return {Object}
         * @example
         * {{LIB_NAME}}.uri.parseQuery('a=1&b=2'); // {a: 1, b: 2}
         */
        parseQuery: function parseQuery(query) {
            if (!query) {
                return {};
            }
            if (query.length > 0 && query.charAt(0) === '?') {
                query = query.substr(1);
            }

            var params = (query + '').split('&'),
                obj = {},
                params_length = params.length,
                tmp = '',
                i = void 0;

            for (i = 0; i < params_length; i++) {
                tmp = params[i].split('=');
                obj[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp[1]).replace(/[+]/g, ' ');
            }

            return obj;
        },

        /**
         * url를 파싱하여 host, port, protocol 등을 추출
         * @name {{LIB_NAME}}.uri.parseUrl
         * @param {string} str url 문자열
         * @return {Object}
         * @example
         * {{LIB_NAME}}.uri.parseUrl('http://www.google.co.kr:8080/list.do?a=1&b=2#comment'); // {scheme: 'http', host: 'www.google.co.kr', port: '8080', path: '/list.do', query: 'a=1&b=2'…}
         */
        parseUrl: function () {
            var o = {
                strictMode: false,
                key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
                q: {
                    name: 'queryKey',
                    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                },
                parser: {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                }
            };

            return function (str) {
                if (str.length > 2 && str[0] === '/' && str[1] === '/') {
                    str = global.location.protocol + str;
                }

                var m = o.parser[o.strictMode ? 'strict' : 'loose'].exec(str),
                    uri = {},
                    i = 14;

                while (i--) {
                    uri[o.key[i]] = m[i] || '';
                }

                return uri;
            };
        }(),

        /**
         * 주어진 url에서 해쉬문자열 제거
         * @name {{LIB_NAME}}.uri.parseUrl
         * @param {string} url - url 문자열
         * @return {string} 결과 문자열
         * @example
         * {{LIB_NAME}}.uri.removeHash('list.do#comment'); // 'list.do'
         */
        removeHash: function removeHash(url) {
            return url ? url.replace(/#.*$/, '') : url;
        },

        /**
         * 쿼리스트링 파라미터 값 가져오기
         * @name {{LIB_NAME}}.uri.getParam
         * @param {string} name - 쿼리스트링 파라미터
         * @return {string} 파라미터 값 문자열 반환
         * @example
         * // http://www.google.co.kr?_ijt=fqn24lecvlsjvm8mn9d0rmcff3
         * {{LIB_NAME}}.uri.getParam('_ijt'); // 'fqn24lecvlsjvm8mn9d0rmcff3'
         */
        getParam: function getParam(name) {
            var search = global.location.search,
                params = void 0;

            if (!search || search.indexOf(name) < 0) {
                return '';
            }

            params = this.parseQuery(search);

            return params[name] || '';
        }
    });
};

exports.addonUri = addonUri;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.__esModule = true;
exports.addonDom = undefined;

var _core = __webpack_require__(1);

/**
 * @namespace
 * @name Core.dom
 */
var addonDom = function addonDom() {
    _core.Core.define('dom', {
        /**
         * 이벤트의 좌표 추출
         * @name {{LIB_NAME}}.dom.getEventPoint
         * @param {Event} e - 이벤트 객체
         * @param {String} type - mouseend나 touchend 이벤트일때 'end'를 넘겨주면 좀더 정확한 값이 반환된다.
         * @return {x: (*|Number), y: (*|Number)}
         * @example
         * document.getElementsByTagName('body')[0].addEventListener('click', function(e) {
         *     console.log( {{LIB_NAME}}.dom.getEventPoint(e, 'end') );
         * }, false);
         * // {x: 165, y: 21}
         */
        getEventPoint: function getEventPoint(e, type) {
            var event = e.originalEvent || e;

            if (type === 'end' || event.type === 'touchend') {
                event = event.changedTouches && event.changedTouches[0] || event;
            } else {
                event = event.touches && event.touches[0] || event;
            }

            return {
                x: event.pageX || event.clientX,
                y: event.pageY || event.clientY
            };
        },

        /**
         * 마우스 좌/우 클릭 버튼 구분 확인
         * @name {{LIB_NAME}}.dom.getMouseButton
         * @param {Event} e - 이벤트 객체
         * @return {String} 클릭된 마우스 좌/우 버튼 문자열 반환
         * @example
         * document.getElementsByTagName('body')[0].addEventListener('mousedown', function(e) {
         *     console.log( {{LIB_NAME}}.dom.getMouseButton(e) );
         * }, false);
         * // 마우스 좌측: 'left'
         * // 마우스 휠: 'middle'
         * // 마우스 우측: 'right'
         */
        getMouseButton: function getMouseButton(e) {
            var type = '';

            if (e.which) {
                // type = (e.which < 2)? 'left' : ((e.which === 2)? 'middle' : 'right');
                switch (e.which) {
                    case 1:
                        type = 'left';
                        break;
                    case 2:
                        type = 'middle';
                        break;
                    case 3:
                        type = 'right';
                        break;
                }
            } else {
                // IE
                type = e.button < 2 ? 'left' : e.button === 4 ? 'middle' : 'right';
            }

            return type;
        },

        /**
         * 입력창 셀렉션 영역 캐럿 커서 위치 반환
         * @name {{LIB_NAME}}.dom.getCaretPos
         * @param {DOMSeletor} selector - DOM 셀렉터
         * @return {begin: Number, end: Number}
         * @example
         * document.getElementsByTagName('textarea')[0].addEventListener('focus', function(e) {
         *      console.log( {{LIB_NAME}}.dom.getCaretPos(this) );
         * }, false);
         * // {begin: 8, end: 14}
         */
        getCaretPos: function getCaretPos(selector) {
            if (_core.Core.is(selector.selectionStart, 'number')) {
                return {
                    begin: selector.selectionStart,
                    end: selector.selectionEnd
                };
            }

            var range = doc.selection.createRange();

            if (range && range.parentElement() === selector) {
                var inputRange = selector.createTextRange(),
                    endRange = selector.createTextRange(),
                    length = selector.value.length;

                inputRange.moveToBookmark(range.getBookmark());
                endRange.collapse(false);

                if (inputRange.compareEndPoints('StartToEnd', endRange) > -1) {
                    return {
                        begin: length,
                        end: length
                    };
                }

                return {
                    begin: -inputRange.moveStart('character', -length),
                    end: -inputRange.moveEnd('character', -length)
                };
            }

            return {
                begin: 0,
                end: 0
            };
        },

        /**
         * 입력창 셀렉션 영역 캐럿 커서 위치 설정
         * @name {{LIB_NAME}}.dom.setCaretPos
         * @param {DOMSeletor} selector - DOM 셀렉터
         * @param {Number} pos - 캐럿 커서 위치
         * @example
         * document.getElementsByTagName('textarea')[0].addEventListener('focus', function() {
         *     {{LIB_NAME}}.dom.setCaretPos(this, 3);
         * }, false);
         */
        setCaretPos: function setCaretPos(selector, pos) {
            if (!_core.Core.is(pos, 'object')) {
                pos = {
                    begin: pos,
                    end: pos
                };
            }

            if (selector.setSelectionRange) {
                // selector.focus();
                selector.setSelectionRange(pos.begin, pos.end);
            } else if (selector.createTextRange) {
                var range = selector.createTextRange();

                range.collapse(true);
                range.moveStart('character', pos.begin);
                range.moveEnd('character', pos.end);
                range.select();
            }
        },

        /**
         * 자식 요소가 특정한 부모요소에 속해 있는지 확인
         * @name {{LIB_NAME}}.dom.contains
         * @param {DOMSeletor} parent - 부모 DOM 셀렉터
         * @param {DOMSeletor} child - 자식 DOM 셀렉터
         * @return {Boolean}
         * @example
         * console.log( {{LIB_NAME}}.dom.contains(document.documentElement, document.getElementsByTagName('h1')[0]) ); // true
         */
        contains: function contains(parent, child, is) {
            if (!parent || !child) {
                return false;
            }

            if ('contains' in parent) {
                return parent !== child && parent.contains(child) || is === true && parent === child;
            } else {
                return parent.compareDocumentPosition(child) % 16 || is === true && parent === child;
            }
        },

        /**
         * 해당 요소의 클래스 추가
         * @name {{LIB_NAME}}.dom.addClass
         * @param {DOMSeletor} element - DOM 셀렉터
         * @param {String} className - 클래스명
         * @example
         * {{LIB_NAME}}.dom.addClass({selector}, 'selected');
         */
        addClass: function addClass(element, className) {
            element.className += ' ' + className;
        },

        /**
         * 해당 요소의 클래스 삭제
         * @name {{LIB_NAME}}.dom.removeClass
         * @param {DOMSeletor} element - DOM 셀렉터
         * @param {String} className - 클래스명
         * @example
         * {{LIB_NAME}}.dom.removeClass({selector}, 'selected');
         */
        removeClass: function removeClass(element, className) {
            var check = new RegExp('(\\s|^)' + className + '(\\s|$)');

            element.className = _core.Core.string.trim(element.className.replace(check, ' '));
        },

        /**
         * 해당 요소의 특정 클래스 존재 유무 확인
         * @name {{LIB_NAME}}.dom.toggleClass
         * @param {DOMSeletor} element - DOM 셀렉터
         * @param {String} className - 클래스명
         * @return {Boolean}
         * @example
         * {{LIB_NAME}}.dom.hasClass({selector}, 'on');
         */
        hasClass: function hasClass(element, className) {
            return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        },

        /**
         * 토글 클래스
         * @name {{LIB_NAME}}.dom.toggleClass
         * @param {DOMSeletor} element - DOM 셀렉터
         * @param {String} className - 클래스명
         * @example
         * {{LIB_NAME}}.dom.toggleClass({selector}, 'toggle');
         */
        toggleClass: function toggleClass(element, className) {
            var check = new RegExp('(\\s|^)' + className + '(\\s|$)');

            if (check.test(element.className)) {
                element.className = _core.Core.string.trim(element.className.replace(check, ' '));
            } else {
                element.className += ' ' + className;
            }
        },

        /**
         * 이벤트 핸들러
         * @name {{LIB_NAME}}.dom.addEvent
         * @param {DOMSeletor} element - DOM 셀렉터
         * @param {String} eventType - 이벤트 타입
         * @param {Function} cb - 콜백함수
         * @param {Boolean} isCapture - 이벤트 캡쳐링
         * @example
         * {{LIB_NAME}}.dom.addEvent({selector}, 'click', function(e) {
         *     alert('clicked!');
         * }, false);
         */
        addEvent: function addEvent(element, eventType, cb, isCapture) {
            !isCapture ? false : isCapture;

            if (global.addEventListener) {
                element.addEventListener(eventType, cb, isCapture);
            } else if (global.attachEvent) {
                element.attachEvent('on' + eventType, cb);
            } else {
                element['on' + eventType] = cb;
            }
        }
    });
};

exports.addonDom = addonDom;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.__esModule = true;
exports.addonCss3 = undefined;

var _config = __webpack_require__(0);

var _core = __webpack_require__(1);

/**
 * @namespace
 * @name Core.css3
 */
var addonCss3 = function addonCss3() {
    _core.Core.define('css3', function () {
        var _tmpDiv = _core.Core.tmpNode,
            _prefixes = ['Webkit', 'Moz', 'O', 'ms', ''],
            _style = _tmpDiv.style,
            _noReg = /^([0-9]+)[px]+$/,
            _vender = function () {
            var venders = ['t', 'webkitT', 'MozT', 'msT', 'OT'];

            for (var i = 0, len = venders.length; i < len; i++) {
                if (venders[i] + 'ransitionDuration' in _style && venders[i] + 'ransform' in _style) {
                    return venders[i].substr(0, venders[i].length - 1);
                }
            }

            return false;
        }();

        function prefixStyle(name, isHyppen) {
            if (_vender === false || _vender === '') {
                return isHyppen ? name.toLowerCase() : name;
            }
            if (isHyppen) {
                return '-' + _vender.toLowerCase() + '-' + name[0].toLowerCase() + _core.Core.string.dasherize(name.substr(1));
            }

            return _vender + _core.Core.string.capitalize(name);
        }

        function offset(el) {
            var rect = el.getBoundingClientRect(),
                scrollLeft = global.pageXOffset || _config.doc.documentElement.scrollLeft,
                scrollTop = global.pageYOffset || _config.doc.documentElement.scrollTop;

            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }

        return {
            /**
             * 주어진 css명 앞에 현재 브라우저에 해당하는 벤더 prefix를 붙여준다.
             * @name {{LIB_NAME}}.css3.prefix
             * @param {String} cssName css명
             * @return {String}
             * @example
             * {{LIB_NAME}}.css3.prefix('transition'); // webkitTransition
             * {element}.style[{{LIB_NAME}}.css3.prefix('transform')] = 'translate(50px, 100px)';
             */
            prefix: prefixStyle,

            /**
             * css3 지원여부
             * @name {{LIB_NAME}}.css3.support
             * @return {Boolean}
             * @example
             * if ({{LIB_NAME}}.css3.support) {} // css3 지원 여부 확인
             */
            support: _vender !== false,

            /**
             * 3d style 지원여부
             * @name {{LIB_NAME}}.css3.support3D
             * @return {Boolean}
             * @example
             * if ({{LIB_NAME}}.css3.support3D) {} // css3 3d 지원 여부 확인
             */
            support3D: function () {
                var body = _config.doc.getElementsByTagName('body')[0],
                    docEl = _config.doc.documentElement,
                    docOverflow = void 0;

                if (!body) {
                    body = _config.doc.createElement('body');

                    body.fake = true;
                    body.style.background = '';
                    body.style.overflow = 'hidden';
                    body.style.padding = '0';
                    docEl.appendChild(body);
                }

                docOverflow = docEl.style.overflow;
                docEl.style.overflow = 'hidden';

                var parent = _config.doc.createElement('div'),
                    div = _config.doc.createElement('div'),
                    cssTranslate3dSupported = void 0;

                div.style.position = 'absolute';
                parent.appendChild(div);
                body.appendChild(parent);

                div.style[prefixStyle('transform')] = 'translate3d(20px, 0, 0)';
                cssTranslate3dSupported = offset(div).left - div.offsetLeft === 20;

                if (body.fake) {
                    body.parentNode.removeChild(body);
                    docEl.offsetHeight;
                    body = null;
                } else {
                    parent.parentNode.removeChild(parent);
                }

                docEl.style.overflow = docOverflow;

                return cssTranslate3dSupported;
            }(),

            /**
             * 주어진 css속성을 지원하는지 체크
             * @name {{LIB_NAME}}.css3.has
             * @param {String} cssName 체크하고자 하는 css명
             * @return {Boolean} 지원여부
             * @example
             * if ({{LIB_NAME}}.css3.has('transform')) {} // css 속성 지원 여부 확인
             */
            has: function has(name) {
                var i = _prefixes.length;

                if (name in _style) {
                    return true;
                }

                name = _core.Core.string.capitalize(name);

                while (i--) {
                    if (_prefixes[i] + name in _style) {
                        return true;
                    }
                }

                return false;
            },

            /**
             * transform 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transform
             * @example
             * {{LIB_NAME}}.css3.transform;
             */
            transform: prefixStyle('transform'),

            /**
             * transitionTimingFunction 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transitionTimingFunction
             * @example
             * {{LIB_NAME}}.css3.transitionTimingFunction;
             */
            transitionTimingFunction: prefixStyle('transitionTimingFunction'),

            /**
             * transitionDuration 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transitionDuration
             * @example
             * {{LIB_NAME}}.css3.transitionDuration;
             */
            transitionDuration: prefixStyle('transitionDuration'),

            /**
             * transitionDelay 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transitionDelay
             * @example
             * {{LIB_NAME}}.css3.transitionDelay;
             */
            transitionDelay: prefixStyle('transitionDelay'),

            /**
             * transformOrigin 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transformOrigin
             * @example
             * {{LIB_NAME}}.css3.transformOrigin;
             */
            transformOrigin: prefixStyle('transformOrigin'),

            /**
             * transition 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transition
             * @example
             * {{LIB_NAME}}.css3.transition;
             */
            transition: prefixStyle('transition'),

            /**
             * translateZ 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.translateZ
             * @example
             * {{LIB_NAME}}.css3.translateZ;
             */
            translateZ: prefixStyle('perspective') in _style ? ' translateZ(0)' : '',

            /**
             * transitionEnd 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transitionEnd
             * @example
             * {{LIB_NAME}}.css3.transitionEnd;
             */
            transitionEnd: function () {
                var names = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    transition: 'transitionend'
                };

                for (var name in names) {
                    if (typeof _core.Core.tmpNode.style[name] !== 'undefined') {
                        return names[name];
                    }
                }

                return 'transitionend';
            }(), // 'transitionend webkitTransitionEnd MSTransitionEnd'

            /**
             * 엘리먼트 요소의 현재 위치를 반환
             * @name {{LIB_NAME}}.css3.position
             * @param {DOMSeletor} selector - DOM 셀렉터
             * @return {Object} data
             * @return {Number} data.x
             * @return {Number} data.y
             * @example
             * {{LIB_NAME}}.css3.position({selctor});
             */
            position: function () {
                var support = _vender !== false;
                var transform = prefixStyle('transform');

                return support ? function (selector) {
                    var matrix = global.getComputedStyle ? global.getComputedStyle(selector, null) : selector.currentStyle,
                        x = 0,
                        y = 0;

                    if (!matrix[transform] || matrix[transform] === 'none') {
                        return { x: 0, y: 0 };
                    }

                    matrix = matrix[transform].split(')')[0].split(', ');
                    x = +(matrix[12] || matrix[4] || 0);
                    y = +(matrix[13] || matrix[5] || 0);

                    return { x: x, y: y };
                } : function (selector) {
                    var matrix = selector.style,
                        x = 0,
                        y = 0;

                    x = +matrix.left.replace(/[^-\d.]/g, '');
                    y = +matrix.top.replace(/[^-\d.]/g, '');

                    return { x: x, y: y };
                };
            }(),

            /**
             * css3로 움직여주는 함수
             * @name {{LIB_NAME}}.css3.move
             * @param {DOMSelector} selector - DOM 셀렉터
             * @param {Number|String} x
             * @param {Nymber|String} y
             * @param {Float} dur
             * @param {Function(el)} cb
             * @example
             * {{LIB_NAME}}.css3.move(document.getElementsByTagName({selctor})[0], 100, 200, 2, function() { alert('a'); });
             */
            move: function move(selector, x, y, dur, cb) {
                var unitX = _core.Core.is(x, 'number') ? 'px' : '',
                    unitY = _core.Core.is(y, 'number') ? 'px' : '';

                selector.style[this.transitionDuration] = dur + 's';
                selector.style[this.transform] = 'translate(' + x + unitX + ', ' + y + unitY + ')' + this.translateZ;

                if (cb) {
                    addEvent(selector, this.transitionEnd, function () {
                        cb.call(selector);
                    }, false);
                }
            },

            /**
             * css3로 움직여주는 애니메이션 함수
             * @name {{LIB_NAME}}.css3.animate
             * @param {DOMSelector} selectors - DOM 셀렉터
             * @param {Number|String} x
             * @param {Number|String} y
             * @param {Float} dur
             * @param {Function(el)} cb
             * {{LIB_NAME}}.css3.animate(document.getElementsByTagName({selctor}), 100, 100, 2, function() { alert('a'); });
             */
            animate: function animate(selectors, x, y, dur, cb) {
                var _this = this;

                var rfxnum = /^([+-]=)?([\d+-.]+)(.*)$/,
                    xParts = rfxnum.exec(x),
                    yParts = rfxnum.exec(y);

                var _loop = function _loop(i, len) {
                    var $this = selectors[i],
                        postion = _this.position($this),
                        startX = parseInt(postion.x, 10),
                        // 최초 x좌표 위치
                    endX = parseFloat(xParts[2]),
                        unitX = xParts[3] || 'px',
                        startY = parseInt(postion.y, 10),
                        // 최초 y좌표 위치
                    endY = parseFloat(yParts[2]),
                        unitY = yParts[3] || 'px';

                    // translateX 계산
                    if (unitX !== 'px') {
                        startX = startX / $this.offsetWidth * 100;
                    }
                    if (xParts[1]) {
                        endX = (xParts[1] === '-=' ? -1 : 1) * endX + startX;
                    }

                    // translateY 계산
                    if (unitY !== 'px') {
                        startY = startY / $this.offsetHeight * 100;
                    }
                    if (yParts[1]) {
                        endY = (yParts[1] === '-=' ? -1 : 1) * endY + startY;
                    }

                    $this.style[_this.transitionDuration] = dur + 's';
                    $this.style[_this.transitionTimingFunction] = 'ease-in-out';
                    $this.style[_this.transform] = 'translate(' + (endX | 0) + unitX + ', ' + (endY | 0) + unitX + ') translateZ(0px)';

                    if (cb) {
                        _core.Core.dom.addEvent($this, _this.transitionEnd, function () {
                            cb.call($this);
                        }, false);
                    }
                };

                for (var i = 0, len = selectors.length; i < len; i++) {
                    _loop(i, len);
                }
            },

            /**
             * css3 transitionStyle 추가
             * @name {{LIB_NAME}}.css3.transitionStyle
             * @param {DOMSelector} selector - 대상요소
             * @param {String} motion
             * @param {Float} dur
             * @param {String} easing
             * {{LIB_NAME}}.css3.transitionStyle(document.getElementsByTagName({selector})[0], 'width', 2, 'ease-in');
             */
            transitionStyle: function transitionStyle(selector, motion, dur, easing) {
                selector.style[this.transition] = motion;
                selector.style[this.transitionDuration] = dur + 's';
                selector.style[this.transitionTimingFunction] = easing;
            }
        };
    });
};

exports.addonCss3 = addonCss3;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addonCookie = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _config = __webpack_require__(0);

var _core = __webpack_require__(1);

var _bind = __webpack_require__(6);

/**
 * @namespace
 * @name Core.cookie
 */
var addonCookie = function addonCookie() {
    _core.Core.define('cookie', {
        /**
         * 쿠키값 설정
         * @name {{LIB_NAME}}.cookie.set
         * @param {String} name - 쿠키명
         * @param {String} value - 쿠키값
         * @param {Object} [options]
         * @param {Date} [options.expires] - 만료시간
         * @param {String} [options.path] - 쿠키의 유효경로
         * @param {String} [options.domain] - 쿠키의 유효 도메인
         * @param {Boolean} [options.secure] - https 에서만 쿠키 설정이 가능하도록 하는 속성
         * @example
         * {{LIB_NAME}}.cookie.set('userid', 'test');
         * // or
         * {{LIB_NAME}}.cookie.set({
         *     userid: 'test',
         *     name: 'dev'
         * });
         */
        set: function set(name, value, options) {
            if (!_core.Core.is(name, 'string')) {
                _core.Core.each(name, function (key, val) {
                    this.set(key, value, value);
                }.bind(this));

                return;
            }

            options = _core.Core.extend({}, options || {}, this.defaults);

            var curCookie = name + '=' + encodeURIComponent(value) + (options.expires ? '; expires=' + (options.expires instanceof Date ? options.expires.toGMTString() : options.expires) : '') + (options.path ? '; path=' + options.path : '') + (options.domain ? '; domain=' + options.domain : '') + (options.secure ? '; secure' : '');

            _config.doc.cookie = curCookie;
        },

        /**
         * 쿠키값 가져오기
         * @name {{LIB_NAME}}.cookie.get
         * @param {String} name - 쿠키명
         * @return  {String} - 쿠키값
         * @example
         * {{LIB_NAME}}.cookie.get('userid'); // 'test'
         */
        get: function get(name) {
            var j = void 0,
                g = void 0,
                h = void 0,
                f = void 0;

            j = ';' + _config.doc.cookie.replace(/ /g, '') + ';';
            g = ';' + name + '=';
            h = j.indexOf(g);

            if (h !== -1) {
                h += g.length;
                f = j.indexOf(';', h);

                return decodeURIComponent(j.substr(h, f - h));
            }

            return '';
        },

        /**
         * 쿠키값 삭제
         * @name {{LIB_NAME}}.cookie.remove
         * @param {String} name - 쿠키명
         * @example
         * {{LIB_NAME}}.cookie.remove('userid'); // ''
         * // or
         * {{LIB_NAME}}.cookie.remove(['userid', 'name']);
         */
        remove: function remove(name) {
            if (_core.Core.is(name, 'string')) {
                _config.doc.cookie = name + '=;expires=Fri, 31 Dec 1987 23:59:59 GMT;';
            } else {
                _core.Core.each(name, function (val, key) {
                    this.remove(key);
                }.bind(this));
            }
        },

        /**
         * sep를 구분자로 하여 문자열로 조합하여 쿠키값 설정
         * @name {{LIB_NAME}}.cookie.setItem
         * @param {String} name - 쿠키명
         * @param {String} val - 값
         * @param {String} sep - 구분자
         * @example
         * {{LIB_NAME}}.cookie.setItem('arr', 'a'); // ['a']
         * {{LIB_NAME}}.cookie.setItem('arr', 'b', ':'); // ['a:b']
         */
        setItem: function setItem(name, val, sep) {
            sep = sep || '|';
            val = val + '';

            var value = this.get(name),
                values = value ? value.split(sep) : [];

            if (!_core.Core.array.include(values, val)) {
                values.push(val);
            }

            console.log(_typeof([name, values.join(sep)].concat(arguments)));

            this.set.apply(this, [name, values.join(sep)].concat(arguments));
        },

        /**
         * sep를 구분자 문자열로 조합 쿠키값 가져오기
         * @name {{LIB_NAME}}.cookie.getItems
         * @param {String} name - 쿠키명
         * @example
         * {{LIB_NAME}}.cookie.getItems('arr'); // ['a']
         */
        getItems: function getItems(name) {
            var val = this.get(name) || '';

            if (!_core.Core.string.trim(val)) {
                return [];
            }

            return val.split('|');
        },

        /**
         * sep의 구분자 name에 셋팅되어 있던 조합문자열에서 val를 제거
         * @name {{LIB_NAME}}.cookie.removeItem
         * @param {String} name - 쿠키명
         * @param {String} val - 값
         * @param {String} sep - 구분자
         * @example
         * {{LIB_NAME}}.cookie.removeItem('arr', 'b'); // [a]
         */
        removeItem: function removeItem(name, val, sep) {
            sep = sep || '|';
            val = val + '';

            var value = this.get(name),
                values = value ? value.split(sep) : [];

            values = _core.Core.array.remove(values, val);

            this.set.apply(this, [name, values.join(sep)].concat(arguments));
        }
    });
};

exports.addonCookie = addonCookie;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.__esModule = true;
exports.addonUtil = undefined;

var _core = __webpack_require__(1);

/**
 * @namespace
 * @name Core.util
 */
var addonUtil = function addonUtil() {
    _core.Core.define('util', {
        /**
         * 브라우저의 Detect 정보: 되도록이면 Modernizr 라이브러리를 사용할 것을 권함
         * @name {{LIB_NAME}}.util.browser
         * @example
         * {{LIB_NAME}}.util.browser.isTouch // 터치디바이스 여부
         * {{LIB_NAME}}.util.browser.isRetina // 레티나 여부
         * {{LIB_NAME}}.util.browser.isMobile // orientation 작동여부로 판단
         * {{LIB_NAME}}.util.browser.isMac // 맥OS
         * {{LIB_NAME}}.util.browser.isLinux // 리눅스
         * {{LIB_NAME}}.util.browser.isWin // 윈도우즈
         * {{LIB_NAME}}.util.browser.is64Bit // 64비트 플랫폼
         * {{LIB_NAME}}.util.browser.isIE // IE
         * {{LIB_NAME}}.util.browser.ieVersion // IE의 버전
         * {{LIB_NAME}}.util.browser.isOpera // 오페라
         * {{LIB_NAME}}.util.browser.isChrome // 크롬
         * {{LIB_NAME}}.util.browser.isSafari // 사파리
         * {{LIB_NAME}}.util.browser.isWebKit // 웹킷
         * {{LIB_NAME}}.util.browser.isGecko // 파이어폭스
         * {{LIB_NAME}}.util.browser.isIETri4 // IE엔진
         * {{LIB_NAME}}.util.browser.isAir // 어도비 에어
         * {{LIB_NAME}}.util.browser.isIOS // 아이폰, 아이패드
         * {{LIB_NAME}}.util.browser.isAndroid // 안드로이드
         * {{LIB_NAME}}.util.browser.iosVersion // ios 버전 : [8, 1, 0] -> [major, minor, revision]
         * {{LIB_NAME}}.util.browser.androidVersion // android 버전 : [4, 1, 0] -> [major, minor, revision]
         * @example
         * if ({{LIB_NAME}}.util.browser.isIE && {{LIB_NAME}}.util.browser.isVersion < 9) {
         *      alert('IE 구버전을 사용하고 있습니다.');
         * }
         */
        browser: function () {
            var detect = {},
                win = global,
                na = win.navigator,
                ua = na.userAgent,
                lua = ua.toLowerCase(),
                match = void 0;

            detect.isStrict = typeof win === 'undefined';
            detect.isRetina = 'devicePixelRatio' in win && win.devicePixelRatio > 1;
            detect.isAndroid = lua.indexOf('android') !== -1;
            detect.isBadAndroid = /Android /.test(na.appVersion) && !/Chrome\/\d/.test(na.appVersion);
            detect.isOpera = !!(win.opera && win.opera.buildNumber);
            detect.isWebKit = /WebKit/.test(ua);

            match = /(msie) ([\w.]+)/.exec(lua) || /(trident)(?:.*rv.?([\w.]+))?/.exec(lua) || ['', null, -1];
            detect.isIE = !detect.isWebKit && !detect.isOpera && match[1] !== null;
            detect.version = detect.ieVersion = parseInt(match[2], 10);
            detect.isOldIE = detect.isIE && detect.version < 9;

            detect.isWin = na.appVersion.indexOf('Win') !== -1;
            detect.isMac = ua.indexOf('Mac') !== -1;
            detect.isLinux = na.appVersion.indexOf('Linux') !== -1;
            detect.is64Bit = lua.indexOf('wow64') > -1 || na.platform === 'Win64' && lua.indexOf('x64') > -1;

            detect.isChrome = ua.indexOf('Chrome') !== -1;
            detect.isGecko = ua.indexOf('Firefox') !== -1;
            detect.isAir = /adobeair/i.test(ua);
            detect.isIOS = /(iPad|iPhone)/.test(ua);
            detect.isSafari = !detect.isChrome && /Safari/.test(ua);
            detect.isIETri4 = detect.isIE && ua.indexOf('Trident/4.0') !== -1;

            detect.msPointer = !!(na.msPointerEnabled && na.msMaxTouchPoints && !win.PointerEvent);
            detect.pointer = !!(win.PointerEvent && na.pointerEnabled && na.maxTouchPoints || detect.msPointer);

            if (detect.isAndroid) {
                detect.androidVersion = function () {
                    var v = ua.match(/[a|A]ndroid[^\d]*(\d+).?(\d+)?.?(\d+)?/);

                    if (!v) {
                        return -1;
                    }

                    return [parseInt(v[1] | 0, 10), parseInt(v[2] | 0, 10), parseInt(v[3] | 0, 10)];
                }();
            } else if (detect.isIOS) {
                detect.iosVersion = function () {
                    var v = ua.match(/OS (\d+)_?(\d+)?_?(\d+)?/);

                    return [parseInt(v[1] | 0, 10), parseInt(v[2] | 0, 10), parseInt(v[3] | 0, 10)];
                }();
            }

            detect.supportCanvas = !!document.createElement('canvas').getContext;
            detect.isMobile = 'orientation' in win || detect.isIOS || detect.isAndroid;
            detect.isTouch = !!('ontouchstart' in win);
            detect.placeholder = 'placeholder' in _core.Core.tmpInput;

            return detect;
        }(),

        /**
         * 주어진 시간내에 호출이 되면 무시되고, 초과했을 때만 비로소 fn를 실행시켜주는 함수
         * @name {{LIB_NAME}}.util.delayRun
         * @param {Function} fn - 콜백함수
         * @param {Number} time - 딜레이시간
         * @param {*} scope - 컨텍스트
         * @return {Function}
         * @example
         * // 리사이징 중일 때는 이벤트를 발생시키지 않다가,
         * // 리사이징이 끝나고 0.5초가 지난 후에 이벤트를 발생시키고자 할 경우 사용.
         * window.addEventListener('resize', {{LIB_NAME}}.util.delayRun(function() {
         *		console.log('resizeend');
         *  }, 500), false);
         */
        delayRun: function delayRun(fn, time, scope) {
            time || (time = 250);

            var timeout = null;

            return function () {
                if (timeout) {
                    global.clearTimeout(timeout);
                }

                var args = arguments,
                    me = this;

                timeout = global.setTimeout(function () {
                    fn.apply(scope || me, args);
                    timeout = null;
                }, time);
            };
        },

        /**
         * 15자의 영문, 숫자로 이루어진 유니크한 값 생성
         * @name {{LIB_NAME}}.util.getUniqId
         * @return {string}
         * @example
         * {{LIB_NAME}}.util.getUniqId(45); //eronv05ez56qjypsvrzheypyariyh6deodwpqu74j834w
         */
        getUniqId: function getUniqId(len) {
            len = len || 32;
            var rdmString = '';

            for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2)) {}

            return rdmString.substr(0, len);
        },

        /**
         * 순번으로 유니크값을 생성해서 반환
         * @name {{LIB_NAME}}.util.nextSeq
         * @return {number}
         * @example
         * {{LIB_NAME}}.util.nextSeq(); // 순차적으로 실행할 때 마다 1, 2, 3... 반환
         */
        nextSeq: function () {
            var seq = 0;

            return function (prefix) {
                return (prefix || '') + (seq += 1);
            };
        }(),

        /**
         * 템플릿 생성
         * @name {{LIB_NAME}}.util.template
         * @param {String} text - 템플릿 문자열
         * @param {Object} data - 템플릿 문자열에서 변환될 데이타
         * @param {Object} settings - 옵션
         * @return {Function} tempalte - 함수
         * @example
         * var tmpl = {{LIB_NAME}}.util.template('&lt;span>&lt;$=name$>&lt;/span>');
         * var html = tmpl({name: 'Axl rose'}); // &lt;span>Axl rose&lt;/span>
         * $('div').html(html);
         */
        // template: function(str, data) {
        //     var src = 'var __src = [], each=' + LIB_NAME + '.each, escapeHTML=' + LIB_NAME + '.string.escapeHTML; with(value||{}) { __src.push("';
        //
        //     str = Core.string.trim(str);
        //     src += str
        //         .replace(/\r|\n|\t/g, " ")
        //         .replace(/\{\{(.*?)\}\}/g, function(a, b) {
        //             return '{{' + b.replace(/"/g, '\t') + '}}';
        //         })
        //         .replace(/"/g, '\\"')
        //         .replace(/\{\{each ([a-z]+) in ([a-zA-Z0-9\.]+)\}\}(.+)\{\{\/each\}\}/g, function(str, item, items, conts) {
        //             return '{{each(value.' + items + ', function(item){ }}' + conts + ' {{ }); }}';
        //         })
        //         .replace(/\{\{(.*?)\}\}/g, function(a, b) {
        //             return '{{' + b.replace(/\t/g, '"') + '}}';
        //         })
        //         .replace(/\{\{=(.+?)\}\}/g, '", $1, "')
        //         .replace(/\{\{-(.+?)\}\}/g, '", escapeHTML($1), "')
        //         .replace(/(\{\{|\}\})/g, function(a, b) {
        //             return b === '{{' ? '");' : '__src.push("'
        //         });
        //
        //     // src+='"); };  console.log(__src);return __src.join("");';
        //     src += '"); }; return __src.join("");';
        //
        //     var f = new Function('value', 'data', src);
        //
        //     if (data) { return f(data); }
        //
        //     return f;
        // },

        /**
         * 템플릿 생성
         * @name {{LIB_NAME}}.util.template2
         * @param {DOMSeletor} selector - DOM 셀렉터
         * @param {Object} data - 템플릿 문자열에서 변환될 데이터
         * @return {Object} 변환된 DOM Chunk 반환
         * @example
         * <script type="text/template" id="result">
         *      <p>반갑습니다! {{who}}님!</p>
         * <\/script>
         * var tmpl = {{LIB_NAME}}.util.template(document.getElementById('result'), {who: 'woonyzzang'});
         * document.body.innerHTML = tmpl;
         */
        template: function template(selector, data) {
            var templateStr = selector.innerHTML;
            var result = null;

            for (var key in data) {
                result = templateStr.replace('{{' + key + '}}', data[key]);
            }

            return result;
        }
    });

    /** 코어 별칭 */
    _core.Core.browser = _core.Core.util.browser;
};

exports.addonUtil = addonUtil;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addonClass = undefined;

var _core = __webpack_require__(1);

/**
 * prototype 을 이용한 클래스 생성
 * @namespace
 * @name Core.Class
 */
var addonClass = function addonClass() {
    _core.Core.define('Class', function () {
        var F = _core.Core.emptyFn,
            ignoreNames = ['superclass', 'members', 'statics', 'hooks'];

        function array_indexOf(arr, value) {
            if (Array.prototype.indexOf) {
                return Array.prototype.indexOf.call(arr, value);
            } else {
                for (var i = -1, item; item = arr[++i];) {
                    if (item === value) {
                        return i;
                    }
                }

                return -1;
            }
        }

        // 부모클래스의 함수에 접근할 수 있도록 .supr 속성에 부모함수를 래핑하여 설정
        function wrap(k, fn, supr) {
            return function () {
                var tmp = this.supr,
                    ret = void 0;

                this.supr = supr.prototype[k];
                ret = null;

                try {
                    ret = fn.apply(this, arguments);
                } finally {
                    this.supr = tmp;
                }

                return ret;
            };
        }

        // 속성 중에 부모클래스에 똑같은 이름의 함수가 있을 경우 래핑처리
        function inherits(what, o, supr) {
            _core.Core.each(o, function (k, v) {
                if (o.hasOwnProperty(k)) {
                    what[k] = _core.Core.is(v, 'function') && _core.Core.is(supr.prototype[k], 'function') ? wrap(k, v, supr) : v;
                }
            });
        }

        // 클래스 정의
        function classExtend(attr, c) {
            var supr = c ? attr.$extend || Object : this,
                statics = void 0,
                mixins = void 0,
                singleton = void 0,
                instance = void 0,
                hooks = void 0;

            if (_core.Core.is(attr, 'function')) {
                attr = attr();
            }

            singleton = attr.$singleton || false;
            statics = attr.$statics || false;
            mixins = attr.$mixins || false;
            hooks = attr.$hooks || false;

            !attr._constructor && (attr._constructor = supr.prototype._constructor || function () {});

            // 생성자 몸체
            function constructor() {
                if (singleton && instance) {
                    return instance;
                } else {
                    instance = this;
                }

                var args = Array.prototype.slice.call(arguments),
                    _this = this,
                    ctr = _this.constructor;

                if (_this._constructor) {
                    _this._constructor.apply(_this, args);
                } else {
                    supr.prototype._constructor && supr.prototype._constructor.apply(_this, args);
                }

                if (ctr.hooks) {
                    // 페이지상에서 한번만 실행
                    if (!ctr.hooks.inited) {
                        ctr.hooks.init && _core.Core.each(ctr.hooks.init, function (fn) {
                            fn.call(_this);
                        });

                        ctr.hooks.inited = true;
                    }

                    // 생성때마다 실행
                    ctr.hooks.create && _core.Core.each(ctr.hooks.create, function (fn) {
                        fn.call(_this);
                    });
                }
            }

            function TypeClass() {
                if (!(this instanceof TypeClass)) {
                    throw new Error('new 연산자로 생성하여 사용하셔야 합니다.');
                }

                constructor.apply(this, arguments);
            }

            F.prototype = supr.prototype;

            TypeClass.prototype = new F();
            TypeClass.prototype.constructor = TypeClass;

            // 메소드 내에서 부모클래스에 접근할 때 사용
            TypeClass.superclass = supr.prototype;
            TypeClass.extend = classExtend;

            /**
             * @name hooks
             * @description 해당 클래스의 객체가 생성될 때 hook를 등록하는 클래스함수
             * @example
             * var Child = {{LIB_NAME}}.Class({
             *     $hooks: {
             *         init: function() {
             *             console.log('초기화');
             *         },
             *         create: function() {
             *             console.log('객체생성');
             *         }
             *     },
             *     show: function() {
             *         console.log('hello');
             *     }
             * });
             */
            TypeClass.hooks = { init: [], create: [] };

            _core.Core.extend(true, TypeClass.hooks, supr.hooks);

            hooks && _core.Core.each(hooks, function (name, fn) {
                switch (name) {
                    case 'init':
                        TypeClass.hooks.init.push(fn);
                        break;
                    case 'create':
                        TypeClass.hooks.create.push(fn);
                        break;
                }
            });

            if (singleton) {
                /**
                 * @name getInstance
                 * @description 싱클톤 클래스의 객체를 반환
                 * @function
                 * @return {Class}
                 * @example
                 * var Child = {{LIB_NAME}}.Class({
                 *    $singleton: true,
                 *    show: function() {
                 *        alert('hello');
                 *    }
                 * });
                 * Child.getInstance().show();
                 */
                TypeClass.getInstance = function () {
                    var arg = arguments,
                        len = arg.length;

                    if (!instance) {
                        if (!len) {
                            instance = new TypeClass();
                        } else if (len === 1) {
                            instance = new TypeClass(arg[0]);
                        } else if (len === 2) {
                            instance = new TypeClass(arg[0], arg[1]);
                        } else {
                            instance = new TypeClass(arg[0], arg[1], arg[2]);
                        }
                    }

                    return instance;
                };
            }

            /**
             * @name suprMethod
             * @description 메소드내부에서 부모클레스의 함수를 호출하고자 할 때 사용
             * @return {*} 해당 부모함수의 반환값
             * @example
             * var Parent = {{LIB_NAME}}.Class({
             *     show: function(){
             *         console.log('parent.show');
             *     }
             * });
             * var Child = {{LIB_NAME}}.Class({
             *     $extend: Parent,
             *     show: function() { // override
             *         this.supr(); // Parent#show()가 호출됨
             *         console.log('child.show');
             *     },
             *     display: function(){
             *         this.suprMethod('show'); // 특정 부모함수를 명명해서 호출할 수 도 있음
             *     }
             * });
             * var child = new Child();
             * child.show(); // console.log('parent.show'); console.log('child.show');
             * child.display(); // console.log('parent.show');
             */
            TypeClass.prototype.suprMethod = function (name) {
                var args = Array.prototype.slice.call(arguments, 1);

                return supr.prototype[name].apply(this, args);
            };

            // func의 컨텍스트를 this로 지정
            TypeClass.prototype.proxy = function (fn) {
                var _this = this;

                if (typeof fn === 'string') {
                    fn = _this[fn];
                }

                return function () {
                    return fn.apply(_this, arguments);
                };
            };

            /**
            * @name mixins
            * @description 여러 클래스를 mixins방식으로 merge
            * @function
            * @param {function} o 객체
            * @example
            * var A = {{LIB_NAME}}.Class({
            *		funcA: function() {}
            * });
            * var B = {{LIB_NAME}}.Class({
            *		funcB: function() {}
            * });
            * var Person = {{LIB_NAME}}.Class({
            *     $mixins: [A, B],
            *		_constructor: function() {}
            * });
            *
            * var person = new Person();
            * person[0].funcA();
            * person[1].funcB();
            */
            TypeClass.mixins = function (o) {
                if (!_core.Core.is(o, 'array')) {
                    o = [o];
                } // !o.push

                var _this = this;

                _core.Core.each(o, function (mixObj, index, obj) {
                    if (!mixObj) {
                        return;
                    }

                    _core.Core.each(obj, function (fn, key, value) {
                        if (value.hasOwnProperty(key)) {
                            _this.prototype[key] = new value[key]();
                        }
                    });
                });
            };

            mixins && TypeClass.mixins.call(TypeClass, mixins);

            /**
            * @memberOf common.Class
            * @name members
            * @description 클래스에 메소드 추가
            * @function
            * @param {function} o 객체
            * @example
            * var Person = {{LIB_NAME}}.Class({
            *		_constructor: function() {}
            * });
            *
            * Person.members({
            *		newFunc: function() {}
            * });
            *
            * var person = new Person();
            * person.newFunc();
            */
            TypeClass.members = function (o) {
                inherits(this.prototype, o, supr);
            };

            attr && TypeClass.members.call(TypeClass, attr);

            /**
            * @name statics
            * @description 클래스함수 추가함수
            * @function
            * @param {function} o 객체
            * @example
            * var Person = {{LIB_NAME}}.Class({
            *     $statics: { // 클래스 속성 및 함수
            *         live: function() { // new 생성자 없이 Person.live(); 으로 호출
            *             console.log('live');
            *         }
             *     },
            *		_constructor: function() {}
            * });
            *
            * Person.live();
            */
            TypeClass.statics = function (o) {
                o = o || {};

                for (var k in o) {
                    if (array_indexOf(ignoreNames, k) < 0) {
                        this[k] = o[k];
                    }
                }

                return this;
            };

            TypeClass.statics.call(TypeClass, supr);
            statics && TypeClass.statics.call(TypeClass, statics);

            if (hooks || (hooks = TypeClass.prototype.$hooks)) {
                hooks.onClassCreate && hooks.onClassCreate(Class);
            }

            return TypeClass;
        }

        /**
         * @name Class
         * @description 루트클래스 생성
         * @class
         * @example
         * var Person = {{LIB_NAME}}.Class({
        *	    $singleton: true, // 싱글톤 여부
        *	    $statics: { // 클래스 속성 및 함수
        *		    live: function() {} // Person.live(); 으로 호출
        *	    },
        *	    $mixins: [Animal, Robot], // 특정 클래스에서 메소드들을 빌려오고자 할 때 해당 클래스를 지정(다중으로도 가능)
        *	    _constructor: function(name) {
        *		    this.name = name;
        *	    },
        *	    say: function(job) {
        *		    console.log('I\'m Person: ' + job);
        *	    },
        *	    run: function() {
        *		    alert('i\'m running...');
        *      }
        * });
        *
        * // Person에서 상속받아 Man클래스를 구현하는 경우
         * var Man = {{LIB_NAME}}.Class({
         *     $extend: Person,
        *     _constructor: function(name, age) {
        *         this.supr(name);  // Person(부모클래스)의 initialize메소드를 호출 or this.suprMethod('initialize', name);
        *         this.age = age;
        *     },
        *	   // say를 오버라이딩함
        *     say: function(job) {
        *         this.suprMethod('say', 'programer'); // 부모클래스의 say 메소드 호출 - 첫번째인자는 메소드명, 두번째부터는 해당 메소드로 전달될 인자
        *         alert('I\'m Man: ' + job);
        *     }
        * });
        *
         * var man = new Man('kim', 20);
         * man.say('freeman');  // 결과: console.log("I'm Person: programer"); console.log("I'm Man: freeman");
         * man.run(); // 결과: console.log("i'm running...");
         */
        _core.Core.Class = function (attr) {
            return classExtend.apply(this, [attr, true]);
        };
    });
};

exports.addonClass = addonClass;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addonEnv = undefined;

var _core = __webpack_require__(1);

/**
 * @namespace
 * @name Core.Env
 */
var addonEnv = function addonEnv() {
    _core.Core.define('env', {
        configs: {},

        /**
         * @name set
         * @description 설정값을 지정하는 함수
         * @param {string} name 설정명. `.`를 구분값으로 단계를 내려가서 설정할 수 있다.
         * @param {*} value 설정값
         * @return {*} 설정값
         * @example
         * {{LIB_NAME}}.Env.set('siteTitle', 'Hello World!');
         */
        set: function set(name, value) {
            var root = this.configs,
                names = name.split('.'),
                len = names.length,
                last = len - 1,
                pair = root;

            for (var i = 0; i < last; i++) {
                pair = pair[names[i]] || (pair[names[i]] = {});
            }

            return pair[names[last]] = value;
        },

        /**
         * @name get
         * @description 설정값을 꺼내오는 함수
         * @param {string} name 설정명. `.`를 구분값으로 단계별로 값을 가져올 수 있다.
         * @param {*} [def] 설정된 값이 없을 경우 사용할 기본값
         * @return {*} 설정값
         * @example
         * {{LIB_NAME}}.Env.get('siteTitle'); // 'Hello World!'
         */
        get: function get(name, def) {
            var root = this.configs,
                names = name.split('.'),
                pair = root;

            for (var i = 0, len = names.length; i < len; i++) {
                if (!(pair = pair[names[i]])) {
                    return def;
                }
            }

            return pair;
        }
    });
};

exports.addonEnv = addonEnv;

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle-1.0.0.js.map