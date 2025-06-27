<script setup>
import { useCartStore } from "@/store/modules/cart.js"
import { ElInputNumber} from "element-plus";
import { ref, onMounted } from "vue"
import {useIsMobile} from "@/composables/useIsMobile.js";

const cartStore = useCartStore()
const { isMobile } = useIsMobile()

const handleQtyChange = async(row) => {
    await cartStore.editCartProduct(row.id, row.qty)
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
            <div class="empty-cart-text">
                <p>你的購物車是空的喔!</p>
            </div>
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
                                <span class="price-now">NTD {{ item.product.price }}</span>
                                <span class="price-old">NTD {{ item.product.origin_price }}</span>
                            </div>
                            <div class="bottom-row">
                                <ElInputNumber
                                    v-model="item.qty"
                                    :min="1"
                                    size="small"
                                    @change="handleQtyChange(item)"
                                />
                            </div>
                            <div class="subtotal">
                                <p>小計：NTD {{ item.total }}</p>
                            </div>
                        </div>
                    </div>
                </ElCard>
            </div>
            <div class="table-container">
                <ElTable :data="cartStore.cartList">
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
                    <ElTableColumn label="價格">
                        <template #default="{ row }">
                            <div>
                                <span style="color: red; font-weight: bold;">NTD {{ row.product.price }}</span>
                                <br />
                                <small style="text-decoration: line-through;">NTD {{ row.product.origin_price }}</small>
                            </div>
                        </template>
                    </ElTableColumn>
                    <ElTableColumn label="數量">
                        <template #default="{ row }">
                            <ElInputNumber
                                v-model="row.qty"
                                :min="1"
                                @change="handleQtyChange(row)"
                                size="small"
                            />
                        </template>
                    </ElTableColumn>
                    <ElTableColumn prop="total" label="小計" />
                </ElTable>
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

    .empty-cart-text {
        margin: 1rem 0;
        border: 1px solid $base-info-color;
    }

    .cart-container-mobile {
        .cart-card {
            border-radius: 5px;
            max-width: 500px;
            width: 100%;
            margin: 0.5rem auto;

            .card-content {
                display: flex;
                gap: 12px;

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
                        font-size: 14px;

                        .price-now {
                            color: $base-primary-color;
                            font-weight: bold;
                        }

                        .price-old {
                            margin-left: 0.5rem;
                            color: $base-muted-text-color;
                            text-decoration: line-through;
                            font-size: 12px;
                        }
                    }

                    .bottom-row {
                        margin-top: 8px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .subtotal {
                            font-weight: bold;
                            color: $base-section-color;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }

    .table-container {
        display: none;
    }

    @media(min-width: $breakpoint-tablet) {
        .cart-title {
            max-width: 80%;
            width: 100%;
            margin: 0.5rem auto;
        }
        .cart-container-mobile {
            display: none;
        }
        .table-container {
            display: block;
            max-width: 80%;
            width: 100%;
            margin: 0 auto;

            .el-table {
                width: 100%;

                .product-img {
                    width: 80px;
                    height: auto;
                    object-fit: cover;
                    aspect-ratio: 1/1;
                }
            }
        }
    }

    @media(min-width: $breakpoint-desktop) {
        .cart-title {
            max-width: 70%;
            width: 100%;
        }

        .table-container {
            display: block;
            max-width: 70%;
            width: 100%;

            .el-table {
                width: 100%;

                .product-img {
                    width: 120px;
                    height: auto;
                    object-fit: cover;
                    aspect-ratio: 1/1;
                }
            }
        }
    }
}


</style>