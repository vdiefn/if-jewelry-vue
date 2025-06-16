<script setup>
import { ElCarousel, ElCarouselItem } from 'element-plus';
import { ref, onMounted, computed } from 'vue';
import { reqAllProducts } from '@/api/front/frontProducts';

const data = ref({
    success: false,
    products: []
})

const getAllProducts = async () => {
    data.value = await reqAllProducts()
}

const earringsProduct = computed(() => {
    return data.value.products.filter(product => product.category === '耳環') || []
})

onMounted(() => {
    getAllProducts()
})


</script>

<template>
    <div class="carousel-container" v-if="data">
        <ElCarousel>
            <ElCarouselItem v-for="product in data.products" :key="product.id" class="carousel-item">
                <img :src="product.imagesUrl[0].url" alt="carousel item" class="image"/>
            </ElCarouselItem>
        </ElCarousel>
    </div>
    <div class="category-container" style="margin-top: 2rem;">
        <div class="earrings-section" v-if="earringsProduct.length > 0">
            <h4 class="sub-title">Earrings</h4>
            <ul class="product-list-wrapper">
                <li v-for="product in earringsProduct" :key="product.id">
                    <RouterLink to="/">
                        <img :src="product.imagesUrl[0].url" alt="product photo" class="product-image"/>
                        <p class="name">{{ product.title }}</p>
                        <p class="price-origin">${{ product.origin_price }}</p>
                        <p class="price">${{ product.price }}</p>
                    </RouterLink>
                </li>
            </ul>
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
    .earrings-section {
        > h4 {
            text-align: center;
            letter-spacing: 0.3rem;
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
            font-weight: 400;
        }

        .product-list-wrapper {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 1rem;
            margin-top: 1rem;

            //li {
            //
            //    .product-image {
            //        width: 100px;
            //        height: 100px;
            //    }
            //}
        }
    }
}

.price-origin {
    text-decoration: line-through;
    color: #999;
    font-size: 14px;
}
.price {
    color: $base-primary-color;
    font-weight: bold;
    font-size: 16px;
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