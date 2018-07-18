import {doc} from '../config';

/**
 * @name templatePolyfill
 * @description HTML5 템플릿 폴리필 기능 지원
 * @example
 * // Shim so we can style in IE6/7/8
 * 1. CSS안에 template{display:none} 선언
 * 2. HTML 안에 <template>를 렌더링 하기전 head안의 스크립트 선언
 * <head>
 * <script>document.createElement('template');</script>
 *
 * @example
 * var $template = document.getElementsByTagName('template')[0];
 * var $target = document.getElementById('target');
 *
 * $target.appendChild($template.content.cloneNode(true));
 */
export default () => {
    if ('content' in doc.createElement('template')) {
        // return document.importNode(template.content, true);
        return false;
    } else {
        let template = doc.getElementsByTagName('template'),
            elPlate,
            qContent,
            contentLen,
            docContent;

        for (let x = 0, len = template.length; x < len; ++x) {
            elPlate = template[x];
            qContent = elPlate.childNodes;
            contentLen = qContent.length;
            docContent = doc.createDocumentFragment();

            while (qContent[0]) {
                docContent.appendChild(qContent[0]);
            }

            elPlate.content = docContent;
        }
    }
};
