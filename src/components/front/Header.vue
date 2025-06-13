<script setup>
import { ref } from 'vue';
import { ElMenu, ElMenuItem} from "element-plus"

</script>

<template>

    <ElMenu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
    >
            <ElMenuItem index="1"><template #title>If Jewelry</template></ElMenuItem>
            <ElMenuItem index="3">Info</ElMenuItem>
            <ElMenuItem index="4">Orders</ElMenuItem>
    </ElMenu>

</template>

<style scoped>
.el-menu {
    margin: 0
}

.el-menu--horizontal > .el-menu-item:nth-child(1) {
    margin-right: auto;
}
</style>