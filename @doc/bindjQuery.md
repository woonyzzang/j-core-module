###### Core > bindjQuery

# {{LIB_NAME}}.bindjQuery
> jQuery 바인딩 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [bindjQuery()](#bindjquery)

<br>

## bindjQuery()
작성된 클래스를 jQuery의 플러그인으로 사용할 수 있도록 바인딩시켜 주는 함수 입니다.

`jQuery를 로드 해야 사용 가능`

API | 설명
--- | ---
@param {Object} | 클래스
@param {string} | 플러그인명

```js
var Highlight = {{LIB_NAME}}.Class({
    _constructor: function(selecter, options) { // 생성자의 형식을 반드시 준수 (첫번째 인수: 대상 엘리먼트, 두번째 인수: 옵션값들)
        var settings = $.extend({
            color: 'red',
            backgroundColor: 'yellow'
        }, options);

        this.render(selecter, settings);
    },
    render: function(selecter, settings) {
        $(selecter).css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });
    }
});

{{LIB_NAME}}.bindjQuery(Highlight, 'highlight'); // jQuery 바인딩 선언
$('body').highlight({color: 'blue', backgroundColor: 'green'}); // jQuery 바인딩 사용
```

[▲ 기본기능 목록 이동](#기본기능)