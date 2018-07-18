/**
 * [JUI] 모듈 추가 등록
 * @create {yy.mm.dd}
 * @author {...}
 * @log {...}
 */

 // #모듈 등록 패턴
 // core.module.모듈명 = function(app) {
 //     app.모듈이름 = core.Class({
 //         _constructor: function() {}, // 생략가능
 //         show: function() {}, // 메소드 작성...
 //         hide: function() {} // 메소드 작성...
 //     });
 // };
 
/**
 * @name bindjQuery
 * @description 작성된 클래스를 jQuery의 플러그인으로 사용할 수 있도록 바인딩시켜 주는 모듈
 */
;(function(global, doc, core, $) {
    'use strict';

    core.bindjQuery = function(className, bindName) {
        var TypeClass = core.emptyFn;

        TypeClass.prototype = new className;
        TypeClass.prototype.constructor = TypeClass;

        $.fn[bindName] = function(options) {
            var _this = this;

            core.each(this, function(index) {
                if (core.is(options, 'string')) { // 단일 메소드 실행
                    new className()[options].apply(TypeClass, Array.prototype.slice.call(arguments, 1));
                } else {
                    className.apply(new TypeClass, [_this, options]);
                }
            });

            return this;
        };
    };
})(window, document, JUI, jQuery);

/**
 * @name fn
 * @module fn.highlight
 * @description 하이라이트 영역 표시 jQuery 플러그인화 모듈
 */
;(function(global, doc, core, $) {
    'use strict';

    core.module.fn = function(app) {
        app.highlight = core.Class({
            _constructor: function(selecter, options) { // 생성자의 형식을 반드시 지킬 것 (첫번째 인수: 대상 엘리먼트, 두번째 인수: 옵션값들)
                var settings = $.extend({
                    color: 'red',
                    backgroundColor: 'yellow'
                }, options);

                this.render(selecter, settings);
            },
            render: function(selecter, settings) {
                $(selecter).css({
                    color: settings.color,
                    backgroundColor: settings.backgroundColor
                });
            },
            render2: function() {
                $('body').css('backgroundColor', 'orange');
            }
        });
    };
})(window, document, JUI, jQuery);
