<template>
    <div>
        <div>我是夜猫</div>
        <nut-cell
                title = "左侧主标题"
                subTitle = "左侧副标题"
                desc = "右侧描述文字"
                :showIcon = "true"
        >
        </nut-cell>

        <nut-button
                block
                shape="circle"
                @click="showShome"
        >
            登录
        </nut-button>
    </div>
</template>

<script>
    export default {
        name: "nutui-page",
        mounted() {
            this.$toast.text('提示信息');
        },
        methods:{
            showShome(){
                this.$dialog({
                    id:'my-dialog',
                    title: "确定删除此订单？",
                    content: "删除后将从你的记录里消失，无法找回"
                });
            }
        }
    }
</script>

<style scoped>

</style>