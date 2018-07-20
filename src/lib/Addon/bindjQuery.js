import {Core} from '../Core/core';

/**
 * @namespace
 * @name Core.bindjQuery
 * @description 네임스페이스 관련 코어 확장 함수
 */
const addonBindjQuery = () => {
    Core.define('bindjQuery', function() {
        /**
         * @name {{LIB_NAME}}.bindjQuery
         * @description 작성된 클래스를 jQuery의 플러그인으로 사용할 수 있도록 바인딩시켜 주는 함수
         * @param {Object} Klass 클래스
         * @param {string} name 플러그인명
         * @example
         * // 클래스 정의
         * var Highlight = {{LIB_NAME}}.Class({
         *     _constructor: function(selecter, options) { // 생성자의 형식을 반드시 준수 (첫번째 인수: 대상 엘리먼트, 두번째 인수: 옵션값들)
         *         var settings = $.extend({
         *              color: 'red',
         *              backgroundColor: 'yellow'
         *          }, options);
         *
         *          this.render(selecter, settings);
         *     },
         *     render: function(selecter, settings) {
         *          $(selecter).css({
         *              color: settings.color,
         *              backgroundColor: settings.backgroundColor
         *          });
         *      }
         * });
         * {{LIB_NAME}}.bindjQuery(Highlight, 'highlight'); // jQuery 바인딩 선언
         * $('body').highlight({color: 'blue', backgroundColor: 'green'}); // jQuery 바인딩 사용
         */
        return function(Klass, name, prefix) {
            if (typeof jQuery == 'undefined') { throw new Error('This library requires jQuery'); }

            var pluginName = (prefix)? prefix + name.substr(0, 1).toUpperCase() + name.substr(1) : name,
                old = $.fn[pluginName];

            $.fn[pluginName] = function(options) {
                var args = Array.prototype.slice.call(arguments, 1),
                   _this = this,
                   returnValue = _this;

                this.each(function() {
                    var $this = $(this),
                        methodValue,
                        instance = $this.data('ui_' + name);

                    if (instance && options === 'release') {
                        try {
                            instance.release();
                        } catch (e) {}

                        $this.removeData('ui_' + name);

                        return;
                    }

                    if (!instance || (arguments.length === 1 && typeof options !== 'string')) {
                        instance && (instance.release(), $this.removeData('ui_' + name));
                        $this.data('ui_' + name, (instance = new Klass(this, Core.extend({}, $this.data(), options), _this)));
                    }

                    if (options === 'instance') {
                        returnValue = instance;

                        return false;
                    }

                    if (typeof options === 'string' && Core.is(instance[options], 'function')) {
                        if (options.substr(0, 1) === '_') {
                            throw new Error('[bindjQuery] private 메소드는 호출할 수 없습니다.');
                        }

                        try {
                            methodValue = instance[options].apply(instance, args);
                        } catch (e) {
                            console.error('[' + name + '.' + options + ' error] ' + e);
                        }

                        if (methodValue !== instance && typeof methodValue !== 'undefined') {
                            returnValue = methodValue;

                            return false;
                        }
                    }
                });

                return returnValue;
            };

            // 기존의 모듈로 복구
            $.fn[pluginName].noConflict = function() {
                $.fn[pluginName] = old;

                return this;
            };
        };
    });
};

export {addonBindjQuery};
