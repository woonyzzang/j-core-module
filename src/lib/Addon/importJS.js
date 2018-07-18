import {Core} from '../Core/core';

/**
 * @namespace
 * @name Core.importJs
 * // benchmark: https://github.com/malko/l.js/blob/master/l.js
 */
const addonImportJs = () => {
    Core.define('importJs', {
        var isA = function(a, b) { return a instanceof (b || Array); },
            // doc = document,
            aliases = {},
            appendElmt = function(type, attrs, cb) {
                var $body = doc.getElementsByTagName('body')[0] || doc.documentElement;
                var e = doc.createElement(type),
                    i;

                if (cb && isA(cb, Function)) {
                    if (e.readyState) {
                        e.onreadystatechange = function () {
                            if (e.readyState === 'loaded' || e.readyState === 'complete') {
                                e.onreadystatechange = null;

                                cb();
                            }
                        };
                    } else {
                        e.onload = cb;
                    }
                }

                for (i in attrs) {
                    attrs[i] && (e.setAttribute(i, attrs[i]));
                }

                $body.appendChild(e);
            },
            load = function(url, cb) {
                if (isA(url)) {
                    for (var i = 0; i < url.length; i++) {
                        loader.load(url[i]);
                    }

                    cb && url.push(cb);

                    return loader.load.apply(loader, url);
                }

                if (url.match(/\.css\b/)) { return loader.loadcss(url, cb); }

                return loader.loadjs(url, cb);
            },
            loaded = {},
            loader = {
                urlParse: function(pUrl, type) {
                    var parts = {},
                        url,
                        ver,
                        fn = (type === 'js')? Core.importJs : Core.importCss;

                    url = pUrl.replace(/\?(.*)$/g, function(m, a) {
                        if (a && a.indexOf('ver=') >= 0) { parts.ver = a.match(/[\?|&]?ver=([a-z0-9]*)/)[1]; }

                        return '';
                    });

                    aliases[url] && (url = aliases[url]);
                    ver = parts.ver || fn.ver;

                    if (url.toLowerCase().indexOf('.' + type) < 0) { url += '.' + type; } // 확장자 추가
                    if (url.substr(0, 1) !== '/') { url = fn.baseUrl + url; }

                    parts.u = url;
                    parts.full = url + ((ver)? '?ver=' + ver : '');

                    return parts;
                },
                loadjs: function(url, cb) {
                    var parts = loader.urlParse(url, 'js');
                    url = parts.u;

                    if (loaded[url] === true) {
                        cb && cb();

                        return loader;
                    } else if (loaded[url] !== undefined) {
                        if (cb) {
                            loaded[url] = (function(ocb, cb) {
                                return function () {
                                    ocb && ocb();
                                    cb && cb();
                                };
                            })(loaded[url], cb);
                        }

                        return loader;
                    }

                    loaded[url] = (function(cb) {
                        return function() {
                            loaded[url] = true;
                            cb && cb();
                        };
                    })(cb);

                    cb = function() {
                        loaded[url]();
                    };

                    // 스크립트 태그를 사용하지 않고 실행시킬 것인지
                    if (Core.importJs.isEval) {
                        $.ajax({url: parts.full, cache: true}).done(function(jsstring) {
                            eval(jsstring);
                            cb();
                        });
                    } else {
                        appendElmt('script', {
                            type: 'text/javascript',
                            'data-import': 'true',
                            src: parts.full
                        }, cb);
                    }

                    return loader;
                },
                loadcss: function(url, cb) {
                    var parts = loader.urlParse(url, 'css');
                    url = parts.u;
                    loaded[url] || appendElmt('link', {
                        'type': 'text/css',
                        'rel': 'stylesheet',
                        'data-import': 'true',
                        'href': parts.full
                    });
                    loaded[url] = true;

                    cb && cb();

                    return loader;
                },
                load: function() {
                    var argv = arguments,
                        argSize = argv.length;

                    if (argSize === 1 && isA(argv[0], Function)) {
                        argv[0]();

                        return loader;
                    }

                    load.call(loader, argv[0], (argSize <= 1)? undefined : function () {
                        loader.load.apply(loader, [].slice.call(argv, 1));
                    });

                    return loader;
                }
            };

        // 이미 존재하는 파일정보를 추출 - START
        var scripts = doc.getElementsByTagName('script'),
            links = doc.getElementsByTagName('link');
        var detectLoaded = function() {
            var i, len, url;

            for (i = 0, len = scripts.length; i < len; i++) {
                if (scripts[i].getAttribute('data-import')) { continue; }

                (url = scripts[i].getAttribute('src')) && (loaded[url.replace(/\?.*$/, '')] = true);
            }

            for (i = 0, len = links.length; i < len; i++) {
                if (links[i].getAttribute('data-import')) { continue; }

                (links[i].rel === 'stylesheet' || links[i].type === 'text/css') && (loaded[links[i].getAttribute('href').replace(/\?.*$/, '')] = true);
            }
        };

        detectLoaded();

        $(function() { detectLoaded(); });
        // 이미 존재하는 파일정보를 추출 - END

        var importResource = function(type) {
            return function(files, cb) {
                var defer = $.Deferred();

                loader.load(files, function() {
                    defer.resolve();

                    if ($.isReady) {
                        cb && cb();
                    } else {
                        cb && $(function() {
                            cb();
                        });
                    }
                });

                return defer.promise();
            };
        };

        Core.importJs = importResource('js');
        Core.importCss = importResource('css');
        Core.importJs.baseUrl = Core.importCss.baseUrl = '';
        Core.importJs.ver = Core.importCss.ver = '';
        Core.importJs.isEval = false;
        Core.importJs.define = function(src) {
            if (!/\.js$/.test(src)) { src += '.js'; }

            src = Core.importJs.baseUrl.replace(/\/$/, '') + ('/' + src).replace(/\/{2,}/g, '/');
            loaded[src] = true;
        };

        Core.importJs.addAliases = Core.importCss.addAliases = function(a) {
            if (typeof arguments[0] === 'string') {
                aliases[arguments[0]] = arguments[1];
            } else {
                for (var i in a) {
                    aliases[i] = isA(a[i])? a[i].slice(0) : a[i];
                }
            }
        };
    });
};

export {addonImportJs};
