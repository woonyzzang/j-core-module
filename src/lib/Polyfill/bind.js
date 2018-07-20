import {global} from '../config';

/**
 * @name bindPolyfill
 * @description 바인드 폴리필 기능 지원
 * @param {Object} obj - 바인딩 객체 데이터
 * @example
 * function Test() {
 *      alert(this.name);
 * }
 *
 * Test.bind({name: 'axl rose'})();
 * // 'axl rose';
 */
export default () => {
    if (typeof Function.prototype.bind === 'undefined') {
        /**
         * 함수내의 컨텐스트를 지정
         * @param {Object} context - 컨텍스트
         * @param {*} ... - 두번째 인자부터는 실제로 실행될 콜백함수로 전달된다.
         * @return {function(context=, ...} 주어진 객체가 켄텍스트로 적용된 함수
         * @example
         * function Test() {
         *      alert(this.name);
         * }
         *
         * Test.bind({name: 'axl rose'})(); -> alert('axl rose');
         */
        Function.prototype.bind = function() {
            const fn = this,
                args = Array.prototype.slice.call(arguments),
                object = args.shift();

            return function(context) {
                const local_args = args.concat(Array.prototype.slice.call(arguments)); // bind로 넘어오는 인자와 원본함수의 인자를 병합하여 넘겨줌.

                if (this !== global) { local_args.push(this); }

                return fn.apply(object, local_args);
            };
        };
    }
};
