import {global} from '../config';
import {Core} from '../Core/core';
import {isPlainObject} from '../Native/isPlainObject';

/**
 * JSON객체 관련 유틸함수
 * @namespace
 * @name {{LIB_NAME}}.object
 */
const addonObject = () => {
    Core.define('object', {
        /**
         * 객체의 열거가능한 속성 및 메서드 이름을 배열로 반환
         * @name {{LIB_NAME}}.object.keys
         * @param {Object} obj - 리터럴 객체
         * @return {Array} 객체의 열거가능한 속성의 이름이 포함된 배열
         * @example
         * {{LIB_NAME}}.object.keys({name: 'Axl rose', age: 50}); // ['name', 'age']
         */
        keys: Object.keys || function(obj) {
            let results = [];

            Core.each(obj, function(key, value) {
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
            let results = [];

            Core.each(obj, function(value) {
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
        map: function (obj, cb) {
            if (!Core.is(obj, 'object') || !Core.is(cb, 'function')) { return obj; }

            let results = {};

            Core.each(obj, function(v, k) {
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
        hasObject: function(obj) {
            if (!Core.is(obj, 'object')) { return false; }

            let has = false;

            Core.each(obj, function() {
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
        toQueryString: function(params, isEncode) {
            if (typeof params === 'string') { return params; }

            let queryString = '',
                encode = (isEncode === false)? function(value) {
                    return value;
                } : encodeURIComponent;

            Core.each(params, function(key, value) {
                if (typeof value === 'object') {
                    Core.each(value, function (innerValue, innerKey) {
                        if (queryString !== '') { queryString += '&'; }

                        queryString += encode(key) + '[' + encode(innerKey) + ']=' + encode(innerValue);
                    });
                } else if (typeof value !== 'undefined') {
                    if (queryString !== '') { queryString += '&'; }

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
        traverse: function(obj) {
            let result = {};

            Core.each(obj, function(key, value) {
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
        remove: function (value, key) {
            if (!Core.is(value, 'object')) { return value; }

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
        stringify: (global.JSON)? JSON.stringify : function(val, opts, pad) {
            let cache = [];

            return (function stringify(val, opts, pad) {
                let objKeys;

                opts = Core.extend({}, {
                    singleQuotes: false,
                    indent: '', // '\t'
                    nr: '' // '\n'
                }, opts);

                pad = pad || '';

                if (typeof val === 'number' ||
                    typeof val === 'boolean' ||
                    val === null ||
                    val === undefined) {
                    return val;
                }

                if (typeof val === 'string') { return '"' + val + '"'; }
                if (val instanceof Date) { return "new Date('" + val.toString() + "')"; }

                if (Core.is(val, 'array')) {
                    if (Core.isEmpty(val)) { return '[]'; }

                    return '[' + opts.nr + Core.array.map(val, function(el, i) {
                        const eol = (val.length - 1 === i)? opts.nr : ', ' + opts.nr;

                        return pad + opts.indent + stringify(el, opts, pad + opts.indent) + eol;
                    }).join('') + pad + ']';
                }

                if (isPlainObject(val)) {
                    if (Core.array.indexOf(cache, val) !== -1) { return null; }
                    if (Core.isEmpty(val)) { return '{}'; }

                    cache.push(val);

                    objKeys = Core.object.keys(val);

                    return '{' + opts.nr + Core.array.map(objKeys, function (el, i) {
                        const eol = (objKeys.length - 1 === i)? opts.nr : ', ' + opts.nr;
                        const key = (/^[^a-z_]|\W+/ig.test(el) && el[0] !== '$')? stringify(el, opts) : el;

                        return pad + opts.indent + '"' + key + '": ' + stringify(val[el], opts, pad + opts.indent) + eol;
                    }).join('') + pad + '}';
                }

                if (opts.singleQuotes === false) {
                    return '"' + (val + '').replace(/"/g, '\\\"') + '"';
                } else {
                    return "'" + (val + '').replace(/'/g, "\\\'") + "'";
                }
            })(val, opts, pad);
        }
    });
};

export {addonObject};
