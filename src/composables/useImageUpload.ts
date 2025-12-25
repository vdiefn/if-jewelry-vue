import { uploadImage } from "@/api/admin/upload.js";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import type {
  UploadUserFile,
  UploadRequestOptions,
  UploadStatus,
  UploadFile,
} from "element-plus";
import type { ProductData } from "@/types/admin/product";

interface TempProductData {
  id: string;
  title: string;
  category: string;
  origin_price: number;
  price: number;
  unit: string;
  description: string;
  content: string;
  is_enabled: number;
  imageUrl: string;
  imagesUrl: (string | UploadFile)[];
  num: number;
}

export function useImageUpload() {
  const fileList = ref<UploadUserFile[]>([]);

  const formatObjectToUrl = (data: TempProductData): string[] => {
    return data.imagesUrl.map((item) => {
      if (typeof item === "string") return item;
      const { url } = item;
      if (!url) throw new Error("圖片未正確上傳");
      return url;
    });
  };

  const formatUrlToObject = (data: ProductData): UploadUserFile[] => {
    return data.imagesUrl.map((url, index) => ({
      name: `image-${index}`,
      url,
      status: "success",
      uid: Date.now() + index,
    }));
  };

  const beforeAvatarUpload = (file: File) => {
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

  const handlePreview = (file: UploadUserFile) => {
    window.open(file.url);
  };

  return {
    fileList,
    formatObjectToUrl,
    formatUrlToObject,
    beforeAvatarUpload,
    handlePreview,
  };
}
