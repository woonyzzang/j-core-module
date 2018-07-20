###### {{LIB_NAME}} > number

# {{LIB_NAME}}.number
> 숫자 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [addComma()](#addcomma)
- [random()](#random)
- [limit()](#limit)
- [parse()](#parse)
- [toKor()](#tokor)

<br>

## addComma()
세자릿수 마다 ,(콤마)를 삽입 합니다.

`Alias: {{LIB_NAME}}.comma()`

API | 설명
--- | ---
@param {Number} | 숫자값
@return {String} | 세자릿수 마다 콤마 삽입 후 반환

```js
{{LIB_NAME}}.number.addComma(21342);

// '21,342'
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## random()
min ~ max사이의 랜덤값을 반환 합니다.

API | 설명
--- | ---
@param {Number} | 최소값
@param {Number} | 최대값
@return {Number} | 랜덤값 반환

```js
{{LIB_NAME}}.number.random(1, 10);

// 7
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## limit()
기준값이 최소값보다 작을 경우 최소값을, 최대값보다 클 경우 최대값을 반환합니다.

API | 설명
--- | ---
@param {Number} | 기준값
@param {Number} | 최소값
@param {Number} | 최대값
@return {Number} | 상하한값을 반환

```js
{{LIB_NAME}}.number.limit(15, 1, 10);

// 10
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## parse()
어떠한 경우에도 숫자로 변환 합니다.(뒤에 있는 숫자외의 문자를 제거한 후 숫자만 추출합니다.)

API | 설명
--- | ---
@param {String} | 숫자 + 문자가 포함된 값
@return {Number} | 숫자 반환

```js
{{LIB_NAME}}.number.parse('100만원');

// 100
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## toKor()
수를 한글로 변환합니다.

API | 설명
--- | ---
@param {Number} | 숫자
@return {String} | 한글로 변환된 값 반환

```js
{{LIB_NAME}}.number.toKor(123456);

// 십이만삼천사백오십육
```

[▲ 확장기능 목록 이동](#확장기능)
