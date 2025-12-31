<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import {
  ElDialog,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRow,
  ElCol,
  ElTag,
  ElMessage,
  ElDatePicker,
} from "element-plus";
import { reqAddArticle, reqEditArticle } from "@/api/admin/article.js";
import { useImageUpload } from "@/composables/useImageUpload"
import type { ArticleData, EditArticleParams } from "@/types/admin/article";
import type { UploadRequestOptions } from 'element-plus'

const { handleUploadImage } = useImageUpload()
const dialogVisible = ref(false);
const inputValue = ref("");
const loading = ref(false);
const inputVisible = ref(false);
const InputRef = ref();
const isEdit = ref(false);
const emit = defineEmits<{
  (e: "article-update"): void
}>();

const initialForm: EditArticleParams = {
  id: "",
  author: "",
  title: "",
  description: "",
  content: "",
  image: "",
  tag: [],
  create_at: Date.now(),
  isPublic: false,
};
const form = reactive({ ...initialForm });

const open = (row?: ArticleData) => {
  dialogVisible.value = true;
  loading.value = true;
  Object.assign(form, initialForm);
  if (row) {
    isEdit.value = true;
    Object.assign(form, row);
    form.create_at = Number(row.create_at) * 1000;
  } else {
    isEdit.value = false;
  }
  loading.value = false;
};

const handleClose = (tag: string) => {
  form.tag.splice(form.tag.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    if (InputRef.value && InputRef.value.input) {
      InputRef.value.input.focus();
    }
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    form.tag.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

const customUploadRequest = async (options: UploadRequestOptions) => {
  const { file, onError, onSuccess } = options

  try {
    const res = await handleUploadImage(file)
    form.image = res.data.imageUrl;
    onSuccess?.(res.data);
  } catch (err) {
    console.error(err)
    onError?.(err as any);
  }
};

const confirm = async () => {
  loading.value = true;
  const payload = {
    ...form,
    create_at: Number(form.create_at) / 1000,
  };
  try {
    const res = isEdit.value
      ? await reqEditArticle(payload)
      : await reqAddArticle(payload);
    if (res.data.success) {
      ElMessage({ type: "success", message: res.data.message });
      emit("article-update");
    }
  } catch (error) {
    console.error(error);
  } finally {
    dialogVisible.value = false;
  }
};

defineExpose({ open });
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
      <h3>{{ isEdit ? "修改文章" : "新增文章" }}</h3>
    </template>
    <ElForm :model="form" label-width="auto">
      <ElRow :gutter="10">
        <ElCol :span="24">
          <ElFormItem label="標題">
            <ElInput v-model="form.title" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="16">
          <ElFormItem label="作者">
            <ElInput v-model="form.author" />
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
        <ElCol :span="24">
          <ElFormItem label="標籤">
            <ElTag
              v-for="tag in form.tag"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              style="margin-right: 5px"
            >
              {{ tag }}
            </ElTag>
            <ElInput
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              class="tag-input"
              style="width: 60px"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <ElButton
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
            >
              + New Tag
            </ElButton>
          </ElFormItem>
        </ElCol>
        <ElCol :span="24">
          <ElFormItem label="描述">
            <ElInput v-model="form.description" type="textarea" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="24">
          <ElFormItem label="內容">
            <ElInput v-model="form.content" type="textarea" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="24">
          <ElFormItem label="圖片">
            <ElUpload
              v-model="form.image"
              class="upload-demo"
              :http-request="customUploadRequest"
              list-type="picture"
              :limit="1"
              ref="upload"
            >
              <ElButton plain>選擇照片</ElButton>
            </ElUpload>
          </ElFormItem>
        </ElCol>
        <ElCol :span="24">
          <ElFormItem label="是否公開">
            <ElSwitch v-model="form.isPublic" />
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="confirm"> 確認 </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<style scoped>
.article-image {
  border: 1px solid lightgray;
  width: 100px;
  height: 100px;
}
</style>
