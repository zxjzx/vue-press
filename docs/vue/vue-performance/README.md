# 五、提高VUE性能优化的九种方式

::: tip
+ 1、函数形组件（functional） 
+ 2、子组件拆分（利用组件内部运行，不影响其他外部组件）
+ 3、局部变量 （多赋值给局部变量，减少不断计算）
+ 4、用v-show，不用v-if（v-if操作dom结构，性能低）
+ 5、用keep-alive（缓存页面）
+ 6、用mixins（mixins引入的js后执行，延迟装载Defer）
+ 7、time slicing 分批处理（用requestAnimationFrame定时器，分批次执行list,防止一次性执行list太大阻塞页面渲染）
+ 8、非响应式模式（不要直接对data进行操作，减少vue框架对data的监视和观察）
+ 9、仅渲染可视化部分（如list有100条数据，用户只看得到20条，所以先只渲染20条数据）
:::

[PPT链接：](https://slides.com/akryum/vueconfus-2019#/1)
