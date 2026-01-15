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
import { reqProducts, reqDeleteProduct, reqAllProducts } from "@/api/admin/product";
import { DialogAdminProduct, DefaultContainer } from "@/components/admin/index.ts";
import { fetchPageWithFallback } from "@/utils/pagination";
import { exportToExcel } from "@/utils/exportToExcel";
import type { ProductData, AllProductData } from "@/types/admin/product"

const loading = ref(false);
const currentPage = ref(1);
const dialogAdminProduct = useTemplateRef<InstanceType<typeof DialogAdminProduct>>("dialogAdminProduct");
const data = ref<ProductData[]>([]);
const totalPages = ref();
const selectCategory = ref("");
const allProductData = ref<AllProductData>();
const formatedAllProductData = ref<ProductData[]>([]);

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

const getProducts = async (page = 1, category = "") => {
  currentPage.value = page;
  selectCategory.value = category;
  loading.value = true;
  try {
    const result = await reqProducts({ page: currentPage.value, category: selectCategory.value });
    if (result.data.success) {
      data.value = result.data.products;
      currentPage.value = result.data.pagination.current_page;
      totalPages.value = result.data.pagination.total_pages;
      await fetchPageWithFallback(data.value, currentPage.value, getProducts)
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const getAllProducts = async () => {
  loading.value = true;
  try {
    const result = await reqAllProducts();
    if (result.data.success) {
      allProductData.value = result.data.products;
      formatedAllProductData.value = Object.values(allProductData.value)
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
            await getProducts(currentPage.value, selectCategory.value);
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

const downloadExcel = async () => {
  await getAllProducts()
  
  const columns = [
    { header: "Category", key:"category" },
    { header: "Content", key:"content" },
    { header: "Description", key:"description" },
    { header: "Id", key:"id" },
    { header: "IsEnabled", key:"is_enabled" },
    { header: "OriginPrice", key:"origin_price" },
    { header: "Price", key:"price" },
    { header: "Title", key:"title" },
    { header: "Unit", key:"unit" },
  ]

  const excelData = formatedAllProductData.value.map((item) => ({
    category: item.category,
    content: item.content,
    description: item.description,
    id: item.id,
    is_enabled: item.is_enabled? "啟用中":"未啟用",
    origin_price: item.origin_price,
    price: item.price,
    title: item.title,
    unit: item.unit,
  }))

  await exportToExcel(excelData, columns, "product_list", "product_list")
}

onMounted(() => {
  getProducts();
});
</script>

<template>
  <DefaultContainer
    showPagination
    :currentPage="currentPage"
    :totalPages="totalPages"
    @page-change="(page)=>getProducts(page, selectCategory)"
  >
    <template #top>
      <div>
        <ElSelect
          v-model="selectCategory"
          filterable
          placeholder="請選擇查詢類別"
          @change="getProducts(1, selectCategory)"
        >
          <ElOption
            v-for="(item, index) in categoryList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
        <ElButton circle class="download-btn" @click="downloadExcel" :disabled="loading">
          <font-awesome-icon :icon="['fas', 'arrow-down']" class="download-icon" />
        </ElButton>
      </div>
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
    @product-added="getProducts"
    :categoryList="categoryList"
  />
</template>

<style scoped lang="scss">
  .download-btn {
    margin-left: 5px;

    .download-icon {
      width: 16px;
      height: 16px;
    }
  }
</style>
