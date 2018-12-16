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
    console.log(`The word demo has exist for ${demoWordCount} times.`)
});

//