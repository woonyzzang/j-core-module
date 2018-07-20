/**
 * @name isPlainObject
 * @description Plain Object 여부 확인
 * @param {Object} value - 오브젝트 객체
 * @return {Boolean}
 * @api
 * isPlainObject(object)
 * @example
 * isPlainObject({}) // 객체 리터럴
 * isPlainObject(new Object) // 객체 new 생성자
 */
const isPlainObject = (Object.prototype.toString.call(null) === '[object Object]')? function(value) {
    return (typeof value !== null)
        && (typeof value !== 'undefined')
        && (typeof value.ownerDocument === 'undefined')
        && Object.prototype.toString.call(value) === '[object Object]';
} : function(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
};

export {isPlainObject};
