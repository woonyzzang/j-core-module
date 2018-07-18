import {Core} from '../Core/core';

/**
 * prototype 을 이용한 클래스 생성
 * @namespace
 * @name Core.Class
 */
const addonClass = () => {
    Core.define('Class', function() {
        const F = Core.emptyFn,
            ignoreNames = ['superclass', 'members', 'statics', 'hooks'];

        function array_indexOf(arr, value) {
            if (Array.prototype.indexOf) {
                return Array.prototype.indexOf.call(arr, value);
            } else {
                for (let i = -1, item; item = arr[++i];) {
                    if (item === value) { return i; }
                }

                return -1;
            }
        }

        // 부모클래스의 함수에 접근할 수 있도록 .supr 속성에 부모함수를 래핑하여 설정
        function wrap(k, fn, supr) {
            return function() {
                let tmp = this.supr,
                    ret;

                this.supr = supr.prototype[k];
                ret = null;

                try {
                    ret = fn.apply(this, arguments);
                } finally {
                    this.supr = tmp;
                }

                return ret;
            };
        }

        // 속성 중에 부모클래스에 똑같은 이름의 함수가 있을 경우 래핑처리
        function inherits(what, o, supr) {
            Core.each(o, function(k, v) {
                if (o.hasOwnProperty(k)) {
                    what[k] = Core.is(v, 'function') && (Core.is(supr.prototype[k], 'function'))? wrap(k, v, supr) : v;
                }
            });
        }

        // 클래스 정의
        function classExtend(attr, c) {
            let supr = (c)? (attr.$extend || Object) : this,
                statics,
                mixins,
                singleton,
                instance,
                hooks;

            if (Core.is(attr, 'function')) { attr = attr(); }

            singleton = attr.$singleton || false;
            statics = attr.$statics || false;
            mixins = attr.$mixins || false;
            hooks = attr.$hooks || false;

            !attr._constructor && (attr._constructor = supr.prototype._constructor || function () {});

            // 생성자 몸체
            function constructor() {
                if (singleton && instance) {
                    return instance;
                } else {
                    instance = this;
                }

                const args = Array.prototype.slice.call(arguments),
                    _this = this,
                    ctr = _this.constructor;

                if (_this._constructor) {
                    _this._constructor.apply(_this, args);
                } else {
                    supr.prototype._constructor && supr.prototype._constructor.apply(_this, args);
                }

                if (ctr.hooks) {
                    // 페이지상에서 한번만 실행
                    if (!ctr.hooks.inited) {
                        ctr.hooks.init && Core.each(ctr.hooks.init, function(fn) {
                            fn.call(_this);
                        });

                        ctr.hooks.inited = true;
                    }

                    // 생성때마다 실행
                    ctr.hooks.create && Core.each(ctr.hooks.create, function(fn) {
                        fn.call(_this);
                    });
                }
            }

            function TypeClass() {
                if (!(this instanceof TypeClass)) { throw new Error('new 연산자로 생성하여 사용하셔야 합니다.') }

                constructor.apply(this, arguments);
            }

            F.prototype = supr.prototype;

            TypeClass.prototype = new F;
            TypeClass.prototype.constructor = TypeClass;

            // 메소드 내에서 부모클래스에 접근할 때 사용
            TypeClass.superclass = supr.prototype;
            TypeClass.extend = classExtend;

            /**
             * @name hooks
             * @description 해당 클래스의 객체가 생성될 때 hook를 등록하는 클래스함수
             * @example
             * var Child = {{LIB_NAME}}.Class({
             *     $hooks: {
             *         init: function() {
             *             console.log('초기화');
             *         },
             *         create: function() {
             *             console.log('객체생성');
             *         }
             *     },
             *     show: function() {
             *         console.log('hello');
             *     }
             * });
             */
            TypeClass.hooks = {init: [], create: []};

            Core.extend(true, TypeClass.hooks, supr.hooks);

            hooks && Core.each(hooks, function(name, fn) {
                switch (name) {
                    case 'init':
                        TypeClass.hooks.init.push(fn);
                    break;
                    case 'create':
                        TypeClass.hooks.create.push(fn);
                    break;
                }
            });

            if (singleton) {
                /**
                 * @name getInstance
                 * @description 싱클톤 클래스의 객체를 반환
                 * @function
                 * @return {Class}
                 * @example
                 * var Child = {{LIB_NAME}}.Class({
                 *    $singleton: true,
                 *    show: function(){
                 *        alert('hello');
                 *    }
                 * });
                 * Child.getInstance().show();
                 * Child.getInstance().show();
                 */
                TypeClass.getInstance = function() {
                    const arg = arguments,
                        len = arg.length;

                    if (!instance) {
                        if (!len) {
                            instance = new TypeClass;
                        } else if (len === 1) {
                            instance = new TypeClass(arg[0]);
                        } else if (len === 2) {
                            instance = new TypeClass(arg[0], arg[1]);
                        } else {
                            instance = new TypeClass(arg[0], arg[1], arg[2]);
                        }
                    }

                    return instance;
                };
            }

            /**
             * @name suprMethod
             * @description 메소드내부에서 부모클레스의 함수를 호출하고자 할 때 사용
             * @return {*} 해당 부모함수의 반환값
             * @example
             * var Parent = {{LIB_NAME}}.Class({
             *     show: function(){
             *         console.log('parent.show');
             *     }
             * });
             * var Child = {{LIB_NAME}}.Class({
             *     $extend: Parent,
             *     show: function() { // override
             *         this.supr(); // Parent#show()가 호출됨
             *         console.log('child.show');
             *     },
             *     display: function(){
             *         this.suprMethod('show'); // 특정 부모함수를 명명해서 호출할 수 도 있음
             *     }
             * });
             * var child = new Child();
             * child.show(); // console.log('parent.show'); console.log('child.show');
             * child.display(); // console.log('parent.show');
             */
            TypeClass.prototype.suprMethod = function(name) {
                const args = Array.prototype.slice.call(arguments, 1);

                return supr.prototype[name].apply(this, args);
            };

            // func의 컨텍스트를 this로 지정
            TypeClass.prototype.proxy = function(fn) {
                const _this = this;

                if (typeof fn === 'string') { fn = _this[fn]; }

                return function() {
                    return fn.apply(_this, arguments);
                };
            };

            /**
			 * @name mixins
			 * @description 여러 클래스를 mixins방식으로 merge
			 * @function
			 * @param {function} o 객체
			 * @example
			 * var A = {{LIB_NAME}}.Class({
			 *		funcA: function() {}
			 * });
			 * var B = {{LIB_NAME}}.Class({
			 *		funcB: function() {}
			 * });
			 * var Person = {{LIB_NAME}}.Class({
			 *     $mixins: [A, B],
			 *		_constructor: function() {}
			 * });
			 *
			 * var person = new Person();
			 * person[0].funcA();
			 * person[1].funcB();
			 */
            TypeClass.mixins = function(o) {
                if (!Core.is(o, 'array')) { o = [o]; } // !o.push

                const _this = this;

                Core.each(o, function(mixObj, index, obj) {
                    if (!mixObj) { return; }

                    Core.each(obj, function(fn, key, value) {
                        if (value.hasOwnProperty(key)) {
                          _this.prototype[key] = new value[key];
                        }
                    });
                });
            };

            mixins && TypeClass.mixins.call(TypeClass, mixins);

            /**
			 * @memberOf common.Class
			 * @name members
			 * @description 클래스에 메소드  추가
			 * @function
			 * @param {function} o 객체
			 * @example
			 * var Person = {{LIB_NAME}}.Class({
			 *		_constructor: function() {}
			 * });
			 *
			 * Person.members({
			 *		newFunc: function() {}
			 * });
			 *
			 * var person = new Person();
			 * person.newFunc();
			 */
            TypeClass.members = function(o) {
                inherits(this.prototype, o, supr);
            };

            attr && TypeClass.members.call(TypeClass, attr);

            /**
			 * @name statics
			 * @description 클래스함수 추가함수
			 * @function
			 * @param {function} o 객체
			 * @example
			 * var Person = {{LIB_NAME}}.Class({
			 *     $statics: { // 클래스 속성 및 함수
			 *         live: function() { // new 생성자 없이 Person.live(); 으로 호출
			 *             console.log('live');
			 *         }
             *     },
			 *		_constructor: function() {}
			 * });
			 *
			 * Person.live();
			 */
            TypeClass.statics = function(o) {
                o = o || {};

                for (let k in o) {
                    if (array_indexOf(ignoreNames, k) < 0) { this[k] = o[k]; }
                }

                return this;
            };

            TypeClass.statics.call(TypeClass, supr);
            statics && TypeClass.statics.call(TypeClass, statics);

            if (hooks || (hooks = TypeClass.prototype.$hooks)) {
                hooks.onClassCreate && hooks.onClassCreate(Class);
            }

            return TypeClass;
        }

        /**
         * @name Class
         * @description 루트클래스 생성
         * @class
         * @example
         * var Person = {{LIB_NAME}}.Class({  // 또는 var Person = scui.Class({ 으로 구현해도 동일하다.
    	 *	    $singleton: true, // 싱글톤 여부
    	 *	    $statics: { // 클래스 속성 및 함수
    	 *		    live: function() {} // Person.live(); 으로 호출
    	 *	    },
    	 *	    $mixins: [Animal, Robot], // 특정 클래스에서 메소드들을 빌려오고자 할 때 해당 클래스를 지정(다중으로도 가능),
    	 *	    _constructor: function(name) {
    	 *		    this.name = name;
    	 *	    },
    	 *	    say: function(job) {
    	 *		    console.log('I\'m Person: ' + job);
    	 *	    },
    	 *	    run: function() {
    	 *		    alert('i\'m running...');
    	 *      }
    	 * });
    	 *
    	 * // Person에서 상속받아 Man클래스를 구현하는 경우
         * var Man = Person.extend({
    	 *     initialize: function(name, age) {
    	 *         this.supr(name);  // Person(부모클래스)의 initialize메소드를 호출 or this.suprMethod('initialize', name);
    	 *         this.age = age;
    	 *     },
    	 *	   // say를 오버라이딩함
    	 *     say: function(job) {
    	 *         this.suprMethod('say', 'programer'); // 부모클래스의 say 메소드 호출 - 첫번째인자는 메소드명, 두번째부터는 해당 메소드로 전달될 인자
    	 *         alert('I\'m Man: ' + job);
    	 *     }
    	 * });
    	 *
         * var man = new Man('kim', 20);
         * man.say('freeman');  // 결과: console.log("I'm Person: programer"); console.log("I'm Man: freeman");
         * man.run(); // 결과: console.log("i'm running...");
         */
        Core.Class = function(attr) {
            return classExtend.apply(this, [attr, true]);
        };
    });
};

export {addonClass};
