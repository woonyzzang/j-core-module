import {doc} from '../config';

/**
 * @name querySelectorPolyfill
 * @description 쿼리 셀렉터 폴리필 기능 지원
 * @example
 * document.querySelector('#gnb');
 */
export default () => {
    if (!doc.querySelector) {
        doc.querySelector = function(selectors) {
            const elements = doc.querySelectorAll(selectors);

            return (elements.length)? elements[0] : null;
        };
    }
};
