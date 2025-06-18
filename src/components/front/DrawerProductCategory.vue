<script setup>
import {ElDrawer, ElDivider} from "element-plus";
import { ref } from "vue"

const drawer = ref(false)

const open = () => {
    drawer.value = true
}

const close = () => {
    drawer.value = false
}

defineExpose({ open })
</script>

<template>
    <ElDrawer v-model="drawer" size="60%">
        <span>Hi there!</span>
        <router-link class="products nav-link" to="/Products" @click="close">
            <p>所有商品</p>
        </router-link>

        <p>品牌故事</p>
        <ElDivider />
        <h5>分類</h5>
        <p>耳環</p>
        <p>耳環</p>
        <p>耳環</p>
        <p>耳環</p>
        <ElDivider />
        <h5>其他</h5>
        <p>服務時間：週一~週五 09:00~18:30</p>
        <p>聯絡我們：Email</p>
    </ElDrawer>

</template>

<style scoped lang="scss">

</style>