import api from "@/utils/api.ts";

export const uploadImage = (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file-to-upload', file);

  return api.post(`/admin/upload`, formData);
};