import {global, doc, LIB_NAME as core} from '../config';

global['LIB_DEV_DEBUG'] = false;

/**
 * debug
 * @description 로그 확인
 * @example
 * {{LIB_NAME}}.debug.log();
 * {{LIB_NAME}}.debug.logs();
 */
const debug = (() => {
    let $debugDiv = doc.createElement('div');

    $debugDiv.id = 'debug';
    $debugDiv.className = 'ui_debug';
    $debugDiv.setAttribute('style', 'overflow:auto;position:fixed;bottom:20px;right:20px;left:20px;z-index:10000;height:8%;padding:10px;border:2px solid #f00;background-color:#eee');

    /** [Polyfill] console */
    if (!global.console) { // 데스크탑 로그 확인용(콘솔을 지원하지 않는 브라우저를 위해 출력요소를 생성)
        global.console = {};

        if (global['LIB_DEV_DEBUG']) {
            if (!doc.getElementById('debug')) { doc.body.appendChild($debugDiv); }
        }

        $debugDiv = doc.getElementById('debug');

        const consoleMethods = ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd', 'trace'];

        for (let i = -1, method; method = consoleMethods[++i];) {
            (function(method) {
                global.console[method] = (global['LIB_DEV_DEBUG'])? function() {
                    while ($debugDiv.firstChild) {
                        $debugDiv.removeChild($debugDiv.firstChild);
                    }

                    $debugDiv.innerHTML = '<div style="font-size:12px;">&gt; <span>[' + method + ']</span> ' + [].slice.call(arguments).join(', ') + '</div>';
                } : function() {};
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
        log: function() {
            if (!doc.getElementById('debug')) { doc.body.appendChild($debugDiv); }

            $debugDiv = doc.getElementById('debug');

            const consoleMethods = ['log'];

            for (let i = -1, method; method = consoleMethods[++i];) {
                while ($debugDiv.firstChild) {
                    $debugDiv.removeChild($debugDiv.firstChild);
                }

                $debugDiv.innerHTML = '<div style="font-size:12px;">&gt; <span>[' + method + ']</span> ' + [].slice.call(arguments).join(', ') + '</div>';
            }
        },

        /**
         * 모바일 로그 확인용
         * @name {{LIB_NAME}}.degug.logs
         * @example
         * {{LIB_NAME}}.degug.logs('...');
         */
        logs: function() { // 모바일 로그 확인용
            if (!doc.getElementById('debug')) { doc.body.appendChild($debugDiv); }

            $debugDiv = doc.getElementById('debug');

            const $outputDiv = doc.createElement('div');
            const consoleMethods = ['log'];

            for (let i = -1, method; method = consoleMethods[++i];) {
                $outputDiv.innerHTML = '<div style="font-size:12px;">&gt; <span>[' + method +' '+ $debugDiv.childNodes.length + ']</span> ' + [].slice.call(arguments).join(', ') + '</div>';

                $debugDiv.insertBefore($outputDiv, $debugDiv.firstChild);
            }
        }
    };
})();

export {debug};
