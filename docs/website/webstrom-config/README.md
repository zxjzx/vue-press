# 五、用webstrom将打包代码上传到服务器
[[toc]]
## （一）、用webstrom将本地打包的代码上传到阿里云服务器上
+ 本地代码情况如下图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190626183053227.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
我想直接将打包后的代码直接上传到服务器上，首先要配置webstrom,
### 1、打开Deployment
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190626183249852.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
### 2、新建,选择"SFTP" ，自定义名称。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190626184132709.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
### 3、Connection
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190626183547413.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
点击test connection，连接成功出现如下标志

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190626183628188.png)

### 4、Mapping
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190626183723733.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
设置完后点击“OK”，
### 5、成功标志

每次当dist下内容有变动时，打开tools会出现"upload to upload-to-pro"这个选项，点击按钮即可上传；上传成功后这个选项会自动消失。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190626183925358.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
点击此按钮可进行本地查看远程服务器结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190626185533201.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)




## （二）、用webstrom直接连接服务器进行操作，可替换xshell的使用

###  1、步骤一
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190626190510811.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
### 2、步骤二
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190626190609472.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
### 3、连接成功，接下来可以进行操作服务器了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190626190901419.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)



