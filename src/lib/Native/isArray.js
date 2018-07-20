import {isType} from './isType';

/**
 * @name isArray
 * @description 배열 타입 여부 확인
 * @param {Array} arr - 배열
 * @return {Boolean} 타입이 배열인지 확인 후 불린값을 반환
 * @api
 * isArray(*)
 * @example
 * isArray([]); // true
 */
const isArray = (arr) => {
    return isType(arr, 'array');
};

export {isArray};
