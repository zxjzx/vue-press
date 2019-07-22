# 如何引入.vue / img  等文件
[[toc]]

<demo/>

## 图片引入

### 本地图片引入

+ 将图片放在 .vuepress/public 中

```md
<img :src="$withBase('/google.png')" alt="foo">
```
<img :src="$withBase('/google.png')" alt="foo">

### .vue中引入图片
+ 和在.md中使用一样


## 项目中引入.vue文件
> 所有在 .vuepress/components 中找到的 *.vue 文件将会自动地被注册为全局的异步组件

将demo.vue放入components文件下
+ 重启
```
npm run docs:dev
```
+ 引入
```md
<demo/>
```

## 生成目录
```javascript
[[toc]]
```


::: tip TIP
This is a tip
:::

::: warning 警告
This is a warning
:::

::: danger 危险
This is a dangerous warning
:::


::: v-pre
`{{ This will be displayed as-is }}`
:::

![An image](https://cdn4.buysellads.net/uu/1/49836/1562600728-car_3.png)


增加其它扩展插件

插件npm安装：element-ui，vue-echarts，vue-highlight。。

在.vuepress/enhanceApp.js引入：

/**
 * 扩展 VuePress 应用
 */
 ```javascript
import VueHighlightJS from 'vue-highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueECharts from 'vue-echarts' //注册图表

import './public/css/index.css' //组件css文件

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // ...做一些其他的应用级别的优化
  Vue.use(VueHighlightJS)
  Vue.use(Element)
  Vue.component('chart', VueECharts)
}
```

--------------------- 

