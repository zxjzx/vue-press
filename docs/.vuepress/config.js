module.exports = {
    title: 'Jane\'s blog',
    description: '我的个人网站',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', {rel: 'icon', href: '/logo.jpg'}], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        nav: [ // 导航栏配置
            {text: 'javascript', link: '/javascript/'},
            {text: '博客', link: 'https://blog.csdn.net/sinat_36146776'},
            {text: 'Languages',items: [
                    { text: 'Chinese', link: '/language/chinese' },
                    { text: 'Japanese', link: '/language/japanese' }
                    ]
            }
        ],
        sidebar: [
            {
                title: 'vue',
                collapsable: false,
                children: [
                    '/vue/'
                ]
            },
            {
                title: 'es6',
                collapsable: false,
                children: [
                    '/es6/'
                ]
            },
            {
                title: 'javascript',
                collapsable: false,
                children: [
                    '/javascript/'
                ]
            },
            {
                title: 'html',
                collapsable: false,
                children: [ '/html/' ]
            },
            {
                title: 'css',
                collapsable: false,
                children: [ '/css/' ]
            },
            {
                title: 'others',
                collapsable: false,
                children: [ '/others/']
            },
        ],// 侧边栏配置
        sidebarDepth: 2, // 侧边栏显示2级
    }
};
