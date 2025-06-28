<script setup>
import { ref } from 'vue';
import { ElBadge, ElPopover } from "element-plus"
import { DrawerProductCategory, DrawerCartList } from "@/components/front"
import { useRoute, useRouter } from "vue-router"
import { useCartStore } from '@/store/modules/cart.js'
import { useIsMobile } from '@/composables/useIsMobile';

const route = useRoute()
const router = useRouter()
const drawerProductCategory = ref(null)
const drawerCartListRef = ref(null)
const cartStore = useCartStore()
const { isMobile } = useIsMobile()
const loading = ref(false)

const openDrawer = () => {
    drawerProductCategory.value.open()
}

const getCartItems = async () => {
    if(isMobile.value) {
        drawerCartListRef.value.open()
    }
}

const handleDeleteProduct = async(id) =>{
    loading.value = true
    try {
        await cartStore.deleteCartProduct(id)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <nav class="navbar">
        <div class="top">
            <div class="bars" @click="openDrawer">
                <font-awesome-icon :icon="['fas', 'bars']" />
            </div>
            <div class="products all" v-if="route.path !== '/products'">
                <router-link class="products nav-link" to="/products"><h6>全部產品</h6></router-link>
            </div>
            <div class="brand">
                <router-link class="brand nav-link" to="/">
                    <h2>If Jewelry</h2>
                </router-link>
            </div>
            <div class="cart">
                <template v-if="isMobile && route.path === '/products'">
                    <ElBadge :value="cartStore.cartList.length" :max="99" class="item" @click="getCartItems">
                        <i>
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                        </i>
                    </ElBadge>
                </template>
                <template v-else-if="!isMobile && route.path === '/products'">
                    <ElPopover
                        popper-class="cart-popover"
                        placement="bottom"
                        width="300"
                    >
                        <template #reference>
                            <ElBadge :value="cartStore.cartList.length" :max="99" class="item">
                                <i>
                                    <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                                </i>
                            </ElBadge>
                        </template>
                        <template v-if="cartStore.cartList.length === 0">
                            <h6 style="text-align: center">你的購物車是空的喔!</h6>
                        </template>
                       <template v-else>
                            <div v-for="item in cartStore.cartList" :key="item.id" class="product-wrapper">
                                <div class="image-wrapper">
                                    <img :src="item.product.imagesUrl[0]" alt="product picture" />
                                </div>
                                <div class="info-wrapper">
                                    <h5>{{ item.product.title }}</h5>
                                    <div class="text-wrapper">
                                        <p>NTD{{ item.product.price }} x {{item.qty}}</p>
                                        <i @click="handleDeleteProduct(item.id)">
                                            <font-awesome-icon :icon="['far', 'trash-can']" />
                                        </i>
                                    </div>
                                </div>
                            </div>
                       </template>
                        <template v-if="cartStore.cartList.length !== 0">
                            <ElButton type="primary" @click="router.push('/cart')">購物車結帳</ElButton>
                        </template>
                    </ElPopover>
                </template>
            </div>
        </div>
        <div class="category" v-if="route.path === '/products'">
            <div class="products all">
                <router-link class="products nav-link" to="/products"><h6>全部產品</h6></router-link>
            </div>
            <div class="products earrings">
                <router-link class="products nav-link" :to="{ path: '/products', query: { category: '耳環' } }">
                    <h6>耳環</h6>
                </router-link>
            </div>
            <div class="products ring">
                <router-link class="products nav-link" :to="{ path: '/products', query: {category: '戒指'}}">
                    <h6>戒指</h6>
                </router-link>
            </div>
            <div class="products necklace">
                <router-link class="products nav-link" :to="{path: '/products', query: {category: '項鍊'}}">
                    <h6>項鍊</h6>
                </router-link>
            </div>
            <div class="products bracelet">
                <router-link class="products nav-link" :to="{path: '/products', query: {category: '手鐲'}}">
                    <h6>手鐲</h6>
                </router-link>
            </div>
        </div>
    </nav>
    <DrawerProductCategory ref="drawerProductCategory" />
    <DrawerCartList ref="drawerCartListRef" />
</template>

<style lang="scss">
.navbar {
    display: flex;
    flex-direction: column;
    position: fixed;
    width:100%;
    top:0;
    z-index: 99;
    background-color: $base-header-color;
    box-shadow: 0 1px 4px rgba(42, 42, 42, 0.8);

    .top {
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 5px;
        height: 100%;
        width: 90%;

        .bars {
            cursor: pointer;
        }

        .brand {
            font-family: 'Allura', cursive;;
            color: $base-brand-color;
            text-align: center;
            letter-spacing: 1px;
        }

        .products {
            display: none;
        }

        .cart {

            .item {
                margin-top: 10px;
                margin-right: 45px;
            }
            .check-btn {
                width: 100%;
                flex:1;
            }
        }
    }

    .category {
        display: none;
    }
}

@media (min-width: 768px){
    .navbar {
        padding: 0;
        margin: 0;
        .top {
            .bars {
                display: none;
            }

            .products {
                display: flex;
                align-items: center;
            }
        }
        .category {
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: center;
            gap: 1rem;
            background-color: $base-header-category-color;
        }
    }

    .product-wrapper {
        display: flex;
        gap: 5px;
        border-bottom: 1px solid whitesmoke;

        .image-wrapper {
            flex: 0 0 25%;

            img {
                width: 100%;
                height: auto;
                object-fit: cover;
                aspect-ratio: 1 / 1;
            }
        }

        .info-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding-left: 5px;

            .text-wrapper {
                display: flex;
                flex-direction: row;
                align-items: center;

                p {
                    flex: 1;
                    display: block;
                }

                i {
                    cursor: pointer;
                }
            }
        }
    }

    .el-button {
        width: 100%;
        margin-top: 10px;
    }
}


</style>