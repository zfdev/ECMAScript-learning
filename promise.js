//#Promise（承诺）是异步编程的一种解决方案 
//Promise对象是一个容器 里面保存着某个未来才会结束的事件
//##特点：
//对象状态不受外界影响。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。异步操作的三个状态：pending(进行中) / fulfilled（已成功）/ rejected（已失败）
//一旦状态改变，就不会再变，任何时候都可以得到这个结果

//##优点：可以将一部操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。

//##不足：无法取消Promise 一旦新建就会立即执行 无法中途取消 不设置回调函数 Promise内部发生错误 不会反应到外部，当处于pending状态时 无法得知当前发展到哪一个阶段

//##Create a promise object
//参数是一个函数 函数带有内置的两个参数resolve和reject
//在函数内部调用异步操作 并在异步操作成功或者失败代码处调用resolve和reject同时把结果通过参数传递出去，之后再通过实例下的then方法里的回调函数处理接收结果并处理。
// const promise = new Promise(function(resolve, reject){
//     // if(/* successful */){
//     //     resolve(value); //当状态从pending变成resolved 异步操作成功时调用，将异步操作的结果作为参数传出去
//     // }else{
//     //     reject(error); //当状态从pending变成rejected 异步操作失败时，将异步操作报出的错误，作为参数传递出去。
//     // }
// });

//##实例生成之后，可以使用then方法指定resolved状态和rejected状态的回调函数
// promise.then(function(value){
//     //sucess

// }, function(error){
//     //failure

// });

//
let timeout = function(ms){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done')
    });
}

// timeout(1000).then((value) => {
//     console.log(value);
// })

//##同步任务执行完成之后才会执行promise对象中的异步回调函数
let promise = new Promise((resolve, reject) => {
    console.log('Promise created');
    resolve();
})

promise.then(function(){
    console.log('resolved.');
});

console.log('Hi!');

//##异步加载图片
let loadImageAsync = function(url){
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = function(){
            resolve(image)
        }
        image.onerror = function(){
            reject(new Error(`Could not load image at ${url}`))
        }
        image.src = url;
    })
}

//##AJAX
// const getJSON = function(url){
//     const promise = new Promise((resolve, reject) => {
//         const handler = function(){
//             if(this.readyState !== 4){
//                 return;
//             }
//             if(this.status === 200){
//                 resolve(this.response);
//             }else{
//                 reject(new Error(this.statusText));
//             }
//         }

//         const client = new XMLHttpRequest();
//         client.open('GET', url);
//         client.onreadystatechange = handler;
//         client.responseType = 'json';
//         client.setRequestHeader('Accept', 'application/json');
//         client.send();
//     });
//     return promise;
// }

// getJSON('/posts.json').then(function(json){
//     console.log('Contents: ' + json);
// }, function(error){
//     console.error('Something goes wrong!', error);
// });

//##Promise object call promise object
const p1 = new Promise(function(resolve, reject){
    setTimeout(() => {
        reject(new Error('P1 failed'))
    }, 3000);
})

const p2 = new Promise((resolve, reject)=>{
    console.log('p2 is called')
    setTimeout(() => {
        resolve(p1)
    }, 1000);
});

p2.then(result => console.log(result)).catch(error=> console.log(error));

//##Promise.prototype.then()
//调用完resolve或者reject之后，Promise的使命就完成了，后续操作应该放到then方法里面
//then方法是定义在原型对象Promise.prototype上的，它的作用就是为Promise实例添加状态改变时的回调函数
//then方法支持两个参数 第一个参数是resolved状态的回调函数， 第二个参数是rejected状态的回调函数，一般来说，rejected的回调函数通常不需要，使用Promise.prototype.catch方法捕获错误就好了，所以一般情况下then方法里只写一个resolved状态的回调函数就可以了
//then方法返回的是一个新的Promise实例，它的作用是为 Promise实例添加状态改变时的回调函数

//then方法的链式调用
//前一个方法的回调函数返回的还是一个Promise对象，后一个函数继续使用then调用
// getJSON('/post/1.json').then(function(post){
//     return getJSON(post.commentURL)
// }).then(function(comments){
//     console.log(`resovled: ${comments}`);
// }, function(err){
//     console.log(`rejected: ${err}`);
// })


//##Promise.prototype.catch()
//Promise.prototype.catch是.then(null, rejection)的别名 用于指定发生错误时的回调函数
//建议Promise实例之后要跟一个catch方法，可以处理Promise内部的错误。
//
// getJSON('/post.json').then(function(posts){
//     //success
//     console.log(posts);
// }).catch(function(){
//     //failed
//     console.log('Something is wrong', error)
// });

const promise1 = new Promise(function(resolve, reject){
    try{
        throw new Error('Promise 1 error');
    }catch(e){
        reject(e);
    }
});
promise1.catch(function(error){
    console.log(error);
})

const promise2 = new Promise(function(resolve, reject){
    reject(new Error('Promise 2 error'))
})
promise2.catch(function(error){
    console.log(error);
})

//Promise对象抛出的错误不会传递到外层代码，不会退出进程，终止脚本执行
const someAsyncThing = function(){
    return new Promise(function(resolve, reject){
        resolve(x + 2);
    });
}
someAsyncThing().then(function(){
    console.log('The program is still running.')
})

setTimeout(() => {
    console.log('Settimeout is still running.');
}, 2000);


//##Promise.prototype.finally()
//不管Promise对象最后状态如何，都会执行操作
//Promise原理本质上是特殊的then方法
//无论Promise是fulfilled还是rejected 回调函数都会执行 而且都会有返回值
Promise.prototype.finally = function(callback){
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
            throw reason;
        })
    );
}


//##Promise.all()
//用于将多个Promise实例，包装成一个新的Promise实例
//接收一个promise实例数组作为参数，或者具有iterator接口的对象，但是对象成员必须都是Promise实例
//当所有的实例状态都是fulfilled，返回的新的Promise实例的状态才会编程fulfilled,此时将传入的实例的返回值组成一个数组，传递给新的Promise实例的回调函数
//只要其中有一个实例的状态被rejected，返回的新的Promise实例的状态就会编程rejected,此时第一个reject的实例的返回值，会传递给新的实例的回调函数。
//关于新的实例中catch方法的处理，只要作为参数的Promise实例定义了自己的catch方法，返回的Promise实例的catch方法就不会被触发

//Example
const databaePromise = connectDatabase();
const booksPromise = databasePromise.then(findAllBooks);
const usePromise = databasePromise.then(getCurrentUser);
Promise.all([
    booksPromise,
    usePromise
]).then(([books, user]) => pickTopRecommentations(books, user));

//##Promise.race()
//用于将多个Promise实例，包装成一个新的Promise实例
//这个方法和它的名字一样，race就是比赛的意思，只要实例中有一个状态改变，返回的实例的状态就改变，那个率先改变的Promise的实例的返回值，就会传递给新的Promise实例的回调函数

//Example
const getDataTimeLimit = Promise.race([
    fetch('/data-api-may-take-a-while'),
    new Promise(function(resolve, reject){
        setTimeout(() => reject(new Error('request timeout')), 50000)
    })
])
getDataTimeLimit.then(console.log).catch(console.error).finally(console.log);


//##Promise.resolve()
//将现有的对象转换成Promise对象
//Promise.resolve('foo')
//new Promise(resolve => resolve('foo'))
//转换的四种情况
//1.参数是一个Promise实例，不做任何修改，直接返回
//2.参数是一个thenable对象，带有then方法的对象，
//3.参数是一个不具有then方法的对象，Promise.resolve返回一个新的Promise对象，状态为resolved
//4.不带有任何参数，返回一个状态为resolved的Promise对象
//立即resolve的Promise对象，是在本轮event loop结束时

//下一轮时间循环开始
setTimeout(function(){
    console.log('three')
}, 0);

//本轮时间循环结束
Promise.resolve().then(function(){
    console.log('two');
})

//立即执行
console.log('one');


//##Promise.reject()
//返回一个新的Promise实例，该实例的状态为rejected

//##Example
//与Generator结合


//##Promise.try()
//同时捕获所有同步和异步的错误