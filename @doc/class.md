###### j core module

# {{LIB_NAME}}.Class
> 클래스 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [set()](#set)
- [get()](#get)

<br>

## Class()
클래스를 생성 합니다. 생성자함수는 생략 가능하며, 인스턴스 클래스 생성 시 기본적으로 자동 호출 합니다.

API | 설명
--- | ---
@param {Object} | 클래스객체

```js
var Parent = {{LIB_NAME}}.Class({
    _constructor: function() { // 생성자 함수 (optional)
        console.log('Parent init');
    }
});

var parent = new Parent(); // 인스턴스 클래스 생성

// Parent init
```

<br>

### 상속 패턴
상속 옵션을 사용하면 부모클래스의 프로퍼티 및 메서드 기능을 상속받아 자식 클래스에서도 사용 할 수 있습니다. 동일한 프로퍼티나 메서드명일 시 오버라이딩 합니다.

옵션 | 설명
--- | ---
$extend {Object} | 부모 클래스명

```js
var Parent = {{LIB_NAME}}.Class({
    say: function(job) {
        console.log('Parent say');
    },
    run: function() {
        console.log('Parent run');
    }
});

var Child = {{LIB_NAME}}.Class({
    $extend: Parent, // 부모 클래스 상속,
    run: function() { // 부모 클래스의 메서드명과 동일한 경우 오버라이딩함
        console.log('Child run');
    }
});

var child = new Child();

child.say(); // 부모메서드 호출
// 'Person say'

child.run(); // 자식메서드 호출
// 'Child run'
```

### 상속 패턴 > 부모클래스의 동일 메서드 호출
상속 받은 자식 클래스에서 `this.supr()` 호출하면 동일한 부모 클래스의 메서드를 사용 할 수 있습니다.

```js
var Parent = {{LIB_NAME}}.Class({
    say: function(job) {
        console.log('Parent say');
    },
    run: function() {
        console.log('Parent run');
    }
});

var Child = {{LIB_NAME}}.Class({
    $extend: Parent,
    run: function() {
        this.supr(); // 부모메서드의 run 메서드가 호출됨
        console.log('Child run');
    }
});

var child = new Child();

child.run();

// 'Parent run'
// 'Child run'
```


### 상속 패턴 > 부모클래스의 다른 메서드 호출
상속 받은 자식 클래스에서 `this.suprMethod({메서드명})` 호출하면 부모 클래스의 특정 메서드를 사용 할 수 있습니다.

```js
var Parent = {{LIB_NAME}}.Class({
    say: function(job) {
        console.log('Parent say');
    },
    run: function() {
        console.log('Parent run');
    }
});

var Child = {{LIB_NAME}}.Class({
    $extend: Parent,
    run: function() {
        this.suprMethod('say'); // 부모메서드의 say 메서드가 호출됨
        console.log('Child run');
    }
});

var child = new Child();

child.run();

// 'Parent say'
// 'Child run'
```

<br>

### 믹스인 패턴
여러 다중 클래스를 mixins방식으로 병합 합니다. 여러 클래스 기능 확장 시 유용합니다.

옵션 | 설명
--- | ---
$mixins {Array} | 부모 클래스명

```js
var A = {{LIB_NAME}}.Class({
    funcA: function() {
        console.log('funcA');
    }
});

var B = {{LIB_NAME}}.Class({
    funcB: function() {
        console.log('funcB');
    }
});

var Person = {{LIB_NAME}}.Class({
    $mixins: [A, B], // 특정 클래스에서 메소드들을 빌려오고자 할 때 해당 클래스를 지정(다중으로도 가능)
    _constructor: function() {}
});

var person = new Person();

person[0].funcA();
// funcA

person[1].funcB();
// funcB
```

<br>

### 싱글톤 패턴
싱글톤 옵션을 사용하면 인스턴스 클래스 생성없이 바로 메소드 호출이 가능합니다. 반복적으로 재사용으로 사용할 클래스가 아닐경우 사용합니다.

옵션 | 설명
--- | ---
$singleton {Boolean} | 싱글톤 여부 (optional)

```js
var Parent = {{LIB_NAME}}.Class({
    $singleton: true, // 싱글톤 여부
    show: function() {
        console.log('show');
    }
});

Parent.getInstance().show();

// show
```

<br>

### 정적 스태틱 패턴
스태틱 옵션을 사용하면 클래스 인스턴스 생성자 선언 없이 바로 프로퍼티나 메소드 사용이 가능합니다.

옵션 | 설명
--- | ---
$statics {Object} | 정적 프로퍼티 or 정적 메서드

```js
var Parent = {{LIB_NAME}}.Class({
    $statics: {
        live: function() { // new 생성자 없이 Parent.live(); 으로 호출
            console.log('live');
        }
    }
});

Parent.live();

// live
```

<br>

### 멤버 메서드 추가
클래스에 동적으로 프로퍼티나 메서드 추가 시 `members()` 함수를 사용하면 추가 할 수 있습니다.

```js
var Person = {{LIB_NAME}}.Class({
    _constructor: function() {}
});

Person.members({
    newFunc: function() {
        console.log('newFunc');
    }
});

var person = new Person();

person.newFunc();

// newFunc'
```

[▲ 확장기능 목록 이동](#확장기능)
