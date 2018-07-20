###### Core > dependency

# {{LIB_NAME}}.dependency
> 의존성 모듈 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [dependency()](#dependency)

<br>

## dependency()
의존성 모듈 패턴을 추가하고 사용 합니다.

```js
// 모듈 추가 패턴
{{LIB_NAME}}.dependency.module.모듈명 = function(app) {
    app.모듈이름 = function() {};
});
```
```js
// 모듈 사용 패턴
{{LIB_NAME}}.dependency(['모듈명, ...'], function(Module) {
    Module.모듈이름();
});
```

### 모듈 추가

`Alias: modules.module`

```js
// device 모듈 추가
{{LIB_NAME}}.dependency.module.device = function(app) {
    app.deviceChk = function() {
        console.log('deviceChk');
    };

    app.isMobile = {{LIB_NAME}}.Class({
        _constructor: function() {
            console.log('isMobile');    
        }
    });
};

// os 모듈 추가
{{LIB_NAME}}.dependency.module.os = function(app) {
    app.isFlatForm = function(viewType, callback) {
        console.log('isFlatForm');
    };
};
```

### 추가된 모듈 사용

`Alias: modules()`

```js
// 의존성 모듈 선언을 생략 시 전체 모듈 사용
{{LIB_NAME}}.dependency(function(Module) {});
```
```js
// 의존성 모듈 '*' 전체선택자 사용 시 전체 모듈 사용
{{LIB_NAME}}.dependency(['*'], function(Module) {});
```
```js
// 추가된 의존성 모듈 선언시 개별적 모듈 사용
{{LIB_NAME}}.dependency(['device', 'os'], function(Module) {
    console.log(Module); // {device, os} 추가한 모듈 객체가 인자로 들어온다.
    Module.deviceChk(); // 추가한 모듈의 메소드, 프로퍼티 사용
});
```

[▲ 기본기능 목록 이동](#기본기능)