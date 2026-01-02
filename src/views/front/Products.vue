<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ElPagination } from "element-plus";
import { CardProduct } from "@/components/front/index.js";
import { reqProducts } from "@/api/front/frontProducts.js";
import { useRoute } from "vue-router";
import type { ProductData } from "@/types/front/product";

const productsData = ref<ProductData[]>([]);
const route = useRoute();
const totalPage = ref(1);
const currentPage = ref(1);
const loading = ref(false);
const currentCategory = ref("");

const getProducts = async (page: number, category: string): Promise<void> => {
  loading.value = true;
  try {
    const res = await reqProducts({ page, category });
    productsData.value = res.data.products;
    totalPage.value = res.data.pagination.total_pages;
    currentPage.value = page;
    currentCategory.value = category;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const getCategoryFromRoute = (): string => {
  const category = route.query.category;
  return typeof category === "string" ? category : "";
};

const changeCurrentPage = (page: number) => {
  currentCategory.value = getCategoryFromRoute();
  getProducts(page, currentCategory.value);
};

watch(route, () => {
  currentCategory.value = getCategoryFromRoute();
  getProducts(1, currentCategory.value);
});

onMounted(() => {
  currentCategory.value = getCategoryFromRoute();
  getProducts(currentPage.value, currentCategory.value);
});
</script>

<template>
  <div class="container" v-loading="loading">
    <template v-if="route.query.category">
      <h3>{{ route.query.category }}</h3>
    </template>
    <template v-else>
      <h3>全部商品</h3>
    </template>
    <div class="card-wrapper">
      <CardProduct
        :data="product"
        v-for="product in productsData"
        :key="product.id"
      />
    </div>

    <div class="pagination-block">
      <ElPagination
        layout="prev, pager, next"
        :page-count="totalPage"
        @current-change="changeCurrentPage"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {

  > h3 {
    padding: 1rem 1rem;
    font-weight: 700;
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
      --el-pagination-button-disabled-bg-color: $base-background-color;
    }
  }

  @media (min-width: $breakpoint-tablet) {
    h3 {
      width: 80%;
      margin: 0 auto;
    }

    .card-wrapper {
      margin: 0 auto;
      width: 80%;
      display: grid;
      grid-template-columns: repeat(2, minmax(200px, 1fr));
    }
  }

  @media (min-width: $breakpoint-desktop) {
    h3 {
      margin: 0 auto;
      width: 60%;
    }
    .card-wrapper {
      width: 60%;
      display: grid;
      grid-template-columns: repeat(2, minmax(200px, 1fr));
    }
  }
}
</style>
