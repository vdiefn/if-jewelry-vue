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
            <ElFooter>
                <Footer></Footer>
            </ElFooter>
        </ElContainer>
    </div>
</template>

<style scoped>
.el-container {
    height: 100vh;
    max-width: 1300px;
    margin: 0 auto;
}
    .el-header {
        margin: 0 auto;
        padding: 0;
        width:100%;
    }


</style>