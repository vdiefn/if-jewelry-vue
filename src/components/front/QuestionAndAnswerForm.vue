<script setup lang="ts">
import { ref } from "vue";
import { ElCollapse, ElCollapseItem } from "element-plus";

interface FaqItem {
  question: string;
  answer: string;
}

const props = defineProps<{
  data: FaqItem[];
}>();

const activeName = ref<string>("");
</script>

<template>
  <ElCollapse v-model="activeName" accordion>
    <ElCollapseItem
      :name="index"
      v-for="(item, index) in props.data"
      :key="index"
    >
      <template #title>
        <div :class="['title-wrapper', { 'is-active': activeName === String(index) }]">
          <h5>{{ item.question }}</h5>
        </div>
      </template>
      <p>{{ item.answer }}</p>
    </ElCollapseItem>
  </ElCollapse>
</template>

<style scoped lang="scss">
.el-collapse {
  border: 1px solid lightgray;
  margin: 1rem auto;
  padding: 1rem;
  background-color: $base-background-color;
  border-radius: 5px;
  --el-collapse-header-bg-color: $base-background-color;

  :deep(.el-collapse-item__wrap) {
    background-color: $base-background-color;
  }
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}

.el-collapse-item p {
  font-size: 0.9rem;
}

:deep(.el-collapse-item.is-active .title-wrapper) {
  color: black;
  font-weight: 900;
}
</style>
