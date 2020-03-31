# Vue源码解析
+ 1、index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="root">
    <img v-bind:src="imgSrc" alt="" style="width: 200px;height: 100px;">
    <img :src="imgSrc" alt="" style="width: 200px;height: 100px;">
    <h3 v-text="person.name"></h3>
    <h3 v-text="person.other.name"></h3>
    <div v-html="htmlVal"></div>
    <h1>{{person.name}}我是文字{{person.age}}</h1>
    <h2>{{person.name}}</h2>
    <h4 v-model="msg"></h4>
    <h1>{{modelV}}</h1>
    <input type="text" v-model="modelV" />
    <ul>
        <li>{{person.name}}</li>
        <li>2</li>
        <li>3</li>
    </ul>
    <button v-on:click="clickMe">点击我更改数据</button>
    <button @click="clickMe">用第二种方式点击我更改数据</button>
</div>
<script src="Oberver.js"></script>
<script src="MVue.js"></script>
<script>
    let vm = new MVue({
        el:'#root',
        data:{
            person:{
                name:'jane',
                age:12,
                other:{
                    name:'其他人'
                }
            },
            msg:'我是消息',
            inputMsg:'',
            modelV:'model value',
            htmlVal:`<h1 style="color:red">我是html</h1>`,
            imgSrc:`https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=266228620,2480871873&fm=15&gp=0.jpg`,
        },
        methods:{
            clickMe(){
                this.$data.person.name = '我是帅哥美女';
                this.person.age = '18';
            }
        }
    })
</script>
</body>
</html>

```
+ 2、MVue.js
```js
const compileUtil = {
    getVal(expr, vm) {
        return expr.split('.').reduce((data, currentVal) => {
            return data[currentVal]
        }, vm.$data)
    },
    setVal(expr, vm, newVal) {
        return expr.split('.').reduce((data, currentVal) => {
            data[currentVal] = newVal;
        }, vm.$data)
    },
    getContentVal(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1], vm)
        })
    },
    text(node, expr, vm) { // expr:msg, person.name ; vm数据
        let value;
        if (expr.indexOf('{{') !== -1) {
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {

                // 绑定观察者，将来数据发生回调，触发更新
                new Watcher(vm, args[1], () => {
                    // 重新获取值
                    this.updater.textUpdater(node, this.getContentVal(expr, vm));
                });
                return this.getVal(args[1], vm)
            });
        } else {
            value = this.getVal(expr, vm);
        }

        this.updater.textUpdater(node, value);
    },
    html(node, expr, vm) {
        const value = this.getVal(expr, vm);
        new Watcher(vm, expr, newVal => {
            this.updater.htmlUpdater(node, newVal)
        });
        this.updater.htmlUpdater(node, value)
    },
    model(node, expr, vm) {
        const value = this.getVal(expr, vm);
        new Watcher(vm, expr, newVal => {
            this.updater.modelUpdater(node, newVal);
        });
        node.addEventListener('input', e => {
            this.setVal(expr, vm, e.target.value)
        });
        this.updater.modelUpdater(node, value);
    },
    on(node, expr, vm, event) {
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(event, fn.bind(vm), false)
    },
    bind(node, expr, vm, attrName) {
        node[attrName] = this.getVal(expr, vm);
    },
    updater: {
        textUpdater(node, value) {
            return node.textContent = value
        },
        htmlUpdater(node, value) {
            return node.innerHTML = value;
        },
        modelUpdater(node, value) {
            return node.value = value
        },
    }
};

class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        // 1、获取文档碎片对象，放入内存中，减少页面重绘和回流
        const fragment = this.node2Fragment(this.el);
        // console.log(fragment);
        // 2、编译模板
        this.compile(fragment);
        // 3、追加子元素到根节点
        this.el.appendChild(fragment);

    }

    compile(fragment) {
        // console.log(fragment);
        fragment.childNodes.forEach(child => {
            // 元素节点
            if (this.isElementNode(child)) {
                // console.log("元素节点:",child);
                // 编译元素节点
                this.compileElement(child);
            } else {//文本节点
                // 处理双括号
                // console.log("文本节点:",child);
                this.compileText(child);
            }
            if (child.childNodes && child.childNodes.length) {
                this.compile(child);
            }
        })
    }

    compileElement(node) {
        const attributes = node.attributes;
        [...attributes].forEach(attr => {
            // console.log(attr);
            const {name, value} = attr; // value person.age,msg
            // 区分指令v-和普通属性
            if (this.isDirective(name)) {// 是一个指令v-text,v-model,v-html,v-on:click,v-bind:src,:src
                const [, directive] = name.split('-'); // text,model,on-click
                const [dirName, eventName] = directive.split(':');// v-on:click
                compileUtil[dirName](node, value, this.vm, eventName)
                node.removeAttribute(name);
            }
            // 处理:src=""
            if (this.isBind(name)) {
                const [, attrName] = name.split(":");
                compileUtil['bind'](node, value, this.vm, attrName);
                node.removeAttribute(name);
            }
            // 处理@click="clickMe"
            if (this.isEventName(name)) {
                const [, eventName] = name.split('@');
                compileUtil['on'](node, value, this.vm, eventName)
            }
        });

    }

    compileText(node) {
        var reg = /\{\{(.*)\}\}/;
        if (reg.test(node.textContent)) {
            compileUtil['text'](node, node.textContent, this.vm)
        }
    }

    isDirective(name) {
        return name.startsWith('v-');
    }

    isBind(name) {
        return name.startsWith(':');
    }

    isEventName(name) {
        return name.startsWith('@')
    }

    node2Fragment(el) {
        // 创建文档碎片,使用这个的好处是使用文档片段通常会带来更好的性能，不会引起页面重绘
        const f = document.createDocumentFragment();
        let firstChild;
        while (firstChild = el.firstChild) {
            f.appendChild(firstChild);
        }
        return f;
    }

    isElementNode(node) {
        return node.nodeType === 1;
    }

    isTextNode(node) {
        return node.nodeType === 3;
    }

}

class MVue {
    constructor(options) {
        // console.log(this)

        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        if (this.$el) {
            // 1、实现一个指令观察者

            new Observer(this.$data);
            // 2、实现一个指令解析器
            new Compile(this.$el, this);

            this.proxyData(this.$data);
        }
    }
    // 将this.$data代理成为this
    proxyData(data){
        for (const key in data){
            // 当你调用this.key时，就返回data[key]
            Object.defineProperty(this,key,{
                get(){
                    return data[key]
                },
                set(newVal) {
                    console.log(newVal)
                    data[key] = newVal
                }
            })
        }
    }
}

```
+ 3、实现双向绑定的核心（发布订阅者模式）
```js
class Watcher {// 进行监听数据是否发生变化
    constructor(vm,expr,cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.oldVal = this.getOldVal();
    }
    getOldVal(){
        Dep.target = this; // 将dep和watcher关联起来，挂载起来
        const oldVal = compileUtil.getVal(this.expr,this.vm);
        Dep.target = null; // 防止太多的观察者 ,数据建立的时候建立watcher,改完了就立马删掉watcher
        return oldVal
    }
    // 判断新旧是否发生了变化
    update(){
        const newVal = compileUtil.getVal(this.expr,this.vm);
        if(newVal !== this.oldVal){
            // 确定更新了，那么回调执行更新操作
            this.cb(newVal)
        }
    }
}

class Dep {
    constructor() {
        this.subs = [];
    }
    // 收集watcher
    addSub(watcher) {
        this.subs.push(watcher)
    }

    //通知观察者去更新即执行，相当于$.fire
    notify() {
        console.log("通知了观察者");
        this.subs.forEach(w => w.update())
    }
}

// 监听和劫持所有属性
class Observer {
    constructor(data) {
        this.observe(data);
    }

    observe(data) {
        /**
         * {
            person:{
                name:'zhangxiaojuan',
                age:12,
                other:{
                    name:'其他人'
                }
            },
            msg:'我是消息',
            inputMsg:'',
            htmlVal:`<h1 style="color:red">我是html</h1>`,
            imgSrc:`https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=266228620,2480871873&fm=15&gp=0.jpg`,
        }
         */
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.DefineReactive(data, key, data[key]);
            })
        }
    }

    DefineReactive(obj, key, value) { // value == obj[key]
        // 递归遍历
        this.observe(value);
        // 数据劫持时创建依赖收集器
        const dep = new Dep();
        // 劫持并监听所有的属性
        Object.defineProperty(obj, key, {
            enumerable: true,// 是否可变
            configurable: false, // 是否可更改编写
            get() {
                // 初始化
                // 添加观察对象入依赖收集器中，相当于订阅-观察者模式的事件池
                Dep.target && dep.addSub(Dep.target);
                // 订阅数据变化时，往Dep里添加观察
                return value
            },
            set: (newVal) => {
                // 对更改的数据也添加监听
                this.observe(newVal)
                if (newVal !== value) {
                    value = newVal;
                }
                // 数据变化通知变化
                dep.notify();
            }
        })
    }
}

```
> [网课链接，点击跳转：](https://www.bilibili.com/video/av80611222?p=1)