<script setup>
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
import { reqAddNewProduct, reqEditProduct} from "@/api/admin/product";
import { uploadImage } from "@/api/admin/upload.js";

const props = defineProps({
    categoryList: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(["product-added"]);
const fileList = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const isEdit = ref(true);
const initialForm = {
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
};
const form = reactive({ ...initialForm });

const open = (row) => {
    fileList.value = [];
    Object.assign(form, initialForm);
    
    if (row) {
        isEdit.value = true;
        const editImagesUrl = row.imagesUrl.map((url, index) => ({
            name: `image${index + 1}`,
            url: url,
            status: "success",
        }));
        Object.assign(form, {
            ...row,
            is_enabled: !!row.is_enabled,
            imagesUrl: editImagesUrl
        });
        fileList.value = editImagesUrl;
    } else {
        isEdit.value = false;
    }
    dialogVisible.value = true;
};

const confirm = async (info) => {
    loading.value = true;
    const payload = {
        ...info,
        origin_price: Number(info.origin_price),
        price: Number(info.price),
        is_enabled: +info.is_enabled,
        imageUrl: "",
        imagesUrl: isEdit.value 
            ? info.imagesUrl.map(item => typeof item === 'string' ? item : item.url)
            : info.imagesUrl,
    };

    try {
        const { id, ...data } = payload;
        const res = isEdit.value 
            ? await reqEditProduct({ id, data }) 
            : await reqAddNewProduct(payload);
        
        if (res.success) {
            ElMessage({ type: "success", message: res.message });
            emit("product-added");
            dialogVisible.value = false;
        }
    } catch(error) {
        console.error(error);
        const msg = error?.response?.data?.message?.join?.(",") || "操作失敗";
        ElMessage({ type: "error", message: msg });
    } finally {
        loading.value = false;
    }
};

const beforeAvatarUpload = (file) => {
    const isValidType = ["image/jpeg", "image/png"].includes(file.type);
    const isValidSize = file.size / 1024 / 1024 <= 3;
    
    if (!isValidType) {
        ElMessage({ type: "error", message: "上傳圖片檔案類型應為PNG或JPEG" });
        return false;
    }
    if (!isValidSize) {
        ElMessage({ type: "error", message: "上傳圖片大小應小於3MB" });
        return false;
    }
};

const customUploadRequest = async ({ file, onSuccess, onError }) => {
    try {
        const res = await uploadImage(file);
        const uploadFile = {
            name: file.name,
            url: res.imageUrl,
            status: res.success ? "success" : "false",
        };
        fileList.value.push(uploadFile);
        form.imagesUrl.push(uploadFile.url);
        onSuccess();
    } catch (err) {
        onError(err);
    }
};

const handleRemove = (file) => {
    const filterFn = (item) => item.url !== file.url;
    form.imagesUrl = form.imagesUrl.filter(filterFn);
    fileList.value = fileList.value.filter(filterFn);
};

const handlePreview = (file) => {
    window.open(file.url);
};

defineExpose({ open });
</script>
<template>
    <ElDialog v-model="dialogVisible" width="800">
        <template #header>
            <h3>{{isEdit? "修改產品" : "新增產品"}}</h3>
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
            <ElButton type="primary" @click="confirm(form)"> 確認 </ElButton>
        </div>
        </template>
    </ElDialog>
</template>
<style scoped>
:deep(.el-upload-list__item) {
    transition: none !important;
}
</style>
