<script setup lang="ts">
import { ref, onMounted, watch, useTemplateRef } from "vue";
import { reqOrders, reqDeleteOrder } from "@/api/admin/order";
import { ElButton, ElMessage, ElMessageBox } from "element-plus";
import { Edit, Delete } from "@element-plus/icons-vue";
import { fetchPageWithFallback } from "@/utils/pagination";
import { DialogAdminOrder, DefaultContainer } from "@/components/admin/index.js";
import type { OrderData } from "@/types/admin/order";

const loading = ref(false);
const data = ref<OrderData[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const dialogAdminOrderRef = useTemplateRef<
  InstanceType<typeof DialogAdminOrder>
>("dialogAdminOrderRef");

const getAllOrders = async (page = 1) => {
  currentPage.value = page;
  loading.value = true;
  try {
    const res = await reqOrders({ page: currentPage.value });
    if (res.data.success) {
      data.value = res.data.orders;
      currentPage.value = res.data.pagination.current_page;
      totalPages.value = res.data.pagination.total_pages;
      await fetchPageWithFallback(data.value, currentPage.value, getAllOrders)
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleEditOrder = (row: OrderData) => {
  dialogAdminOrderRef.value?.open(row);
};

const handleDeleteOrder = async (row: OrderData) => {
  await ElMessageBox.confirm("請確認是否刪除訂單", "Warning", {
    confirmButtonText: "確認",
    cancelButtonText: "取消",
    type: "warning",
    beforeClose: async (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        try {
          const res = await reqDeleteOrder(row.id);

          if (res.data.success) {
            ElMessage({ type: "success", message: res.data.message });
            done();
            await getAllOrders(currentPage.value);
          } else {
            ElMessage({
              type: "error",
              message: res.data.message,
            });
            instance.confirmButtonLoading = false;
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

watch(currentPage, () => {
  getAllOrders(currentPage.value);
});

onMounted(() => {
  getAllOrders();
});
</script>

<template>
  <DefaultContainer
    showPagination
    :currentPage="currentPage"
    :totalPages="totalPages"
    @page-change="(page)=>getAllOrders(page)"
  >
    <template #top>
      <h3>訂單列表</h3>
    </template>
    <template #content>
      <ElTable
        :stripe="true"
        v-loading="loading"
        style="height: 100%"
        :data="data"
        table-layout="auto"
      >
        <ElTableColumn label="建立日期" prop="create_at">
          <template #default="{ row }">
            {{
              new Date(row.create_at * 1000).toLocaleDateString().slice(0, 10)
            }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="購買人" prop="user.name" />
        <ElTableColumn label="購買金額" prop="total" />
        <ElTableColumn label="付款完成" prop="is_paid" align="center">
          <template #default="{ row }">
            <ElIcon v-if="row.is_paid" class="check-icon">
              <font-awesome-icon :icon="['fas', 'check']" />
            </ElIcon>
            <ElIcon v-else class="x-icon">
              <font-awesome-icon :icon="['fas', 'xmark']" />
            </ElIcon>
          </template>
        </ElTableColumn>
        <ElTableColumn label="留言訊息" prop="message" />
        <ElTableColumn width="1">
          <template #default="{ row }">
            <ElButton :icon="Edit" size="small" @click="handleEditOrder(row)" />
            <ElButton
              :icon="Delete"
              type="danger"
              size="small"
              @click="handleDeleteOrder(row)"
            />
          </template>
        </ElTableColumn>
      </ElTable>
    </template>
  </DefaultContainer>
  <DialogAdminOrder ref="dialogAdminOrderRef" @order-update="getAllOrders(1)" />
</template>

<style scoped lang="scss">
</style>
