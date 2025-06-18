<script setup>
import { ref } from 'vue';
import { DrawerProductCategory } from "@/components/front"

const drawerProductCategory = ref(null)

const openDrawer = () => {
    drawerProductCategory.value.open()
}
</script>

<template>
    <nav class="navbar">
        <div class="top">
            <div class="bars" @click="openDrawer">
                <font-awesome-icon :icon="['fas', 'bars']" />
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
        <div class="category">
            <div class="products all">
                <router-link class="products nav-link" to="/Products"><p>產品列表</p></router-link>
            </div>
            <div class="products earrings">
                <router-link class="products nav-link" to="/Products"><p>耳環</p></router-link>
            </div>
            <div class="products ring">
                <router-link class="products nav-link" to="/Products"><p>戒指</p></router-link>
            </div>
            <div class="products necklace">
                <router-link class="products nav-link" to="/Products"><p>項鍊</p></router-link>
            </div>
            <div class="products bracelet">
                <router-link class="products nav-link" to="/Products"><p>手鐲</p></router-link>
            </div>
        </div>
    </nav>
    <DrawerProductCategory ref="drawerProductCategory" />
</template>

<style scoped lang="scss">
.navbar {
    display: flex;
    flex-direction: column;

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
        }

        .category {
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: center;
            gap: 1rem;
            background-color: $base-header-category-color;
            margin-top: 5px;
            padding: 5px 0;
        }
    }
}
</style>