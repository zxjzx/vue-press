#  APPLY、CALL、BIND区别、用法-如何改变THIS的指向，以及实用场景

CSDN对应讲解略有不同[原文](https://blog.csdn.net/sinat_36146776/article/details/80061736)

[[toc]]

## 一般情况下
this指向window 
```javascript
this// Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}

function fun(name) {
    console.log(name);//jane
    console.log(this);//Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
}
fun('jane');

```

## 改变this指向
### apply改变this指向,指向obj

```javascript
let fun = function(name){
    console.log(name);//jane
    console.log(this);//{age: 18}
}
let obj = {age:18};
fun.apply(obj,['jane']);
```

### call改变this指向,指向obj
```javascript
let fun = function(name){
    console.log(name);// jane
    console.log(this);// {age: 18} 
}
let obj = {age:18};
fun.call(obj,'jane');
```

### bind改变this指向,指向obj
```javascript
let fun = function(name){
    console.log(name);// jane
    console.log(this);// {age: 18}
}
let obj = {age:18};
fun.bind(obj,'jane')()
```


## this指向window
若想要fun里的this依旧指向window，可如下设置（如：vue中使用导入js代码，若想js中正常使用this,则必须通过以下方式中的任意一种改变this指向）
```javascript
let fun = function(name){
    console.log(name);
    console.log(this);
}
fun.call(this,['jane'])
fun.bind(this,'jane')()
fun.call(this,'jane')
// result

// jane
// Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
```

## For example
```javascript
apply、call、bind区别、用法
 
都是用来改变函数的this对象的指向的；
区分用法：
var  numbers = [25,35,15,195,-55 ]; 
//取number中的最大的值
console.log(Math.max(25,35,15,195,-55));//195
console.log(Math.max.apply(Math,numbers));//195
console.log(Math.max.call(Math,25,35,15,195,-55));//195
console.log(Math.max.bind(Math)(25,35,15,195,-55));//195
 
 
var  numbers = [25,35,15,195,-55 ]; 
//取number中的最大的值
Math.max(25,35,15,195,-55) //195
apply 立即调用    跟参数数组 Math.max.apply(Math,numbers);//195
call  立即调用    跟数组元素 Math.max.call(Math,25,35,15,195,-55); //195
bind  不是立即调用, 此处加()手动让其立即调用 Math.max.bind(Math)(25,35,15,195,-55);//195
 
var dog = {
    name:'xiaowang',
    gender:'girl',
    age:'24',
    say:function(){
        console.log(this.name+","+this.gender+","+this.age);
    }
}
var cat = {
    name:'miaomiao',
    age:'12',
    gender:'boy'
}
dog.say();//xiaowang,girl,24
dog.say.apply(cat);//miaomiao,boy,12
dog.say.call(cat);
dog.say.bind(cat)();
 
 
var mama = {
    name:'xiaowang',
    gender:'girl',
    age:'24',
    say:function(like,address){
        console.log(this.name+","+this.gender+","+this.age+','+like+','+address);
    }
}
var baba = {
    name:'miaomiao',
    age:'12',
    gender:'boy'
}
mama.say('化妆','北京');//xiaowang,girl,24,化妆,北京
mama.say.apply(baba,['打游戏','武汉']);//miaomiao,boy,12,打游戏,武汉
mama.say.call(baba,'打游戏','武汉');
mama.say.bind(baba)('打游戏','武汉');
```
