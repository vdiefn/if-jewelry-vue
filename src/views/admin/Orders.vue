<script setup>
import { ref, onMounted } from "vue";
import { reqOrders } from "@/api/admin/order"

const loading = ref(false)
const data = ref()

const getAllOrders = async() => {
    loading.value = true
    try{
        const res = await reqOrders()
        data.value = res
    } catch(err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}

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
                {{ new Date(row.due_date * 1000).toISOString().slice(0, 10) }}
            </template>
        </ElTableColumn>
        <ElTableColumn label="購買人" prop="user.name"></ElTableColumn>
        <ElTableColumn label="購買金額" prop="num"></ElTableColumn>
        <ElTableColumn label="付款完成" prop="is_paid" align="center">
            <template #default="{ row }">
                <ElIcon v-if="row.is_enabled" class="check-icon">
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
                    @click="editCoupon(row)"
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
