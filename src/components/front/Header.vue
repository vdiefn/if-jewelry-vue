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
        <div class="products">
            <router-link class="products nav-link" to="/Products">產品列表</router-link>
        </div>
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
    </nav>
    <DrawerProductCategory ref="drawerProductCategory" />
</template>

<style scoped lang="scss">
.navbar {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    height: 100%;
    padding: 0 1rem;

    .products {
        display: none;
    }

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
</style>