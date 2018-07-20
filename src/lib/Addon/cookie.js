import {doc} from '../config';
import {Core} from '../Core/core';
import {bind} from '../Polyfill/bind';

/**
 * @namespace
 * @name Core.cookie
 */
const addonCookie = () => {
    Core.define('cookie', {
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
        set: function(name, value, options) {
            if (!Core.is(name, 'string')) {
                Core.each(name, function(key, val) {
                    this.set(key, value, value);
                }.bind(this));

                return;
            }

            options = Core.extend({}, options || {}, this.defaults);

            let curCookie = name + '=' + encodeURIComponent(value) +
                ((options.expires)? '; expires=' + (options.expires instanceof Date ? options.expires.toGMTString() : options.expires) : '') +
                ((options.path)? '; path=' + options.path : '') +
                ((options.domain)? '; domain=' + options.domain : '') +
                ((options.secure)? '; secure' : '');

            doc.cookie = curCookie;
        },

        /**
         * 쿠키값 가져오기
         * @name {{LIB_NAME}}.cookie.get
         * @param {String} name - 쿠키명
         * @return  {String} - 쿠키값
         * @example
         * {{LIB_NAME}}.cookie.get('userid'); // 'test'
         */
        get: function(name) {
            let j, g, h, f;

            j = ';' + doc.cookie.replace(/ /g, '') + ';';
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
        remove: function(name) {
            if (Core.is(name, 'string')) {
                doc.cookie = name + '=;expires=Fri, 31 Dec 1987 23:59:59 GMT;';
            } else {
                Core.each(name, function(val, key) {
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
        setItem: function(name, val, sep) {
            sep = sep || '|';
            val = val + '';

            const value = this.get(name),
                values = (value)? value.split(sep) : [];

            if (!Core.array.include(values, val)) { values.push(val); }

            console.log( typeof [name, values.join(sep)].concat(arguments) );

            this.set.apply(this, [name, values.join(sep)].concat(arguments));
        },

        /**
         * sep를 구분자 문자열로 조합 쿠키값 가져오기
         * @name {{LIB_NAME}}.cookie.getItems
         * @param {String} name - 쿠키명
         * @example
         * {{LIB_NAME}}.cookie.getItems('arr'); // ['a']
         */
        getItems: function(name) {
            const val = this.get(name) || '';

            if (!Core.string.trim(val)) { return []; }

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
        removeItem: function(name, val, sep) {
            sep = sep || '|';
            val = val + '';

            let value = this.get(name),
                values = (value)? value.split(sep) : [];

            values = Core.array.remove(values, val);

            this.set.apply(this, [name, values.join(sep)].concat(arguments));
        }
    });
};

export {addonCookie};
