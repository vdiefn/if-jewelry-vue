<script setup>
import {ElButton, ElDialog} from "element-plus";
import {ref} from "vue";

const dialogVisible = ref(false)

const close = () => {
    dialogVisible.value = false
}

const open = () => {
    dialogVisible.value = true
}

defineExpose({ close, open })
</script>

<template>
    <ElDialog
        v-model="dialogVisible"
        custom-class="bottom-left-dialog"
        title="折扣碼"
        width="200"
        draggable
        :close-on-click-modal="false"
        :modal="false"
    >
        <div class="title-wrapper">
            <font-awesome-icon :icon="['fas', 'cake-candles']" />
            <h5>If Jewelry 生日快樂!</h5>
        </div>
        <div class="code-wrapper">
            <p>HBD2025</p>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <ElButton @click="dialogVisible = false" type="info" size="small">關閉</ElButton>
            </div>
        </template>
    </ElDialog>
</template>

<style scope lang="scss" >
.el-dialog {
    margin: var(--el-dialog-margin-top, 15vh) 5px 50px;

    .title-wrapper{
        display: flex;
        gap: 3px;
        justify-content: space-between;
        align-items: center ;
    }
    .code-wrapper {
        border: 1px solid lightgray;
        height: 2rem;
        margin-top: 10px;

        p {
            margin-left: 15px;
            font-size: 1.2rem;
            text-align: left;
            line-height: 2rem;
        }
    }
}
</style>