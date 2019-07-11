# 二、element - NavMenu 导航菜单，针对于复杂的导航栏（不定级、多级）动态渲染的组件开发

针对于多级导航菜单栏的遍历的组件开发
实现效果如图所示，
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019061416121468.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM2MTQ2Nzc2,size_16,color_FFFFFF,t_70)
+ 1、router.js
```javascript
// Layout.vue 和 Main.vue 都是vue容器, 前者为全空的容器
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../components/layout'
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/no-permission',
      name: 'no-permission',
      meta: {
        title: 'no permission',
      },
      component: () => import('../components/no-permission')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../components/Main'),
      meta: {title: 'main'},
      children: [
        {
          path: 'clock-out',
          name: 'clock-out',
          meta: {title: 'clock-out', icon: 'el-icon-time'},
          component: () => import( '../views/clock-out')
        },
        {
          path: 'tipoff-record',
          name: 'tipoff-record',
          meta: {title: 'tipoff-record', icon: 'el-icon-alarm-clock', role: 'admin'},
          component: () => import( '../views/tipoff-record')
        },
        {
          path: 'level-1',
          name: 'level-1',
          meta: {title: 'level-1'},
          component: Layout,
          children: [
            {
              path: 'level-2-1',
              name: 'level-2-1',
              meta: {title: 'level-2-1'},
              component: () => import('../views/level-test'),
            },
            {
              path: 'level-2-2',
              name: 'level-2-2',
              meta: {title: 'level-2-2'},
              component: Layout,
              children: [
                {
                  path: 'level-3-1',
                  name: 'level-3-1',
                  meta: {title: 'level-3-1'},
                  component: () => import('../views/level-test'),
                },
                {
                  path: 'level-3-2',
                  name: 'level-3-2',
                  meta: {title: 'level-3-2'},
                  component: () => import('../views/level-test'),
                  children: [
                    {
                      path: 'level-4',
                      name: 'level-4',
                      meta: {title: 'level-4'},
                      component: () => import('../views/level-test'),
                    }
                  ]
                }
              ]
            },
          ]
        },
      ]
    },

  ]
})
```
+ side-bar.vue 侧边栏
```html
<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu router :default-active="$route.path" mode="vertical"
               :collapse="isCollapse"
               :collapse-transition="false"
               background-color="#304156"
               text-color="#bfcbd9" active-text-color="#409EFF">
        <menu-tree :list="routerList"></menu-tree>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import MenuTree from './menu-tree'
  export default {
    name: 'sidebar',
    components: {MenuTree},
    data() {
      return {
        number: true,
      }
    },
    computed: {
      isCollapse() {
        return !this.$store.state.opened
      },
    },
    created() {
      let routes = this.$router.options.routes;
      let result = routes.filter(item => item.name == 'main');
      this.routerList = result[0].children
    },
  }
</script>

<style scoped>

</style>

```
+ 3、menu-tree.vue 自己把自己当做组件，调用自己达到无限遍历
```html
<template>
  <div>
    <div v-for="item in list">
      <el-menu-item v-if="!item.children && !item.hidden"
                    :index="headUrl+strUrl+item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu v-if="item.children && item.children.length"
                  :index="headUrl+strUrl+item.path">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <menu-tree :list="item.children" :path="strUrl+item.path"></menu-tree>
      </el-submenu>
    </div>
  </div>
</template>

<script>
  export default {
    name: "menu-tree",
    props: ['list', 'path'],
    data() {
      return {
        headUrl: '/main/',
        strUrl: '',
      }
    },
    created() {
    //用于拼接url
      if (this.path) {
        this.strUrl += this.path + '/';
      }
    },
  }
</script>
```
项目地址：https://github.com/zxjzx/clock-out
