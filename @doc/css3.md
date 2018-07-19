###### j core module

# {{LIB_NAME}}.css3
> CSS3 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [prefix()](#prefix)
- [support](#support)
- [support3D](#support3d)
- [has()](#has)
- [transform](#transform)
- [transitionTimingFunction](#transitiontimingfunction)
- [transitionDuration](#transitionduration)
- [transitionDelay](#transitiondelay)
- [transformOrigin](#transformorigin)
- [transition](#transition)
- [translateZ](#translatez)
- [transitionEnd](#transitionend)
- [position()](#position)
- [move()](#move)
- [animate()](#animate)
- [transitionStyle()](#transitionstyle)

<br>

## prefix()
주어진 css명 앞에 현재 브라우저에 해당하는 벤더 prefix를 붙여줍니다

API | 설명
--- | ---
@param {String} | CSS속성
@return {String} | 해당 벤더프리픽스 + CSS속성

```js
{{LIB_NAME}}.css3.prefix('transition');

// webkitTransition
// 웹킷 브라우저일 경우
```
```js
{element}.style[{{LIB_NAME}}.css3.prefix('transform')] = 'translate(50px, 100px)';
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## support
css3의 지원여부를 확인 합니다.

API | 설명
--- | ---
@return {Boolean} | 지원여부

```js
{{LIB_NAME}}.css3.support

// true
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## support3D
CSS3의 3D 지원여부를 확인 합니다.

API | 설명
--- | ---
@return {Boolean} | 지원여부

```js
{{LIB_NAME}}.css3.support3D

// true
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## has()
주어진 CSS 속성을 지원하는지 체크 합니다.

API | 설명
--- | ---
@param {String} cssName 체크하고자 하는 css명
@return {Boolean} 지원여부

```js
{{LIB_NAME}}.css3.has('transform');

// true
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## transform
CSS3의 transform 속성의 벤더 prefix를 반환 합니다.

API | 설명
--- | ---
@return {String} | 벤더 prefix + transform

```js
{{LIB_NAME}}.css3.transform;
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## transitionTimingFunction
CSS3의 transitionTimingFunction 속성의 벤더 prefix를 반환 합니다.

API | 설명
--- | ---
@return {String} | 벤더 prefix + transitionTimingFunction

```js
{{LIB_NAME}}.css3.transitionTimingFunction;
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## transitionDuration
CSS3의 transitionDuration 속성의 벤더 prefix를 반환 합니다.

API | 설명
--- | ---
@return {String} | 벤더 prefix + transitionDuration

```js
{{LIB_NAME}}.css3.transitionDuration;
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## transitionDelay
CSS3의 transitionDelay 속성의 벤더 prefix를 반환 합니다.

API | 설명
--- | ---
@return {String} | 벤더 prefix + transitionDelay

```js
{{LIB_NAME}}.css3.transitionDelay;
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## transformOrigin
CSS3의 transformOrigin 속성의 벤더 prefix를 반환 합니다.

API | 설명
--- | ---
@return {String} | 벤더 prefix + transformOrigin

```js
{{LIB_NAME}}.css3.transformOrigin;
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## transition
CSS3의 transition 속성의 벤더 prefix를 반환 합니다.

API | 설명
--- | ---
@return {String} | 벤더 prefix + transition

```js
{{LIB_NAME}}.css3.transition;
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## translateZ
CSS3의 translateZ 속성의 벤더 prefix를 반환 합니다.

API | 설명
--- | ---
@return {String} | 벤더 prefix + translateZ

```js
{{LIB_NAME}}.css3.translateZ;
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## transitionEnd
CSS3의 transitionEnd 속성의 벤더 prefix를 반환 합니다.

API | 설명
--- | ---
@return {String} | 벤더 prefix + transitionEnd

```js
{{LIB_NAME}}.css3.transitionEnd;
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## position()
엘리먼트 요소의 현재 위치를 반환 합니다.

API | 설명
--- | ---
@param {DOMSeletor} | DOM 셀렉터
@return {Object} 좌표값
@return {Number} Object.x: X축
@return {Number} Object.y: Y축

```js
{{LIB_NAME}}.css3.position({selctor});

// {x: 100, y: 250}
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## move()
CSS3 속성을 사용해서 움직여 줍니다.

API | 설명
--- | ---
@param {DOMSelector} | DOM 셀렉터
@param {Number or String} | 움직일 X축
@param {Nymber or String} | 움직일 Y축
@param {Float} | 속도
@param {Function} | 콜백함수 (optional)

```js
{{LIB_NAME}}.css3.move(document.getElementsByTagName({selctor})[0], 100, 200, 2, function() {
    alert('a');
});
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## animate()
CSS3 속성을 사용해서 애니메이션 모션화 해줍니다.

API | 설명
--- | ---
@param {DOMSelector} | DOM 셀렉터
@param {Number or String} | 움직일 X축
@param {Nymber or String} | 움직일 Y축
@param {Float} | 속도
@param {Function} | 콜백함수 (optional)

```js
{{LIB_NAME}}.css3.animate(document.getElementsByTagName({selctor})[0], 100, 100, 2, function() {
    alert('a');
});
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## transitionStyle()
지정한 엘리먼트에 css3 속성의 transitionStyle 추가 합니다.

API | 설명
--- | ---
@param {DOMSelector} | DOM 셀렉터
@param {String} | 모션
@param {Float} | 속도
@param {String} | easing

```js
{{LIB_NAME}}.css3.transitionStyle(document.getElementsByTagName({selector})[0], 'width', 2, 'ease-in');
```

[▲ 확장기능 목록 이동](#확장기능)
