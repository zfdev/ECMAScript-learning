let regExp = new RegExp('jason', 'i');
let debug = console.log;
debug(regExp.test('JasonZhang'));

debug(/^\uD83D/u.test('\uD83D\uDC2A'));
debug('\uD83D');
debug('\uD83D\uDC2A');

debug('\u{61}');
debug(/\u{61}/u.test('a'));

let codePointLength = function(char){
    var result = char.match(/[\s\S]/gu);
    return result ? result.length : 0;
}

let s = '𠮷𠮷';
debug(s.length);
debug(codePointLength(s));
