console.log(...[1, 2, 3]);
const argumentsTest = function (...rest) {
    console.log(rest);
}
argumentsTest(5, 6, 7, 8);


let debug = function(...rest){
    console.log.call(this, ...rest);
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


//------------------------------------------
//-----------------Array--------------------
//------------------------------------------

debug(1, ...[2, 3, 4], 5);

//...扩展运算符 用在参数里 用于将参数序列 转换成数组 类似于arguments
//当扩展运算符用在一个数组前面的时候，将一个数组转换成序列

const maxTestArray = [5,66,88,999];
let maxNumberTest1 = Math.max.apply(null, maxTestArray);
debug(maxNumberTest1);
let maxNumberTest2 = Math.max(...maxTestArray);
debug(maxNumberTest2);

//Clone Array
let testArray1 = [55,5555,55555,888];
let testArray2 = [55,6666,888,9999];
let cloneArray1 = testArray1.concat();
let cloneArray2 = [...testArray1];
testArray1.pop();
debug(testArray1);
debug(cloneArray1);
debug(cloneArray2);

//Merge Array
let testMergeArray1 = [123,456,789];
let testMergeArray2 = [456, 67, 89];
let mergeResult1= testMergeArray1.concat(testMergeArray2);
let mergeResult2 = [...testMergeArray1, ...testMergeArray2]
debug(mergeResult1);
debug(mergeResult2);

//String to Array
const testString = 'jasonzhang';
debug([...testString]);

//Unicode length
debug('x\uD83D\uDE80y'.length);// 4
debug([...'x\uD83D\uDE80y'].length); // 3
debug('\uD83D\uDE80y');

let testMap = new Map(
    [
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ]
);
let mapResult = [...testMap.keys()];
debug(mapResult);

//Generator
let goFuction = function*(){
    yield 1;
    yield 2;
    yield 3;
}
debug([...goFuction()]);

//Array From Method
//Array From 方法用于把array like 和iterable object转换成数组
//Array like object
let arrayLikeObj = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
}

let arrLikeObjResult1 = [].slice.call(arrayLikeObj);
let arrLikeObjResult2 = Array.from(arrayLikeObj);
debug(arrLikeObjResult1);
debug(arrLikeObjResult2);

//Array Of Method

//For of