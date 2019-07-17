# 六、优化系统加载速度
vue项目打包后vendor.js太大，如果加上mapping的话，该文件可能有1M+，这样的话会导致页面第一次加载运行过慢，vendor.js是node_modules里所用到的modules的打包后的集合js文件.。
## 一、分开打包
使用webpack中的config.optimization.splitChunks分开打包
## 二、 gzip
开启gzip压缩功能，在后端配置，在nginx配置，[见参考](https://blog.csdn.net/sinat_36146776/article/details/95063087)
## 三、引入CDN
[CDN(内容分发网络)](https://www.jsdelivr.com/?query=author:%20vuejs)，是一种公共服务，他本身有很多台位于不同地域、接入不同运营商的服务器，而所谓的使用CDN实质上就是让CDN作为网站的门面，用户访问到的是CDN服务器，而不是直接访问到网站。由于CDN内部对TCP的优化、对静态资源的缓存、预取，加上用户访问CDN时，会被智能地分配到最近的节点，降低大量延迟，让访问速度可以得到很大提升一个原则是尽量将比较大的第三方库放到cdn上去以减少请求时间，
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"></script>
```
webpack.base.conf.js里设置externals选项，目的是不打包这些选项,由于index.html中script的引入
## 四、路由懒加载
路由懒加载也叫延迟加载，即在需要的时候进行加载
```json
{
              path: 'echarts-setting',
              name: 'echarts-setting',
              component:function (resolve) {
                require(['../views/setting/echarts-setting'],resolve)
              }
            }
```
## 五、按需加载
element,echarts加载整个全部的话打包后也太大了，只加载用到的，减少不必要的体积

## 六、图片转base64
小图片可以转为base64字符串然后嵌入img的src中，节省http请求数量,webpack中用url-loader处理,limit控制了图片转base64的阈值，小于该值就转base64

## 七、others 
### 去掉sourceMap文件
map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。

```javascript
module.exports = {
  productionSourceMap: false,//生产环境不生产sourceMap
  }
```
