<script setup>
import { ElFooter, ElHeader, ElContainer, ElMain } from 'element-plus';
import { Header, Footer } from "@/components/front"
import { ref } from 'vue';

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
        height: $base-header-height;
        background-color: #e0cba6;
    }

    .el-main {
        flex: 1;
    }

    .el-footer {
        width:100%;
        background-color: $base-info-color;
        padding: 1rem 1rem;
    }
}
</style>