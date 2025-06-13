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
            <ElMenuItem index="1">
                <img src="/public/logo_1.png" alt="logo of if jewelry"/>
            </ElMenuItem>
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