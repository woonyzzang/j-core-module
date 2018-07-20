import {isPlainObject} from './isPlainObject';

/**
 * isType
 * @description 타입 체크
 * @param {*} value - 타입을 확인할 값 (숫자, 문자, 배열, 객체)
 * @param {String} typeName - 타입명 ('null', 'number', 'string', 'element', 'nan', 'infinity', 'date', 'array')
 * @return {String|Boolean} 인자값에 typeName이 안넘오면 타입값을 반환
 * @api
 * isPlainObject(* [, typeName])
 * @example
 * isType('test', 'string'); // true
 * isType(new Date(), 'date'); // true
 * isType(1, 'number'); // true
 * isType(/[a-z]/, 'regexp'); // true
 * isType(document.getElementById('box'), 'element'); // true
 * isType({a:'a'}, 'object'); // true
 * isType([], 'array'); // true
 * isType(NaN, 'nan'); // true
 * isType(null, 'null'); // true
 * // 파라미터를 하나만 넘기면 타입명을 반환받을 수 있다.
 * isType(''); // 'string'
 * isType(null); // 'null'
 * isType(1); // 'number'
 * isType({}); // 'object'
 * isType([]); // 'array'
 * isType(undefined); // 'undefined'
 * isType(new Date()); // 'date'
 * isType(/[a-z]/); // 'regexp'
 * isType(document.body); // 'element'
 */
const isType = (value, typeName) => {
    const isGet = arguments.length === 1;
    const s = Object.prototype.toString.call(value),
        type = s.match(/\[object (.*?)\]/)[1].toLowerCase();
    let resultType = null;

    function result(name) {
        return (isGet)? name : typeName === name;
    }

    if (value && typeof typeName === 'undefined') {
        resultType = type;
    } else if (value === null) {
        resultType = result('null');
    } else if (value && value.nodeType) {
        if (value.nodeType === 1 || value.nodeType === 9) {
            resultType = result('element');
        } else if (value && value.nodeType === 3 && value.nodeName === '#text') {
            resultType = result('textnode');
        }
    } else if (typeName === 'object' || typeName === 'json') {
        resultType = (isGet)? 'object' : isPlainObject(value);
    } else if (type === 'number') {
        if (isNaN(value)) {
            resultType = result('nan');
        } else if (!isFinite(value)) {
            resultType = result('infinity');
        } else {
            resultType = result('number');
        }
    } else {
        resultType = (isGet)? type : type === typeName;
    }

    return resultType;
};

export {isType};
