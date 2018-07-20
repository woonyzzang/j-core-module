###### j core module

# {{LIB_NAME}}
> 기본적으로 코어에서 제공하는 기능을 사용할 수 있습니다.

## 기본기능

- [debug](#debug)
    - log()
    - logs()
- [each()](#each)
- [reverse()](#reverse)
- [extend()](#extend)
- [clone()](#clone)
- [emptyFn](#emptyfn)
- [tmpInput](#tmpinput)
- [tmpNode](#tmpnode)
- [is()](#is)
- [isEmpty()](#isempty)
- [hasOwn()](#hasown)
- [namespace()](#namespace)
- [dependency()](#dependency)
- [define()](#define)

<br>

## debug
console을 지원하지 않는 브라우저 환경에서 로그를 확인 합니다.

API | 설명
--- | ---
@param {...any} | 로그

```js
{{LIB_NAME}}.debug.log('log...'); // 클린로그 확인
```
```js
{{LIB_NAME}}.debug.logs('logs...'); // 다중로그 확인
```

[▲ 기본기능 목록 이동](#기본기능)

<br>

## each()
배열이나 객체 순환용 반복 함수 입니다.

API | 설명
--- | ---
@param {Array or Object}| 배열 및 객체
@param {Function} | 콜백함수
@param {...any} | 컨텍스트
@return {Array or Object} | 배열 및 객체 원형 반환

```js
{{LIB_NAME}}.each(['a', 'b', 'c'], function(value, index, obj) {
    console.log('value:' + value + ', index:' + index);

    if (value === 'b') { return false; } // false 를 반환하면 순환을 멈춘다.
});

// value:a, index:0
// value:b, index:1
```
```js
{{LIB_NAME}}.each({a: 'A', b: 'B', c: 'C'}, function(key, value, obj) {
    console.log('key:' + key + ', value:' + value);

    if (value === 'B') { return false; } // false 를 반환하면 순환을 멈춘다.
});

// key:a, value:A
// key:b, value:B
```

[▲ 기본기능 목록 이동](#기본기능)

<br>

## reverse()
배열의 역순 반복 함수 입니다.

API | 설명
--- | ---
@param {Array} | 배열
@param {Function} | 콜백함수
@param {...any} | 컨텍스트
@return {Array} | 배열 원형 반환

```js
{{LIB_NAME}}.reverse(['a', 'b', 'c', 'd'], function(value, index, array) {
    console.log('value:' + value + ', index:' + index);

    if (value === 'b') { return false; } // false 를 반환하면 순환을 멈춘다.
});

// value:d, index:3
// value:c, index:2
// value:b, index:1
```

[▲ 기본기능 목록 이동](#기본기능)

<br>

## extend()
객체 확장 함수 입니다.

API | 설명
--- | ---
@param {Boolean} | 깊은 확장 여부 옵션값
@param {Object} | 원본객체
@param {Object} | 확장객체
@return {Object} | 원본객체 + 확장객체를 병합해서 하나의 객체로 반환한다.

```js
var obj1 = {apple: 0, banana: { weight: 52, price: 100 }, cherry: 97};
var obj2 = {banana: { price: 200 }, durian: 100};

{{LIB_NAME}}.extend(obj1, obj2);

// {apple: 0, banana: {price: 200}, cherry: 97, durian: 100}
```
```js
var obj1 = {apple: 0, banana: { weight: 52, price: 100 }, cherry: 97};
var obj2 = {banana: { price: 200 }, durian: 100};

{{LIB_NAME}}.extend(true, obj1, obj2);

// {apple: 0, banana: {weight: 52, price: 200}, cherry: 97, durian: 100}
```

[▲ 기본기능 목록 이동](#기본기능)

<br>

## clone()
객체를 복제하는 함수 입니다.

API | 설명
--- | ---
@param {Array or Object} | 배열 및 객체
@return {Array or Object} | 깊은 객체 복사 후 반환한다

```js
// ori 복제본, ori를 변경하여도 clone은 변하지 않는다.
var ori = {a: 'A', b: [1, 2, 3]};
var clone = {{LIB_NAME}}.clone(ori); // {a: 'A', b: [1, 2, 3]};
```

[▲ 기본기능 목록 이동](#기본기능)

<br>

## emptyFn
빈 함수를 반환 합니다.

```js
var obj = {
    fun1 : function() {}, // 빈 함수
    fun2 : {{LIB_NAME}}.emptyFn // 코어에서 제공하는 빈 함수
};

console.log(obj.fun1);
// function() {}

console.log(obj.fun2);
// function() {}
```

[▲ 기본기능 목록 이동](#기본기능)

<br>

## tmpInput
특정속성을 지원하는지 체크하기 위한 input 엘리먼트 입니다.

```js
if ('placeholder' in {{LIB_NAME}}.tmpInput) {
    console.log('placeholder를 지원합니다.');
}
```

[▲ 기본기능 목록 이동](#기본기능)

<br>

## tmpNode
특정 css스타일을 지원하는지 체크하기 위한 div 엘리먼트 입니다.

```js
if ('transform' in {{LIB_NAME}}.tmpNode.style) {
    console.log('transform를 지원합니다.');
}
```

[▲ 기본기능 목록 이동](#기본기능)

<br>

## is()
숫자, 문자, 배열, 객체 타입을 체크 합니다. (파라미터를 하나만 넘기면 타입명을 반환받을 수 있습니다.)

API | 설명
--- | ---
@param {...any} | 타입을 확인할 값 (숫자, 문자, 배열, 객체)
@param {String} | 타입명 ('null', 'number', 'string', 'element', 'nan', 'infinity', 'date', 'array')
@return {String or Boolean} | 인자값에 typeName이 안넘오면 타입값을 반환

```js
{{LIB_NAME}}.is('test', 'string');

// true
```
```js
{{LIB_NAME}}.is(new Date(), 'date');

// true
```
```js
{{LIB_NAME}}.is(1, 'number');

// true
```
```js
{{LIB_NAME}}.is(/[a-z]/, 'regexp');

// true
```
```js
{{LIB_NAME}}.is(document.getElementById('box'), 'element');

// true
```
```js
{{LIB_NAME}}.is({a:'a'}, 'object');

// true
```
```js
{{LIB_NAME}}.is([], 'array');

// true
```
```js
{{LIB_NAME}}.is(NaN, 'nan');

// true
```
```js
{{LIB_NAME}}.is(null, 'null');

// true
```
```js
{{LIB_NAME}}.is('');

// 'string'
```
```js
{{LIB_NAME}}.is(null);

// 'null'
```
```js
{{LIB_NAME}}.is(1);

// 'number'
```
```js
{{LIB_NAME}}.is({});

// 'object'
```
```js
{{LIB_NAME}}.is([]);

// 'array'
```
```js
{{LIB_NAME}}.is(undefined);

// undefined'
```
```js
{{LIB_NAME}}.is(new Date());

// 'date'
```
```js
{{LIB_NAME}}.is(/[a-z]/);

// 'regexp'
```
```js
{{LIB_NAME}}.is(document.body);

// 'element'
```

[▲ 기본기능 목록 이동](#기본기능)

<br>

## isEmpty()
주어진 인자가 빈 값인지 체크 합니다.

API | 설명
--- | ---
@param {any} | 체크할 값(문자열, 객체 등등)
@param {Boolean} | 빈문자를 허용할 것인지 여부
@return {Boolean} | 빈값인지 체크 후 불린값 반환

```js
{{LIB_NAME}}.isEmpty(null);

// true
```
```js
{{LIB_NAME}}.isEmpty(undefined);

// true
```
```js
{{LIB_NAME}}.isEmpty('');

// true
```
```js
{{LIB_NAME}}.isEmpty(0);

// true
```
```js
{{LIB_NAME}}.isEmpty([]);

// true
```
```js
{{LIB_NAME}}.isEmpty({});

// true
```

[▲ 기본기능 목록 이동](#기본기능)

<br>

## hasOwn()
객체 자체에 주어진 키값의 속성이 있는지 조회 합니다.

API | 설명
--- | ---
@param {Object} | 객체
@param {String} | 키 이름
@return {Boolean} | 키의 존재 여부

```js
var obj = {a: 'A'};

{{LIB_NAME}}.hasOwn(obj, 'a');

// true
```
```js
var obj = {a: 'A'};

{{LIB_NAME}}.hasOwn(obj, 'b');

// false
```

[▲ 기본기능 목록 이동](#기본기능)

<br>

## namespace()
네임스페이스 공간을 생성하고 객체를 설정하며 `.`을 구분자로 하여 하위 네임스페이스가 생성 됩니다.

API | 설명
--- | ---
@param {String} | 네임스페이스명
@param {Object or Function} | 지정된 네임스페이스에 등록할 객체, 함수 등
@return {Object} | 생성된 새로운 네임스페이스

```js
{{LIB_NAME}}.namespace('app.ui.Module', {});

// var app = {
//     ui: {
//         Module: {}
//     }
// };
```

[▲ 기본기능 목록 이동](#기본기능)

<br>

## dependency()
의존성 모듈 패턴을 추가하고 사용 합니다.

```js
// 모듈 추가
{{LIB_NAME}}.dependency.module.모듈명 = function(app) {});
```
```js
// 모듈 사용
{{LIB_NAME}}.dependency(['모듈명, ...'], function(Module) {});
```

## 모듈 추가

`Alias: modules.module`

```js
// device 모듈 추가
{{LIB_NAME}}.dependency.module.device = function(app) {
    app.deviceChk = function() {
        console.log('deviceChk');
    };

    app.isMobile = function() {
        console.log('isMobile');
    };
};

// os 모듈 추가
{{LIB_NAME}}.dependency.module.os = function(app) {
    app.isFlatForm = function(viewType, callback) {
        console.log('isFlatForm');
    };
};
```

## 추가된 모듈 사용

`Alias: modules()`

```js
// 의존성 모듈 선언을 생략 시 전체 모듈 사용
{{LIB_NAME}}.dependency(function(Module) {});
```
```js
// 의존성 모듈 '*' 전체선택자 사용 시 전체 모듈 사용
{{LIB_NAME}}.dependency(['*'], function(Module) {});
```
```js
// 추가된 의존성 모듈 선언시 개별적 모듈 사용
{{LIB_NAME}}.dependency(['device', 'os'], function(Module) {
    console.log(Module); // {device, os} 추가한 모듈 객체가 인자로 들어온다.
    Module.deviceChk(); // 추가한 모듈의 메소드, 프로퍼티 사용
});
```

[▲ 기본기능 목록 이동](#기본기능)

<br>

## define()
코어 하위에 name에 해당하는 네임스페이스를 생성하여 object를 설정해주는 함수 입니다.

API | 설명
--- | ---
@param {String} | 파츠명 `.`을 구분자로 코어 안에 하위 네임스페이스를 생성
@param {Object or Function} | 지정된 네임스페이스에 등록할 객체, 함수 등
@return {Object} | 생성된 새로운 네임스페이스

```js
{{LIB_NAME}}.define('urls');

console.log({{LIB_NAME}}.urls);
```
```js
{{LIB_NAME}}.define('urls', {
    store: 'Store',
    company: 'Company'
});

console.log({{LIB_NAME}}.urls.store);
console.log({{LIB_NAME}}.urls.company);
```

[▲ 기본기능 목록 이동](#기본기능)
