<script setup>
import { useCartStore } from "@/store/modules/cart.js"
import { ElCard, ElButton } from "element-plus";
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { MobileCartCard, DesktopCartTable } from "@/components/front/index.js";

const cartStore = useCartStore()
const router = useRouter()


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
                <MobileCartCard :data="cartStore.cartList"/>
            </div>
            <div class="table-container">
                <DesktopCartTable :data="cartStore.cartList" />
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
            width:30%;
            margin-top:1rem;
        }
    }

    .cart-container-mobile {
        display: grid;
        grid-gap: 10px;
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


        }
    }
}
</style>