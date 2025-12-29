<script setup lang="ts">
import { useRouter } from "vue-router";
import { ElButton, ElEmpty } from "element-plus";
const router = useRouter();
</script>

<template>
  <div class="container">
    <div class="content">
      <ElEmpty>
        <template #description>
          <h4>找不到此頁面！</h4>
          <p>很抱歉，您所尋找的頁面無法顯示。</p>
          <p>您可以回到首頁繼續瀏覽其他內容。</p>
        </template>
        <ElButton type="primary" @click="router.push('/')">回到首頁</ElButton>
      </ElEmpty>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  margin-top: 50px;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    p {
      font-size: 1rem;
    }

    .el-button {
      margin: 1rem auto;
    }
  }
}
</style>
