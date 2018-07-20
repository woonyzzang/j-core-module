###### Core > namespace

# {{LIB_NAME}}.namespace
> 네임스페이스 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [namespace()](#namespace)

<br>

## namespace()
네임스페이스 공간을 생성하고 객체를 설정하며 `.`을 구분자로 하여 하위 네임스페이스가 생성 됩니다.

`Alias: ns()`

API | 설명
--- | ---
@param {String} | 네임스페이스명
@param {Object or Function} | 지정된 네임스페이스에 등록할 객체, 함수 등
@return {Object} | 생성된 새로운 네임스페이스

```js
{{LIB_NAME}}.namespace('app.ui.Module', {});

// var app = {
//     ui: {
//         Module: {}
//     }
// };
```

[▲ 기본기능 목록 이동](#기본기능)
