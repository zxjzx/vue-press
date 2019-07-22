<template>
    <div>
        <h3 align="center">执行js代码</h3>
        <iframe src="//player.bilibili.com/player.html?aid=52738855&cid=92292788&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

        <div align="center">
            <textarea v-model="runValue" class="content"></textarea>
            <input id="Button2" type="button" value="执行程序" @click="Button1_onclick" style="width: 145px"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "demo",
        props: {
            runCode: {
                type: String,
                default: 'console.log(123)'
            }
        },
        data() {
            return {
                runValue: ''
            }
        },
        created() {
            this.runValue = this.runCode
        },
        methods: {
            Button1_onclick() {
                try {
                    let str = "try{" + this.runValue + "}catch(e){alert('你的代码有错：'+e.description);}";// 构造函数体
                    (new Function(str))();    // 构造函数
                    // 调用函数
                } catch (e) {
                    alert("错误：" + e.description);  // 输出错误信息
                }
            }
        }
    }
</script>

<style scoped>
    .content {
        width: 612px;
        height: 300px
    }
</style>
