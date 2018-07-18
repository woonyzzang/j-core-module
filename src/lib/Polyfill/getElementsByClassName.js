import {doc} from '../config';

/**
 * @name getElementsByClassNamePolyfill
 * @description 클래스 셀렉터 폴리필 기능 지원
 * @example
 * document.getElementsByClassName('tab_menu');
 */
export default () => {
    if (!doc.getElementsByClassName) {
        doc.getElementsByClassName = function(cn) {
            const rx = new RegExp('(?:^|\\s)' + cn + '(?:$|\\s)');
            let allT = doc.getElementsByTagName('*'),
                allCN = [],
                ac='',
                i = 0,
                a;

            while (a = allT[i = i+1]) {
                ac = a.className;

                if (ac && ac.indexOf(cn) !== -1) {
                    if (ac === cn) {
                        allCN[allCN.length] = a;

                        continue;
                    }

                    (rx.test(ac))? (allCN[allCN.length] = a) : 0;
                }
            }

            return allCN;
        };
    }
};
