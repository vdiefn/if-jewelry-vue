<script setup>
import { ref, onMounted, watch } from 'vue';
import { ElPagination } from "element-plus"
import { CardProduct } from "@/components/front/index.js";
import { reqProducts } from "@/api/front/frontProducts.js"
import { useRoute } from "vue-router"

const data = ref({})
const route = useRoute()
const totalPage= ref(1)
const currentPage = ref(1)

const getProducts = async (page, category) => {
    try {
        data.value = await reqProducts(page, category);
        totalPage.value = data.value.pagination.total_pages
        currentPage.value = page
    } catch(error) {
        console.error(error);
    }
}

const changeCurrentPage = (page) => {
    getProducts(page, route.query.category)
}

watch(route, (value) => {
    getProducts(1, value.query.category)
})

onMounted(() => {
    getProducts()
})

</script>

<template>
    <div class="card-wrapper">
        <CardProduct :data="product" v-for="product in data.products" :key="product.id"/>
    </div>
    <div class="pagination-block">
        <ElPagination layout="prev, pager, next" :page-count="totalPage" @current-change="changeCurrentPage"/>
    </div>
</template>

<style scoped lang="scss">
.card-wrapper {
    display: grid;
    grid-template-columns: repeat(2, minmax(150px, 1fr));
    grid-gap: 1rem;
    margin-top: $base-header-height-tablet;
    padding: 1rem 1rem;
    width: 100%;
    justify-items: center;
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

@media(min-width: $breakpoint-tablet) {
    .card-wrapper {
        display: grid;
        grid-template-columns: repeat(3, minmax(200px, 1fr));
    }
}

@media(min-width: $breakpoint-desktop) {
    .card-wrapper {
        display: grid;
        grid-template-columns: repeat(4, minmax(200px, 1fr));
    }
}
</style>