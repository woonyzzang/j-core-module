import {Core} from '../Core/core';

/**
 * @namespace
 * @name Core.Env
 */
const addonEnv = () => {
    Core.define('env', {
        configs: {},

        /**
         * @name get
         * @description 설정값을 꺼내오는 함수
         * @param {string} name 설정명. `.`를 구분값으로 단계별로 값을 가져올 수 있다.
         * @param {*} [def] 설정된 값이 없을 경우 사용할 기본값
         * @return {*} 설정값
         * @example
         * {{LIB_NAME}}.Env.get('siteTitle'); // '바이널'
         */
        get: function (name, def) {
            let root = this.configs,
                names = name.split('.'),
                pair = root;

            for (let i = 0, len = names.length; i < len; i++) {
                if (!(pair = pair[names[i]])) { return def; }
            }

            return pair;
        },

        /**
         * @name set
         * @description 설정값을 지정하는 함수
         * @param {string} name 설정명. `.`를 구분값으로 단계를 내려가서 설정할 수 있다.
         * @param {*} value 설정값
         * @return {*} 설정값
         * @example
         * {{LIB_NAME}}.Env.set('siteTitle', 'Hello World!');
         */
        set: function (name, value) {
            let root = this.configs,
                names = name.split('.'),
                len = names.length,
                last = len - 1,
                pair = root;

            for (let i = 0; i < last; i++) {
                pair = pair[names[i]] || (pair[names[i]] = {});
            }

            return (pair[names[last]] = value);
        }
    });
};

export {addonEnv};
