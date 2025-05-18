<script setup>
import { ref, onMounted, useTemplateRef } from 'vue';
import { reqCoupons, reqDeleteCoupon } from "@/api/admin/coupon.js"
import { ElPagination, ElTable, ElTableColumn, ElButton } from "element-plus"
import { DialogAdminCoupon } from "@/components/index.js"
import { Edit, Delete } from "@element-plus/icons-vue";

const loading = ref(false)
const data = ref()
const currentPage = ref(1)
const dialogAdminCouponRef = useTemplateRef("dialogAdminCouponRef")
const totalPages = ref(1)

const getAllCoupons = async () => {
    loading.value = true
    try{
        const res = await reqCoupons()
        if(res.success) {
            data.value = res.coupons
            totalPages.value = res.pagination.total_pages
            currentPage.value = res.pagination.current_page
        }
    } catch(error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const addNewCoupon = () => {
    dialogAdminCouponRef.value.open()
}

const editCoupon = () => {

}

const deleteCoupon = async(row) => {
    await ElMessageBox.confirm(`請確認是否刪除折價券：${row.title}`, "Warning", {
    confirmButtonText: "確認",
    cancelButtonText: "取消",
    type: "warning",
    beforeClose: async (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
         try {
           const res = await reqDeleteCoupon(row.id)

         if (res.success) {
           ElMessage({
             type: "success",
             message: res.message,
           });
           await getAllCoupons();
           done()
         } else {
           ElMessage({
             type: "error",
             message: res.message
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
}

onMounted(() => {
    getAllCoupons()
})

</script>

<template>
    <ElCard class="card">
        <div class="top-area">
            <ElButton type="primary" @click="addNewCoupon">
                新增優惠券
            </ElButton>
        </div>
        <div class="content-area">
        <ElTable
            :stripe="true"
            v-loading="loading"
            style="height: 100%"
            :data="data"
        >
            <ElTableColumn label="名稱" prop="title"></ElTableColumn>
            <ElTableColumn label="折扣(%)" prop="percent" align="center"></ElTableColumn>
            <ElTableColumn label="到期日" prop="due_date"></ElTableColumn>
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
            <ElTableColumn>
                <template #default="{ row }">
                    <ElButton
                        :icon="Edit"
                        size="small"
                        @click="editCoupon"
                    />
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
    <DialogAdminCoupon ref="dialogAdminCouponRef" @coupon-added="getAllCoupons"/>
</template>

<style scoped lang="scss">
.card {
  height: 100%;

  .top-area {
    display: flex;
    justify-content: flex-end;
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