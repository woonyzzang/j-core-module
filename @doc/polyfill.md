###### j core module

# Polyfill
> 코어 로드 시 폴리필 기능을 사용할 수 있습니다.

## 폴리필기능

- [template](#template)
- [querySelector()](#queryselector)
- [querySelectorAll()](#queryselectorall)
- [getElementsByClassName()](#getelementsbyclassname)
- [bind()](#bind)
- [matchMedia()](#matchmedia)

<br>

## template
HTML5 템플릿 엘리먼트 폴리필 기능을 지원 합니다.

```js
<html>
<head>
<!-- HTML 안에 <template>를 렌더링 하기전 head안의 스크립트 선언 -->
<script>document.createElement('template');</script>
<!-- CSS안에 template{display:none} 선언 -->
<style>template{display:none}</style>
</head>
<body>
<template>
    <h1>This is template content.</h1>
    <p>Its really great.</p>
</template>
<div id="target">
    <p>This is regular old content.</p>
</div>

<script>
var $template = document.getElementsByTagName('template')[0];
var $target = document.getElementById('target');

$target.appendChild($template.content.cloneNode(true));
</script>
</body>
</html>
```

[▲ 폴리필 목록 이동](#폴리필기능)

<br>

## querySelector()
쿼리 셀렉터 폴리필 기능을 지원 합니다.

API | 설명
--- | ---
@param {DOMSeletor} | DOM 셀렉터 (id명)

```js
document.querySelector('#gnb');
```

[▲ 폴리필 목록 이동](#폴리필기능)

<br>

## querySelectorAll()
쿼리 전체 셀렉터 폴리필 기능을 지원 합니다.

API | 설명
--- | ---
@param {DOMSeletor} | DOM 셀렉터

```js
document.querySelectorAll('a');

// <a> 엘리먼트 전체 선택
```
```js
// document.querySelectorAll('a')[index];
document.querySelectorAll('a')[0];

// <a> 엘리먼트 첫번째 선택
```

[▲ 폴리필 목록 이동](#폴리필기능)

<br>

## getElementsByClassName()
클래스 셀렉터 폴리필 기능을 지원 합니다.

API | 설명
--- | ---
@param {DOMSeletor} | DOM 셀렉터 (class명)

```js
document.getElementsByClassName('tab_menu');
```

[▲ 폴리필 목록 이동](#폴리필기능)

<br>

## bind()
바인드 폴리필 기능 지원을 지원 합니다.

API | 설명
--- | ---
@param {Array} | 배열
@param {Function} | 콜백함수
@param {Object} | 컨텍스트 (optional)
@return {Boolean} | 최종 결과

```js
function Test() {
    console.log(this.name);
}

Test.bind({name: 'axl rose'})();

// 'axl rose';
```

[▲ 폴리필 목록 이동](#폴리필기능)

<br>

## matchMedia()
미디어쿼리 폴리필 기능을 지원 합니다.

API | 설명
--- | ---
@param {String} | CSS 미디어 쿼리

```js
if (matchMedia('only screen and (max-width: 480px)').matches) {}
```
```js
if (matchMedia('all and (orientation:landscape)').matches) {}
```

[▲ 폴리필 목록 이동](#폴리필기능)
