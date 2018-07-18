import {Core} from '../Core/core';

/**
 * 배열관련 유틸함수
 * @namespace
 * @name Core.array
 */
const addonArray = () => {
    Core.define('array', function() {
        /**
         * 네이티브 배열 프로토타입 속성 및 메서드 기능 지원 확인
         * @name {{LIB_NAME}}.array.nativeCall
         * @param {Function} f - 네이티브 배열 프로토타입 기능
         * @return {Function|Boolean} 네이티브 배열 프로토타입에 f가 존재하지 않으면 false 반환
         * @exmaple
         * {{LIB_NAME}}.array.nativeCall(Array.prototype.map)
         */
        function nativeCall(f) {
            return (f)? function(obj) {
                return f.apply(obj, Array.prototype.slice.call(arguments, 1));
            } : false;
        }

        return {
            /**
             * 배열 병합
             * @name {{LIB_NAME}}.array.append
             * @param {Array} array - 원본 배열
             * @param {...*} var_args - 합칠 요소들
             * @return {Array} 모두 합쳐진 배열
             * @exmaple
             * var newArray = {{LIB_NAME}}.array.append([1,2,3], [4,5,6], [6, 7, 8]); // [1,2,3,4,5,6,7,8]
             */
            append: function(array) {
                const args = Array.prototype.slice.call(arguments);

                return Array.prototype.concat.apply([], args);
            },

            /**
             * 콜백함수로 하여금 요소를 가공하는 함수
             * @name {{LIB_NAME}}.array.map
             * @param {Array} array - 배열
             * @param {ArrayCallback} cb - 콜백함수
             * @param {Object} (optional) - 컨텍스트
             * @return {Array} 기공된 배열
             * @example
             * {{LIB_NAME}}.array.map([1, 2, 3], function(item, index) {
             *     return item * 10;
             * });
             * // [10, 20, 30]
             */
            map: nativeCall(Array.prototype.map) || function(array, cb, context) {
                let results = [];

                if (!Core.is(obj, 'array') || !Core.is(cb, 'function')) { return results; }

                for (let i = 0, len = array.length; i < len; i++) {
                    results[results.length] = cb.call(context || array, array[i], i, array);
                }

                return results;
            },

            /**
             * 반복자함수의 반환값이 true가 아닐 때까지 반복
             * @name {{LIB_NAME}}.array.every
             * @function
             * @param {Array} array - 배열
             * @param {ArrayCallback} cb - 함수
             * @return {Boolean} 최종 결과
             * @example
             * var sum = 0;
             * {{LIB_NAME}}.array.every([1, 3, 5, 7], function(value) {
             *     return value > 5;
             * });
             * // 9
             */
            every: nativeCall(Array.prototype.every) || function(array, cb, context) {
                let isTrue = true;

                if (!Core.is(array, 'array') || !Core.is(cb, 'function')) { return isTrue; }

                Core.each(array, function (value, index) {
                    if (cb.call(context || this, value, index) !== true) { return isTrue = false; }
                });

                return isTrue;
            },

            /**
             * 반복자함수의 반환값이 true일 때까지 반복
             * @name {{LIB_NAME}}.array.any
             * @function
             * @param {Array} array 배열
             * @param {ArrayCallback} cb 함수
             * @return {Boolean} 최종 결과
             * @example
             * var sum = 0;
             * {{LIB_NAME}}.array.any([1, 3, 5, 7], function(val) {
             *     return val < 5;
             * });
             * // 4
             */
            any: nativeCall(Array.prototype.any) || function(array, cb, context) {
                let isTrue = false;

                if (!Core.is(array, 'array') || !Core.is(cb, 'function')) { return isTrue; }

                Core.each(array, function (value, index) {
                    if (cb.call(context || this, value, index) === true) { return isTrue = true; }
                });

                return isTrue;
            },

            /**
             * 배열 요소의 순서를 섞어주는 함수
             * @name {{LIB_NAME}}.array.shuffle
             * @param {Array} array - 배열
             * @return {Array} 순서가 섞인 새로운 배열
             * @example
             * {{LIB_NAME}}.array.shuffle([1, 3, 4, 6, 7, 8]); // [6, 3, 8, 4, 1, 7]
             */
            shuffle: function(array) {
                let rand = 0,
                    index = 0,
                    shuffled = [],
                    number = Core.number;

                Core.each(array, function (value) {
                    rand = number.random(index++);
                    shuffled[index - 1] = shuffled[rand], shuffled[rand] = value;
                });

                return shuffled;
            },

            /**
             * 콜백함수로 하여금 요소를 걸려내는 함수
             * @name {{LIB_NAME}}.array.filter
             * @param {Array} array - 배열
             * @param {Function(value, index)} cb - 콜백함수
             * @param {*=} (optional) 컨텍스트
             * @returns {Array}
             * @example
             * {{LIB_NAME}}.array.filter([1, '일', 2, '이', 3, '삼'], function(item, index) {
             *     return (typeof item === 'string');
             * });
             * // ['일','이','삼']
             */
            filter: nativeCall(Array.prototype.filter) || function(array, cb, context) {
                let results = [];

                if (!Core.is(array, 'array') || !Core.is(cb, 'function')) { return results; }

                for (let i = 0, len = array.length; i < len; i++) {
                    cb.call(context || array, array[i], i, array) && (results[results.length] = array[i]);
                }

                return results;
            },

            /**
             * 주어진 인덱스의 요소를 반환
             * @name {{LIB_NAME}}.array.indexOf
             * @param {Array} array - 배열
             * @param {*} value - 찾을 값
             * @return {Number}
             * @example
             * {{LIB_NAME}}.array.indexOf([1, '일', 2, '이', 3, '삼'], '일');  // 1
             */
            indexOf: nativeCall(Array.prototype.indexOf) || function(array, value, b) {
                for (let i = 0, len = array.length; i < len; i++) {
                    if ((b !== false && array[i] === value) || (b === false && array[i] == value)) { return i; }
                }

                return -1;
            },

            /**
             * 주어진 배열에 지정된 값이 존재하는지 체크
             * @name {{LIB_NAME}}.array.include
             * @param {Array} array - 배열
             * @param {*} value - 찾을 값
             * @return {Boolean}
             * @example
             * {{LIB_NAME}}.array.include([1, '일', 2, '이', 3, '삼'], '삼');  // true
             */
            include: function (array, value, b) {
                if (!Core.is(array, 'array')) { return value; }

                if (typeof value === 'function') {
                    for (let i = 0, len = array.length; i < len; i++) {
                        if (value(array[i], i) === true) { return true; }
                    }

                    return false;
                }

                return this.indexOf(array, value, b) > -1;
            },

            /**
             * 주어진 배열에서 index에 해당하는 요소를 삭제
             * @name {{LIB_NAME}}.array.removeAt
             * @param {Array} value 배열
             * @param {Number} index 삭제할 인덱스 or 요소
             * @return {Array} 지정한 요소가 삭제된 배열
             * @example
             * {{LIB_NAME}}.array.removeAt([1, 2, 3, 4], 1); // [1, 3, 4]
             */
            removeAt: function(value, index) {
                if (!Core.is(value, 'array')) { return value; }

                value.splice(index, 1);

                return value;
            },

            /**
             * 주어진 배열에서 해당하는 요소를 삭제
             * @name {{LIB_NAME}}.array.remove
             * @param {Array} value - 배열
             * @param {*|Function(value, index)} iter - 요소 및 필터콜백
             * @return {Array} 지정한 요소가 삭제된 배열
             * @example
             * {{LIB_NAME}}.array.remove(['a', 'b', 'c'], 'b'); // ['a', 'c']
             * {{LIB_NAME}}.array.remove(['a', 'b', 'c'], function(value) {
             *     return value === 'b';
             * }); // ['a', 'c']
             */
            remove: function (value, iter) {
                if (!Core.is(value, 'array')) { return value; }

                if (typeof iter === 'function') {
                    for (let i = value.length, item; item = value[--i];) {
                        if (iter(item, i) === true) { value = this.removeAt(value, i); }
                    }

                    return value;
                } else {
                    const index = this.indexOf(value, iter);

                    if (index < 0) { return value; }

                    return this.removeAt(value, index);
                }
            },

            /**
             * 주어진 배열에서 가장 큰 요소를 반환
             * @name {{LIB_NAME}}.array.max
             * @param {Array} array - 배열
             * @return {Number} 최대값
             * @example
             * {{LIB_NAME}}.array.max([2, 1, 3, 5, 2, 8]); // 8
             */
            max: function(array) {
                return Math.max.apply(Math, array);
            },

            /**
             * 주어진 배열에서 가장 작은 요소를 반환
             * @name {{LIB_NAME}}.array.min
             * @param {Array} array - 배열
             * @return {Number} 최소값
             * @example
             * {{LIB_NAME}}.array.min([2, 1, 3, 5, 2, 8]); // 1
             */
            min: function(array) {
                return Math.min.apply(Math, array);
            },

            /**
             * 배열의 요소를 역순으로 재배치
             * @name {{LIB_NAME}}.array.reverse
             * @param {Array} array - 배열
             * @return {Array} 역순으로 정렬된 새로운 배열
             * @example
             * {{LIB_NAME}}.array.reverse([1, 2, 3]); // [3, 2, 1]
             */
            reverse: nativeCall(Array.prototype.reverse) || function(array) {
                let tmp = null,
                    first,
                    last;
                const length = array.length;

                for (first = 0, last = length - 1; first < length / 2; first++, last--) {
                    tmp = array[first];
                    array[first] = array[last];
                    array[last] = tmp;
                }

                return array;
            },

            /**
             * 두 배열의 차집합을 반환
             * @name {{LIB_NAME}}.array.different
             * @param {Array} array1 - 배열1
             * @param {Array} array2 - 배열2
             * @returns {Array} 차집합 배열
             * @example
             * {{LIB_NAME}}.array.different([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]); // [1, 2, 6, 7]
             */
            different: function(array1, array2) {
                let newArr = [];

                Core.each(array1, function(value) {
                    if (Core.array.indexOf(array2, value) < 0) { newArr.push(value); }
                });

                Core.each(array2, function(value) {
                    if (Core.array.indexOf(array1, value) < 0) { newArr.push(value); }
                });

                return newArr;
            },

            /**
             * 배열요소들의 합을 반환
             * @name {{LIB_NAME}}.array.sum
             * @param {Array} array
             * @return {number}
             * @example
             * {{LIB_NAME}}.array.sum([1, 2, 3]); // 6
             */
            sum: function(array) {
                let total = 0;

                Core.each(array, function(value) {
                    total += (value | 0);
                });

                return total;
            },

            /**
             * 주어진 값을 배열로 변환
             * @name {{LIB_NAME}}.array.toArray
             * @param {*} value 배열로 변환하고자 하는 값
             * @return {Array}
             * @example
             * {{LIB_NAME}}.toArray('abcd'); // ['a', 'b', 'c', 'd']
             * {{LIB_NAME}}.toArray(arguments);  // arguments를 객체를 array로 변환하여 Array에서 지원하는 유틸함수(slice, reverse ...)를 쓸수 있다.
             */
            toArray: function(value) {
                try {
                    return Array.prototype.slice.apply(value, Array.prototype.slice.call(arguments, 1));
                } catch (e) {}

                let ret = [];

                try {
                    for (let i = 0, len = value.length; i < len; i++) {
                        ret.push(value[i]);
                    }
                } catch (e) {}

                return ret;
            }
        };
    });
};

export {addonArray};
