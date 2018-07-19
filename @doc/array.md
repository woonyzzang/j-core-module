###### j core module

# {{LIB_NAME}}.array
> 배열 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [append()](#append)
- [map()](#map)
- [every()](#every)
- [any()](#any)
- [shuffle()](#shuffle)
- [filter()](#filter)
- [indexOf()](#indexof)
- [include()](#include)
- [removeAt()](#removeat)
- [remove()](#remove)
- [max()](#max)
- [min()](#min)
- [reverse()](#reverse)
- [different()](#different)
- [sum()](#sum)
- [toArray()](#toarray)

<br>

## append()
배열 요소들을 병합 합니다.

API | 설명
--- | ---
@param {Array} | 원본 배열
@param {...any} | 합칠 요소들
@return {Array} 모두 합쳐진 배열

```js
{{LIB_NAME}}.array.append([1,2,3], [4,5,6], [6, 7, 8]);

// [1,2,3,4,5,6,7,8]
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## map()
배열 요소를 콜백함수로 하여금 요소를 가공 합니다.

API | 설명
--- | ---
@param {Array} | 배열
@param {Function} | 콜백함수
@param {Object} | 컨텍스트 (optional)
@return {Array} 기공된 배열

```js
{{LIB_NAME}}.array.map([1, 2, 3], function(item, index) {
    return item * 10;
});

// [10, 20, 30]
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## every()
반복자함수의 반환값이 true가 아닐 때까지 반복 합니다.

API | 설명
--- | ---
@param {Array} | 배열
@param {Function} | 콜백함수
@param {Object} | 컨텍스트 (optional)
@return {Boolean} | 최종 결과

```js
{{LIB_NAME}}.array.every([1, 3, 5, 7], function(value) {
    return value > 5;
});

// false
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## any()
반복자함수의 반환값이 true일 때까지 반복 합니다.

API | 설명
--- | ---
@param {Array} | 배열
@param {Function} | 콜백함수
@param {Object} | 컨텍스트 (optional)
@return {Boolean} | 최종 결과

```js
{{LIB_NAME}}.array.any([1, 3, 5, 7], function(val) {
    return val < 5;
});

// true
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## shuffle()
배열 요소를 임의의 순서로 섞습니다.

API | 설명
--- | ---
@param {Array} | 배열
@return {Array} | 순서가 섞인 새로운 배열

```js
{{LIB_NAME}}.array.shuffle([1, 3, 4, 6, 7, 8]);

// [6, 3, 8, 4, 1, 7]
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## filter()
배열 요소를 콜백함수로 하여금 요소를 걸러냅니다.

API | 설명
--- | ---
@param {Array} | 배열
@param {Function} | 콜백함수
@param {Object} | 컨텍스트 (optional)
@returns {Array} | 필터링된 배열

```js
{{LIB_NAME}}.array.filter([1, '일', 2, '이', 3, '삼'], function(item, index) {
    return (typeof item === 'string');
});

// ['일','이','삼']
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## indexOf()
주어진 배열에 인덱스의 요소를 반환 합니다.

API | 설명
--- | ---
@param {Array} | 배열
@param {...any} | 찾을 값
@return {Number} | 매칭된 인덱스

```js
{{LIB_NAME}}.array.indexOf([1, '일', 2, '이', 3, '삼'], '일');

 // 1
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## include()
주어진 배열에 지정된 값이 존재하는지 체크 합니다.

API | 설명
--- | ---
@param {Array} | 배열
@param {...any} | 찾을 값
@return {Boolean} 존재 유뮤 체크

```js
{{LIB_NAME}}.array.include([1, '일', 2, '이', 3, '삼'], '삼');

 // true
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## removeAt()
주어진 배열에서 인덱스에 해당하는 요소를 삭제 합니다.

API | 설명
--- | ---
@param {Array} | 배열
@param {Number} | 삭제할 인덱스 or 요소
@return {Array} | 지정한 요소가 삭제된 배열

```js
{{LIB_NAME}}.array.removeAt([1, 2, 3, 4], 1);

// [1, 3, 4]
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## remove()
주어진 배열에서 해당하는 요소를 삭제 합니다.

API | 설명
--- | ---
@param {Array} | 배열
@param {Function} | 콜백함수
@return {Array} | 지정한 요소가 삭제된 배열

```js
{{LIB_NAME}}.array.remove(['a', 'b', 'c'], 'b');

// ['a', 'c']
```
```js
{{LIB_NAME}}.array.remove(['a', 'b', 'c'], function(value) {
    return value === 'b';
});

// ['a', 'c']
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## max()
주어진 배열에서 가장 큰 요소를 반환 합니다.

API | 설명
--- | ---
@param {Array} | 배열
@return {Number} | 최대값

```js
{{LIB_NAME}}.array.max([2, 1, 3, 5, 2, 8]);

// 8
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## min()
주어진 배열에서 가장 작은 요소를 반환합니다.

API | 설명
--- | ---
@param {Array} | 배열
@return {Number} | 최소값

```js
{{LIB_NAME}}.array.min([2, 1, 3, 5, 2, 8]);

// 1
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## reverse()
배열의 요소를 역순으로 재배치 합니다.

API | 설명
--- | ---
@param {Array} | 배열
@return {Array} | 역순으로 정렬된 새로운 배열

```js
{{LIB_NAME}}.array.reverse([1, 2, 3]);

// [3, 2, 1]
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## different()
두 배열의 차집합을 반환 합니다.

API | 설명
--- | ---
@param {Array} | 배열1
@param {Array} | 배열2
@returns {Array} | 차집합 배열

```js
{{LIB_NAME}}.array.different([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]);

// [1, 2, 6, 7]
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## sum()
배열요소들의 합을 반환 합니다.

API | 설명
--- | ---
@param {Array} | 배열
@return {number} | 합산 값

```js
{{LIB_NAME}}.array.sum([1, 2, 3]);

// 6
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## toArray()
주어진 값을 배열로 변환

API | 설명
--- | ---
@param {...any} | 배열로 변환하고자 하는 값
@return {Array} | 변환된 배열

```js
{{LIB_NAME}}.toArray('abcd');

// ['a', 'b', 'c', 'd']
```
```js
{{LIB_NAME}}.toArray(arguments);

// arguments를 객체를 array로 변환하여 Array에서 지원하는 유틸함수(slice, reverse ...)등을 사용할 수 있다.
```

[▲ 확장기능 목록 이동](#확장기능)
