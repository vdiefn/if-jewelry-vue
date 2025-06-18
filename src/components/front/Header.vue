<script setup>
import { ref, computed } from 'vue';
import { DrawerProductCategory } from "@/components/front"
import { useRoute } from "vue-router"

const route = useRoute()
const drawerProductCategory = ref(null)

const path = computed(() => route.path)

const openDrawer = () => {
    drawerProductCategory.value.open()
}

console.log(window.location.pathname)
</script>

<template>
    <nav class="navbar">
        <div class="top">
            <div class="bars" @click="openDrawer" v-if="path === '/Products'">
                <font-awesome-icon :icon="['fas', 'bars']" />
            </div>
            <div class="products all" v-if="path !== '/Products'">
                <router-link class="products nav-link" to="/Products"><h6>全部產品</h6></router-link>
            </div>
            <div class="brand">
                <router-link class="brand nav-link" to="/">
                    <h2>If Jewelry</h2>
                </router-link>
            </div>
            <div class="cart">
                <router-link class="cart nav-link" to="/Cart">
                    <i>
                        <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                    </i>
                </router-link>
            </div>
        </div>
        <div class="category" v-if="path === '/Products'">
            <div class="products all">
                <router-link class="products nav-link" to="/Products" ><h6>全部產品</h6></router-link>
            </div>
            <div class="products earrings">
                <router-link class="products nav-link" to="/Products"><h6>耳環</h6></router-link>
            </div>
            <div class="products ring">
                <router-link class="products nav-link" to="/Products"><h6>戒指</h6></router-link>
            </div>
            <div class="products necklace">
                <router-link class="products nav-link" to="/Products"><h6>項鍊</h6></router-link>
            </div>
            <div class="products bracelet">
                <router-link class="products nav-link" to="/Products"><h6>手鐲</h6></router-link>
            </div>
        </div>
    </nav>
    <DrawerProductCategory ref="drawerProductCategory" />
</template>

<style scoped lang="scss">
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
        width: 100%;
        padding: 0 1rem;

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
    }

    .category {
        display: none;
    }
}

@media (min-width: $breakpoint-tablet){
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
            // margin-top: 5px;
            // padding: 5px 0;
        }
    }
}


</style>