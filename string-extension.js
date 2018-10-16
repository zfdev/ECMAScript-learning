// console.log('\u0061');
// console.log('\u20BB7');
// console.log('\u{20BB7}');
// console.log('\u{1F680}' === '\uD83D\uDE80');
//Javascript char
// console.log('\z');
// console.log('\172');
// console.log('\x7A');
// console.log('\u007A');
// console.log('\u{7A}');

 const debug = console.log;
// let mutipleChar = '\uD842\uDFB7\u0061';
// console.log(mutipleChar);
// console.log(mutipleChar.length);
// console.log(mutipleChar.codePointAt(0));
// console.log(mutipleChar.codePointAt(1));
// console.log(mutipleChar.codePointAt(2));

// for (let ch of mutipleChar) {
//     console.log(ch.codePointAt(0).toString(16));
// }

// let is32Bit = function(char){
//     return char.codePointAt(0) > 0xFFFF;
// }

// console.log(is32Bit(mutipleChar));
// console.log(is32Bit('A'));

// for(let char of 'JasonZhang'){
//     console.log(char);
// }

// '\u01D1'.normalize() === '\u004F\u030C'.normalize()

let testString = 'Hello Jason';
debug(testString.startsWith('H'));
debug(testString.endsWith('n'));
debug(testString.includes('o'));

testString = testString.repeat(10);
debug(testString);

debug('1'.padStart(10, '0'));

let templateString1 = `In JavaScript '\n' is a line-feed.`;
debug(templateString1);

let templateString2 = `In JavaScript this is
not legal.`;
debug(templateString2);

let name = "Bob", time = "today";
let templateString3 = `Hello ${name}, how are you ${time}?`;
debug(templateString3);

let {tempOa, tempOb} = {
    tempOa: 1,
    tempOb: 2
}
debug(`${tempOa} + ${tempOb}`);

let templateFunc = function(){
    return 'Jason Zhang';
}
debug(`Hello, my name is${templateFunc()}`);

const htmlStringTmpl = addrs => `
    <table>
    ${
        addrs.map(addr=> `
            <tr><td>${addr.first}</td></tr>
            <tr><td>${addr.last}</td></tr>
        `).join('') 
    }
    </table>
`;

const data = [
    {
        first: 'Jason',
        last: 'Zhang'
    },
    {
        first: 'Amy',
        last: 'Chen'
    }
];
console.log(htmlStringTmpl(data));