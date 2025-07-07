<script setup>
import {ref, onMounted, watch, useTemplateRef} from "vue";
import { reqOrders, reqDeleteOrder } from "@/api/admin/order"
import { ElButton, ElCard, ElMessage, ElMessageBox } from "element-plus"
import { Edit, Delete } from "@element-plus/icons-vue";
import {DialogAdminOrder} from "@/components/admin/index.js";

const loading = ref(false)
const data = ref()
const currentPage = ref(1)
const totalPages = ref(1)
const dialogAdminOrderRef = useTemplateRef("dialogAdminOrderRef")

const getAllOrders = async(page=1) => {
    currentPage.value = page;
    loading.value = true
    try{
        const res = await reqOrders(currentPage.value)
        if(res.success) {
            data.value = res.orders
            currentPage.value = res.pagination.current_page
            totalPages.value = res.pagination.total_pages
        }
    } catch(err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}

const handleEditOrder = (row) =>{
    dialogAdminOrderRef.value.open(row)
}

const handleDeleteOrder = async(row) =>{
    await ElMessageBox.confirm("請確認是否刪除訂單", "Warning", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
            if (action === "confirm") {
                instance.confirmButtonLoading = true;
                try {
                    const res = await reqDeleteOrder(row.id)

                    if (res.success) {
                        ElMessage({
                            type: "success",
                            message: res.message,
                        });
                        done()
                        await getAllOrders(currentPage.value);
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

watch(currentPage, () => {
    getAllOrders(currentPage.value);
});

onMounted(() => {
    getAllOrders()
})
</script>

<template>
    <ElCard class="card">
        <div class="top-area">
            <h3>訂單列表</h3>
        </div>
        <div class="content-area">
        <ElTable
            :stripe="true"
            v-loading="loading"
            style="height: 100%"
            :data="data"
        >
            <ElTableColumn label="建立日期" prop="create_at">
                <template #default="{row}">
                    {{ new Date(row.create_at * 1000).toISOString().slice(0, 10) }}
                </template>
            </ElTableColumn>
            <ElTableColumn label="購買人" prop="user.name"></ElTableColumn>
            <ElTableColumn label="購買金額" prop="total"></ElTableColumn>
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
            <ElTableColumn label="留言訊息" prop="message"></ElTableColumn>
            <ElTableColumn>
                <template #default="{ row }">
                    <ElButton
                        :icon="Edit"
                        size="small"
                        @click="handleEditOrder(row)"
                    />
                    <ElButton
                        :icon="Delete"
                        type="danger"
                        size="small"
                        @click="handleDeleteOrder(row)"
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
    <DialogAdminOrder ref="dialogAdminOrderRef" @order-update="getAllOrders(1)"/>
</template>

<style scoped lang="scss">
.card {
  height: 100%;

  .top-area {
    display: flex;
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
