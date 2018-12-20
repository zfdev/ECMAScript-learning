import { log } from "util";

//#修饰器
//修饰器用来修改类的行为,修饰器是一个对类进行处理的函数，修饰器的第一个参数，就是要修饰的目标类
@testable
class MyTestableClass{

}
let testable = function(target){
    target.isTestable = true; //类的静态属性
    target.prototype.isTestable = true; //类的实例属性
}
//结果 MyTestableClass.isTestable // true


//本质行为
@decorator 
class A{}

//等同于
class A{}
A = decorator(A) || A;

//如果一个参数不够用，可以在修饰器外面再封装一个层函数
let testable = function(isTestable){
    return function(target){
        target.isTestable = isTestable;
    }
}
@testable(true)
class MyTestableClass{

}
MyTestableClass.isTestable //true

@testable(false)
class MyClass {}
MyClass.isTestable //false

//修饰器度类的行为的改变，是代码编译时发生的，而不是在运行时。

//##类的修饰
class MyReactComponent extends React.Component {}
export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
//使用装饰器
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}

//##方法的修饰
//装饰器不仅可以修饰类，还可以修饰类的属性
class Person{
    @readonly //readonly(Person.prototype, 'name', descriptor);
    get name(){
        return '';
    }
}
//第一个参数是原型对象
//第二个参数是要修饰的属性名
//第三个参数是该属性的描述对象
let readonly = function(target, name, descriptor){
    //decriptor对象原来的值如下
    // {
    //     value: specifiedFunction,
    //     enumerable: false,
    //     configurable: true,
    //     writable: true
    // }
    descriptor.writable = false;
    return decriptor;
}

class Math{
    @log //输出日志
    add(a, b){
        return a + b;
    }
}

let log = function(target, name, decriptor){
    let oldValue = descriptor.value;
    decriptor.value = function(){
        console.log(`Calling ${name} with`, arguments);
        return oldValue.apply(this, arguments);
    }
    return descriptor;
}

//Decorator组件
@Component({
    tag: 'my-component',
    styleUrl: 'my-component.scss'
})

export class MyComponent {
    @Prop() first: string;
    @Prop() last: string;
    @State() isVisible: boolean = true;

    render() {
        return (
            <p>Hello, my name is {this.first} {this.last}</p>
        );
    }
}


//如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。
function dec(id){
    console.log('evaluated', id);
    return (target, property, descriptor) => console.log('executed', id);
}

class Example {
    @dec(1)
    @dec(2)
    method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1 


//##core-decorators
@autobind
import { autobind } from 'core-decorators';

class Person {
  @autobind
  getPerson() {
    return this;
  }
}

let person = new Person();
let getPerson = person.getPerson;

getPerson() === person;
// true

@readonly
import { readonly } from 'core-decorators';

class Meal {
  @readonly
  entree = 'steak';
}

var dinner = new Meal();
dinner.entree = 'salmon';

@override
import { override } from 'core-decorators';

class Parent {
  speak(first, second) {}
}

class Child extends Parent {
  @override
  speak() {}
  // SyntaxError: Child#speak() does not properly override Parent#speak(first, second)
}

// or

class Child extends Parent {
  @override
  speaks() {}
  // SyntaxError: No descriptor matching Child#speaks() was found on the prototype chain.
  //
  //   Did you mean "speak"?
}

@deprecate //(别名@deprecated)
import { deprecate } from 'core-decorators';

class Person {
  @deprecate
  facepalm() {}

  @deprecate('We stopped facepalming')
  facepalmHard() {}

  @deprecate('We stopped facepalming', { url: 'http://knowyourmeme.com/memes/facepalm' })
  facepalmHarder() {}
}

let person = new Person();

person.facepalm();
// DEPRECATION Person#facepalm: This function will be removed in future versions.

person.facepalmHard();
// DEPRECATION Person#facepalmHard: We stopped facepalming

person.facepalmHarder();
// DEPRECATION Person#facepalmHarder: We stopped facepalming
//
//     See http://knowyourmeme.com/memes/facepalm for more details.
//

@suppressWarnings
import { suppressWarnings } from 'core-decorators';

class Person {
  @deprecated
  facepalm() {}

  @suppressWarnings
  facepalmWithoutWarning() {
    this.facepalm();
  }
}

let person = new Person();

person.facepalmWithoutWarning();
// no warning is logged

//##自动发布事件
const postal = require("postal/lib/postal.lodash");

export default function publish(topic, channel) {
  const channelName = channel || '/';
  const msgChannel = postal.channel(channelName);
  msgChannel.subscribe(topic, v => {
    console.log('频道: ', channelName);
    console.log('事件: ', topic);
    console.log('数据: ', v);
  });

  return function(target, name, descriptor) {
    const fn = descriptor.value;

    descriptor.value = function() {
      let value = fn.apply(this, arguments);
      msgChannel.publish(topic, value);
    };
  };
}
// index.js
import publish from './publish';

class FooComponent {
  @publish('foo.some.message', 'component')
  someMethod() {
    return { my: 'data' };
  }
  @publish('foo.some.other')
  anotherMethod() {
    // ...
  }
}

let foo = new FooComponent();

foo.someMethod();
foo.anotherMethod();


//##Mixin

//##Trait

//Babel转码支持