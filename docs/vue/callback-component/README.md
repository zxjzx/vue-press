# 六、VUE父子组件传递Function,callback的应用
在用[element](https://element.eleme.cn/#/zh-CN/component/input#autocomplete-attributes),
'el-autocomplete'这个组件时我看到有一种cb的方法，又get到一点知识点，
平时使用中父子组件传参一般都是Object,Array,Boolean,String类型，如果想要传递Function，并且保证他们之间的通信如何做到呢？
+ 法一、
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>父子组件传递Function</title>
</head>
<body>
<div id="app">
    {{data}}
    <vue-callback :callback-fun="returnFunction"/>
</div>
<script src="../asserts/js/vue.min.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data() {
            return {
                data:'callback function'
            }
        },
        components:{
            'vue-callback':{
                name: 'vue-callback',
                template: `<div class="component" @click="broadCast('broadCast')">
                            点击我组件向父组件传递function,父组件处理后返回给子组件数据</div>`,
                props:{
                    callbackFun:Function //通过props传递Function组件
                },
                methods: {
                    broadCast(str){
                        console.log("step1:"+str);
                        //调用callbackFun函数
                        this.callbackFun(str,(callback=>{
                            //callback接收到父组件传递的参数后，会执行此函数
                            console.log("step3:"+callback)
                        }))
                    }
                }
            }
        },
        methods: {
            returnFunction(str,cb){
                console.log("step2:"+"returnFunction")
                cb('callback');//传递给子组件
            }
        }

    });
    //result 
    //step1:broadCast
    //step2:returnFunction
    //step3:callback
</script>
</body>
</html>

```

+ 法二、
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <vue-callback @callback-fun="transFun"/>
</div>
<script src="../asserts/js/vue.min.js"></script>
<script>
    let app = new Vue({
        el:'#app',
        components:{
            'vue-callback':{
                template:`<div><div @click="clickFun">点击我发生故事</div></div>`,
                methods: {
                    clickFun(){
                        console.log('step1:$emit');
                        this.$emit("callback-fun",{
                            params:{
                                name:'jane'
                            },
                            callback(value, index, array) {
                                console.log(`step4: 回调执行函数`)
                                console.log(value());
                            }
                        })
                    }
                }

            }
        },
        methods:{
            transFun(obj){
                console.log("step2:")
                console.log(obj);
                console.log("step3:调用callback,传入参数");
                obj.callback(
                    function () {
                        console.log("function");
                        return 'fun'
                    }
                )
            }
        }
    })
</script>
</body>
</html>
    // step1:$emit
    // step2:
    // {params: {…}, callback: ƒ}
    // step3:调用callback,传入参数
    // step4: 回调执行函数
    // function
    // fun
</script>
</body>
</html>

```
