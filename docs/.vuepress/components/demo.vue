<template>
    <ul>
        <li v-for="item in list">
            <span>标题：{{item}}</span>

        </li>
    </ul>
</template>

<script>
    export default {
        name: "demo",
        data() {
            return {
                list: [1, 2, 3, 4]
            }
        }
    }
</script>

<style scoped>

</style>
