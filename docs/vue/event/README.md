# 四、vue事件修饰符

[官方讲解](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)
## .stop
防止冒泡，阻止事件继续传播

## .prevent
form提交页面不再重载页面

## .capture
元素自身触发的事件先在此处理，然后才交由内部元素进行处理

## .self
event.target 是当前元素自身时触发处理函数,是当前元素自身时触发处理函数 

## .once
点击事件将只会触发一次

## .passive

立即触发事件（如滚动事件）
