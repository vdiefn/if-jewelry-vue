<script setup lang="ts">
import {
  ElDialog,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElSwitch,
  ElUpload,
  ElIcon,
  ElRow,
  ElCol,
  ElMessage,
  ElSelect,
  ElOption,
} from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import { reqAddNewProduct, reqEditProduct } from "@/api/admin/product";
import { uploadImage } from "@/api/admin/upload.js";
import type { ProductData } from "@/types/admin/product"
import type { UploadUserFile, UploadRequestOptions, UploadStatus, UploadFile } from 'element-plus'
import { useImageUpload } from "@/composables/useImageUpload"

interface TempProductData {
  id: string
  title: string
  category: string
  origin_price: number
  price: number
  unit: string
  description: string
  content: string
  is_enabled: number
  imageUrl: string
  imagesUrl: (string | UploadFile)[]
  num: number
}

interface Props {
  label: string,
  value: string
}

type Open = typeof open;

interface OpenExpose {
  open: Open;
}

const props = defineProps<{
  categoryList: Props[]
}>()

const { formatObjectToUrl, formatUrlToObject, beforeAvatarUpload, handlePreview } = useImageUpload()
const emit = defineEmits(["product-added"]);
const fileList = ref<UploadUserFile[]>([]);
const loading = ref(false);
const dialogVisible = ref(false);
const isEdit = ref(true);
const initialForm:TempProductData = {
  id:"",
  title: "",
  category: "",
  origin_price: 0,
  price: 0,
  unit: "",
  description: "",
  content: "",
  is_enabled: 1,
  imageUrl: "",
  imagesUrl: [],
  num:0
};
const form = reactive({ ...initialForm });

const open = (row?:ProductData) => {
  fileList.value = [];
  Object.assign(form, initialForm);
  form.imagesUrl = []

  if (row) {
    isEdit.value = true;

    const editImagesUrl = formatUrlToObject(row)

    Object.assign(form, {
      ...row,
      is_enabled: !!row.is_enabled,
      imagesUrl: editImagesUrl
    });
    fileList.value = editImagesUrl

  } else {
    isEdit.value = false;
  }
  dialogVisible.value = true;
};

const confirm = async () => {
  loading.value = true;

  const formatImagesUrl = formatObjectToUrl(form)
  const payload = {
    ...form,
    origin_price: Number(form.origin_price),
    price: Number(form.price),
    is_enabled: form.is_enabled? 1:0,
    imageUrl: "",
    imagesUrl: formatImagesUrl
  };

  try {
    const res = isEdit.value
      ? await reqEditProduct(payload)
      : await reqAddNewProduct(payload);

    if (res.data.success) {
      ElMessage({ type: "success", message: res.data.message });
      emit("product-added");
      dialogVisible.value = false;
    }
  } catch (error) {
    console.error(error);
    ElMessage({ type: "error", message:"操作失敗" });
  } finally {
    loading.value = false;
  }
};

const customUploadRequest = async (options:UploadRequestOptions):Promise<void> => {
  const { file, onSuccess, onError } = options
  try {
    const formData = new FormData();
    formData.append('file-to-upload', file);
    const res = await uploadImage(formData);

    const { imageUrl } = res.data;

    const uploadFile: UploadFile = {
      name: file.name,
      url: res.data.imageUrl,
      status: res.data.success ? "success" : "fail",
      uid: file.uid
    };
    fileList.value.push({ name: uploadFile.name, url: uploadFile.url });
    form.imagesUrl.push(imageUrl);
    onSuccess?.(res.data)
  } catch (err) {
    onError?.(err as any)
  }
};

const handleRemove = (file: UploadFile, _fileList: UploadFile[]) => {
  form.imagesUrl = form.imagesUrl.filter((item: string | UploadFile) => {
    if (typeof item === 'string') return item !== file.url;
    return item.url !== file.url;
  });
  fileList.value = fileList.value.filter((item: UploadUserFile) => item.url !== file.url);
};

defineExpose<OpenExpose>({ open });
</script>
<template>
  <ElDialog v-model="dialogVisible" width="800">
    <template #header>
      <h3>{{ isEdit ? "修改產品" : "新增產品" }}</h3>
    </template>
    <ElForm :model="form" label-width="auto">
      <ElRow :gutter="20">
        <ElCol :span="24">
          <ElFormItem label="標題">
            <ElInput v-model="form.title" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="分類">
            <ElSelect
              v-model="form.category"
              filterable
              placeholder="請選擇類別"
            >
              <ElOption
                v-for="(item, index) in props.categoryList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="單位">
            <ElInput v-model="form.unit" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="原價">
            <ElInput type="number" v-model="form.origin_price" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="售價">
            <ElInput type="number" v-model="form.price" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="24">
          <ElFormItem label="圖片上傳">
            <ElUpload
              :http-request="customUploadRequest"
              :file-list="fileList"
              list-type="picture-card"
              :on-remove="handleRemove"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePreview"
            >
              <ElIcon><Plus /></ElIcon>
            </ElUpload>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="產品描述">
            <ElInput type="textarea" v-model="form.description" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="說明內容">
            <ElInput type="textarea" v-model="form.content" />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElFormItem label="是否啟用">
        <ElSwitch v-model="form.is_enabled" />
      </ElFormItem>
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
:deep(.el-upload-list__item) {
  transition: none !important;
}
</style>
