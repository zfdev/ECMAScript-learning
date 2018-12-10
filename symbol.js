//独一无二的属性名
let s = Symbol();
let object = new Object();

let sFoo1 = Symbol('foo');
let sFoo2 = Symbol.for('foo');
//用于生成唯一值，而且不需要调用，或者外部调用
//
Object.defineProperty(object, s, {
    value: 'foobar'
})
console.log(object);
console.log(Reflect.ownKeys(object));

console.log(sFoo1);
console.log();