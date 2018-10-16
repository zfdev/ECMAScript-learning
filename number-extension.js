let testNumber = 0b1101010; //2
let testNumber2 = 0o17; //8
let debug = function(name, ...args){
    if(args.length === 0){
        return console.log(name);
    }
    console.log.call(this, `${name}:${args.join(',')}`);
};
debug(testNumber);
debug(testNumber2);

debug(Number.isInteger(15));
debug(Number.isInteger(15.1));

debug(0.1 + 0.2 === 0.3);

debug(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1);
debug(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1));
debug('The max number is safe or not', Number.isSafeInteger(Number.MAX_SAFE_INTEGER));