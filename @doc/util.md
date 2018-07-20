###### j core module

# {{LIB_NAME}}.util
> util 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [browser](#browser)
    - isTouch
    - isRetina
    - isMobile
    - isMac
    - isLinux
    - isWin
    - is64Bit
    - isIE
    - ieVersion
    - isChrome
    - isSafari
    - isWebKit
    - isGecko
    - isIETri4
    - isAir
    - isIOS
    - isAndroid
    - iosVersion
    - androidVersion
- [delayRun()](#delayrun)
- [getUniqId()](#getuniqid)
- [nextSeq()](#nextseq)
- [template()](#template)

<br>

## browser
웹 브라우저 정보를 확인 합니다.

`Alias: {{LIB_NAME}}.browser`

```js
// 터치디바이스 여부
{{LIB_NAME}}.util.browser.isTouch
```
```js
// 레티나 여부
{{LIB_NAME}}.util.browser.isRetina
```
```js
// orientation 작동여부로 판단
{{LIB_NAME}}.util.browser.isMobile
```
```js
// 맥OS
{{LIB_NAME}}.util.browser.isMac
```
```js
// 리눅스
{{LIB_NAME}}.util.browser.isLinux

```
```js
// 윈도우즈
{{LIB_NAME}}.util.browser.isWin
```
```js
// 64비트 플랫폼
{{LIB_NAME}}.util.browser.is64Bit
```
```js
// IE
{{LIB_NAME}}.util.browser.isIE
```
```js
// IE의 버전
{{LIB_NAME}}.util.browser.ieVersion
```
```js
// 오페라
{{LIB_NAME}}.util.browser.isOpera
```
```js
// 크롬
{{LIB_NAME}}.util.browser.isChrome
```
```js
// 사파리
{{LIB_NAME}}.util.browser.isSafari
```
```js
// 웹킷
{{LIB_NAME}}.util.browser.isWebKit
```
```js
// 파이어폭스
{{LIB_NAME}}.util.browser.isGecko
```
```js
// IE엔진
{{LIB_NAME}}.util.browser.isIETri4
```
```js
// 어도비 에어
{{LIB_NAME}}.util.browser.isAir
```
```js
// 아이폰, 아이패드
{{LIB_NAME}}.util.browser.isIOS
```
```js
// 안드로이드
{{LIB_NAME}}.util.browser.isAndroid
```
```js
// ios 버전 : [8, 1, 0] -> [major, minor, revision]
{{LIB_NAME}}.util.browser.iosVersion
```
```js
// android 버전 : [4, 1, 0] -> [major, minor, revision]
{{LIB_NAME}}.util.browser.androidVersion
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## delayRun()
주어진 시간내에 호출이 되면 무시되고, 초과했을 때만 비로소 함수를 실행시켜 줍니다.

API | 설명
--- | ---
@param {Function} | 콜백함수
@param {Number} | 딜레이시간
@param {...any} | 컨텍스트
@return {Function} | 컨텍스트함수

```js
// 리사이징 중일 때는 이벤트를 발생시키지 않다가 리사이징이 끝나고 0.5초가 지난 후에 이벤트를 발생시키고자 할 경우 사용.
window.addEventListener('resize', {{LIB_NAME}}.util.delayRun(function() {
    console.log('resizeend');
}, 500), false);
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## getUniqId()
15자의 영문, 숫자로 이루어진 유니크한 값을 생성 합니다.

API | 설명
--- | ---
@param {String} | 생성된 유니크값

```js
{{LIB_NAME}}.util.getUniqId(45);

//eronv05ez56qjypsvrzheypyariyh6deodwpqu74j834w
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## nextSeq()
순번으로 유니크값을 생성해서 반환 합니다.

API | 설명
--- | ---
@return {number} | 순번 유니크값

```js
// 순차적으로 실행할 때 마다 1, 2, 3... 반환
{{LIB_NAME}}.util.nextSeq();
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## template()
템플릿을 생성 합니다.

API | 설명
--- | ---
@param {DOMSeletor} | DOM 셀렉터
@param {Object} | 템플릿 문자열에서 변환될 데이터
@return {Object} | 변환된 DOM Chunk 반환

```js
<script type="text/template" id="result">
    <p>반갑습니다! {{who}}님!</p>
<\/script>

var tmpl = {{LIB_NAME}}.util.template(document.getElementById('result'), {who: 'woonyzzang'});

document.body.innerHTML = tmpl;
```

[▲ 확장기능 목록 이동](#확장기능)
