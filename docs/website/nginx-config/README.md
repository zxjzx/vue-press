# 四、vue-ci3打包并部署到服务器，在服务器上(CentOS7+)上配置nginx反向代理访问node后端代码1
[[toc]]
使用vue-cli3打包后的项目，如何在服务器上运行？并成功访问node后端代码
前端打包后的代码在dist文件夹下，直接丢入服务器即可运行，我此处用的是nginx指定前端代码目录“/jane-code/clock-out/dist;”。
后端代码用node写，node app.js启动，端口号为4000，
前端后端代码都在一个服务器上，不需要跨域，但是如何跨端口访问呢？
我的解决思路是，当路径识别到'/api'时，反向代理访问到4000端口进行后端操作。
## 安装并配置，找到nginx.conf配置代理文件
```sh
yum install nginx //安装并自动配置
nginx -t //查找nginx.conf路径，如下图出现 test is successful 表示nginx全局配置成功
cd /etc/nginx //切换目录
vi nginx.conf
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190626153942224.png)

+ 关键代码
![关键代码](https://img-blog.csdnimg.cn/20190626155547643.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)

## 全部代码 nginx.conf
```sh
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    server {
        listen       8080;
        server_name  127.0.0.1;
        root         /jane-code/clock-out/dist;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location /api/ {
                proxy_pass http://localhost:4000/api/;
        }

        location / {
                try_files $uri $uri/ @router;
                index  index.html index.htm;
         }

        location @router{
                rewrite ^.*$/index.html last;
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

}

```
## 测试

> 成功后，你会发现在浏览器中访问,得到的结果一样

+ http://47.244.XXX.XX:4000/api/getDBList
+ http://47.244.XXX.XX:8080/api/getDBList


