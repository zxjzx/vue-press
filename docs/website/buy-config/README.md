# 二、购买阿里云，并在阿里云服务器上配置Git下载、node项目等运行环境
[[toc]]
## 1、获取服务器
在阿里云官网上注册后进行实名验证，验证需要几天。验证成功后
购买，[购买地址](https://ecs-buy.aliyun.com/wizard?spm=5176.8789780.1092585.1.72b955caBnrK2M#/prepay/cn-hongkong?periodType=Yearly&period=1&instanceType=ecs.g5.large)，初学者入门级一般选择'CentOS'，我选择的是CentOS，地域等其他的都自选，自己玩的话肯定选个最便宜的。购买成功后会受到相应的短信，信息如下

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625104117387.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)

在阿里云控制台中“云服务器ECS/实例与镜像/实例/实例列表中可以看到你购买的实例列表”
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019062510493065.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)

## 2、连接上服务器
我们想要在服务器上操作部署项目，首先要连接上服务器，有常见两种方式，一种是直接远程连接，在浏览器窗口打开DOS控制台，见[链接](https://blog.csdn.net/sinat_36146776/article/details/92810252)；另外一种是通过三方软件连接，见[链接](https://blog.csdn.net/sinat_36146776/article/details/92817913)。
这两种方式都是使用liunx命令对服务器进行操作，所以操作步骤是一样的。连接成功后有如下信息标志。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019062510565473.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)

## 3、配置服务器环境
+ (1)、配置git环境
首先新建两个文件夹"jane-code","jane-soft"分别用于存放部署的项目代码和安装的软件，其他如“bin,boot.....”等文件夹问为项目自带。初次接触我不清楚这些文件有何作用，因此建议我们不要动这些文件夹。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625110113354.png)

在服务器上安装git，通过yum加命令来安装，阿里云服务器CentOS7已经为我们配置好了yum，直接用即可。需要注意的是，CentOS5的版本，由于yum源中没有git，所以需要预先安装一系列的依赖包。具体方法可参照下面node安装的方法。
>yum是linux中比较常用的负责软件包的管理工具和命令,是我们使用linux系统必备的技能和工具。Yum是一个在Fedora和RedHat以及CentOS中的Shell前端软件包管理器。基于RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装
```
yum -y install git
//yum remove git //卸载方法
```
在安装软件的时候，会有中断，让用户选择是否要继续，输入y表示yes在enter即可完成安装。
+ (2)、配置node环境
因为我们从官网下下载来的安装包一般都是压缩过的，所以我们需要安装压缩工具来进行解压。
```javascript
//下载压缩工具
yum -y install pcre pcre-devel

//在"jane-soft"目录下下载node。下载地址在官网，鼠标经过下载地址即可查看到
wget https://nodejs.org/dist/v10.16.0/node-v10.16.0-linux-x64.tar.xz

//解压
tar -xvf node-v10.16.0-linux-x64.tar.xz

//重命名
mv node-v10.16.0 node-v10.16

//配置软连接，作用是让node,npm全局使用
ln -s /jane-soft/node-v10.16/bin/node /usr/local/bin/node
ln -s /jane-soft/node-v10.16/bin/npm /usr/local/bin/npm
//'/jane-soft/node-v10.16/bin/npm'为下载软件解压后的目录
```
npm node显示绿色即表示全局配置成功。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625112439236.png)

如果为红色，表示配置不成功，重新配置时，报错：failed to remove ‘node’: Not a directory，需要删除node再配置。删除，需要先cd /usr/local/bin 再 rm node 输入y即可实现删除配置。输入ls则看不见报错的node。再重新配置
+ (3)、配置yarn
```javascript
//切换目录
cd /jane-soft
//下载压缩包
wget https://yarnpkg.com/latest.tar.gz
//解压到当前目录
tar zvxf latest.tar.gz
//配置
ln -s /jane-soft/yarn-v1.16.0/bin/yarn /usr/local/bin/yarn
//检测
yarn --version

//或者，如果你已经全局安装了npm
npm install --global yarn
```
+ (4)、安装mysql
+ (5)、想要navicat等数据库操作工具能远程连接上自己服务器上的数据库
阿里云配置安全组/配置规则/添加安全组规则/协议类型：MySQL(3306)设置成功后， 即可连接mysql。
```
yum install mysql-server
```
+ (6)、配置pm2 
pm2的作用是防止nodejs文件运行失败后自动重启
阿里云配置安全组/配置规则/添加安全组规则/协议类型：MySQL(3306)设置成功后， 即可连接mysql。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625153630480.png)

复制如图目录，配置软连接
ln -s /jane-soft/node-v10.16/lib/node_modules/pm2/bin/pm2 /usr/local/bin
pm2 list 检测是否成功，下图是成功标志
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190625153658571.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)

4、其他


 + Linux常见命令
```
vim test.txt 新建txt文件
进入编辑界面 ，如何保存并退出？
先按ESC，然后再输入:wq ，再按enter即可退出
clear 清空控制台记录
vi test.txt 编辑文件 ，再按i即可进行编辑
rm test.txt , y 删除文件 
ls 查看当前目录
cd home 切换到home目录下
cd .. 切换到上一级目录
cd 切换到最高级目录
mkdir first 新建文件夹
rmdir first 删除文件夹
rm -fr * 删除当前目录下所有文件
mv node-v10.16.0 node-v10.16 重命名
```

 + Linux服务器断开SSH连接后，让程序不退出继续在后台执行
yum install screen
yarn run run-pro 启动即可

 + liunx占用端口并关闭
yum install lsof
lsof -i 8080
kill -9 "关联的pid"
或者
ps -ef | grep 4000

关于在服务器上如何下载项目并运行项目可查看我下一篇文章。。
[如何在服务器上运行node项目](https://blog.csdn.net/sinat_36146776/article/details/93607884)

