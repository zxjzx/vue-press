# ES6
[[toc]]

## 测试题1

+ 已知如下数组，将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组
```javascript
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
```

+ result
```javascript
Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b});
// 或者
[...new Set(arr.flat(Infinity))].sort((a,b)=>{ return a-b});
```
