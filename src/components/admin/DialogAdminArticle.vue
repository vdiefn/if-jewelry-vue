<script setup>
import { ref,reactive, nextTick } from 'vue';
import {ElDialog, ElButton, ElForm, ElFormItem, ElInput, ElRow, ElCol, ElTag, ElMessage, ElDatePicker} from "element-plus"
import { reqAddArticle, reqEditArticle } from "@/api/admin/article.js";

const dialogVisible = ref(false)
const inputValue = ref('')
const loading = ref(false)
const inputVisible = ref(false)
const InputRef = ref()
const isEdit = ref(false)
const emit = defineEmits("article-update")
const form = reactive({
    id:"",
    author:"",
    title:"",
    description:"",
    content:"",
    image:"",
    tag:[],
    create_at:"",
    isPublic: false
})

const open = (row) => {
    dialogVisible.value = true
    loading.value = true
    if(row){
        isEdit.value = true
        Object.assign(form, row)
        form.create_at = Number(row.create_at)*1000
    } else {
        isEdit.value = false
    }
    loading.value = false
}

const handleClose = (tag) => {
    form.tag.splice(form.tag.indexOf(tag), 1)
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
        form.tag.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}

const confirm = async() => {
    loading.value = true
    const payload = {
        ...form,
        create_at: Number(form.create_at)/1000
    }
    try{
        const res = isEdit.value? await reqEditArticle(payload.id, { data: payload }) :await reqAddArticle({ data: payload })
        if(res.success){
            ElMessage({
                type: "success",
                message: res.message
            })
            emit("article-update")
        } else {
            ElMessage({
                type: "error",
                message: res.message
            })
        }
    } catch(error){
        console.error(error)
    } finally {
        dialogVisible.value = false
    }
}

defineExpose({ open })

</script>

<template>
    <ElDialog
        v-model="dialogVisible"
        title="Tips"
        width="700"
        align-center
        v-loading="loading"
    >
        <template #header>
            <h3>{{isEdit? "修改文章" : "新增文章"}}</h3>
        </template>
        <ElForm :model="form" label-width="auto">
            <ElRow :gutter="10">
                <ElCol :span=24>
                    <ElFormItem label="標題">
                        <ElInput v-model="form.title"/>
                    </ElFormItem>
                </ElCol>
                <ElCol :span=16>
                    <ElFormItem label="作者">
                        <ElInput v-model="form.author"/>
                    </ElFormItem>
                </ElCol>
                <ElCol :span="8">
                    <ElFormItem label="日期">
                        <ElDatePicker
                            v-model="form.create_at"
                            type="date"
                            placeholder="Pick a Date"
                            format="YYYY/MM/DD"
                            value-format="x"
                        />
                    </ElFormItem>
                </ElCol>
                <ElCol :span=24>
                    <ElFormItem label="描述">
                        <ElInput v-model="form.description" type="textarea"/>
                    </ElFormItem>
                </ElCol>
                <ElCol :span=24>
                <ElFormItem label="內容">
                    <ElInput v-model="form.content" type="textarea"/>
                </ElFormItem>
                </ElCol>
                <ElCol :span=16>
                    <ElFormItem label="標籤">
                        <ElTag
                            v-for="tag in form.tag"
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
                            class="tag-input"
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
                <ElButton @click="dialogVisible = false">取消</ElButton>
                <ElButton type="primary" @click="confirm">
                    確認
                </ElButton>
            </div>
        </template>
    </ElDialog>
</template>

<style scoped>
</style>