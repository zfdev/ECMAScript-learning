// let [a, b, c] = [1, 2, 3];
// console.log(a);
// console.log(b);
// console.log(c);

// let [head, ...tail] = [1, 2, 3, 4, 5];
// console.log(head);
// console.log(tail);

// let [x, y, ...z] = ['a'];
// console.log(x);
// console.log(y);
// console.log(z);

//let [foo] = {};

// function* fibs(){
//     let a = 0;
//     let b = 1;
//     while(true){
//         yield a;
//         [a, b] = [b, a + b];
//     }
// }

// let [first, second, third, fourth, fifth, sixth] = fibs();
// console.log(sixth);

// let [defaultValue = 1] = [undefined];
// console.log(defaultValue);

// let {foo, bar} = { foo: 'foo', bar: 'bar'};
// console.log(foo);
// console.log(bar);

// let {foo: baz} = { foo: 'foo', bar: 'bar'};
// console.log(baz);

// const [a, b, c, d, e] = 'hello';
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);
// console.log(e);

// let {length: len} = 'hello';
// console.log(len);

// let { toString: s} = 123;
// console.log(s === Number.prototype.toString);

// let { toString: n} = true;
// console.log(n === Boolean.prototype.toString);

// function add([a, b]){
//     return a + b;
// }
// console.log(add([1, 2]));

// let testArr = [[1, 2], [3, 4]].map(([a, b]) => a + b);
// console.log(testArr);

// function move({
//     x = 0,
//     y = 0
// } = {}){
//     return [x, y];
// }

// console.log(move({
//     x: 3, 
//     y: 8
// }))

// let exchangeX = 1;
// let exchangeY = 2;
// [exchangeX, exchangeY] = [exchangeY, exchangeX];
// console.log(exchangeX);
// console.log(exchangeY);

// function returnArray(){
//     return [4, 5, 6];
// }
// let [a, b, c] = returnArray();
// console.log(a);
// console.log(b);
// console.log(c);

// function returnObj(){
//     return {
//         foo: 'foo',
//         bar: 'bar'
//     }
// }

// let {foo, bar} = returnObj();
// console.log(foo);
// console.log(bar);

// let jsonData = {
//     id: 32,
//     status: 'OK',
//     data: [
//         256,
//         1024
//     ]
// };

// let {id, status, data: number } = jsonData;
// console.log(id, status, number);

let ajax = function(url, {
    async = true,
    beforeSend = function(){},
    cache = true
}={}){
    
}

const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

// for(let [key, value] of map){
//     console.log(key + ' is ' + value);
// }

for(let [,value] of map){
    console.log(value);
}

//const {SourceMap, SourceNode} = require('source-map');
//const SourceMap = require('source-map').SourceMap;
//const SourceNode = require('source-map').SourceNode;

const 