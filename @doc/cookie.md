###### Core > cookie

# {{LIB_NAME}}.cookie
> 쿠키 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [set()](#set)
- [get()](#get)
- [remove()](#remove)
- [setItem()](#setitem)
- [getItems()](#getitems)
- [removeItem()](#removeitem)

<br>

## set()
쿠키값을 설정 합니다.

API | 설명
--- | ---
@param {String} | 쿠키값
@param {Object} | 옵션 (optional)
@param {Date} | Object.expires: 만료시간
@param {String} | Object.path: 쿠키의 유효경로
@param {String} | Object.domain: 쿠키의 유효 도메인
@param {Boolean} | Object.secure: https 에서만 쿠키 설정이 가능하도록 하는 속성

```js
{{LIB_NAME}}.cookie.set('userid', 'test');
```
```js
{{LIB_NAME}}.cookie.set({
    userid: 'test',
    name: 'dev'
});
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## get
쿠키값을 가져옵니다.

API | 설명
--- | ---
@param {String} | 쿠키명
@return  {String} | 쿠키값

```js
{{LIB_NAME}}.cookie.get('userid');

// 'test'
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## remove
쿠키값을 삭제 합니다.

API | 설명
--- | ---
@param {String} | 쿠키명

```js
{{LIB_NAME}}.cookie.remove('userid');

// ''
```
```js
{{LIB_NAME}}.cookie.remove(['userid', 'name']);
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## setItem()
구분자값으로 문자열로 조합하여 쿠키값 셋팅 합니다.

API | 설명
--- | ---
@param {String} | 쿠키명
@param {String} | 값
@param {String} | 구분자

```js
{{LIB_NAME}}.cookie.setItem('arr', 'a');

// ['a']
```
```js
{{LIB_NAME}}.cookie.setItem('arr', 'b', ':');

// ['a:b']
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## getItems()
구분자값인 문자열로 조합한 쿠키값을 가져옵니다.

API | 설명
--- | ---
@param {String} name | 쿠키명

```js
{{LIB_NAME}}.cookie.getItems('arr');

// ['a']
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## removeItem()
구분자값 쿠키명에 설정되어 있던 조합문자열에서 값을 제거 합니다.

API | 설명
--- | ---
@param {String} | 쿠키명
@param {String} | 값
@param {String} | 구분자

```js
{{LIB_NAME}}.cookie.removeItem('arr', 'b');

// [a]
```

[▲ 확장기능 목록 이동](#확장기능)
