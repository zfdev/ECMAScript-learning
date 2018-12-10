//#Set
//类似于数组，但是成员的值都是唯一的
const s = new Set();
const array = [1, 2, 3, 4, 5, 6, 6, 6, '6'];
array.forEach(x => s.add(x));
console.log(s);
//##Array delete same value
let singelArray = [...new Set(array)];
console.log(singelArray);
let dedupe = function(array){
    return Array.from(new Set(array));
}

//## Property 
//### size
console.log(s.size);
//### constructor

//## Method
//### add
s.add(666).add(666).add(666);
console.log(s);

//### delete
s.delete('6');

//### has
s.has(666);
console.log(s);

//### clear
// s.clear();
console.log(s);

//### values
console.log(s.values());

//### keys
console.log(s.keys());

//### entries
console.log(s.entries());

//### forEach
s.forEach((value, key) => console.log(`${key}:${value}`));

//### loop
let newSet1 = new Set([...s].map( x => x*2));
console.log(newSet1);

let newSet2 = new Set([...s].filter(x => x*2));
console.log(newSet2);

let testSet1 = new Set([1, 2, 3]);
let testSet2 = new Set([4, 3, 2]);

//### Union
let union = new Set([...testSet1, ...testSet2]);
console.log(union);

//### Intersect
let intersect = new Set([...testSet1].filter(x => testSet2.has(x)));
console.log(intersect);

//### Difference
let difference = new Set([...testSet1].filter( x => !testSet2.has(x)))
console.log(difference);

//#WeakSet
//适用于dom绑定 弱引用
const a = [[1, 2], [3, 4]];
let ws = new WeakSet(a);
console.log(ws);

ws.add([5, 6]);
console.log(ws.has([1, 2]));

//#Map
//键值对集合 Hash结构
const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content');
console.log(m.get(o));

//##Property
//###Size
console.log(m.size);

//##Method
//### Set
m.set(256, 'bit');
console.log(m);

//### Get
console.log(m.get(o));

//### Has
console.log(m.has(o));

//### Delete
//m.delete(256);
console.log(m);

//###keys
console.log(m.keys());

//###values
console.log(m.values());

//###entries
console.log(m.entries());

//###forEach
m.forEach( (value, key, map) => {
    console.log(`Key:${key}, Value:${value}`);
});

//###Map -> Array
let map2Arr = function(obj){
    return [...obj];
}

//###Array -> Map
//Contructor

//###Map -> Object
let strMap2Obj = function(strMap){
    let obj = Object.create(null);
    strMap.forEach((value, index) => {
        obj[index] = value;
    });
    return obj;
}

//###Object -> Map
let obj2StrMap = function(obj){
    let map = new Map();
    for(let k of Object.keys(obj)){
        map.set(k, obj[k]);
    }
    return map;
}

//###Map -> Json
return JSON.stringify([...map]);

//###Json -> Map
return obj2StrMap(JSON.parse('jsonStr'));


//

//WeakMap
//Dom节点作为键名的情况，不会有内存泄漏的问题