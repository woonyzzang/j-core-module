import {Core} from '../Core/core';

/**
 * @namespace
 * @name Core.dom
 * @description DOM 관련 코어 확장 함수
 */
const addonDom = () => {
    Core.define('dom', {
        /**
         * @name {{LIB_NAME}}.dom.getEventPoint
         * @description 이벤트의 좌표 추출
         * @param {Event} e - 이벤트 객체
         * @param {String} type - mouseend나 touchend 이벤트일때 'end'를 넘겨주면 좀더 정확한 값이 반환된다.
         * @return {x: (*|Number), y: (*|Number)}
         * @example
         * document.getElementsByTagName('body')[0].addEventListener('click', function(e) {
         *     console.log( {{LIB_NAME}}.dom.getEventPoint(e, 'end') );
         * }, false);
         * // {x: 165, y: 21}
         */
        getEventPoint: function(e, type) {
            let event = e.originalEvent || e;

            if (type === 'end' || event.type === 'touchend') {
                event = event.changedTouches && event.changedTouches[0] || event;
            } else {
                event = event.touches && event.touches[0] || event;
            }

            return {
                x: event.pageX || event.clientX,
                y: event.pageY || event.clientY
            };
        },

        /**
         * @name {{LIB_NAME}}.dom.getMouseButton
         * @description 마우스 좌/우 클릭 버튼 구분 확인
         * @param {Event} e - 이벤트 객체
         * @return {String} 클릭된 마우스 좌/우 버튼 문자열 반환
         * @example
         * document.getElementsByTagName('body')[0].addEventListener('mousedown', function(e) {
         *     console.log( {{LIB_NAME}}.dom.getMouseButton(e) );
         * }, false);
         * // 마우스 좌측: 'left'
         * // 마우스 휠: 'middle'
         * // 마우스 우측: 'right'
         */
        getMouseButton: function(e) {
            let type = '';

            if (e.which) {
                // type = (e.which < 2)? 'left' : ((e.which === 2)? 'middle' : 'right');
                switch (e.which) {
                    case 1:
                        type = 'left';
                        break;
                    case 2:
                        type = 'middle';
                        break;
                    case 3:
                        type = 'right';
                        break;
                }
            } else { // IE
                type = (e.button < 2)? 'left' : ((e.button === 4)? 'middle' : 'right');
            }

            return type;
        },

        /**
         * @name {{LIB_NAME}}.dom.getCaretPos
         * @description 입력창 셀렉션 영역 캐럿 커서 위치 반환
         * @param {DOMSeletor} selector - DOM 셀렉터
         * @return {begin: Number, end: Number}
         * @example
         * document.getElementsByTagName('textarea')[0].addEventListener('focus', function(e) {
         *      console.log( {{LIB_NAME}}.dom.getCaretPos(this) );
         * }, false);
         * // {begin: 8, end: 14}
         */
        getCaretPos: function(selector) {
            if (Core.is(selector.selectionStart, 'number')) {
                return {
                    begin: selector.selectionStart,
                    end: selector.selectionEnd
                };
            }

            const range = doc.selection.createRange();

            if (range && range.parentElement() === selector) {
                const inputRange = selector.createTextRange(),
                    endRange = selector.createTextRange(),
                    length = selector.value.length;

                inputRange.moveToBookmark(range.getBookmark());
                endRange.collapse(false);

                if (inputRange.compareEndPoints('StartToEnd', endRange) > -1) {
                    return {
                        begin: length,
                        end: length
                    };
                }

                return {
                    begin: -inputRange.moveStart('character', -length),
                    end: -inputRange.moveEnd('character', -length)
                };
            }

            return {
                begin: 0,
                end: 0
            };
        },

        /**
         * @name {{LIB_NAME}}.dom.setCaretPos
         * @description 입력창 셀렉션 영역 캐럿 커서 위치 설정
         * @param {DOMSeletor} selector - DOM 셀렉터
         * @param {Number} pos - 캐럿 커서 위치
         * @example
         * document.getElementsByTagName('textarea')[0].addEventListener('focus', function() {
         *     {{LIB_NAME}}.dom.setCaretPos(this, 3);
         * }, false);
         */
        setCaretPos: function(selector, pos) {
            if (!Core.is(pos, 'object')) {
                pos = {
                    begin: pos,
                    end: pos
                };
            }

            if (selector.setSelectionRange) {
                // selector.focus();
                selector.setSelectionRange(pos.begin, pos.end);
            } else if (selector.createTextRange) {
                const range = selector.createTextRange();

                range.collapse(true);
                range.moveStart('character', pos.begin);
                range.moveEnd('character', pos.end);
                range.select();
            }
        },

        /**
         * @name {{LIB_NAME}}.dom.contains
         * @description 자식 요소가 특정한 부모요소에 속해 있는지 확인
         * @param {DOMSeletor} parent - 부모 DOM 셀렉터
         * @param {DOMSeletor} child - 자식 DOM 셀렉터
         * @return {Boolean}
         * @example
         * console.log( {{LIB_NAME}}.dom.contains(document.documentElement, document.getElementsByTagName('h1')[0]) ); // true
         */
        contains: function(parent, child, is) {
            if (!parent || !child) { return false; }

            if ('contains' in parent) {
                return (parent !== child && parent.contains(child)) || (is === true && parent === child);
            } else {
                return (parent.compareDocumentPosition(child) % 16) || (is === true && parent === child);
            }
        },

        /**
         * @name {{LIB_NAME}}.dom.addClass
         * @description 해당 요소의 클래스 추가
         * @param {DOMSeletor} element - DOM 셀렉터
         * @param {String} className - 클래스명
         * @example
         * {{LIB_NAME}}.dom.addClass({selector}, 'selected');
         */
        addClass: function(element, className) {
            element.className += ' ' + className;
        },

        /**
         * @name {{LIB_NAME}}.dom.removeClass
         * @description 해당 요소의 클래스 삭제
         * @param {DOMSeletor} element - DOM 셀렉터
         * @param {String} className - 클래스명
         * @example
         * {{LIB_NAME}}.dom.removeClass({selector}, 'selected');
         */
        removeClass: function(element, className) {
            const check = new RegExp('(\\s|^)' + className + '(\\s|$)');

            element.className = Core.string.trim(element.className.replace(check, ' '));
        },

        /**
         * @name {{LIB_NAME}}.dom.toggleClass
         * @description 해당 요소의 특정 클래스 존재 유무 확인
         * @param {DOMSeletor} element - DOM 셀렉터
         * @param {String} className - 클래스명
         * @return {Boolean}
         * @example
         * {{LIB_NAME}}.dom.hasClass({selector}, 'on');
         */
        hasClass: function(element, className) {
            return element.className.match(new RegExp('(\\s|^)'+ className +'(\\s|$)'));
        },

        /**
         * @name {{LIB_NAME}}.dom.toggleClass
         * @description 토글 클래스
         * @param {DOMSeletor} element - DOM 셀렉터
         * @param {String} className - 클래스명
         * @example
         * {{LIB_NAME}}.dom.toggleClass({selector}, 'toggle');
         */
        toggleClass: function(element, className) {
            const check = new RegExp('(\\s|^)' + className + '(\\s|$)');

            if (check.test(element.className)) {
                element.className = Core.string.trim(element.className.replace(check, ' '));
            } else {
                element.className += ' ' + className;
            }
        },

        /**
         * @name {{LIB_NAME}}.dom.addEvent
         * @description 이벤트 핸들러
         * @param {DOMSeletor} element - DOM 셀렉터
         * @param {String} eventType - 이벤트 타입
         * @param {Function} cb - 콜백함수
         * @param {Boolean} isCapture - 이벤트 캡쳐링
         * @example
         * {{LIB_NAME}}.dom.addEvent({selector}, 'click', function(e) {
         *     alert('clicked!');
         * }, false);
         */
        addEvent: function(element, eventType, cb, isCapture) {
            (!isCapture)? false : isCapture;

            if (global.addEventListener) {
                element.addEventListener(eventType, cb, isCapture);
            } else if (global.attachEvent) {
                element.attachEvent('on' + eventType, cb);
            } else {
                element['on' + eventType] = cb;
            }
        },

        /**
         * http://beeker.io/jquery-document-ready-equivalent-vanilla-javascript
         * @name {{LIB_NAME}}.dom.ready
         * @description document 로드 이벤트 핸들러
         * @param {Function} callback - 콜백함수
         * @example
         * {{LIB_NAME}}.dom.ready(function() {
         *     alert('DOM Loaded!');
         * });
         */
        ready: function(callback) {
            var ready = false;

            var detach = function() {
                if(document.addEventListener) {
                    document.removeEventListener('DOMContentLoaded', completed);
                    window.removeEventListener('load', completed);
                } else {
                    document.detachEvent('onreadystatechange', completed);
                    window.detachEvent('onload', completed);
                }
            };

            var completed = function() {
                if(!ready && (document.addEventListener || event.type === 'load' || document.readyState === 'complete')) {
                    ready = true;

                    detach();
                    callback();
                }
            };

            if (document.readyState === 'complete') {
                callback();
            } else if(document.addEventListener) {
                document.addEventListener('DOMContentLoaded', completed);
                window.addEventListener('load', completed);
            } else {
                document.attachEvent('onreadystatechange', completed);
                window.attachEvent('onload', completed);

                var top = false;

                try {
                    top = window.frameElement == null && document.documentElement;
                } catch(e) {}

                if (top && top.doScroll) {
                    (function scrollCheck() {
                        if(ready) { return; }

                        try {
                            top.doScroll("left");
                        } catch(e) {
                            return setTimeout(scrollCheck, 50);
                        }

                        ready = true;

                        detach();
                        callback();
                    })();
                }
            }
        }
    });
};

export {addonDom};
