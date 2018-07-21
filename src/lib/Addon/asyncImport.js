import {doc} from '../config';
import {Core} from '../Core/core';

/**
 * @namespace
 * @name Core.asyncImport
 * // benchmark: https://github.com/malko/l.js/blob/master/l.js
 * @description 임폴트 스크립트 관련 코어 확장 함수
 * @example
 * {{LIB_NAME}}.asyncImport.load('myLib.js'); // 기본방식
 * {{LIB_NAME}}.asyncImport.load('myLib.js',function() {}); // 콜백방식
 * {{LIB_NAME}}.asyncImport.load('myLib.css').load('myLib.js'); // 체이닝 방식
 * {{LIB_NAME}}.asyncImport.load(['myLib.js', 'myRequiredLib.js'], 'myDependentLib.js', function() {}); // 의존성 방식 (myDependentLib.js는 myRequireLib.js가로드되기 전에로드되지 않음)
 *
 * // 별칭 사용 방식
 * {{LIB_NAME}}.asyncImport
 *     addAliases({
 *         jQuery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js#jqueryId', // id #jqueryId 생성
 *         ui: [
 *             'jQuery', // 별칭으로 선언한 네이밍 사용
 *             'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js',
 *             'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css'
 *         ]
 *     })
 *     .load('ui', function() {});
 *
 * // fallback url 방식 (js 파일 및 오류 이벤트 호환 브라우저에만 해당)
 * {{LIB_NAME}}.asyncImport.load('http://domain.com/myLib.js#=/myfallback.js#myid', function() {}); // myfallback.js 로드 실패시 http://domain.com/myLib.js 로드를 시도한다.
 */
const addonAsyncImport = () => {
    Core.define('asyncImport', function() {
        const isA =  function(a,b) { return a instanceof (b || Array); },
            //-- some minifier optimisation
            /** [D] 전연 변수 doc 으로 대체 */
            // D = document,
            getElementsByTagName = 'getElementsByTagName',
            length = 'length',
            readyState = 'readyState',
            onreadystatechange = 'onreadystatechange',
            //-- get the current script tag for further evaluation of it's eventual content
            /** [D] 전연 변수 doc 으로 대체 */
            // scripts = D[getElementsByTagName]('script'),
            scripts = doc[getElementsByTagName]('script'),
            scriptTag = scripts[scripts[length]-1],
            script  = scriptTag.innerHTML.replace(/^\s+|\s+$/g,'');

        //avoid multiple inclusion to override current loader but allow tag content evaluation
        /** [D] 코어 네임스페이스 영역으로 선언 */
        // if (!window.ljs) {
        if (!Core.asyncImport) {
            const checkLoaded = scriptTag.src.match(/checkLoaded/)? 1 : 0,
                //-- keep trace of header as we will make multiple access to it
                /** [D] append 영역을 헤더에서 푸터로 변경  */
                header = doc[getElementsByTagName]('head')[0] || doc.documentElement,
                // footer = doc.getElementsByTagName('body')[0] || doc.documentElement,
                urlParse = function(url) {
                    const parts={}; // u => url, i => id, f = fallback

                    parts.u = url.replace(/#(=)?([^#]*)?/g, function(m, a, b){
                        parts[(a)? 'f' : 'i' ] = b;

                        return '';
                    });

                    return parts;
                },
                appendElmt = function(type, attrs, cb) {
                    /** [D] 전연 변수 doc 으로 대체 */
                    // var e = D.createElement(type), i;
                    let e = doc.createElement(type), i;

                    if (cb){ //-- this is not intended to be used for link
                        if (e[readyState]) {
                            e[onreadystatechange] = function() {
                                if (e[readyState] === 'loaded' || e[readyState] === 'complete') {
                                    e[onreadystatechange] = null;

                                    cb();
                                }
                            };
                        } else {
                            e.onload = cb;
                        }
                    }

                    for(i in attrs) {
                        attrs[i] && (e[i] = attrs[i]);
                    }

                    /** [D] append 영역을 헤더에서 푸터로 변경  */
                    header.appendChild(e);
                    // footer.appendChild(e);
                    // return e; // unused at this time so drop it
                },
                load = function(url,cb) {
                    if (this.aliases && this.aliases[url]) {
                        let args = this.aliases[url].slice(0);

                        isA(args) || (args=[args]);
                        cb && args.push(cb);

                        return this.load.apply(this,args);
                    }

                    if (isA(url)) { // parallelized request
                        for(let l=url[length]; l--;) {
                            this.load(url[l]);
                        }

                        cb && url.push(cb); // relaunch the dependancie queue

                        return this.load.apply(this,url);
                    }

                    if (url.match(/\.css\b/)) {
                        return this.loadcss(url,cb);
                    }

                    return this.loadjs(url,cb);
                },
                loaded = {},  // will handle already loaded urls
                loader = {
                    aliases: {},
                    loadjs: function(url,cb) {
                        const parts = urlParse(url);
                        url = parts.u;

                        if (loaded[url] === true) { // already loaded exec cb if any
                            cb && cb();

                            return this;
                        } else if (typeof loaded[url]!== 'undefined') { // already asked for loading we append callback if any else return
                            if (cb) {
                                loaded[url] = (function(ocb, cb) {
                                    return function() {
                                        ocb && ocb();
                                        cb && cb();
                                    };
                                })(loaded[url],cb);
                            }

                            return this;
                        }

                        // first time we ask this script
                        loaded[url] = (function(cb) {
                            return function() {
                                loaded[url] = true;
                                cb && cb();
                            };
                        })(cb);
                        
                        /** [D] IE8 기명 함수 변환 렌더링 에러 이슈 대응 */
                        // cb = function() { loaded[url](); };

                        // babel 컴파일: cb = function cb() { loaded[url](); }; // 기명 함수로 변경되면서 IE8 에러 발생
                        // https://www.npmjs.com/package/babel-plugin-transform-jscript // babel 플러그인 예제 참조
                        var cb = (function () {
                            function cb() {
                                loaded[url]();
                            }

                            return cb;
                        })();

                        appendElmt('script', {type: 'text/javascript', src: url, id: parts.i, onerror: function(error) {
                            if(parts.f) {
                                const c = error.currentTarget;

                                c.parentNode.removeChild(c);
                                appendElmt('script',{type: 'text/javascript',src: parts.f, id: parts.i}, cb);
                            }
                        }},cb);

                        return this;
                    },
                    loadcss: function(url, cb) {
                        const parts = urlParse(url);
                        url = parts.u;
                        loaded[url] || appendElmt('link', {type: 'text/css', rel: 'stylesheet', href: url, id: parts.i});
                        loaded[url] = true;

                        cb && cb();

                        return this;
                    },
                    load: function() {
                        const argv = arguments,
                            argc = argv[length];

                        if (argc === 1 && isA(argv[0], Function)) {
                            argv[0]();

                            return this;
                        }

                        load.call(this, argv[0], (argc <= 1)? undefined : function() {loader.load.apply(loader,[].slice.call(argv, 1));});

                        return this;
                    },
                    addAliases: function(aliases) {
                        for (const i in aliases) {
                            this.aliases[i]= isA(aliases[i]) ? aliases[i].slice(0) : aliases[i];
                        }

                        return this;
                    }
                };

            if (checkLoaded) {
                let i, l, links, url;

                for (i = 0, l = scripts[length]; i < l; i++) {
                    (url = scripts[i].getAttribute('src')) && (loaded[url.replace(/#.*$/,'')] = true);
                }

                links = D[getElementsByTagName]('link');

                for (i = 0,l = links[length]; i < l; i++) {
                    (links[i].rel==='stylesheet' || links[i].type==='text/css') && (loaded[links[i].getAttribute('href').replace(/#.*$/,'')] = true);
                }
            }

            //export ljs
            /** [D] 코어 네임스페이스 영역으로 선언 */
            // window.ljs = loader;
            Core.asyncImport = loader;
            // eval inside tag code if any
        }

        // eval script tag content if needed
        scriptTag.src && script && appendElmt('script', {innerHTML: script});
    });

    /** 코어 별칭 */
    Core.importCss = Core.asyncImport.loadcss;
    Core.importJs = Core.asyncImport.loadjs;
    Core.importLoad = Core.asyncImport.load;
};

export {addonAsyncImport};
