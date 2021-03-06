# Event Loop 事件循环机制 js的运行机制

[[toc]]

> 概念：当主线程运行的时候,JS会产生堆(如变量的定义)和栈(执行栈)
  主线程中调用的webaip所产生的异步操作(dom事件、ajax回调、定时器等)只要产生结果，就把这个回调塞进“任务队列”中等待执行。
  当主线程中的同步任务执行完毕，系统就会依次读取“任务队列”中的任务，将任务放进执行栈中执行。
  执行任务时可能还会产生新的异步操作，会产生新的循环，整个过程是循环不断的。


### 例1、以下代码输出结果 Promise
```javascript
setTimeout(function() { 
  console.log(1)//第二个宏任务
}, 0);
new Promise(function executor(resolve) { 
  console.log(2);//同步执行
  for( var i=0 ; i<10000 ; i++ ) {
    i == 9999 && resolve();
  }
  console.log(3);//同步执行
}).then(function() {
  console.log(4); //微任务
});
console.log(5); //第一个宏任务
//2,3,5,4,1
```

+ 1、宏任务

**setTimeout**，**setInterval**，**setImmediate**， I/O，promise中的executor，script；
+ 2、微任务

原生**Promise**，**Promise.then**,(有些实现的promise将then方法放到了宏任务中)，MutationObserver， MessageChannel，process.nextTick

::: warning
（1）、出现async/await不要慌，记住async正常执行，await后面的函数相当于promise.then，是一个微任务
（2）、process.nextTick和Promise的回调函数，追加在本轮循环，即同步任务一旦执行完成，就开始执行它们，

开发过程中如果想让异步任务尽可能快地执行，可以使用process.nextTick来完成
特别的：setImmediate比setTimeout先执行，process.nextTick优先级高于Promise.then
:::

任务队列实际上有两个，一个是宏任务队列，一个是微任务队列，当主线程执行完毕，如果微任务队列中有微任务，则会先进入执行栈，当微任务队列没有任务时，才会执行宏任务的队列。


::: warning 宏任务和微任务
执行代码过程：先执行宏任务，清空微任务再执行下一个宏任务
当前宏任务执行完了，清空微任务再开始下一个宏任务。
setTimeout是一个宏任务，promise里面的代码是同步执行的，then中的代码是一个微任务。当前宏任务执行完了，就执行微任务里面的，微任务清空后，执行下一个宏任务即setsetTimeout第一个参数的内容

setTimeout 属于 宿主环境发出的宏任务，promise 是js引擎发出的微任务 

:::

### 例2、以下代码会输出什么？ Promise
```javascript
      setTimeout(function () {
        console.log(1)
      }, 0)
      setTimeout(function () {
        console.log('999999')
      }, 10)
      let a = function () {
        console.log(2)
        return new Promise(function (resolve) {
          resolve(3)
        }).then(function (data) {
          console.log(data)
        })
      }
      async function fun () {
        let c = await a()
        new Promise(function (resolve) {
          console.log(4)
          for (var i = 0; i < 10000; i++) {
            i === 9999 && resolve()
          }
          console.log(5)
        }).then(function (data) {
          console.log(6)
        })
      }
      fun()
      console.log(7);
```

**2,7,3,4,5,6,1,9999**
+ why?
await等待执行完毕后，才能执行后面的代码
awiat a()相当于一个Promise
[async和await的使用点击查看](https://blog.csdn.net/sinat_36146776/article/details/89400828)
>
>async和await，promise的代码是同步执行
>then中的代码是微任务
>serTimeout异步执行，
* 总结
当前宏任务执行完了，清空微任务再开始下一个宏任务。
setTimeout是一个宏任务，promise里面的代码是同步执行的，then中的代码是一个微任务。当前宏任务执行完了，就执行微任务里面的，微任务清空后，执行下一个宏任务即setsetTimeout第一个参数的内容



### 例3、求输出结果 fetch  Promise
```javascript
  fetch('...').then(res=>{
    console.log(1)
  })
  console.log(2);
  function getValue () {
    console.log(3)
    return new Promise(resolve => {
      console.log(4)
      fetch('...').then(res=>{
        console.log(5)
        resolve(res)
      })
    })
  }
  getValue().then(res=>{
    console.log(6);
  })
  //fetch('...') 表示http请求
  //2,3,4,1,5,6
```

### 例4、Promise and setTimeout
```javascript
  Promise.resolve().then(()=>{
    console.log('1')
    setTimeout(()=>{
      console.log('2')
    },0)
  })

  setTimeout(()=>{
    console.log('3')
    Promise.resolve().then(()=>{
      console.log('4')
    })
  },0)
  //1,3,4,2
```
==个人理解：==
+ 执行1的时候同时将宏任务3添加到执行队列中，
+ 再将宏任务2添加到执行队列中，
+ 将宏任务3从执行队列中取出到执行栈中执行，执行3后，会去执行其微任务4，
+ 任务3执行完毕后，最后再将宏任务2中取出到执行栈中执行
>宏任务1，执行完毕后再去执行宏任务2，当宏任务1中如果有Promise这种微任务，则会先执行微任务，再执行宏任务2；
>[网上优秀的讲解](https://juejin.im/post/5b498d245188251b193d4059)
[这个讲解也不错](https://www.cnblogs.com/hity-tt/p/6733062.html)
+ 上面的理解，理解通透了其实也就差不多了，以下是进化版本
### 例5、promise的回调地狱
>https://juejin.im/post/5c9a43175188252d876e5903
```javascript
//1-1、求结果
new Promise((resolve,reject)=>{
    console.log("1")
    resolve()
}).then(()=>{
    console.log("2")
    new Promise((resolve,reject)=>{
        console.log("3")
        resolve()
    }).then(()=>{
        console.log("4")
    }).then(()=>{
        console.log("5")
    })
}).then(()=>{
    console.log("6")
})
//1,2,3,4,6,5

//1-2 改进，求结果
new Promise((resolve,reject)=>{
    console.log("1")
    resolve()
}).then(()=>{
    console.log("2")
    return new Promise((resolve,reject)=>{
        console.log("3")
        resolve()
    }).then(()=>{
        console.log("4")
    }).then(()=>{
        console.log("5")
    })
}).then(()=>{
    console.log("6")
})
//1,2,3,4,5,6
//[解析]用了return后这里Promise的第二个then相当于是挂在新Promise的最后一个then的返回值上。
//因为return是同步任务，所以比6先执行

//2、理解这个
new Promise((resolve,reject)=>{
  console.log("1")
  resolve()
}).then(()=>{
  console.log("2")
}).then(()=>{
  console.log("3")
})
new Promise((resolve,reject)=>{
  console.log("4")
  resolve()
}).then(()=>{
  console.log("5")
}).then(()=>{
  console.log("6")
})
new Promise((resolve,reject)=>{
  console.log("7")
  resolve()
}).then(()=>{
  console.log("8")
}).then(()=>{
  console.log("9")
})
//147258369
//平行世界的then先进先出

// 3、改进-更复杂的
new Promise((resolve,reject)=>{
  console.log("1")
  resolve()
}).then(()=>{
  console.log("2")
  new Promise((resolve,reject)=>{
    console.log("3")
    resolve()
  }).then(()=>{
    console.log("4")
  }).then(()=>{
    console.log("5")
  })
}).then(()=>{
  console.log("6")
})
new Promise((resolve,reject)=>{
  console.log("7")
  resolve()
}).then(()=>{
  console.log("8")
}).then(()=>{
  console.log("9")
})
//1,7,2,3,8,4,6,9,5

new Promise((resolve, reject) => {
  console.log("1")
  resolve()
}).then(() => {
  console.log("2")
  setTimeout(function(){
    console.log("3")
  },0)
  new Promise((resolve, reject) => {
    console.log("4")
    resolve()
  }).then(() => {
    console.log("5")
  }).then(() => {
    console.log("6")
  }).then(() => {
    console.log("7")
  })
}).then(() => {
  console.log("8")
}).then(() => {
  console.log("9")
})
new Promise((resolve, reject) => {
  console.log("10")
  resolve()
}).then(() => {
  console.log("11")
}).then(()=>{
  console.log(12)
}).then(() => {
  console.log("13")
})
//错误：1,10,2,4,11,8,5,12,9,6,13,7,3
//1,10,2,4,11,5,8,12,6,9,13,7,3

```

### 例6、 async和await
```javascript
async function async1() {
    console.log("1");
    await  async2();
    console.log("2");
}
async  function async2() {
    console.log( '3');
}
console.log("4");
setTimeout(function () {
    console.log("5");
});
async1()
new Promise(function (resolve) {
    console.log("6");
    resolve();
}).then(function () {
    console.log("7");
});
setImmediate(()=>{
    console.log("8")
})
console.log('9');//4,1,3,6,9,2,7,8,5
```

### 例7、async和await
```javascript
async function async1() {
  console.log("1");
  await  async2();
  console.log("2");
}
async  function async2() {
  console.log( '3');
}
// 用于test的promise，看看await究竟在何时执行
new Promise(function (resolve) {
  console.log("4");
  resolve();
}).then(function () {
  console.log("5");
}).then(function () {
  console.log("6");
}).then(function () {
  console.log("7");
}).then(function () {
  console.log("8");
});
async1();
// 4,1,3,5,2,6,7,8
```

```javascript
async function async1() {
    console.log('1');
    await async2();
    console.log('2');
}
async function async2() {
    console.log('3');
}
console.log('4');
setTimeout(function() {
    console.log('5');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('6');
    resolve();
}).then(function() {
    console.log('7');
});
console.log('8');
//错误答案 4,1,6,8,3,2,7,5
//原因:await后面的代码是microtask 讲解链接： https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7
// 4,1,3,6,8,2,7,5
```
推荐文章，讲解更详细
https://juejin.im/post/5c9a43175188252d876e5903

### 例8、综合案例
```javascript
async function async1(){
  console.log('1')
  await async2()
  console.log('2')
}
async function async2(){
  console.log('3')
}
console.log('4')
setTimeout(function(){
  console.log('5')
},0)
setTimeout(function(){
  console.log('6')
},3)
setImmediate(() => console.log('7'));
process.nextTick(() => console.log('8'));
async1();
new Promise(function(resolve){
  console.log('9')
  resolve();
  console.log('10')
}).then(function(){
  console.log('11')
})
console.log('12')
//  错误答案：4,1,3,9,10,12,2,7,8,11,5,6
//  正确答案：4,1,3,9,10,12,8,2,11,5,7,6
```

