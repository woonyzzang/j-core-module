###### j core module

# {{LIB_NAME}}.env
> 환경변수 관련 코어 확장 기능을 사용할 수 있습니다.

## 확장기능

- [set()](#set)
- [get()](#get)

<br>

## set()
환경변수의 설정값을 지정합니다.

API | 설명
--- | ---
@param {string} | 설정명 (`.`를 구분값으로 단계를 내려가서 설정 할 수 있다.)
@param {..any} | 설정값
@return {..any} | 설정값

```js
{{LIB_NAME}}.Env.set('siteTitle', 'Hello World!');
```

[▲ 확장기능 목록 이동](#확장기능)

<br>

## get()
환경변수의 설정값을 가져옵니다.

API | 설명
--- | ---
@param {string} | 설정명 (`.`를 구분값으로 단계별로 값을 가져올 수 있다.)
@param {...any} | 설정된 값이 없을 경우 사용할 기본값
@return {...any} | 설정값

```js
{{LIB_NAME}}.Env.get('siteTitle');

// 'Hello World!'
```

[▲ 확장기능 목록 이동](#확장기능)
