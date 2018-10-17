let debug = function (name, ...args) {
    if (args.length === 0) {
        return console.log(name);
    }
    console.log.call(this, `${name}:${args.join(',')}`);
};

// debug('test', 1, 2, 3, 'jason');

// function Point(x = 0, y = 0) {
//     this.x = x;
//     this.y = y;
// }
// const testPoint = new Point();
// debug(testPoint);

// function foo({ x, y = 5 } = {}) {
//     console.log(x, y);
// }

// function bar({ x, y = 5 }) {
//     console.log(x, y);
// }
// debug(foo());
// //debug(bar());

// function m1({ x = 0, y = 0 } = {}) {
//     return [x, y];
// }

// function m2({ x, y } = { x: 0, y: 0 }) {
//     return [x, y];
// }

// debug('m1', m1(5, 6));
// debug('m2', m2({x: 5, y: 6}));

// let x = 1;
// let scope = function(){
//     let x = 3;
//     console.log(x);
// }
// debug(scope());

let functionName = function () {

}
debug(functionName.name);
debug(new Function().name);

// let func1 = v => v;
// let func1 = function(v){
//     return v;
// }

// let func2 = () => 5;
// let func2 = function(){
//     return 5;
// }

// let func3 = (num1, num2) => num1 + num2;
// let func3 = function(num1, num2){
//     return num1 + num2;
// }

// let func4 = () => ({objName: 1, objAttr: 2});
// let func4 = function(){
//     return {
//         objName: 1,
//         objAttr: 2
//     }
// }

let func5 = () => void doesNotReturn();

// const func6 = ({first, last}) => `${first} ${last}`;
// debug(
//     func6({
//         first: 'Jason',
//         last: 'Zhang'
//     })
// );
// const func6 = function(person){
//     return person.first + '' + person.last;
// }

const isEven = n => n % 2 === 0;
const square = n => n * n;

[1, 2, 3].map(function (x) {
    debug(x);
    return x * x;
});

[1, 2, 3].map(x => x * x);

// let sortResult = value.sort(function (a, b) {
//     return a - b;
// });
// let sortResult = value.sort((a, b) => a - b);
const numbers = (...nums) => nums;
numbers(1, 2, 3, 4, 5, 6);

// let foo = function () {
//     setTimeout(() => {
//         console.log('id', this.id);
//     }, 1000);
// };
// let id = 15;
// foo.call({ id: 32 });

// const hasOwnProperty = Object.prototype.hasOwnProperty;
// let hasOwn = function(object, key){
//     return object::hasOwnProperty(key);
// }
// let log = ::console.log;

let factorial = function (n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}

debug(factorial(5));

//Tail call keypoint: Change internal variable to the function parameter. Make the call stack only have one call frame.
function factorialOp(n, total) {
    if (n === 1) return total;
    return factorialOp(n - 1, n * total);
}

debug(factorialOp(5, 1));

// function Fibonacci(n) {
//     if (n <= 1) { return 1 };

//     return Fibonacci(n - 1) + Fibonacci(n - 2);
// }

// Fibonacci(10) // 89
// debug(Fibonacci(100)) // 堆栈溢出

let currying = function(fn, n){
    return function(m){
        return fn.call(this, m, n);
    }
}

const factorialCurrying = currying(factorialOp, 1);
debug(factorialCurrying(5));