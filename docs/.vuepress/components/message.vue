<template>
<div>
    <nut-textinput
            v-model="val"
            label="请输入留言信息："
            placeholder="请输入内容"
            :clearBtn="true"
            :disabled="false"
    />
    <nut-button @click="submit">
        提交信息
    </nut-button>
</div>
</template>

<script>
    export default {
        name: "message",
        data(){
            return {
                val:'',
            }
        },
        mounted () {
        },
        methods:{
            submit(){
                console.log(this.val)
            }
        }
    }
</script>

<style scoped>

</style>
