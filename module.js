//模块
//ES6实现的模块功能，与CommonJS和AMD的不同，CommonJS用于服务器，AMD用于浏览器，他们只能在运行时确定依赖关系，但是ES6模块在编译时就能确定模块的依赖关系。

//#对比
//##CommonJS运行时模块
let { stat, exists, readFile } = require('fs');
//等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readFile = _fs.readFile;

//##ES6模块不是对象，而是通过export命令显示指定输出的代码，再通过import命令输入
//##ES6模块,只加载了三个方法，其他方法不加载，编译时加载(静态加载)。
import {stat, exists, readFile} from 'fs';


//#ES6模块自动采用严格模式，不管是否在模块头加上'use strict'

//#export命令用于规定模块对外接口，import命令用于输入其他模块提供的功能
//一个模块就是一个独立的文件，文件内部的所有变量，外部无法获取。如果希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量

//##Export命令 输出变量
let firstName = 'Jason';
let lastName = 'Zhang';
let age = 19;
export{ firstName, lastName, age }

//##还可以使用export命令输出函数或者类
let multiply = function(x, y){
    return x*y;
}
//export {multiply};

//##as命令对输出变量重命名
//export{ 
//  add as multiply     
//

//##export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
//上面代码输出变量foo，值为bar，500 毫秒之后变成baz


//#import命令
//使用export模块定义了对外接口之后，其他JS文件就可以通过import命令加载这个模块
//import命令接收一对大括号，大括号里面的变量名，必须与被导入模块对外接口名称相同
//也可以使用as对输入的变量重命名
import {
    firstName, lastName, year as age
} from './test/import.js';

//import命令输入的变量都是只读的
//import from指定模块的位置，可以是相对路径，也可以是绝对路径，js文件后缀可以省略，如果是模块名，必须有配置文件告诉javascript引擎该模块的位置
//import命令具有提升效果，会提升到整个模块头部
//import是静态执行，所有不能使用表达式和变量

//import语句会执行加载的模块，但是不会输入任何值
//如果多次重复执行同一句import，那么最多只会执行一次
import 'lodash';
import 'lodash';

//#模块整体加载
//一次加载所有的模块并使用as重命名，所有输出值都加载在这个对象上
import * as myTestModule from './test/import';
myTestModule.firstName;

//#export default导出默认模块
//用户不需要了解模块有哪些属性和方法，为模块指定默认输出，其他模块加载该模块时，import之后为该模块指定任意名字

//module 
export default function(){
    console.log('foo');
}
//or you can write it like this
let foo = function(){
    console.log('foo');
}
export default foo;

//Other module import the default module and rename it with as
import customFun from './export-default';
customFun();

//export default output class
export default class {
    //...
};

//同时输入默认方法和其他接口
import _, {each, forEach} from 'lodash'; //_为默认lodash模块，each和forEach为其他接口

//#export与import复合写法
//主要作用就是转发了当前模块，实际上并没有被导入当前模块
//主要用途比如接口改名
export { es6 as default } from './someModule';
//等同于
//import { es6 } from './someModule';
//export default es6;

//#模块的继承
//circleplus.js
export * from 'circle';
export let e = 2.17828182846;
export default function(x) { //export * 会忽略这段代码，因为已经把整个导入的模块作为默认模块导出了
    return Math.exp(x);
}
//使用方法，实现了继承了circle模块，并向其添加了常量e
import * as math from 'circleplus';
import someMethod from 'circleplus';
console.log(someMethod(math.e));

//跨模块常量
//如何组织跨模块常量
//如果使用的常量非常多，可以创建一个constants目录，将各种常量写在不同的文件里，使用一个index文件将这些常量输出，使用的时候直接加载index.js文件就可以了
//constants/db.js
export const db ={
    url: 'https//google.com/api',
    adminName: 'jason',
    password: '*******'
}

//constants/user.js
export const users = ['jason', 'root', 'staff', 'ceo', 'chief'];

//constants/index.js
export {db} from './constants/db';
export {users} from './constants/users';

//use it
import {db, users} from './constants/index';


//import()方法
//提案中，import()函数用于动态加载模块，方法返回一个Promise对象，所以是异步加载
//适用场合
//1.按需加载
//在需要的时候加载某个模块
GamepadButton.addEventListener('click', event =>{
    import('/dialogBox.js')
    .then(dialogBox => {
        dialogBox.open();
    })
    .catch(error => {
        //Error handling
    });
})

//2.条件加载
//根据不同的情况加载不同的模块
if(condition){
    import('moduleA').then(moduleA => {

    });
}else{
    import('moduleB').then(moduleB => {

    })
}

//3.动态的模块路径
//允许模块路径动态生成
let f = function(){
    return '.path';
}
import(f()).then(module => {

})

//加载模块成功后适用对象赋值解构输出接口
import('./myModule').then(({export1, export2}) =>{

})

//同时加载多个模块
Promise.all([
    import('./module1'),
    import('./module2'),
    import('./module3')
]).then(([module1, module2, module3]) =>{

})

//async函数
async function main(){
    const myModule = await import('./myModule.js');
    const {export1, export2} = await import('./mymodule.js');
    const [module1, module2, module3] = 
        await Promise.all([
            import('./modules1.js'),
            import('./modules2.js'),
            import('./modules3.js')
        ])
}

//Module加载实现

//#浏览器


//#ES6模块


//#CommonJS模块


//#Node加载


//循环加载


//#ES6 模块转码
