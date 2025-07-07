<script setup>
import { ref,reactive, nextTick } from 'vue';
import { ElDialog, ElButton, ElForm, ElFormItem, ElInput, ElRow, ElCol, ElTag } from "element-plus"

const dialogVisible = ref(false)
const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const InputRef = ref()
const form = reactive({
    author:"",
    title:"",
    description:"",
    content:"",
    image:"",
    tag:[],
    create_at:new Date(),
    isPublic: false
})

const open = () => {
    dialogVisible.value = true
}

const handleClose = (tag) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        if (InputRef.value && InputRef.value.input) {
            InputRef.value.input.focus()
        }
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}

defineExpose({ open })

</script>

<template>
    <ElDialog
        v-model="dialogVisible"
        title="Tips"
        width="700"
        align-center
    >
        <template #header>
            <h3>新增文章</h3>
        </template>
        <ElForm :model="form" label-width="auto">
            <ElRow>
                <ElCol :span=12>
                    <ElFormItem label="標題">
                        <ElInput v-model="form.title"/>
                    </ElFormItem>
                </ElCol>
                <ElCol :span=12>
                    <ElFormItem label="作者">
                        <ElInput v-model="form.author"/>
                    </ElFormItem>
                </ElCol>
                <ElCol :span=24>
                    <ElFormItem label="描述">
                        <ElInput v-model="form.description" type="textarea"/>
                    </ElFormItem>
                </ElCol>
                <ElCol :span=24>
                <ElFormItem label="內容">
                    <ElInput v-model="form.description" type="textarea"/>
                </ElFormItem>
                </ElCol>
                <ElCol :span=24>
                    <ElFormItem label="標籤">
                        <ElTag
                            v-for="tag in dynamicTags"
                            :key="tag"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)"
                            style="margin-right:5px;"
                        >
                            {{ tag }}
                        </ElTag>
                        <ElInput
                            v-if="inputVisible"
                            ref="InputRef"
                            v-model="inputValue"
                            class="w-20"
                            style="width:60px;"
                            size="small"
                            @keyup.enter="handleInputConfirm"
                            @blur="handleInputConfirm"
                        />
                        <ElButton v-else class="button-new-tag" size="small" @click="showInput">
                            + New Tag
                        </ElButton>
                    </ElFormItem>
                </ElCol>
            </ElRow>
        </ElForm>
        <template #footer>
            <div class="dialog-footer">
                <ElButton @click="dialogVisible = false">Cancel</ElButton>
                <ElButton type="primary" @click="dialogVisible = false">
                    Confirm
                </ElButton>
            </div>
        </template>
    </ElDialog>
</template>

<style scoped>
</style>