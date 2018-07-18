import {Core} from '../Core/core';

/**
 * @namespace
 * @name Core.uri
 */
const addonUri = () => {
    Core.define('uri', {
        /**
         * 현재 페이지의 호스트주소를 반환
         * @returns {String}
         * @example
         * {{LIB_NAME}}.getHost();
         */
        getHost: function() {
            const loc = doc.location;

            return loc.protocol + '//' + loc.host;
        },
        /**
         * 현재 url 반환(쿼리스트링, # 제외)
         * @returns {String}
         * @example
         * {{LIB_NAME}}.getPageUrl();
         */
        getPageUrl: function() {
            const loc = doc.location;

            return loc.protocol + '//' + loc.host + loc.pathname;
        },

        /**
         * 주어진 url에 쿼리스츠링을 조합
         * @name {{LIB_NAME}}.uri.addParam
         * @param {String} url
         * @param {String|Object} string
         * @return {String}
         * @example
         * {{LIB_NAME}}.uri.addParam('board.do', {a:1, b: 2, c: {d: 4}}); // 'board.do?a=1&b=2&c[d]=4'
         * {{LIB_NAME}}.uri.addParam('board.do?id=123', {a:1, b: 2, c: {d: 4}}); // 'board.do?id=123&a=1&b=2&c[d]=4'
         */
        addParam: function (url, string) {
            if (Core.is(string, 'object')) { string = Core.object.toQueryString(string); }
            if (!Core.isEmpty(string)) { return url + ((url.indexOf('?') === -1)? '?' : '&') + string; }

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
        parseQuery: function(query) {
            if (!query) { return {}; }
            if (query.length > 0 && query.charAt(0) === '?') { query = query.substr(1); }

            let params = (query + '').split('&'),
                obj = {},
                params_length = params.length,
                tmp = '',
                i;

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
        parseUrl: (function() {
            const o = {
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

            return function(str) {
                if (str.length > 2 && str[0] === '/' && str[1] === '/') { str = global.location.protocol + str; }

                let m = o.parser[(o.strictMode)? 'strict' : 'loose'].exec(str),
                    uri = {},
                    i = 14;

                while (i--) {
                    uri[o.key[i]] = m[i] || '';
                }

                return uri;
            };
        })(),

        /**
         * 주어진 url에서 해쉬문자열 제거
         * @name {{LIB_NAME}}.uri.parseUrl
         * @param {string} url - url 문자열
         * @return {string} 결과 문자열
         * @example
         * {{LIB_NAME}}.uri.removeHash('list.do#comment'); // 'list.do'
         */
        removeHash: function(url) {
            return (url)? url.replace(/#.*$/, '') : url;
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
        getParam: function(name) {
            let search = global.location.search,
                params;

            if (!search || search.indexOf(name) < 0) { return ''; }

            params = this.parseQuery(search);

            return params[name] || '';
        }
    });
};

export {addonUri};
