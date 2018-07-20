import {Core} from '../Core/core';

/**
 * @namespace
 * @name Core.namespace
 * @description 네임스페이스 관련 코어 확장 함수
 */
const addonNamespace = () => {
    Core.define('namespace', function() {
        /**
         * @name {{LIB_NAME}}.namespace
         * @description 네임스페이스 공간을 생성하고 객체를 설정하며 .를 구분자로 하여 하위 네임스페이스가 생성된다.
         * @param {String} part - 네임스페이스명
         * @param {Object|Function} [obj] - 지정된 네임스페이스에 등록할 객체, 함수 등
         * @return {Object} 생성된 새로운 네임스페이스
         * @example
         * {{LIB_NAME}}.namespace('app.ui.Module', Module);
         * // 를 native로 풀면,
         * var app = {
         *     ui: {
         *         Module: Module
         *     }
         * };
         */
        return function(part, obj) {
            if (typeof part !== 'string') {
                obj && (part = obj);

                return part;
            }

            let parent = Core,
                parts = part.split('.'),
                i, item;

            for (i = -1; item = parts[++i];) {
                if (parent[item]) { throw new Error('The same core namespace exists.'); } // 기본 네임스페이스 이름 생성시 에러 반환

                parent = parent[item] || (parent[item] = {});
            }

            return Core.extend(parent, obj || {});
        };
    });

    /** 코어 별칭 */
    Core.ns = Core.namespace;
};

export {addonNamespace};
