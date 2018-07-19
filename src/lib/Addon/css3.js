import {doc} from '../config';
import {Core} from '../Core/core';

/**
 * @namespace
 * @name Core.css3
 */
const addonCss3 = () => {
    Core.define('css3', function() {
        const _tmpDiv = Core.tmpNode,
            _prefixes = ['Webkit', 'Moz', 'O', 'ms', ''],
            _style = _tmpDiv.style,
            _noReg = /^([0-9]+)[px]+$/,
            _vender = (function () {
                const venders = ['t', 'webkitT', 'MozT', 'msT', 'OT'];

                for (let i = 0, len = venders.length; i < len; i++) {
                    if (venders[i] + 'ransitionDuration' in _style && venders[i] + 'ransform' in _style) {
                        return venders[i].substr(0, venders[i].length - 1);
                    }
                }

                return false;
            })();

        function prefixStyle(name, isHyppen) {
            if (_vender === false || _vender === '') { return (isHyppen)? name.toLowerCase() : name; }
            if (isHyppen) { return '-' + _vender.toLowerCase() + '-' + name[0].toLowerCase() + Core.string.dasherize(name.substr(1)); }

            return _vender + Core.string.capitalize(name);
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = global.pageXOffset || doc.documentElement.scrollLeft,
                scrollTop = global.pageYOffset || doc.documentElement.scrollTop;

            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }

        return {
            /**
             * 주어진 css명 앞에 현재 브라우저에 해당하는 벤더 prefix를 붙여준다.
             * @name {{LIB_NAME}}.css3.prefix
             * @param {String} cssName css명
             * @return {String}
             * @example
             * {{LIB_NAME}}.css3.prefix('transition'); // webkitTransition
             * {element}.style[{{LIB_NAME}}.css3.prefix('transform')] = 'translate(50px, 100px)';
             */
            prefix: prefixStyle,

            /**
             * css3 지원여부
             * @name {{LIB_NAME}}.css3.support
             * @return {Boolean}
             * @example
             * if ({{LIB_NAME}}.css3.support) {} // css3 지원 여부 확인
             */
            support: _vender !== false,

            /**
             * 3d style 지원여부
             * @name {{LIB_NAME}}.css3.support3D
             * @return {Boolean}
             * @example
             * if ({{LIB_NAME}}.css3.support3D) {} // css3 3d 지원 여부 확인
             */
            support3D: (function () {
                let body = doc.getElementsByTagName('body')[0],
                    docEl = doc.documentElement,
                    docOverflow;

                if (!body) {
                    body = doc.createElement('body');

                    body.fake = true;
                    body.style.background = '';
                    body.style.overflow = 'hidden';
                    body.style.padding = '0';
                    docEl.appendChild(body);
                }

                docOverflow = docEl.style.overflow;
                docEl.style.overflow = 'hidden';

                let parent = doc.createElement('div'),
                    div = doc.createElement('div'),
                    cssTranslate3dSupported;

                div.style.position = 'absolute';
                parent.appendChild(div);
                body.appendChild(parent);

                div.style[prefixStyle('transform')] = 'translate3d(20px, 0, 0)';
                cssTranslate3dSupported = ((offset(div).left - div.offsetLeft) === 20);

                if (body.fake) {
                    body.parentNode.removeChild(body);
                    docEl.offsetHeight;
                    body = null;
                } else {
                    parent.parentNode.removeChild(parent);
                }

                docEl.style.overflow = docOverflow;

                return cssTranslate3dSupported;
            })(),

            /**
             * 주어진 css속성을 지원하는지 체크
             * @name {{LIB_NAME}}.css3.has
             * @param {String} cssName 체크하고자 하는 css명
             * @return {Boolean} 지원여부
             * @example
             * if ({{LIB_NAME}}.css3.has('transform')) {} // css 속성 지원 여부 확인
             */
            has: function(name) {
                let i = _prefixes.length;

                if (name in _style) { return true; }

                name = Core.string.capitalize(name);

                while (i--) {
                    if (_prefixes[i] + name in _style) { return true; }
                }

                return false;
            },

            /**
             * transform 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transform
             * @example
             * {{LIB_NAME}}.css3.transform;
             */
            transform: prefixStyle('transform'),

            /**
             * transitionTimingFunction 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transitionTimingFunction
             * @example
             * {{LIB_NAME}}.css3.transitionTimingFunction;
             */
            transitionTimingFunction: prefixStyle('transitionTimingFunction'),

            /**
             * transitionDuration 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transitionDuration
             * @example
             * {{LIB_NAME}}.css3.transitionDuration;
             */
            transitionDuration: prefixStyle('transitionDuration'),

            /**
             * transitionDelay 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transitionDelay
             * @example
             * {{LIB_NAME}}.css3.transitionDelay;
             */
            transitionDelay: prefixStyle('transitionDelay'),

            /**
             * transformOrigin 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transformOrigin
             * @example
             * {{LIB_NAME}}.css3.transformOrigin;
             */
            transformOrigin: prefixStyle('transformOrigin'),

            /**
             * transition 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transition
             * @example
             * {{LIB_NAME}}.css3.transition;
             */
            transition: prefixStyle('transition'),

            /**
             * translateZ 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.translateZ
             * @example
             * {{LIB_NAME}}.css3.translateZ;
             */
            translateZ: (prefixStyle('perspective') in _style)? ' translateZ(0)' : '',

            /**
             * transitionEnd 벤더 prefix 반환
             * @name {{LIB_NAME}}.css3.transitionEnd
             * @example
             * {{LIB_NAME}}.css3.transitionEnd;
             */
            transitionEnd: (function() {
                const names = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    transition: 'transitionend'
                };

                for (let name in names) {
                    if (typeof Core.tmpNode.style[name] !== 'undefined') { return names[name]; }
                }

                return 'transitionend';
            })(), // 'transitionend webkitTransitionEnd MSTransitionEnd'

            /**
             * 엘리먼트 요소의 현재 위치를 반환
             * @name {{LIB_NAME}}.css3.position
             * @param {DOMSeletor} selector - DOM 셀렉터
             * @return {Object} data
             * @return {Number} data.x
             * @return {Number} data.y
             * @example
             * {{LIB_NAME}}.css3.position({selctor});
             */
            position: (function() {
                let support = _vender !== false;
                const transform = prefixStyle('transform');

                return (support)? function(selector) {
                    let matrix = (global.getComputedStyle)? global.getComputedStyle(selector, null) : selector.currentStyle,
                        x = 0,
                        y = 0;

                    if (!matrix[transform] || matrix[transform] === 'none') { return {x: 0, y: 0}; }

                    matrix = matrix[transform].split(')')[0].split(', ');
                    x = +(matrix[12] || matrix[4] || 0);
                    y = +(matrix[13] || matrix[5] || 0);

                    return {x: x, y: y};
                } : function(selector) {
                    let matrix = selector.style,
                        x = 0,
                        y = 0;

                    x = +matrix.left.replace(/[^-\d.]/g, '');
                    y = +matrix.top.replace(/[^-\d.]/g, '');

                    return {x: x, y: y};
                };
            })(),

            /**
             * css3로 움직여주는 함수
             * @name {{LIB_NAME}}.css3.move
             * @param {DOMSelector} selector - DOM 셀렉터
             * @param {Number|String} x
             * @param {Nymber|String} y
             * @param {Float} dur
             * @param {Function(el)} cb
             * @example
             * {{LIB_NAME}}.css3.move(document.getElementsByTagName({selctor})[0], 100, 200, 2, function() { alert('a'); });
             */
            move: function(selector, x, y, dur, cb) {
                const unitX = Core.is(x, 'number')? 'px' : '',
                    unitY = Core.is(y, 'number')? 'px' : '';

                selector.style[this.transitionDuration] = dur + 's';
                selector.style[this.transform] = 'translate(' + x + unitX + ', ' + y + unitY + ')' + this.translateZ;

                if (cb) {
                    addEvent(selector, this.transitionEnd, function() {
                        cb.call(selector);
                    }, false);
                }
            },

            /**
             * css3로 움직여주는 애니메이션 함수
             * @name {{LIB_NAME}}.css3.animate
             * @param {DOMSelector} selectors - DOM 셀렉터
             * @param {Number|String} x
             * @param {Number|String} y
             * @param {Float} dur
             * @param {Function(el)} cb
             * {{LIB_NAME}}.css3.animate(document.getElementsByTagName({selctor}), 100, 100, 2, function() { alert('a'); });
             */
            animate: function(selectors, x, y, dur, cb) {
                const rfxnum = /^([+-]=)?([\d+-.]+)(.*)$/,
                    xParts = rfxnum.exec(x),
                    yParts = rfxnum.exec(y);

                for (let i = 0, len = selectors.length; i < len; i++) {
                    let $this = selectors[i],
                        postion = this.position($this),
                        startX = parseInt(postion.x, 10), // 최초 x좌표 위치
                        endX = parseFloat(xParts[2]),
                        unitX = xParts[3] || 'px',
                        startY = parseInt(postion.y, 10), // 최초 y좌표 위치
                        endY = parseFloat(yParts[2]),
                        unitY = yParts[3] || 'px';

                    // translateX 계산
                    if (unitX !== 'px') { startX = (startX / $this.offsetWidth) * 100; }
                    if (xParts[1]) { endX = (((xParts[1] === '-=')? -1 : 1) * endX) + startX; }

                    // translateY 계산
                    if (unitY !== 'px') { startY = (startY / $this.offsetHeight) * 100; }
                    if (yParts[1]) { endY = (((yParts[1] === '-=')? -1 : 1) * endY) + startY; }

                    $this.style[this.transitionDuration] = dur + 's';
                    $this.style[this.transitionTimingFunction] = 'ease-in-out';
                    $this.style[this.transform] = 'translate(' + (endX|0) + unitX + ', ' + (endY|0) +  unitX + ') translateZ(0px)';

                    if (cb) {
                        Core.dom.addEvent($this, this.transitionEnd, function() {
                            cb.call($this);
                        }, false);
                    }
                }
            },

            /**
             * css3 transitionStyle 추가
             * @name {{LIB_NAME}}.css3.transitionStyle
             * @param {DOMSelector} selector - 대상요소
             * @param {String} motion
             * @param {Float} dur
             * @param {String} easing
             * {{LIB_NAME}}.css3.transitionStyle(document.getElementsByTagName({selector})[0], 'width', 2, 'ease-in');
             */
            transitionStyle: function(selector, motion, dur, easing) {
                selector.style[this.transition] = motion;
                selector.style[this.transitionDuration] = dur + 's';
                selector.style[this.transitionTimingFunction] = easing;
            }
        };
    });
};

export {addonCss3};
