###### Core > asyncImport

# {{LIB_NAME}}.asyncImport
> CSS, JavaScript 파일 동적 로드 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [loadcss()](#loadcss)
- [loadjs()](#loadjs)
- [load()](#load)
- [addAliases()](#addaliases)

<br>

## loadcss()
CSS 파일을 동적으로 로드 합니다.

Alias: importCss()

API | 설명
--- | ---
@param {string} | 경로 + CSS 파일
@param {Function} | 콜백함수 (optional)

```js
{{LIB_NAME}}.asyncImport.loadcss('myLib.css');
```
```js
// 콜백 방식
{{LIB_NAME}}.asyncImport.loadcss('myLib.css', function() {
    console.log('loadcss-loaded');
});

// loadcss-loaded
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## loadjs()
JS 파일을 동적으로 로드 합니다.

Alias: importJs()

API | 설명
--- | ---
@param {string} | 경로 + JS 파일명
@param {Function} | 콜백함수 (optional)

```js
{{LIB_NAME}}.asyncImport.loadjs('myLib.js');
```
```js
// 콜백 방식
{{LIB_NAME}}.asyncImport.loadjs('myLib.js', function() {
    console.log('loadjs-loaded');
});

// loadjs-loaded
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## load()
CSS, JS 파일을 동적으로 로드 합니다.

Alias: importLoad()

API | 설명
--- | ---
@param {string} | 경로 + CSS or JS 파일명
@param {Function} | 콜백함수 (optional)

```js
// css 로드
{{LIB_NAME}}.asyncImport.load('myLib.css');
```
```js
// js 로드
{{LIB_NAME}}.asyncImport.load('myLib.js');
```

### 1. 체이닝 로드
체이닝 방식을 이용하면 이어서 파일을 로드 할 수 있습니다.

```js
{{LIB_NAME}}.asyncImport.load('myLib.css').load('myLib.js');
```

### 2. 의존성 로드
의존성 방식을 이용하면 순서에 따라 다른 스크립트를 병렬로 로드 할 수 있습니다.

```js
// myDependentLib.js는 myLib.js가 로드되기 전에 로드되지 않음)
{{LIB_NAME}}.asyncImport.load(['myLib.css', 'myLib.js'], 'myDependentLib.js', function() {});
```

### 3. id 선언
파일명 뒤에 `#아이디명` 을 선언하시면 로드된 <script> 엘리먼트에 id가 생성 됩니다.

```js
{{LIB_NAME}}.asyncImport.load('myLib.js#myid', function() {});

// <script src="myLib.js" id="myid"></script>
```

### 4. fallback url 로드
파일 로드 실패 시 대체 파일을 로드 할 수 있습니다.

`js 파일 및 오류 이벤트 호환 브라우저에만 해당`

```js
// myfallback.js 로드 실패시 myLib.js 로드를 시도한다. (id 명시 필수)
{{LIB_NAME}}.asyncImport.load('myLib.js#=/myfallback.js#myid', function() {});
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## addAliases()
일부 별칭 네이밍을 사용하여 로드할 수 있습니다.

API | 설명
--- | ---
@param {Object} | 객체
@param {String} | Object.kye: 별칭이름
@param {String or Array} | Object.value: 경로 + CSS or JS 파일

```js
{{LIB_NAME}}.asyncImport
    .addAliases({
        jQuery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js#jqueryId', // id #jqueryId 생성
        ui: [
            'jQuery', // 별칭으로 선언한 네이밍 사용
            'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css'
        ]
    })
    .load('ui', function() {});
```
