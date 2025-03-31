<script setup>
import { ElContainer, ElAside, ElHeader, ElMain } from "element-plus";
</script>

<template>
  <div class="layout-container">
    <ElContainer>
      <ElAside>Aside</ElAside>

      <ElContainer>
        <ElHeader>Header</ElHeader>
        <ElMain>Main</ElMain>
      </ElContainer>
    </ElContainer>
  </div>
</template>
<style scoped lang="scss">
.layout-container {
  height: 100vh;
  width: 100%;
  display: flex;
  background: $base-background-color;

  .el-aside {
    height: 100%;
    width: $base-aside-width;
    padding: 1rem;
    border-right: 1px solid $base-info-color;
  }

  .el-header {
    height: $base-header-height;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $base-info-color;
  }

  .el-main {
    height: calc(100% - $base-header-height);
    width: 100%;
  }
}
</style>
