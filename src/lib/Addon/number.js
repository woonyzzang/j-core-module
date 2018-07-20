import {Core} from '../Core/core';

/**
 * @namespace
 * @name Core.number
 * @description 숫자 관련 코어 확장 함수
 */
const addonNumber = () => {
    Core.define('number', {
        /**
         * @name {{LIB_NAME}}.number.addComma
         * @param {Number} value - 숫자값
         * @description 세자릿수 마다 ,(콤마)를 삽입
         * @return {String} 세자릿수 마다 콤마 삽입 후 반환
         * @example
         * {{LIB_NAME}}.number.addComma(21342); // '21,342'
         */
        addComma: (function() {
            const regComma = /(\d+)(\d{3})/;

            return function(value) {
                value += '';

                let x = value.split('.'),
                    x1 = x[0],
                    x2 = (x.length > 1)? '.' + x[1] : '';

                while (regComma.test(x1)) {
                    x1 = x1.replace(regComma, '$1' + ',' + '$2');
                }

                return x1 + x2;
            };
        })(),

        /**
         * @name {{LIB_NAME}}.number.random
         * @param {Number} min - 최소값
         * @description min ~ max사이의 랜덤값 반환
         * @param {Number} max - 최대값
         * @return {Number} 랜덤값 반환
         */
        random: function(min, max) {
            if (!max) {
                max = min;
                min = 0;
            }

            return min + Math.floor(Math.random() * (max - min + 1));
        },

        /**
         * @name {{LIB_NAME}}.number.limit
         * @param {Number} value - 기준값
         * @description value가 min보다 작을 경우 min을, max보다 클 경우 max를 반환
         * @param {Number} min - 최소값
         * @param {Number} max - 최대값
         * @return {Number} 상하한값을 반환
         */
        limit: function(value, min, max) {
            if (value < min) {
                return min;
            } else if (value > max) {
                return max;
            }

            return value;
        },

        /**
         * @name {{LIB_NAME}}.number.parse
         * @param {*} value - 숫자 + 문자가 포함된 값
         * @description 어떠한 경우에도 숫자로 변환(뒤에 있는 숫자외의 문자를 제거한 후 숫자만 추출)
         * @return {Number} 숫자 반환
         * @example
         * {{LIB_NAME}}.number.parse('100만원'); // 100
         */
        parse: function(value) {
            value = (value || '').toString().replace(/[^-0-9\.]+$/, '');
            value = value * 1;

            return (isNaN(value))? 0 : value;
        },

        /**
         * @name {{LIB_NAME}}.number.toKor
         * @param {Number} num - 숫자
         * @description 수를 한글로 변환
         * @return {String} 한글로 변환된 값 반환
         * @example
         * {{LIB_NAME}}.number.toKor(123456); // 십이만삼천사백오십육
         */
        toKor: function(num) {
            let nums = [],
                sign = '',
                c = 0,
                c2 = 0,
                result = '',
                ch = '';
            const kor = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'],
                unit = ['', '십', '백', '천'],
                unit2 = ['', '만', '억', '조', '경', '해'];

            if (typeof num === null) { return ''; }

            num = num + '';

            if (num === '0') { return '영'; }

            if (num.substr(0, 1) === '-') {
                sign = '마이너스 ';
                num = num.substr(1);
            }

            nums = num.split('');

            for (let i = nums.length - 1; i >= 0; i--, c++) {
                if (c > 0 && c % 4 === 0) { c2++; }
                if (!(ch = kor[nums[i]])) { continue; }

                if (c % 4 === 0) {
                    result = unit2[c2] + result; // 만, 억, 조, 경, 해

                    if (ch === '일' && (i === 0 && c2 <= 1)) { ch = ''; }
                } else {
                    if (ch === '일') { ch = ''; }
                }

                if (ch += unit[c % 4]) {
                    result = ch + result;
                }
            }

            return sign + result;
        }
    });

    /** 코어 별칭 */
    Core.comma = Core.number.addComma;
};

export {addonNumber};
