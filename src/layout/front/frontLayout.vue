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
.el-header {
    padding:0;

    .header {
        margin: 0 200px;
        border: 1px solid red;
    }
}
</style>