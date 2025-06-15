<script setup>
import { ElCarousel, ElCarouselItem } from 'element-plus';
import { ref, onMounted } from 'vue';
import { reqAllProducts } from '@/api/front/frontProducts';

const data = ref()

const getAllProducts = async () => {
    const res = await reqAllProducts()
    data.value = res
}

onMounted(() => {
    getAllProducts()
})


</script>

<template>
    <div class="carousel-container" v-if="data" style="">
        <ElCarousel>
            <ElCarousel-item v-for="product in data.products" :key="product.id" class="carousel-item">
                <img :src="product.imagesUrl[0].url" alt="carousel item" class="image"/>
            </ElCarousel-item>
        </ElCarousel>
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