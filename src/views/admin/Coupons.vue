<script setup>
import { ref } from 'vue';

</script>

<template>
      <ElCard class="card">
    <div class="top-area">
      <ElButton type="primary" class="btn-add-product" @click="addNewProduct">
        新增優惠券
      </ElButton>
    </div>
    <div class="content-area">
      <ElTable
        :stripe="true"
        v-loading="loading"
        style="height: 100%"
      >
        <ElTableColumn label="名稱" prop="title"></ElTableColumn>
        <ElTableColumn label="分類" prop="category"></ElTableColumn>
        <ElTableColumn label="售價" prop="origin_price"></ElTableColumn>
        <ElTableColumn label="啟用狀態" prop="price"></ElTableColumn>
        <ElTableColumn label="">
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
              @click=""
            ></ElButton>
            <ElButton
              :icon="Delete"
              type="danger"
              size="small"
              @click=""
            ></ElButton>
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