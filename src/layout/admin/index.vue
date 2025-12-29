<script setup lang="ts">
import { ElContainer, ElAside, ElHeader, ElMain, ElMenu } from "element-plus";
import { RouterView, useRoute } from "vue-router";
import { ref, watch, nextTick } from "vue";
import {} from "@element-plus/icons-vue";
import setting from "@/setting.ts";
import Header from "@/components/admin/AdminHeader.vue";
import MenuList from "./MenuList.vue";
import { useUserStore } from "@/store/modules/user";
import { useLayoutSettingStore } from "@/store/modules/setting";

const route = useRoute();
const userStore = useUserStore();
const layoutSetting = useLayoutSettingStore();
const refresh = ref(true);

watch(
  () => layoutSetting.refresh,
  () => {
    refresh.value = false;
    nextTick(() => {
      refresh.value = true;
    });
  }
);
</script>

<template>
  <div class="layout-container">
    <ElContainer>
      <ElAside :width="layoutSetting.isCollapse ? '64px' : '200px'">
        <div class="aside-title">
          <h2 v-if="!layoutSetting.isCollapse">{{ setting.backendTitle }}</h2>
          <ElIcon v-else></ElIcon>
        </div>
        <ElMenu
          :default-active="route.path"
          class="el-menu-vertical"
          :collapse="layoutSetting.isCollapse ? true : false"
        >
          <MenuList :menuList="userStore.menuRoutes"></MenuList>
        </ElMenu>
      </ElAside>

      <ElContainer>
        <ElHeader>
          <Header></Header>
        </ElHeader>
        <ElMain>
          <RouterView v-slot="{ Component }">
            <component :is="Component" v-if="refresh" />
          </RouterView>
        </ElMain>
      </ElContainer>
    </ElContainer>
  </div>
</template>
<style scoped lang="scss">
.layout-container {
  height: 100vh;
  width: 100%;
  background: $base-background-color;

  .el-container {
    height: 100%;
  }

  .el-aside {
    transition: width 0.3s ease;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    background: $base-primary-color;

    .el-menu-vertical {
      border-right: none !important;
      background: $base-primary-color;
    }

    .aside-title {
      height: $base-header-height;
      display: flex;
      align-items: center;
      margin-left: 2rem;

      > h2 {
        font-size: 1.2rem;
        color: rgb(34, 33, 33);
        transition:
          opacity 0.3s ease,
          transform 0.3s ease;
      }
    }
  }

  .el-header {
    height: $base-header-height;
    border-bottom: 1px solid #e4e0dc;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0;
  }

  .el-main {
    .fade-enter-from {
      opacity: 0;
    }
    .fade-enter-active {
      transition: all 1s;
    }
    .fade-enter-to {
      opacity: 1;
    }
  }
}
</style>
