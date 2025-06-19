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
            <ElCarouselItem v-for="product in data.products.slice(0, 5)" :key="product.id" class="carousel-item">
                <img :src="product.imagesUrl[0]" alt="carousel item" class="image"/>
            </ElCarouselItem>
        </ElCarousel>
    </div>
    <div class="category-container">
        <div class="earrings category-item" v-if="earringsProducts.length > 0">
            <h4 class="sub-title">Earrings</h4>
            <CardProduct :data="earringsProducts"/>
        </div>
        <div class="necklace category-item" v-if="necklaceProducts.length > 0">
            <h4 class="sub-title">Necklace</h4>
            <CardProduct :data="necklaceProducts"/>
        </div>
        <div class="ring category-item" v-if="ringProducts.length > 0">
            <h4 class="sub-title">Ring</h4>
            <CardProduct :data="ringProducts"/>
        </div>
        <div class="bracelet category-item" v-if="braceletProducts.length > 0">
            <h4 class="sub-title">Bracelet</h4>
            <CardProduct :data="braceletProducts"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.el-carousel__container) {
    height: 250px;
    width: 100%;
    margin-top:45px;

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

    .category-item {
        margin: 2rem 0;
        padding: 0 5px;

        h4 {
            text-align: center;
            letter-spacing: 0.3rem;
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
            font-weight: 400;
        }
    }
}


@media(min-width: $breakpoint-tablet) {
    :deep(.el-carousel__container) {
        height: 350px;
    }

    .category-item {
        margin: 2rem 400px;
    }
}

@media(min-width: $breakpoint-desktop) {
    :deep(.el-carousel__container) {
        height: 450px;
    }

    .category-item {
        margin: 2rem 500px;
    }
}

</style>