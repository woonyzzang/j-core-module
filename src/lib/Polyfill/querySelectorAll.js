import {global, doc} from '../config';

/**
 * @name querySelectorAllPolyfill
 * @description 쿼리 전체 셀렉터 폴리필 기능 지원
 * @example
 * document.querySelectorAll('a');
 */
export default () => {
    if (!doc.querySelectorAll) {
        doc.querySelectorAll = function(selectors) {
            let style = doc.createElement('style'),
                elements = [],
                element;

            doc.documentElement.firstChild.appendChild(style);

            doc._qsa = [];
            style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';

            global.scrollBy(0, 0);
            style.parentNode.removeChild(style);

            while (doc._qsa.length) {
                element = doc._qsa.shift();

                element.style.removeAttribute('x-qsa');
                elements.push(element);
            }

            doc._qsa = null;

            return elements;
        };
    }
};
