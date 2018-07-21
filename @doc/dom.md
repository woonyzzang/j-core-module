###### Core > dom

# {{LIB_NAME}}.dom
> DOM 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [getEventPoint()](#geteventpoint)
- [getMouseButton()](#getmousebutton)
- [getCaretPos()](#getcaretpos)
- [setCaretPos()](#setcaretpos)
- [contains()](#contains)
- [addClass()](#addclass)
- [removeClass()](#removeclass)
- [hasClass()](#hasclass)
- [toggleClass()](#toggleclass)
- [addEvent()](#addevent)
- [ready()](#ready)

<br>

## getEventPoint()
이벤트의 좌표값을 추출 합니다.

API | 설명
--- | ---
@param {Event} | 이벤트 객체
@param {String} | mouseend나 touchend 이벤트일때 'end'를 넘겨주면 좀더 정확한 값이 반환된다.
@return {Object} | 이벤트 좌표값
@return {Number} | Object.x: X축
@return {Number} | Object.y: Y축

```js
document.getElementsByTagName('body')[0].addEventListener('click', function(e) {
    console.log( {{LIB_NAME}}.dom.getEventPoint(e, 'end') );
}, false);

// {x: 165, y: 21}
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## getMouseButton()
마우스 좌/우 클릭 버튼 구분을 확인 합니다.

API | 설명
--- | ---
@param {Event} | 이벤트 객체
@return {String} | 클릭된 마우스 좌/우 버튼 문자열 반환

```js
document.getElementsByTagName('body')[0].addEventListener('mousedown', function(e) {
    console.log( {{LIB_NAME}}.dom.getMouseButton(e) );
}, false);

// 마우스 좌측: 'left'
// 마우스 휠: 'middle'
// 마우스 우측: 'right'
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## getCaretPos()
입력창 셀렉션 영역 캐럿 커서 위치를 반환 합니다.

API | 설명
--- | ---
@param {DOMSeletor} | DOM 셀렉터
@return {Object} | 셀렉션 영역 캐럿 커서 위치
@return {Number} | Object.begin: 시작
@return {Number} | Object.end: 마지막

```js
document.getElementsByTagName('textarea')[0].addEventListener('focus', function(e) {
    console.log( {{LIB_NAME}}.dom.getCaretPos(this) );
}, false);

// {begin: 8, end: 14}
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## setCaretPos()
입력창 셀렉션 영역 캐럿 커서 위치를 설정 합니다.

API | 설명
--- | ---
@param {DOMSeletor} | DOM 셀렉터
@param {Number} | 캐럿 커서 위치

```js
document.getElementsByTagName('textarea')[0].addEventListener('focus', function() {
    {{LIB_NAME}}.dom.setCaretPos(this, 3);
}, false);
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## contains()
자식 엘리먼트 요소가 특정한 부모 엘리먼트 요소에 속해 있는지 확인 합니다.

API | 설명
--- | ---
@param {DOMSeletor} | 부모 DOM 셀렉터
@param {DOMSeletor} | 자식 DOM 셀렉터
@return {Boolean} | 확인여부

```js
{{LIB_NAME}}.dom.contains(document.documentElement, document.getElementsByTagName('h1')[0]);
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## addClass()
해당 엘리먼트 요소의 클래스 추가 합니다.

API | 설명
--- | ---
@param {DOMSeletor} | DOM 셀렉터
@param {String} | 클래스명

```js
{{LIB_NAME}}.dom.addClass({selector}, 'selected');
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## removeClass()
해당 엘리먼트 요소의 클래스를 삭제 합니다.

API | 설명
--- | ---
@param {DOMSeletor} | DOM 셀렉터
@param {String} | 클래스명

```js
{{LIB_NAME}}.dom.removeClass({selector}, 'selected');
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## hasClass()
해당 엘리먼트 요소의 특정 클래스 존재 유무를 확인 합니다.

API | 설명
--- | ---
@param {DOMSeletor} | DOM 셀렉터
@param {String} | 클래스명
@return {Boolean} | 존재여부

```js
{{LIB_NAME}}.dom.hasClass({selector}, 'on');
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## toggleClass()
해당 엘리먼트 요소의 지정된 클래스가 없으시 추가하고 있으면 삭제 합니다.

API | 설명
--- | ---
@param {DOMSeletor} | DOM 셀렉터
@param {String} | 클래스명

```js
{{LIB_NAME}}.dom.toggleClass({selector}, 'toggle');
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## addEvent()
해당 엘리먼트 요소에 이벤트 핸들러를 바인딩 합니다.

API | 설명
--- | ---
@param {DOMSeletor} | DOM 셀렉터
@param {String} | 이벤트 타입
@param {Function} | 콜백함수
@param {Boolean} | 이벤트 캡쳐링 (optional)

```js
{{LIB_NAME}}.dom.addEvent({selector}, 'click', function(e) {
    alert('clicked!');
});
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## ready()
document 로드 완료 시 이벤트를 발생 시킵니다.

API | 설명
--- | ---
@param {Function} | 콜백함수

```js
{{LIB_NAME}}.dom.ready(function() {
    console.log('DOM Loaded!');
});
    
// DOM Loaded!
```

[▲ 확장기능 목록 이동](#확장기능)
