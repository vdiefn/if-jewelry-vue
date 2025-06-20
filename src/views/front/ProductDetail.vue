<script setup>
import { ElInputNumber, ElButton, ElCarousel, ElCarouselItem, ElTabs, ElTabPane, ElDivider } from "element-plus"
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'
import { reqProductDetail, reqProducts } from "@/api/front/frontProducts.js";
import { CardProduct } from "@/components/front/index.js";

const route = useRoute();
const selectNumber = ref(0)
const data = ref({})
const activeName = ref("first")
const currentCategory = ref("")
const similarProducts = ref({})

const getProductDetail = async(id) => {
    try {
        data.value = await reqProductDetail(id);
        currentCategory.value = data.value.product.category
    } catch(error) {
        console.error(error);
    }
}

const getSimilarProducts = async() => {
    if(currentCategory.value.length > 0) {
        try {
            similarProducts.value = await reqProducts(1, currentCategory.value);
        } catch(error) {
            console.error(error);
        }
    }
}

watch(currentCategory,() => {
    getSimilarProducts()
})

onMounted(() => {
    getProductDetail(route.params.id)
})

</script>

<template>
    <div class="container" v-if="data.product">
        <ElCarousel :autoplay="false" height="200">
            <ElCarouselItem v-for="(image, index) in data.product.imagesUrl" :key="index">
                <img :src="image" alt="product image" />
            </ElCarouselItem>
        </ElCarousel>
        <div class="purchase-section">
            <h4>{{data.product.title}}</h4>
            <div class="price-info">
                <p>$NTD {{ data.product.origin_price }}</p>
                <h5>$NTD {{ data.product.price }}</h5>
            </div>
            <ElInputNumber v-model="selectNumber" :min="1" :max="10"/>
            <ElButton>加入購物車</ElButton>
            <ElTabs v-model="activeName" class="tabs-wrapper" @tab-click="handleClick">
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
        </div>
        <div class="other-products" v-if="similarProducts">
            <ElDivider content-position="center"><h5>你可能也會喜歡</h5></ElDivider>
            <div class="card-wrapper">
                <div class="card" v-for="product in similarProducts.products.slice(0,4)" :key="product.id">
                    <RouterLink :to="{ path: `/product/${product.id}` }">
                        <img
                            :src="product.imagesUrl[0]"
                            alt="product photo"
                            class="product-image"
                        />
                        <div class="card-text">
                            <h5 class="card-title">{{ product.title }}</h5>
                            <div class="price-wrapper">
                                <span class="price-origin">${{ product.origin_price }}</span>
                                <p class="price">${{ product.price }}</p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>

        </div>
    </div>

</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    margin-top: $base-header-height;

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

        .el-button {
            width: 100%;
            background-color: $base-primary-color;
            color: #fff;
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
    }

    .product-info {
        margin: 0.5rem 0;
        padding: 0 1rem;
    }

    .other-products {

        :deep(.el-divider) {
        }
        >h5 {
            text-align: center;
        }

        .card-wrapper{
            display: grid;
            grid-template-columns: repeat(2, minmax(150px, 1fr));
            grid-gap: 1rem;
            margin: 1rem auto;
            width: 100%;
            justify-items: center;

            .card {
                width: 100%;
                overflow: hidden;

                .product-image {
                    width: 100%;
                    height: 100%;
                    min-height: 80px;
                    max-height: 120px;
                    display: block;
                    object-fit: cover;
                }

                .card-text {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .price-wrapper {
                        display: flex;
                        flex-direction: row;
                        gap: 5px;

                        .price-origin {
                            text-decoration: line-through;
                            color: #999;
                            font-size: 10px;
                        }

                        .price {
                            color: $base-primary-color;
                            font-size: 1.1 rem;
                            font-style: italic;
                        }
                    }
                }
            }
        }





    }

    @media (min-width: $breakpoint-tablet) {
        .card-wrapper {
            display: grid;
            grid-template-columns: repeat(3, minmax(200px, 1fr));

            .card {
                .product-image {
                    width: 100%;
                    height: 100%;
                    min-height: 100px;
                    max-height: 150px;
                }
            }
        }
    }

    @media (min-width: $breakpoint-desktop) {
        .card-wrapper {
            display: grid;
            grid-template-columns: repeat(4, minmax(200px, 1fr));

            .card {
                .product-image {
                    width: 100%;
                    height: 100%;
                    min-height: 150px;
                    max-height: 200px;
                }
            }
        }
    }
}

</style>