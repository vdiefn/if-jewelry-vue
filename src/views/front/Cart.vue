<script setup>
import { useCartStore } from "@/store/modules/cart.js"
import { ElInputNumber, ElCard, ElInput, ElButton, ElMessage, ElIcon } from "element-plus";
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { reqCoupon } from "@/api/front/cart"
import { Search } from "@element-plus/icons-vue";

const cartStore = useCartStore()
const loading = ref(false)
const router = useRouter()
const perInput = ref("")

const handleQtyChange = async(row) => {
    await cartStore.editCartProduct(row)
}

const handleDeleteProduct = async(id) =>{
    loading.value = true
    try {
        await cartStore.deleteCartProduct(id)
    } finally {
        loading.value = false
    }
}

const handleGetCoupon = async(perInput) => {
    try {
        const res = await reqCoupon({
            data: {
                code: perInput
            }
        })
        if(res.success) {
            ElMessage({
                type:success,
                message: "已成功使用折價券"
            })
        } else {
            ElMessage({
                type: error,
                message: res.message
            })
        }
    } catch(error) {
        console.error(error)
    }
}

onMounted(() => {
    cartStore.getCartProducts()
})

</script>

<template>
    <div class="container">
        <div class="cart-title">
            <h4>購物車</h4>
        </div>
        <template v-if="cartStore.cartList.length === 0">
            <ElCard class="empty-cart-text">
                <h5>你的購物車是空的喔!</h5>
                <ElButton type="primary" @click="router.push('/products')">
                    前往購物
                </ElButton>
            </ElCard>
        </template>
        <template v-else>
            <div class="cart-container-mobile">
                <ElCard
                    class="cart-card"
                    v-for="item in cartStore.cartList"
                    :key="item.id"
                >
                    <div class="card-content">
                        <div class="image">
                            <img :src="item.product.imagesUrl[0]" alt="商品圖片" />
                        </div>
                        <div class="info">
                            <h3 class="title">{{ item.product.title }}</h3>
                            <p class="content">{{ item.product.content }}</p>
                            <div class="price">
                                <span class="price-old">NTD {{ item.product.origin_price }}</span>
                                <span class="price-now">NTD {{ item.product.price }}</span>
                            </div>
                            <div class="operation">
                                <ElInputNumber
                                    v-model="item.qty"
                                    :min="1"
                                    size="small"
                                    @change="handleQtyChange(item)"
                                />
                                <i @click="handleDeleteProduct(item.id)">
                                    <font-awesome-icon :icon="['far', 'trash-can']" />
                                </i>
                            </div>
                            <div class="subtotal">
                                <p>小計: NTD {{ item.total }}</p>
                            </div>
                        </div>
                    </div>
                </ElCard>
                <ElCard class="cart-coupon">
                    <h5>您是否有優惠碼？</h5>
                    <ElInput
                        v-model="perInput"
                        placeholder="請輸入優惠碼"
                        class="input-with-search"
                    >
                        <template #append>
                            <ElButton @click="handleGetCoupon(perInput)" type="text" :icon="Search" class="icon-button"/>
                        </template>
                    </ElInput>
                </ElCard>
                <ElCard class="cart-price-card">
                    <h5>購物車清單</h5>
                    <div class="final-total">
                        <p>小計</p>
                        <p>NTD {{ cartStore.cartData.total > 0? cartStore.cartData.total : 0 }}</p>
                    </div>
                    <div class="final-total-discount">
                        <p>總計</p>
                        <p>NTD {{ cartStore.cartData.final_total > 0? cartStore.cartData.final_total : 0 }}</p>
                    </div>
                </ElCard>
                <div class="operation-btn">
                    <ElButton type="primary" @click="router.push('/check')">前往結帳</ElButton>
                    <ElButton @click="router.back()">繼續購物</ElButton>
                </div>
            </div>
            <div class="table-container">
                <ElTable :data="cartStore.cartList" table-layout="auto" stripe>
                    <ElTableColumn label="圖片" width="100">
                        <template #default="{ row }">
                            <img
                                :src="row.product.imagesUrl[0]"
                                alt="product image"
                                class="product-img"
                            />
                        </template>
                    </ElTableColumn>
                    <ElTableColumn prop="product.title" label="商品名稱" />
                    <ElTableColumn label="價格" width="1" align="center">
                        <template #default="{ row }">
                            <span class="new-price">NTD {{ row.product.price }}</span>
                            <br />
                            <small class="old-price">NTD {{ row.product.origin_price }}</small>
                        </template>
                    </ElTableColumn>
                    <ElTableColumn label="數量" width="1" align="center">
                        <template #default="{ row }">
                            <ElInputNumber
                                v-model="row.qty"
                                :min="1"
                                @change="handleQtyChange(row)"
                                size="small"
                            />
                        </template>
                    </ElTableColumn>
                    <ElTableColumn prop="total" label="小計" align="center" width="1"/>
                    <ElTableColumn prop="" width="50" align="center">
                        <template #default="{ row }">
                            <i @click="handleDeleteProduct(row.id)" class="delete-icon">
                                <font-awesome-icon :icon="['far', 'trash-can']" />
                            </i>
                        </template>
                    </ElTableColumn>
                </ElTable>
                <div class="card-wrapper">
                    <ElCard class="cart-coupon">
                        <h5>您是否有優惠碼？</h5>
                        <ElInput
                            v-model="perInput"
                            placeholder="請輸入優惠碼"
                            class="input-with-search"
                        >
                            <template #append>
                                <ElButton @click="handleGetCoupon(perInput)" type="text" :icon="Search" class="icon-button"/>
                            </template>
                        </ElInput>
                    </ElCard>
                    <ElCard class="cart-price-card">
                        <h5>購物車清單</h5>
                        <div class="final-total">
                            <p>小計</p>
                            <p>NTD {{ cartStore.cartData.total > 0? cartStore.cartData.total : 0 }}</p>
                        </div>
                        <div class="final-total-discount">
                            <p>總計</p>
                            <p>NTD {{ cartStore.cartData.final_total > 0? cartStore.cartData.final_total : 0 }}</p>
                        </div>
                    </ElCard>
                    <div class="operation-btn">
                        <ElButton type="primary" @click="router.push('/check')">前往結帳</ElButton>
                        <ElButton @click="router.back()">繼續購物</ElButton>
                    </div>
                </div>

            </div>
        </template>
    </div>

</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    margin: $base-header-height auto;
    padding: 10px 10px;

    .cart-title, .empty-cart-text {
        max-width: 500px;
        width: 100%;
        margin: 1rem auto;
    }

    .empty-cart-text {
        .el-button {
            width:50%;
            margin-top:1rem;
        }
    }

    .cart-container-mobile {
        display: grid;
        grid-gap: 10px;

        .cart-card, .cart-price-card, .cart-coupon, .operation-btn {
            border-radius: 3px;
            max-width: 500px;
            width: 100%;
            margin: 0 auto;
        }

        .cart-card {
            .card-content {
                display: flex;
                gap: 10px;

                .image {
                    flex: 0 0 90px;

                    img {
                        width: 100%;
                        height: auto;
                        object-fit: cover;
                        aspect-ratio: 1/1;
                    }
                }

                .info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .title {
                        font-size: 16px;
                        font-weight: bold;
                        color: $base-brand-color;
                    }

                    .content {
                        font-size: 13px;
                        color: $base-muted-text-color;
                        margin: 4px 0;
                    }

                    .price {
                        display: flex;
                        gap:5px;

                        .price-old {
                            margin-left: 0.5rem;
                            color: $base-muted-text-color;
                            text-decoration: line-through;
                            font-size: 12px;
                        }

                        .price-now {
                            color: $base-primary-color;
                            font-weight: bold;
                        }
                    }

                    .operation {
                        margin-top: 8px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        i {
                            cursor: pointer;
                        }
                    }

                    .subtotal {
                        margin-top: 1rem;
                    }
                }
            }
        }

        .cart-coupon {
            .input-with-search {
                margin-top: 0.5rem;

                .icon-button {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                }
            }
        }

        .cart-price-card {
            h5 {
                margin-bottom: 0.5rem;
            }

            .final-total, .final-total-discount {
                display: flex;

                :first-child {
                    flex:1;
                }
            }

            .final-total-discount {
                font-weight: 700;
                font-size: 1.1rem;
            }
        }

        .operation-btn {
            display: flex;
            flex-direction: column;
            gap:5px;

            .el-button {
                margin: 0;
                width: 100%;
            }
        }
    }

    .table-container {
        display: none;
    }

    @media(min-width: $breakpoint-desktop) {
        .cart-title, .empty-cart-text {
            margin-left: 5%;
        }

        .cart-container-mobile {
            display: none;
        }

        .table-container {
            display: grid;
            grid-template-columns: 70% 30%;
            max-width: 90%;
            width: 100%;
            margin: 0 auto;

            .el-table {
                width: 100%;

                :deep(.cell) {
                    white-space: nowrap;
                }

                :deep(.new-price) {
                    color: $base-primary-color;
                    font-weight: bold;
                    margin-left: 10px;
                }
                :deep(.old-price) {
                    text-decoration: line-through;
                }

                .product-img {
                    width: 80px;
                    height: auto;
                    object-fit: cover;
                    aspect-ratio: 1/1;
                }
            }

            .card-wrapper {
                display: flex;
                flex-direction: column;
                gap: 5px;
                align-items: center;

                .cart-title, .cart-price-card, .cart-coupon, .operation-btn {
                    max-width: 80%;
                    width: 100%;
                }

                .cart-price-card {
                    h5 {
                        margin-bottom: 0.5rem;
                    }

                    .final-total, .final-total-discount {
                        display: flex;

                        :first-child {
                            flex:1;
                        }
                    }

                    .final-total-discount {
                        font-weight: 700;
                        font-size: 1.1rem;
                    }
                }

                .operation-btn {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    margin-top: 1rem;

                    .el-button {
                        margin: 0;
                    }
                }
            }
        }
    }
}






</style>