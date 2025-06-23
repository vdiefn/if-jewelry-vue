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
const loading = ref(false)

const getProducts = async (page, category) => {
    loading.value = true
    try {
        data.value = await reqProducts(page, category);
        totalPage.value = data.value.pagination.total_pages
        currentPage.value = page
    } catch(error) {
        console.error(error);
    } finally {
        loading.value = false
    }
}

const changeCurrentPage = (page) => {
    getProducts(page, route.query.category)
}

watch(route, (value) => {
    getProducts(1, value.query.category)
})

onMounted(() => {
    getProducts(1, route.query.category)
})

</script>

<template>
    <div class="container" v-loading="loading">
        <template v-if="route.query.category">
            <h5>{{route.query.category}}</h5>
        </template>
        <template v-else>
            <h5>全部商品</h5>
        </template>
        <div class="card-wrapper">
            <CardProduct :data="product" v-for="product in data.products" :key="product.id"/>
        </div>
        <div class="pagination-block">
            <ElPagination layout="prev, pager, next" :page-count="totalPage" @current-change="changeCurrentPage"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    margin-top: $base-header-height-tablet;

    > h5 {
        padding: 0.5rem 1rem;
    }

    .card-wrapper {
        display: grid;
        grid-template-columns: repeat(2, minmax(150px, 1fr));
        grid-gap: 1rem;
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
        h5 {
            width: 90%;
            margin: 0 auto;
        }

        .card-wrapper {
            margin: 0 auto;
            width: 90%;
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
}

</style>