console.log(...[1, 2, 3]);
const argumentsTest = function (...rest) {
    console.log(rest);
}
argumentsTest(5, 6, 7, 8);

let debug = function(...rest){
    console.log.call(this, rest);
}

function insertSimple(value){
    return {
        into: function(array){
            return {
                after: function(afterValue){
                    array.splice(array.indexOf(afterValue) + 1, 0, value);
                    return array;
                }
            }
        }
    }
}

let insertSimpleResult = function(){
    return insertSimple(5).into([4,6]).after(4);
};
debug(insertSimpleResult());

let insertSharp = (value) => ({
    into: (array) => ({
        after: (afterValue) => {
            array.splice(array.indexOf(afterValue)+1, 0, value)
            return array;
        }
    })
});
let insertSharpResult = function(){
    return insertSharp(8).into([7,9]).after(7);
}
debug(insertSharpResult());
//Pipeline function