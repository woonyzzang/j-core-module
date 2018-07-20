###### j core module

# {{LIB_NAME}}.date
> 날짜 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [parse()](#parse)
- [format()](#format)
- [isValid()](#isvalid)
- [between()](#between)
- [compare()](#compare)
- [equalsYMD()](#equalsymd)
- [calcDate()](#calcdate)
- [monthDiff()](#monthdiff)
- [daysInMonth()](#daysInmonth)
- [splits()](#splits)
- [diff()](#diff)
- [weekOfYear()](#weekOfYear)
- [isLeapYear()](#isLeapYear)
- [add()](#add)
- [min()](#min)
- [max()](#max)
- [normalize()](#normalize)

<br>

## parse()
주어진 날짜 형식의 문자열을 Date객체로 변환

API | 설명
--- | ---
@param {String} | 날짜 형식의 문자열
@return {Date} | 주어진 날짜문자열을 파싱한 값을 Date형으로 반환

```js
{{LIB_NAME}}.date.parse('2014-11-12');

// Wed Nov 12 2014 00:00:00 GMT+0900 (대한민국 표준시)
```
```js
{{LIB_NAME}}.date.parse('20141112');

// Wed Nov 12 2014 0
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## format()
날짜형식을 지정한 포맷의 문자열로 변환 합니다.

API | 설명
--- | ---
@param {Date} | 포맷 날짜
@param {String} | 포맷 문자열
@return {String} | 변환된 문자열

```js
// ex) 2015-04-07 15:03:45
// yyyy: 2015
// yy: 15
// M: 4
// MM: 04
// MMM: Apr
// MMMMM: April
// d: 7
// dd: 07
// h: 15
// hh: 15
// H: 3
// m: 3
// mm: 03
// s: 45
// ss: 45
// x: PM
{{LIB_NAME}}.date.format(new Date(), 'yy/MM/dd');

// '15/01/05'
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## isValid()
주어진 날자가 유효한지 체크 합니다.

API | 설명
--- | ---
@param {String} | 날짜 문자열
@returns {Boolean} | 유효한 날자인지 여부

```js
{{LIB_NAME}}.date.isValid('2018-13-23');

// false
```
```js
{{LIB_NAME}}.date.isValid('1984-06-28');

// true
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## between()
날짜가 시작일과 만료일 사이인지 여부를 판단합니다.

API | 설명
--- | ---
@param {Date} | 날짜
@param {Date} | 시작일시
@param {Date} | 만료일시
@return {Boolean} | 두날짜 사이에 있는지 여부

```js
{{LIB_NAME}}.date.between('2014-09-12', '2014-09-11', '2014-09-12');

// true
```
```js
{{LIB_NAME}}.date.between('2014-09-12', '2014-09-11', '2014-09-11');

// false
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## compare()
날짜를 비교 합니다.

API | 설명
--- | ---
@param {Date} | 날짜1
@param {Date} | 날짜2
@return {Number} | -1: 날짜1 이후
@return {Number} | 0: 동일
@return {Number} | 1: 날짜2 이후

```js
var d1 = new Date(2014, 11, 23);
var d2 = new Date(2014, 09, 23);

{{LIB_NAME}}.date.compare(d1, d2);

// -1
```
```js
var d1 = new Date(2014, 11, 23);
var d2 = new Date(2014, 09, 23);

{{LIB_NAME}}.date.compare(d1, d1);

// 0
```
```js
var d1 = new Date(2014, 11, 23);
var d2 = new Date(2014, 09, 23);

{{LIB_NAME}}.date.compare(d2, d1);

// 14'
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## equalsYMD()
년월일이 동일한지 여부를 판단 합니다.

API | 설명
--- | ---
@param {Date or String} | 날짜1
@param {Date or String} | 날짜2
@return {Boolean} | 두 날짜의 년월일이 동일한지 여부

```js
{{LIB_NAME}}.date.equalsYMD('2014-12-23 11:12:23', '2014-12-23 09:00:21');

// true
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## calcDate()
주어진 날짜를 기준으로 타입만큼 가감된 날짜를 포맷형태로 반환 합니다.

`Alias: calc()`

API | 설명
--- | ---
@param {Date} date - 기준날짜
@param {String} | 타입 (2y, 4M, -2d, -3d..)
@param {String} | 포맷
@return {Date or String} | 포맷지정값에 따라 결과를 날짜형 또는 문자열로 변환해서 반환

```js
{{LIB_NAME}}.date.calcDate('2014-12-23', '-3m');

// 2014-09-23(Date)
```
```js
{{LIB_NAME}}.date.calcDate('2014-12-23', '-3m', 'yyyy/MM/dd');

// '2014/09/23'(string)
```
```js
{{LIB_NAME}}.date.calcDate('2014-12-23', '-10d');

// 2014-12-13(Date)
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## monthDiff()
두 날짜의 월 간격을 비교 후 월차를 반환 합니다.

API | 설명
--- | ---
@param {Date} | 날짜1
@param {Date} | 날짜2
@return {Number} | 두날짜의 월차

```js
{{LIB_NAME}}.date.monthDiff('2011-02-12', '2014-11-23');

// 44
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## daysInMonth()
주어진 년월의 일수를 반환 합니다.

API | 설명
--- | ---
@param {Number} | 년도
@param {Number} | 월
@return {Date} | 주어진 년월이 마지막 날짜

```js
{{LIB_NAME}}.date.daysInMonth(2014, 2);

// 28
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## splits()
밀리초를 시,분,초로 변환 합니다.

API | 설명
--- | ---
@param {Number} |밀리초값
@return {Object} | 변환된 시간 값
@return {Number} | Object.days: 일 수
@return {Number} | Object.hours: 시간 수
@return {Number} | Object.mins: 분 수
@return {Number} | Object.secs: 초 수

```js
{{LIB_NAME}}.date.splits(2134000);

// {days: 0, hours: 0, mins: 35, secs: 34}
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## diff()
주어진 두 날짜의 간견을 시, 분, 초로 반환 합니다.

API | 설명
--- | ---
@param {Date} | 기준 시간
@param {Date} | 비교할 시간
@return {Object} | 시간차 값
@return {Number} | Object.ms: 밀리초
@return {Number} | Object.secs: 초
@return {Number} | Object.mins: 분
@return {Number} | Object.hours: 시
@return {Number} | Object.days: 일
@return {Number} | Object.weeks: 주
@return {Number} | Object.diff: 비교

```js
{{LIB_NAME}}.date.diff(new Date, new Date(new Date() - 51811));

// {ms: 811, secs: 51, mins: 0, hours: 0, days: 0, weeks: 0, diff: 51811}
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## weekOfYear()
주어진 날짜가 몇번째 주인지 확인 합니다.

API | 설명
--- | ---
@param {Date} | 날짜
@return {Number} | 주

```js
{{LIB_NAME}}.date.weekOfYear(new Date);

// 2
// 2015-01-05를 기준으로 했을 때
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## isLeapYear()
윤년인지 확인 합니다.

API | 설명
--- | ---
@param {Number} | 년도
@return {Boolean} | 확인여부

```js
{{LIB_NAME}}.date.isLeapYear(2014);

// false
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## add()
지정된 날짜에 가감한 날짜 객체를 반환 합니다.

API | 설명
--- | ---
@param {Date} | 날짜
@param {String} | 가감타입(ms, s, m, h, d, M, y)
@param {Number} | 가감 크기
@return {Date} | 가감된 날짜

```js
// 2014-06-10에서 y(년도)를 -4 한 값을 계산
{{LIB_NAME}}.date.add(new Date(2014, 5, 10), 'y', -4);

// Thu Jun 10 2010 00:00:00 GMT+0900 (한국 표준시)
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## min()
주어진 두 날짜 중에서 작은값 반환 합니다.

API | 설명
--- | ---
@param {Date} | 날짜1
@param {Date} | 날짜2
@return {Date} | 작은값 날짜

```js
{{LIB_NAME}}.date.min(new Date(2014, 5, 10), new Date(2018, 7, 19));

// Tue Jun 10 2014 00:00:00 GMT+0900 (한국 표준시)
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## max()
주어진 두 날짜 중에서 큰값 반환 합니다.

API | 설명
--- | ---
@param {Date} | 날짜1
@param {Date} | 날짜2
@return {Date} | 큰값 날짜

```js
{{LIB_NAME}}.date.max(new Date(2014, 5, 10), new Date(2018, 7, 19));

// Sun Aug 19 2018 00:00:00 GMT+0900 (한국 표준시)
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## normalize()
시/분/초 정규화(normalize) 처리를 합니다.

API | 설명
--- | ---
@param {Number} | 시
@param {Number} | 분
@param {Number} | 초
@param {Number} | 밀리초
@return {Object} | 시간정보가 담긴 객체
@return {Number} | Object.day: 일
@return {Number} | Object.hour: 시
@return {Number} | Object.min: 분
@return {Number} | Object.sec: 초
@return {Number} | Object.ms: 밀리초

```js
{{LIB_NAME}}.date.normalize(0, 0, 120, 0);

// {day:0, hour: 0, min: 2, sec: 0, ms: 0}
// 즉, 120초가 2분으로 변환
```

[▲ 확장기능 목록 이동](#확장기능)
