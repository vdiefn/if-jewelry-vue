<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
    menuList: {
        type: Object,
    },
});

const goRoute = (item) => {
    router.push(item.path);
};
</script>

<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <template v-if="item.children">
        <MenuList :menuList="item.children"></MenuList>
        </template>
        <template v-else>
        <ElMenuItem
            :index="item.path"
            @click="goRoute(item)"
            v-if="!item.meta.hidden"
        >
            <ElIcon>
            <component :is="item.meta.icon"></component>
            </ElIcon>
            <template #title>{{ item.meta.title }}</template>
        </ElMenuItem>
        </template>
    </template>
</template>

<style scoped lang="scss">
.el-menu-item {
    transition: transform 0.3s ease-in-out;
}

.el-menu-item:hover {
    background: $base-background-color;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    transform: translateX(20%);
}

.el-menu-item.is-active {
    color: rgb(34, 33, 33);
    font-weight: 900;
    font-size: 0.95rem;
}
</style>
