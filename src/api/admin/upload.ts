import api from "@/utils/api.ts";
import type { UploadImageResponse } from "@/types/admin/upload";
import type { AxiosResponse } from "axios"

export const uploadImage = async (file: FormData): Promise<AxiosResponse<UploadImageResponse>> =>{
  return api.post(`/admin/upload`, file);
}