<script setup>
import { ref, onMounted, watch } from 'vue';
import { ElPagination } from "element-plus"
import { CardProduct } from "@/components/front/index.js";
import { reqProducts } from "@/api/front/frontProducts.js"
import { useRoute } from "vue-router"

const data = ref({})
const route = useRoute()
const totalPage= ref(1)

const getProducts = async (page, category) => {
    try {
        data.value = await reqProducts(page, category);
        totalPage.value = data.value.pagination.total_pages
    } catch(error) {
        console.error(error);
    }
}

watch(route, (value) => {
    getProducts(1, value.query.category)
})

onMounted(() => {
    getProducts()
})

</script>

<template>
    <div class="container">
        <CardProduct :data = data.products />
    </div>
    <div class="pagination-block">
        <ElPagination layout="prev, pager, next" :page-count="totalPage" />
    </div>
</template>

<style scoped lang="scss">
.container {
    margin-top: $base-header-height-tablet;
    padding: 1rem 1rem;
}
.pagination-block {
    display: flex;
    justify-content: center;
    background-color: $base-background-color;
    margin-bottom: 0.5rem;

    .el-pagination {
        --el-pagination-bg-color: $base-background-color;
        --el-pagination-button-disabled-bg-color:$base-background-color;
    }
}
</style>