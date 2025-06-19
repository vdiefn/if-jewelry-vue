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
        <p>品牌故事</p>
        <RouterLink class="products nav-link" to="/products" @click="close">
            <p>所有商品</p>
        </RouterLink>
        <p>寶石小教室</p>
        <ElDivider />
        <h5>分類</h5>
        <RouterLink class="products nav-link" to="/products" @click="close">
            <p>所有商品</p>
        </RouterLink>
        <RouterLink class="products nav-link" :to="{ path: '/products', query: { category: '耳環' } }" @click="close"><h6>耳環</h6></RouterLink>
        <RouterLink class="products nav-link" :to="{ path: '/products', query: {category: '戒指'}}" @click="close"><h6>戒指</h6></RouterLink>
        <RouterLink class="products nav-link" :to="{path: '/products', query: {category: '項鍊'}}" @click="close"><h6>項鍊</h6></RouterLink>
        <RouterLink class="products nav-link" :to="{path: '/products', query: {category: '手鐲'}}" @click="close"><h6>手鐲</h6></RouterLink>
        <ElDivider />
        <h5>其他</h5>
        <p>常見問題</p>
        <p>服務時間：週一~週五 09:00~18:30</p>
        <p>聯絡我們：Email</p>
    </ElDrawer>

</template>

<style scoped lang="scss">

</style>