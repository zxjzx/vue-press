#  apply、call、bind区别、用法-如何改变this的指向，以及实用场景

[[toc]]
+ 正常调用f1函数，this指向window

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190327180907393.png)


+ 改变this指向

![改变this指向](https://img-blog.csdnimg.cn/20190327181106292.png)

+ bind

![bind](https://img-blog.csdnimg.cn/20190327181355608.png)

+ 若想要f1里的this依旧指向window，可如下设置（如：vue中使用导入js代码，若想js中正常使用this,则必须通过以下方式中的任意一种改变this指向）

![bind](https://img-blog.csdnimg.cn/20190327181820680.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)


## for example
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
