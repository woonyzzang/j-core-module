import {doc} from '../config';

/**
 * @name matchMediaPolyfill
 * @description 미디어쿼리 폴리필 기능 지원
 * https://github.com/paulirish/matchMedia.js/
 * https://gist.github.com/benplum/8045336 // IE8 대응
 * @example
 * if (matchMedia('only screen and (max-width: 480px)').matches) {
 *    // smartphone/iphone... maybe run some small-screen related dom scripting?
 * }
 * if (matchMedia('all and (orientation:landscape)').matches) {
 *    // probably tablet in widescreen view
 * }
 */
export default () => {
    window.matchMedia || (window.matchMedia = function() {
        var docElem  = doc.documentElement,
            refNode  = docElem.firstElementChild || docElem.firstChild,
            // fakeBody required for <FF4 when executed in <head>
            fakeBody = doc.createElement('body'),
            div = doc.createElement('div');

        div.id = 'mq-test-1';
        div.style.cssText = 'position:absolute;top:-100em';
        fakeBody.style.background = 'none';
        fakeBody.appendChild(div);

        var mqRun = function(mq) {
            div.innerHTML = '&shy;<style media="' + mq + '"> #mq-test-1 { width: 42px; }</style>';
            bool = div.offsetWidth === 42;

            docElem.insertBefore(fakeBody, refNode);
            docElem.removeChild(fakeBody);

            return { matches: bool, media: mq };
        },

        getEmValue = function() {
            var ret,
                body = docElem.body,
                fakeUsed = false;

            div.style.cssText = "position:absolute;font-size:1em;width:1em";

            if (!body) {
                body = fakeUsed = doc.createElement('body');
                body.style.background = 'none';
            }

            body.appendChild( div );
            docElem.insertBefore( body, docElem.firstChild );

            if (fakeUsed) {
                docElem.removeChild( body );
            } else {
                body.removeChild( div );
            }

            //also update eminpx before returning
            ret = eminpx = parseFloat( div.offsetWidth );

            return ret;
        },

        //cached container for 1em value, populated the first time it's needed
        eminpx,

        // verify that we have support for a simple media query
        mqSupport = mqRun('(min-width: 0px)').matches;

        return function(mq) {
            if (mqSupport) {
                return mqRun(mq);
            } else {
                if (doc.body) {
                    var min = mq.match( /\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/ ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" ),
                        max = mq.match( /\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/ ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" ),
                        minnull = min === null,
                        maxnull = max === null,
                        currWidth = doc.body.offsetWidth,
                        em = 'em';

                    if (!!min) { min = parseFloat(min) * (min.indexOf(em) > -1 ? (eminpx || getEmValue()) : 1 ); }
                    if (!!max) { max = parseFloat(max) * (max.indexOf(em) > -1 ? (eminpx || getEmValue()) : 1 ); }

                    bool = (!minnull || !maxnull) && (minnull || currWidth >= min) && (maxnull || currWidth <= max);

                    return { matches: bool, media: mq };
                } else {
                    return { matches: false, media: {} };
                }
            }
        };
    }());
};
