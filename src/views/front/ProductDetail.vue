<script setup>
import { ElInputNumber, ElButton, ElCarousel, ElCarouselItem, ElTabs, ElTabPane, ElDivider, ElBreadcrumb, ElBreadcrumbItem } from "element-plus"
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'
import { reqProductDetail, reqProducts } from "@/api/front/frontProducts.js";
import { CardProduct } from "@/components/front/index.js";
import { useCartStore } from "@/store/modules/cart.js";

const route = useRoute();
const count = ref(1)
const data = ref({})
const activeName = ref("first")
const currentCategory = ref("")
const currentId = ref("")
const similarProducts = ref([])
const activeImage = ref(0)
const imageList = ref([])
const loading = ref(false)
const cartStore = useCartStore()

const getProductDetail = async(id) => {
    loading.value = true

    try {
        data.value = await reqProductDetail(id);
        currentCategory.value = data.value.product.category
        currentId.value = data.value.product.id
        await getSimilarProducts()
        imageList.value = data.value.product.imagesUrl
        window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch(error) {
        console.error(error);
    } finally {
        loading.value = false
    }
}

const getSimilarProducts = async() => {
    if(currentCategory.value.length > 0) {
        try {
            const res = await reqProducts(1, currentCategory.value);
            similarProducts.value = res.products.filter(product => product.id !== currentId.value);
        } catch(error) {
            console.error(error);
        }
    }
}

const handleClickImage = (index) => {
    activeImage.value = index
}

const addToCart = () => {
    cartStore.addToCart({
        id: currentId.value,
        qty: count.value
    })
    console.log({
        id: currentId.value,
        qty: count.value
    })
}

watch(() => route.params.id, (value) => {
    getProductDetail(value)
})

onMounted(() => {
    getProductDetail(route.params.id)
})

</script>

<template>
    <div class="container" v-if="data.product" v-loading="loading">
        <ElBreadcrumb separator="/">
            <ElBreadcrumbItem>
                <RouterLink :to="{ path: '/products' }" style="font-weight: normal;">全部商品</RouterLink>
            </ElBreadcrumbItem>
            <ElBreadcrumbItem :to="`/products?category=${currentCategory}`">
                {{ currentCategory }}
            </ElBreadcrumbItem>
        </ElBreadcrumb>
        <div class="top">
            <ElCarousel :autoplay="false" height="200" >
                <ElCarouselItem v-for="(image, index) in data.product.imagesUrl" :key="index">
                    <img :src="image" alt="product image" />
                </ElCarouselItem>
            </ElCarousel>
            <div class="image-section">
                <div class="big-image">
                    <img :src="imageList[activeImage]" alt="target product picture">
                </div>
                <div class="small-image">
                    <div
                        v-for="(image, index) in imageList"
                        :key="index"
                        class="image-wrapper"
                        @click="handleClickImage(index)"
                        :class="{ active: index === activeImage }"
                    >
                        <img :src="image" alt="product picture" />
                    </div>
                </div>
            </div>
            <div class="purchase-section">
                <h4>{{data.product.title}}</h4>
                <div class="price-info">
                    <p>$NTD {{ data.product.origin_price }}</p>
                    <h5>$NTD {{ data.product.price }}</h5>
                </div>
                <h5>
                    {{ data.product.content }}
                </h5>
                <ElInputNumber v-model="count" :min="1" :max="10"/>
                <div class="button-wrapper">
                    <ElButton type="primary" @click="addToCart">加入購物車</ElButton>
                    <ElButton type="warning">立即購買</ElButton>
                </div>

            </div>
        </div>

        <ElTabs v-model="activeName" class="tabs-wrapper">
            <ElTabPane label="商品描述" name="first">{{data.product.description}}</ElTabPane>
            <ElTabPane label="送貨與付款方式" name="second" class="payment-and-delivery-method">
                <div class="text">
                    <h6>送貨方式</h6>
                    <p>If Jewelry 門市取貨</p>
                    <p>7-11 取貨不付款</p>
                    <p>全家 取貨不付款</p>
                </div>
                <div class="text">
                    <h6>付款方式</h6>
                    <p>信用卡支付</p>
                    <p>銀行轉帳</p>
                </div>
            </ElTabPane>
            <ElTabPane label="保養方式" name="third">{{ data.product.content }}</ElTabPane>
        </ElTabs>

        <div class="other-products" v-if="similarProducts.length > 0">
            <ElDivider content-position="center"><h5>你可能也會喜歡</h5></ElDivider>
            <div class="card-wrapper">
                <CardProduct :data="product" v-for="product in similarProducts.slice(0,4)" :key="product.id"/>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    margin-top: $base-header-height;

    .el-breadcrumb {
        height: 30px;
        padding: 0 1rem;
        line-height: 30px;
        margin: 0.5rem 0;
    }

    .top {
        display: flex;
        flex-direction: column;

        .image-section {
            display: none;
        }

        .purchase-section {
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 1rem;
            margin: 1rem 0;
            padding: 0 1rem;

            .price-info {
                display: flex;
                flex-direction: row;
                gap: 0.5rem;

                > :first-child {
                    text-decoration: line-through;
                    opacity: 0.7;
                    font-style: italic;
                }
            }

            .el-input-number {
                width: 100%;
            }

            .button-wrapper {
                display: flex;
                width: 100%;
                gap: 0.5rem;

                .el-button {
                    width: 100%;
                    margin: 0;
                }
            }
        }
    }


    .product-info {
        margin: 0.5rem 0;
        padding: 0 1rem;
    }

    .tabs-wrapper {
        margin: 0 auto;

        .payment-and-delivery-method {
            display: flex;
            flex-direction: column;
            align-items: center;

            .text {
                margin: 0.5rem auto;

                h6, p {
                    text-align: center;
                }

                h6 {
                    margin-bottom: 5px;
                    font-weight: bold;
                }
            }
        }
    }

    .other-products {
        :deep(.el-divider) {
            .el-divider__text {
                background-color: $base-background-color;
            }
        }

        >h5 {
            text-align: center;
        }

        .card-wrapper {
            display: grid;
            grid-template-columns: repeat(2, minmax(150px, 1fr));
            grid-gap: 1rem;
            margin: 2rem auto;
            padding: 0 1rem;
            width: 100%;
            justify-items: center;
        }
    }
}

@media (min-width: $breakpoint-tablet) {
    .container {
        .top {
            margin: 0 auto;
            display: grid;
            grid-template-columns:  minmax(200px, 1fr) minmax(150px, 1fr);
            padding: 0 1rem;
            max-width: 1000px;
            width: 100%;

            .el-carousel {
                display: none;
            }

            .image-section {
                aspect-ratio: 1 / 1;
                width: 100%;
                height: auto;
                max-width: 480px;
                position: relative;
                display: flex;
                padding: 1rem 1rem;

                .big-image {
                    aspect-ratio: 1 / 1;
                    width: 80%;
                    height: 80%;
                    object-fit: cover;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            display: block;
                        }
                }

                .small-image {
                    width: 20%;
                    height: 80%;
                    text-decoration: none;
                    margin-left: 5px;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;

                    .image-wrapper {
                        width: 100%;
                        height: 20%;
                        cursor: pointer;

                        &.active {
                            border: 2px solid $base-primary-color;
                        }

                        img {
                            width:100%;
                            height: 100%;
                            object-fit: contain;
                            display: block;
                            margin: auto;
                        }
                    }
                }
            }

            .purchase-section{
                display: block;

                h4 {
                    font-size: 2rem;
                }

                .price-info, .el-input-number, .button-wrapper {
                    margin: 1rem 0;
                }

                .button-wrapper {
                    display: flex;
                    justify-content: center;
                }

            }
        }

        .other-products {
            .card-wrapper {
                display: grid;
                grid-template-columns: repeat(3, minmax(200px, 1fr));
            }
        }
    }
}

@media (min-width: $breakpoint-desktop) {
    .container {
        .other-products {
            .card-wrapper {
                display: grid;
                grid-template-columns: repeat(4, minmax(200px, 1fr));
            }
        }
    }

}

</style>