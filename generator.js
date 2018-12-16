//#Generator
//执行Generator函数会返回一个遍历器对象，也就是说,Generator函数除了状态机，还是一个遍历器对象生成函数，返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态

//##特征
//function关键词与函数名之间有一个*
//函数体内部使用yield表达式，定义了不同的内部装填

//##语法

let debug = function(...msg){
    let now = new Date();
    console.log(now.toString());
    console.log.apply(this, msg);
    console.log('\n');
}

let helloWorldGenerator = function* (){
    yield 'Hello';
    yield 'World';
    return 'Ending';
}

let genResult = helloWorldGenerator(); //调用generator函数之后，该函数并不执行，返回的也不是函数的运行结果，而是一个指向内部状态的指针对象，也就是一个Iterator对象

//必须调用Iterator对象的next方法，使得指针移向下一个状态。
//每次调用next方法，内部指针就从函数头部，或者上一次停下来的地方开始执行，直到遇到下一个yield表达式或者return语句，Generator函数式分段执行的，yield表达式是暂停执行的标记，next方法可以恢复执行。
//每次调用Generator函数生成的Iterator对象，都会返回一个有着value和done两个属性的对象。
debug(genResult.next());
debug(genResult.next());
debug(genResult.next());
debug(genResult.next());

//##yield表达式
//yield表达式是一个暂停标志。当调用next方法时，内部指针会指向yield表达式后面的语句执行，并返回结果，与return不同的地方是yield表达式可以记忆位置，而且可以有很多个yield表达式，而return只能有一个，并且return执行完成之后就退出函数了
//yield表达式必须用在generator函数体的中括号内，也就是带有*函数体内部，并且不能隔着其他函数
//Example
let genTestArr = [1, [[2, 3], 4], [5, 6]];
let flat = function*(arr){
    //循环包含递归 判断当前遍历对象是否是一个Number来判断是非继续执行递归
    let length = arr.length;
    for(let i=0; i<length; i++){
        let item = arr[i];
        if(typeof item !== 'number'){
            yield* flat(item);
        }else{
            yield item;
        }
        
    }
}
for(let f of flat(genTestArr)){
    console.log(f);
}

//如果作为函数参数或者放在赋值表达式的右边，可以不加括号
function * syntxLimit(){
    debug(yield 'a', yield 'b');
    let input = yield;
}
let syntxLimitIterator = syntxLimit();
debug(syntxLimitIterator.next());
debug(syntxLimitIterator.next());
debug(syntxLimitIterator.next());

//与Iterator的关系
//把Generator赋值给对象的Symbol.iterator属性，使得该对象有Iterator接口
//Example
let iterableObj = {

};
iterableObj[Symbol.iterator] = function*(){
    yield 1;
    yield 2;
    yield 3;
}

//使得对象可以被...运算符遍历
debug(...iterableObj);

//##Next方法
//next方法可以带一个参数，参数的值会被当做上一个yield表达式的返回值
//Example
//通过next方法的参数，有办法在Generator函数开始运行之后，继续向函数体内注入值。在函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数的行为。
let limitedLoop = function*(){
    for(let i = 0; true; i++){
        let reset = yield i;
        if(reset){
            i = -1;
        }
    }
}
let canStopIterator = limitedLoop();
debug(canStopIterator.next());
debug(canStopIterator.next());
debug(canStopIterator.next());
debug(canStopIterator.next());
debug(canStopIterator.next());
debug(canStopIterator.next());
debug(canStopIterator.next(true));

//第一次使用next方法时，传递的参数是无效的
//第一个next是用来启动遍历器对象的，所以不用带有参数
//如果想在第一次调用next方法时，就能够传入参数，请用函数再包裹一层，内部先调用一次next再把Iterator对象返回出来

let dataConsumer = function*(){
    console.log('Started');
    console.log(`1. ${yield}`);
    console.log(`2. ${yield}`);
    return 'Ending';
}
let dataIterator = dataConsumer();
debug(dataIterator.next());
debug(dataIterator.next('a'));
debug(dataIterator.next('b'));
debug(dataIterator.next());

//##for of loop
//for of循环可以自动遍历 Generator函数生成的Iterator对象，不再需要next方法

let forOfLoopTest = function*(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
for(let v of forOfLoopTest()){
    console.log(v);
}
//一旦next方法返回的对象的done属性为true for...of循环就会终止，且不包含返回对象。

//斐波那契额数列
let fibonacci = function *(){
    let [prev, curr] = [0, 1];
    for(;;){
        yield curr;
        [prev, curr] = [curr, prev + curr]
    }
}

for(let n of fibonacci()){
    if(n > 1000){
        break;
    }
    console.log(n);
}

//Loop any object
let objectEntries = function*(obj){
    let propKeys = Reflect.ownKeys(obj);

    for(let propKey of propKeys){
        yield [propKey, obj[propKey]];
    }
}

let anyObj = {
    first: 'Jason',
    last: 'Zhang'
}

//另一种写法
//anyObj[Symbol.iterator] = objectEntries;

for(let [key, value] of objectEntries(anyObj)){
    console.log(`${key}:${value}`);
}

let numbers = function*(){
    yield 1;
    yield 2;
    return 3;
    yield 4;
}

debug([...numbers()]);
debug(Array.from(numbers()));
let [x, y] = numbers();
debug([x, y]);

for(let n of numbers()){
    console.log(n);
}

//##Generator.prototype.throw()
//throw方法可以在函数体外抛出错误，然后再Generator函数体内捕获，抛出的错误要想被Generator内部的try catch捕获，需要至少执行一次next
let genThrowTest = function*(){
    try{
        yield;
    }catch(e){
        console.log('Inner catch', e)
    }
}
let genThrowTestIterator = genThrowTest();
genThrowTestIterator.next();

try{
    genThrowTestIterator.throw('a');
    genThrowTestIterator.throw('b');

}catch(e){
    console.log('Outter catch', e);
}
//捕获多个yield表达式的错误，只使用一个try catch语句 在Generator函数体内部处理每一个错误

//##Generator.prototype.return()
//Generator函数返回的遍历器对象Iterator，只有一个return方法，可以返回给定的值，并且终结Generator函数
let genReturnTest = function*(){
    yield 1;
    yield 2;
    yield 3;
}
let genReturnTestIterator = genReturnTest();
debug(genReturnTestIterator.next());
debug(genReturnTestIterator.return('foo'));
debug(genReturnTestIterator.next());
//如果Generator函数内部有try...finally代码块，return方法会推迟到finally执行完成再执行，return方法会触发finally代码先执行

//##yield*表达式
//用来在一个Generator函数里执行另一个Generator函数
//Example
let genInGenCallA = function*(){
    yield 'a';
    yield 'b';
}
let genInGenCallB = function*(){
    yield 'x';
    yield* genInGenCallA();
    yield 'y';
}
for(let v of genInGenCallB()){
    console.log(v);
}
//yield*表达式后面的Generator函数，等于在Generator函数内部部署了一个for...of循环
//任何数据结构只要有Iterator接口，都可以被yield*遍历
let yieldSyntxGen = function*(){
    yield* ['a', 'b', 'c'];
}
let yieldSyntxGenResult = yieldSyntxGen();
debug(yieldSyntxGenResult.next());
debug(yieldSyntxGenResult.next());
debug(yieldSyntxGenResult.next());
debug(yieldSyntxGenResult.next());

//Example扁平化嵌套数组
const tree = ['a', ['b', 'c'],['d','e']];
let iterTree = function*(tree){
    if(Array.isArray(tree)){
        for(let i=0; i<tree.length; i++){
            yield* iterTree(tree[i]);
        }
    }else{
        yield tree;
    }
}
for(let x of iterTree(tree)){
    console.log(x);
}

//遍历二叉树
let Tree = function(left, label, right){
    this.left = left;
    this.label = label;
    this.right = right;
}

let makeTwoChildTree = function(array){
    if(array.length == 1){
        return new Tree(null, array[0], null);
    }
    return new Tree(makeTwoChildTree(array[0]), array[1], makeTwoChildTree(array[2]));
}

let towChildTreeInstance = makeTwoChildTree(
    [
        [
            ['a'],
            'b',
            ['c']
        ],
        'd',
        [
            ['e'],
            'f',
            ['g']
        ]
    ]
);
let inorder = function*(t){
    if(t){
        yield* inorder(t.left);
        yield t.label;
        yield* inorder(t.right);
    }
}
let result = [];
for(let node of inorder(towChildTreeInstance)){
    result.push(node);
}
console.log(result);

//##作为对象属性的Generator函数
let objectWithGenerator = {
    * myGeneratorMethod(){
        //...
    }
}

//##Generator函数的this
//Generator函数返回的总是遍历器对象，所以可以正确调用
let g = function*(){}
g.prototype.hello = function(){
    return 'Hi';
}
let obj = g();
debug(obj instanceof g);
debug(obj.hello());

//##Generator与状态机
let clock = function*(){
    while(true){
        console.log('Tick');
        yield;
        console.log('Tock');
        yield;
    }
}
let clockResult = clock();
debug(clockResult.next());
debug(clockResult.next());
debug(clockResult.next());
debug(clockResult.next());
debug(clockResult.next());

//##Generator与协程


//##Generator与上下文


//##应用
//###异步操作的同步表达
let showLoadingScreen = function(){};
let hideLoadingScreen = function(){};
let loadUIDataAsynchronously = function(){};
let loadUI = function(){
    showLoadingScreen();
    yield loadUIDataAsynchronously();
    hideLoadingScreen();
}
let loading = loadUI();
//loading data
loading.next();
//
loading.next();

//###控制流管理
//同步
//传统callback
step1(function(value1){
    step2(value1, function(value2){
        step3(value2, function(value3){
            step4(value3, function(value4){
                
            })
        })
    })
})
//Promise改写
Promise.resolve(step1)
    .then(step2)
    .then(step3)
    .then(step4)
    .then(function(value4){

    })
    .done()

//Generator改写
let longRunningTask = function(value1){
    try{
        let value2 = yield step1(value1);
        let value3 = yield step2(value2);
        let value4 = yield step3(value3);
        //...
    }catch(e){

    }
}
let scheduler = function(task){
    let taskObj = task.next(task.value);
    if(!taskObj.done){
        task.value = taskObj.value;
        scheduler(task);
    }
}
scheduler(longRunningTask(initialValue));

//多步骤依次执行的同步任务
let steps = [step1Func, step2Func, step3Func];
let iterateStep = function*(steps){
    for(let i=0; i<steps.length; i++){
        let step = steps[i];
        yield step();
    }
}

let jobs = [job1, job2, job3];
let iterateJobs = function*(jobs){
    for(let i=0; i<jobs.length; i++){
        let job = jobs[i];
        yield* iterateStep(job.steps);
    }
}

for(let step of iterateJobs(jobs)){
    console.log(step.id);
}

//for...of本质上是一个while循环
//let it = iterateJobs(jobs);
//let res = it.next();
//while(!res.done){
//let result = res.value;
// res = it.next();
//}

//###部署Iterator接口
let iterEntries = function(obj){
    let keys = Object.keys(obj);
    for(let i=0; i<keys.length; i++){
        let key = keys[i];
        yield [key, obj[key]];
    }
}
let myObj = {
    foo: 3,
    bar: 7
}
for(let [key, value] of iterEntries(myObj)){
    console.log(key, value)
}

//###作为数据结构
