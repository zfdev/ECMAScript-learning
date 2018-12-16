//四种数据结构
//Map
//Set
//Array
//Object

//需要一种统一的接口，来处理不同的数据结构
//#Iterator遍历器 是一种接口，为不同的数据结构提供统一的访问机制,就可以完成遍历操作

//##作用
//1.为各种数据结构，提供一个统一的，简便的访问接口
//2.使得数据结构的成员能够按照某种次序排列
//3.创造了一种新的遍历命令for of循环

//##遍历过程
//创建一个指针对象，指向当前数据结构的起始位置，遍历器的本质就是一个指针对象。
//第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员
//第二次调用指针对象的next方法，指针就指向数据结构的第二个成员
//不断调用指针对象的next方法，知道它指向数据结构的结束位置。
//每次调用next方法，都会返回数据结构的当前成员信息，返回一个包含value和done两个属性的对象

//模拟遍历过程
let it = makeIterator(['a','b']);
it.next();// {value: 'a', done: false}
it.next();// {value: 'b', done: false}
it.next();// {value: undefined, done: true}
function makeIterator(array){
    let nextIndex = 0;
    return {
        next: function(){
            return nextIndex < array.length ?
            {
                value: array[nextIndex++],
                done: false
            }
            :
            {
                value: undefined,
                done: true
            }
        }
    }
}

//##Iterator接口
//接口部署在数据结构的Symbol.iterator属性，只要一个数据结构具有Symbol.iterator属性，说明它就是可以遍历的(iterable)
//可以被for of循环遍历
let iterableObj = {
    [Symbol.iterator]: function(){
        return{
            next: function(){
                return{
                    value: 'value',
                    done: true
                }
            }
        }
    }
};

//##原生具备被Iterator接口的数据结构
//Array
//Map
//Set
//String
//arguments
//Nodelist
//TypedArray

//Example
let iteratorArr = ['a', 'b', 'c'];
let iter = iteratorArr[Symbol.iterator]();

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

//自定义Iterator
class RangeIterator{
    constructor(start,stop){
        this.value = start;
        this.stop = stop;
    }

    [Symbol.iterator](){
        return this;
    }

    next(){
        let value = this.value;
        if(value < this.stop){
            this.value++;
            return {
                done: false,
                value: value
            }
        }
        return {
            done: true,
            value: undefined
        }
    }
}

let range = function(start, stop){
    return new RangeIterator(start, stop);
}

//for of 循环遍历
for(let value of range(0, 3)){
    console.log(value);
}

//为一个Object添加Iterator接口
let iteratorObject = {
    data: ['hello', 'world'],
    [Symbol.iterator](){
        const self = this;
        let index = 0;
        return {
            next(){
                if(index < self.data.length){
                    return {
                        value: self.data[index++],
                        done: false
                    }
                }else{
                    return{
                        value: undefined,
                        done: true
                    }
                }
            }
        }
    }
}

for(let value of iteratorObject){
    console.log(value);
}

//为一个类数组对象添加iterator接口
let arrayLikeObject = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
}
for(let item of arrayLikeObject){
    console.log(item);
}

//##调用Iterator的场景
//###解构赋值
let setIterator = new Set().add('a').add('b').add('c');
let [x, y] = setIterator;
console.log(x);
console.log(y);
let [first, ...rest] = setIterator;
console.log(first);
console.log(rest);

let debug = function(...args){
    console.log('\n');
    console.log.apply(this, args);
};

//###扩展运算符
//提供了一种机制，可以将任何部署了Iterator接口的数据转换为数组
let iteratorString = 'hello';
debug([...iteratorString]);

let iteratorArray = ['b', 'c'];
debug('a', ...iteratorArray, 'd');

//###yield*
let generator = function*(){
    yield 1;
    yield* [2,3,4];
    yield 5;
}
let iteratorGen = generator();
debug(iteratorGen.next());
debug(iteratorGen.next());
debug(iteratorGen.next());
debug(iteratorGen.next());
debug(iteratorGen.next());
debug(iteratorGen.next());

//###其他场合
//for of
//Array.from()
//Map() Set() WeakMap() WeakSet()
//Promise.all()
//Promise.race()

//##字符串Iterator接口
let iteratorString2 = 'JasonZhang';
debug(typeof iteratorString2[Symbol.iterator]);
let iteratorNextResult = iteratorString2[Symbol.iterator]();
debug(iteratorNextResult.next());
debug(iteratorNextResult.next());
debug(iteratorNextResult.next());
debug(iteratorNextResult.next());
debug(iteratorNextResult.next());
debug(iteratorNextResult.next());
debug(iteratorNextResult.next());
debug(iteratorNextResult.next());
debug(iteratorNextResult.next());
debug(iteratorNextResult.next());
debug(iteratorNextResult.next());
debug(iteratorNextResult.next());

//修改遍历器
let editStringIterator = new String('hi');
debug([...editStringIterator]);
editStringIterator[Symbol.iterator] = function(){
    return {
        next(){
            if(this._first){
                this._first = false;
                return {
                    value: 'bye',
                    done: false
                }
            }else{
                return {
                    done: true
                }
            }
        },
        _first: true
    }
}
debug([...editStringIterator]);


//##使用Generator函数快速创建Iterator接口
let myIterable = {
    [Symbol.iterator]: function*(){
        yield 1;
        yield 2;
        yield 3;
    }
}
debug(...myIterable);
for(let item of myIterable){
    debug(item);
}


//##Iterator.prototype.return()
// let readLineSync = function(file){
//     return {
//         [Symbol.iterator](){
//             return {
//                 next(){
//                     return {
//                         done: false
//                     }
//                 },
//                 return(){
//                     file.close();
//                     return {
//                         done: true
//                     }
//                 }
//             }
//         }
//     }
// }
// // 
// for(let line of readLineSync(fileName)){
//     console.log(line);
//     break;//触发iterator的return方法
// }

//##Iterator.prototype.throw()

//##for of loop
//一个数据结构只要部署了Symbol.iterator属性，就被视为具有iterator接口，就可以使用for of循环遍历它的成员，for of循环调用了数据结构内部的Symbol.iterator方法

//Array
//原生具备iterator接口

const testArr = ['red', 'blue', 'green'];
for(let index in testArr){
    console.log(index);
}

for(let value of testArr){
    console.log(value);
}

testArr.forEach(function(element, index){
    debug(element);
    debug(index);
});

//Set
let browserEngines = new Set(['Gecko', 'Trident', 'Webkit']);
for(let eName of browserEngines){
    debug(eName);
}
for(let index of browserEngines.entries()){
    debug(index);
}
debug(browserEngines.entries());

//Map
let es6Map = new Map();
es6Map.set('edition', 6);
es6Map.set('committee', 'TC39');
es6Map.set('standard', 'ECMA-262');
for(let [name, value] of es6Map){
    console.log(`${name}:${value}`);
}

//计算生成的数据结构
//entries() 
//返回一个Iterator对象，用来遍历[keyName, keyValue]组成的数组
//Array return [index, value]
//Set return [value, value]
//Map return [keyName, value]

//keys()
//返回一个遍历器对象，用来遍历所有的键名

//value()
//返回一个遍历器对象，用来遍历所有的键值

let arr  = ['a', 'b', 'c'];
for(let pair of arr.entries()){
    console.log(pair);
}

//类数组对象
//String
let arrLikeString = 'Hello';
for(let s of arrLikeString){
    console.log(s);
}

//DOM NodeList

//arguments对象
let printArgs = function(){
    for(let x of arguments){
        console.log(x);
    }
}
printArgs('a','b');

//类数组对象转换成为数组 使其可以被for of 遍历
let arrayLikeObjectWithoutIterator = {
    0: 'a',
    1: 'b',
    length: 2
};
for(let x of Array.from(arrayLikeObjectWithoutIterator)){
    console.log(x);
}

//普通对象转换以便被for of循环遍历
let es6SimpleObject = {
    edition: 6,
    committee: 'TC39',
    standard: 'ECMA-262'
};
for(let key of Object.keys(es6SimpleObject)){
    console.log(key + ':' + es6SimpleObject[key]);
}

let entries = function*(obj){
    for(key of Object.keys(obj)){
        yield [key, obj[key]]
    }
}

for(let [key, value] of entries(es6SimpleObject)){
    console.log(key, '->', value);
}

//##与其他遍历器比较

//传统for循环 需要写索引和判断条件比较麻烦 虽然可以遍历数组 但是建议直接使用数组内置的forEach方法

//Array.prototype.forEach方法适合遍历数组，但是不支持break或者return命令

//for in 循环适合遍历对象 不适合遍历数组

//for of循环相比以上几种循环，不仅没有for in的缺点 而且还可以与break continue return配合使用
