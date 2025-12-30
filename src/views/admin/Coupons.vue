<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from "vue";
import { reqCoupons, reqDeleteCoupon } from "@/api/admin/coupon.js";
import {
  ElPagination,
  ElTable,
  ElTableColumn,
  ElButton,
  ElMessage,
  ElMessageBox,
} from "element-plus";
import { DialogAdminCoupon } from "@/components/admin/index.js";
import { Edit, Delete } from "@element-plus/icons-vue";
import type { CouponData } from "@/types/admin/coupon";

const loading = ref(false);
const data = ref<CouponData[]>([]);
const currentPage = ref(1);
const dialogAdminCouponRef = useTemplateRef<
  InstanceType<typeof DialogAdminCoupon>
>("dialogAdminCouponRef");
const totalPages = ref(1);

const getAllCoupons = async () => {
  loading.value = true;
  try {
    const res = await reqCoupons({ page: currentPage.value });
    if (res.data.success) {
      data.value = res.data.coupons;
      totalPages.value = res.data.pagination.total_pages;
      currentPage.value = res.data.pagination.current_page;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const addNewCoupon = () => {
  dialogAdminCouponRef.value?.open();
};

const editCoupon = (row: CouponData) => {
  dialogAdminCouponRef.value?.open(row);
};

const deleteCoupon = async (row: CouponData) => {
  await ElMessageBox.confirm(`請確認是否刪除折價券：${row.title}`, "Warning", {
    confirmButtonText: "確認",
    cancelButtonText: "取消",
    type: "warning",
    beforeClose: async (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        try {
          const res = await reqDeleteCoupon(row.id);

          if (res.data.success) {
            ElMessage({ type: "success", message: res.data.message });
            done();
            await getAllCoupons();
          } else {
            ElMessage({ type: "error", message: res.data.message });
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

onMounted(() => {
  getAllCoupons();
});
</script>

<template>
  <ElCard class="card">
    <div class="top-area">
      <h3>優惠券列表</h3>
      <ElButton type="primary" @click="addNewCoupon"> 新增優惠券 </ElButton>
    </div>
    <div class="content-area">
      <ElTable
        :stripe="true"
        v-loading="loading"
        style="height: 100%"
        :data="data"
        table-layout="auto"
      >
        <ElTableColumn label="名稱" prop="title" />
        <ElTableColumn label="折扣碼" prop="code" />
        <ElTableColumn label="折扣(%)" prop="percent" align="center" />
        <ElTableColumn label="到期日" prop="due_date">
          <template #default="{ row }">
            {{
              new Date(row.due_date * 1000).toLocaleDateString().slice(0, 10)
            }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="啟用狀態" prop="is_enabled" align="center">
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
            <ElButton :icon="Edit" size="small" @click="editCoupon(row)" />
            <ElButton
              :icon="Delete"
              type="danger"
              size="small"
              @click="deleteCoupon(row)"
            />
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
    <div class="bottom-area">
      <ElPagination
        class="pagination"
        v-model:current-page="currentPage"
        layout="prev, pager, next, jumper"
        :page-count="totalPages"
      />
    </div>
  </ElCard>
  <DialogAdminCoupon ref="dialogAdminCouponRef" @coupon-added="getAllCoupons" />
</template>

<style scoped lang="scss">
.card {
  height: 100%;

  .top-area {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    :deep(.el-input),
    :deep(.el-select) {
      width: 200px;
    }

    .top-left {
      display: flex;
      gap: 5px;
    }
  }

  .content-area {
    :deep(.cell) {
      white-space: nowrap;
    }

    .check-icon {
      color: green;
    }

    .x-icon {
      color: red;
    }
  }

  .bottom-area {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }
}
</style>
