<script setup>
import { ElInputNumber, ElButton, ElCarousel, ElCarouselItem, ElTabs, ElTabPane, ElDivider, ElBreadcrumb, ElBreadcrumbItem, ElMessage } from "element-plus"
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { reqProductDetail, reqProducts } from "@/api/front/frontProducts.js";
import { CardProduct, DrawerCartList } from "@/components/front/index.js";
import { useCartStore } from "@/store/modules/cart.js";
import { useIsMobile } from "@/composables/useIsMobile";

const route = useRoute();
const router = useRouter();
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
const drawerCartListRef = ref()
const { isMobile } = useIsMobile()

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

const addToCart = async(id, count) => {
    await cartStore.addToCart({
        product_id: id,
        qty: count
    })

    if(isMobile.value) {
        await drawerCartListRef.value.open()
    }
}

const goToCheckout = async(id, count) => {
    await cartStore.addToCart({
        product_id: id,
        qty: count
    })

    await router.push("/cart")
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
                <h5>{{data.product.title}}</h5>
                <div class="price-info">
                    <p>$NTD {{ data.product.origin_price }}</p>
                    <h6>$NTD {{ data.product.price }}</h6>
                </div>
                <h6>
                    {{ data.product.description }}
                </h6>
                <ElInputNumber v-model="count" :min="1" :max="10"/>
                <div class="button-wrapper">
                    <ElButton type="primary" @click="addToCart(data.product.id, count)">加入購物車</ElButton>
                    <ElButton type="warning" @click="goToCheckout(data.product.id, count)">立即購買</ElButton>
                </div>

            </div>
        </div>

        <ElTabs v-model="activeName" class="tabs-wrapper">
            <ElTabPane label="商品描述" name="first" class="product-info">
                <p>{{ data.product.content }}</p>
            </ElTabPane>
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
            <ElTabPane label="保養方式" name="third" class="jewelry-care">
                <h5>飾品配戴時的保養</h5>
                <p>1. 預防飾品損壞，需要避免飾品接觸到香水、酒精、去光水、清潔劑、化妝品或其它含有化學藥劑成分的物質</p>
                <p>2. 避免於泡溫泉、洗澡、去海邊玩時配戴飾品，以免影響飾品光澤或是損壞飾品。</p>
                <h5>飾品配戴後的保養</h5>
                <p>1.若長時間不配戴，建議可用軟布擦拭掉飾品上因配戴後所殘留的汗水、油脂。</p>
                <p>2. 因為飾品的材質不一，軟硬度也不同，建議把飾品個別收納在夾鏈袋中，不但可以隔絕空氣氧化，也可以避免放在同一個首飾盒中互相摩擦而受傷。</p>
                <h5>飾品清潔保養</h5>
                <p>1. 一般飾品只要以清水混合一點點中性洗碗精，搭配軟毛牙刷清洗，沖洗後以軟布將水分擦拭乾淨即可。</p>
                <p>2. 銀飾品變黑是因為跟空氣中的硫產生硫化作用，只要使用洗銀水或拭銀布就可以讓銀飾品恢復以往光澤，若是擔心銀飾品失重，也可以使用較高級的洗銀乳來保養貴重的銀飾珠寶。</p>
                <p>3. 輕微的汙垢可以用牙刷或化妝棉沾取牙膏在發黑的地方，輕輕畫圓擦拭後，就能除去氧化的部分，達到拋光的效果了。</p>
            </ElTabPane>
        </ElTabs>

        <div class="other-products" v-if="similarProducts.length > 0">
            <ElDivider content-position="center"><h5>你可能也會喜歡</h5></ElDivider>
            <div class="card-wrapper">
                <CardProduct :data="product" v-for="product in similarProducts.slice(0,3)" :key="product.id"/>
            </div>
        </div>
    </div>

    <DrawerCartList ref="drawerCartListRef" />
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
        margin-top: 1rem;

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

            h5 {
                font-size: 1.5rem;
                font-weight: bold;
            }

            .price-info {
                display: flex;
                flex-direction: row;
                gap: 0.5rem;

                h6 {
                    font-size: 1.1rem;
                    font-weight: bold;
                }

                > :first-child {
                    text-decoration: line-through;
                    opacity: 0.7;
                    font-style: italic;
                }
            }

            h6 {
                white-space: pre-line;
                word-break: break-word;
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

    .tabs-wrapper {
        width: 100%;
        margin: 0 auto;

        .product-info, .payment-and-delivery-method, .jewelry-care {
            padding: 10px;
        }

        :deep(.el-tabs__header) {
            margin: 0 auto;
        }

        .jewelry-care {
            width:90%;
            margin: 0 auto;
        }


        .payment-and-delivery-method, .product-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            white-space: pre-line;
            word-break: break-word;

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

        .jewelry-care {

            h5 {
                margin: 10px 0;
                font-weight: 700;
                color:$base-brand-color;
            }
        }
    }

    .other-products {
        width: 100%;

        :deep(.el-divider) {
            .el-divider__text {
                background-color: $base-background-color;
            }
        }

        >h5 {
            text-align: center;
        }

        .card-wrapper {
            display: flex;
            gap: 1.5rem;
            padding: 0 1rem;
            margin: 1rem auto;
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

        .tabs-wrapper {
            width: 80%;
            margin: 0 auto;
            :deep(.el-tabs__header) {
                margin: 0 auto;
            }

            .jewelry-care {
                max-width: 80%;
                width: 100%;
                padding: 20px 20px;
                margin: 10px auto;
            }
        }

        .other-products {
            width: 70%;
            margin: 0 auto;
        }
    }
}

@media (min-width: $breakpoint-desktop) {
    .container {
        .other-products {
            width: 50%;
            margin: 0 auto;
        }
    }

}

</style>