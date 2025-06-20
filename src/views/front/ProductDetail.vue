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
        <div class="top">
            <ElCarousel :autoplay="false" height="200" >
                <ElCarouselItem v-for="(image, index) in data.product.imagesUrl" :key="index">
                    <img :src="image" alt="product image" />
                </ElCarouselItem>
            </ElCarousel>
            <div class="image-section">
                <div class="big-image">
                    <img src="" alt="">
                </div>
                <ul class="small-image">
                    <li v-for="image in data.product.imagesUrl" :key="data.product.id">
                        <img :src="image" alt="" />
                    </li>
                </ul>
            </div>
            <div class="purchase-section">
                <h4>{{data.product.title}}</h4>
                <div class="price-info">
                    <p>$NTD {{ data.product.origin_price }}</p>
                    <h5>$NTD {{ data.product.price }}</h5>
                </div>
                <ElInputNumber v-model="selectNumber" :min="1" :max="10"/>
                <ElButton>加入購物車</ElButton>
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

        <div class="other-products" v-if="similarProducts.products">
            <ElDivider content-position="center"><h5>你可能也會喜歡</h5></ElDivider>
            <div class="card-wrapper">
                <CardProduct :data="product" v-for="product in similarProducts.products.slice(0,4)" :key="product.id"/>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    margin-top: $base-header-height;

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

            .el-button {
                width: 100%;
                background-color: $base-primary-color;
                color: #fff;
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
            display: grid;
            grid-template-columns: repeat(2, minmax(150px, 1fr));

            .el-carousel {
                display: none;
            }

            .image-section {
                border: 1px solid red;
                //display: block;
                width: 480px;
                height: 480px;
                position: relative;
                display: flex;
                margin-top: 1rem;

                .big-image {
                    width: 70%;
                    height: 70%;
                    object-fit: cover;
                    border: 1px solid blue;
                }

                .small-image {
                    border: 1px solid green;
                    width: 20%;

                    ul {
                        li {
                            width: 30%;
                            height: 30%;
                            cursor: pointer;
                            margin: 0;

                            &:hover,
                            &.active {
                                border: 2px solid blue;
                            }
                        }
                    }
                }
            }

            .purchase-section{
                border: 1px solid red;
                display: block;
            }
        }
    }
    .card-wrapper {
        display: grid;
        grid-template-columns: repeat(3, minmax(200px, 1fr));
    }
}

@media (min-width: $breakpoint-desktop) {
    .card-wrapper {
        display: grid;
        grid-template-columns: repeat(4, minmax(200px, 1fr));
    }
}

</style>