import {isArray} from './isArray';
import {isPlainObject} from './isPlainObject';
import {each} from './each';

/**
 * @name extend
 * @description 객체 확장 함수
 * @param {Boolean} [deep] - 깊은 확장 여부 옵션값
 * @param {Object} target - 원본객체
 * @param {Object} obj - 확장객체
 * @return {Object} 원본객체 + 확장객체를 병합해서 하나의 객체로 반환한다.
 * @api
 * extend([deep,] target, object1 [, extendN])
 * @example
 * var obj1 = {apple: 0, banana: { weight: 52, price: 100 }, cherry: 97};
 * var obj2 = {banana: { price: 200 }, durian: 100};
 * extend(obj1, obj2);
 * extend(true, obj1, obj2);
 */
const extend = function(target, obj) {
    let args = {};

    // if (!isArray(obj) || !isObject(obj)) { throw new Error('extend 함수는 배열이나 객체 타입만 확장할 수 있습니다.'); }

    if (target === true) {
        args = Array.prototype.slice.call(arguments, 2);
    } else {
        args = Array.prototype.slice.call(arguments, 1);
        obj = target;
        target = false;
    }

    each(args, function(source) {
        if (!source) { return; }

        each(source, function(key, value) {
            const isArr = isArray(value);

            if (target && (isArr || isPlainObject(value))) {
                obj[key] || (obj[key] = (isArr)? [] : {});
                obj[key] = extend(target, obj[key], value);
            } else {
                obj[key] = value;
            }
        });
    });

    return obj;
};

export {extend};
