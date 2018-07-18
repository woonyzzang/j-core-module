import {Core} from '../Core/core';

/**
 * @namespace
 * @name Core.dom
 */
const addonDom = () => {
    Core.define('dom', {
        /**
         * 이벤트의 좌표 추출
         * @name {{LIB_NAME}}.dom.getEventPoint
         * @param {Event} e - 이벤트 객체
         * @param {String} type - mouseend나 touchend 이벤트일때 'end'를 넘겨주면 좀더 정확한 값이 반환된다.
         * @return {x: (*|Number), y: (*|Number)}
         * @example
         * document.getElementsByTagName('body')[0].addEventListener('click', function(e) {
         *     console.log( Core.dom.getEventPoint(e, 'end') );
         * }, false);
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
         * 마우스 좌/우 클릭 버튼 구분 확인
         * @name {{LIB_NAME}}.dom.getMouseButton
         * @param {Event} e - 이벤트 객체
         * @return {String} 클릭된 마우스 좌/우 버튼 문자열 반환
         * @example
         * document.getElementsByTagName('body')[0].addEventListener('mousedown', function(e) {
         *     console.log( Core.dom.getMouseButton(e) );
         * }, false);
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
         * 입력창 셀렉션 영역 캐럿 커서 위치 반환
         * @name {{LIB_NAME}}.dom.getCaretPos
         * @param {DOMSeletor} selector - DOM 셀렉터
         * @return {begin: Number, begin: Number}
         * @example
         * document.getElementsByTagName('textarea')[0].addEventListener('focus', function(e) {
         *      console.log( Core.dom.getCaretPos(this) );
         * }, false);
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
         * 입력창 셀렉션 영역 캐럿 커서 위치 설정
         * @name {{LIB_NAME}}.dom.setCaretPos
         * @param {DOMSeletor} selector - DOM 셀렉터
         * @example
         * document.getElementsByTagName('textarea')[0].addEventListener('focus', function() {
         *     Core.dom.setCaretPos(this, 3);
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
         * 자식 요소가 특정한 부모요소에 속해 있는지 확인
         * @name {{LIB_NAME}}.dom.contains
         * @param {DOMSeletor} parent - 부모 DOM 셀렉터
         * @param {DOMSeletor} child - 자식 DOM 셀렉터
         * @return {Boolean}
         * @example
         * console.log( Core.dom.contains(document.documentElement, document.getElementsByTagName('h1')[0]) ); // true
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
         * 해당 요소의 클래스 추가
         * @name {{LIB_NAME}}.dom.addClass
         * @param {DOMSeletor} element - DOM 셀렉터
         * @param {String} className - 클래스명
         * @example
         * {{LIB_NAME}}.dom.addClass({selector}, 'selected');
         */
        addClass: function(element, className) {
            element.className += ' ' + className;
        },

        /**
         * 해당 요소의 클래스 삭제
         * @name {{LIB_NAME}}.dom.removeClass
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
         * 해당 요소의 특정 클래스 존재 유무 확인
         * @name {{LIB_NAME}}.dom.toggleClass
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
         * 토글 클래스
         * @name {{LIB_NAME}}.dom.toggleClass
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
         * 이벤트 핸들러
         * @name {{LIB_NAME}}.dom.addEvent
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
            if (global.addEventListener) {
                element.addEventListener(eventType, cb, isCapture);
            } else if (global.attachEvent) {
                element.attachEvent('on' + eventType, cb);
            } else {
                element['on' + eventType] = cb;
            }
        }
    });
};

export {addonDom};
