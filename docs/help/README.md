# 如何引入.vue / img  等文件
[[toc]]

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

text <demo/>


[Home](/)

[static](../static/index.html) 


[foo - two](/foo/two.md) <!-- 也可以用 .md -->


![An image](https://cdn4.buysellads.net/uu/1/49836/1562600728-car_3.png)


