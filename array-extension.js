console.log(...[1, 2, 3]);
const argumentsTest = function (...rest) {
    console.log(rest);
}
argumentsTest(5, 6, 7, 8);