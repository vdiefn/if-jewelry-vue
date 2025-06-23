<script setup>
import { ElDrawer, ElDivider } from "element-plus"
import { ref } from "vue"
import { useCartStore } from "@/store/modules/cart"

const drawer = ref(false)
const cartStore = useCartStore()
const isMobile = ref(true)

const open = () => {
    if(isMobile.value) {
        drawer.value = true
    } else {
        drawer.value = false
    }
}

const handleDeleteProduct = (id) =>{
    cartStore.deleteProduct(id)
}

defineExpose({ open })
</script>

<template>
    <ElDrawer
        v-model="drawer"
        size="65%"
        :with-header="false"
    >
        <template v-if="cartStore.cartList.length === 0">
                <p>你的購物車是空的喔!</p>
            </template>
        <div class="container" v-else>
            <div v-for="item in cartStore.cartList" :key="item.id" class="product-wrapper">
                <div class="image-wrapper">
                    <img :src="item.image" alt="product picture" />
                </div>
                <div class="info-wrapper">
                    <h5>{{ item.title }}</h5>
                    <div class="text-wrapper">
                        <p>NTD{{ item.price }} x {{item.qty}}</p>
                        <i @click="handleDeleteProduct(item.id)">
                            <font-awesome-icon :icon="['far', 'trash-can']" />
                        </i>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <ElButton type="primary" class="check-btn">購物車結帳</ElButton>
        </template>
    </ElDrawer>
</template>

<style scoped lang="scss">
    .container {
        display: flex;
        flex-direction: column;

        .product-wrapper {
            display: flex;
            flex-direction: row;
            padding: 5px 0;
            border-bottom: 1px solid whitesmoke;
        ;

            .image-wrapper {
                min-width: 40px;
                max-width: 60px;
                width: 100%;
                aspect-ratio: 1/1;
                margin-bottom: 0.5rem;

                img {
                    object-fit: cover;
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
                }
            }
        }
    }

    .check-btn {
        width: 100%;
        flex:1;
    }
</style>