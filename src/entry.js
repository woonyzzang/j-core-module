/*!
 * 코어 라이브러리
 * @author woonyzzang
 * @email seungwoonjjang@gmail.com
 * @license ISC License
 * @create 180706
 */

// import 'babel-polyfill'; // IE8 에러

// import {global, doc, LIB_NAME as core} from './lib/config';

import templatePolyfill from './lib/Polyfill/template';
import querySelectorPolyfill from './lib/Polyfill/querySelector';
import querySelectorAllPolyfill from './lib/Polyfill/querySelectorAll';
import getElementsByClassNamePolyfill from './lib/Polyfill/getElementsByClassName';
import bindPolyfill from './lib/Polyfill/bind';
import matchMediaPolyfill from './lib/Polyfill/matchMedia';
// import matchMediaAddListenerPolyfill from './lib/Polyfill/matchMediaAddListener'; // IE11 에러
// import picturePolyfill from './lib/Polyfill/picture'; // IE8 에러

import {addonNumber} from './lib/Addon/number';
import {addonString} from './lib/Addon/string';
import {addonArray} from './lib/Addon/array';
import {addonObject} from './lib/Addon/object';
import {addonDate} from './lib/Addon/date';
import {addonUri} from './lib/Addon/uri';
import {addonDom} from './lib/Addon/dom';
import {addonCss3} from './lib/Addon/css3';
import {addonCookie} from './lib/Addon/cookie';
import {addonUtil} from './lib/Addon/util';
// import {addonImportJs} from './lib/Addon/importJs';
import {addonClass} from './lib/Addon/class';
import {addonEnv} from './lib/Addon/env';

/** 폴리필 */
// https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills
templatePolyfill();
querySelectorPolyfill();
querySelectorAllPolyfill();
getElementsByClassNamePolyfill();
bindPolyfill();
matchMediaPolyfill();
// matchMediaAddListenerPolyfill();
// picturePolyfill();

/** 코어 확장 기능 */
addonNumber();
addonString();
addonArray();
addonObject();
addonDate();
addonUri();
addonDom();
addonCss3();
addonCookie();
addonUtil();
// addonImportJs();
addonClass();
addonEnv();
