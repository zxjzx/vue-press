module.exports = {
    title: 'Jane\'s blog',
    description: '我的个人网站',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', {rel: 'icon', href: '/logo.jpg'}], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    port: '8088',
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        nav: [ // 导航栏配置
            {text: 'Github', link: 'https://github.com/zxjzx'},
            {text: 'CSDN博客', link: 'https://blog.csdn.net/sinat_36146776'},
            {text: 'clock out 打卡系统', link: 'https://zhangxiaojuan.club:8081'},
            {
                text: '推荐工具', items: [
                    {text: 'Normalize-更好的跨浏览器一致性', link: 'http://nicolasgallagher.com/about-normalize-css/'},
                    {text: '建站工具-Hexo(MD)', link: 'https://hexo.io/zh-cn/docs/themes'},
                    {text: '建站工具-Wordpress(PHP)', link: 'https://cn.wordpress.org/'},
                    {text: 'html2canvas - 页面截屏', link: 'http://html2canvas.hertzen.com/'},
                    {text: 'Windows下nginx的安装', link: 'https://blog.csdn.net/sinat_36146776/article/details/83413166'},
                    {text: 'MDN', link: 'https://developer.mozilla.org/zh-CN/'},
                    {text: '百度脑图', link: 'http://naotu.baidu.com/home'},
                    {text: '翻墙工具', link: 'https://pao-pao.net/vpn-compare'},
                    {text: 'nutui - 京东风格', link: 'https://nutui.jd.com'},
                ]
            },
        ],
        sidebar: [
            /*{
                title: 'message',
                collapsable: false,
                children: [
                    '/message/',
                ]
            }
            , */
            {
                title: 'VUE',
                collapsable: false,
                children: [
                    '/vue/', '/vue/element-tree/', '/vue/diff/','/vue/event/','/vue/vue-performance/',
                ]
            },
            {
                title: 'HTTP',
                collapsable: false,
                children: [
                    '/http/'
                ]
            },
            {
                title: 'Website 服务器相关',
                collapsable: false,
                children: ['/website/xshell6/', '/website/buy-config/', '/website/node-config/', '/website/nginx-config/',
                    '/website/webstrom-config/','/website/https-config/','/website/system-optimize/']
            },
            {
                title: 'ES6',
                collapsable: false,
                children: [
                    '/es6/','/es6/promise/'
                ]
            },
            {
                title: 'JAVASCRIPT',
                collapsable: false,
                children: [
                    '/javascript/time/', '/javascript/event-loop/', '/javascript/this/','/javascript/js-help/',
                ]
            },
            {
                title: 'Html静态页面',
                collapsable: false,
                children: ['/html/', '/html/html5/', '/html/html5-websocket/']
            },
            {
                title: 'CSS',
                collapsable: false,
                children: ['/css/', '/css/rem/', '/css/rem-less/']
            },
            {
                title: 'GULP',
                collapsable: false,
                children: ['/gulp/']
            },

            {
                title: 'OTHERS',
                collapsable: false,
                children: ['/others/', '/others/web-interview/']
            },
            {
                title: 'HELP',
                collapsable: false,
                children: ['/help/']
            },
        ],// 侧边栏配置
        sidebarDepth: 2, // 侧边栏显示2级
    }
};
