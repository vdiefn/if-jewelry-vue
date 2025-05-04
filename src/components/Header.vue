<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  ElHeader,
  ElButton,
  ElRadioGroup,
  ElRadioButton,
  ElDropdown,
  ElDropdownItem,
} from "element-plus";
import {
  Refresh,
  FullScreen,
  Setting,
  Expand,
  Fold,
  ArrowDown,
} from "@element-plus/icons-vue";
import { useLayoutSettingStore } from "@/store/modules/setting.js";
import { useUserStore } from "@/store/modules/user";

const layoutSetting = useLayoutSettingStore();
const userStore = useUserStore();
const router = useRouter();
const isCollapse = ref(false);

const changeCollapse = () => {
  layoutSetting.isCollapse = !layoutSetting.isCollapse;
};

const updateRefresh = () => {
  layoutSetting.refresh = !layoutSetting.refresh;
};

const fullScreen = () => {
  const full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const logout = () => {
  userStore.userLogout();
  router.push("/login");
};
</script>

<template>
  <div class="area-left">
    <ElRadioGroup
      v-model="isCollapse"
      class="button-group"
      :width="isCollapse ? '64px' : '200px'"
      @click="changeCollapse"
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
  </div>
  <div class="area-right">
    <ElButton
      size="small"
      :icon="Refresh"
      circle
      @click="updateRefresh"
    ></ElButton>
    <ElButton
      size="small"
      :icon="FullScreen"
      circle
      @click="fullScreen"
    ></ElButton>
    <ElButton size="small" :icon="Setting" circle></ElButton>
    <ElDropdown>
      <span class="el-dropdown">
        admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <ElDropdownItem @click="logout">登出</ElDropdownItem>
      </template>
    </ElDropdown>
  </div>
</template>

<style scoped lang="scss">
.area-left {
  height: $base-header-height;
  display: flex;
  align-items: center;

  .el-radio-group {
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
}

.area-right {
  height: $base-header-height;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-right: 0.5rem;

  .el-dropdown {
    margin-left: 0.5rem;
  }
}
</style>
