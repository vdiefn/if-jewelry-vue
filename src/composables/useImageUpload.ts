import { uploadImage } from "@/api/admin/upload.js";
import { ref } from "vue"
import { ElMessage } from "element-plus"
import type { UploadUserFile, UploadRequestOptions, UploadStatus, UploadFile } from 'element-plus'
import type { ProductData } from "@/types/admin/product"

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

export function useImageUpload() {

  const fileList = ref<UploadUserFile[]>([])

  // const formatUrlToObject = (data:ProductData) => {
  //   return data.imagesUrl.map((item, index) => {
  //     if (typeof item === 'string') {
  //       return {
  //         name: `image-${index}`,
  //         url: item,
  //         status: 'success' as UploadStatus,
  //         uid: Date.now() + index
  //       }
  //     }
  //     return item
  //   })
  // }
  const formatObjectToUrl = (data:TempProductData):string[] => {
    return data.imagesUrl.map(item => {
      if (typeof item === "string") return item;
      const { url } = item;
      if (!url) throw new Error("圖片未正確上傳");
      return url;
    })
  }

  const formatUrlToObject = (data: ProductData) => {
  return data.imagesUrl
    .map((item, index) => {
      if (!item) return null; // 略過不存在的 item
      return {
        name: `image-${index}`,
        url: item,
        status: 'success' as UploadStatus,
        uid: Date.now() + index
      }
    })
    .filter((item): item is UploadFile => item !== null); // 過濾 null
}

  const beforeAvatarUpload = (file:File) => {
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

  const customUploadRequest = async (options:UploadRequestOptions):Promise<void> => {
    const { file, onSuccess, onError } = options
    const formData = new FormData();
    formData.append('file-to-upload', file);

    try {
      const res = await uploadImage(formData);

      const { imageUrl } = res.data;

      const uploadFile: UploadFile = {
        name: file.name,
        url: res.data.imageUrl,
        status: res.data.success ? "success" : "fail",
        uid: file.uid
      };
      fileList.value.push({ name: uploadFile.name, url: uploadFile.url });
      // form.imagesUrl.push(imageUrl);
      onSuccess?.(res.data);

      return imageUrl

    } catch (err) {
      onError?.(err as any)
    }
  };


  // const handleRemove = (file: UploadFile, _fileList: UploadFile[]) => {
  //   fileList.value = fileList.value.filter((item: UploadUserFile) => item.url !== file.url);

  //   return form.imagesUrl.filter((item: string | UploadFile) => {
  //     if (typeof item === 'string') return item !== file.url;
  //     return item.url !== file.url;
  //   });
  // };

  // const handlePreview = (file:UploadUserFile) => {
  //   window.open(file.url);
  // };

  return {
    fileList,
    formatObjectToUrl,
    formatUrlToObject,
    beforeAvatarUpload,
    customUploadRequest,
  }
}
