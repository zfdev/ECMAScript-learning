//const命令对于简单数据类型和复杂数据类型的不同处理方式
//const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址保存的数据不能改动
//对于简单的数据类型（数值，字符串，布尔值）
//对于复杂的数据类型（对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const能保证的是这个指针是固定的，至于指向的数据结构是不是可变的，就完全不能控制了，所以将一个对象声明为常量必须非常小心

//例子1 常量声明一个对象
const constObject = {};
constObject.prop = 123;
console.log(constObject.prop); //并不会报错
//constObject = {}; //指向一个新的对象，指针改变，报错

//例子2 常量声明一个数组
const constArray = [];
constArray.push('jason');
console.log(constArray);
//constArray = ['zhang']; //指向一个新的数组，指针改变，报错


//#块级作用域
//使用let取代var,不会出现变量提升的问题
//常量最好使用const,提升性能

// const a = 1;
// const b = 2;
// const c = 3;

//Best
const [a, b, c] = [1, 2, 3];

//#字符串
//静态字符串一律使用单引号，动态字符串使用反引号
const staticString = 'jason';
const dynamicString = `${staticString} zhang`;


//#解构赋值
//使用数组成员对变量赋值时，优先使用解构赋值
const arr = [1,2,3,4];
const [first, second] = arr; //first = arr[0] second = arr[1]
//如果参数的成员是对象，优先使用解构赋值
const nameObj = {
    firstName: 'Jason',
    lastName: 'Zhang'
}
const getFullName = function({firstName, lastName}){
    console.log(firstName);
}
getFullName(nameObj);
//如果函数返回多个值，优先使用对象的解构赋值，方便以后添加返回值，以及修改返回值的顺序
const {left, right} = processInput(input);
const processInput = function(input){
    return {
        left,
        right,
        top,
        bottom,
    }
}

//#对象
//对象尽量静态化，一旦定义就不要随机添加新的属性，如果需要添加新的属性，使用Object.assign方法
const obj = {
    x: null
}
obj.x = 3;
//如果属性名是动态的，在创造对象的时候使用属性表达式
const objWithNameChanged = {
    id: 5,
    name: 'jason zhang',
    [getKey('enabled')]: true,
}
//对象的属性尽量使用简洁表达式
const simpleObject ={
    ref,
    value: 1,
    addValue(value){
        return simpleObject.value + value;
    }
}

//#数组
//使用扩展运算符拷贝数组
const itemCopy = [...items];
//使用Array.from方法将类数组对象转换为数组
const domList = document.querySelectorAll('.list');
const nodes = Array.from(domList);

//#函数
//立即执行函数可以使用箭头函数
(() => {
    console.log('Welcome to my website.');
})();
//需要使用函数表达式的场合，尽量使用箭头函数代替
[1, 2, 3].map(x => x * x);
//箭头函数取代Function.prototype.bind
const boundMethod = (...params) => method.apply(this, params);
//使用rest运算符...替代arguments
const concatenateAll = function(...args){
    return args.join('');
}
//使用默认值语法参数设置函数的默认值
const handleThings = function(opts = {}){}

//#Map
//需要使用key: value数据结构的，使用Map结构
let map = new Map(arr);
for(let key of map.keys()){
    console.log(key);
}
for(let value of map.values()){
    console.log(value);
}
for(let item of map.entries()){
    console.log(item[0], item[1])
}

//#Class
//需要prototype操作的，都使用class
class Queue{
    constructor(contents = []){
        this._quere = [...contents];
    }
    pop(){
        const value = this._quere[0];
        this._quere.splice(0, 1);
        return value;
    }
}
//需要继承的，都使用extends
class Child extends Parent{

}

//#Module
//使用import取代require
import {func1, func2} from 'moduleA';
//使用export替代module.exports
import React from 'react';

class Breadcrumbs extends React.Component {
    render(){
        return <nav />
    }
}

export default Breadcrumbs;


//#ESLint
//ESLint是一个语法规则和代码风格检查工具，可以用来保证写出语法正确，风格统一的代码