//Async
//Async就是Generator函数的语法糖

//传统的Generator函数
const fs = require('fs');
const readFilePromise = function(filename){
    return new Promise(function(resolve, reject){
        fs.readFile(filename, function(err, data){
            if(err){
                return reject(err);
            }
            resolve(data);
        });
    });
}
const genTranitional = function*(){
    let file1 = yield readFilePromise('test/demo.js');
    let file2 = yield readFilePromise('test/testfile.js');
    console.log(file1.toString());
    console.log(file2.toString());
}
let genTranitionalIterator = genTranitional();
genTranitionalIterator.next().value.then(function(data){
    genTranitionalIterator.next(data).value.then(function(data){
        genTranitionalIterator.next(data);
    });
});

// fs.readFile('test/demo.js', function(err, data){
//     console.log(data.toString());
// });


//使用async语法糖改写
//async就是将Generator函数的星号 * 替换成 async
//将yield替换成await
let asyncReadFile = async function(){
    let file1 = await readFilePromise('test/demo.js');
    let file2 = await readFilePromise('test/testfile.js');
    console.log(file1.toString());
    console.log(file2.toString());
}
//直接执行即可
asyncReadFile();

//async函数的优势
//1. 内置的执行器，不用自己写执行器调用next解析结果了，也不用co模块了，直接像普通函数一样执行就可以了
//2. async和await，语义更好理解，async表示函数里有异步操作，await表示后面的表达式需要等待结果
//3. 相比co模块的限制，async函数可以是Promise对象或者原始类型的值
//4. 返回的值是Promise对象，比Generator函数返回的Iterator对象更方便，可以直接用then方法指定下一步操作

//基本用法
//Base example 1
let getStockSymbol = function(name){
    return name;
}
let getStockPrice = function(symbol){
    return symbol;
}
let getStockPriceByName = async function(name){ //async异步操作函数
    const symbol = await getStockSymbol(name); //await表达式需要等待结果
    const stockPrice = await getStockPrice(symbol); //await表达式需要等待结果
    return stockPrice;
}
getStockPriceByName('google').then(function(result){
    console.log(result);
});

//Base example 2
let timeout = function(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve, ms);
    });
}

//Rewrite with async function 
let asyncTimeout = async function(ms){
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

let asyncPrint = async function(value, ms){
    await timeout(ms);
    console.log(value);
}
asyncPrint('Hello Jason.', 2000);


//How to use it?
//函数声明
async function asyncSimpleFunction(){};
//函数表达式
let asyncSimpleFunctionExpress = async function(){};
//对象方法
let asyncObjectMethod = {
    async asyncMethod(){
        //...
    }
}
//类的方法
let caches = {
    open(name){
        return name;
    }
}
class Storage {
    constructor(){
        this.cachePromise = caches.open('avatars');
    }

    async getAvatar(name){
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
    }
}
const storage = new Storage();
storage.getAvatar('jason').then(function(data){
    console.log(data);
});
//箭头函数
const sharpFunction = async ()=>{};


//##async函数
//async函数返回一个Promise对象
//async函数内部的return语句返回的值，会成为then方法回调函数的参数。
let asyncReturnPromise = async function(){
    return 'Async function return the value';
}
asyncReturnPromise().then((value)=>{console.log(value)});
//async函数内部抛出的错误，会导致返回的Promise对象变为reject对象，抛出的错误对象会被catch方法回到函数接收到
// let asyncThrowError = async function(){
//     throw new Error('There is something wrong with the code.');
// }
// asyncThrowError().then(
//     v => console.log(v),
//     e => console.log(e)
// )
//返回的Promise对象必须等到async函数内部的所有的awati后面的Promise对象执行完成才会发生状态改变，除非遇到return语句或者抛出错误，只有async函数内部的异步操作执行完成，才会执行then方法指定的回调函数
let fetch = require('node-fetch');
// let getWebsiteTitle = async function(url){
//     let response = await fetch(url);
//     let html = await response.text();
//     return html.match(/<title>([\s\S]+)<\/title>/i)[1];
// }
// getWebsiteTitle('https://tc39.github.io/ecma262/').then((v)=>{
//     console.log(v);
// });

//##await命令
//await命令后面跟着一个Promise对象，返回该对象的结果，如果不是Promise对象，就直接返回对应的值
let awaitWtihNotPromiseObject = async function(){
    return await 'Return value directly.'
}
awaitWtihNotPromiseObject().then(v => console.log(v));
//thenable object will be see as Promise object
class Sleep {
    constructor(timeout){
        this.timeout = timeout;
    }
    then(resolve, reject){
        const starTime = Date.now();
        setTimeout(
            ()  => resolve(Date.now() - starTime),
            this.timeout
        )
    }
}
(async () => {
    const actualTime = await new Sleep(1000);
    console.log(actualTime);
})();

//Catch the async function error
let throwErrorInAsync = async function(){
    await Promise.reject('Error!');
    await Promise.resolve('Im right.'); //因为错误 async函数返回的Promise对象变成了reject状态，整个async函数都会中断执行，所以这一句不会执行
}
throwErrorInAsync().then((v)=>{
    console.log(v);
}).then(e => {
    console.log(e);
});
//在async函数内部出错继续执行，可以用一个try...catch结构包裹可能抛出错误的await命令，或者在await后面的Promise对象跟一个catch方法，处理前面可能出现的错误
// let throwErrorInAsync = async function(){
//     try{
//         await Promise.reject('Error!'); //无论这个操作是否成功，第二个await都会执行
//     }catch(e){

//     }  
//     await Promise.resolve('Im right.'); 
// }

// let throwErrorInAsync = async function(){
//     await Promise.reject('Error!').catch((e)=>console.log(e)); //无论这个操作是否成功，第二个await都会执行
//     await Promise.resolve('Im right.'); 
// }

//Catch mutilple error
let catchMutipleAsyncError = async function(){
    try{
        const value1 = await 'first step';
        const value2 = await 'second step';
        const value3 = await 'third step';

    }catch(err){
        console.log(err);
    }
}

//Automation retry if the task is failed
// const superAgent = require('superagent');
// const MAX_RETRIES = 3;
// let retryTest = async function(){
//     let i;
//     for(let i=0; i<MAX_RETRIES; i++){
//         try{
//             await superAgent.get('https://google.com/this-throw-an-erro'); //利用await命令后的操作失败会中止后面的代码执行的特性，来控制循环的流程，当操作执行成功后跳出循环。 如果失败，就会被catch语句捕捉，并不会终止执行，进入下轮循环。直到到达最大重试次数。
//             break;
//         }catch(e){
//             console.log('Error:' + e);
//         }
//     }
//     console.log('Retry times:' + i);
// }
// retryTest().then((v)=>{
//     console.log(v);
// });


//##使用注意点
//1.使用try...catch捕捉await可能发生的错误
let somethingToDoAsync = function(){
    return new Promise();
};

let catchAsyncError = async function(){
    try{
        await somethingToDoAsync();
        await somethingToDoAsync();
    }catch(err){
        console.log(err);
    }
}

let catchAsyncErrorMethod2 = async function(){
    await somethingToDoAsync().catch(e=>console.log(e));
}

//2.普通的await命令后的操作会按照次序继发执行,如果多命令如果不存在继发关系，最好让他们同时触发，并行提高性能, 缩短程序执行时间。
let doSomethingAsyncMethod1 = function(){
    return new Promise(function(resolve, reject){

    });
}
let doSomethingAsyncMethod2 = function(){
    return new Promise(function(resolve, reject){

    });
}
//并行执行异步任务方法1
//let [doSomethingAsyncMethod1Result, doSomethingAsyncMethod2Result] = await Promise.all([doSomethingAsyncMethod1(), doSomethingAsyncMethod2()]);
//并行执行异步任务方法2
let doSomethingAsyncMethod1Fun = doSomethingAsyncMethod1();
let doSomethingAsyncMethod2Fun = doSomethingAsyncMethod2();
// let doSomethingAsyncMethod1FunAwait = await doSomethingAsyncMethod1Fun;
// let doSomethingAsyncMethod2FunAwait = await doSomethingAsyncMethod2Fun;

//3.await只能使用在async函数中，在普通函数中会报错
//forEach中的匿名函数就是个例子，所以我们可以使用for of函数进行修改
//方法1 for...of循环
let doActionAsyncInLoop = async function(){
    let docs = [{}, {}, {}];
    for(let doc of docs){
        await somethingToDoAsync(doc);
    }
}
//方法2 Promise.all方法
let doActionAsyncInLoopWithPromise = async function(){
    let docs = [{}, {}, {}];
    let promises = docs.map((doc) => somethingToDoAsync(doc));
    let results = await Promise.all(promises);
    console.log(results);
}

//4.async函数可以保留运行堆栈
//普通函数内部存在异步任务的时候，当函数B运行的时候，函数A不会中断，当B运行完成时，A早就运行结束了,如果B或者C发生错误了 错误堆栈里不会包括A
let simpleFunctionB = function(){};
let simpleFunctionC = function(){};
const simpleFunctionA = () => {
    simpleFunctionB().then(() => simpleFunctionC())
}
//async函数不一样，当它运行时上下文环境都保存着，错误堆栈也不会有遗漏
let b = function(){};
let c = function(){};
const a = async ()=>{
    await b();
    c();
}

//处理Stream文本流，计算文本出现的次数
//利用co模块自动执行Generator函数
//利用Promise.race只处理最先完成的步骤
//利用createReadStream流式读写大文件，分块处理数据
//Stream事件
//data event: 下一块数据已经准备好了
//end event: 整个数据流读取完毕
//error event: 发生错误
const co = require('co');
const stream = fs.createReadStream('test/demo.js');
let demoWordCount = 0;
co(function*(){
    while(true){
        const res = yield Promise.race([
            new Promise(resolve => stream.once('data', resolve)),
            new Promise(resolve => stream.once('end', resolve)),
            new Promise((resolve, reject) => stream.once('error', reject))
        ]);
        //终止循环条件
        if(!res){
            break;
        }
        //Unbind event
        stream.removeAllListeners('data');
        stream.removeAllListeners('end');
        stream.removeAllListeners('error');
        demoWordCount += (res.toString().match(/demo/ig)||[]).length;
    }
    console.log(`The word demo exist for ${demoWordCount} times.`)
});

//async函数原理
let spawn = function(genF){
    return new Promise(function(resolve, reject){
        const gen = genF(); //Iterator Object
        let step = function(nextF){
            let next;
            try {
                next = nextF(); //将yield结果对象赋值给临时对象next
            } catch (error) {
                return reject(error);
            }
            if(next.done){
                return resolve(next.value); //如果整个Iterator遍历完成，将结果传递给resolve方法
            }
            //返回一个状态为fullfilled状态的Promise对象，并且直接调用它的then方法一步步执行step方法，并把返回的值传递给Iterator的next方法，
            Promise.resolve(next.value).then(function(v){
                step(function(){
                    return gen.next(v);
                });
            }).catch(function(error){
                step(function(){
                    gen.throw(error)
                });
            });
        }
        step(function(){
            return gen.next(undefined); //启动执行，指针指向第一个yiled表达式后的命令 next返回的是一个yield表达式的结果对象，带有value和done属性
        });           
    })
}
let asyncPrototype = function(args){

    return spawn(function * (){

    });
}

//与其他异步处理方法的比较
//Example
//实现一个动画控制器方法，当一个动画结束，才能开始后一个动画，如果当中有一个动画出错，就不再往下执行，返回上一个成功执行动画的返回值

let generateAnimations = function(step){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            console.log(`${step} is do animation...`);
            resolve();
        }, 1000);
    })
    
}
let animations = function(){
    return [
        generateAnimations,
        generateAnimations,
        generateAnimations,
        generateAnimations,
    ];
};


//Promise实现
let chainAnimationsPromise = function(element, animations){
    let ret = null;
    let p = Promise.resolve();

    for(let anim of animations){
        p = p.then(function(value){
            ret = value;
            return anim(element);
        });
    } 
    
    return p.catch(function(e){

    }).then(function(){
        return ret;
    });
}
chainAnimationsPromise('h1', animations());

//Generator实现
let chainAnimationGenerator = function(element, animations){
    return spawn(function*(){
        let ret = null;
        try{
            for(let anim of animations){
                ret = yield anim(element);
            }
        }catch(e){

        }
        return ret;
    });
}
chainAnimationGenerator('h2', animations());

//Async实现
let chainAnimationAsync = async function(element, animations){
    let ret = null;
    try {
        for(let anim of animations){
            ret = await anim(element);
        }
    } catch (error) {
        
    }
    return ret;
}
chainAnimationAsync('h3', animations());

// 按顺序完成异步操作
let urls = [
    'https://www.w3schools.com',
    'http://www.sohu.com',
    'http://hao123.com'
];
//Promise
let logInOrder = function(urls){
    //将所有的请求包装成一个
    const allUrlPromise = urls.map((url)=>{
        return fetch(url).then(response => response.text())
    });

    //依次输出Promise对象的结果 变量chain相当于一个临时的局部变量，用来存储每次循环的结果，textPromise是当前的异步请求，
    allUrlPromise.reduce(function(chain, textPromise){
        return chain.then(
            () => textPromise
        ).then(
            text => console.log(text)
        );
    }, Promise.resolve());

}

//logInOrder(urls);

//Async step by step
let logInOrderStepByStep = async function(urls){
    for(const url of urls){
        const response = await fetch(url);
        console.log(await response.text());
    }
}
//logInOrderStepByStep(urls);

//Async all
let logInOrderFast = async function(urls){
    const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
    });
    for (const textPromise of textPromises) {
       console.log(await textPromise); 
    }
}
//logInOrderFast(urls);


// 异步迭代器
// 异步迭代器接口部署在Symbol.asyncIterator属性上面，就是在调用遍历器的next方法时，返回的是一个Promise对象，等这个对象状态改变，然后使用then方法获取值进行处理。
// interface AsyncIterator {
//     next(value) : Promise<IteratorResult>;
//     [optional] throw(value) : Promise<IteratorResult>;
//     [optional] return(value) : Promise<IteratorResult>;
// }

// // 迭代结果
// interface IteratorResult {
//     value : any;
//     done : bool;
// }
//const asyncIterator = createAsyncIterable(['a', 'b']);

const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();

//Promise use
asyncIterator
.next()
.then(iterResult1 => {
    console.log(iterResult1); // { value: 'a', done: false }
    return asyncIterator.next();
})
.then(iterResult2 => {
    console.log(iterResult2); // { value: 'b', done: false }
    return asyncIterator.next();
})
.then(iterResult3 => {
    console.log(iterResult3); // { value: undefined, done: true }
});

//Async function use
async function f() {
    const asyncIterable = createAsyncIterable(['a', 'b']);
    const asyncIterator = asyncIterable[Symbol.asyncIterator]();
    console.log(await asyncIterator.next());
    // { value: 'a', done: false }
    console.log(await asyncIterator.next());
    // { value: 'b', done: false }
    console.log(await asyncIterator.next());
    // { value: undefined, done: true }
  }
  
//Promise.all call all next method
const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();
const [{value: v1}, {value: v2}] = await Promise.all([
    asyncIterator.next(), asyncIterator.next()
]);

console.log(v1, v2); // a b

//Async call next method
async function runner() {
    const writer = openFile('someFile.txt');
    writer.next('hello');
    writer.next('world');
    await writer.return();
}

runner();

//for await of
//用于遍历异步的Iterator接口
// async function f() {
//     for await (const x of createAsyncIterable(['a', 'b'])) {
//       console.log(x);
//     }
//   }
//   // a
//   // b
  
//How to use it.
let body = '';

async function f() {
  for await(const data of req) body += data;
  const parsed = JSON.parse(body);
  console.log('got', parsed);
}

//异步Generator函数
//异步Generator函数就是async函数与Generator函数的结合
// 同步 Generator 函数
function* map(iterable, func) {
    const iter = iterable[Symbol.iterator]();
    while (true) {
      const {value, done} = iter.next();
      if (done) break;
      yield func(value);
    }
  }
  
// 异步 Generator 函数
async function* map(iterable, func) {
const iter = iterable[Symbol.asyncIterator]();
while (true) {
    const {value, done} = await iter.next();
    if (done) break;
    yield func(value);
}
}

//异步 Generator 函数内部，能够同时使用await和yield命令。可以这样理解，await命令用于将外部操作产生的值输入函数内部，yield命令用于将函数内部的值输出。

//异步 Generator 函数出现以后，JavaScript 就有了四种函数形式：普通函数、async 函数、Generator 函数和异步 Generator 函数。请注意区分每种函数的不同之处。基本上，如果是一系列按照顺序执行的异步操作（比如读取文件，然后写入新内容，再存入硬盘），可以使用 async 函数；如果是一系列产生相同数据结构的异步操作（比如一行一行读取文件），可以使用异步 Generator 函数。



//  yield* 语句 
//yield*语句也可以跟一个异步遍历器。

async function* gen1() {
  yield 'a';
  yield 'b';
  return 2;
}

async function* gen2() {
  // result 最终会等于 2
  const result = yield* gen1();
}
//上面代码中，gen2函数里面的result变量，最后的值是2。

//与同步 Generator 函数一样，for await...of循环会展开yield*。

(async function () {
  for await (const x of gen2()) {
    console.log(x);
  }
})();
// a
// b