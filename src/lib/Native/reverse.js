import {isArray} from './isArray';

/**
 * reverse
 * @description 역순 반복 함수(배열 타입만 유효)
 * @param {Array} arr - 배열
 * @param {Function} cb - 콜백함수
 * @param {*} context - 컨텍스트
 * @return {Array} 배열 원형 반환
 * @api
 * reverse(object, function)
 * @example
 * reverse(['a', 'b', 'c', 'd'], function(value, index, array) {
 *     alert('value:' + value + ', index:' + index);
 *     if (value === 'b') { return false; } // false 를 반환하면 순환을 멈춘다.
 * });
 */
const reverse = (arr, cb, context) => {
    if (!arr) { return arr; }

    if (isArray(arr)) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (cb.call(context || arr, arr[i], i, arr) === false) { break; }
        }
    } else {
        throw new Error('reverse 함수는 배열에만 사용할 수 있습니다.');
    }

    return arr;
};

export {reverse};
