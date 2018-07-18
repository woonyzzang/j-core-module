###### j core module

# {{LIB_NAME}}.string
> 문자열 관련 코어 확장 기능을 사용할 수 있습니다.

## 목차

- [trim()](#trim)
- [replaceAll()](#replaceAll)
- [byteSize()](#byteSize)
- [getFileName()](#getFileName)
- [getFileExt()](#getFileExt)
- [cut()](#cut)
- [cutByByte()](#cutByByte)
- [indexByByte()](#indexByByte)
- [capitalize()](#capitalize)
- [toFirstLower()](#toFirstLower)
- [camelize()](#camelize)
- [dasherize()](#dasherize)
- [repeat()](#repeat)
- [escapeHTML()](#escapeHTML)
- [unescapeHTML()](#unescapeHTML)
- [toggle()](#toggle)
- [format()](#format)
- [toEntities()](#toEntities)
- [stripTags()](#stripTags)
- [random()](#random)
- [stripScripts()](#stripScripts)
- [isKor()](#isKor)

<br>

## trim()
앞뒤 빈문자열을 제거합니다.

API | 설명
--- | ---
@param {String} value | 문자값
@return {String} | 공백 제거 후 문자 반환

```js
{{LIB_NAME}}.string.trim(' abc ');

// 'abc'
```

[목차로 이동](#목차)

<br>

## replaceAll()
정규식이나 검색문자열을 사용하여 문자열에서 텍스트를 교체 합니다.

API | 설명
--- | ---
@param {String} value | 교체를 수행할 문자열
@param {RegExp|String} | find 검색할 문자열이나 정규식 패턴
@param {String} rep | 대체할 문자열
@return {String} | 대체된 결과 문자열

```js
{{LIB_NAME}}.string.replaceAll('a,b,c,d', ',', '');

// 'abcd'
```

[목차로 이동](#목차)

<br>

## byteSize()
주어진 문자열의 바이트길이 반환를 반환합니다.

API | 설명
--- | ---
@param {String} value | 길이를 계산할 문자열
@return {Number} | 문자열 바이트 반환

```js
{{LIB_NAME}}.number.byteSize('동해물과');

// euckr:8byte, utf8:12byte
```

[목차로 이동](#목차)

<br>

## getFileName()
주어진 path에서 파일명을 추출 합니다.

API | 설명
--- | ---
@param {String} str | path경로
@return {String} | 경로가 제거된 파일명 반환

```js
{{LIB_NAME}}.string.getFileName('etc/bin/jslib.js');

// 'jslib.js'
```

[목차로 이동](#목차)

<br>

## getFileExt()
주어진 path에서 확장자를 추출 합니다.

API | 설명
--- | ---
@param {String} fname | path문자열
@return {String} | 경로가 제거된 확장자 반환

```js
{{LIB_NAME}}.string.getFileExt('etc/bin/jslib.js');

// 'js'
```

[목차로 이동](#목차)

<br>

## cut()
주어진 path에서 확장자를 추출 합니다.

API | 설명
--- | ---
@param {String} value | 문자열
@param {Number} length | 잘라낼 길이
@param {String='...'} [truncation = '...'] | 꼬리글
@return {String} | 결과 문자열 반환

```js
{{LIB_NAME}}.string.cut('동해물과', 3, '...');

// '동해물...'
```

[목차로 이동](#목차)

<br>

## cutByByte()
주어진 문자열을 지정된 길이(바이트)만큼 자른 후, 꼬리글을 덧붙여 반환 합니다.

API | 설명
--- | ---
@param {String} value | 문자열
@param {Number} length | 잘라낼 길이
@param {String='...'} [truncation = '...'] | 꼬리글
@return {String} | 결과 문자열 반환

```js
{{LIB_NAME}}.string.cutByByte('동해물과', 3, '...');

// '동...'
```

[목차로 이동](#목차)

<br>

## indexByByte()
주어진 바이트길이에 해당하는 char index 반환 합니다.(UTF-8 상에서 한글은 3바이트로 계산 합니다.)

API | 설명
--- | ---
@param {String} value | 문자열
@param {Number} length | 제한 문자수
@return {Number} | 결과 문자열에 해당하는 char index 반환

```js
{{LIB_NAME}}.string.indexByByte('동해물과', 3);

// 2
```

[목차로 이동](#목차)

<br>

## capitalize()
첫글자를 대문자로 변환하고 이후의 문자들은 소문자로 변환 합니다.

API | 설명
--- | ---
@param {String} value | 문자열
@return {String} | 결과 문자열

```js
{{LIB_NAME}}.string.capitalize('abCdEfg');

// 'Abcdefg'
```

[목차로 이동](#목차)

<br>

## toFirstLower()
첫글자를 소문자로 변환 합니다.

API | 설명
--- | ---
@param {String} value | 문자열
@returns {String} | 결과 문자열

```js
{{LIB_NAME}}.string.toFirstLower('Welcome');

// 'welcome'
```

[목차로 이동](#목차)

<br>

## camelize()
카멜 형식으로 변환 합니다.

API | 설명
--- | ---
@param {String} value | 문자열
@return {String} | 결과 문자열

```js
{{LIB_NAME}}.string.camelize('ab-cd-efg');

// 'abCdEfg'
```

[목차로 이동](#목차)

<br>

## dasherize()
대쉬 형식으로 변환 합니다.

API | 설명
--- | ---
@param {String} value | 문자열
@return {String} | 결과 문자열

```js
{{LIB_NAME}}.string.dasherize('abCdEfg');

// 'ab-cd-efg'
```

[목차로 이동](#목차)

<br>

## repeat()
주어진 문자열을 지정한 수만큼 연속적으로 반복하여 조합 합니다.

API | 설명
--- | ---
@param {String} value | 문자열
@param {Number} cnt | 반복 횟수
@return {String} | 결과 문자열

```js
{{LIB_NAME}}.string.repeat('ab', 4);

// 'abababab'
```

[목차로 이동](#목차)

<br>

## escapeHTML()
특수기호를 HTML ENTITY로 변환 합니다.

API | 설명
--- | ---
@param {String} value | 특수기호
@return {String} | 결과 문자열

```js
{{LIB_NAME}}.string.escapeHTML('<div><a href="#">링크</a></div>');

// "&lt;div&gt;&lt;a href=&quot;#&quot;&gt;링크&lt;/a&gt;&lt;/div&gt;"
```

[목차로 이동](#목차)

<br>

## unescapeHTML()
HTML ENTITY로 변환된 문자열을 원래 특수기호로 변환 합니다.

API | 설명
--- | ---
@param {String} value | 특수기호
@return {String} | 결과 문자열

```js
{{LIB_NAME}}.string.unescapeHTML('&lt;div&gt;&lt;a href=&quot;#&quot;&gt;링크&lt;/a&gt;&lt;/div&gt;');

 // '<div><a href="#">링크</a></div>'
```

[목차로 이동](#목차)

<br>

## toggle()
value === these 이면 other 를,  value !== these 이면 value 를 반환 합니다.

API | 설명
--- | ---
@param {String} value | 현재 상태값
@param {String} these | 첫번째 상태값
@param {String} other | 두번째 상태값
@return {String} | 토글된 상태값 반환

```js
// 정렬버튼에 이용
{{LIB_NAME}}.string.toggle('ASC', 'ASC', 'DESC');

 // 'DESC'
```
```js
{{LIB_NAME}}.string.toggle('DESC', 'ASC', 'DESC');

// 'ASC'
```

[목차로 이동](#목차)

<br>

## format()
주어진 문자열에 있는 {인덱스} 부분을 주어진 인수에 해당하는 값으로 치환 후 반환 합니다.

API | 설명
--- | ---
@param {String} format | 문자열
@param {String|Object} val | 대체할 문자열
@return {String} | 결과 문자열

```js
{{LIB_NAME}}.string.format('{0}:{1}:{2} {0}', 'a', 'b', 'c');

 // 'a:b:c a'
 ```
 ```js
{{LIB_NAME}}.string.format('{a}:{b}:{c} {d}', {a: 'a', b: 'b', c: 'c', d: 'd'});

 // 'a:b:c a'
```

[목차로 이동](#목차)

<br>

## toEntities()
문자열을 HTML ENTITIES로 변환 합니다.

API | 설명
--- | ---
@param {String} value | HTML 특수기호
@return {String} | HTML 엔티티코드 반환

```js
{{LIB_NAME}}.string.toEntities('/');

// '&#47'
```

[목차로 이동](#목차)

<br>

## random()
랜덤문자열을 생성 합니다.

API | 설명
--- | ---
@param {Number} len | 길이
@return {String} | 랜덤문자열 반환

```js
{{LIB_NAME}}.string.random(10);

// '4r1kf9piku'
```

[목차로 이동](#목차)

<br>

## stripTags()
주어진 문자열에서 HTML를 제거 합니다.

API | 설명
--- | ---
@param {string} value | 문자열
@return {string} | 태그가 제거된 문자열

```js
{{LIB_NAME}}.string.stripTags('welcome to <b>the</b> jungle');

// 'welcome to the jungle'
```

[목차로 이동](#목차)

<br>

## isKor()
주어진 문자열에서 한글 존재 여부를 체크 합니다.

API | 설명
--- | ---
@param {string} value | 문자열
@param {string} type | 옵션 구분자 ('ONLY' || 'INCLUDE')
@return {boolean} | 결과값

```js
{{LIB_NAME}}.string.isKor('한글여부1', 'ONLY');

// false
```

[목차로 이동](#목차)
