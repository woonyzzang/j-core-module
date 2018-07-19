###### j core module

# {{LIB_NAME}}.object
> 객체 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [keys()](#keys)
- [values()](#values)
- [map()](#map)
- [hasObject()](#hasObject)
- [toQueryString()](#toQueryString)
- [traverse()](#traverse)
- [remove()](#remove)
- [stringify()](#stringify)

<br>

## keys()
객체의 열거가능한 속성 및 메서드 이름을 배열로 반환 합니다.

API | 설명
--- | ---
@param {Object} | 객체
@return {Array} | 객체의 열거가능한 속성의 이름이 포함된 배열

```js
{{LIB_NAME}}.object.keys({name: 'Axl rose', age: 50});

// ['name', 'age']
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## values()
객체의 열거가능한 속성의 값을 배열로 반환 합니다.

API | 설명
--- | ---
@param {Object} | 객체
@return {Array} | 객체의 열거가능한 속성의 값들이 포함된 배열

```js
{{LIB_NAME}}.object.values({name: 'Axl rose', age: 50});

// ['Axl rose', 50]
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## map()
객체 요소를 콜백함수로 하여금 각 요소를 가공 합니다.

API | 설명
--- | ---
@param {Object} | 객체
@param {Function} | 콜백함수
@return {Object} | 가공된 객체

```js
{{LIB_NAME}}.object.map({1; 'one', 2: 'two', 3: 'three'}, function(item, key) {
    return item + '__';
});

// {1: 'one__', 2: 'two__', 3: 'three__'}
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## hasObject()
요소가 있는 json 객체인지 체크 합니다.

API | 설명
--- | ---
@param {Object} | 객체
@return {Boolean} | 요소가 하나라도 있는지 여부

```js
var obj1 = {};

{{LIB_NAME}}.object.hasObject(obj1);

// false
```
```js
var obj2 = {a: 'A'};

{{LIB_NAME}}.object.hasObject(obj2);

// true
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## toQueryString()
객체를 쿼리스크링으로 변환 합니다.

API | 설명
--- | ---
@param {Object} | 객체
@param {Boolean} | URL 인코딩할지 여부 (optional)
@return {String} | 결과 문자열

```js
{{LIB_NAME}}.object.toQueryString({a:1, b: 2, c: {d: 4}});

// 'a=1&b=2&c[d]=4'
```
```js
{{LIB_NAME}}.object.toQueryString({google:'https://www.google.co.kr/'}, true);

// 'google=https%3A%2F%2Fwww.google.co.kr%2F'
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## traverse()
주어진 객체의 키값와 요소를 맞바꿔 줍니다.

API | 설명
--- | ---
@param {Object} | 객체
@return {Object} | 맞바꾼 객체

```js
{{LIB_NAME}}.object.traverse({1:'a', 2:'b', 3:'c', 4:'d'});

// {a:1, b:2, c:3, d:4}
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## remove()
주어진 리터럴에서 key에 해당하는 요소를 삭제 합니다.

API | 설명
--- | ---
@param {Object} | 객체
@param {String} | 삭제할 키값
@return 지정한 요소가 삭제된 객체

```js
var obj = {a: 'A', b: 'B'};

{{LIB_NAME}}.object.remove(obj, 'b');

// {a: 'A'}
// delete obj.b 네이티브 삭제 기능 권장
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## stringify()
객체를 문자열로 변환 합니다.(JSON을 지원하는 브라우저에서는 JSON.stringify를 사용 합니다.)

API | 설명
--- | ---
@param {Object} | 객체
@return {String} | 변환된 문자

```js
{{LIB_NAME}}.object.stringify({a: 'A'});

// '{"a": "A"}'
```

[▲ 확장기능 목록 이동](#확장기능)
