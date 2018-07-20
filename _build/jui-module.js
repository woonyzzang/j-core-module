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
