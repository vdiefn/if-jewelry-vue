<script lang="ts" setup>
import { ref } from "vue"

interface Props {
  showPagination: boolean,
  currentPage: number,
  totalPages: number
}

interface Emits {
  (e: "page-change", page:number):void
}

const props = withDefaults(defineProps<Props>(), {
  showPagination: false,
  currentPage: 1,
  totalPages:1
})
const emit = defineEmits<Emits>()

const currentPage = ref(props.currentPage)

const handleChangePage = (page:number) => {
  currentPage.value = page
  emit("page-change", page)
}

</script>
<template>
  <ElCard class="card">
    <div class="top-area">
      <slot name="top"></slot>
    </div>
    <div class="content-area">
      <slot name="content"></slot>
    </div>
    <div class="bottom-area" v-if="props.showPagination">
      <ElPagination
        class="pagination"
        v-model:current-page="currentPage"
        layout="prev, pager, next, jumper"
        :page-count="props.totalPages"
        @current-change="handleChangePage"
      />
    </div>
  </ElCard>
</template>
<style lang="scss" scoped>
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

    :deep(.tag) {
      margin-right: 5px;
    }

    :deep(.check-icon) {
      color: green;
    }

    :deep(.x-icon) {
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
