<script setup lang="ts">
import { ElCarousel, ElCarouselItem } from 'element-plus';
import { ref, onMounted, computed } from 'vue';
import { reqAllProducts } from '@/api/front/frontProducts';
import { CardProduct, DialogShowCoupon } from "@/components/front/index.js";
import noImage from "@/assets/images/no-image.jpg"
import type { ProductData } from "@/types/front/product"

const data = ref<ProductData[]>([])

const getAllProducts = async () => {
  try{
    const res = await reqAllProducts()
    data.value = res.data.products
    console.log(data.value)
  } catch(error){
    console.error(error)
  }
}

const earringsProducts = computed(() => {
    return data.value.filter(product => product.category === '耳環') || []
})

const necklaceProducts = computed(() => {
    return data.value.filter(product => product.category === "項鍊") || []
})

const ringProducts = computed(() => {
    return data.value.filter(product => product.category === "戒指") || []
})

const braceletProducts = computed(() => {
    return data.value.filter(product => product.category === "手鐲") || []
})

onMounted(() => {
    getAllProducts()
})


</script>

<template>
    <div class="carousel-container" v-if="data">
        <ElCarousel type="card">
            <ElCarouselItem v-for="product in data.slice(0, 4)" :key="product.id" class="carousel-item">
                <RouterLink :to="{path:`/product/${product.id}`}">
                    <img :src="product.imagesUrl[0]?? noImage" v-if="product.imagesUrl.length" alt="carousel item" class="image"/>
                </RouterLink>
            </ElCarouselItem>
        </ElCarousel>
    </div>
    <div class="category-container">
        <template v-if="earringsProducts.length > 0">
            <h4 class="sub-title" >Earrings</h4>
            <div class="earrings card-wrapper">
                <CardProduct :data="product" v-for="product in earringsProducts" :key="product.id"/>
            </div>
        </template>

        <template v-if="necklaceProducts.length > 0">
            <h4 class="sub-title">Necklace</h4>
            <div class="necklace card-wrapper">
                <CardProduct :data="product" v-for="product in necklaceProducts" :key="product.id"/>
            </div>
        </template>

        <template v-if="ringProducts.length > 0">
            <h4 class="sub-title">Ring</h4>
            <div class="ring card-wrapper">
                <CardProduct :data="product" v-for="product in ringProducts" :key="product.id" />
            </div>
        </template>

        <template v-if="braceletProducts.length > 0">
            <h4 class="sub-title">Bracelet</h4>
            <div class="bracelet card-wrapper">
                <CardProduct :data="product" v-for="product in braceletProducts" :key="product.id" />
            </div>
        </template>
    </div>
    <DialogShowCoupon />
</template>

<style scoped lang="scss">
:deep(.el-carousel__container) {
    height: 250px;
    width: 100%;
    margin-top:$base-header-height;

    .carousel-item {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .image {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}

.category-container {
    h4 {
        text-align: center;
        letter-spacing: 0.3rem;
        font-family: 'Cormorant Garamond', serif;
        font-style: italic;
        font-weight: 400;
        margin-top: 50px;
    }

    .card-wrapper {
        display: grid;
        grid-template-columns: repeat(2, minmax(150px, 1fr));
        grid-gap: 1rem;
        margin: 4rem auto;
        padding: 0 1rem;
        width: 100%;
        justify-items: center;
    }
}


@media(min-width: $breakpoint-tablet) {
    :deep(.el-carousel__container) {
        height: 350px;
    }

    .category-container {
        margin: 0 100px;
        .card-wrapper {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
    }

}

@media(min-width: $breakpoint-desktop) {
    :deep(.el-carousel__container) {
        height: 450px;
    }

    .category-container {
        margin: 0 200px;
        .card-wrapper {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
    }
}

</style>