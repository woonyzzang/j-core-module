/**
 * @name clone
 * @description 객체 복제 함수
 * @param {Array|Object} obj 배열 및 json객체
 * @return {Array|Object} 깊은 객체 복사 후 반환한다.
 * @api
 * clone(object)
 * @example
 * var ori = {a: 'A', b: [1, 2, 3]};
 * var clone = clone(ori); // {a: 'A', b: [1, 2, 3]};
 * // ori 복제본, ori를 변경하여도 clone은 변하지 않는다.
 */
const clone = (obj) => {
    if ((typeof obj === null) || (typeof obj !== 'object')) { return obj; }

    if (obj instanceof Date) {
        const copy = new Date();

        copy.setTime(obj.getTime());

        return copy;
    } else if (obj instanceof Array) {
        let copy = [];

        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }

        return copy;
    } else if (obj instanceof Object) {
        let copy = {};

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) { copy[key] = clone(obj[key]); }
        }

        return copy;
    } else {
        throw new Error('복제 실패');
    }
};

export {clone};
