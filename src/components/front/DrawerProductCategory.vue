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
        <h5>Contact Us</h5>
        <RouterLink :to="{name: 'About'}"><p>品牌故事</p></RouterLink>
        <RouterLink class="products nav-link" to="/products" @click="close">
            <p>所有商品</p>
        </RouterLink>
        <RouterLink :to="{name: 'JewelryStory'}"><p>寶石小教室</p></RouterLink>
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
        <RouterLink :to="{name: 'Faq'}"><p>常見問題</p></RouterLink>
        <RouterLink :to="{name: 'ShippingAndPayment'}"><p>運送及付款方式</p></RouterLink>
        <ElDivider />
        <h5>聯絡我們</h5>
        <p>If Jewelry 如果工作室</p>
        <p><font-awesome-icon :icon="['far', 'envelope']" /> : support@if-jewelry.com</p>
        <p><font-awesome-icon :icon="['fas', 'phone']" /> : 02-8765-4321</p>
    </ElDrawer>

</template>

<style scoped lang="scss">
h5 {
    font-weight: 700;
    margin-bottom: 5px;
}
</style>