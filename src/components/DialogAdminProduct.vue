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
import {
  reqAddNewProduct,
  uploadImage,
  reqEditProduct,
} from "@/api/admin/product";

const props = defineProps({
  categoryList: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["product-added"]);
const fileList = ref([]);
const dialogVisible = ref(false);
const isEdit = ref(true);
const form = reactive({
  title: "",
  category: "",
  origin_price: 0,
  price: 0,
  unit: "",
  description: "",
  content: "",
  is_enabled: true,
  imageUrl: "",
  imagesUrl: [],
});

const open = (row) => {
  fileList.value = [];
  Object.assign(form, {
    title: "",
    category: "",
    origin_price: 0,
    price: 0,
    unit: "",
    description: "",
    content: "",
    is_enabled: true,
    imageUrl: "",
    imagesUrl: [],
  });
  if (row) {
    isEdit.value = true;
    console.log(row);
    let editImagesUrl = row.imagesUrl.map((url, index) => {
      return {
        name: `image${index + 1}`, // 給定 name，例如 image1, image2, ...
        url: url,
        status: "success", // 假設這裡依 index 判斷 status
      };
    });
    Object.assign(form, row);
    form.imagesUrl = editImagesUrl;
    fileList.value = editImagesUrl;
    console.log("開啟:", form);
    dialogVisible.value = true;
  } else {
    console.log("新增");
    isEdit.value = false;
    dialogVisible.value = true;
  }
};

const confirm = async (info) => {
  console.log("更新資料:", info);
  if (isEdit.value) {
    const payload = {
      id: info.id,
      data: {
        title: info.title,
        category: info.category,
        origin_price: Number(info.origin_price),
        price: Number(info.price),
        unit: info.unit,
        description: info.description,
        content: info.content,
        is_enabled: info.is_enabled ? 0 : 1,
        imageUrl: "",
        imagesUrl: info.imagesUrl,
      },
    };
    try {
      const res = await reqEditProduct(payload);
      if (res.success) {
        console.log(res);
        ElMessage({
          type: "success",
          message: res.message,
        });
        emit("product-added");
        dialogVisible.value = false;
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      const response = await reqAddNewProduct({
        data: {
          title: info.title,
          category: info.category,
          origin_price: Number(info.origin_price),
          price: Number(info.price),
          unit: info.unit,
          description: info.description,
          content: info.content,
          is_enabled: info.is_enabled ? 0 : 1,
          imageUrl: "",
          imagesUrl: info.imagesUrl,
        },
      });
      if (response.success) {
        ElMessage({
          type: "success",
          message: "成功新增商品",
        });
        emit("product-added");
        dialogVisible.value = false;
      }
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message.join(",") || "商品新增錯誤";
      ElMessage({
        type: "error",
        message: msg,
      });
    }
  }
};

const beforeAvatarUpload = (file) => {
  if (file.type !== "image/jpeg" && file.type !== "image/png") {
    ElMessage({
      type: "error",
      message: "上傳圖片檔案類型應為PNG或JPEG",
    });
    return false;
  }
  if (file.size / 1024 / 1024 > 3) {
    ElMessage({
      type: "error",
      message: "上傳圖片大小應小於3MB",
    });
    return false;
  }
};

const customUploadRequest = async ({ file, onSuccess, onError }) => {
  try {
    const res = await uploadImage(file); // 假設這會回傳 { imageUrl: "xxx" }
    const uploadFile = {
      name: file.name,
      url: res.imageUrl,
      status: res.success ? "success" : "false",
    };
    fileList.value.push(uploadFile); // 給 ElUpload 顯示用
    console.log("uploadfile:", uploadFile.url);
    form.imagesUrl.push(uploadFile.url); // 給後端送出用
    console.log("圖片檢查:", form.imagesUrl);
    onSuccess(); // 這個一定要呼叫，不然 UI 不會顯示成功
  } catch (err) {
    onError(err);
  }
};

const handleRemove = (file) => {
  // 同步刪除 form.imagesUrl 裡的對應資料
  form.imagesUrl = form.imagesUrl.filter((item) => item.url !== file.url);
  fileList.value = fileList.value.filter((item) => item.url !== file.url);
};

const handlePreview = (file) => {
  window.open(file.url);
};

defineExpose({ open });
</script>
<template>
  <ElDialog v-model="dialogVisible" title="新增產品" width="800">
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
        <ElSwitch v-model="form.is_enable" />
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
/* 關閉滑入圖片的動畫 */
:deep(.el-upload-list__item) {
  transition: none !important;
}
</style>
