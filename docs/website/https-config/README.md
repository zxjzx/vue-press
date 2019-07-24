# 六、https config
+ 图片显示有问题的可点击链接查看[博客原文](https://blog.csdn.net/sinat_36146776/article/details/94748556)

其他关于服务器的配置可查看我的其他文章
#### 1、进入控制台-SSL证书
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190705175953840.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
#### 2、选择购买证书
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190705180111300.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
#### 3、选择一种购买，我选择的是免费
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190705180227385.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
#### 4、购买完成后返回“证书控制台”申请并补全信息，等待审核，审核成功后
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190705180745631.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
#### 5、nginx配置-下载
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190705180921853.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
下载后得到如图两个文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190705181022142.png)
#### 6、将这两个文件上传到服务器 /jane-soft/https/目录
#### 7、然后配置nginx.conf ,[官网教程](https://help.aliyun.com/knowledge_detail/95491.html?spm=5176.2020520163.cas.41.259dOaoWOaoWgd)
//通过在linux上 nginx -t 查看该文件所在目录
#### 8、附录
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190717160903289.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
+ nginx.conf
```
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
        listen       8080 ssl;
        server_name  localhost;
        root         /jane-code/clock-out/dist;

        ssl_certificate      /jane-soft/https/2426128_www.zhangxiaojuan.club.pem;
        ssl_certificate_key  /jane-soft/https/2426128_www.zhangxiaojuan.club.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

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

        server {
            listen       8081 ssl;
            server_name  localhost;
            root         /jane-code/clock-out/visitor/dist;

            ssl_certificate      /jane-soft/https/2426128_www.zhangxiaojuan.club.pem;
            ssl_certificate_key  /jane-soft/https/2426128_www.zhangxiaojuan.club.key;

            ssl_session_cache    shared:SSL:1m;
            ssl_session_timeout  5m;

            ssl_ciphers  HIGH:!aNULL:!MD5;
            ssl_prefer_server_ciphers  on;

            # Load configuration files for the default server block.
            include /etc/nginx/default.d/*.conf;

    	    location /api/ {
                    proxy_pass http://localhost:4001/api/;
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
