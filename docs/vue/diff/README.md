# 三、diff算法与虚拟dom的比较

## diff算法：
从上往下逐层进行比较，给每个节点生成标识符用在同级进行对比，：如果标识符相同，则继续比较此节点的下一级，如果子节点都相同则复用；如果子级有不同，则对此子节点进行判断，
节点中如果出现了新的标识符，则新增；如果旧节点的标识符在新中没有出现，则删除；如果标识符相同，内容不同，则进行替换。

## 虚拟dom
提到虚拟dom，则会联想到真实DOM，真实DOM用jquery或者document操作，每个算法语句都会检索文档，然后进行改变，非常消耗性能，虚拟dom的出现就是对其性能的优化，通过diff算法，进行新旧结果的比较，然后一次性更新所有dom的操作。
简而言之：通过diff算法得到diff算法结果数据表，得到了需要操作哪些记录表，然后用js的DOM fragment来操作dom，即统一计算出所有变化后统一更新一次DOM,

## 实用 vue和react的比较
vue使用的是defineProperty 进行数据劫持。react是以对象的形式创建虚拟dom然后用diff算法进行比较。这两种效率都很高的，当然相对而言vue更简单。

[深入理解react中的虚拟DOM、diff算法](https://www.cnblogs.com/zhuzhenwei918/p/7271305.html?from=groupmessage&isappinstalled=0)
