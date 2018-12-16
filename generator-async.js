function* main() {
    yield console.log('Main');
      
  }
  
let it = main();
it.next();

let debug = function(...args){
    let now = new Date();
    console.log(now.toString());
    console.log.apply(this, args);
}

//Generator Async Application
//实现异步编程的传统方法
//回调函数
//事件监听
//发布订阅
//Promise对象

//连续执行的就叫同步
//一个任务不是连续完成的，先执行第一段，转而执行其他任务，等做好了准备，再执行第二段。

//回调函数的例子
//fs.readFile api的callback参数，就是使用回调函数来处理读取文件完成之后的操作
// const fs = require('fs');
// fs.readFile('index.js', 'utf-8', function(err, data){
//     console.log(data);
//     fs.readFile('proxy.js', 'utf-8', function(err, data){
//         console.log(data);
//     })
// })


//Promise的例子
// const readFilePromise = require('fs-readfile-promise');
// readFilePromise('index.js')
// .then(function(data){
//     console.log(data.toString());
// })
// .then(function(){
//     return readFilePromise('proxy.js');
// })
// .then(function(data){
//     console.log(data.toString());
// })
// .catch(function(err){
//     console.log(err);
// })

//Generator函数
//协程的方式，多个线程相互协作，完成异步任务。
//First Step 协程A开始执行
//Second Step 协程A执行到一半，进入暂停，执行权转移到协程B
//Third step 一段时间之后，协程B交还执行权
//Fourth step 协程A恢复执行

//Example
// let asyncJob = function(){
//     //... other code
//     let f = yield readfile('index.js');
//     //... other code
// }
//协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续执行。
//每一次调用next方法
//会返回一个对象，表示当前阶段的信息
//value属性是yield语句后面表达式的值,表示当前阶段的值
//done属性是一个布尔值，表示Generator函数是否执行完成
let gen = function*(x){
    let y = yield x + 2;
    return y;
}
let g = gen(1);
debug(g.next());
debug(g.next(2));

//Generator函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。
//而且有两个关键的特性
//next方法返回值的value属性，是Generator函数向外输出数据
//next方法还可以接受参数，向Generator函数体内输入数据, 作为上个阶段异步任务的返回结果 value的值

//throw方法抛出的错误，可以被函数体内的try...catch代码块捕获，实现了出错的代码与错误处理代码的的分离，对于异步编程很重要
let genCatchError = function*(x){
    try{
        let y = yield x+2;
    }catch(e){
        console.log(e);
    }
}

let genCatchIterator = genCatchError(1);
genCatchIterator.next();
genCatchIterator.throw('There is something wrong.');

//异步任务的封装
// let fetch = require('node-fetch');
// let genAsync = function*(){
//     const url = 'https://api.github.com/users/github';
//     let result = yield fetch(url);
//     console.log(result.bio);
// }

// let genAsyncIterator = genAsync();
// let returnData = genAsyncIterator.next();

// returnData.value.then(function(data){
//     return data.json();
// }).then(function(data){
//     genAsyncIterator.next(data);
// });

//Thunk函数
//Thunk函数式自动执行Generator函数的一种方法

//Example
let x = 1;
let thunkTest = function(a, b){
    return b
}

thunkTest(3 * x * x - 2, x);

//传名调用
//将表达式传入函数体，用到它的时候求值
//性能更好，只有在执行的时候求值

//传值调用
//进入函数体之前，就先求值

//
let thunkFun = function(m){
    return m * 2;
}
thunkFun(x + 5);

//===
//
let thunkExample = function(){
    return x + 5;
}
//传名调用的实现，参数部分被替换成了一个函数
let thunkFunDo = function(thunk){
    return thunk() * 2;
}

//Javascript中的Thunk函数 多参数转单参数
let fs = require('fs');
let callback = function(){
    console.log('Callback log.');
}

// fs.readFile('proxy.js', callback);
//Run function via thunk
let rThunk = function(fileName){
    return function(callback){
        return fs.readFile(fileName, callback);
    }
}
const readFileThunk = rThunk('proxy.js')(callback);

//ES5 Version
let thunkES5 = function(fn){
    return function(){
        let args = Array.prototype.slice.call(arguments);
        return function(callback){
            args.push(callback);
            return fn.apply(this, args);  
        }
    }
}

//ES6 Version
let thunkES6 = function(fn){
    return function(...args){
        return function(callback){
            return fn.call(this, ...args, callback);
        }
    }
}

const readFileThunkES5 = thunkES5(fs.readFile)('proxy.js')(callback);
const readFileThunkES6 = thunkES6(fs.readFile)('proxy.js')(callback);

//Use the thunkify npm module
const thunkify = require('thunkify');
const readFileWithThunkify = thunkify(fs.readFile);
// readFileWithThunkify('proxy.js')(function(err, str){

// });

//Generator函数的同步流程管理
//Automatic run generator function
let automaticGen = function*(){
    //
    yield console.log('Automatic running.');
    yield console.log('Automatic running.');
    yield console.log('Automatic running.');
    yield console.log('Automatic running.');
}
let automaticGenIterator = automaticGen();
let automaticGenResult = automaticGenIterator.next();
while(!automaticGenResult.done){
    console.log(automaticGenResult.value);
    automaticGenResult = automaticGenIterator.next();
}


//Generator函数的异步流程管理
 let readFileThunkAsyns = thunkify(fs.readFile);
// let asyncGen = function*(){
//     let result1 = yield readFileThunkAsyns('proxy.js');
//     console.log(result1.toString());
//     let result2 = yield readFileThunkAsyns('index.js');
//     console.log(result2.toString());
// }
// let asyncGenResult = asyncGen();
// let asyncGenResult1 = asyncGenResult.next();
// //利用thunk函数，将回调函数返回到value的值里面，这样就可以在外部处理异步回调了
// asyncGenResult1.value(function(err, data){
//     if(err){
//         throw err;
//     }
//     let asyncGenResult2 = asyncGenResult.next(data);
//     asyncGenResult2.value(function(err, data){
//         if(err){
//             throw err;
//         }
//         asyncGenResult.next(data);
//     });
// });


//Thunk函数的自动流程管理
//Generator runner
let genRunner = function(fun){
    let genIterator = fun();
    let next = function(err, data){
        let genResult = genIterator.next(data);
        if(genResult.done) return;
        genResult.value(next);
    }
    next();
}
// let genRunnerTestFun = function*(){
//     //自动执行的关键是，使用thunk函数进行包装，把回调函数返回给value, 可以转交执行权
//     let rr1 = yield readFileThunkAsyns('index.js');
//     console.log(rr1);
//     let rr2 = yield readFileThunkAsyns('index.js');
//     console.log(rr2);
// }
// genRunner(genRunnerTestFun);

//co模块
//co是一个Generator函数自动执行器
//本质
//利用thunk函数将异步操作在回调函数里交回执行权
//利用Promise对象将异步操作包装成Promise对象，使用then方法交回执行权

//先来看一个Promise对象自动执行的例子
let readFileWithPromise = function(fileName){
    return new Promise(function(resolve, reject){
        fs.readFile(fileName, function(err, data){
            if(err) return reject(err);
            resolve(data);
        });
    });
}
let genWithPromise = function*(){
    let file1 = yield readFileWithPromise('index.js');
    let file2 = yield readFileWithPromise('proxy.js');
    console.log(file1.toString());
    console.log(file2.toString());
}
//Manual run
// let genWithPromiseIterator = genWithPromise();
// genWithPromiseIterator.next().value.then(function(data){
//     genWithPromiseIterator.next(data).value.then(function(data){
//         genWithPromiseIterator.next(data);
//     });
// })

//Auto run
// let promiseAutoRun = function(gen){
//     let genIterator = gen();
//     let nextRun = function(data){
//         let genResult = genIterator.next(data);
//         if(genIterator.done) return genIterator.value;
//         genResult.value.then(function(data){           
//             nextRun(data);            
//         })
//     };
//     nextRun();
// }
// promiseAutoRun(genWithPromise);

//co module
//Generator based constrol flow goodness for nodejs and browser

let co = require('co');
co(function*(){
    let res = yield [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
    ];
    console.log(res);
}).catch();

