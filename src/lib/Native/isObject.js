import {isType} from './isType';

/**
 * @name isObject
 * @description 객체 타입 여부 확인
 * @param {Array} arr - 함수
 * @return {Boolean} 타입이 함수인지 확인 후 불린값을 반환
 * @api
 * isObject(*)
 * @example
 * isObject(new Object()); // true
 */
const isObject = (obj) => {
    return isType(obj, 'object');
};

export {isObject};
