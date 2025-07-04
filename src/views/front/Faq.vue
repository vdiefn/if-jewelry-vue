<script setup>
import { ref } from 'vue'
import { ElCollapse, ElCollapseItem } from "element-plus"
import { faqs } from "@/data/faqs.js"

const activeName = ref(null)

</script>

<template>
<div class="container">
    <h3>常見問題 FAQ</h3>
    <ElCollapse v-model="activeName" accordion>
        <ElCollapseItem :name="index" v-for="(item, index) in faqs" :key="index">
            <template #title="{ isActive }">
                <div :class="['title-wrapper', {'is-active': isActive}]">
                    <h5>{{ item.question }}</h5>
                </div>
            </template>
            <div>
                {{ item.answer }}
            </div>
        </ElCollapseItem>
    </ElCollapse>

</div>
</template>

<style scoped lang="scss">
.container {
    padding: 2rem 1rem;
    margin: 50px auto 20px auto;

    .el-collapse {
        border: 1px solid lightgray;
        margin: 15px auto;
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

    :deep(.el-collapse-item.is-active .title-wrapper) {
        color: black;
        font-weight: 900;
    }
}

@media(min-width: $breakpoint-tablet){
    .container {
        max-width: 650px;
    }
}

@media(min-width: $breakpoint-desktop){
    .container {
        max-width: 900px;
    }
}
</style>