import { uploadImage } from "@/api/admin/upload"
import { ElMessage } from "element-plus";
import type {
  UploadUserFile,
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

  const handleUploadImage = async(file:File) => {
    const formData = new FormData()
    formData.append('file-to-upload', file)

    const res = await uploadImage(formData)
    return res
  }

  return {
    formatObjectToUrl,
    formatUrlToObject,
    beforeAvatarUpload,
    handlePreview,
    handleUploadImage
  };
}
