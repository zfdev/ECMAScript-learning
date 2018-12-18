//#class
//定义函数对象类实例的方法，使用new关键字创建类的实例
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    //没有逗号
    toString(){
        return `${this.x}, ${this.y}`;
    }
}

let pointInstance = new Point('Jason', 'Zhang');
let pointInstanceSencond = new Point('Amy', 'Chen');
console.log(pointInstance.toString());
//类的数据类型就是函数，类的本身指向构造函数
console.log(typeof Point);
console.log(Point === Point.prototype.constructor);
console.log(pointInstance.constructor === Point.prototype.constructor);
//Instance property
console.log('Instance own property:')
console.log(pointInstance.hasOwnProperty('x')); //Instance own property
console.log(pointInstance.hasOwnProperty('y')); //Instance own property
console.log(pointInstance.hasOwnProperty('toString')); //Prototype property
console.log(pointInstance.hasOwnProperty('sayHi')); //Prototype property
console.log(pointInstance.__proto__.hasOwnProperty('toString')); 
console.log(pointInstance.__proto__.hasOwnProperty('sayHi')); 
//Share the some prototype
console.log('Share the same prototype:');
console.log(pointInstance.__proto__ === pointInstanceSencond.__proto__);

//
console.log(Object.getPrototypeOf(pointInstance) === Point.prototype);

//
Object.assign(Point.prototype, {
    sayHi(){
        return `Hello, my name is ${this.x} ${this.y}.`
    }
})
console.log(pointInstance.sayHi());

//class定义的类的内部方法不可枚举，这点与传统函数方法的方式定义的类不同
console.log(Object.keys(Point.prototype)); //没有toString方法
console.log(Object.getOwnPropertyNames(Point.prototype));

//传统函数方式定义类
let ES5Point = function(x, y){
    this.x = x;
    this.y = y;
}
ES5Point.prototype.toString = function(){

}
ES5Point.prototype.sayHi = function(){

}
console.log(Object.keys(ES5Point.prototype));
console.log(Object.getOwnPropertyNames(ES5Point.prototype));

//##Constructor
//constructor是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
//一个类必须有constructor方法，如果没有显式定义，一个空的contructor方法会被默认添加
//constructor方法默认返回实例对象this
class SimpleClass {

}
//等同于
// class SimpleClass{
//     constructor(){
//         return this;
//     }
// }


//##getter setter
class MyClass{
    get prop(){
        return 'This is getter';
    }
    set prop(value){
        console.log('The prop is set to ' + value);
    }
}
let inst = new MyClass();
console.log(inst.prop);
inst.prop = 123;

//存值和取值函数是设置在属性的Descriptor对象上得
let descriptor = Object.getOwnPropertyDescriptor(MyClass.prototype, 'prop');
console.log(descriptor);
console.log('get' in descriptor);
console.log('set' in descriptor);



//##Property expression
const propName = 'customName';
class customNameClass {
    [propName](){
        return propName;
    }
}


//##Class expression
let customClass = class {

}


//##Class.name
console.log(MyClass.name);


//##Generator function in class
class GeneratorInClass {
    constructor(...args){
        this.args = args;
    }
    * [Symbol.iterator](){
        for(let arg of this.args){
            yield arg;
        }
    }
}
for(let x of new GeneratorInClass('Hello', 'Jason')){
    console.log(x);
}

//##Bind this
class BindThisClass {
    constructor(){
        this.printName = this.printName.bind(this);
    }
    printName(name = 'Jason'){
        this.print(`Hello ${name}`);
    }
    print(text){
        console.log(text);
    }
}
let bindThisInstance = new BindThisClass();
const { printName } = bindThisInstance;
printName();

//##Static method
//静态方法不会被实例继承，而是直接通过类来调用
//this指向的是类本身，而不是类的实例
class StaticMethodClass {
    constructor(){
        this.name = this.name.bind(this);
    }
    static staticMethod(){
        return 'Static method message ' + this.name();
    }
    static name(){
        return 'Jason';
    }
    name(){
        return 'Amy';
    }
}
console.log(StaticMethodClass.staticMethod());
class ExtendStaticMethod extends StaticMethodClass{
    static childMethod(){
        return super.staticMethod() + ' From child.';
    }
    static name(){
        return 'Kitty';
    }
}
console.log(ExtendStaticMethod.childMethod());

//##Property
class propertyClass {
    //name = 23;
    constructor(){
        this._name = 'private name';
    }

}
let propertyInstance = new propertyClass();
console.log(propertyInstance._age);
console.log(propertyInstance._name);

//##Static property


//new.target
//用于构造函数中，返回new 命令作用于的那个构造函数，如果不是通过new调用 会返回undefined

//子类继承父类时，new.target会返回子类，可以用这个特性创建一个abstract类
class Shape{
    constructor(){
        if(new.target === Shape){
            throw new Error('This is abstract class, use it extend it.');
        }
    }
}

class Rectangle extends Shape{
    constructor(){
        super();
    }
}

let shapeInstance = new Shape();