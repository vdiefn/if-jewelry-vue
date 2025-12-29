<script setup lang="ts">
import { ElFooter, ElHeader, ElContainer, ElMain } from 'element-plus';
import { Header, Footer } from "@/components/front"

import { useCartStore } from '@/store/modules/cart.ts'
import { onMounted } from 'vue'

const cartStore = useCartStore()

onMounted(() => {
    cartStore.getCartProducts()
})

</script>

<template>
    <div class="common-layout">
        <ElContainer>
            <ElHeader>
                <Header></Header>
            </ElHeader>
            <ElMain>
                <RouterView />
            </ElMain>
            <ElFooter height="auto">
                <Footer></Footer>
            </ElFooter>
        </ElContainer>
    </div>
</template>

<style scoped lang="scss">
.el-container {
    min-height: 100vh;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .el-header {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        height: auto;
        background-color: $base-header-color;
    }

    :deep(.el-main) {
        --el-main-padding: 0;
        width:100%;
        flex: 1;
        background-color: $base-background-color;
    }

    .el-footer {
        width:100%;
        background-color: $base-info-color;
        padding: 1rem 1rem;
    }
}
@media (min-width: $breakpoint-tablet){
    :deep(.el-container .el-header[data-v-3f5a6310]) {
        height:auto;
        padding: 0;
        background-color: $base-header-color;
    }
}
</style>