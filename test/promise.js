 //Promise test
 let promiseTest = Promise.resolve('First promise log');
 promiseTest.then(function(v){
    console.log(v);
    return Promise.resolve('Return a new promise in then method');
 }).then(function(v){
     console.log('call then two times');
     console.log(v);
     new Promise();
 }).catch(function(e){

 });