<script setup>
import { ElCarousel, ElCarouselItem } from 'element-plus';
import { ref, onMounted, computed } from 'vue';
import { reqAllProducts } from '@/api/front/frontProducts';
import { CardProduct } from "@/components/front/index.js";

const data = ref({
    success: false,
    products: []
})

const getAllProducts = async () => {
    data.value = await reqAllProducts()
}

const earringsProducts = computed(() => {
    return data.value.products.filter(product => product.category === '耳環') || []
})

const necklaceProducts = computed(() => {
    return data.value.products.filter(product => product.category === "項鍊") || []
})

const ringProducts = computed(() => {
    return data.value.products.filter(product => product.category === "戒指") || []
})

const braceletProducts = computed(() => {
    return data.value.products.filter(product => product.category === "手鐲") || []
})

onMounted(() => {
    getAllProducts()
})


</script>

<template>
    <div class="carousel-container" v-if="data">
        <ElCarousel>
            <ElCarouselItem v-for="product in data.products" :key="product.id" class="carousel-item">
                <img :src="product.imagesUrl[0]" alt="carousel item" class="image"/>
            </ElCarouselItem>
        </ElCarousel>
    </div>
    <div class="category-container">
        <div class="earrings-section" v-if="earringsProducts.length > 0">
            <CardProduct title="Earrings" :data="earringsProducts"/>
        </div>
        <div class="necklace-section" v-if="necklaceProducts.length > 0">
            <CardProduct title="Necklace" :data="necklaceProducts"/>
        </div>
        <div class="ring-section" v-if="ringProducts.length > 0">
            <CardProduct title="Ring" :data="ringProducts"/>
        </div>
        <div class="bracelet-section" v-if="braceletProducts.length > 0">
            <CardProduct title="Bracelet" :data="braceletProducts"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.el-carousel__container) {
    height: 250px;
    width: 100%;

    .carousel-item {
        height: 100%;

        .image {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
}

.category-container {
    margin-top: 2rem;
}


@media(min-width: $breakpoint-tablet) {
    :deep(.el-carousel__container) {
        height: 350px;
    }
}

@media(min-width: $breakpoint-desktop) {
    :deep(.el-carousel__container) {
        height: 450px;
    }

}

</style>