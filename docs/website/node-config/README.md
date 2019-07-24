# 三、在阿里云服务器上运行node项目
+ 图片显示有问题的可点击链接查看[博客原文](https://blog.csdn.net/sinat_36146776/article/details/93607884)

[[toc]]

承接上一篇文章,[服务器上如何配置git,node环境](https://blog.csdn.net/sinat_36146776/article/details/93604788)，我已经在阿里云服务器上成功部署了node，git环境
先切换目录到"jane-code"可看到两个文件，左边是我项目文件夹，右边是我新建的hello.js文件夹，用来测试。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625115132242.png)

```sh
# 新建文件hello.js
vi hello.js
# 按i键
# 输入以下内容，按"ESC"键，输入':wq'即可保存并退出
```
```javascript
// hello.js
const server = http.createServer(app)

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

var http = require("http");
http.createServer(function(request, response) {
  response.writeHead(200, {
    "Content-Type" : "text/plain" // 输出类型
  });
  response.write("Hello World");// 页面输出
  response.end();
}).listen(3000); // 监听端口号
console.log("nodejs start listen 3000 port!");
```
运行
```
node hello.js
```
出现如下图即表示运行成功。在浏览器中输入公网IP加端口号，页面会返回http://47.XXX.XX.XX:3000/

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625120015266.png)

页面出现下图即表示成功
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625120323741.png)

如果页面打不开，报错500
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625120901782.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)

需要在阿里云后台添加安全组规则
云服务器ECS/网络与安全/安全组/安全组列表/操作/点击“配置规则”按钮/添加安全组规则,如图配置即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625120823839.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)

部署github上的项目
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625121348959.png)
```sh
cd /jane-code
git clone https://github.com/zxjzx/clock-out.git
cd clock-out
yarn install

yarn run serve
yarn run app
//或 yarn run run-pro

```
运行成功如图所示

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625121725224.png)

http://47.XXX.XX.XX:8080/
如前面所展示步骤，在阿里云服务器中“添加安全组规则”
加上端口号8080,4000端口即可正常访问。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625122103226.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)

