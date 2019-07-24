# 深拷贝和浅拷贝

## 深拷贝： 
+ Object.assign({}, obj) , obj只有1层
+ JSON.parse(JSON.stringify())
+ 手写递归方法：遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝。
+ 函数库lodash _.cloneDeep 用来做 Deep Copy


## 浅拷贝： 
+ =，
+ Object.assign({}, obj) , obj大于1层；
- Array.prototype.concat()；不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组
- Array.prototype.slice()；不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组


递归的深拷贝
```javascript
//定义检测数据类型的功能函数
   function checkedType(target) {
     return Object.prototype.toString.call(target).slice(8, -1)
   }
   //实现深度克隆---对象/数组
   function clone(target) {
     //判断拷贝的数据类型
     //初始化变量result 成为最终克隆的数据
     let result, targetType = checkedType(target)
     if (targetType === 'object') {
       result = {}
     } else if (targetType === 'Array') {
       result = []
     } else {
       return target
     }
     //遍历目标数据
     for (let i in target) {
       //获取遍历数据结构的每一项值。
       let value = target[i]
       //判断目标结构里的每一值是否存在对象/数组
       if (checkedType(value) === 'Object' ||
         checkedType(value) === 'Array') { //对象/数组里嵌套了对象/数组
         //继续遍历获取到value值
         result[i] = clone(value)
       } else { //获取到value值是基本的数据类型或者是函数。
         result[i] = value;
       }
     }
     return result
   }

```



