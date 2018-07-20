import {isType} from './isType';

/**
 * @name isFunction
 * @description 함수 타입 여부 확인
 * @param {Array} arr - 함수
 * @return {Boolean} 타입이 함수인지 확인 후 불린값을 반환
 * @api
 * isFunction(*)
 * @example
 * isFunction(new Function()); // true
 */
const isFunction = (func) => {
    return isType(func, 'function');
};

export {isFunction};
