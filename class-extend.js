//class extend
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;  
    }
    toString(){
        return `${this.x}, ${this.y}`;
    }
    static sayHi(){
        console.log('Hello Jason');
    }
}
class ColorPoint extends Point{
    constructor(x, y, color){
        super(x, y); //子类必须在consctructor中调用super方法，子类自己的this对象，必须先通过父类的构造函数完成塑造，得到和父类同样的实例属性和方法，然后再进行处理，加上自己的实例属性和方法，如果不调用super方法，子类就得不到this对象
        this.color = color; //子类构造函数中调用super方法之后才可以使用this关键字
    }
    toString(){
        return this.color + ' ' + super.toString();
    }
}

let colorPointInstance = new ColorPoint();
console.log(colorPointInstance.toString());

//判断继承
console.log(colorPointInstance instanceof ColorPoint);
console.log(colorPointInstance instanceof Point);
ColorPoint.sayHi();

//子类如果没有定义constructor方法，这个方法会默认被添加
// class ColorPoint extends Point{

// }
// //等同于
// class ColorPoint extends Point{
//     constructor(...args){
//         super(...args); 
//     }
// }

//Obejct.getPrototypeof()可以通过这个方法从子类获取父类
console.log(Object.getPrototypeOf(ColorPoint) === Point);

//Super
//Super关键字在子类构造函数中调用时，代表父类的构造函数
//Super作为对象使用，用在普通方法中时，指向父类的原型对象，静态方法中，指向父类
class A{
    constructor(){
        this.p = 999;
        console.log(new.target.name);
    }
    aMethod(){
        console.log('Im a method in class A');
    }
}
A.prototype.propertyOnA = 'Im a property on class A.';
class B extends A{
    constructor(){
        super(); //这里相当于A.prototype.constructor.call(this);
        super.aMethod(); //这里的super.aMethod()相当于A.prototype.aMethod()
        console.log(super.p);//由于super指向父类的原型对象，所以在父类实例上的属性，是无法调用的
        console.log(super.propertyOnA); //定义在父类prototype对象上的属性就可以通过super访问
    }
}
new A();
new B();

//super调用父类方法时，方法内部的this指向当前子类的实例
class Parent {
    constructor(){
        this.x = 1;
    }
    print(){
        console.log(this.x);
    }
}
class Child extends Parent{
    constructor(){
        super();
        this.x = 2;
        super.x = 3; //如果通过super对某个属性赋值，这个的super就是this,赋值的属性会变成子类实例的属性
    }
    m(){
        super.print(); //本质上是super.print.call(this);  但是这里的this指向的是Parent的实例，所以返回的是Parent的实例属性x
    }
}
let childInstance = new Child();
childInstance.m();

//super在静态方法中
class staticParent{
    constructor(){
        this.x = 'parent instance property';
    }
    static myMethod(msg){
        console.log('static', msg);
    }
    static print(){
        console.log(this.x);
    }
    myMethod(msg){
        console.log('instance', msg);
    }
}
class staticChild extends staticParent{
    constructor(){
        super();
        this.x = 'child instance property';
    }
    static myMethod(msg){
        super.myMethod(msg); //super在静态方法中指向父类
    }
    myMethod(msg){
        super.myMethod(msg); //super在普通方法中指向父类的原型对象
    }
    static print(){
        super.print();//当子类的静态方法中通过super调用父类方法时，方法内部的this指向的是当前的子类，并不是子类的实例
    }
}

staticChild.myMethod(1);
let child = new staticChild();
child.myMethod(2);

staticChild.x = 'child class property';
staticChild.print(); 

//super使用时必须显式指定是作为函数，还是作为对象使用
//对象总是继承其他对象，所以可以在任意一个对象内使用super关键字
let obj = {
    toString(){
        return 'Custom object:' + super.toString();
    }
}
console.dir(obj.toString());

//类的prototype属性和__proto__属性
//ES5实现
//每一个对象都有一个__protot__属性
class ExampleA{

}
class ExampleB extends ExampleA{
    
}
//extends本质操作
//Object.setPrototypeOf(B.prototype, A.prototype);
//Object.setPrototypeOf(B, A);
//Object.setPrototypeOf = function(obj, proto){
// obj.__proto__ = proto;
// return obj;
//}

console.log(ExampleB.__proto__ === ExampleA);
console.log(ExampleB.prototype.__proto__ === ExampleA.prototype);

//不存在任何继承, 基类
class NoExtendsClass{

}
console.log(NoExtendsClass.__proto__ === Function.prototype)
console.log(NoExtendsClass.prototype.__proto__  === Object.prototype);

//实例的__proto__属性
//子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性

//原生构造函数的继承
//内置的构造函数
//Boolean()
//Number()
//String()
//Array()
//Date()
//Function()
//RegExp()
//Error()
//Object()

//ES6允许原生构造函数定义子类
class VersionedArray extends Array{
    constructor(){
        super();
        this.history = [[]];
    }
    commit(){
        this.history.push(this.slice());
    }
    revert(){
        this.splice(0, this.length, ...this.history[this.history.length - 1]);
    }
}
let testArr = new VersionedArray();
testArr.push(1);
testArr.push(2);
console.log(testArr);
testArr.commit();
console.log(testArr.history);
testArr.push(3);
console.log(testArr);
testArr.revert();
console.log(testArr);

class ExtendableError extends Error{
    constructor(message){
        super();
        this.message = message;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}

class MyError extends ExtendableError{
    constructor(m){
        super(m);
    }
}

let myerror = new MyError('This is a custom error.');
console.log(myerror.message);
console.log(myerror instanceof Error);
console.log(myerror.name);
console.log(myerror.stack);

//Mixin模式的实现
const objA = {
    a: 'a'
}
const objB ={
    b: 'b'
}
const objC = {
    ...objA,
    ...objB
}
console.log(objC);

let mix = function(...mixins){
    class Mix {}
    for(let mixin of mixins){
        copyProperties(Mix.prototype, mixin);
        copyProperties(Mix.prototype, Reflect.getPrototypeOf(mixin));
    }
    return Mix;
}
let copyProperties = function(target, source){
    for(let key of Reflect.ownKeys(source)){
        if(key !== 'constructor'
            && key !== 'prototype'
            && key !== 'name'
        ){
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}
class MixClass extends mix(Parent, Child){
    
}
let mixInstance = new MixClass();