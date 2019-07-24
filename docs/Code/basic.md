## Javascript

&emsp;[1. JavaScript 有哪些数据类型](#j1)

&emsp;[2. 怎么判断不同的JS数据类型](#j2)

&emsp;[3. undefined 和 null 有什么区别](#j3)

&emsp;[4. 数组对象有哪些常用方法](#j4)

&emsp;[5. Js 有哪几种创建对象的方式](#j5)

&emsp;[6. 怎么实现对对象的拷贝(浅拷贝与深拷贝)](#j6)

&emsp;[7. 什么是闭包，为什么要用它](#j7)

&emsp;[8. 介绍一下 JavaScript 原型，原型链，它们有何特点](#j8)

&emsp;[9. JavaScript 如何实现继承](#j9)

&emsp;[10. new 操作符具体干了什么](#j10)

&emsp;[11. 同步和异步的区别，怎么异步加载 JavaScript](#j11)

&emsp;[12. 跨域问题的产生，怎么解决它](#j12)

&emsp;[13. 对 this 的理解](#j13)

&emsp;[14. apply()、call()和 bind() 是做什么的，它们有什么区别](#j14)

&emsp;[15. 什么是内存泄漏，哪些操作会造成内存泄漏](#j15)

&emsp;[16. 什么是事件代理，它的原理是什么](#j16)

&emsp;[17. 对AMD和CMD的理解，它们有什么区别](#j17)

&emsp;[18. 对ES6的了解](#j18)

&emsp;[19. 箭头函数有什么特点](#j19)

&emsp;[20. Promise 对象的了解](#j20)

&emsp;[21. async 函数以及 awit 命令](#j21)

&emsp;[22. export 与 export default有什么区别](#j22)

&emsp;[23. 前端性能优化](#j23)

&emsp;[24. 对JS引擎执行机制的理解](#j24)

&emsp;[25. webSocket如何兼容低浏览器？websocket长连接原理是什么?](#j25)

&emsp;[26. web开发中会话跟踪的方法有哪些?](#j26)

&emsp;[27. caller 和callee 的作用？](#j27)

&emsp;[28. call和apply作用和区别。传null有没有影响,Function.call(null)  ，Function.apply(null)？](#j28)

&emsp;[29. 单线程原理的过程？](#j29)

<h5 id='j1'>1. JavaScript 有哪些数据类型</h5>

6种原始数据类型：
- Boolean: 布尔表示一个逻辑实体，可以有两个值：`true` 和 `false`
- Number: 用于表示数字类型
- String: 用于表示文本数据
- Null: `Null` 类型只有一个值： `null`,特指对象的值未设置
- Undefined: 一个没有被赋值的变量会有个默认值 `undefined`
- Symbol: 符号(Symbols)是ECMAScript第6版新定义的。符号类型是唯一的并且是不可修改的

引用类型：`Object`

详见 [JavaScript的数据类型-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

<h5 id='j2'>2. 怎么判断不同的JS数据类型 </h5>

- `typeof`操作符：返回一个字符串，表示未经计算的操作数的类型

> `typeof` 操作符对于简单数据类型，返回其本身的数据类型，函数对象返回 `function` ，其他对象均返回 `Object`

> `null` 返回 `Object`

- instanceof: 用来判断A 是否是 B的实例，表达式为 `A instanceof B`，返回一个`Boolean`类型的值

> `instanceof` **检测的是原型,只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型**

```js
let a = [];
a instanceof Array  // true
a instanceof Object // true
```
> 变量a 的 `__proto__`  直接指向`Array.prototype`，间接指向 `Object.prototype`，所以按照 `instanceof` 的判断规则，a 就是`Object`的实例.针对数组的这个问题，ES5 提供了 `Array.isArray()` 方法 。该方法用以确认某个对象本身是否为 Array 类型

- constructor: 当一个函数被定义时，JS引擎会为其添加`prototype`原型，然后再在 `prototype`上添加一个 `constructor` 属性，并让其指向该函数的引用

> `null`和`undefined`是无效的对象，因此是不会有`constructor`存在的，这两种类型的数据需要通过其他方式来判断

> 函数的`constructor`是不稳定的，这个主要体现在自定义对象上，当开发者重写`prototype`后，原有的`constructor`引用会丢失，`constructor`会默认为 `Object`

```js
function F() {};
var f = new F;
f.constructor == F // true

F.prototype = {a: 1}
var f = new F
f.constructor == F // false 
```
> 在构造函数 `F.prototype` 没有被重写之前，构造函数 `F` 就是新创建的对象 `f` 的数据类型。当 `F.prototype` 被重写之后，原有的 `constructor` 引用丢失, 默认为 Object

> 因此，为了规范开发，在重写对象原型时一般都需要重新给 `constructor` 赋值，以保证对象实例的类型不被篡改

- toString: `Object` 的原型方法，调用该方法，默认返回当前对象的 `[[Class]]` 。这是一个内部属性，其格式为 `[object Xxx]` ，其中 `Xxx` 就是对象的类型

```js
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(11) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(Symbol()); //[object Symbol]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call([]) ; // [object Array]
```

<h5 id='j3'>3. undefined 和 null 有什么区别</h5>

> `null`表示"没有对象"，即该处不应该有值

典型用法：

1. 作为函数的参数，表示该函数的参数不是对象
2. 作为对象原型链的终点

> `undefined`表示"缺少值"，就是此处应该有一个值，但是还没有定义

典型用法：

1. 变量被声明了，但没有赋值时，就等于`undefined`
2. 调用函数时，应该提供的参数没有提供，该参数等于`undefined`
3. 对象没有赋值的属性，该属性的值为`undefined`
4. 函数没有返回值时，默认返回`undefined`

详见： [undefined和null的区别-阮一峰](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

<h5 id='j4'>4. 数组对象有哪些常用方法</h5>

> 修改器方法：

- pop(): 删除数组的最后一个元素，并返回这个元素
- push()：在数组的末尾增加一个或多个元素，并返回数组的新长度
- reverse(): 颠倒数组中元素的排列顺序
- shift(): 删除数组的第一个元素，并返回这个元素
- unshift(): 在数组的开头增加一个或多个元素，并返回数组的新长度
- sort(): 对数组元素进行排序，并返回当前数组
- splice(): 在任意的位置给数组添加或删除任意个元素

> 访问方法：

- concat(): 返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组
- join(): 连接所有数组元素组成一个字符串
- slice(): 抽取当前数组中的一段元素组合成一个新数组
- indeOf(): 返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1
- lastIndexOf(): 返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1

> 迭代方法：

- forEach(): 为数组中的每个元素执行一次回调函数,最终返回 `undefined`
- every(): 如果数组中的每个元素都满足测试函数，则返回 `true`，否则返回 false
- some(): 如果数组中至少有一个元素满足测试函数，则返回 `true`，否则返回 false
- filter(): 将所有在过滤函数中返回 `true` 的数组元素放进一个新数组中并返回
- map(): 返回一个由回调函数的返回值组成的新数组

更多方法请参考 MDN [传送门](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)


<h5 id='j5'>5. Js 有哪几种创建对象的方式</h5>

> 对象字面量
```js
var obj = {}
```
> Object 构造函数
```js
var obj = new Object()
```

> 工厂模式
```js
function Person(name, age) {
    var o = new Object()
    o.name = name;
    o.age = age;
    o.say = function() {
        console.log(name)
    }
    return o
}
```
缺点： 每次通过`Person`创建对象的时候，所有的`say`方法都是一样的，但是却存储了多次，浪费资源

> 构造函数模式
```js
function Person(name, age) {
    this.name = name
    this.age = age
    this.say = function() {
        console.log(name)
    }
}
var person = new Person('hello', 18)
```
构造函数模式隐试的在最后返回`return this` 所以在缺少`new`的情况下，会将属性和方法添加给全局对象，浏览器端就会添加给`window`对象,可以根据`return this` 的特性调用`call`或者`apply`指定`this`

> 原型模式
```js
function Person() {}
Person.prototype.name = 'hanmeimei';
Person.prototype.say = function() {
  alert(this.name);
}
Person.prototype.friends = ['lilei'];
var person = new Person();
```
实现了方法与属性的共享，可以动态添加对象的属性和方法。但是没有办法创建实例自己的属性和方法，也没有办法传递参数

> 构造函数和原型组合
```js
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.say = function() {
    console.log(this.name)
}
var person = new Person('hello')
```

还有好几种模式，感兴趣的小伙伴可以参考 **红宝书**，你们肯定知道的了！

<h5 id='j6'>6. 怎么实现对对象的拷贝(浅拷贝与深拷贝)</h5>

> 浅拷贝

- 拷贝原对象引用
- 可以使用`Array.prototype.slice()`也可以完成对一个数组或者对象的浅拷贝
- `Object.assign()`方法

> 深拷贝

- 最常用的方式就是 `JSON.parse(JSON.stringify(目标对象)`，缺点就是只能拷贝符合`JSON`数据标准类型的对象

<h5 id='j7'>7. 什么是闭包，为什么要用它</h5>

> 简单来说，闭包就是能够读取其他函数内部变量的函数
```js
function Person() {
    var name = 'hello'
    function say () {
        console.log(name)
    }
    return say()
}
Person() // hello
```
> 由于 JavaScript 特殊的作用域，函数外部无法直接读取内部的变量，内部可以直接读取外部的变量，从而就产生了闭包的概念

用途：
> 最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中

注意点：
> 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露

<h5 id='j8'>8. 介绍一下 JavaScript 原型，原型链，它们有何特点</h5>

首先明确一点，**JavaScript是基于原型的**

> 每个构造函数(constructor)都有一个原型对象(prototype),原型对象都包含一个指向构造函数的指针,而实例(instance)都包含一个指向原型对象的内部指针.

![image](https://raw.githubusercontent.com/ltadpoles/web-document/master/images/%E5%8E%9F%E5%9E%8B%E5%9B%BE%E7%A4%BA.jpg)

图解：
- 每一个构造函数都拥有一个`prototype`属性，这个属性指向一个对象，也就是原型对象
- 原型对象默认拥有一个`constructor`属性，指向指向它的那个构造函数
- 每个对象都拥有一个隐藏的属性`[[prototype]]`，指向它的原型对象

那么什么是原型链：

> `JavaScript`中所有的对象都是由它的原型对象继承而来。而原型对象自身也是一个对象，它也有自己的原型对象，这样层层上溯，就形成了一个类似链表的结构，这就是原型链

> 所有原型链的终点都是`Object`函数的`prototype`属性。`Objec.prototype`指向的原型对象同样拥有原型，不过它的原型是`null`，而`null`则没有原型

![image](https://raw.githubusercontent.com/ltadpoles/web-document/master/images/%E5%8E%9F%E5%9E%8B%E9%93%BE.png)

<h5 id='j9'>9. JavaScript 如何实现继承</h5>

- 原型链继承

```js
function Animal() {}
Animal.prototype.name = 'cat'
Animal.prototype.age = 1
Animal.prototype.say = function() {console.log('hello')}

var cat = new Animal()

cat.name  // cat
cat.age  // 1
cat.say() // hello
```
> 最简单的继承实现方式，但是也有其缺点
1. 来自原型对象的所有属性被所有实例共享
2. 创建子类实例时，无法向父类构造函数传参
3. 要想为子类新增属性和方法，必须要在`new`语句之后执行，不能放到构造器中

- 构造继承

```js
function Animal() {
    this.species = "动物"
}
function Cat(name, age) {
    Animal.call(this)
    this.name = name 
    this.age = age
}

var cat = new Cat('豆豆', 2)

cat.name  // 豆豆
cat.age // 2
cat.species // 动物
```
> 使用call或apply方法，将父对象的构造函数绑定在子对象上.

- 组合继承

```js
function Animal() {
    this.species = "动物"
}

function Cat(name){
  Animal.call(this)
  this.name = name
}

Cat.prototype = new Animal() // 重写原型
Cat.prototype.constructor = Cat

```
> 如果没有`Cat.prototype = new Animal()`这一行，`Cat.prototype.constructor`是指向`Cat`的；加了这一行以后，`Cat.prototype.constructor`指向`Animal`.这显然会导致继承链的紊乱（cat1明明是用构造函数Cat生成的），因此我们必须手动纠正，将`Cat.prototype`对象的`constructor`值改为`Cat`

- `extends` 继承
ES6新增继承方式，Class 可以通过extends关键字实现继承

```js
class Animal {
    
}

class Cat extends Animal {
    constructor() {
        super();
  }
}
```

> 使用 `extends` 实现继承，必须添加 `super` 关键字定义子类的 `constructor`，这里的`super()` 就相当于 `Animal.prototype.constructor.call(this)`

当然，还有很多种实现继承的方式，这里就不多说了。然后，再推荐一波 **红宝书**

<h5 id='j10'>10. new 操作符具体干了什么</h5>

- 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型
- 属性和方法被加入到 this 引用的对象中
- 新创建的对象由 this 所引用，并且最后隐式的返回 this

<h5 id='j11'>11. 同步和异步的区别，怎么异步加载 JavaScript</h5>

> 同步模式

同步模式，又称阻塞模式。`javascript` 在默认情况下是会阻塞加载的。当前面的 `javascript` 请求没有处理和执行完时，会阻止浏览器的后续处理

> 异步模式

异步加载又叫非阻塞，浏览器在下载执行 `js` 同时，还会继续进行后续页面的处理

> 异步加载 JavaScript

- 动态添加 `script` 标签
- `defer`
- `async`

> `defer`属性和`async`都是属于 `script` 标签上面的属性，两者都能实现 `JavaScript` 的异步加载。不同之处在于：`async` 在异步加载完成的时候就马上开始执行了，`defer` 会等到 `html` 加载完毕之后再执行

<h5 id='j12'>12. 跨域问题的产生，怎么解决它</h5>

> 由于浏览器的 [同源策略](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)，在出现 域名、端口、协议有一种不一致时，就会出现跨域，属于浏览器的一种安全限制。

解决跨域问题有很多种方式，常用的就是以下几种：

- `jsonp` 跨域：动态创建`script`，再请求一个带参网址实现跨域通信.缺点就是只能实现 `get` 一种请求
- `document.domain + iframe`跨域：两个页面都通过js强制设置`document.domain`为基础主域，就实现了同域.但是仅限主域相同，子域不同的跨域应用场景
- 跨域资源共享（CORS）：只服务端设置`Access-Control-Allow-Origin`即可，前端无须设置，若要带`cookie`请求：前后端都需要设置
- `nginx`反向代理接口跨域：同源策略是浏览器的安全策略，不是`HTTP`协议的一部分。服务器端调用`HTTP`接口只是使用`HTTP`协议，不会执行JS脚本，不需要同源策略，也就不存在跨越问题
- `WebSocket`协议跨域

<h5 id='j13'>13. 对 this 的理解</h5>

在 `JavaScript` 中，研究 `this` 一般都是 `this` 的指向问题，核心就是 **`this` 永远指向最终调用它的那个对象**，除非改变 `this` 指向或者箭头函数那种特殊情况

```js
function test() {
    console.log(this);
}

test() // window

var obj = {
  foo: function () { console.log(this.bar) },
  bar: 1
};

var foo = obj.foo;
var bar = 2;

obj.foo() // 1
foo() // 2

// 函数调用的环境不同，所得到的结果也是不一样的
```

<h5 id='j14'>14. apply()、call()和 bind() 是做什么的，它们有什么区别</h5>

相同点：三者都可以**改变 this 的指向**

不同点： 

- apply 方法传入两个参数：一个是作为函数上下文的对象，另外一个是作为函数参数所组成的数组

```js

var obj = {
    name : 'sss'
}

function func(firstName, lastName){
    console.log(firstName + ' ' + this.name + ' ' + lastName);
}

func.apply(obj, ['A', 'B']);    // A sss B

```
- `call` 方法第一个参数也是作为函数上下文的对象，但是后面传入的是一个参数列表，而不是单个数组

```js
var obj = {
    name: 'sss'
}

function func(firstName, lastName) {
    console.log(firstName + ' ' + this.name + ' ' + lastName);
}

func.call(obj, 'C', 'D');       // C sss D
```

- `bind` 接受的参数有两部分，第一个参数是是作为函数上下文的对象，第二部分参数是个列表，可以接受多个参数

```js
var obj = {
    name: 'sss'
}

function func() {
    console.log(this.name);
}

var func1 = func.bind(null, 'xixi');
func1();
```

> `apply`、`call` 方法都会使函数立即执行，因此它们也可以用来调用函数

> `bind` 方法不会立即执行，而是返回一个改变了上下文 `this` 后的函数。而原函数 `func` 中的 `this` 并没有被改变，依旧指向全局对象 `window`

> `bind` 在传递参数的时候会将自己带过去的参数排在原函数参数之前

```js
function func(a, b, c) {
    console.log(a, b, c);
}
var func1 = func.bind(this, 'xixi');
func1(1,2) // xixi 1 2
```

<h5 id='j15'>15. 什么是内存泄漏，哪些操作会造成内存泄漏</h5>

> 内存泄漏：是指一块被分配的内存既不能使用，又不能回收，直到浏览器进程结束

可能造成内存泄漏的操作：
- 意外的全局变量
- 闭包
- 循环引用
- 被遗忘的定时器或者回调函数

你可能还需要知道 [垃圾回收机制](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html) 此外，高程上面对垃圾回收机制的介绍也很全面，有兴趣的小伙伴可以看看

<h5 id='j16'>16. 什么是事件代理，它的原理是什么</h5>

> 事件代理：通俗来说就是将元素的事件委托给它的父级或者更外级元素处理

> 原理：利用事件冒泡机制实现的

> 优点：只需要将同类元素的事件委托给父级或者更外级的元素，不需要给所有元素都绑定事件，减少内存空间占用，提升性能; 动态新增的元素无需重新绑定事件

<h5 id='j17'>17. 对AMD和CMD的理解，它们有什么区别</h5>

> `AMD`和`CMD`都是为了解决浏览器端模块化问题而产生的，`AMD`规范对应的库函数有 `Require.js`，`CMD`规范是在国内发展起来的，对应的库函数有`Sea.js`

**AMD和CMD最大的区别是对依赖模块的执行时机处理不同**

> 1、AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块 

> 2、CMD推崇就近依赖，只有在用到某个模块的时候再去require

参考：[AMD-中文版](https://github.com/amdjs/amdjs-api/wiki/AMD-%28%E4%B8%AD%E6%96%87%E7%89%88%29)   [CMD-规范](https://github.com/seajs/seajs/issues/242)

<h5 id='j18'>18. 对ES6的了解</h5>

> ECMAScript 6.0 是 JavaScript 语言的下一代标准

新增的特性：

- 声明变量的方式 `let`  `const`
- 变量解构赋值
- 字符串新增方法 `includes()`  `startsWith()`  `endsWith()` 等
- 数组新增方法 `Array.from()`  `Array.of()`  `entries()`  `keys()`      `values()` 等
- 对象简洁写法以及新增方法 `Object.is()`  `Object.assign()` `entries()` `keys()`  `values()`等
- 箭头函数、`rest` 参数、函数参数默认值等
- 新的数据结构： `Set` 和 `Map`
- `Proxy`
- `Promise`对象
- `async`函数 `await`命令
- `Class`类
- `Module` 体系 模块的加载和输出方式

了解更多，参考 [ES6入门-阮一峰](http://es6.ruanyifeng.com/#README)

<h5 id='j19'>19. 箭头函数有什么特点</h5>

> ES6 允许使用“箭头”（=>）定义函数

```js
var f = v => v;

// 等同于
var f = function (v) {
  return v;
}
```

注意点：

- 函数体内的 `this` 对象，就是定义时所在的对象，而不是使用时所在的对象
- 不可以当作构造函数，也就是说，不可以使用 `new` 命令，否则会抛出一个错误
- 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替

<h5 id='j20'>20. Promise 对象的了解</h5>

> Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大.所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果 --ES6入门-阮一峰

> `Promise` 对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态

特点： 

- 对象的状态不受外界影响
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果
- `Promise` 新建后就会立即执行

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
})
```

> Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
})
```

> `then` 方法返回的是一个新的Promise实例

> `Promise.prototype.catch` 用于指定发生错误时的回调函数,具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获

```js
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```

> `catch` 方法返回的还是一个 `Promise` 对象，因此后面还可以接着调用 `then` 方法

出去上述方法，Promise还有其他用法，小伙伴们可以在这里查看大佬写的文章 [ES6入门-阮一峰](http://es6.ruanyifeng.com/#README)

<h5 id='j21'>21. async 函数以及 awit 命令</h5>

> `async` 函数是什么？一句话，它就是 `Generator` 函数的语法糖

了解Generator函数的小伙伴，这里 [传送门](http://es6.ruanyifeng.com/#docs/generator)

`async` 特点：

> `async` 函数返回一个 `Promise` 对象，可以使用 `then ` 方法添加回调函数。当函数执行的时候，一旦遇到 `await` 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句

> `async` 函数内部 `return` 语句返回的值，会成为 `then` 方法回调函数的参数

> `async` 函数返回的 `Promise` 对象，必须等到内部所有 `await` 命令后面的 `Promise` 对象执行完，才会发生状态改变，除非遇到 `return` 语句或者抛出错误

> `async` 函数内部抛出错误，会导致返回的 `Promise` 对象变为 `reject` 状态。抛出的错误对象会被 `catch` 方法回调函数接收到

```js
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

> `await` 命令: `await` 命令后面是一个 `Promise` 对象，返回该对象的结果。如果不是 `Promise` 对象，就直接返回对应的值

```js
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
```

> `await` 命令后面是一个`thenable`对象（即定义then方法的对象），那么`await`会将其等同于 `Promise` 对象.也就是说就算一个对象不是`Promise`对象，但是只要它有`then`这个方法， `await` 也会将它等同于`Promise`对象

使用注意点：

- `await` 命令后面的 `Promise` 对象，运行结果可能是 `rejected`，所以最好把 `await` 命令放在 `try...catch` 代码块中
- 多个 `await` 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发
- `await` 命令只能用在 `async` 函数之中，如果用在普通函数，就会报错

了解更多，请点击 [这里](http://es6.ruanyifeng.com/#docs/async)

<h5 id='j22'>22. export 与 export default有什么区别</h5>

> `export` 与 `export default` 均可用于导出常量、函数、文件、模块等

> 在一个文件或模块中，`export`、`import` 可以有多个，`export default` 仅有一个

> 通过 `export` 方式导出，在导入时要加 `{ }`，`export default` 则不需要

> 使用 `export default`命令，为模块指定默认输出，这样就不需要知道所要加载模块的变量名; `export` 加载的时候需要知道加载模块的变量名

> `export default` 命令的本质是将后面的值，赋给 `default` 变量，所以可以直接将一个值写在 `export default` 之后

<h5 id='j23'>23. 前端性能优化</h5>

参见 [雅虎14条前端性能优化](https://blog.csdn.net/qfkfw/article/details/7272961)

<h5 id='j24'>24. 对JS引擎执行机制的理解</h5>

首选明确两点：

> `JavaScript` 是单线程语言

> `JavaScript` 的 `Event Loop` 是 `JS` 的执行机制, 也就是事件循环

```js
console.log(1)
    
setTimeout(function(){
    console.log(2)
},0)

console.log(3)

// 1 3 2
```
> `JavaScript` 将任务分为同步任务和异步任务，执行机制就是先执行同步任务，将同步任务加入到主线程，遇到异步任务就先加入到 `event table` ，当所有的同步任务执行完毕，如果有可执行的异步任务，再将其加入到主线程中执行

视频详解，移步 [这里](https://vimeo.com/96425312)

```js
setTimeout(function(){console.log(1);},0);
new Promise(function(resolve){
     console.log(2);
     for(var i = 0; i < 10000; i++){
         i == 99 && resolve();
     }
 }).then(function(){
     console.log(3)
 });
 
 console.log(4);
 
 // 2 4 3 1
```

在异步任务中，定时器也属于特殊的存在。有人将其称之为 宏任务、微任务，定时器就属于宏任务的范畴。

参考 [JS引擎的执行机制](https://segmentfault.com/a/1190000012806637)

<h5 id='j25'>25、webSocket如何兼容低浏览器？websocket长连接原理是什么?</h5>

> webSocket如何兼容低浏览器?

* Adobe Flash Socket  
* ActiveX HTMLFile (IE)  
* 基于 multipart 编码发送 XHR  
* 基于长轮询的 XHR  

> websocket长连接原理是什么?

含义:Websocket是一个持久化的协议，相对于HTTP这种非持久的协议来说。 

原理:类似长轮循长连接 ; 发送一次请求 ; 源源不断的得到信息

<h5 id='j26'>26、web开发中会话跟踪的方法有哪些?</h5>

  * cookie  
  * session  
  * url重写  
  * 隐藏input  
  * ip地址  

<h5 id='j27'>27、caller 和callee的作用?</h5>
> caller是返回一个对函数的引用，该函数调用了当前函数；  
callee 是返回正在被执行的function函数，也就是所指定的function对象的正文  
如果一对兔子每月生一对兔子；一对新生兔，从第二个月起就开始生兔子；假定每对兔子都是一雌一雄，试问一对兔子，第n个月能繁殖成多少对兔子？（使用callee完成） 
```js
   let result=[];
   function fn(n){//斐波那契数列
      if(n===1||n===2){
        return 1
      }else{
        return result[n]?result[n]:arguments.callee(n-1)+arguments.callee(n-2);
      }
   }
```

<h5 id="j28">28、call 和apply 作用和区别。传null有没有影响,Function.call(null)  ，Function.apply(null) ？</h5>

> apply 和call 都能继承另外一个对象的方法和属性； 

> Apply巧妙之处：可以将一个数组默认的转换为一个参数列表[param1,param2,param3] (apply会将一个数组装换为一个 参数接一个参数的传递给方法)

> Call巧妙之处:1、直接用A 对象方法来替换B对象  2、直接用B 对象来执行A对象的方法 3、可以用 call 来实现继承 

> 使用apply的情况：在给对象参数的情况下,如果参数的形式是数组的时候,比如apply 示例里面传递了参数arguments,这个参数是数组类型。

> 使用call的情况： 如果我的Person的参数列表是这样的(age,name),而Student的参数列表是(name,age,grade),这样就可以用call来实现了,也就是直接指定参数列表对应值的位置(Person.call(this,age,name,grade));

> 区别在于 call 的第二个参数可以是任意类型，而apply的第二个参数必须是数组，也可以是arguments。传null/undefined 返回值为window

![avatar](callee.png)

<h5 id='j29'>29、单线程原理的过程?</h5>

> JS只有一个主线程，主线程执行完执行栈的任务后去检查异步的任务队列，如果异步事件触发，则将其加到主线程的执行栈

> (1)所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

> （2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

> （3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

> （4）主线程不断重复上面的第三步。


## Css

[CSS部分](#css)

&emsp;[1. css盒子模型，box-sizing属性的理解](#c1)

&emsp;[2. 清除浮动，什么时候需要清除浮动，清除浮动都有哪些方法](#c2)

&emsp;[3. 如何让一个不定宽高的盒子水平垂直居中](#c3)

&emsp;[4. px和em和rem的区别](#c4)

&emsp;[5. position的值有哪些](#c5)

&emsp;[6. display:none与visibility：hidden的区别](#c6)

&emsp;[7. CSS中link 和@import的区别](#c7)

&emsp;[8. 什么是响应式设计，响应式设计的基本原理是什么](#c8)

&emsp;[9. 为什么要初始化CSS样式](#c9)

&emsp;[10. CSS3有哪些新特性](#c10)

&emsp;[11. ::before 和 :after中双冒号和单冒号有什么区别？解释一下这2个伪元素的作用](#c11)

&emsp;[12. CSS优化、提高性能的方法有哪些](#c12)

&emsp;[13. 重绘和回流，浏览器是怎样解析CSS的](#c13)

&emsp;[14. flex布局css预处理器](#c14)

&emsp;[15. css预处理器](#c15)

<h3 id='start'>前言</h3>

  每年都会出去面试一圈，积累更多的经验、拓展自己的知识面，整体的感觉是大多数都比较注重基础性的东西，那就从最基本的写起吧↓
### CSS

<h5 id='c1'>1. css盒子模型，box-sizing属性的理解</h5>

css的盒模型由content(内容)、padding(内边距)、border(边框)、margin(外边距)组成。但盒子的大小由content+padding+border这几部分决定

box-sizing是一个CSS3属性，与盒子模型有着密切联系。即决定元素的宽高如何计算，box-sizing有三个属性：
```css
box-sizing: content-box|border-box|inherit:
```
- content-box 使得元素的宽高即为内容区的宽高(默认模式)
- border-box: 计算方式content + padding + border = 本身元素大小，即缩小了content大小
- inherit 指定box-sizing属性的值，应该从父元素继承

<h5 id='c2'>2. 清除浮动，什么时候需要清除浮动，清除浮动都有哪些方法</h5>

浮动的元素是脱离文档标准流的，如果我们不清楚浮动，那么就会造成**父元素高度塌陷**，影响页面布局。

清除浮动的方式：
- 为父元素设置高度
- 为父元素添加`overflow:hidden`
- 伪元素
```css
.fix::after { 
     content:""; 
     display:block; 
     clear:both;
}
```
使用伪元素的好处：不增加冗余的DOM节点，符合语义化

> overflow:hidden可以触发BFC机制。BFC：块级格式化上下文，创建了 BFC的元素就是一个独立的盒子，它规定了内部如何布局，并且与这个独立盒子里的布局不受外部影响，当然它也不会影响到外面的元素，**计算BFC的高度时，浮动元素也参与计算**


<h5 id='c3'>3. 如何让一个不定宽高的盒子水平垂直居中</h5>

> 定位的方式

```css 
.father {
    position: relative;
}
.son {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}
```
> css3属性

```css
.father {
    position: relative;
}
.son {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```
> flex布局

```css
.father {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

<h5 id='c4'>4. px和em和rem的区别</h5>

> `px`: 像素，相对长度单位。像素`px`是相对于显示器屏幕分辨率而言的

> `em`的值并不是固定的，会继承父级元素的字体大小，代表倍数

> `rem`的值并不是固定的，始终是基于根元素 `<html>` 的，也代表倍数

<h5 id='c5'>5. position的值有哪些</h5>

> static： 默认值。没有定位，元素出现在正常的流中

> relative（相对定位）：生成相对定位的元素,相对于其正常（原先本身）位置进行定位

> absolute（绝对定位）：生成绝对定位的元素，相对于static定位以外的第一个父元素进行定位

> fixed（固定定位）：生成绝对定位的元素，相对于浏览器窗口进行定位

<h5 id='c6'>6. display:none与visibility：hidden的区别</h5>

区别 | display:none | visibility：hidden的
---|---|---
是否占据空间 | 不占据任何空间，在文档渲染时，该元素如同不存在（但依然存在文档对象模型树中）| 该元素空间依旧存在
是否渲染 | 会触发reflow（回流），进行渲染 | 只会触发repaint（重绘），因为没有发现位置变化，不进行渲染
是否是继承属性 | 不是继承属性，元素及其子元素都会消失 | 是继承属性，若子元素使用了visibility:visible，则不继承，这个子孙元素又会显现出

<h5 id='c7'>7. CSS中link 和@import的区别</h5>

> link属于XHTML标签，@import完全是CSS提供的一种方式,只能加载CSS

> 加载顺序的差别，当一个页面被加载的时候，link引用的CSS会同时被加载，而@import引用的CSS 会等到页面全部被下载完再被加载

> 兼容性的差别。由于@import是CSS2.1提出的所以老的浏览器不支持，而link标签无此问题

> 当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的

<h5 id='c8'>8. 什么是响应式设计，响应式设计的基本原理是什么</h5>

> 响应式网站设计是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理

<h5 id='c9'>9. 为什么要初始化CSS样式</h5>

> 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对 CSS 初始化往往会出现浏览器之间的页面显示差异

> 初始化样式会对 SEO 有一定的影响

<h5 id='c10'>10. CSS3有哪些新特性</h5>

- 实现圆角`border-radius`，阴影`box-shadow`，边框图片`border-image`
- 对文字加特效`text-shadow`，强制文本换行`word-wrap`，线性渐变`linear-gradient`
- 实现旋转`transform:rotate(90deg)`,缩放`scale(0.85,0.90)`,`translate(0px,-30px)`定位,倾斜`skew(-9deg,0deg)`;
- 增加了更多的CSS选择器、多背景、`rgba()`
- 唯一引入的伪元素是`::selection`；
- 实现媒体查询`@media`，多栏布局`flex`
- 过渡`transition` 动画`animation`

<h5 id='c11'>11. ::before 和 :after中双冒号和单冒号有什么区别？解释一下这2个伪元素的作用</h5>

> 单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。（伪元素由双冒号和伪元素名称组成）,双冒号是在当前规范中引入的，用于区分伪类和伪元素

<h5 id='c12'>12. CSS优化、提高性能的方法有哪些</h5>

- 移除空的css规则（Remove empty rules）
- 正确使用display的属性
- 不滥用浮动、web字体
- 不声明过多的font-size
- 不在选择符中使用ID标识符
- 遵守盒模型规则
- 尽量减少页面重排、重绘
- 抽象提取公共样式，减少代码量

<h5 id='c13'>13. 重绘和回流</h5>

[重绘和回流](https://juejin.im/post/5a9923e9518825558251c96a)

<h5 id='c14'>14. flex布局</h5>

[flex布局教程--阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

<h5 id='c15'>15. css预处理器</h5>

提供了一种css的书写方式，常见的就是 [SAAS文档](http://sass.bootcss.com/docs/sass-reference/) 和 [LESS文档](https://less.bootcss.com/)

## Vue

&emsp;[1. 说一下Vue的双向绑定数据的原理](#k1)

&emsp;[2. 解释单向数据流和双向数据绑定](#k2)

&emsp;[3. Vue如何去除url中的 #](#k3)

&emsp;[4. 对 MVC、MVVM的理解](#k4)

&emsp;[5. 介绍虚拟DOM](#k5)

&emsp;[6. vue生命周期的理解](#k6)

&emsp;[7. 组件通信](#k7)

&emsp;[8. 路由实现](#k8)

&emsp;[9. v-if 和 v-show 区别](#k9)

&emsp;[10. $route和$router的区别](#k10)

&emsp;[11. NextTick 是做什么的](#k11)

&emsp;[12. Vue 组件 data 为什么必须是函数](#k12)

&emsp;[13. 计算属性computed 和事件 methods 有什么区别](#k13)

&emsp;[14. 对比 jQuery ，Vue 有什么优缺点](#k14)

&emsp;[15. Vue 中怎么自定义指令](#k15)

&emsp;[16. Vue 中怎么自定义过滤器](#k16)

&emsp;[17. 对 keep-alive 的了解](#k17)

&emsp;[18. Vue 中 key 的作用](#k18)

&emsp;[19. 你觉得 Vue 的核心是什么](#k19)

&emsp;[20. vue 等单页面应用的优缺点](#k20)

&emsp;[21. vue-router 使用params与query传参有什么区别](#k21)

<h5 id='k1'>1. 说一下Vue的双向绑定数据的原理</h5>

> `vue` 实现数据双向绑定主要是：采用数据劫持结合发布者-订阅者模式的方式，通过 `Object.defineProperty()` 来劫持各个属性的 `setter`，`getter`，在数据变动时发布消息给订阅者，触发相应监听回调

<h5 id='k2'>2. 解释单向数据流和双向数据绑定</h5>

> 单向数据流： 顾名思义，数据流是单向的。数据流动方向可以跟踪，流动单一，追查问题的时候可以更快捷。缺点就是写起来不太方便。要使UI发生变更就必须创建各种 `action` 来维护对应的 `state`

> 双向数据绑定：数据之间是相通的，将数据变更的操作隐藏在框架内部。优点是在表单交互较多的场景下，会简化大量业务无关的代码。缺点就是无法追踪局部状态的变化，增加了出错时 `debug` 的难度

<h5 id='k3'>3. Vue 如何去除url中的 #</h5>

`vue-router` 默认使用 `hash` 模式，所以在路由加载的时候，项目中的 `url` 会自带 `#`。如果不想使用 `#`， 可以使用 `vue-router` 的另一种模式 `history`

```js
new Router({
  mode: 'history',
  routes: [ ]
})
```

> 需要注意的是，当我们启用 `history` 模式的时候，由于我们的项目是一个单页面应用，所以在路由跳转的时候，就会出现访问不到静态资源而出现 `404` 的情况，这时候就需要服务端增加一个覆盖所有情况的候选资源：如果 `URL` 匹配不到任何静态资源，则应该返回同一个 `index.html` 页面

<h5 id='k4'>4. 对 MVC、MVVM的理解</h5>

> MVC

![image](https://raw.githubusercontent.com/ltadpoles/web-document/master/images/mvc.png)

特点：
1. `View` 传送指令到 `Controller`
2. `Controller` 完成业务逻辑后，要求 `Model` 改变状态
3. `Model` 将新的数据发送到 `View`，用户得到反馈

**所有通信都是单向的**

> MVVM

![image](https://raw.githubusercontent.com/ltadpoles/web-document/master/images/mvvm.png)

特点： 
1. 各部分之间的通信，都是双向的
2. 采用双向绑定：`View` 的变动，自动反映在 `ViewModel`，反之亦然

具体请移步 [这里](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

<h5 id='k5'>5. 介绍虚拟DOM</h5>

[参考这里](https://www.jianshu.com/p/616999666920)

<h5 id='k6'>6. vue生命周期的理解</h5>

> vue实例有一个完整的生命周期，生命周期也就是指一个实例从开始创建到销毁的这个过程

- `beforeCreate()` 在实例创建之间执行，数据未加载状态
- `created()` 在实例创建、数据加载后，能初始化数据，`dom`渲染之前执行
- `beforeMount()` 虚拟`dom`已创建完成，在数据渲染前最后一次更改数据
- `mounted()` 页面、数据渲染完成，真实`dom`挂载完成
- `beforeUpadate()` 重新渲染之前触发
- `updated()` 数据已经更改完成，`dom` 也重新 `render` 完成,更改数据会陷入死循环
- `beforeDestory()` 和 `destoryed()` 前者是销毁前执行（实例仍然完全可用），后者则是销毁后执行

<h5 id='k7'>7. 组件通信</h5>

> 父组件向子组件通信

子组件通过 props 属性，绑定父组件数据，实现双方通信

> 子组件向父组件通信

将父组件的事件在子组件中通过 `$emit` 触发

> 非父子组件、兄弟组件之间的数据传递

```js
/*新建一个Vue实例作为中央事件总嫌*/
let event = new Vue();

/*监听事件*/
event.$on('eventName', (val) => {
    //......do something
});

/*触发事件*/
event.$emit('eventName', 'this is a message.')
```

> Vuex 数据管理

<h5 id='k8'>8. vue-router 路由实现</h5>

> 路由就是用来跟后端服务器进行交互的一种方式，通过不同的路径，来请求不同的资源，请求不同的页面是路由的其中一种功能

参考 [这里](https://zhuanlan.zhihu.com/p/37730038)

<h5 id='k9'>9. v-if 和 v-show 区别</h5>

> 使用了 `v-if` 的时候，如果值为 `false` ，那么页面将不会有这个 `html` 标签生成。

> `v-show` 则是不管值为 `true` 还是 `false` ，`html` 元素都会存在，只是 `CSS` 中的 `display` 显示或隐藏

<h5 id='k10'>10. $route和$router的区别</h5>

> `$router` 为 `VueRouter` 实例，想要导航到不同 `URL`，则使用 `$router.push` 方法

> `$route` 为当前 `router` 跳转对象里面可以获取 `name` 、 `path` 、 `query` 、 `params` 等

<h5 id='k11'>11. NextTick 是做什么的</h5>

> `$nextTick` 是在下次 `DOM` 更新循环结束之后执行延迟回调，在修改数据之后使用 `$nextTick`，则可以在回调中获取更新后的 `DOM`

具体可参考官方文档 [深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

<h5 id='k12'>12. Vue 组件 data 为什么必须是函数</h5>

> 因为js本身的特性带来的，如果 `data` 是一个对象，那么由于对象本身属于引用类型，当我们修改其中的一个属性时，会影响到所有Vue实例的数据。如果将 `data` 作为一个函数返回一个对象，那么每一个实例的 `data` 属性都是独立的，不会相互影响了

<h5 id='k13'>13. 计算属性computed 和事件 methods 有什么区别</h5>

我们可以将同一函数定义为一个 `method` 或者一个计算属性。对于最终的结果，两种方式是相同的

不同点：

> computed: 计算属性是基于它们的依赖进行缓存的,只有在它的相关依赖发生改变时才会重新求值

> 对于 `method` ，只要发生重新渲染，`method` 调用总会执行该函数

<h5 id='k14'>14. 对比 jQuery ，Vue 有什么不同</h5>

> jQuery 专注视图层，通过操作 DOM 去实现页面的一些逻辑渲染； Vue 专注于数据层，通过数据的双向绑定，最终表现在 DOM 层面，减少了 DOM 操作

> Vue 使用了组件化思想，使得项目子集职责清晰，提高了开发效率，方便重复利用，便于协同开发

<h5 id='k15'>15. Vue 中怎么自定义指令</h5>

> 全局注册

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

> 局部注册

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

参考 [官方文档-自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)

<h5 id='k16'>16. Vue 中怎么自定义过滤器</h5>

> 可以用全局方法 `Vue.filter()` 注册一个自定义过滤器，它接收两个参数：过滤器 `ID` 和过滤器函数。过滤器函数以值为参数，返回转换后的值

```js
Vue.filter('reverse', function (value) {
  return value.split('').reverse().join('')
})
```

```html
<!-- 'abc' => 'cba' -->
<span v-text="message | reverse"></span>
```

过滤器也同样接受全局注册和局部注册

<h5 id='k17'>17. 对 keep-alive 的了解</h5>

> `keep-alive` 是 `Vue` 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染

```html
<keep-alive>
  <component>
    <!-- 该组件将被缓存！ -->
  </component>
</keep-alive>
```

> 可以使用API提供的props，实现组件的动态缓存

具体参考 [官方API](https://cn.vuejs.org/v2/api/#keep-alive)

<h5 id='k18'>18. Vue 中 key 的作用</h5>

> `key` 的特殊属性主要用在 `Vue` 的虚拟 `DOM` 算法，在新旧 `nodes` 对比时辨识 `VNodes`。如果不使用 `key`，`Vue` 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用 `key`，它会基于 `key` 的变化重新排列元素顺序，并且会移除 `key` 不存在的元素。

> 有相同父元素的子元素必须有独特的 `key`。重复的 `key` 会造成渲染错误

具体参考 [官方API](https://cn.vuejs.org/v2/api/#key)

<h5 id='k19'>19. Vue 的核心是什么</h5>

> 数据驱动 组件系统

<h5 id='k20'>20. vue 等单页面应用的优缺点</h5>

> 优点：

- 良好的交互体验 
- 良好的前后端工作分离模式
- 减轻服务器压力

> 缺点：

- SEO难度较高
- 前进、后退管理 
- 初次加载耗时多 

<h5 id='k21'>21. vue-router 使用params与query传参有什么区别</h5>

`vue-router` 可以通过 `params` 与 `query` 进行传参

```js
// 传递
this.$router.push({path: './xxx', params: {xx:xxx}})
this.$router.push({path: './xxx', query: {xx:xxx}})

// 接收
this.$route.params

this.$route.query
```

- `params` 是路由的一部分,必须要有。`query` 是拼接在 `url` 后面的参数，没有也没关系
- `params` 不设置的时候，刷新页面或者返回参数会丢，`query` 则不会有这个问题

## Webpack


&emsp;[1.对webpack的了解](#w1)

&emsp;[2.webpack，里面的webpack.config.js怎么配置](#w2)

&emsp;[3.webpack本地开发怎么解决跨域的](#w3)

&emsp;[4.如何配置多入口文件](#w4)

&emsp;[5. webpack与grunt、gulp的不同](#w5)

&emsp;[6. 有哪些常见的Loader？他们是解决什么问题的](#w6)

&emsp;[7. 有哪些常见的Plugin？他们是解决什么问题的](#w7)

&emsp;[8. Loader和Plugin的不同](#w8)

&emsp;[9. webpack的构建流程是什么](#w9)

&emsp;[10. 是否写过Loader和Plugin？描述一下编写loader或plugin的思路](#w10)

&emsp;[11. webpack的热更新是如何做到的？说明其原理](#w11)

&emsp;[12. 如何利用webpack来优化前端性能](#w12)

&emsp;[13. 如何提高webpack的构建速度](#w13)

&emsp;[14. 怎么配置单页应用？怎么配置多页应用](#w14)

&emsp;[15. 什么是bundle,什么是chunk，什么是module](#w15)
  

<h5 id='w1'>1. 对webpack的了解</h5>

[官方文档](https://www.webpackjs.com/concepts/)

> 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)，将项目当作一个整体，通过一个给定的的主文件，webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包成一个或多个浏览器可识别的js文件

核心概念：

- 入口(entry)

入口起点`(entry point)`指示 `webpack` 应该使用哪个模块，来作为构建其内部依赖图的开始

可以通过在 `webpack` 配置中配置 `entry` 属性，来指定一个入口起点（或多个入口起点）

```js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```
- 输出(output)

`output` 属性告诉 `webpack` 在哪里输出它所创建的 `bundles `，以及如何命名这些文件，默认值为 `./dist`

- loader

`loader` 让 `webpack` 能够去处理那些非 `JavaScript` 文件（`webpack` 自身只理解 `JavaScript`）

- 插件(plugins)

`loader` 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量

- 模式

通过选择 `development` 或 `production` 之中的一个，来设置 `mode` 参数，你可以启用相应模式下的 `webpack` 内置的优化

```js
module.exports = {
  mode: 'production'
};
```

<h5 id='w2'>2. webpack，里面的webpack.config.js怎么配置</h5>

```js
let webpack = require('webpack');

module.exports = {
    entry:'./entry.js',  //入口文件
    
    output:{
        //node.js中__dirname变量获取当前模块文件所在目录的完整绝对路径
        path:__dirname, //输出位置
        filename:'build.js' //输入文件
    },
    
    module:{  
        // 关于模块的加载相关，我们就定义在module.loaders中
        // 这里通过正则表达式去匹配不同后缀的文件名，然后给它们定义不同的加载器。
        // 比如说给less文件定义串联的三个加载器（！用来定义级联关系）：
        rules:[
          {
            test:/\.css$/,      //支持正则
            loader:'style-loader!css-loader'
          }
        ]
    },
    
    //配置服务
    devServer:{
        hot:true, //启用热模块替换
        inline:true 
        //此模式支持热模块替换：热模块替换的好处是只替换更新的部分,而不是页面重载.
    },
    
    //其他解决方案配置
    resolve:{ 
        extensions:['','.js','.json','.css','.scss']  
    },
    
    //插件
    plugins:[
        new webpack.BannerPlugin('This file is create by baibai')
    ]

}
```

<h5 id='w3'>3. webpack本地开发怎么解决跨域的</h5>

- 下载 webpack-dev-server 插件
- 配置 webpack.config.js 文件

```js
// webpack.config.js

var WebpackDevServer = require("webpack-dev-server");

module.exports = {
    ...
    
    devServer: {
        ...
        port: '8088', //设置端口号
        // 代理设置
        proxy: {
            '/api': {
                target: 'http://localhost:80/index.php', // 目标代理
                pathRewrite: {'^/api' : ''}, // 重写路径
                secure: false, // 是否接受运行在 HTTPS 上
                
            }
        }
    }
}
```

<h5 id='w4'>4. 如何配置多入口文件</h5>

> 配置多个入口文件

```js
entry: {
  home: resolve(__dirname, "src/home/index.js"),
  about: resolve(__dirname, "src/about/index.js")
}
```

<h5 id='w5'>5. webpack与grunt、gulp的不同</h5>

> 三者都是前端构建工具

> `grunt` 和 `gulp` 是基于任务和流的。找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程

> `webpack` 是基于入口的。`webpack` 会自动地递归解析入口所需要加载的所有资源文件，然后用不同的` Loader` 来处理不同的文件，用 `Plugin` 来扩展 `webpack` 功能

> `webpack` 与前者最大的不同就是支持代码分割，模块化（AMD,CommonJ,ES2015），全局分析

[为什么选择webpack](https://webpack.docschina.org/concepts/why-webpack/)

<h5 id='w6'>6. 有哪些常见的Loader？他们是解决什么问题的</h5>

- `css-loader`：加载 `CSS`，支持模块化、压缩、文件导入等特性
- `style-loader`：把 `CSS` 代码注入到 `JavaScript 中`，通过 `DOM` 操作去加载 `CSS`
- `slint-loader`：通过 `SLint` 检查 `JavaScript` 代码
- `babel-loader`：把 `ES6` 转换成 `ES5`
- `file-loader`：把文件输出到一个文件夹中，在代码中通过相对 `URL` 去引用输出的文件
- `url-loader`：和 `file-loader` 类似，但是能在文件很小的情况下以 `base64` 的方式把文件内容注入到代码中去

<h5 id='w7'>7. 有哪些常见的Plugin？他们是解决什么问题的</h5>

- `define-plugin`：定义环境变量
- `commons-chunk-plugin`：提取公共代码

<h5 id='w8'>8. Loader和Plugin的不同</h5>

- loader 加载器

> `Webpack` 将一切文件视为模块，但是 `webpack` 原生是只能解析 `js` 文件. `Loader` 的作用是让 `webpack` 拥有了加载和解析非 `JavaScript` 文件的能力

> 在 `module.rules` 中配置，也就是说他作为模块的解析规则而存在，类型为数组

- Plugin 插件

> 扩展 `webpack` 的功能，让 `webpack` 具有更多的灵活性

> 在 `plugins` 中单独配置。类型为数组，每一项是一个 `plugin` 的实例，参数都通过构造函数传入

<h5 id='w9'>9. webpack的构建流程是什么</h5>

1. 初始化参数：从配置文件和 `Shell` 语句中读取与合并参数，得出最终的参数
2. 开始编译：用上一步得到的参数初始化 `Compiler` 对象，加载所有配置的插件，执行对象的 `run` 方法开始执行编译
3. 确定入口：根据配置中的 `entry` 找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有配置的 `Loader` 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
5. 完成模块编译：在经过第4步使用 `Loader` 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

> 在以上过程中，`Webpack` 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 `Webpack` 提供的 `API` 改变 `Webpack` 的运行结果

<h5 id='w10'>10. 是否写过Loader和Plugin？描述一下编写loader或plugin的思路</h5>

> 编写 `Loader` 时要遵循单一原则，每个 `Loader` 只做一种"转义"工作。 每个 `Loader` 的拿到的是源文件内容`（source）`，可以通过返回值的方式将处理后的内容输出，也可以调用 `this.callback()` 方法，将内容返回给 `webpack` 。 还可以通过 `this.async() `生成一个 `callback` 函数，再用这个 `callback`` 将处理后的内容输出出去

> 相对于 `Loader` 而言，`Plugin` 的编写就灵活了许多。 `webpack` 在运行的生命周期中会广播出许多事件，`Plugin` 可以监听这些事件，在合适的时机通过 `Webpack` 提供的 `API` 改变输出结果

<h5 id='w11'>11. webpack的热更新是如何做到的？说明其原理</h5>

具体可以参考 [这里](https://github.com/Jocs/jocs.github.io/issues/15)

<h5 id='w12'>12. 如何利用webpack来优化前端性能</h5>

- 压缩代码。删除多余的代码、注释、简化代码的写法等等方式
- 利用 `CDN` 加速。在构建过程中，将引用的静态资源路径修改为 `CDN` 上对应的路径
- 删除死代码 `Tree Shaking）`。将代码中永远不会走到的片段删除掉
- 优化图片，对于小图可以使用 `base64` 的方式写入文件中
- 按照路由拆分代码，实现按需加载，提取公共代码
- 给打包出来的文件名添加哈希，实现浏览器缓存文件

<h5 id='w13'>13. 如何提高webpack的构建速度</h5>

参考 [这里](https://gaodaqian.com/webpack4/11%E6%8F%90%E5%8D%87%20webpack%20%E7%9A%84%E6%9E%84%E5%BB%BA%E9%80%9F%E5%BA%A6.html)

<h5 id='w14'>14. 怎么配置单页应用？怎么配置多页应用</h5>

- 单页应用可以理解为 `webpack` 的标准模式，直接在 `entry` 中指定单页应用的入口即可
- 多页应用的话，可以使用 `webpack` 的 `AutoWebPlugin` 来完成简单自动化的构建，但是前提是项目的目录结构必须遵守他预设的规范

<h5 id='w15'>15. 什么是bundle,什么是chunk，什么是module</h5>

> `bundle` 是由 `webpack` 打包出来的文件，`chunk` 是指 `webpack` 在进行模块的依赖分析的时候，代码分割出来的代码块。`module`是开发中的单个模块

## git

### Git checkout 高级用法
 git checkout b b-file： 意思就是本地分支a拉取远程分支b上远程文件b-file的改动
### Git 如何删除远程仓库中提交记录

1、git reset commitId （注：不要带–hard）到上个版本

2、git stash 暂存修改

3、git push --force 强制push，远程的最新的一次commit被删除

4、git stash pop 释放暂存的修改，开始修改代码

5、再决定是否需要的修改git add . -> git commit -m "message" -> git push

### 其他
git branch -m ”本地重命名“ 给本地分支重命名 

git pull 会自动auto-merge，git fetch不会

### git生成公钥步骤 ssh

cd ~/.ssh/

ssh-keygen -t rsa -C “539138836@qq.com"

3次回车

vim ~/.ssh/id_rsa.pub

ls查看文件

id_rsa

id_rsa.pub

执行命令vi id_rsa.pub

shift i

生成可复制的密码


[不得不上的交友网站 Github](https://segmentfault.com/a/1190000009985489)

[Git 分支](https://segmentfault.com/a/1190000008091986)

[GitHub SSH key 配置](https://www.jianshu.com/p/9317a927e844)

[Git 常用命令集](https://segmentfault.com/a/1190000017875714)