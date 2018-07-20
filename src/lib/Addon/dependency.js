import {Core} from '../Core/core';

/**
 * @namespace
 * @name Core.dependency
 * @description 의존성 모듈 관련 코어 확장 함수
 */
const addonDependency = () => {
    Core.define('dependency', function() {
        /**
         * @name {{LIB_NAME}}.dependency
         * @description 의존성 모듈 패턴
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
        return function() {
            const args = Array.prototype.slice.call(arguments),
                callback = args.pop();
            let modules = (args[0] && (typeof args[0] === 'string'))? args : args[0];

            if (!(this instanceof Core.dependency)) {
                return new Core['dependency'](modules, callback);
            }

            // 모듈선언이 생략되거나 전체선택자일 경우
            if (!modules || modules === '*' || modules[0] === '*') {
                modules = [];
                const ref = Core.dependency.module;

                for (let k in ref) {
                    if (Core.dependency.module.hasOwnProperty(k)) {
                        modules.push(k);
                    }
                }
            }

            for (let i = 0, len = modules.length; i < len; i++) {
                Core.dependency.module[modules[i]](this);
            }

            if ((typeof callback !== 'undefined') && (typeof callback === 'function')) {
                return callback(this);
            }
        };
    });

    /** 코어 별칭 */
    Core.modules = Core.dependency;
    Core.module = Core.dependency.module = {};
};

export {addonDependency};
