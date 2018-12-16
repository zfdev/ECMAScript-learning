//#About Proxy Object
//Proxy 用于修改某些操作的默认行为 在对目标对象之前假设一层拦截，外接对对象的访问 都必须先通过这层拦截，提供了一种方式，对外界的访问进行过滤和改写。

//##对目标对象obj的.操作 get set方法进行拦截
let obj = new Proxy({}, {
    get: function(target, key, receiver){
        console.log(`getting ${key}`);
        return Reflect.get(target, key, receiver);
    },
    set: function(target, key, value, receiver){
        console.log(`setting ${key}`);
        return Reflect.set(target, key, value, receiver);
    }
});

obj.count = 1;
++obj.count;

//##
let handler = {
    get: function(target, name){
        if(name === 'prototype'){
            return Object.prototype;
        }
        return 'Hello, ' + name;
    },
    apply: function(target, thisBinding, args){
        return args[0];
    },
    construct: function(target, args){
        return {
            value: args[1]
        }
    }
};

let debug = console.log;

let fproxy = new Proxy(function(x, y){
    return x + y;
}, handler);


debug(fproxy(1, 2));
debug(new fproxy(1, 2));
debug(fproxy.prototype === Object.prototype);
debug(fproxy.foo);


//##Proxy Method
//###get(target, propKey, receiver)
//拦截读取某个属性的操作 target为目标对象 propKey为属性名 reciever为proxy实例本身

//###set(target, propKey, value, receiver)
//拦截某个属性赋值的操作 target为目标对象 propKey为属性名 value为属性值 receiver为实例本身
let testStringIndexAction = '_prop';
debug(testStringIndexAction[0]);

//###has(target, propKey)
//has方法用哦公寓拦截hasProperty的操作 判断对象是否具有某个属性 典型的就是in运算符
//target是目标对象 propKey是需要查询的属性名

//###deleteProperty(target, propKey)
//deleteProperty用于拦截delete操作 如果这个方法抛出错误或者返回false 当前属性就无法被delete删除

//###ownKeys(target)
//拦截对象自身属性的读取操作
//Object.getOwnPropertyNames()
//Object.getOwnPropertySymbols()
//Obejct.keys()
//for...in 循环

//###getOwnPropertyDescriptor(target, propKey)
//拦截Object.getOwnPropertyDescriptor()返回一个属性描述对象

//###defineProperty(target, propKey, propDesc)
//拦截Object.defineProperty操作 当defineProperty方法返回false 导致添加新属性总是无效

//###preventExtensions(target)
//拦截Object.preventExtensions()

//###getPrototypeOf(target)
//用于拦截获取对象原型
//重要拦截下面这些操作
//Object.prototype.__proto__
//Object.prototype.isPrototypeOf()
//Object.getPrototypeOf()
//Reflect.getPrototypeOf()
//instanceof

//###isExtensible(target)
//拦截isExtensible操作

//###setPrototypeOf(target, proto)
//拦截Object.setPrototypeOf()
//target为目标对象 proto为原型对象

//###revocable(target, handler)
//返回一个可以取消Proxy实例，执行handler函数，可以取消Proxy实例

//###apply(target, object, args)
//apply方法拦截函数的调用 call apply的操作

//###conctruct(target, args)
//construct方法用于拦截new命令 target是目标对象 args是构造函数参数对象

let testConstructor = new Proxy(function(){}, {
    construct: function(target, args){
        console.log('called: ' + args.join(','));
        return {
            value: args[0] * 10
        };
    }
});

debug((new testConstructor(1)).value);

//###this problem
//this指向的是proxy内部
//