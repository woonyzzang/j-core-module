import {Core} from '../Core/core';

/**
 * 문자열 관련 유틸 함수 모음
 * @namespace
 * @name Core.string
 */
const addonString = () => {
    Core.define('string', function() {
        const escapeChars = {
            '&': '&amp;',
            '>': '&gt;',
            '<': '&lt;',
            '"': '&quot;',
            "'": '&#39;'
        },
        unescapeChars = (function(escapeChars) {
            let results = {};

            Core.each(escapeChars, function (v, k) {
                results[v] = k;
            });

            return results;
        })(escapeChars),
        escapeRegexp = /[&><'"]/g,
        unescapeRegexp = /\&[^;]+;/g, // /(&amp;|&gt;|&lt;|&quot;|&#39;|&#[0-9]{1,5};)/g,
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
            trim: function(value) {
                return (value)? value.replace(/^\s+|\s+$/g, '') : value;
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
            replaceAll: function (value, find, rep) {
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
            byteSize: function(value) {
                if (!value) { return 0; }

                return encodeURIComponent(value).replace(/%[A-F\d]{2}/g, 'U').length;
            },

            /**
             * 주어진 path에서 파일명을 추출
             * @param {String} str - path경로
             * @return {String} 경로가 제거된 파일명 반환
             * @example
             * {{LIB_NAME}}.string.getFileName('etc/bin/jslib.js'); // 'jslib.js'
             */
            getFileName: function(str) {
                const paths = str.split(/\/|\\/g);

                return paths[paths.length - 1];
            },

            /**
             * 주어진 path에서 확장자를 추출
             * @param {String} fname - path문자열
             * @return {String} 경로가 제거된 확장자 반환
             * @example
             * {{LIB_NAME}}.string.getFileExt('etc/bin/jslib.js'); // 'js'
             */
            getFileExt: function(fname) {
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
             * {{LIB_NAME}}.string.cut('동해물과', 3, '...'); // '동...'
             */
            cut: function(value, length, truncation) {
                const str = value;

                truncation || (truncation = '');

                if (str.length > length) { return str.substring(0, length) + truncation; }

                return str;
            },

            /**
             * 주어진 문자열을 지정된 길이(바이트)만큼 자른 후, 꼬리글을 덧붙여 반환
             * @param {String} value - 문자열
             * @param {Number} length - 잘라낼 길이
             * @param {String='...'} [truncation = '...'] - 꼬리글
             * @return {String} 결과 문자열 반환
             * @example
             * {{LIB_NAME}}.string.cutByByte('동해물과', 3, '...'); // "동..."
             */
            cutByByte: function(value, length, truncation) {
                const str = value,
                    chars = this.indexByByte(value, length);

                truncation || (truncation = '');

                if (str.length > chars) { return str.substring(0, chars) + truncation; }

                return str;
            },

            /**
             * 주어진 바이트길이에 해당하는 char index 반환(UTF-8 상에서 한글은 3바이트로 3바이트로 계산)
             * @param {String} value - 문자열
             * @param {Number} length - 제한 문자수
             * @return {Number} 결과 문자열에 해당하는 char index 반환
             * @example
             * {{LIB_NAME}}.string.indexByByte('동해물과', 3); // 2
             */
            indexByByte: function(value, length) {
                let len, i, c;

                if (typeof value !== 'string') { return 0; }

                for (len = i = 0; c = value.charCodeAt(i++);) {
                    len += c>>11 ? 3 : c>>7 ? 2 : 1;

                    if (len > length) { return (i > 0)? i - 1 : 0; }
                }

                return i;
            },

            /**
             * 첫글자를 대문자로 변환하고 이후의 문자들은 소문자로 변환
             * @param {String} value - 문자열
             * @return {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.capitalize('abCdEfg'); // "Abcdefg"
             */
            capitalize: function(value) {
                return (value)? value.charAt(0).toUpperCase() + value.substring(1) : value;
            },

            /**
             * 첫글자를 소문자로 변환
             * @param {String} value - 문자열
             * @returns {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.toFirstLower('Welcome'); // 'welcome'
             */
            toFirstLower: function(value) {
                return (value)? value.replace(/^[A-Z]/, function(s) {
                    return s.toLowerCase();
                }) : value;
            },

            /**
             * 카멜 형식으로 변환
             * @param {String} value - 문자열
             * @return {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.capitalize("ab-cd-efg"); // "abCdEfg"
             */
            camelize: function(value) {
                return (value)? value.replace(/(\-|_|\s)+(.)?/g, function (a, b, c) {
                    return ((c)? c.toUpperCase() : '');
                }) : value
            },

            /**
             * 대쉬 형식으로 변환
             * @param {String} value - 문자열
             * @return {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.dasherize('abCdEfg'); // 'ab-cd-efg'
             */
            dasherize: function(value) {
                return (value)? value.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase() : value;
            },

            /**
             * 주어진 문자열을 지정한 수만큼 반복하여 조합
             * @param {String} value - 문자열
             * @param {Number} cnt - 반복 횟수
             * @return {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.repeat('ab', 4); // 'abababab'
             */
            repeat: function(value, cnt, sep) {
                sep || (sep = '');

                let result = [];

                for (let i = 0; i < cnt; i++) {
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
            escapeHTML: function(value) {
                return (value)? (value + '').replace(escapeRegexp, function(m) {
                    return escapeChars[m];
                }) : value;
            },

            /**
             * HTML ENTITY로 변환된 문자열을 원래 기호로 변환
             * @param {String} value - 문자열
             * @return {String} 결과 문자열
             * @example
             * {{LIB_NAME}}.string.unescapeHTML('&lt;div&gt;&lt;a href=&quot;#&quot;&gt;링크&lt;/a&gt;&lt;/div&gt;');  // '<div><a href="#">링크</a></div>'
             */
            unescapeHTML: (function() {
                return function(value) {
                    let temp = doc.createElement('div'),
                        result = '';

                    temp.innerHTML = value;

                    for (let i = -1, item; item = temp.childNodes[++i];) {
                        result += item.nodeValue;
                    }

                    temp = null;

                    return result;
                };
            })(),

            /**
             * value === these 이면 other 를,  value !== these 이면 value 를 반환
             * @param {String} value - 현재 상태값
             * @param {String} these - 첫번째 상태값
             * @param {String} other - 두번째 상태값
             * @return {String} 토글된 상태값 반환
             * @example
             * // 정렬버튼에 이용
             * {{LIB_NAME}}.string.toggle('ASC', 'ASC', 'DESC'); // "DESC"
             * {{LIB_NAME}}.string.toggle('DESC', 'ASC', 'DESC'); // "ASC"
             */
            toggle: function(value, these, other) {
                return (value === these)? other : value;
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
            format: function(format, val) {
                const args = Core.array.toArray(arguments).slice(1),
                    isJson = Core.is(val, 'object');

                return format.replace(/\{([0-9a-z_]+)\}/ig, function (m, i) {
                    return (isJson)? val[i] : args[i] || '';
                });
            },

            /**
             * 문자열을 HTML ENTITIES로 변환
             * @param {String} value - HTML 특수기호
             * @return {String} HTML 엔티티코드 반환
             * @example
             * {{LIB_NAME}}.string.toEntities('/'); // '&#47'
             */
            toEntities: function(value) {
                let buffer = [];

                for (let i = 0, len = value.length; i < len; i++) {
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
            random: function(len) {
                let keystr = '',
                    x = 0;

                for (let i = 0; i < len; i++) {
                    x = Math.floor((Math.random() * 36));

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
            stripTags: function(value) {
                return (value || '').toString().replace(tagRegexp, '');
            },

            /**
             * 주어진 문자열에서 스크립트를 제거
             * @param {string} value - 문자열
             * @return {string} 스크립트가 제거된 문자열
             * @example
             * {{LIB_NAME}}.string.stripScripts('welcome <s'+'cript>alert('hello');</s'+'cript> to the jungle'); // 'welcome to the jungle'
             */
            stripScripts: function(value) {
                return (value||'').toString().replace(scriptRegexp, '');
            },

            /**
             * 주어진 문자열에서 한글 존재 여부 체크
             * @param {string} value - 문자열
             * @param {string} type - 옵션 구분자 ('ONLY' || 'INCLUDE')
             * @return {boolean} 결과값
             * @example
             * {{LIB_NAME}}.string.isKor('한글여부1', 'ONLY'); // false
             */
            isKor: function(value, type) {
                let check;

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

export {addonString};
