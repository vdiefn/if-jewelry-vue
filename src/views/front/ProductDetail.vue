<script setup>
import { ElInputNumber, ElButton } from "element-plus"
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { reqProductDetail } from "@/api/front/frontProducts.js";

const route = useRoute();
const selectNumber = ref(0)
const data = ref({})

const getProductDetail = async(id) => {
    try {
        data.value = await reqProductDetail(id);
    } catch(error) {
        console.error(error);
    }
}
onMounted(() => {
    getProductDetail(route.params.id)
})

</script>

<template>
    <div class="container">
        <img src="" alt="product image" />
        <h5>{{data.product.title}}</h5>
        <p>$NTD {{ data.product.price }}</p>
        <ElInputNumber v-model="selectNumber" :min="1" :max="10"/>
        <ElButton>加入購物車</ElButton>
    </div>

</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    margin-top: $base-header-height;
}

</style>