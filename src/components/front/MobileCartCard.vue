<script setup>
import {ElButton, ElCard, ElInput, ElInputNumber, ElMessage} from "element-plus";
import {reqCoupon} from "@/api/front/cart.js";
import {computed, ref} from "vue";
import {useCartStore} from "@/store/modules/cart.js";
import {useRouter} from "vue-router";
import { Search } from "@element-plus/icons-vue";

const props = defineProps({
    data: Array,
})

const cartStore = useCartStore()
const router = useRouter()
const loading = ref(false)
const perCouponName = computed(() => {
    return cartStore.cartList[0].coupon.code.length !== 0 ? cartStore.cartList[0].coupon.code : "-"
})
const perCoupon = ref(perCouponName? perCouponName : perCoupon)

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
            perCouponName.value = perInput
            ElMessage({
                type:"success",
                message: "已成功使用折價券"
            })
        } else {
            ElMessage({
                type: "error",
                message: res.message
            })
        }
    } catch(error) {
        console.error(error)
    }
}
</script>

<template>
    <ElCard
        class="cart-card"
        v-for="item in props.data"
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
            v-model="perCoupon"
            placeholder="請輸入優惠碼"
            class="input-with-search"
        >
            <template #append>
                <ElButton @click="handleGetCoupon(perCoupon)" type="text" :icon="Search" class="icon-button"/>
            </template>
        </ElInput>
    </ElCard>
    <ElCard class="cart-price-card">
        <h5>購物車清單</h5>
        <div class="discount" v-if="perCouponName">
            <p>優惠碼</p>
            <p>{{ perCouponName }}</p>
        </div>
        <div class="final-total">
            <p>小計</p>
            <p>NTD {{ cartStore.cartData.total > 0? cartStore.cartData.total : 0 }}</p>
        </div>
        <div class="final-total-discount">
            <p>總計</p>
            <p>NTD {{ cartStore.cartData.final_total > 0? Math.round(cartStore.cartData.final_total) : 0 }}</p>
        </div>
    </ElCard>
    <div class="operation-btn">
        <ElButton type="primary" @click="router.push('/checkout')">前往結帳</ElButton>
        <ElButton @click="router.back()">繼續購物</ElButton>
    </div>
</template>

<style scoped lang="scss">
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

    .final-total, .final-total-discount, .discount {
        display: flex;
        margin-bottom: 5px;

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
</style>