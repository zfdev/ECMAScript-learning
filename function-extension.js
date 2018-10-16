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

let x = 1;
let scope = function(){
    let x = 3;
    console.log(x);
}
debug(scope());