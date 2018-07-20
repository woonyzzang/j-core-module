import {isArray} from './isArray';
import {isObject} from './isObject';

/**
 * @name each
 * @description 반복 함수
 * @param {Array|Object} obj - 배열 및 객체
 * @param {Function} cb - 콜백함수
 * @param {*} context - 컨텍스트
 * @return {Array|Object} 배열 및 객체 원형 반환
 * @api
 * each(object, function)
 * @example
 * each(['a', 'b', 'c'], function(value, index, obj) {
 *     alert('value:' + value + ', index:' + index);
 *     if (value === 'b') { return false; } // false 를 반환하면 순환을 멈춘다.
 * });
 * each({a: 'A', b: 'B', c: 'C'}, function(key, value, obj) {
 *     alert('key:' + key + ', value:' + value);
 *     if (value === 'B') { return false; } // false 를 반환하면 순환을 멈춘다.
 * });
 */
const each = (obj, cb, context) => {
    if (!obj) { return obj; }

    if (isArray(obj)) { // 배열
        for (let i = 0, len = obj.length; i < len; i++) {
            if (cb.call(context || obj, obj[i], i, obj) === false) { break; }
        }
    } else if (isObject(obj)) { // 객체
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (cb.call(context || obj, key, obj[key], obj) === false) { break; }
            }
        }
    } else {
        //throw new Error('each 함수는 배열이나 객체에만 사용할 수 있습니다.');
    }

    return obj;
};

export {each};
