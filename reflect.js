//#Reflect
//让一些Object上的一些内部方法迁移到Reflect对象上
//name in object --> Reflect.has*(object, name)
//delete object[name] --> Reflect.deleteProperty(object, name)

//##与Proxy对象的关系
//无论Proxy对象如何修改默认行为 都可以通过在Reflect上获取默认行为
// Proxy(target, {
//     set: function(target, name, value, receiver){
//         //确保原有的行为执行完成
//         var success = Reflect.set(target, name, value, receiver);
//         //部署额外的功能
//         if(success){
//             console.log(`Property ${name} on ${target} set to ${value}`)
//         } 
//         return success;
//     }
// });

//Add a log method to obj but not changing the original action of method
// let loggedObj = new Proxy(obj, {
//     get(target, name){
//         console.log('get', target, name);
//         return Reflect.get(target, name);
//     },
//     deleteProperty(target, name){
//         console.log('delete ' + name);
//         return Reflect.deleteProperty(target, name);
//     },
//     has(target, name){
//         console.log('has' + name);
//         return Reflect.has(target, name);
//     }
// });

//##Static Method
//###Reflect.get(target, name, receiver)

//###Reflect.set(target, name, value, receiver)


//###Reflect.apply(target, thisArg, args)

//###Reflect.construct(target, args)
//提供了一种不使用new 来调用构造函数的方法
function Greeting(name){
    this.name = name;
}

let instance = Reflect.construct(Greeting, ['Jason Zhang'])

//###Reflect.defineProperty(target, name,desc)

//###Reflect.deleteProperty(target, name)

//###Reflect.has(target, name)

//###Reflect.ownKeys(target)
//等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和

//###Reflect.isExtensible(target)

//###Reflect.preventExtensions(target)

//###Reflect.getOwnPropertyDescriptor(target, name)

//###Reflect.getPrototypeOf(target)
//读取__proto__属性

//###Reflect.setPrototypeOf(target, prototype)
//设置目标对象的原型
let debug = console.log;

const myObj = {};

Reflect.setPrototypeOf(myObj, Array.prototype);

debug(myObj.length);

//Observer Mode
//
const queueObservers = new Set();
const observe = fn => queueObservers.add(fn);
const observable = obj => new Proxy(obj, { set });
let set = function(target, key, value, receiver){
    const result = Reflect.set(target, key, value, receiver);
    queueObservers.forEach(observer => observer());
    return result;
}

const person = observable({
    name: 'Jason Zhang',
    age: 20
});

let print = function(){
    console.log(`${person.name}, ${person.age}`)
}
observe(print);
person.name = 'Hengyuan Zhang';
person.name = 'Tianhe Yun';