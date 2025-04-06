<script setup>
import {
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElRadioGroup,
  ElRadioButton,
} from "element-plus";
import {
  Goods,
  Discount,
  Document,
  Monitor,
  Expand,
  Fold,
} from "@element-plus/icons-vue";
import setting from "@/setting";
import { ref } from "vue";
import { useUserStore } from "@/store/modules/user";
import MenuList from "./MenuList.vue";
import { RouterView } from "vue-router";

const isCollapse = ref(true);
const userStore = useUserStore();

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<template>
  <div class="layout-container">
    <ElContainer>
      <ElAside :width="isCollapse ? '64px' : '200px'">
        <div class="aside-title">
          <h2 v-if="!isCollapse">{{ setting.title }}</h2>
          <ElIcon v-else></ElIcon>
        </div>

        <ElMenu
          default-active="2"
          class="el-menu-vertical"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <MenuList :menuList="userStore.menuRoutes"></MenuList>
        </ElMenu>
      </ElAside>

      <ElContainer>
        <ElHeader>
          <ElRadioGroup
            v-model="isCollapse"
            class="button-group"
            :width="isCollapse ? '64px' : '200px'"
          >
            <template v-if="isCollapse">
              <ElRadioButton :value="false" class="collapse-btn">
                <ElIcon>
                  <Expand />
                </ElIcon>
              </ElRadioButton>
            </template>
            <template v-else>
              <ElRadioButton :value="true" class="collapse-btn">
                <ElIcon> <Fold /> </ElIcon>
              </ElRadioButton>
            </template>
          </ElRadioGroup>
          <div class="setting-area">Header</div>
        </ElHeader>
        <ElMain>
          <RouterView v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" />
            </transition>
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
    transition: width 0.3s;
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
      margin-left: 1.5rem;

      > h2 {
        font-size: 1.2rem;
        color: rgb(34, 33, 33);
      }
    }
  }

  .el-header {
    height: $base-header-height;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e4e0dc;
    position: relative;

    .el-radio-group {
      position: absolute;
      left: 0;
      z-index: 1;

      :deep(.collapse-btn .el-radio-button__inner) {
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
        color: #333 !important;
      }

      :deep(.collapse-btn.is-active .el-radio-button__inner) {
        background-color: transparent !important;
      }
    }

    .setting-area {
      margin-left: 1rem;
    }
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
