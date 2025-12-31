<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from "vue";
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElIcon,
  ElMessage,
  ElMessageBox
} from "element-plus";
import { Edit, Delete } from "@element-plus/icons-vue";
import { reqProducts, reqDeleteProduct } from "@/api/admin/product";
import { DialogAdminProduct, DefaultContainer } from "@/components/admin/index.ts";
import { fetchPageWithFallback } from "@/utils/pagination";
import type { ProductData } from "@/types/admin/product"

const loading = ref(false);
const currentPage = ref(1);
const dialogAdminProduct = useTemplateRef<InstanceType<typeof DialogAdminProduct>>("dialogAdminProduct");
const data = ref<ProductData[]>([]);
const totalPages = ref();
const selectCategory = ref("");

const categoryList = [
  {
      value: "",
      label: "全部",
  },
  {
      value: "戒指",
      label: "戒指",
  },
  {
      value: "項鍊",
      label: "項鍊",
  },
  {
      value: "手鐲",
      label: "手鐲",
  },
  {
      value: "耳環",
      label: "耳環",
  },
];

const getAllProducts = async (page = 1, category = "") => {
  currentPage.value = page;
  selectCategory.value = category;
  loading.value = true;
  try {
    const result = await reqProducts({ page: currentPage.value, category: selectCategory.value });
    if (result.data.success) {
      data.value = result.data.products;
      currentPage.value = result.data.pagination.current_page;
      totalPages.value = result.data.pagination.total_pages;
      await fetchPageWithFallback(data.value, currentPage.value, getAllProducts)
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const addNewProduct = () => {
  dialogAdminProduct.value?.open();
};

const editProduct = (row:ProductData) => {
  dialogAdminProduct.value?.open(row);
};

const deleteProduct = async (row:ProductData) => {
  await ElMessageBox.confirm(`請確認是否刪除產品：${row.title}`, {
    showClose: false,
    confirmButtonText: "確認",
    cancelButtonText: "取消",
    type: "warning",
    beforeClose: async (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        try {
          const result = await reqDeleteProduct(row.id);
          if (result.data.success) {
            ElMessage({
              type: "success",
              message: result.data.message,
            });
            done();
            await getAllProducts(currentPage.value, selectCategory.value);
          }
        } catch (error) {
          console.error(error);

        }
      } else {
        done();
      }
    },
  });
};

onMounted(() => {
  getAllProducts();
});
</script>

<template>
  <DefaultContainer
    showPagination
    :currentPage="currentPage"
    :totalPages="totalPages"
    @page-change="(page)=>getAllProducts(page, selectCategory)"
  >
    <template #top>
      <ElSelect
        v-model="selectCategory"
        filterable
        placeholder="請選擇查詢類別"
        @change="getAllProducts(1, selectCategory)"
      >
        <ElOption
          v-for="(item, index) in categoryList"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
      <ElButton type="primary" class="btn-add-product" @click="addNewProduct">
        新增產品
      </ElButton>
    </template>
    <template #content>
      <ElTable
        :stripe="true"
        :data="data"
        v-loading="loading"
        style="height: 100%"
        table-layout="auto"
      >
        <ElTableColumn label="名稱" prop="title" />
        <ElTableColumn label="分類" prop="category" />
        <ElTableColumn label="原價" prop="origin_price" align="center" />
        <ElTableColumn label="特價" prop="price" align="center" />
        <ElTableColumn label="啟用" prop="is_enabled" align="center">
          <template #default="{ row }">
            <ElIcon v-if="row.is_enabled" class="check-icon">
              <font-awesome-icon :icon="['fas', 'check']" />
            </ElIcon>
            <ElIcon v-else class="x-icon">
              <font-awesome-icon :icon="['fas', 'xmark']" />
            </ElIcon>
          </template>
        </ElTableColumn>
        <ElTableColumn width="1">
          <template #default="{ row }">
            <ElButton
              :icon="Edit"
              size="small"
              @click="editProduct(row)"
            />
            <ElButton
              :icon="Delete"
              type="danger"
              size="small"
              @click="deleteProduct(row)"
            />
          </template>
        </ElTableColumn>
      </ElTable>
    </template>
  </DefaultContainer>
  <DialogAdminProduct
    ref="dialogAdminProduct"
    @product-added="getAllProducts"
    :categoryList="categoryList"
  />
</template>

<style scoped lang="scss">
</style>
