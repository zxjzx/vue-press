# Promise
[[toc]]
## promise的基本用法
```javascript

let pro = function() {
  return new Promise((resolve,reject)=>{
      //....do something get value and deal with
      Vue.axios.get('/getData').then(res=>{
        resolve(res)
      },error=>{
        reject(error)
      })
  })
}

//回调函数
pro().then(res=>{
    //执行promise
    console.log(res);
}).catch((error)=>{
    console.log(error);
}).finally(()=>{  //ES2018引入
    // 无论promise何状态，皆会执行
})


//Promise.all

let pro2 = '...';
const p = Promise.all([pro,pro2]).then(res=>{
    // ...
}).catch((error)=>{
    console.log(error);
})

// Promise.race
// 和Promise.all用法一样，但是意思不一样，
// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
// 那个率先改变的 Promise 实例的返回值，就传递给p的回调函数


const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello

```
## 手写一个promise
```javascript
function myPromise(constructor) {
  let self = this;
  self.status = "pending";
  self.value = undefined;
  self.reason = undefined;

  function resolve(value) {
    if (self.status === "pending") {
      self.value = value;
      self.status = "resolved";
    }
  }

  function reject(reason) {
    //两个==="pending"，保证了状态的改变是不可逆的
    if (self.status === "pending") {
      self.reason = reason;
      self.status = "rejected";
    }
  }

  try {
    constructor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

myPromise.prototype.then = function (fullfill, reject) {
  let self = this;
  switch(self.status){
    case "resolved":
      fullfill(self.value);
      break;
    case "rejected":
      reject(self.reason);
      break;
    default:
  }
};

console.log(myPromise);

let p = new myPromise((resolve, rej) => {
  // ...
  resolve(1)
}).then((x) => {
  console.log(x)
})

```
