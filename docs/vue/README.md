# 一、VUE生命周期


[[toc]]

（一）、打开页面
----
### 1、beforeCreate
可以理解为啥都没有
### 2、created
+ data被初始化，
### 3、beforeMount
+ data初始化，el初始化
### 4、mounted
+ data挂载到dom上
+ 此时页面渲染完毕

（二）、页面渲染成功后进行页面交互
---
+ 以下是对页面的修改
### 5、beforeUpdate
+ 修改data成功之后的状态
### 6、updated
+ 修改data成功，dom挂载成功的状态
### 7、beforeDestroy
+ 组件销毁前
### 8、destroyed
+ 组件销毁后

>仔细观察，有什么规律? 
>只需记住**create mount update destroy**即可
####  总结：对数据的更改有两个过程，渲染前，即对js的操作；渲染，即将js数据挂载到dom结构上 
（三）、其他
---
### 9、activated
for keep-alive组件被激活时调用
### 10、deactivated
for keep-alive 组件被移除时调用

### 11、computed
在文档首次加载时会执行一次，当Vue实例中的data属性变化并被computed中的计算属性（方法）引用时，所有的相关计算属性又会执行一次。
是计算属性，用法与data一致

[网上不错的讲解](https://segmentfault.com/a/1190000008010666)
