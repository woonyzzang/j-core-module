import {Core} from '../Core/core';

/**
 * @namespace
 * @name Core.util
 * @description 유틸 관련 코어 확장 함수
 */
const addonUtil = () => {
    Core.define('util', {
        /**
         * @name {{LIB_NAME}}.util.browser
         * @description 브라우저의 Detect 정보: 되도록이면 Modernizr 라이브러리를 사용할 것을 권함
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
        browser: (function() {
            let detect = {},
                win = global,
                na = win.navigator,
                ua = na.userAgent,
                lua = ua.toLowerCase(),
                match;

            detect.isStrict = (typeof win === 'undefined');
            detect.isRetina = 'devicePixelRatio' in win && win.devicePixelRatio > 1;
            detect.isAndroid = lua.indexOf('android') !== -1;
            detect.isBadAndroid = /Android /.test(na.appVersion) && !(/Chrome\/\d/.test(na.appVersion));
            detect.isOpera = !!(win.opera && win.opera.buildNumber);
            detect.isWebKit = /WebKit/.test(ua);

            match = /(msie) ([\w.]+)/.exec(lua) || /(trident)(?:.*rv.?([\w.]+))?/.exec(lua) || ['', null, -1];
            detect.isIE = !detect.isWebKit && !detect.isOpera && match[1] !== null;
            detect.version = detect.ieVersion = parseInt(match[2], 10);
            detect.isOldIE = detect.isIE && detect.version < 9;

            detect.isWin = (na.appVersion.indexOf('Win') !== -1);
            detect.isMac = (ua.indexOf('Mac') !== -1);
            detect.isLinux = (na.appVersion.indexOf('Linux') !== -1);
            detect.is64Bit = (lua.indexOf('wow64') > -1 || (na.platform === 'Win64' && lua.indexOf('x64') > -1));

            detect.isChrome = (ua.indexOf('Chrome') !== -1);
            detect.isGecko = (ua.indexOf('Firefox') !== -1);
            detect.isAir = ((/adobeair/i).test(ua));
            detect.isIOS = /(iPad|iPhone)/.test(ua);
            detect.isSafari = !detect.isChrome && (/Safari/).test(ua);
            detect.isIETri4 = (detect.isIE && ua.indexOf('Trident/4.0') !== -1);

            detect.msPointer = !!(na.msPointerEnabled && na.msMaxTouchPoints && !win.PointerEvent);
            detect.pointer = !!((win.PointerEvent && na.pointerEnabled && na.maxTouchPoints) || detect.msPointer);

            if (detect.isAndroid) {
                detect.androidVersion = function() {
                    const v = ua.match(/[a|A]ndroid[^\d]*(\d+).?(\d+)?.?(\d+)?/);

                    if (!v) { return -1; }

                    return [parseInt(v[1]|0, 10), parseInt(v[2]|0, 10), parseInt(v[3]|0, 10)];
                }();
            } else if (detect.isIOS) {
                detect.iosVersion = function() {
                    const v = ua.match(/OS (\d+)_?(\d+)?_?(\d+)?/);

                    return [parseInt(v[1]|0, 10), parseInt(v[2]|0, 10), parseInt(v[3]|0, 10)];
                }();
            }

            detect.supportCanvas = !!document.createElement('canvas').getContext;
            detect.isMobile =  ('orientation' in win) || detect.isIOS || detect.isAndroid;
            detect.isTouch = !!('ontouchstart' in win);
            detect.placeholder = ('placeholder' in Core.tmpInput);

            return detect;
        })(),

        /**
         * @name {{LIB_NAME}}.util.delayRun
         * @description 주어진 시간내에 호출이 되면 무시되고, 초과했을 때만 비로소 fn를 실행시켜주는 함수
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
        delayRun: function(fn, time, scope) {
            time || (time = 250);

            let timeout = null;

            return function() {
                if (timeout) { global.clearTimeout(timeout); }

                const args = arguments,
                    me = this;

                timeout = global.setTimeout(function() {
                    fn.apply(scope || me, args);
                    timeout = null;
                }, time);
            };
        },

        /**
         * @name {{LIB_NAME}}.util.getUniqId
         * @description 15자의 영문, 숫자로 이루어진 유니크한 값 생성
         * @return {string}
         * @example
         * {{LIB_NAME}}.util.getUniqId(45); //eronv05ez56qjypsvrzheypyariyh6deodwpqu74j834w
         */
        getUniqId: function(len) {
            len = len || 32;
            let rdmString = '';

            for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));

            return rdmString.substr(0, len);
        },

        /**
         * @name {{LIB_NAME}}.util.nextSeq
         * @description 순번으로 유니크값을 생성해서 반환
         * @return {number}
         * @example
         * {{LIB_NAME}}.util.nextSeq(); // 순차적으로 실행할 때 마다 1, 2, 3... 반환
         */
        nextSeq: (function () {
            let seq = 0;

            return function(prefix) {
                return (prefix || '') + (seq += 1);
            };
        }()),

        /**
         * @name {{LIB_NAME}}.util.template
         * @description 템플릿 생성
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
         * @name {{LIB_NAME}}.util.template2
         * @description 템플릿 생성
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
        template: function(selector, data) {
            const templateStr = selector.innerHTML;
            let result = null;

            for (let key in data) {
                result = templateStr.replace('{{' + key + '}}', data[key]);
            }

            return result;
        }
    });

    /** 코어 별칭 */
    Core.browser = Core.util.browser;
};

export {addonUtil};
