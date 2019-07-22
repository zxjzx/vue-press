# http协议
+ http就是超文本传输协议，他规定了客户端和服务器之间如何传输数据。
[[toc]]
## 1、网页从输入网址到渲染完成经历了哪些过程？
+ 输入url，enter
+ 本地hosts查找对应的地址并访问
+ 找不到的话去向DNS服务器查找域名对应IP地址
+ 找到IP地址后，创建tcp连接
+ 发送http请求
+ 解析发送的http请求，并返回数据
+ 浏览器渲染返回的数据，显示到页面上

## 2、TCP连接的三次握手和四次挥手
浏览器Website，服务器Server

### 2.1三次握手

+ 1、浏览器向服务器说,我要跟你创建连接
+ 2、s -> w 说，好的，我腾出空间来给你连接，即我准备好接收了
+ 3、w -> 接收到上一步的消息后说，现在开始连接
+ 4、开始互相传输数据

### 2.2四次挥手
+ 1、w -> s 我要跟你分手，不容置喙
+ 2、s -> w 分手可以，前提是我先把东西还给你
+ 3、s -> w 我东西都还给你了，可以分手了
+ 4、w -> s 我这边东西也还给你，分手吧
+ 5、w等2MS无回复，确定分手，停止连接

### 2.3 恋爱版本

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190717173138329.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)

