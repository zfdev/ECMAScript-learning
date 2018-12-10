//#Simple sytnx
//##Property
const foo = 'test';
const bar = { foo };
console.log(bar);

//##Return Object
let returnObject = function(x, y){
    return {x, y};
}
console.log(returnObject('param1', 'param2'));

//##Method
const objectMethod = {
    mothod(){
        return 'Hello Jason';
    }
}
//##Commonjs Export
let getItem = function(){

}
let setItem = function(){

}
module.exports = { getItem, setItem }
console.log(module);

//##Property name sytnx
let propertyNameObj = {
    'Jason Zhang': 'Hello everyone, Im Jason.',
    ['jason method'](){
        return this["Jason Zhang"];
    }
};
console.log(propertyNameObj);

//##Method name property
console.log(propertyNameObj["jason method"].name);
console.log((new Function()).name);

//##Property enumerable
console.log(Object.getOwnPropertyDescriptor(bar, 'foo'));

console.log(Object.keys(propertyNameObj));

let enumerableResult = Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable;
let enumerableResult2 = Object.getOwnPropertyDescriptor([], 'length').enumerable;
console.log(enumerableResult);
console.log(enumerableResult2);

//loop property
//loop all property, including its prototype property
Object.setPrototypeOf(propertyNameObj, bar);
let propertyArray = [];
for(let propertyName in propertyNameObj){
    console.log(propertyName);
    propertyArray.push(propertyName);
}
console.log(propertyArray);

//return an array of property name, but not include the extend property
console.log(Object.keys(propertyNameObj));

//
console.log(Object.getOwnPropertyNames(propertyNameObj));

//
console.log(Reflect.ownKeys(propertyNameObj));

//对象的赋值解构，用于从一个对象取值，从目标对象的自身所有可遍历但尚未被读取的属性，分配到制定的对象上。所有的键和值都会拷贝到新对象上。
//赋值解构是浅拷贝，如果一个值是符合类型的值，比如对象，那么赋值解构拷贝的这个值的引用。
let {x, y, ...z} = {
    x: 1,
    y: 2,
    c: 3,
    d: 4
};
console.log(x);
console.log(y);
console.log(z);

//###Clone object
let cloneOrigin = {
    param: 1,
    property: 'ready'
};
let cloneObject = { ...cloneOrigin };
let cloneObjectByAssign = Object.assign({}, cloneOrigin);
console.log(cloneObject);
console.log(cloneObjectByAssign);

//###Deep clone
let deepCloneObject1 = {
    __proto__: Object.getPrototypeOf(cloneOrigin),
    ...cloneOrigin
};
console.log(deepCloneObject1);

let deepCloneObject2 = Object.assign(
    Object.getPrototypeOf(cloneOrigin),
    cloneOrigin
);
console.log(deepCloneObject2);

let deepCloneObject3 = Object.create(
    Object.getPrototypeOf(cloneOrigin),
    Object.getOwnPropertyDescriptors(cloneOrigin)
);
console.log(deepCloneObject3);

//Merge Object
let a = {
    aProperty: 'Im a lazy cat.',
    funName: function(){
        return null;
    },
    ['funName2'](){
        return 'Hello Jason'
    }
}

let b = {
    property: 'Hello Im Jason, Jason Zhang'
}
let mergeObject = Object.assign({}, a, b);
console.log(mergeObject);

//#Additional Method
//##Object.is
let assignObjectResult = Object.is(cloneOrigin, cloneObjectByAssign);
console.log(assignObjectResult);

let deepCloneObjectResult = Object.is(cloneOrigin, deepCloneObject1);
console.log(deepCloneObjectResult);

console.log(Object.is(cloneOrigin, cloneOrigin));
console.log(Object.is(NaN, NaN));

//##Object.create
//用于创建对象并将内部的__proto__指向参数内的对象
// Object.create(prototypeObject);

//##Object.assign
//Use to clone object
//Object.assign(targetObject, sourceObject);
//同名属性覆盖
//浅拷贝 复制值类型 复制函数求值后的结果

//用于类的实例添加方法
// class Point{
//     constructor({x, y}){
//         Object.assign(this, {x, y});
//     }
// }

//Default Config
//Object.assign({}, defaults, configs);


//##Object.getPrototypeOf
//用于读取对象的原型
let Rectangle = function(){}
let rec = new Rectangle();
console.log(Object.getPrototypeOf(rec) === Rectangle.prototype);
Object.setPrototypeOf(rec, Object.prototype);
console.log(Object.getPrototypeOf(rec) === Rectangle.prototype);


//##Object.setPrototypeOf
//用于为目标对象设置原型
// Object.setPrototypeOf(object, protoypeObj);


//##Object.getOwnProperpyDescriptor
//返回对象属性的描述对象


//##Object.keys
console.log(Object.keys(a));

//##Object.values
console.log(Object.values(a));

//##Object.entries
//返回对象所有可遍历对象的键值对数组
console.log(Object.entries(a));
let convertToMap = new Map(Object.entries(a));
console.log(convertToMap);

//##Object.fromEntries
console.log(Object.fromEntries(convertToMap));