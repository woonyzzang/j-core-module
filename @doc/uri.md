###### j core module

# {{LIB_NAME}}.uri
> URL 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [getHost()](#gethost)
- [getPageUrl()](#getpageurl)
- [addParam()](#addparam)
- [parseQuery()](#parsequery)
- [parseUrl()](#parseurl)
- [removeHash()](#removehash)
- [getParam()](#getparam)

<br>

## getHost()
현재 페이지의 호스트주소를 반환 합니다.

API | 설명
--- | ---
@returns {String} | 호스트 주소

```js
{{LIB_NAME}}.uri.getHost();

// 'http://127.0.0.1:8080'
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## getPageUrl()
현재 페이지의 url 반환 합니다.(쿼리스트링, # 제외)

API | 설명
--- | ---
@returns {String} | URL

```js
{{LIB_NAME}}.uri.getHost();

// 'http://127.0.0.1:8080/'
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## addParam()
주어진 url에 쿼리스트링을 조합 합니다.

API | 설명
--- | ---
@param {String} | URL
@param {String or Object} | 쿼리스트링
@return {String} | 호스트 URL + 쿼리스트링

```js
{{LIB_NAME}}.uri.addParam('board.do', {a:1, b: 2, c: {d: 4}});

// 'board.do?a=1&b=2&c[d]=4'
```
```js
{{LIB_NAME}}.uri.addParam('board.do?id=123', {a:1, b: 2, c: {d: 4}});

// 'board.do?id=123&a=1&b=2&c[d]=4'
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## parseQuery()
쿼리스트링을 객체로 변환 합니다.

API | 설명
--- | ---
@param {String} | 쿼리스트링 문자열
@return {Object} | 변환된 객체

```js
{{LIB_NAME}}.uri.parseQuery('a=1&b=2');

// {a: 1, b: 2}
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## parseUrl()
url를 파싱하여 host, port, protocol 등을 추출 합니다.

API | 설명
--- | ---
@param {string} | URL
@return {Object} | 파싱된 url 데이터 객체

```js
{{LIB_NAME}}.uri.parseUrl('http://www.google.co.kr:8080/list.do?a=1&b=2#comment');

// {scheme: 'http', host: 'www.google.co.kr', port: '8080', path: '/list.do', query: 'a=1&b=2'…}
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## removeHash()
주어진 url에서 해쉬문자열 제거 합니다.

API | 설명
--- | ---
@param {string} | url
@return {string} | 결과 문자열

```js
{{LIB_NAME}}.uri.removeHash('list.do#comment');

// 'list.do'
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## getParam()
쿼리스트링 파라미터 값을 가져옵니다.

API | 설명
--- | ---
@param {string} | 쿼리스트링 파라미터
@return {string} | 파라미터 값 문자열 반환

```js
// http://www.google.co.kr?_ijt=fqn24lecvlsjvm8mn9d0rmcff3
{{LIB_NAME}}.uri.getParam('_ijt');

// 'fqn24lecvlsjvm8mn9d0rmcff3'
```

[▲ 확장기능 목록 이동](#확장기능)
